var list = require('./base');

 list.index = function (req, res, next) {
  	  var _S = this;
	  var page = (req.query.p>0)?req.query.p:1;
	  var perPage = (req.query.pr)?req.query.pr:10;
	  var pageList = '';
	  //搜索
	  var where = {};
	  var s = req.query.s;
	  var s = eval("\/"+s+"\/i");
	  if('undefined'!=typeof req.query.s) 
	  {
		  where.$or=[{title:s},{content:s}];
	  }
	   where.status = true;
	   var op = {};
	   op.where = where; 
	   op.page = page; 
	   op.perPage = perPage;


		  
		  D('Blog')._list(op,function(err,todos){
		  
		  if (err) return next(err); 

		  todos.data.forEach(function(vo){ 
			  vo.creattime = _S.date.dgm(vo.creattime,'yyyy-mm-dd hh:ii:ss');
			  vo.updatetime = _S.date.dgm(vo.updatetime,'yyyy-mm-dd hh:ii:ss');
			  vo.avatar = _S.encode.md5(vo.email);
			  vo.content = _S.html.delHtmlTag(vo.content);
			  vo.content = vo.content.substring(0,250);
		  })
  
		  pageList = _S.pN.pageNavi(page,todos.count,perPage);
		  res.render('blog/index.html', {todos: todos.data,page:pageList});
	  });
  }


  list.content =  function (req, res, next) {
  
  var _S = this;
	  if('undefined'!==typeof req.xdata)
	  {
		  var id = req.xdata.id;
	  D('Blog').model().findById(id, function (err, row) {
		  if (err) {
			  return res.render('error.html', {message:err});
		  }
		  if (!row) {
			  return res.render('error.html', {message: '非法操作 找不到相关资源'});
		  }
  
		  row.creattime = _S.date.format(row.creattime,'yyyy-mm-dd hh:ii:ss');
		  row.updatetime = _S.date.format(row.updatetime,'yyyy-mm-dd hh:ii:ss');
		  row.avatar = _S.encode.md5(row.email);
  		  res.render('blog/content.html', {todo: row,view:row.view+1});
  		  D('Blog').update({_id:row.id},{$inc:{view:1}},function(r){});
  			
  
	  });
	  }
	  else
	  { 
		  next();
	  }
  }




module.exports = list;
 