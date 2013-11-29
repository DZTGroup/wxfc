<?php

$bid = $_GET["bid"];
$tc1 = $_GET["tc1"];
$tc2 = $_GET["tc2"];

include ("comm.php");

$i = 0;
$sql = "select * from user_pic_message where ";
db_begin();
select_db( "house_view" );
while ($line = mysql_fetch_array($db_result))
{
	$ts = date( "Y-m-d", $line["insert_time"] );
	dlog( $ts . "\n" );
	if ( $ts >= $tc1 && $ts <= $tc2 )
	{
		if ( 0 == $i++ )
		{
			$sql = $sql . sprintf( "id=%s ", $line["id"] );
		}
		else
		{
			$sql = $sql . sprintf( "or id='%s' ", $line["id"] );
		}
	}
}
$sql .= ";";
db_end();

dlog( $sql . "\n" );

db_begin();
$db_result = mysql_query($sql);
$arr = "show_img([";
while ($line = mysql_fetch_array($db_result))
{
	$arr .= sprintf( "['%s','%s'],", $line["pic_url"], $line["id"] );
}
db_end();
$arr .= "]);";

//dlog( $arr );

js_callback( $arr );

?>
