/**
 * Helper utilities for tests
 */

import { faker } from '@faker-js/faker';

/**
 * Generate random test data
 */
export class DataGenerator {
  static generateEmail(): string {
    return faker.internet.email();
  }
  
  static generatePassword(): string {
    return faker.internet.password({ length: 12 });
  }
  
  static generateUsername(): string {
    return faker.internet.userName();
  }
  
  static generateCompanyName(): string {
    return faker.company.name();
  }
  
  static generatePhoneNumber(): string {
    return faker.phone.number();
  }
  
  static generateAddress(): string {
    return faker.location.streetAddress();
  }
  
  static generateDate(): Date {
    return faker.date.recent();
  }
  
  static generateNumber(min: number, max: number): number {
    return faker.number.int({ min, max });
  }
  
  static generateString(length: number): string {
    return faker.string.alphanumeric(length);
  }
}

/**
 * Wait helper
 */
export class WaitHelper {
  static async waitFor(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}

/**
 * Date helper
 */
export class DateHelper {
  static getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  static getCurrentDateTime(): string {
    return new Date().toISOString();
  }
  
  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

/**
 * String helper
 */
export class StringHelper {
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  static toCamelCase(str: string): string {
    return str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  }
  
  static toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  
  static truncate(str: string, length: number): string {
    return str.length > length ? str.substring(0, length) + '...' : str;
  }
}

/**
 * Array helper
 */
export class ArrayHelper {
  static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

