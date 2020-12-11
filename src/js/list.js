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
    const list_info={
        cat_one : 'all',
        sort_method :'默认',
        sort_type :"ASC",
        current: 1,
        pagesize : 20
    }
    let goodslist=null
     getCatOne()
     async function getCatOne(){
     const catone_list = await $.get('../server/getCatOne.php',null,null,'json')
     let str=`<span data-type="all" class="active">全部</span>`
     catone_list.list.forEach(item => {
         str+=`<span data-type="${item.cat_one_id}">${item.cat_one_id}</span>`
     });
     $('.first-type >.type-list').html(str)
    }
     //渲染分页器
    getPageTotal()
    async function getPageTotal(){
     const pagetotal = await $.get("../server/getPageTotal.php",list_info,null,'json')
     $('.pagination').pagination({
         pageCount : pagetotal.data,
         coping: true,
         homePage: '首页', 
         endPage: '末页',
         //绑定事件
         callback(index){
          list_info.current = index.getCurrent()
          getGoodsList()
         }
     })
   }
    getGoodsList()
    async function getGoodsList(){
       const goodlist = await $.get("../server/getGoodsList.php",list_info,null,'json')
        let str =''
         goodslist= goodlist.list
         goodlist.list.forEach((item,index) =>{
          str+=`<div class="goods-item" style="${(index+1)%5===0?'margin-right:0':'' }">
             <img src="${item.goods_big_logo}" alt="">
            <p data-id="${item.goods_id}" style="cursor: pointer;">${item.goods_name}</p>
            <i >￥${item.goods_price}</i>
            <span class="glyphicon glyphicon-shopping-cart addCart" data-id="${item.goods_id}">加入购物车</span>
            </div>`
       })
       $('.goods-list-center').html(str)
   }
     //一级菜单绑定事件
     $('.first-type >.type-list').on('click','span',function(){
         $(this).addClass("active").siblings().removeClass("active")
         const type = $(this).attr('data-type')
         list_info.cat_one = type
         list_info.current =1
         getPageTotal()
         getGoodsList()
     })
     //排序方式绑定
     $('.sort-type > .type-list').on('click','span',function(){
         $(this).addClass('active').siblings().removeClass('active')
         const method = $(this).attr("data-method")
         const sortType = $(this).attr("data-type")
         list_info.sort_method = method
         list_info.sort_type =sortType
         getPageTotal()
         getGoodsList()
        $(this).attr('data-type',sortType==='ASC'? "DESC":"ASC").siblings().attr('data-type','ASC')
     })
     //跳转详情页
     $('.goods-list-center').on('click','p',function(){
      const id= $(this).attr("data-id")
      setCookie("goods_id",id)
      window.location.href="../html/detail.html"
     })
    //加入购物车
     $('.goods-list-center').on('click','.addCart',function(){
           const cart = JSON.parse(window.localStorage.getItem('cart'))||[]
           const id = $(this).attr('data-id')
           const flag= cart.some(item => item.goods_id == id)
           if(flag){
            const good=cart.filter(item => item.goods_id == id)[0] 
            good.cart_number = good.cart_number-0+1
           }else{
            const info=goodslist.filter(item => item.goods_id == id)[0] 
            info.cart_number=1
            cart.push(info)
           }
         window.localStorage.setItem('cart',JSON.stringify(cart))
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