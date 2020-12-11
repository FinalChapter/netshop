
$(function(){
  new Banner(".banner-list")
  $('.login').on('click',function(){
     window.location.href="../html/login.html"
  })
  $('.apply').on('click',function(){
   window.location.href="../html/register.html"
})
  const nickname= getCookie("nickname")
  if(nickname){
     $(".user-login-in").html(`欢迎！ ${nickname}<ul class="hide"><li>退出登录</li></li>`)
     $(".user-login-in").on('click',function(){
        $('.user-login-in>ul').toggleClass("hide")
     })
     $('.user-login-in>ul').on('click',function(){
        setCookie("nickname","",-1)
        window.location.reload()
     })
  }
getCatelistinfo()
function getCatelistinfo(){
   for(let i =0 ;i< $(".cateBox ol li").length ;i++){
    const  index = $(".cateBox ol li").eq(i).attr('data-index')
      $.ajax({
      url:"/data",
      data:`type=pc_index_category&id=${index}`,
      dataType:'json',
      success:function(res){
       const str= bindcatehtml(res.data)
       $(".cateBox ol li").eq(i).find('.cate-info').html(str)
      }
   }) 
}
}
$(".cateBox ol li").mouseover(function(){
   $(this).find('.cate-info').removeClass('hide')
})
$(".cateBox ol li").mouseout(function(){
   $(this).find('.cate-info').addClass('hide')
})
function bindcatehtml(res){
   //console.log(res.secondary)
let str=``   
res.secondary.forEach(item=>{
  str+=`
 <div class="info2">
   <div class="info2-left">
    <span>${item.name}</span> 
   </div>
 <div class="info2-right">`
item.item.forEach(item=>{
   str+=`  <div class="info3">
  <img src="${item.pic}" alt="">
    <div>
       <span class="${item.tag? `info3-hot`:''}">${item.tag}</span>
       <i >${item.name}</i>
    </div>
  </div>`
})
str+=`</div>
  </div> `
})
return str
}
$('.index-cart').on('click',".cart-img" ,function(){
   window.location.href="../html/cart.html"
}) 
$('.cate-all').on('click',function(){
   window.location.href="../html/list.html"
})
 searchinfo()
 function searchinfo(){
   const ol = $(".searchbox ol")[0]
   const input = $(".searchbox .searchInp")[0]
   input.addEventListener('input',function(){
        value = this.value.trim()
       if(!value) {
          $(ol).addClass('hide')
           return
       }
      let url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindSearchHtml&_=1605768936993`
      const script = document.createElement('script')
      script.src= url
      document.body.appendChild(script)
      script.remove()
   })
   }
   $(window).scroll(function(){
      //卷去高度
      const scrolltop = document.documentElement.scrollTop || document.body.scrollTop
      const window_height = document.documentElement.clientHeight
     
      for(let i =0; i<$('.main .main-floor').length;i++){
         const li_height = $($('.main .main-floor')[i]).outerHeight()
         const li_top =$($('.main .main-floor')[i]).offset().top
         const ul_top =$('.main').offset().top
         const ul_height = $('.main').outerHeight()
         if(li_top-40<=scrolltop){
             $($('.window-left>ul>li')[i]).addClass("active").siblings().removeClass("active")
         }
         if( ul_top>=scrolltop+window_height || ul_top+ul_height<=scrolltop+window_height){
            $(".window-left").css({'display':'none'})
        }else{
         $(".window-left").css({'display':'block'})
        }
      //    if(ul_height+ul_top<=scrolltop+window_height){
      //       $(".window-left").hide()
      //    }
      //   } 
      //   if(scrolltop>$($('.main .main-floor')[0]).outerHeight()){
      //    $(".window-left").show()
      //    $('.window-right  .go-top').removeClass('hide')
      // }else{
      //    $(".window-left").removeClass()
      //    $('.window-right  .go-top').addClass('hide')
      }
   })
   
   $(".window-left>ul>li").click(function(){
      $("html").animate({scrollTop:$('.main .main-floor').eq($(this).index()).offset().top-40},()=>{
           $(this).addClass("active").siblings().removeClass("active") 
      })
    
  })
  $('.window-right').on("click",'.go-top',function(){
          $("html").animate({scrollTop:0},()=>{
       })
  })

})
 let value =""
function bindSearchHtml(res){
const ol = $(".searchbox ol")[0]     
  if (!res.g ||!value) {
    $(ol).addClass('hide')
      return
  }
  const frg = document.createDocumentFragment()
for(let i =0;i<res.g.length;i++){
   const li = document.createElement('li')
   li.innerHTML=res.g[i].q
    frg.appendChild(li)
}
ol.innerHTML=''
ol.appendChild(frg)
$(ol).removeClass("hide")
}