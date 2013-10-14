define(function(require) {


   Array.prototype.in_array = function(e)
    {
        for(i=0;i<this.length;i++)
        {
            if(this[i] == e)
                return true;
        }
        return false;
    }

   /* var c = new Array("Index", "gallery");

    if(c.in_array(Config.action))
    {
        require.async('./'+Config.action,function(res){
        var s = new res();
        s._init();
        });
  }*/
  
	if('undefined'===typeof Cmodule || Cmodule!='user')
		{
			require.async('./common',function(res){
				var s = new res();
				s._init();
			});
		}
  

	var uc = new Array("login", "account_basic","account_pwd","register");
    if('undefined'!== typeof Cmodule && Cmodule == 'ucenter' )
    {
		if(uc.in_array(Caction))
		{
        require.async('./ucenter/'+Caction,function(res){
            var uc = new res();
            uc._init();
        });
		}

    }
	else if('undefined'!== typeof Cmodule && Cmodule !='ucenter')
    {
        require.async('./'+Cmodule,function(res){
        var s = new res();
        s._init();
        });
    }
	




});


