import './App.css'
import { Switch } from 'antd'
import { useState, useEffect } from 'react'

interface typeWebList {
    name: string
    value: number
}

const listMap = [
    { name: 'Google', value: 1 },
    { name: 'Twitter', value: 1 },
    { name: 'Youtube', value: 1 },
]

const setWebsiteListFn = (websiteList: typeWebList[]) => {
    chrome.storage.local.set({
        websiteList,
    })
    chrome.runtime.sendMessage({
        name: 'switchClick',
        websiteList,
    })
}
const WebList = () => {
    const [websiteList, setWebsiteList] = useState<typeWebList[]>([])
    const [all, setAll] = useState(1)

    useEffect(() => {
        ;(async () => {
            const res = await chrome.storage.local.get('websiteList')
            const resAll = await chrome.storage.local.get('allset')

            const target = res && res.websiteList ? res.websiteList : listMap
            const allsetValue = resAll && typeof resAll.allset == 'number' ? resAll.allset : 1

            setWebsiteList(target)
            setWebsiteListFn(target)
            setAll(allsetValue)

            if (allsetValue === 0) {
                chrome.action.setBadgeText({ text: 'OFF' })
            }
        })()
    }, [])

    function HanldeSwitch(index: number, item: typeWebList) {
        if (all === 0) return

        item.value = item.value === 1 ? 0 : 1
        websiteList[index] = item

        setWebsiteListFn(websiteList)
        setWebsiteList([...websiteList])
    }

    function hanlelAllSwitch() {
        let allset = all === 1 ? 0 : 1
        setAll(allset)

        chrome.storage.local.set({
            allset,
        })
        chrome.runtime.sendMessage({
            name: 'switchAll',
            allset,
        })

        if (allset === 0) {
            chrome.action.setBadgeText({ text: 'OFF' })
        } else {
            chrome.action.setBadgeText({ text: '' })
        }
    }

    const list = websiteList.map((item, index) => (
        <div
            key={item.name}
            className='flex-box m-b-10 justify-content item'
            onClick={() => HanldeSwitch(index, item)}
        >
            <span className='p-r-10 web-name'>{item.name}</span>
            <Switch disabled={all === 0} checked={item.value === 1}></Switch>
        </div>
    ))

    return (
        <>
            {list}
            <Switch
                checkedChildren='ON'
                unCheckedChildren='OFF'
                checked={all === 1}
                onChange={hanlelAllSwitch}
            />
        </>
    )
}
const Hearder = () => {
    return <h3 className='title'>网站伪装</h3>
}
function App() {
    return (
        <div className='app'>
            <Hearder></Hearder>
            <WebList></WebList>
        </div>
    )
}

export default App
