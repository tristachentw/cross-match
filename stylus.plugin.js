import path from 'path';

const plugins = file => {
  const json = require(file);
  return style => {
    style.define('getDefinedValue', node => json[node.val]);
  };
};

export default plugins;
