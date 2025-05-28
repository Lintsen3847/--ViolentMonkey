// ==UserScript==
// @name         次元城優化
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  隱藏影片進度條，阻止開發者工具跳轉百度
// @author       Lin_tsen
// @match        https://www.ciyuancheng.net/watch/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 嘗試攔截 setInterval 裡含 debugger 且有 baidu.com 的函數，阻止執行
    const originalSetInterval = window.setInterval;
    window.setInterval = function(fn, delay, ...args) {
        const fnStr = fn.toString();
        if (fnStr.includes('debugger') && fnStr.includes('baidu.com')) {
            console.log('Blocked setInterval with debugger + baidu redirect');
            return null;
        }
        return originalSetInterval(fn, delay, ...args);
    };

})();


// / \----------------,
// \_,|               |
//     |    Lin_tsen   |
//     |  ,--------------
//     \_/_____________/
