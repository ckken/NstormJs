var list = require('./base');

list.my = function(req, res, next) {

	var _S = this;
	var page = req.query.p;
	var perPage = (req.query.pr) ? req.query.pr : 10;
	var pageList = '';
	//搜索
	var where = {};
	var s = req.query.s;
	var s = eval("\/" + s + "\/i");
	if ('undefined' != typeof req.query.s) {
		where.$or = [{
				title: s
			}, {
				content: s
			}
		];
	}
	where.email = user.email;
	var op = {};
	op.where = where;
	op.page = page;
	op.perPage = perPage;


	D('Blog')._list(op, function(err, todos) {

		if (err) return next(err);

		todos.data.forEach(function(vo) {
			vo.creattime = _S.date.dgm(vo.creattime, 'yyyy-mm-dd hh:ii:ss');
			vo.updatetime = _S.date.dgm(vo.updatetime, 'yyyy-mm-dd hh:ii:ss');
			vo.avatar = _S.encode.md5(vo.email);
			vo.content = _S.html.delHtmlTag(vo.content);
			vo.content = vo.content.substring(0, 250);
		})

		pageList = _S.pN.pageNavi(page, todos.count, perPage);
		res.render('blog/index.html', {
			todos: todos.data,
			page: pageList
		});
	});
}


list.author = function(req, res, next) {

	if (req.xdata.name == '') {
		next();
	} else {
		var _S = this;
		var page = req.query.p;
		var perPage = (req.query.pr) ? req.query.pr : 10;
		var pageList = '';
		//搜索
		var where = {};
		var s = req.query.s;
		var s = eval("\/" + s + "\/i");
		if ('undefined' != typeof req.query.s) {
			where.$or = [{
					title: s
				}, {
					content: s
				}
			];
		}
		where.author = req.xdata.name;
		var op = {};
		op.where = where;
		op.page = page;
		op.perPage = perPage;


		D('Blog')._list(op, function(err, todos) {

			if (err) return next(err);

			todos.data.forEach(function(vo) {
				vo.creattime = _S.date.dgm(vo.creattime, 'yyyy-mm-dd hh:ii:ss');
				vo.updatetime = _S.date.dgm(vo.updatetime, 'yyyy-mm-dd hh:ii:ss');
				vo.avatar = _S.encode.md5(vo.email);
				vo.content = _S.html.delHtmlTag(vo.content);
				vo.content = vo.content.substring(0, 250);
			})

			pageList = _S.pN.pageNavi(page, todos.count, perPage);
			where = {
				name: req.xdata.name,
				status: true
			};


			D('Member').model().findOne(where, function(err, userinfo) {

				if ('undifined' !== typeof userinfo) {

					userinfo.avatar = _S.encode.md5(userinfo.email);
					res.render('blog/author.html', {
						todos: todos.data,
						page: pageList,
						author: where.author,
						userinfo: userinfo
					});
				} else {
					next();
				}

			})



		});
	}
}

list.add = function(req, res, next) {

	if (!user.status) return res.render('error.html', {
			message: '社区只为验证邮件用户开放发布话题服务'
		});
	res.render('blog/add.html');
}


list.edit = function(req, res, next) {
	if (!user.status) return res.render('error.html', {
			message: '社区只为验证邮件用户开放发布话题服务'
		});
	if ('undefined' === typeof req.xdata) next();
	var _S = this;
	var id = req.xdata.id;

	D('Blog').model().findById(id, function(err, row) {
		if (err) {
			return res.render('error.html', {
				message: err
			});
		}
		if (!row) {
			return res.render('error.html', {
				message: '非法操作'
			});
		}
		res.render('blog/edit.html', {
			todo: row
		});
	});

}


list.insert = function(req, res, next) {

	var _S = this;
	var title = req.body.title || '';
	var content = req.body.content || '';
	title = title.trim();
	content = content.trim();
	if (!title) {
		return res.render('error.html', {
			message: '标题是必须的'
		});
	} else if (!content) {
		return res.render('error.html', {
			message: '内容不能为空！'
		});
	}
	//重复添加
	D('Blog').count({
		email: user.email,
		title: title
	}, function(err, count) {

		if (count > 0) {
			return res.render('error.html', {
				message: '存在同标题的内容！'
			});
		} else {

			var d = {};
			d.pic = _S.Up.init(req.files.pic);
			d.title = title;
			d.ip = user.ip;
			d.email = user.email;
			d.author = user.name;
			d.content = req.body.content;
			d.status = (req.body.status == 1) ? true : false;

			D('Blog').insert(d, function(err, row) {
				if (err) return next(err);
				D('Member').update({
					email: d.email
				}, {
					$inc: {
						postnum: 1
					}
				}, function(r) {});
			})
			res.redirect('/');

		}

	});

}

list.update = function(req, res, next) {
	var _S = this;
	if ('undefined' !== typeof req.xdata && req.xdata.id != '') {

		var title = req.body.title || '';
		title = title.trim();
		if (!title) {
			return res.render('error.html', {
				message: '标题是必须的'
			});
		}
		var d = {};
		var id = req.xdata.id;
		if ('undefined' !== typeof req.files) d.pic = _S.Up.init(req.files.pic);
		d.title = title;
		d.ip = user.ip;
		d.content = req.body.content;
		d.status = (req.body.status == 1) ? true : false;
		d.updatetime = C.time();



		D('Blog').update({
			_id: id
		}, d, function(err, result) {
			if (err) return res.render('error.html', {
					message: '找不到相关资源'
				});
			res.redirect('/blog/userblog/edit/id/' + id);
		});
	} else {
		next();
	}
}

list.delete = function(req, res, next) {
	var _S = this;
	var id = req.xdata.id;
	D('Blog').model().findById(id, function(err, row) {

		if (err) {
			return res.render('error.html', {
				message: '找不到相关资源'
			});
		} else {
			D('Blog').delete({
				_id: id
			}, function(err) {
				if (err) {
					return next(err);
				}

				D('Member').update({
					email: row.email
				}, {
					$inc: {
						postnum: -1
					}
				}, function(r) {});
				if (row.pic != '') {
					fs = require('fs');
					fs.unlink(C.static + row.pic);
				}
				res.redirect('/');
			});
		}
	});

}



module.exports = list;