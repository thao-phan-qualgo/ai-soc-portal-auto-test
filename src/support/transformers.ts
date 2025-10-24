/**
 * Cucumber Parameter Transformers
 * Transform parameters in step definitions
 * Note: Cucumber already has built-in types: int, float, word, string
 * Only define custom types here
 */

import { defineParameterType } from '@cucumber/cucumber';

// Transform dates (YYYY-MM-DD format)
defineParameterType({
  name: 'isodate',
  regexp: /\d{4}-\d{2}-\d{2}/,
  transformer: (value: string) => new Date(value),
});

// Transform JSON objects
defineParameterType({
  name: 'jsonObject',
  regexp: /\{[^}]+\}/,
  transformer: (value: string) => JSON.parse(value),
});

// Transform arrays
defineParameterType({
  name: 'jsonArray',
  regexp: /\[[^\]]+\]/,
  transformer: (value: string) => JSON.parse(value),
});

