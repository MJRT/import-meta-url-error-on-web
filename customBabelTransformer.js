const upstreamTransformer = require("metro-react-native-babel-transformer");
const babel = require("@babel/core");

const babelOptions = {
  presets: ["babel-preset-expo"],
  plugins: ["@babel/plugin-syntax-import-meta"],
};

module.exports.transform = function ({ src, filename, options }) {
  const babelConfig = {
    ...babelOptions,
    filename,
    sourceMaps: options.sourceMaps,
    inputSourceMap: options.inputSourceMap,
  };

  const result = babel.transformSync(src, babelConfig);

  return {
    ast: result.ast,
    code: result.code,
    map: result.map,
    metadata: result.metadata,
  };
};
