(function(m, o, d, u, l, a, r) {
    if(m[o]) return
    function f(n) { return function() { r.push(n, arguments); return a } }
    m[o] = a = { args: (r = []), config: f(1), use: f(2), on: f(3) }
    m.define = f(0)
    u = d.createElement("script")
    u.id = o + "node"
    u.async = true
    u.src = Config.root+"/js/seajs/seajs.js"
    l = d.getElementsByTagName("head")[0]
    l.appendChild(u)
})(window, "seajs", document);
//配置文件
seajs.config({
	
		alias: {
					'kindeditor': Config.jsurl+'lib/editor/kindeditor/kindeditor'
		},
    // Enable plugins
    plugins: ['shim'],
    // Configure shim for non-CMD modules
    shim: {
        'jquery': {
            src: Config.jsurl+'lib/jquery-1.9.1.min.js',
            exports: 'jQuery'
        },
		
		//动画效果
        'easing': {
            src: Config.jsurl+'jquery.easing.1.3',
            deps: ['jquery']
        },
		
		//数据data
        'cookie': {
            src: Config.jsurl+'lib/data/jquery.cookie.js',
            deps: ['jquery']
        },

        'autocomplete': {
            src: Config.jsurl+'lib/data/jquery.autocomplete.js',
            deps: ['jquery']
        },
		
        'ZeroClipboard': {
            src: Config.jsurl+'lib/data/ZeroClipboard.js',
            deps: ['jquery']
        },
		
        'jscroll': {
            src: Config.jsurl+'lib/data/jscroll.js',
            deps: ['jquery']
        },

		
		//背景效果 background

        'Backstretch': {
            src: Config.jsurl+'lib/background/Backstretch.js',
            deps: ['jquery']
        },
		
        'prettyPhoto': {
            src: Config.jsurl+'lib/gallery/prettyPhoto.js',
            deps: ['jquery']
        },
				
		//表单 from
		
       'validation': {
            src: Config.jsurl+'lib/form/validation.js',
            deps: ['jquery']
        },

		
        'jqbirth': {
            src: Config.jsurl+'lib/form/jqbirth.js',
            deps: ['jquery']
        },
		
        'jqbirth': {
            src: Config.jsurl+'lib/form/jqbirth.js',
            deps: ['jquery']
        },
		
		//媒体 media
		
        'iWish': {
            src: Config.jsurl+'lib/media/iWish.js',
            deps: ['jquery']
        },
		
		//相册 gallery

        'photoSwipe': {
            src: Config.jsurl+ 'lib/gallery/photoswipe.js',
   		 deps: ['jquery']
		 
		 
		}

},
// 路径配置
paths: {
    'lib': Config.jsurl+'lib',
	'seajs':Config.jsurl+'seajs'
}

});
//入口调用
seajs.use(Config.jsurl+'style/main');

//src入口
//<script src="__ROOT__/statics/js/seajs/seajs.js" data-config="home/config.js" data-main="home/main.js"></script>