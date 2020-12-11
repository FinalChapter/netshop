$(function(){
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
       window.location.href="../html/index.html"
    })
  }
    const id =  getCookie("goods_id") 
    let cartInfo = null
    getGoodsInfo()
   async function getGoodsInfo(){
      const goods=  await $.get('../server/getGoodsInfo.php',`goods_id=${id}`,null,'json')
      cartInfo = goods.info
      bindHtml(goods.info)
    }
    function bindHtml(info){
       $('#enlarge-box').html(
          `
          <div class="show">
          <img src="${info.goods_big_logo}" alt="">
          <div class="mask"></div>
        </div>
        <div class="list">
          <p class="active">
            <img src="${info.goods_small_logo}" show="${info.goods_big_logo}" enlarge="${info.goods_big_logo}" alt="">
          </p>
        </div>
        <!-- 放大镜盒子 -->
        <div class="enlarge" style="background-image: url(${info.goods_big_logo});"></div>
          `
       )
       $(".goods-main-info").html(`
       <h3>${info.goods_name}</h3>
       <p>1080P高清 增强夜视 AI增强人形侦测</p>
       <a href="">2k高清新品摄像机、存储卡、上墙支架等更多商品，点击查看>></a>
       <ol class="priceBox">
        <li><i>价&nbsp;&nbsp;&nbsp;格</i><b class="curr-price">￥${info.goods_price}</b><span class="old-price">￥169</span></li>
        <li>
          <i>促&nbsp;&nbsp;&nbsp;销</i>
          <ul class="discount">
            <li><span>直降</span>立减 40.00 元</li>
            <li><span>满赠</span>满399元送数据线</li>
         </ul>
        </li>
        </ol>
       <div class="goods-type">
        <i>分&nbsp;&nbsp;&nbsp;类</i>
        <span class="active">标配</span>
       </div>
       <div class="goods-number">
           <i>数&nbsp;&nbsp;&nbsp;量</i>
          <p><span class="subNum">-</span><input type="text" value ="1" class="cartNum"><span class="addNum">+</span></p> 
       </div>
       <div class="opt">
         <a href="../html/list.html" class="golist" >继续购买</a>
         <span  class="addCart">加入购物车</span>
       </div>      
       `)
       $('.goodsDesc').html(info.goods_introduce)
       new magnifier('#enlarge-box')
    }
    $('.goods-main-info').on('click','.addCart',function(){
       const cart = JSON.parse(window.localStorage.getItem('cart'))||[]
       const flag= cart.some(item => item.goods_id == id) 
       if(!/^[0-9]+$/.test($('.cartNum').val()-0)||$('.cartNum').val()-0===0) return alert("请输入正确数量")
       if(flag){ 
        const good=cart.filter(item => item.goods_id == id)[0] 
        good.cart_number = good.cart_number-0+($('.cartNum').val()-0)
       }else{ 
        cartInfo.cart_number=$('.cartNum').val()-0
        cart.push(cartInfo)
       }
     window.localStorage.setItem('cart',JSON.stringify(cart))
      alert(`成功加入${$('.cartNum').val()-0}件商品`)
    })
    .on('click','.subNum',function(){
     let goodnum = $('.cartNum').val()-0
     if(goodnum > 1)  goodnum--
     $('.cartNum').val(goodnum)
    })
    .on('click','.addNum',function(){
       let goodnum = $('.cartNum').val()-0
       goodnum++
       $('.cartNum').val(goodnum)
      })
    .on('click','.goGoodList',function(){
      window.location.href='./list.html'
    })
    $('.index-cart').on('click',".cart-img" ,function(){
      window.location.href="../html/cart.html"
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
