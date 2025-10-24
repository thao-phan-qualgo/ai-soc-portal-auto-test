/**
 * Cucumber Custom Parameter Types
 * Define custom types for step definitions
 */

import { defineParameterType } from '@cucumber/cucumber';

// Define HTTP methods
defineParameterType({
  name: 'httpMethod',
  regexp: /GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS/,
  transformer: (value: string) => value.toUpperCase(),
});

// Define HTTP status codes
defineParameterType({
  name: 'httpStatus',
  regexp: /\d{3}/,
  transformer: (value: string) => parseInt(value, 10),
});

// Define database operations
defineParameterType({
  name: 'dbOperation',
  regexp: /SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER/,
  transformer: (value: string) => value.toUpperCase(),
});

// Define UI actions
defineParameterType({
  name: 'uiAction',
  regexp: /click|type|select|hover|doubleClick|rightClick|drag/,
  transformer: (value: string) => value.toLowerCase(),
});

// Define element states
defineParameterType({
  name: 'elementState',
  regexp: /visible|hidden|enabled|disabled|checked|unchecked|selected/,
  transformer: (value: string) => value.toLowerCase(),
});

// Define time units
defineParameterType({
  name: 'timeUnit',
  regexp: /second|seconds|minute|minutes|hour|hours|day|days/,
  transformer: (value: string) => value.toLowerCase(),
});

// Define comparison operators
defineParameterType({
  name: 'operator',
  regexp: /equal to|greater than|less than|greater than or equal to|less than or equal to|not equal to|contains|starts with|ends with/,
  transformer: (value: string) => value.toLowerCase(),
});

