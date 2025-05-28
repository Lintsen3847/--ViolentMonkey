// ==UserScript==
// @name         次元城動畫播放器淨化
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  隱藏影片進度條，阻止開發者工具跳轉百度
// @author       Lin_tsen
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 阻止跳轉百度的防偵錯腳本
    const originalDebug = window.debugger;
    Object.defineProperty(window, 'debugger', {
        get: function () {
            return function () {}; // 覆寫為空
        },
        set: function () {}
    });

    // 阻止 setInterval偵測開發者工具
    const originalSetInterval = window.setInterval;
    window.setInterval = function(fn, delay) {
        const fnStr = fn.toString();
        if (fnStr.includes('debugger') && fnStr.includes('baidu.com')) {
            console.log('Blocked setInterval with debugger + baidu redirect');
            return null;
        }
        return originalSetInterval(fn, delay);
    };

    // 當頁面載入完成後隱藏 mini-progress 元素
    window.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .mini-progress {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    });

})();


// / \----------------,
// \_,|               |
//     |    Lin_tsen   |
//     |  ,--------------
//     \_/_____________/
