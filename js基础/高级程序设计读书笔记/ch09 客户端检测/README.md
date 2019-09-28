# 第九章 客户端检测
客户端检测包括：能力监测、怪癖检测、用户代理检测等。这里主要记录用户代理检测。

### 用户代理检测
1.识别引擎  
IE Gecko WebKit KHTML  Opera

2.识别浏览器  
ie firefox safari konq opera chrome

3.识别平台  
Windows、Mac、Unix

  移动设备：  
  iphone、ipod、ipad、ios、android、nokiaN、 winMobile

  游戏系统：  
  wii ps

完整代码：
```js
let client = function() {
    //呈现引擎
    let engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        // 完整版本号
        ver: null
    };
    // 浏览器
    let browser = {
        // 主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        // 具体版本号
        ver: null
    };

    // 平台/设备/操作系统
    let system = {
        win: false,
        mac: false,
        x11: false,
        // 移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        // 游戏系统
        wii: false,
        ps: false
    };

    // 检测呈现引擎和浏览器
    let ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        // \S 匹配一个非空白字符
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);
        // 确定是chrome还是safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parentFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parentFloat(browser.ver);
        } else {
            //近似的确定版本号
            let safariVersion = 1;
            if (engine.webkit < 100) {
                let safariVersion = 1;
            } else if (engine.webkit < 312) {
              let safariVersion = 1.2;  
            } else if (engine.webkit < 412) {
              let safariVersion = 1.3;
            } else {
                let safariVersion = 2;
            }

            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);

        // 确定是不是firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }

    // 检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    // 检测平台
    let p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "x11") || (p.indexOf("Linux") == 0);

    // 检测window操作系统
    if (system.win) {
        if (/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch(RegExp["$2"]) {
                    case "5.0":
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }

    // 移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("ipad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    // windows mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }

    // 检测ios版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU (?:iphone)?OS (/d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2;  //不能正确检测出来，只能猜测
        }
    }

    // 检测android
    if (/Android (\d+\.\d+)/.test(ua)) {
        system.android = parsentFloat(RegExp.$1);
    }

    // 游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    // 返回检测对象
    return {
        engine: engine,
        browser: browser,
        system: system
    }
}();

```
