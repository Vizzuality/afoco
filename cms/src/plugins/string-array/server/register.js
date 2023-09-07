'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'input',
    plugin: 'string-array',
    type: 'text',
  });
};
