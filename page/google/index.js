const logoIcon = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
const baiduIcon = 'https://www.baidu.com/img/flexible/logo/pc/result.png'

const page = {
    init() {
        document.addEventListener('readystatechange', function(e) {
            const logo = document.querySelector('.lnXdpd');
            const icon = document.querySelector('.logo .jfN4p')
            const btn = document.querySelectorAll('input[aria-label="Google Search"]')
            const btnRihgt = document.querySelectorAll('input[aria-label="I\'m Feeling Lucky"]')
            console.log(icon)
            if(logo) {
                // logo.src = logoIcon
                logo.setAttribute('src', logoIcon)
                logo.setAttribute('srcset', logoIcon)
            }

            if(icon) {
                icon.setAttribute('src', baiduIcon)
                // logo.src = baiduIcon
            }

            if(btn) {
                btn.forEach(item => item.value = '百度一下')
                btnRihgt.forEach(item => item.value = '百度手气')
            }
            
            document.head.innerHTML = document.head.innerHTML + '<link rel="shortcut icon" href="https://www.baidu.com/favicon.ico" type="image/x-icon">'
            document.title = '百度一下，你就知道'
        })
    }
}



page.init()