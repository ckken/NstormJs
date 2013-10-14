define(function(require, exports, module) {

    var $ = require('jquery');
    var backstretch = require('Backstretch');
    var prettyPhoto = require('prettyPhoto');
    var jscroll = require('jscroll');
	//var iWish = require('iWish');
	
    common = function(){};

    common.prototype =  {

        _init:function(){

            var _self = this;
			$(function(){
				$('#validateMail').click(function(){
					time = $(this).attr('rel');
					$.post('/member/gate/validateMail',{time:time},function(res){
						
							alert(res.data);
						
						
					})
				})
			})
        },



    }

    module.exports = common;
	
	


});

