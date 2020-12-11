<?php
$cat_one = $_GET['cat_one'];
$pagesize = $_GET['pagesize'];
$sql = "SELECT * FROM `goods`";
  if ($cat_one != 'all') $sql .= " WHERE `cat_one_id`='$cat_one'";
  $link = mysqli_connect('localhost','root','root','database');
  $res = mysqli_query($link,$sql);
  $data = mysqli_fetch_all($res,MYSQLI_ASSOC);
  mysqli_close($link);
  $total = ceil(count($data)/$pagesize);
  echo json_encode(array(
      'message' => "获取总页数成功",
         'code' => 1,
         'data' => $total
  ));
  

  
?>