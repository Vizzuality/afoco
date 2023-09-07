'use strict';

const decorator = (service) => ({
  async create(uid, opts = {}) {
    const model = strapi.getModel(uid);
    const { extractArrayFields, updateArrayFields } = await strapi.plugin('string-array').service('db-manager-services');

    let updateFields = extractArrayFields(opts.data, model);
    const entry = await service.create.call(this, uid, opts);
    await updateArrayFields(updateFields, model, { id: entry.id });
    return entry;
  },

  async update(uid, entityId, opts = {}) {
    const model = strapi.getModel(uid);
    const { extractArrayFields, updateArrayFields } = await strapi.plugin('string-array').service('db-manager-services');

    let updateFields = extractArrayFields(opts.data, model);
    await updateArrayFields(updateFields, model, { id: entityId });
    return await service.update.call(this, uid, entityId, opts);
  }
});

module.exports = () => ({
  decorator
});
