// ==UserScript==
// @name         Dictionary audio link revealer
// @namespace    https://github.com/solomonhuang/dictionary-audio-link-revealer
// @version      0.0.0-devel
// @description  Add audio file link of dictionary pages
// @author       Solomon Huang
// @match        https://dictionary.cambridge.org/dictionary/*
// @match        https://tw.dictionary.search.yahoo.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/solomonhuang/dictionary-audio-link-revealer/master/userscript.js
// @downloadURL  https://raw.githubusercontent.com/solomonhuang/dictionary-audio-link-revealer/master/userscript.js
// ==/UserScript==

(function() {
    'use strict';

    var currentDict = location.hostname

    function createICON() {
        let icon = document.createElementNS('http://www.w3.org/2000/svg','svg')
        // SVG icon alighment style
        // Elliot Dahl ( https://twitter.com/Elliotdahl )
        // https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
        icon.setAttribute('style','height:1em;width:1em;top: .125em;position: relative;display: inline-flex;align-self: center;')
        let c = document.createElementNS('http://www.w3.org/2000/svg','circle')
        c.setAttribute('cx', '50%')
        c.setAttribute('cy', '50%')
        c.setAttribute('r', '40%')
        c.setAttribute('stroke', 'green')
        c.setAttribute('storke-width', '10%')
        c.setAttribute('fill', 'yellow')
        icon.appendChild(c)
        return icon
    }

    function createLink(src) {
        let link = document.createElement('a')
        link.href = src
        link.style = 'text-decoration:none'
        link.appendChild(createICON())
        return link
    }

    if (/dictionary\.cambridge\.org/.test(currentDict)) {
        let daud = document.querySelectorAll('.daud')
        for (var i = 0; i < daud.length; i++) {
            let a = daud[i].getElementsByTagName('audio')
            let src = a[0].children[0].src
            let link = document.createElement('a')
            link.href = src
            link.style = 'text-decoration:none'
            link.appendChild(createICON())
            daud[i].children[1].append(link)
        }
    }

    if (/tw\.dictionary\.search\.yahoo\.com/.test(currentDict)) {
        let dict_sound = document.querySelectorAll('.dict-sound')
        // TODO: fix with MutationObserver
        // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
        setTimeout(() => {
            for (let i = 0; i < dict_sound.length; i++) {
                let src = dict_sound[i].children[0].src
                dict_sound[i].parentElement.append(createLink(src))
            }
        },1000)
    }

})();

