// 应该注意这个文件的位置
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // ws: true,
                // changeOrigin: true
            },
        }
    },

    // 关闭eslint语法校验
    lintOnSave: false
}