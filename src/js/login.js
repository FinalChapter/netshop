$(function(){
    $("#login").validate({
        rules:{
            username:{
             required : true,
             minlength : 6, 
             maxlength : 12
            },
            password:{
             required : true,
             minlength : 6,
             maxlength : 12
            }
        },
        messages:{
            username:{
              required : "用户名不能为空"
            },
            password :{
              required : "密码不能为空"
            }
        },
        submitHandler(form){
             const info= $(form).serialize()
             console.log(info)
            $.post('../server/login.php',info,null,'json').then(function(res){
                console.log(res)
              if(res.code===1){
                $('.login-error').addClass('hide')
                  setCookie('nickname',res.nickname)
                  window.location.href='./index.html'    
              }
              if(res.code===0){
                  $('.login-error').removeClass('hide')
              }
            })
        }
    })
})