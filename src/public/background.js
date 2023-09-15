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
    Google: {
        id: 'google_id',
        option: [
            {
                allFrames: false,
                id: 'google_id',
                js: ['./page/google/index.js'],
                css: ['./page/google/index.css'],
                runAt: 'document_start',
                matches: ['https://*.google.com/*'],
            },
        ],
    },
}
const listMap = [
    { name: 'Google', value: 1 },
    { name: 'Twitter', value: 1 },
    { name: 'Youtube', value: 1 },
]

chrome.runtime.onInstalled.addListener(async () => {
    const res = await chrome.storage.local.get('websiteList')
    const allset = await chrome.storage.local.get('allset')

    if (allset && allset === 1) {
        // const target = res && res.websiteList ? res.websiteList : listMap
        calucateWebSize(res.websiteList)
    }
})

chrome.runtime.onMessage.addListener(async function (message) {
    if (message.name === 'switchClick') {
        const webList = message.websiteList

        calucateWebSize(webList)
    } else if (message.name === 'switchAll') {
        const setAll = message.allset

        if (setAll === 1) {
            const res = await chrome.storage.local.get('websiteList')
            calucateWebSize(res.websiteList)
        } else {
            unregisterAllDynamicContentScripts()
        }
    }
})

async function unregisterAllDynamicContentScripts() {
    try {
        const scripts = await chrome.scripting.getRegisteredContentScripts()
        const scriptIds = scripts.map((script) => script.id)
        return chrome.scripting.unregisterContentScripts({ ids: scriptIds })
    } catch (error) {
        console.log(error)
    }
}

async function calucateWebSize(webList) {
    webList = webList ? webList : listMap
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
