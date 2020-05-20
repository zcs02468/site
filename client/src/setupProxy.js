// @ts-ignore 

const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy.createProxyMiddleware("/api/", {
            //`api`是需要转发的请求
            target: "http://zcssite.com", // 这里是接口服务器地址
            changeOrigin: true,
        })
    );
};

