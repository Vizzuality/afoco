'use strict';

const _ = require("lodash");

module.exports = ({ strapi }) => {
  const extractArrayFields = function(data, model) {
    let updateFields = []
    Object.keys(model.attributes).forEach(attr => {
      if (model.attributes[attr].customField === 'plugin::string-array.input') {
        if (typeof data[attr] === 'string' || data[attr] instanceof String) {
          updateFields.push({ [attr]: _.map(data[attr].split(','), _.trim) })
          _.unset(data, attr);
        }
      }
    });
    return updateFields
  }

  const updateArrayFields = async function(updateFields, model, where = {}){
    if (_.isArray(updateFields) && updateFields.length > 0) {
      for (let index = 0; index < updateFields.length; index++) {
        const element = updateFields[index];
        await updateArrayField(model.collectionName, element, where)
      }
    }
  }

  const updateArrayField = async function (table, updateFields, where = {}) {
    let result = await strapi.db.connection(table).update(updateFields).where(where).catch(err => {
      return err.message;
    });

    if (typeof result === 'string') {
      strapi.log.info(`Error updating array field, ${result}`);
      return false
    }
    return result;
  }

  return {
    extractArrayFields,
    updateArrayFields,
    updateArrayField
  }
};
