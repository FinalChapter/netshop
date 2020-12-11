//放大镜

function magnifier(ele){
    this.ele = document.querySelector(ele)
    this.show = this.ele.querySelector('.show')
    this.list = this.ele.querySelector('.list')
    this.enlarge = this.ele.querySelector('.enlarge')
    this.mask = this.ele.querySelector('.mask')
    this.showWidth = this.show.clientWidth
    this.showHeight = this.show.clientHeight
    this.largeWidth = parseInt(window.getComputedStyle(this.enlarge).width) 
    this.largeHeight =parseInt(window.getComputedStyle(this.enlarge).height)
    this.bgWidth = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0]) 
    this.bgHeight = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1]) 
    this.init()
}
magnifier.prototype.init = function(){

  this.masksize()

  this.moveinto()

  this.move()

  this.change()
  console.log(this.showHeight)
}
magnifier.prototype.masksize = function(){
  this.maskWidth = this.largeWidth*this.showWidth/this.bgWidth 
  this.maskHeight = this.largeHeight*this.showHeight/this.bgHeight 
  this.mask.style.width=this.maskWidth+'px'
  this.mask.style.height =this.maskHeight+'px'
}
//移入移出显示
magnifier.prototype.moveinto = function(){
   this.show.addEventListener('mouseover',() =>{
       this.mask.style.display = 'block'
       this.enlarge.style.display = 'block'
   }) 
    this.show.addEventListener('mouseout',() =>{
       this.mask.style.display = 'none'
       this.enlarge.style.display = 'none'
   })

}
magnifier.prototype.move = function(){
    this.show.addEventListener('mousemove',e=>{
      e = e || window.event
       let x  = e.offsetX -this.maskWidth/2
       let y  = e.offsetY - this.maskHeight/2
     if(x<=0) x=0
     if(y<=0) y=0
     if(x>= this.showWidth-this.maskWidth) x= this.showWidth-this.maskWidth 
     if(y>= this.showHeight-this.maskHeight) y= this.showHeight-this.maskHeight
     this.mask.style.top = y+'px'
     this.mask.style.left = x+'px'
      const bgx = x*this.largeWidth/this.maskWidth
      const bgy = y*this.largeHeight/this.maskHeight
      this.enlarge.style.backgroundPosition = `-${bgx}px -${bgy}px`
     
    })
}
//点击切换图片
magnifier.prototype.change = function(){
    this.list.addEventListener('click',e=>{ 
        e = e || window.event
        const target = e.target || e.srcElement
        if(target.nodeName === 'IMG'){
         console.log('点击率')
         const show_url = target.getAttribute('show')
         const enlarge_url = target.getAttribute('enlarge')
         console.log(show_url)
         this.show.firstElementChild.src=show_url
         this.enlarge.style.backgroundImage = `url(${enlarge_url})`
        } 
         for (let i = 0; i < this.list.children.length; i++) {
          this.list.children[i].classList.remove('active')
         }
        target.parentElement.classList.add('active')
    })  
  
}
