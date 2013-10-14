define(function(require, exports, module) {

    var $ = require('jquery');	
    edit = function(){};

    edit.prototype =  {

        _init:function(){

            var _self = this;
			require.async('kindeditor',function(){
						_self.editor();
			});
			
		}
		
		,editor:function()
		{
				KindEditor.basePath = Config.jsurl+'lib/editor/kindeditor/';
				KindEditor.ready(function(K) {
						K.create('.qqeditor', {
							themeType : 'default',
							items : [
								'source','bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent','link','code','clearhtml','quickformat'
							]
						}
					);
				});
		}

		
		
		


    }
    module.exports = edit;
});

