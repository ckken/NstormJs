var Nstorm = {
    init: function (root) {

        this.action = __dirname + '/action';
        this.model = __dirname + '/model';
        this.conf = __dirname + '/config';

        this.root = root;
        this.config();
        this.app = this.express();
        this.route();
        this.mongodb();
        this.http();


    },
    /**
     * 获取网站配置
     * @returns {*|Function|reserved.init}
     */
    config: function () {
        return global.C = require(this.root + "/app/conf/config").init(this.root);
    },
    /**
     * 初始化express 暴露app到全局
     * @returns {*|Function|reserved.init}
     */
    express: function () {
        var app = require(this.conf + "/express").init();
        return app;

    },
    /**
     * 路由定义
     * @returns {*|Function|reserved.init}
     */
    route: function () {
        var route = require(this.conf + "/route").init(this.app);
        return route;
    },
    /**
     * 建立链接DB 初始化 mongodb 的model层
     * @returns {*|Function|reserved.init}
     */
    mongodb: function () {
        var MongoDb = require(this.model + "/mongodbConnect").init(this.app);
        global.D = require(this.model + '/db');
        return MongoDb;
    },
    /**
     * 创建HTTP端口
     * @returns {*|SimpleServer.listen|http.Server}
     */
    http: function () {
        var http = require('http').createServer(this.app).listen(C.port, function () {});
        return http;
    }

}

module.exports = Nstorm;