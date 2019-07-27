<?php
require "conn.php";
//获取details.js中传递过来的itemid
if(isset($_GET['itemid'])){
    $itemid=$_GET['itemid'];
    $result=$conn->query("select * from piclist where picid=$itemid");
    echo json_encode($result->fetch_assoc());
}