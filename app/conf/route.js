var route = module.exports = {};

route.init=function(app)
{
	//路由
	
	//默认连接
	app.get('/',function(req,res,next){
		C.g='blog';C.m='list',C.a='index';
		require(C.site+'/blog/action/list')['init'](req,res,next,'index');
	});
	//无参数传递
	app.all('/:group/:module/:action',function(req,res,next){
		var g=req.params.group,m=req.params.module,a = req.params.action;C.g=g;C.m=m,C.a=a;
		console.log(g+'/'+m+'/'+a);
		require(C.site+'/'+g+'/action/'+m)['init'](req,res,next,a);
	});
	
	//有参数传递
	app.all('/:group/:module/:action/*',function(req,res,next){
		if(req.params.group!='data'&&req.params.group!='css')
		{
			var list = req.params[0],list=list.split('/'),data = {};
			for(i=0;i<Math.ceil(list.length/2);i++)
			{
				data[list[i*2]]=list[i*2+1];
			}
	
			var g=req.params.group,m=req.params.module,a = req.params.action;
			C.g=g;C.m=m,C.a=a;
			console.log(g+'/'+m+'/'+a);
			req.xdata = data;
			//require(C.site+'/'+g+'/action/'+m)[a](req, res,next);
			require(C.site+'/'+g+'/action/'+m)['init'](req,res,next,a);
		}
		else
		{
			next();
		}
	
	});
	
	
	//404
	app.get('/*',function(req,res){
		return res.render(C.tpl+'error.html', {message: '404'});
	});
	
}