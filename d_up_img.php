<?php

$id = $_GET["id"];

include ("comm.php");

$sql = "delete from house_view where id=" . $id;
db_begin();
$db_result = mysql_query($sql);
db_end();

dlog( $sql . "\n" . mysql_error() . "\n" );

js_callback( "document.getElementById('fm1').submit();" );

?>
