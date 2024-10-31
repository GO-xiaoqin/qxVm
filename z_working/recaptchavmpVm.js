/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-10-30 13:51:17
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-10-31 15:07:39
 * @FilePath: /qxVm/z_working/recaptchavmpVm.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
const QXVM_GENERATE = require('../qxVm_sanbox/qxVm.sanbox');
const axios = require('axios');


// 替换 \x 转义序列
function decodeHexEscapes(str) {
    return str.replace(/\\x([0-9A-Fa-f]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
    });
}

// 替换 \u 转义序列
function decodeUnicodeEscapes(str) {
    return str.replace(/\\u([0-9A-Fa-f]{4})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
    });
}

// 解码 Base64 编码的字符串的方法
function decodeBase64(base64String) {
    try {
        // 使用 Buffer.from 将 Base64 字符串转换为 Buffer
        const buffer = Buffer.from(base64String, 'base64');

        // 将 Buffer 转换为 UTF-8 字符串
        const decodedString = buffer.toString('utf-8');

        return decodedString;
    } catch (error) {
        console.error('Error decoding the string:', error.message);
        return null; // 或者你可以选择抛出异常，根据你的需求
    }
}

// 请求的URL
const url = 'https://recaptcha.net/recaptcha/api2/anchor?ar=1&k=6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-&co=aHR0cHM6Ly9yZWNhcHRjaGEubmV0OjQ0Mw..&hl=zh-CN&v=-ZG7BC9TxCVEbzIO2m429usb&size=normal&sa=action&cb=wv4815pyvyki';

// 请求头
const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Priority': 'u=0, i',
    'Referer': 'https://recaptcha.net/recaptcha/api2/demo',
    'Sec-Ch-Ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'iframe',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
};

// 设置超时时间
const timeout = 5000; // 5秒

// 发送GET请求
axios.get(url, {
    headers: headers,
    timeout: timeout,
    proxy: {
        protocol: "http",
        host: "172.30.48.1",
        port: "8888"
    }
})
    .then(response => {
        if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        // 提取 recaptcha-token 的值
        // console.log(response.data)
        const tokenRegex = /<input[^>]*id="recaptcha-token"[^>]*value="([^"]*)"/;
        const tokenMatch = response.data.match(tokenRegex);
        const recaptchaTokenValue = tokenMatch ? tokenMatch[1] : null;

        // console.log('recaptcha-token value:', recaptchaTokenValue);

        // 提取 recaptcha.anchor.Main.init 中的值
        const initRegex = /recaptcha\.anchor\.Main\.init\("([^"]*)"\);/;
        const initMatch = response.data.match(initRegex);
        const initValue = initMatch ? initMatch[1] : null;

        // 先解码 \x 转义序列
        // 再解码 \u 转义序列
        let decodedString = decodeUnicodeEscapes(decodeHexEscapes(initValue));

        try {
            // 使用 JSON.parse 将解码后的字符串转换为数组
            const actualArray = eval(decodedString);
            let url = actualArray[1][1]
            let data = actualArray[1][3]
            decodedString = decodeBase64(url);
            if (decodedString !== null) {
                url = "https:" + decodedString
                // 设置请求配置
                const config = {
                    method: 'get',
                    url: url,
                    headers: {
                        'Accept': '*/*',
                        'Accept-Language': 'zh-CN,zh;q=0.9',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Referer': 'https://recaptcha.net/',
                        'Sec-Ch-Ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
                        'Sec-Ch-Ua-Mobile': '?0',
                        'Sec-Ch-Ua-Platform': '"Windows"',
                        'Sec-Fetch-Dest': 'script',
                        'Sec-Fetch-Mode': 'no-cors',
                        'Sec-Fetch-Site': 'cross-site',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
                    },
                    proxy: {
                        protocol: "http",
                        host: "172.30.48.1",
                        port: "8888"
                    }
                };

                // 发送请求
                axios(config)
                    .then(function (response) {
                        if (response.status !== 200) {
                            throw new Error(`Request failed with status ${response.status}`);
                        }
                        // console.log(response.data)
                        const regex = /\[\'\(function\(\)[\s\S]*?call\(this\);\'\]/;
                        // 执行匹配
                        const match = response.data.match(regex);

                        if (match) {
                            data = decodeBase64(data);
                            if (data !== null) {
                                const js_code = eval(match[0]).join('\n');
                                const user_config = {
                                    isTest: true,
                                    compress: false,
                                    runConfig: { proxy: true, logOpen: true },
                                    window_attribute: {},

                                    env: {
                                        canvas: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg==",
                                        plugin: [
                                            { description: "Portable Document Format", filename: "internal-pdf-viewer", name: "Chrome PDF Plugin", MimeTypes: [{ description: "Portable Document Format", suffixes: "pdf", type: "application/x-google-chrome-pdf" }] },
                                            { description: "", filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai", name: "Chrome PDF Viewer", MimeTypes: [{ description: "", suffixes: "pdf", type: "application/pdf" }] },
                                            { description: "", filename: "internal-nacl-plugin", name: "Native Client", MimeTypes: [{ description: "Native Client Executable", suffixes: "", type: "application/x-nacl" }, { description: "Portable Native Client Executable", suffixes: "", type: "application/x-pnacl" }] }
                                        ],
                                        navigator: {
                                            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.55"
                                        },
                                        location: {
                                            href: "https://recaptcha.net/"
                                        },
                                        document: {
                                            cookie: ""
                                        }
                                    }
                                }

                                // 打印帮助信息
                                QXVM_GENERATE.help()

                                let result = QXVM_GENERATE.sanbox(js_code, "this", user_config);
                                let sb = new result.this.botguard.bg(data, function () { });
                                console.log(sb.invoke(function () { }, !1));
                                console.log(result.printLog());
                            } else {
                                console.log('Failed to decode the data.');
                            }

                        } else {
                            console.log('没有找到匹配的匿名函数');
                        }
                    })
                    .catch(function (error) {
                        // 处理错误
                        console.error(error);
                    });
            } else {
                console.log('Failed to decode the string.');
            }
        } catch (error) {
            console.error('Error: ', error.message);
        }

    })
    .catch(error => {
        if (axios.isCancel(error)) {
            console.error('Request cancelled', error.message);
        } else if (error.response) {
            console.error('Error Response:', error.response.data);
            console.error('Error Status:', error.response.status);
            console.error('Error Headers:', error.response.headers);
        } else {
            console.error('Error Message:', error.message);
        }
        console.error('Request Config:', error.config);
    });
