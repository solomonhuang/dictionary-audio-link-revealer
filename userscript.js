// ==UserScript==
// @name         Dictionary audio link revealer
// @namespace    solomonhuang-dalr
// @version      0.0.1-20191018
// @description  try to take over the world!
// @author       Solomon Huang
// @match        https://dictionary.cambridge.org/dictionary/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('audio source[type="audio/mpeg"]').each(function(index) {
        var src = $( this ).attr('src')
        $(this).parent().parent().siblings().append('<a style="text-decoration:none" href="' + src + '">&#x1f517;</a>')
        //console.log( index + ": " + src)
    })
})();

