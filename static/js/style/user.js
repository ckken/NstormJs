define(function(require, exports, module) {

    var $ = require('jquery');
    var backstretch = require('Backstretch');
    var prettyPhoto = require('prettyPhoto');
    var jscroll = require('jscroll');
	//var iWish = require('iWish');
	
    user = function(){};

    user.prototype =  {

        _init:function(){

            var _self = this;
            //加载背景
            _self.bgshow();
            $(window).resize(function() {
                _self.bgshow();
            });
			
			var checklogin = 0;
			$('#login').click(function(){
				if(checklogin==0)
				{
					$('#tips').html('loading......');
					var email = $('#email').val();
					$.post('/member/gate/checkLogin/',{'email':email},function(res)
					{
						if(res.code)$('#tips').html(res.data);
						else
						{
							 $('#tips').html(res.data);
							 checklogin = 1;
							 setTimeout(function(){window.location.href='/'},1000)
						}
					});
				}
			})
			
			
			_self.finish();
			
			
			
        },

        bgshow : function()
        {
			var _self = this;
            _self.width = $(window).width();
            _self.bcenter('#content',1,1);
            _self.change_style();
        },


        change_style : function()
        {
                $.backstretch(Config.site+'/'+User.pic);
                $('.e_bg').css({"position":"absolute"});
                $('.body').css({"background":"none"});
                $('#backstretch').show();
                $('.main').show();
                $('#iphone_title').html('');
        },

        tips:function($txt,$delay,$hide,$show)
        {
            var _show = ($show)?$show:200;
            var _hide = ($hide)?$hide:100;
            var _delay = ($delay)?$delay:2000;
            $('#tips').html($txt);
            $('#tips').show(_show).delay(_delay).hide(_hide);
        },


        bcenter : function(obj,top,left)
        {
                if(top == 1 && left== 1)
                {
                    $(obj).css({
                        position:'absolute',
                        left: ($(window).width() - $(obj).outerWidth())/2,
                        top: ($(window).height() - $(obj).outerHeight())/2-150
                    });
                }
                else if(top == 1 && left!= 1)
                {
                    $(obj).css({
                        position:'absolute',
                        top: ($(window).height() - $(obj).outerHeight())/2
                    });
                }
                else if(top != 1 && left == 1)
                {
                    $(obj).css({
                        position:'absolute',
                        left: ($(window).width() - $(obj).outerWidth())/2
                    });
                }
        },


      
		
		//完成加载
		finish:function()
		{
			$('#popwindow').hide(100);
		}



    }

    module.exports = user;
	
	


});

