const path = require('path');
module.exports = {
  blocks: [{
    entry: path.resolve(__dirname, 'src/pages/media-image/index.tsx'),
    output: '/Users/evanzyli/Desktop/work/wii-wau-sample/src/pages/media-image',
    alias: {
      '@': path.resolve('src')
    }
  }]
};
