var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('debug', true);

function D(obj) {
	var o = new Object;
	this.obj = obj;
	//o._d = ('undefined' !== typeof mongoose.model(obj)) ? mongoose.model(obj) : require(C.model + '/' + obj + 'Model');
	o._d = require(C.model + '/' + obj.toLocaleLowerCase() + 'Model');
	//console.log(C.model + '/' + obj.tolocaleUpperCase() + 'Model');
	o.model = function()
	{

		return o._d;
	}

	o.insert = function(data, callback) {
		var d = new o._d(data);
		d.save(function(err) {
			if (err) {
				callback(err);
			} else {
				callback(null);
			}
		});
	}

	o.update = function(where, data, callback) {
		o._d.update(where, data, {
			safe: false,
			multi: false
		}, function(err, ef) {
			if (err) callback(err);
			callback(ef);
		})

	}

	o._list = function(opt, callback) {
		var D = o._d;
		var where = ('undefined' !== typeof opt.where) ? opt.where : {};
		var page = ('undefined' !== typeof opt.page) ? opt.page : 1;
		var perPage = ('undefined' !== typeof opt.perPage) ? opt.perPage : 10;
		var bysort = ('undefined' !== typeof opt.sort) ? opt.sort : {
			'_id': -1
		};
		D.count(where, function(err, count) {
			D.find(where).sort(bysort).skip((page - 1) * perPage).limit(perPage).exec(function(err, doc) {
				var d = [];
				d.data = doc;
				d.count = count;
				//console.log(d.data[0].email);
				callback(err, d);
			})
		});
	}

	o.count = function(where, callback) {
		//获取总数
		o._d.count(where, function(err, count) {
			callback(err, count);
		});
	}

	o.delete = function(where, callback) {

		o._d.remove(where, function(err) {
			if (err) {
				callback(err);
			} else {

				callback(null);
			}
		});
	}

	return o;
}


module.exports = D;