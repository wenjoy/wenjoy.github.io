module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  // fix makeSerializable.js error
  "typescript": {
    "reactDocgen": false
  },
  "webpackFinal": async (config, { configType }) => {
    const rule = config.module.rules.find(rule => rule.test.exec('.css'));
    const options = rule.use[1].options
    console.log('options: ', options);
    rule.use[1].options = {
      ...options,
      modules: {
        exportLocalsConvention: "camelCase",
      }
    }
    return config;
  }
}
