/* 
* IWishQuery v1.0 - jQuery Plugin
* Copyright (c) 2011 Ludvig Lindblom
* Author: Ludvig Lindblom, http://internuts.se, http://code.internuts.se/jquery/iwish
* Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {
	$.fn.iWish = function (options) {
		// Declare variables (and create a audio element in the DOM for reference below when checking if the browser supports the HTML5 <audio>-tag)
		var audioSource = options.audioSource, myAudio = document.createElement("audio"), fileExt, i = true;
		// Check if the browser supports the HTML5 <audio>-tag
		if (myAudio.canPlayType) {
			// Set the variable fileExt to whatever file format supported by the browser
			fileExt = (!!myAudio.canPlayType && "" != myAudio.canPlayType('audio/mpeg') ? "mp3" : (!!myAudio.canPlayType && "" != myAudio.canPlayType('audio/wav') ? "wav" : (!!myAudio.canPlayType && "" != myAudio.canPlayType('audio/ogg; codecs="vorbis"') ? "ogg" : false)));
			// Loop through all the <audio>-tags in the document
			$(this).each(function () {
				// If the <audio>-tag lacks a src attribute and <source>-tag
				if (typeof $(this).attr("src") === "undefined" && $(this).children("source").size() < 1) {
					// Append a <source>-tag to the <audio>-tag with the file and correct file format
					$(this).append('<source src="' + audioSource + '.' + fileExt + '">');
					if (options.autoPlay && i) { // If we set autoplay to true when calling the function...
						$(this).attr("autoplay", true); // ...add autoplay="true" to the first of all <audio>-tags
						i = false;
					}
				}
			});
		} else { // If the browser doesnt support the <audio>-tag we let the user know that and remove the element
			$(this).each(function () {
				$(this).after('<p class="no-support">Your browser does not support the audio-tag.</p>');
				$(this).hide();
			});
		}
	}
})(jQuery);
