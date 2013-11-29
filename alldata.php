<?php

header("Content-type:text/javascript");

include ("comm.php");

/* 楼盘数据 */
$contents = "var g_data=[";

db_begin();
select_db( "building" );
while ($line = mysql_fetch_array($db_result))
{
	$contents = $contents . sprintf( "[%u,'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s'],", $line["id"], $line["v1"], date('Y-m-d',$line["v26"]), $line["v27"], $line["v2"], $line["v3"], $line["v4"], $line["v5"], $line["v6"], $line["v7"], $line["v8"], $line["v9"], $line["v10"], $line["v11"], $line["v12"], $line["v13"], $line["v14"], $line["v15"], $line["v16"], $line["v17"], $line["v18"], $line["v19"], $line["v20"], $line["v21"], $line["v22"], $line["v23"], $line["v24"], $line["v25"], ''==$line["v31"]?'{"mid":1,"d":[]}':$line["v31"], $line["v32"] );
}
db_end();

$contents = $contents . "];\n";

echo "$contents";

/* 户型数据 */
$contents = "var g_hx=[[0,0,'','','','','','','','{\"mid\":1,\"data\":[]}',''],";

db_begin();
select_db( "apartment" );
while ($line = mysql_fetch_array($db_result))
{
	$contents = $contents . sprintf( "[%u,%u,'%s','%s','%s','%s','%s','%s','%s','%s','%s'],", $line["id"], $line["bid"], $line["v1"], $line["v2"], $line["v3"], $line["v4"], $line["v5"], $line["v6"], $line["v7"], $line["v8"], $line["v9"] );
}
db_end();

$contents = $contents . "];";

echo "$contents";

?>