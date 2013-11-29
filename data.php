<?php

include ("comm.php");

$ret = authentication();
if ( 0 != $ret )
{
	err_do( "请先登陆。" );
	return;
}

$bid = $_GET["bid"];
$t1 = $_GET["t1"];
$t2 = $_GET["t2"];

$ret = db_begin();
$sql = "select * from tj where v5=" . $bid . " and v4 >= '" . $t1 . "' and v4 <= '" . $t2 . "'";
$db_result = mysql_query($sql);
$data = "create_tj([";
while ($line = mysql_fetch_array($db_result))
{
	$data .= sprintf( "['%s','%s','%s','%s'],", $line["v6"], $line["v4"], $line["v2"], $line["v3"] );
}
$data .= "]);";
db_end();

dlog( $sql );
dlog( $data );

//echo '<script language="javascript">alert(123);</script>';
//js_callback( "alert(123);" );
js_callback( $data );

?>
