
class Banner {
  constructor (ele) {
    this.ele = document.querySelector(ele)
    this.imgBox = this.ele.querySelector('.imgBox')
    this.pointBox = this.ele.querySelector('.pointBox')
    this.leftRightBox = this.ele.querySelector('.leftRightBox')
    this.index = 0
    this.timer = 0
    this.init()
  }
  init () {
    this.setPoint()
    this.autoPlay()
    this.overOut()
    this.leftRight()
    this.pointEvent()
    this.changePage()
  }
  setPoint () {
    const pointNum = this.imgBox.children.length
    const frg = document.createDocumentFragment()
    for (let i = 0; i < pointNum; i++) {
      const li = document.createElement('li')
      if (i === 0) li.className = 'active'
      li.setAttribute('i', i)
      frg.appendChild(li)
    }
    this.pointBox.appendChild(frg)
    this.pointBox.style.width = pointNum * 15 * 1.5 + 'px'
  }

  changeOne (type) {
    this.imgBox.children[this.index].classList.remove('active')
    this.pointBox.children[this.index].classList.remove('active')
    if (type === true) {
      this.index++
    } else if (type === false) {
      this.index--
    } else {
       this.index = type
    }
    if (this.index >= this.imgBox.children.length) this.index = 0
    if (this.index < 0) this.index = this.imgBox.children.length - 1

    this.imgBox.children[this.index].classList.add('active')
    this.pointBox.children[this.index].classList.add('active')
    
  }
  autoPlay () {
    this.timer = setInterval(() => {
      this.changeOne(true)
    }, 2000)
  }
  overOut () {
    this.ele.addEventListener('mouseover', () => clearInterval(this.timer))
    this.ele.addEventListener('mouseout', () => this.autoPlay())
  }

  // 6. 左右切换
  leftRight () {
    this.leftRightBox.addEventListener('click', e => {
      e = e || window.event
      const target = e.target || e.srcElement

      if (target.className === 'left') {
        this.changeOne(false)
      }

      if (target.className === 'right') {
        this.changeOne(true)
      }
    })
  }
  pointEvent () {
    this.pointBox.addEventListener('click', e => {
      e = e || window.event
      const target = e.target || e.srcElement
      if (target.nodeName === 'LI') {
        const i = target.getAttribute('i') - 0
        this.changeOne(i)
      }
    })
  }
  changePage () {
    document.addEventListener('visibilitychange', () => {
      const state = document.visibilityState
      if (state === 'hidden') clearInterval(this.timer)
      if (state === 'visible') this.autoPlay()
    })
  }
}
