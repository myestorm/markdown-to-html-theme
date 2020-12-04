const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

// 创建文件目录
const mkdirFile = (dirPath = '') => {
  let pathList = dirPath.split('/');
  let fileDir = '';
  let error = null;
  for (let i in pathList) {
    fileDir += ('/' + pathList[i]);
    let _dir = path.join(__dirname, fileDir);
    if (!fs.existsSync(_dir)) {
      fs.mkdirSync(_dir, () => {
        error = new Error(`创建目录${fileDir}失败`);
        return;
      });
    }
  }
  return error;
};

class WebpackAssetsList {
  assets = {};
  filename = './dist/config.json';

  constructor (filename) {
    if (filename) {
      this.filename = filename;
    }
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('WebpackAssetsList', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'WebpackAssetsList',
        (data, cb) => {
          if (env === 'production') {
            const outputName = data.outputName;
            const assetTags = data.assetTags;
            const item = {
              scripts: [],
              styles: []
            }
            assetTags.scripts.forEach(sub => {
              item.scripts.push(sub.attributes.src);
            })
            assetTags.styles.forEach(sub => {
              item.styles.push(sub.attributes.href);
            })
            this.assets[outputName] = item;
          }
          cb(null, data);
        }
      )
      HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
        'WebpackAssetsList',
        (data, cb) => {
          if (env === 'production') {
            const dirname = path.dirname(this.filename);
            mkdirFile(dirname);
            fs.writeFile(this.filename, JSON.stringify(this.assets, null, 2), (err) => { 
              if (err) {
                console.log(err.message);
              }
            });
          }
          cb(null, data);
        }
      )
    })
  }
}

module.exports = WebpackAssetsList;
