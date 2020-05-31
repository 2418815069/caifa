const path = require('path');
const Mocks = require('./mock.config');
const resolve = (dir) => path.join(__dirname, dir);

class CustomFilterPlugin {
    constructor({ exclude }) {
        this.exclude = exclude;
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tap('CustomFilterPlugin', compilation => {
            compilation.warnings = compilation.warnings.filter(warning => !this.exclude.test(warning.message));
        });
    }
}

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    publicPath: './',
    configureWebpack: {
        devtool: 'source-map',
        plugins: [
            new CustomFilterPlugin({
                exclude: /Conflicting order between:/
            })
        ]
    },
    chainWebpack: (config) => {
        config.plugins.delete('prefetch-index');
        config.plugins.delete('preload-index');
        config.module.rule('eslint');
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'));
    },
    devServer: {
        port: 8035,
        before: Mocks,
        disableHostCheck: true,
        proxy: {
            '/public': {
                target: 'http://39.105.216.207',
                changeOrigin: true
            }
        }
    }
};
