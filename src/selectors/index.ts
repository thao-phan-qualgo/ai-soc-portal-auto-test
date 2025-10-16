/**
 * Selector Management System
 * Centralized exports for all selector-related functionality
 */

export { Selectors, SelectorUtils } from './selectors';
export { SelectorManager } from './selector-manager';
export { getSelectorConfig, defaultSelectorConfig, selectorConfigs } from './selector-config';
export type { SelectorConfig } from './selector-config';

// Re-export for convenience
export { Selectors as default } from './selectors';
