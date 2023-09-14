// const regMap = {
//     googel: {
//         re: new RegExp("www.google.com"),
//         cssFile: ["./page/google/index.css"],
//         jsFile: ["./page/google/index.js"],
//     },
// };

// function injectScript(webPage, tab) {
//     if (!webPage || !tab) return;

//     const target = {
//         tabId: tab.tabId,
//     };

//     chrome.scripting
//         .insertCSS({
//             target,
//             files: webPage.cssFile,
//         })
//         .catch((res) => {
//             console.error("插入css失败", res, webPage, tab);
//         });

//     chrome.scripting
//         .executeScript({
//             target,
//             files: webPage.jsFile,
//         })
//         .catch((res) => {
//             console.error("插入js失败", res, webPage, tab);
//         });
// }

// // 页面DOM渲染内容渲染完毕后
// chrome.webNavigation.onCompleted.addListener((details) => {
//     if (details.frameId === 0) {
//         for (let key in regMap) {
//             const item = regMap[key];

//             if (item.re.test(details.url)) {
//                 injectScript(item, details);
//             }
//         }
//     }
// });
const listMap = [
    { name: 'google', value: 1 },
    { name: 'twitter', value: 1 },
    { name: 'youtube', value: 1 },
]

chrome.runtime.onInstalled.addListener(async () => {
    // const storage = chrome.storage.local
    // let item = await storage.get('websiteList')

    // item = item ? item : listMap
    // console.log(item)

    chrome.scripting.registerContentScripts([
        {
            allFrames: false,
            id: 'proxy',
            js: ['./page/google/index.js'],
            css: ['./page/google/index.css'],
            runAt: 'document_start',
            matches: ['https://*.google.com/*'],
        },
    ])
})

chrome.runtime.onMessage.addListener(async function (message) {
    // const storage = chrome.storage.local
    // let item = await storage.get('websiteList')

    console.log(message)
})

// function registerContentScripts(list) {}

// function removeContentScripts() {

// }
