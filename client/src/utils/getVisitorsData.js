export default function getVisitorsData() {
    return {
        browserInfo: getBrowserInfo(),
        detectOS: detectOS(),
        screenResolution: getScreenResolution(),
        digits: digits(),
        language: getBrowserLang()
    }

    function getBrowserInfo() {
        var ua = navigator.userAgent.toLocaleLowerCase();
        // 判断是否为IE(第一个是正常的IE，第二个是Edge，第三个是IE11)
        var isIE = (ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1) || ua.indexOf("edge") > -1 || (ua.indexOf("trident") > -1 && ua.indexOf("rv:11.0") > -1);
        // 判断是否为IE5678，!+[1,] 在IE5678返回true，在IE9、IE10、IE11返回false
        var isLteIE8 = isIE && !+[1];
        // 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
        var dm = document.documentMode,
            isIE5,
            isIE6,
            isIE7,
            isIE8,
            isIE9,
            isIE10,
            isIE11;
        if (dm) {
            isIE5 = dm === 5;
            isIE6 = dm === 6;
            isIE7 = dm === 7;
            isIE8 = dm === 8;
            isIE9 = dm === 9;
            isIE10 = dm === 10;
            isIE11 = dm === 11;
        } else {
            // 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性
            isIE5 = isLteIE8 && (!document.compatMode || document.compatMode === "BackCompat");
            // 判断是否为IE6，IE7开始有XMLHttpRequest对象
            isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest;
            // 判断是否为IE7，IE8开始有document.documentMode属性
            isIE7 = isLteIE8 && !isIE6 && !document.documentMode;
            // 判断是否IE8
            isIE8 = isLteIE8 && document.documentMode;
            // 判断IE9，IE9严格模式中函数内部this不为undefined
            isIE9 =
                !isLteIE8 &&
                (function () {
                    "use strict";
                    return !!this;
                })();
            // 判断IE10，IE10开始支持严格模式，严格模式中函数内部this为undefined
            isIE10 =
                isIE &&
                !!document.attachEvent &&
                (function () {
                    "use strict";
                    return !this;
                })();
            // 判断IE11，IE11开始移除了attachEvent属性
            isIE11 = isIE && !document.attachEvent;
        }
        if (isIE5) return "IE5";
        if (isIE6) return "IE6";
        if (isIE7) return "IE7";
        if (isIE8) return "IE8";
        if (isIE9) return "IE9";
        if (isIE10) return "IE10";
        if (ua.indexOf("green") > -1) return "绿色浏览器";
        if (isIE11) return "IE11";
        if (ua.indexOf("qq") > -1) return "QQ浏览器";
        if (ua.indexOf("bidu") > -1) return "百度浏览器";
        if (ua.indexOf("lb") > -1) return "猎豹浏览器";
        if (ua.indexOf("world") > -1) return "世界之窗浏览器";
        if (ua.indexOf("2345") > -1) return "2345浏览器";
        if (ua.indexOf("maxthon") > -1) return "傲游浏览器";
        if (ua.indexOf("tao") > -1) return "淘宝浏览器";
        if (ua.indexOf("ubrowser") > -1) return "UC浏览器";
        if (ua.indexOf("coolnovo") > -1) return "枫叶浏览器";
        if (ua.indexOf("opr") > -1) return "opera浏览器";
        if (ua.indexOf("se") > -1) return "搜狗浏览器";
        if (ua.indexOf("firefox") > -1) return "firefox浏览器";
        if (ua.indexOf("safari") > -1 && ua.indexOf("version") > -1) return "safari浏览器";
        if (window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length) return "360浏览器";
        if (ua.indexOf("chrome") > -1 && window.chrome) return "chrome浏览器";
        return "其他";
    }
    /**
     * 获取操作系统版本
     * @returns {String}
     */
    function detectOS() {
        var sUserAgent = navigator.userAgent;
        var isWin = navigator.platform == "Win32" || navigator.platform == "Windows";
        var isMac = navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel";
        if (isMac) return "Mac";
        var isUnix = navigator.platform == "X11" && !isWin && !isMac;
        if (isUnix) return "Unix";
        var isLinux = String(navigator.platform).indexOf("Linux") > -1;
        if (isLinux) return "Linux";
        if (isWin) {
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";
            var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";
            var isWin8 = sUserAgent.indexOf("windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
            if (isWin8) return "操作系统：Win8";
            var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
            if (isWin10) return "Win10";
        }
        return "other";
    }
    /**
     * 获取屏幕分辨率
     * @returns {String}
     */
    function getScreenResolution() {
        return window.screen.width + "*" + window.screen.height;
    }

    function digits() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var is64 = sUserAgent.indexOf("win64") > -1 || sUserAgent.indexOf("wow64") > -1;
        if (is64) {
            return "64位";
        } else {
            return "32位";
        }
    }
    // 获取系统语言
    function getBrowserLang() {
        var currentLang = navigator.language;
        if (!currentLang) {
            currentLang = navigator.browserLanguage;
        }
        return currentLang;
    }
}
