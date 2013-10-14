define(function(require, exports, module) {

    var $ = require('jquery');
    var photoSwipe = require('photoSwipe');
    var klass = require('lib/gallery/klass');

    function gallery()
    {

    }

    module.exports = gallery;

    gallery.prototype._init = function(){

        (function(window, $, PhotoSwipe){

            $(document).ready(function(){

                var options = {};
                $("#Gallery a").photoSwipe(options);

            });

        }(window, window.jQuery, window.Code.PhotoSwipe));
    }
});

