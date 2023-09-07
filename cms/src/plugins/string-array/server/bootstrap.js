'use strict';

module.exports = ({ strapi }) => {
  const { decorator } = strapi.plugin('string-array').service('array-field-decorator');
  strapi.entityService.decorate(decorator);
};
