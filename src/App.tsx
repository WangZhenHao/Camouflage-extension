import './App.css'
import { Switch } from 'antd'
import { useState, useEffect } from 'react'

interface typeWebList {
    name: string
    value: number
}

const listMap = [
    { name: 'google', value: 1 },
    { name: 'twitter', value: 1 },
    { name: 'youtube', value: 1 },
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

    useEffect(() => {
        ;(async () => {
            const res = await chrome.storage.local.get('websiteList')

            const target = res && res.websiteList ? res.websiteList : listMap
            setWebsiteList(target)

            setWebsiteListFn(target)
        })()
    }, [])

    function HanldeSwitch(index: number, item: typeWebList) {
        item.value = item.value === 1 ? 0 : 1
        websiteList[index] = item

        setWebsiteListFn(websiteList)
        setWebsiteList([...websiteList])
    }

    const list = websiteList.map((item, index) => (
        <div
            key={item.name}
            className='flex-box m-b-10 justify-content item'
            onClick={() => HanldeSwitch(index, item)}
        >
            <span className='p-r-10 web-name'>{item.name}</span>
            <Switch checked={item.value === 1}></Switch>
        </div>
    ))

    return <>{list}</>
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
