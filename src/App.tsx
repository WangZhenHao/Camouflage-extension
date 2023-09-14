import './App.css'
import { Switch } from 'antd'
import { useState } from 'react'

interface typeWebList {
    name: string
    value: number
}

const Hearder = () => {
    return <h3 className='title'>网站伪装</h3>
}
const WebList = () => {
    const [websiteList, setWebsiteList] = useState([
        { name: 'google', value: 0 },
        { name: 'twitter', value: 1 },
        { name: 'youtube', value: 1 },
    ])

    function HanldeSwitch(index: number, item: typeWebList) {
        item.value = item.value === 1 ? 0 : 1
        websiteList[index] = item

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
function App() {
    return (
        <div className='app'>
            <Hearder></Hearder>
            <WebList></WebList>
        </div>
    )
}

export default App
