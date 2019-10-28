// ==UserScript==
// @name         Dictionary audio link revealer
// @namespace    https://github.com/solomonhuang/dictionary-audio-link-revealer
// @version      0.0.2-20191028
// @description  Add audio file link of dictionary pages
// @author       Solomon Huang
// @match        https://dictionary.cambridge.org/dictionary/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/solomonhuang/dictionary-audio-link-revealer/master/userscript.js
// @downloadURL  https://raw.githubusercontent.com/solomonhuang/dictionary-audio-link-revealer/master/userscript.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var daud = document.getElementsByClassName('daud')
    for (var i = 0; i < daud.length; i++) {
        var a = daud[i].getElementsByTagName('audio')
        var src = a[0].children[0].src
        var link = document.createElement('a')
        link.href = src
        link.style = 'text-decoration:none'
        link.appendChild(document.createTextNode('&#x1F517;'))
        daud[i].children[1].append(link)
    }

})();

