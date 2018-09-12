const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
  config = rewireLess.withLoaderOptions(
    {
      //ant d themes
      modifyVars: {
        //theme color-tables links etc,
        '@grey-1': '#ffffff',
        '@grey-2': '#fafafa',
        '@grey-3': '#f5f5f5',
        '@grey-4': '#e8e8e8',
        '@grey-5': '#d9d9d9',
        '@grey-7': '#8c8c8c',
        '@grey-8': '#595959',
        '@grey-9': '#262626',
        '@grey-10': '#000000',
        '@grey-6': '#bfbfbf',
        '@primary-color': '@grey-6',

        //layout dow red
        '@layout-header-background': '#e80033',
        '@menu-submenu-bg': '#c20030',
        '@menu-item-active-bg': '#ff7a8a',
        '@menu-bg': '#e80033',
        '@menu-item-color': '@primary-1',
        '@menu-highlight-color': '@primary-10',
      },
    }
  )(config, env);
  return config;
};