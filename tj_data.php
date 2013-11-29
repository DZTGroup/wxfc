<?php

header("Content-Type: application/xml");

include ("comm.php");

/*
$ret = authentication();
if ( 0 != $ret )
{
	err_do( "请先登陆。" );
	return;
}
*/

$id = $_GET["id"];
$type = $_GET["type"];
$t1 = $_GET["t1"];
$t2 = $_GET["t2"];

$ret = db_begin();
$sql = "select * from tj where v1=" . $type . " and v5=" . $id . " and v4 >= '" . $t1 . "' and v4 <= '" . $t2 . "'";
$db_result = mysql_query($sql);
$data = "";
while ($line = mysql_fetch_array($db_result))
{
	$data .= sprintf( "<point name=\"%s\" y=\"%s\"/>\n", $line["v4"], $line["v2"] );
}
db_end();

$content = file2s( "data.xml" );
$content = str_replace( "<!--DATA-->", $data, $content );
echo "$content"

?>
