var email = module.exports = {};
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "QQ",
    auth: {
        user: "sharemt@qq.com",
        pass: "ck666666"
    }
});

// setup e-mail data with unicode symbols
//var mailOptions = {
//    from: "Fred Foo ✔ <sharemt@qq.com>", // sender address
//    to: "ckken@qq.com", // list of receivers
//    subject: "Hello ✔", // Subject line
//    text: "Hello world ✔", // plaintext body
//    html: "<b>Hello world ✔</b>" // html body
//}



email.init = function(req,res,next,a)
{
    if('function'!==typeof email[a])next();
    email[a](req,res,next);
}

email.send = function(to,title,text)
{

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: "NodeJs开发交流社区 <sharemt@qq.com>", // sender address
        to: to, // list of receivers
        subject: title, // Subject line
        //text: text, // plaintext body
        html: text // html body
    }


    smtpTransport.sendMail(mailOptions, function(error, res){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + res.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

email.test = function(req,res,next)
{

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });

}

