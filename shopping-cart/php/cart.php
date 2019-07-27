<?php
 require "conn.php";

 if(isset($_POST['itemid'])){
    $itemid=$_POST['itemid'];
        $result=$conn->query("select * from piclist where picid=$itemid");
        echo json_encode($result->fetch_assoc());
    }
 