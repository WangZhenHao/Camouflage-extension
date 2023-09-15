const logoIcon = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
const baiduIcon = 'https://www.baidu.com/img/flexible/logo/pc/result.png'

const page = {
    init() {
        document.addEventListener('readystatechange', (e) => {
            this.changeIcon()
            const logo = document.querySelector('.lnXdpd')
            const icon = document.querySelector('.logo .jfN4p')
            const btn = document.querySelectorAll('input[aria-label="Google Search"]')
            const btnRihgt = document.querySelectorAll('input[aria-label="I\'m Feeling Lucky"]')

            const gb_B = document.querySelector('.gb_B')

            var offer = document.querySelector('#SIvCob')

            if (offer) {
                offer.innerHTML = offer.innerHTML.replace('Google', 'Baidu')
            }
            // var picture = document.querySelectorAll('picture');
            // if(picture) {
            //     picture.children[0]
            // }
            // console.log(icon)
            if (logo) {
                // logo.src = logoIcon
                logo.setAttribute('src', logoIcon)
                logo.setAttribute('srcset', logoIcon)
            }

            if (icon) {
                icon.setAttribute('src', baiduIcon)
                // logo.src = baiduIcon
            }

            if (btn) {
                btn.forEach((item) => (item.value = '百度一下'))
                btnRihgt.forEach((item) => (item.value = '百度手气'))
            }

            gb_B ? (gb_B.innerHTML = 'Bmail') : void 0

            document.head.innerHTML =
                document.head.innerHTML +
                '<link rel="shortcut icon" href="https://www.baidu.com/favicon.ico" type="image/x-icon">'
            document.title = '百度一下，你就知道'
        })
    },
    changeIcon() {
        const voice = document.querySelector('.XDyW0e')
        const photo = document.querySelector('.nDcEnd')

        voice ? (voice.innerHTML = '<span class="voice-btn"></span>') : void 0

        photo ? (photo.innerHTML = '<span class="soutu-btn"></span>') : void 0
    },
}

page.init()
