<?php
 $username = $_POST['username'];
 $password =$_POST['password'];
 $nickname = $_POST['nickname'];
 
 $link = mysqli_connect('localhost','root','root','database');
 $sql = "SELECT * FROM `users` WHERE `username` = '$username'";
 $res = mysqli_query($link,$sql);
 $data = mysqli_fetch_all($res,MYSQLI_ASSOC);
 if(count($data)){      
     echo json_encode(array(
         'message' => "用户名已存在",
         'code' => 0 
     ));
 }else{
    $sql = "INSERT INTO `users`(`username`,`password`,`nickname`) VALUES('$username','$password','$nickname')";
    $res = mysqli_query($link,$sql);
    if($res){
        echo json_encode(array(
            "message" => "注册成功",
            "code" => 1
        ));  
    }else{
        echo json_encode(array(
        "message" => "注册失败",
        "code" => 0
    ));  
    }
   
}
?>