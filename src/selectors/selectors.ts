/**
 * Centralized Selector Management
 * All CSS selectors, XPath expressions, and element IDs are defined here
 * for easy maintenance and clean structure
 */

/**
 * Base selectors for common elements
 */
export const BaseSelectors = {
  // Common buttons
  buttons: {
    signIn: 'button:has-text("Sign in")',
    login: 'button:has-text("Login")',
    next: 'button:has-text("Next")',
    submit: 'input[type="submit"]',
    logout: 'button:has-text("Logout")',
    signOut: 'button:has-text("Sign out")',
    cancel: 'button:has-text("Cancel")',
    save: 'button:has-text("Save")',
    delete: 'button:has-text("Delete")',
    edit: 'button:has-text("Edit")',
    add: 'button:has-text("Add")',
    search: 'button:has-text("Search")',
    filter: 'button:has-text("Filter")',
    clear: 'button:has-text("Clear")',
    refresh: 'button:has-text("Refresh")',
    export: 'button:has-text("Export")',
    import: 'button:has-text("Import")',
  },

  // Common form elements
  inputs: {
    email: 'input[type="email"]',
    password: 'input[type="password"]',
    text: 'input[type="text"]',
    search: 'input[type="search"]',
    number: 'input[type="number"]',
    date: 'input[type="date"]',
    checkbox: 'input[type="checkbox"]',
    radio: 'input[type="radio"]',
    file: 'input[type="file"]',
  },

  // Common links
  links: {
    signIn: 'a:has-text("Sign in")',
    login: 'a:has-text("Login")',
    logout: 'a:has-text("Logout")',
    signOut: 'a:has-text("Sign out")',
    forgotPassword: 'a:has-text("Forgot password")',
    resetPassword: 'a:has-text("Reset password")',
    createAccount: 'a:has-text("Create account")',
    register: 'a:has-text("Register")',
  },

  // Common navigation elements
  navigation: {
    menu: '[role="navigation"]',
    breadcrumb: '[aria-label="breadcrumb"]',
    sidebar: '[role="complementary"]',
    main: 'main',
    header: 'header',
    footer: 'footer',
  },

  // Common data attributes
  dataTestId: {
    loginButton: '[data-testid="login-button"]',
    logoutButton: '[data-testid="logout-button"]',
    userMenu: '[data-testid="user-menu"]',
    profileMenu: '[data-testid="profile-menu"]',
    dashboard: '[data-testid="dashboard"]',
    searchInput: '[data-testid="search-input"]',
    filterButton: '[data-testid="filter-button"]',
    table: '[data-testid="data-table"]',
    modal: '[data-testid="modal"]',
    form: '[data-testid="form"]',
  },

  // Common classes
  classes: {
    loginButton: '.login-button',
    logoutButton: '.logout-button',
    userMenu: '.user-menu',
    profileMenu: '.profile-menu',
    dashboard: '.dashboard',
    table: '.table',
    modal: '.modal',
    form: '.form',
    card: '.card',
    button: '.btn',
    input: '.form-control',
    label: '.form-label',
    error: '.error',
    success: '.success',
    warning: '.warning',
    info: '.info',
  },

  // Common IDs
  ids: {
    loginButton: '#login-button',
    logoutButton: '#logout-button',
    userMenu: '#user-menu',
    profileMenu: '#profile-menu',
    dashboard: '#dashboard',
    searchInput: '#search-input',
    filterButton: '#filter-button',
    table: '#data-table',
    modal: '#modal',
    form: '#form',
  },
} as const;

/**
 * Microsoft OAuth specific selectors
 */
export const MicrosoftOAuthSelectors = {
  // Microsoft login page elements
  emailInput: 'input[name="loginfmt"]',
  passwordInput: 'input[name="passwd"]',
  nextButton: '#idSIButton9',
  signInButton: '#idSIButton9',
  staySignedInYes: 'input[type="submit"][value="Yes"]',
  staySignedInNo: 'input[type="submit"][value="No"]',
  
  // Microsoft OAuth specific elements
  signInOptions: 'button:has-text("Sign-in options")',
  useDifferentAccount: 'button:has-text("Use a different account")',
  workOrSchoolAccount: 'button:has-text("Work or school account")',
  
  // Error messages
  personalAccountError: 'text=You can\'t sign in here with a personal account. Use your work or school account instead.',
  invalidCredentials: 'text=Your account or password is incorrect',
  accountLocked: 'text=Your account has been locked',
  
  // Microsoft OAuth URLs
  urls: {
    login: '**/login.microsoftonline.com/**',
    callback: '**/dev-aisoc-fe.qualgo.dev/**',
  },
} as const;

/**
 * IT Asset Inventory specific selectors
 */
