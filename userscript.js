// ==UserScript==
// @name         Dictionary audio link revealer
// @name:zh-TW   網路字典發音下載
// @namespace    https://github.com/solomonhuang/dictionary-audio-link-revealer
// @version      0.1.1
// @description  Add audio file link of dictionary pages
// @description:zh-TW 在網路字典的發音按鈕旁邊新增聲音檔下載。
// @author       Solomon Huang
// @license      MIT
// @match        https://dictionary.cambridge.org/dictionary/*
// @match        https://tw.dictionary.search.yahoo.com/*
// @match        https://www.oxfordlearnersdictionaries.com/definition/*
// @match        https://www.dictionary.com/browse/*
// @grant        none
// @supportURL   https://github.com/solomonhuang/dictionary-audio-link-revealer/issues
// ==/UserScript==

(function() {
    'use strict';

    var currentDict = location.hostname

    function createICON(fontSZ) {
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
        return link
    }

    function appendICON(el, src) {
        let fontSZ = parseFloat(getComputedStyle(el).fontSize)
        let link = createLink(src)
        link.appendChild(createICON(fontSZ))
        el.append(link)
    }

    if (/dictionary\.cambridge\.org/.test(currentDict)) {
        let daud = document.querySelectorAll('.daud')
        for (var i = 0; i < daud.length; i++) {
            let a = daud[i].getElementsByTagName('audio')
            let src = a[0].children[0].src
            appendICON(daud[i].children[1], src)
        }
    }

    if (/tw\.dictionary\.search\.yahoo\.com/.test(currentDict)) {
        let dict_sound = document.querySelectorAll('.dict-sound')
        // TODO: fix with MutationObserver
        // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
        setTimeout(() => {
            for (let i = 0; i < dict_sound.length; i++) {
                let src = dict_sound[i].children[0].src
                appendICON(dict_sound[i].parentElement, src)
            }
        },1000)
    }

    if (/www\.oxfordlearnersdictionaries\.com/.test(currentDict)) {
        let icon_audio = document.querySelectorAll('.icon-audio')
        for (let i = 0; i < icon_audio.length; i++) {
            let src = icon_audio[i].attributes["data-src-mp3"].value
            appendICON(icon_audio[i].parentElement, src)
        }
    }

    if (/www\.dictionary\.com/.test(currentDict)) {
        let audio_wrapper = document.querySelectorAll('.audio-wrapper')
        for (let i = 0; i < audio_wrapper.length; i++) {
            let src = audio_wrapper[i].children[1].children[1].src
            appendICON(audio_wrapper[i], src)
        }
    }

})();

