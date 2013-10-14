var gate = module.exports = {};
//var memberDB = require(C.model+'/member');
var encode = require(C.common+'/encode');
var email = require('./email');

gate.init = function(req,res,next,a)
{
    if('function'!==typeof gate[a])next();
    gate[a](req,res,next);
}


gate.login = function(req,res)
{
    res.render('member/login.html');
}


gate.checkLogin = function(req,res)
{
    if(req.body.email!='')
    {
        var email = req.body.email.trim();
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!emailReg.test(email))res.json({code:1,data:'邮箱格式不对'});
        else
        {
            var headers = req.headers;
            req.ip = headers['x-real-ip'] || headers['x-forwarded-for']||req.ip;

            var d = {}; var name = email.split('@');
            d.email = email;
            d.name = name[0];
            D('Member').model().findOne({email:d.email},function(err,data){

                if(!data)
                {
                    d.regip = req.ip;
                    d.logip = req.ip;
					//d.name += C.now;
                    D('Member').insert(d, function (err, id) {
                        var key = {name:d.name,email:d.email,uid:id};
                        key = JSON.stringify(key);
                        key = encode.e(key);
                        res.cookie('user',key,{ maxAge: C.maxAge ,path: '/',signed: true});
                        //res.cookie('user',{name:d.name,email:d.email,uid:id},{ maxAge: C.maxAge ,path: '/',signed: true});
                        res.json({code:0,data:"注册成功，进行登录......"});
                    });
                }
                else
                {
                    d.logip = req.ip;
                    // console.log(d);
                   D('Member').update({email: d.email},d, function (err, row) {
                        var key = {name:data.name,email:data.email,uid:data.id,status:data.status};
                        key = JSON.stringify(key);
                        key = encode.e(key);
                        res.cookie('user',key,{ maxAge: C.maxAge ,path: '/',signed: true});
                        //res.cookie('user',{name:data.name,email:data.email,uid:data.id},{ maxAge: C.maxAge ,path: '/',signed: true});
                        res.json({code:0,data:"匹配成功，进行登录......"});
                    });
                }
            })



        }
    }
    else
    {
        res.json({code:1,data:"邮箱不能为空"});
    }


}

gate.logout = function(req,res)
{
    res.clearCookie('user', { path: '/' });
    res.redirect('/member/gate/login/');
}

gate.register=function(req,res)
{

}

gate.validateMail = function(req,res,next)
{
    var userstr = req.signedCookies.user;
    userstr = encode.d(userstr);
    var user = eval('(' + userstr + ')');

    if('undefined'==typeof user)return res.json({code:1,data:userstr});
	if(user.status)return res.json({code:1,data:"已经验证"});
	if('undefined'==typeof req.body.time)return res.json({code:2,data:'验证数据有误'});
	console.log(req.cookies.validateMail);

		if('undefined'=== typeof req.cookies || 'undefined'=== typeof req.cookies.validateMail)
		{
			
			var key = {name:user.name,email:user.email,uid:user.id};
			key = JSON.stringify(key);
			key = encode.e(key);
			//console.log(key);
			email.send(user.email,'欢迎登录nodejs社区','欢迎登录nodejs社区<br>激活社区帐号 -----> <a href="http://'+req.headers.host+'/member/gate/actionMail/key/'+key+'">点击激活</a>');
			res.cookie('validateMail',req.body.time,{maxAge:120000});
			return res.json({code:0,data:"验证邮箱已经发送 请留意查收......"});
		}
		else
		{
			return res.json({code:1,data:"请等待120秒再尝试重发验证"});
		}
       // res.redirect('/');
}

gate.actionMail = function(req,res,next)
{
    var userstr = encode.d(req.xdata.key);
    var user = eval('(' + userstr + ')');

       if(user.status)
       {res.redirect('/');next();}
    D('Member').count(user,function(err,count){
        if(count>0)
        {
            D('Member').update({email: user.email},{status:true},function(err, row){

                var key = {name:user.name,email:user.email,uid:user.id,status:true};
                key = JSON.stringify(key);
                key = encode.e(key);
                res.cookie('user',key,{ maxAge: C.maxAge ,path: '/',signed: true});


                res.redirect('/');
            })
        }
        else
        {
            next();
        }
    })
}