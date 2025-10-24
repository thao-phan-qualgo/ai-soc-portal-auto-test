#!/bin/bash

# SSH Tunnel Script for PostgreSQL Database Connection
# This script creates an SSH tunnel through the bastion host to access the PostgreSQL database

# Load environment variables from .env file
if [ -f ".env" ]; then
    set -a  # automatically export all variables
    source .env
    set +a  # stop automatically exporting
fi

# Configuration - use environment variables with fallbacks
BASTION_HOST="${BASTION_HOST:-ec2-13-229-217-47.ap-southeast-1.compute.amazonaws.com}"
BASTION_USER="${BASTION_USER:-ubuntu}"
SSH_KEY="${SSH_KEY_PATH:-$(pwd)/test-data/secret-key/ai-soc-dev-bastion-kp 3 1.pem}"
LOCAL_PORT="${LOCAL_PORT:-5433}"  # Local port to forward to
REMOTE_HOST="${REMOTE_HOST:-common-infra-dev-rds-projects-dbs.c7y4w0ucidf6.ap-southeast-1.rds.amazonaws.com}"
REMOTE_PORT="${REMOTE_PORT:-5432}"  # PostgreSQL port on the remote database

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔌 Setting up SSH tunnel for PostgreSQL database connection...${NC}"
echo -e "${YELLOW}📋 Configuration:${NC}"
echo -e "   Bastion Host: ${BASTION_HOST}"
echo -e "   Bastion User: ${BASTION_USER}"
echo -e "   SSH Key: ${SSH_KEY}"
echo -e "   Local Port: ${LOCAL_PORT}"
echo -e "   Remote Host: ${REMOTE_HOST}"
echo -e "   Remote Port: ${REMOTE_PORT}"
echo ""

# Check if SSH key exists
if [ ! -f "$SSH_KEY" ]; then
    echo -e "${RED}❌ SSH key file not found: $SSH_KEY${NC}"
    exit 1
fi

# Check if SSH key has correct permissions
if [ "$(stat -f %A "$SSH_KEY")" != "600" ]; then
    echo -e "${YELLOW}⚠️  Setting correct permissions for SSH key...${NC}"
    chmod 600 "$SSH_KEY"
fi

# Function to check if port is already in use
check_port() {
    if lsof -Pi :$LOCAL_PORT -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}⚠️  Port $LOCAL_PORT is already in use.${NC}"
        echo -e "${YELLOW}   You may need to kill the existing process or use a different port.${NC}"
        echo -e "${YELLOW}   To kill existing tunnel: pkill -f 'ssh.*$LOCAL_PORT'${NC}"
        return 1
    fi
    return 0
}

# Function to start SSH tunnel
start_tunnel() {
    echo -e "${GREEN}🚀 Starting SSH tunnel...${NC}"
    echo -e "${BLUE}   Command: ssh -i \"$SSH_KEY\" -L $LOCAL_PORT:$REMOTE_HOST:$REMOTE_PORT -N $BASTION_USER@$BASTION_HOST${NC}"
    echo ""
    
    # Start SSH tunnel in background
    ssh -i "$SSH_KEY" -L $LOCAL_PORT:$REMOTE_HOST:$REMOTE_PORT -N $BASTION_USER@$BASTION_HOST &
    TUNNEL_PID=$!
    
    # Wait a moment for tunnel to establish
    sleep 3
    
    # Check if tunnel is running
    if kill -0 $TUNNEL_PID 2>/dev/null; then
        echo -e "${GREEN}✅ SSH tunnel established successfully!${NC}"
        echo -e "${GREEN}   Tunnel PID: $TUNNEL_PID${NC}"
        echo -e "${GREEN}   Local connection: localhost:$LOCAL_PORT${NC}"
        echo -e "${GREEN}   Remote target: $REMOTE_HOST:$REMOTE_PORT${NC}"
        echo ""
        echo -e "${YELLOW}📝 To stop the tunnel, run: kill $TUNNEL_PID${NC}"
        echo -e "${YELLOW}📝 Or use: pkill -f 'ssh.*$LOCAL_PORT'${NC}"
        echo ""
        echo -e "${BLUE}🧪 You can now test the database connection using:${NC}"
        echo -e "${BLUE}   npm run test:db:tunnel${NC}"
        
        # Save PID to file for easy cleanup
        echo $TUNNEL_PID > .ssh-tunnel.pid
        echo -e "${GREEN}   PID saved to .ssh-tunnel.pid${NC}"
        
    else
        echo -e "${RED}❌ Failed to establish SSH tunnel${NC}"
        exit 1
    fi
}

# Function to stop SSH tunnel
stop_tunnel() {
    echo -e "${YELLOW}🛑 Stopping SSH tunnel...${NC}"
    
    if [ -f ".ssh-tunnel.pid" ]; then
        TUNNEL_PID=$(cat .ssh-tunnel.pid)
        if kill -0 $TUNNEL_PID 2>/dev/null; then
            kill $TUNNEL_PID
            echo -e "${GREEN}✅ SSH tunnel stopped (PID: $TUNNEL_PID)${NC}"
        else
            echo -e "${YELLOW}⚠️  Tunnel process not found (PID: $TUNNEL_PID)${NC}"
        fi
        rm -f .ssh-tunnel.pid
    else
        # Try to kill any SSH tunnel on the port
        pkill -f "ssh.*$LOCAL_PORT" 2>/dev/null
        echo -e "${GREEN}✅ Attempted to stop SSH tunnel${NC}"
    fi
}

# Function to check tunnel status
check_tunnel() {
    if [ -f ".ssh-tunnel.pid" ]; then
        TUNNEL_PID=$(cat .ssh-tunnel.pid)
        if kill -0 $TUNNEL_PID 2>/dev/null; then
            echo -e "${GREEN}✅ SSH tunnel is running (PID: $TUNNEL_PID)${NC}"
            echo -e "${GREEN}   Local connection: localhost:$LOCAL_PORT${NC}"
            return 0
        else
            echo -e "${RED}❌ SSH tunnel is not running${NC}"
            rm -f .ssh-tunnel.pid
            return 1
        fi
    else
        echo -e "${RED}❌ SSH tunnel is not running${NC}"
        return 1
    fi
}

# Main script logic
case "$1" in
    "start")
        if check_port; then
            start_tunnel
        fi
        ;;
    "stop")
        stop_tunnel
        ;;
    "status")
        check_tunnel
        ;;
    "restart")
        stop_tunnel
        sleep 2
        if check_port; then
            start_tunnel
        fi
        ;;
    *)
        echo -e "${BLUE}SSH Tunnel Manager for PostgreSQL Database${NC}"
        echo ""
        echo -e "${YELLOW}Usage: $0 {start|stop|status|restart}${NC}"
        echo ""
        echo -e "${YELLOW}Commands:${NC}"
        echo -e "  ${GREEN}start${NC}   - Start SSH tunnel"
        echo -e "  ${GREEN}stop${NC}    - Stop SSH tunnel"
        echo -e "  ${GREEN}status${NC}  - Check tunnel status"
        echo -e "  ${GREEN}restart${NC} - Restart SSH tunnel"
        echo ""
        echo -e "${YELLOW}Examples:${NC}"
        echo -e "  $0 start    # Start the tunnel"
        echo -e "  $0 status   # Check if tunnel is running"
        echo -e "  $0 stop     # Stop the tunnel"
        echo ""
        echo -e "${BLUE}After starting the tunnel, test with: npm run test:db:tunnel${NC}"
        ;;
esac
