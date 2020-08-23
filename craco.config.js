const CracoLessPlugin = require('craco-less');

const colors = require('./src/styles/colors');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': colors.primary,
              '@secondary-color': colors.secondary,
              '@link-color': colors.primary,
              '@font-family': '\'EB Garamond\', serif',
              '@font-size-base': '12px',
              '@card-radius': '10px',
             },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};