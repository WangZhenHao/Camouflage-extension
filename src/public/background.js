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
// const listMap = [
//     { name: 'google', value: 1 },
//     { name: 'twitter', value: 1 },
//     { name: 'youtube', value: 1 },
// ]
const webMap = {
    google: {
        id: 'google',
        option: [
            {
                allFrames: false,
                id: 'google',
                js: ['./page/google/index.js'],
                css: ['./page/google/index.css'],
                runAt: 'document_start',
                matches: ['https://*.google.com/*'],
            },
        ],
    },
}
const listMap = [
    { name: 'google', value: 1 },
    { name: 'twitter', value: 1 },
    { name: 'youtube', value: 1 },
]

chrome.runtime.onInstalled.addListener(async () => {
    const res = await chrome.storage.local.get('websiteList')
    const target = res && res.websiteList ? res.websiteList : listMap

    calucateWebSize(target)
})

chrome.runtime.onMessage.addListener(function (message) {
    if (message.name === 'switchClick') {
        const webList = message.websiteList

        calucateWebSize(webList)
    }
})

async function calucateWebSize(webList) {
    const scripts = await chrome.scripting.getRegisteredContentScripts()

    webList.forEach((item) => {
        const webDetail = webMap[item.name]

        if (!webDetail) return

        const scriptDetail = scripts.find((detial) => detial.id === webDetail.id)

        if (item.value === 1) {
            !scriptDetail && registerContentScripts(webDetail.option)
        } else {
            scriptDetail && removeContentScripts([scriptDetail.id])
        }
    })
}

function registerContentScripts(list) {
    chrome.scripting.registerContentScripts(list)
}

function removeContentScripts(scriptIds) {
    chrome.scripting.unregisterContentScripts({ ids: scriptIds })
}
