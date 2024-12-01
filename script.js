// ==UserScript==
// @name         Bilibili 上传日期显示年份
// @namespace    http://tampermonkey.net/
// @version      2024-12-01
// @description  在Bilibili搜索结果页面显示视频上传日期的年份
// @author       ChenHongJiang
// @match        https://search.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 获取当前年份
    const currentYear = new Date().getFullYear();
    // 延时执行，确保页面完全加载
    setTimeout(() => {
        console.log("脚本已执行");
        // 查找所有的上传日期元素，假设它们在某些特定的类名下
        const timeElements = document.querySelectorAll('.bili-video-card__info--bottom .bili-video-card__info--date');
        if (timeElements.length === 0) {
            console.log("没有找到日期元素，请检查页面结构");
        } else {
            console.log("找到日期元素，开始修改日期");
            timeElements.forEach((el) => {
                let dateText = el.textContent.trim();
                // 如果日期格式是 "1-1" 这样的形式，就加上年份
                const match = dateText.match(/^· (\d{1,2})-(\d{1,2})$/);
                if (match) {
                    // 提取月和日
                    const month = match[1];
                    const day = match[2];
                    dateText = `· ${currentYear}-${month}-${day}`;
                }
                // 更新文本
                el.textContent = dateText;
            });
        }
    });  // 延迟3秒执行
})();