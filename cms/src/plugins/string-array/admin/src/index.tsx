import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    // @ts-ignore
    app.customFields.register({
      name: "input",
      pluginId: "string-array",
      type: "text",
      icon: PluginIcon,
      intlLabel: {
        id: 'string-array.label',
        defaultMessage: 'string[]',
      },
      intlDescription: {
        id: 'string-array.description',
        defaultMessage: 'array of strings',
      },
      components: {
        Input: async () => import(
          './components/Input'
        ),
      },
      options: {
      },
    });
  },

  bootstrap(app: any) {},
  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
