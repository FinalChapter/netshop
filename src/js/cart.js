$(function(){
    const nickname = getCookie('nickname')
    if(!nickname) return window.location.href='../html/login.html'
    $('.apply').on('click',function(){
      window.location.href="../html/register.html"
   })
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
    const cart = JSON.parse(window.localStorage.getItem("cart"))||[]
    if(!cart.length){
        $('.no-goods').removeClass('hide')
        $('.main-info').addClass('hide')
        return
    }
   $('.main-info').removeClass('hide')
   $('.no-goods').addClass('hide')
    bindhtml()
    function bindhtml(){
      if(!cart.length) return  window.location.reload()
       const checkAll = cart.every(item => item.is_select == 1)
       //总数
      //总价
       let total =0
       let totalPrice =0
        cart.forEach(item =>{
            if(item.is_select == 1){
                total+=(item.cart_number -0)
                totalPrice += item.cart_number * item.goods_price
            }
        })
        let str =`
        <ul class="table-head">
        <li class="selectAll"><input type="checkbox" ${checkAll? "checked" :""}>全选</li>
        <li>商品</li>
       <li>属性</li>
       <li>单价</li>
       <li>数量</li>
       <li>小计</li>
        <li>操作</li>
   </ul> 
   <h4>360商城直营</h4>
   <p><span>满赠</span> 还差201元，可领取赠品1件 去凑单 ></p>
   <ol class="tab-body">`
   cart.forEach(item => {
    str+=`<li>
          <div class="goods-check select"><input type="checkbox" data-id="${item.goods_id}" type="checkbox" ${item.is_select == 1? 'checked':''}></div>
          <div class="goods-name">
              <img src="${item.goods_small_logo}" alt="">
              <p>${item.goods_name}</p>
          </div>
          <div class="goods-type">黑色</div>
          <div class="price">￥${item.goods_price}</div>
          <div class="goods-number count"><p><span class="subNum" data-id="${item.goods_id}">-</span><input type="text" data-id="${item.goods_id}" value="${item.cart_number}"><span class="addNum" data-id="${item.goods_id}">+</span></p> </div>
          <div class="xiaoji">￥${(item.goods_price * item.cart_number).toFixed(2)}</div>
          <div class="operate"><span class="del" data-id="${item.goods_id}">删除</span></div>
      </li>`
   })
   str+=`
   </ol>
  <div class="tab-foot">
      <div class="tab-foot-left">
          <div class="check-all selectAll">
              <input type="checkbox" ${checkAll? "checked" :""}>全选
          </div>
          <span class="clearCart">删除所有商品</span>
      </div>
      <div class="tab-foot-right">
          <div>
            <span> 已选<span class="total-num">${total}件</span>商品</span><i class="total-price">合计：¥${totalPrice.toFixed(2)}元</i>
            <p>已优惠：￥0.00</p>
            </div>
            <button class="${total === 0? '':'active'}" ${total === 0? 'disabled':''}>去结算</button>
            <button class="go-list">去继续购物</button>
        </div>
   </div>`
  $('.cart-info').html(str)
  }
     //选中
     $('.cart-info').on('click','.select > input', function(){
         const good = cart.filter(item => item.goods_id == $(this).attr('data-id'))[0]
         good.is_select = this.checked? 1 : 0
         bindhtml()
         window.localStorage.setItem('cart',JSON.stringify(cart))
     })
     //减少
     $('.cart-info').on('click','.count  .subNum', function(){
       const good = cart.filter(item => item.goods_id == $(this).attr('data-id'))[0]
       if(good.cart_number>1)  good.cart_number--
         bindhtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
     })
     //添加
     $('.cart-info').on('click','.count  .addNum', function(){
       const good = cart.filter(item => item.goods_id == $(this).attr('data-id'))[0]
        good.cart_number++
        bindhtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
     })
     //删除
     $('.cart-info').on('click','.operate  > .del', function(){
         cart.forEach((item,index) => {
          if(item.goods_id == $(this).attr('data-id')){
            cart.splice(index,1)
          }   
        })
         bindhtml()
         window.localStorage.setItem('cart',JSON.stringify(cart))
     })
    $('.cart-info').on('mouseleave','.count input',function(){
        if($(this).val()-0 > 0){
         const good = cart.filter(item => item.goods_id == $(this).attr('data-id'))[0]
         good.cart_number = $(this).val()-0 
         bindhtml()
         window.localStorage.setItem('cart',JSON.stringify(cart))
        }else{
         bindhtml()
        }
    })
    $(".cart-info").on('click','.selectAll > input',function(){
     if(!this.checked) {
       cart.forEach(item =>{
         item.is_select=0
       })
     }else{
       cart.forEach(item =>{
           item.is_select=1
       })
     }
       bindhtml()
       window.localStorage.setItem('cart',JSON.stringify(cart)) 
    })
    $(".cart-info").on('click','.tab-foot  .clearCart',function(){
     window.localStorage.removeItem('cart') 
     window.location.reload()
    })
     $(".cart-info").on('click','.tab-foot-right > .go-list',function(){
      window.location.href = "../html/list.html"
     })
    // $(".cart-info").on('click','.operate > .paybtn',function(){
    //   $('.pay').toggleClass("hide")
    // })
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