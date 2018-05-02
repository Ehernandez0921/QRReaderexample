const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
  config = rewireLess.withLoaderOptions(
    {
      modifyVars: {
        "@primary-color": "rgba(0,0,0,.25)",
        '@layout-header-background': '#e80033'
      },
    }
  )(config, env);
  return config;
};