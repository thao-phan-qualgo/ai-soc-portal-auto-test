/**
 * Selector Configuration
 * Centralized configuration for selector preferences and fallback strategies
 */

export interface SelectorConfig {
  /** Priority order for selector types */
  priority: ('data-testid' | 'class' | 'id' | 'text' | 'xpath')[];
  
  /** Whether to use fallback selectors */
  useFallback: boolean;
  
  /** Timeout for selector operations */
  timeout: number;
  
  /** Whether to log selector usage for debugging */
  enableLogging: boolean;
}

/**
 * Default selector configuration
 */
export const defaultSelectorConfig: SelectorConfig = {
  priority: ['data-testid', 'class', 'id', 'text', 'xpath'],
  useFallback: true,
  timeout: 10000,
  enableLogging: false,
};

/**
 * Environment-specific configurations
 */
export const selectorConfigs = {
  development: {
    ...defaultSelectorConfig,
    enableLogging: true,
    timeout: 15000,
  },
  
  staging: {
    ...defaultSelectorConfig,
    enableLogging: true,
    timeout: 12000,
  },
  
  production: {
    ...defaultSelectorConfig,
    enableLogging: false,
    timeout: 8000,
  },
  
  testing: {
    ...defaultSelectorConfig,
    enableLogging: true,
    timeout: 20000,
  },
} as const;

/**
 * Get selector configuration based on environment
 */
export function getSelectorConfig(): SelectorConfig {
  const env = process.env.NODE_ENV || 'development';
  return selectorConfigs[env as keyof typeof selectorConfigs] || defaultSelectorConfig;
}
