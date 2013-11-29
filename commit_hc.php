<?php

include ("comm.php");

$ret = authentication();
if ( 0 != $ret )
{
	err_do( "请先登陆。" );
	return;
}

$id = $_GET["id"];

$ret = db_begin();

$fields["v31"] = $_POST["v_31"];
$fields_conf["id"] = $id;

$ret = update_db( "building", $fields, $fields_conf );
if ( 0 != $ret )
{
	$err = mysql_error();
	err_do( "更新数据失败,错误：". $err );
	return;
}

// 生成十里画册JS数据	
$fields["id"] = $id;
create_hc_js($fields);

succ_do( "数据提交成功" );

?>
