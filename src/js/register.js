$(function(){
    let flag = true;
    $("#register").validate({
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
            },
            repassword:{
             required :true,
             equalTo:"#password"
            },
            nickname:{
                required : true,
                minlength : 6,
                maxlength : 12
            },

        },
        messages:{
            username:{
              required : "用户名不能为空"
            },
            password :{
              required : "密码不能为空"
            },
            repassword:{
                equalTo: "前后密码不一致"
            },
            nickname:{
                required : "昵称不能为空"
              },
        },
        submitHandler(form){
             const info= $(form).serialize()
             console.log(info)
             if(!flag){
                return  
             } 
             flag=false
            $.post('../server/register.php',info,null,'json').then(function(res){
              flag=true
              if(res.code===1){
                $('.apply-error').addClass('hide')
                  alert("注册成功！") 
              }
              if(res.code===0){
                $('.apply-error').html(res.message)
                  $('.apply-error').removeClass('hide')
              }
            })
        }
    })

})