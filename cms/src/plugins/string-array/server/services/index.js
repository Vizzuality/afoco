'use strict';

const dbManagerService = require('./db-manager-services');
const arrayFieldDecorator = require('./array-field-decorator');

module.exports = {
  'array-field-decorator': arrayFieldDecorator,
  'db-manager-services': dbManagerService
};