export const ITAssetInventorySelectors = {
  // Navigation
  navigation: {
    menuItem: 'a:has-text("IT Asset Inventory")',
    breadcrumb: '[aria-label="breadcrumb"]',
  },

  // Table elements
  table: {
    container: '[data-testid="asset-table"]',
    header: '[data-testid="table-header"]',
    body: '[data-testid="table-body"]',
    row: '[data-testid="table-row"]',
    cell: '[data-testid="table-cell"]',
    pagination: '[data-testid="pagination"]',
    sortButton: '[data-testid="sort-button"]',
    filterButton: '[data-testid="filter-button"]',
  },

  // Filter and search
  filters: {
    searchInput: '[data-testid="search-input"]',
    filterDropdown: '[data-testid="filter-dropdown"]',
    dateRangePicker: '[data-testid="date-range-picker"]',
    statusFilter: '[data-testid="status-filter"]',
    typeFilter: '[data-testid="type-filter"]',
    locationFilter: '[data-testid="location-filter"]',
    applyFilter: '[data-testid="apply-filter"]',
    clearFilter: '[data-testid="clear-filter"]',
  },

  // Actions
  actions: {
    addAsset: '[data-testid="add-asset"]',
    editAsset: '[data-testid="edit-asset"]',
    deleteAsset: '[data-testid="delete-asset"]',
    exportAssets: '[data-testid="export-assets"]',
    importAssets: '[data-testid="import-assets"]',
    bulkActions: '[data-testid="bulk-actions"]',
  },

  // Modal dialogs
  modals: {
    addAsset: '[data-testid="add-asset-modal"]',
    editAsset: '[data-testid="edit-asset-modal"]',
    deleteAsset: '[data-testid="delete-asset-modal"]',
    confirmDelete: '[data-testid="confirm-delete"]',
    cancelDelete: '[data-testid="cancel-delete"]',
  },

  // Form fields
  forms: {
    assetName: '[data-testid="asset-name"]',
    assetType: '[data-testid="asset-type"]',
    serialNumber: '[data-testid="serial-number"]',
    location: '[data-testid="location"]',
    status: '[data-testid="status"]',
    purchaseDate: '[data-testid="purchase-date"]',
    warrantyExpiry: '[data-testid="warranty-expiry"]',
    assignedTo: '[data-testid="assigned-to"]',
    notes: '[data-testid="notes"]',
  },
} as const;

/**
 * Dashboard specific selectors
 */
export const DashboardSelectors = {
  // Dashboard widgets
  widgets: {
    summary: '[data-testid="summary-widget"]',
    recentActivity: '[data-testid="recent-activity"]',
    alerts: '[data-testid="alerts-widget"]',
    charts: '[data-testid="charts-widget"]',
    quickActions: '[data-testid="quick-actions"]',
  },

  // Navigation
  navigation: {
    dashboard: 'a:has-text("Dashboard")',
    home: 'a:has-text("Home")',
    overview: 'a:has-text("Overview")',
  },
} as const;

/**
 * User Management specific selectors
 */
export const UserManagementSelectors = {
  // User table
  table: {
    container: '[data-testid="user-table"]',
    row: '[data-testid="user-row"]',
    name: '[data-testid="user-name"]',
    email: '[data-testid="user-email"]',
    role: '[data-testid="user-role"]',
    status: '[data-testid="user-status"]',
  },

  // User actions
  actions: {
    addUser: '[data-testid="add-user"]',
    editUser: '[data-testid="edit-user"]',
    deleteUser: '[data-testid="delete-user"]',
    resetPassword: '[data-testid="reset-password"]',
    changeRole: '[data-testid="change-role"]',
  },

  // User forms
  forms: {
    firstName: '[data-testid="first-name"]',
    lastName: '[data-testid="last-name"]',
    email: '[data-testid="email"]',
    role: '[data-testid="role"]',
    department: '[data-testid="department"]',
    manager: '[data-testid="manager"]',
  },
} as const;

/**
 * Utility functions for selector management
 */
export class SelectorUtils {
  /**
   * Get selector by priority (data-testid > class > id > text)
   */
  static getSelector(selectors: string[]): string {
    return selectors.find(selector => selector) || selectors[0];
  }

  /**
   * Build dynamic selector with parameters
   */
  static buildSelector(template: string, ...params: string[]): string {
    return params.reduce((selector, param, index) => 
      selector.replace(`{${index}}`, param), template);
  }

  /**
   * Get multiple selectors for fallback
   */
  static getMultipleSelectors(...selectors: string[]): string {
    return selectors.join(', ');
  }

  /**
   * Get XPath selector
   */
  static getXPath(text: string): string {
    return `xpath=//*[text()="${text}"]`;
  }

  /**
   * Get XPath selector with partial text match
   */
  static getXPathContains(text: string): string {
    return `xpath=//*[contains(text(), "${text}")]`;
  }

  /**
   * Get XPath selector for element with attribute
   */
  static getXPathByAttribute(attribute: string, value: string): string {
    return `xpath=//*[@${attribute}="${value}"]`;
  }
}

/**
 * Export all selectors for easy access
 */
export const Selectors = {
  Base: BaseSelectors,
  MicrosoftOAuth: MicrosoftOAuthSelectors,
  ITAssetInventory: ITAssetInventorySelectors,
  Dashboard: DashboardSelectors,
  UserManagement: UserManagementSelectors,
  Utils: SelectorUtils,
} as const;

export default Selectors;
