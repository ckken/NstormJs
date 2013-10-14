var list = require('./base');

list.json = function(req, res, next) {

	var _S = this;
	if ('undefined' !== typeof req.xdata) {
		var id = req.xdata.id;
		D('Blog').model().findById(id,'comments', function(err, row) {
			if (err) {
				return res.render('error.html', {
					message: err
				});
			}
			if (!row) {
				return res.render('error.html', {
					message: '非法操作 找不到相关资源'
				});
			}

			res.json(row.comments);


		});
	} else {
		next();
	}

}

list.insert = function(req, res, next) {

	var _S = this;
	if ('undefined' !== typeof req.xdata) {
		var id = req.xdata.id;
		D('Blog').model().findById(id, function(err, row) {
			if (err) {
				return res.render('error.html', {
					message: err
				});
			}
			if (!row) {
				return res.render('error.html', {
					message: '非法操作 找不到相关资源'
				});
			}
			//console.log(row);
			row.comments.push({
				'comment': '非法操作 找不到相关资源'
			});

			row.save(function(err) {
				if (!err) console.log('Success!');
				res.json({data:'Success',code:0});
			});


		});
	} else {
		next();
	}
}

list.delete = function(req, res, next) {

	var _S = this;
	if ('undefined' !== typeof req.xdata) {
		var id = req.xdata.id;
		D('Blog').model().find({"comments.id":id}, function(err, row) {
			if (err) {
				return res.render('error.html', {
					message: err
				});
			}
			console.log(row);
			if (!row) {
				return res.render('error.html', {
					message: '非法操作 找不到相关资源'
				});
			}

			res.json(row.comments);


		});
	} else {
		next();
	}
}


module.exports = list;