/**
 * Cucumber World (Context)
 * Shared context across all step definitions
 */

import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Page } from '@playwright/test';

export class CustomWorld extends World {
  page?: Page;
  testData?: Record<string, any>;
  dbConnected?: boolean;

  constructor(options: IWorldOptions) {
    super(options);
    this.testData = {};
  }
}

setWorldConstructor(CustomWorld);

