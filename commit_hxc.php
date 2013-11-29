<?php

include ("comm.php");

$ret = authentication();
if ( 0 != $ret )
{
	err_do( "请先登陆。" );
	return;
}

$id = $_GET["id"];
$bid = $_GET["bid"];
$opt = $_GET["opt"];

if ( 0 == $bid )
{
	err_do( "缺少楼盘ID" );
	return;
}

$ret = db_begin();
if ( "del" == $opt )
{
	$fields["id"] = $id;
	$ret = del_db( "apartment", $fields );
	if ( 0 != $ret )
	{
		$err = mysql_error();
		err_do( "删除数据失败,错误：". $err );
		return;
	}
}
else
{
	$fields["bid"] = $bid;
	$fields["v1"] = $_POST["v1"];
	$fields["v2"] = $_POST["v2"];
	$fields["v3"] = $_POST["v3"];
	$fields["v4"] = $_POST["v4"];
	$fields["v5"] = $_POST["v5"];
	$fields["v6"] = asctxt2html($_POST["v6"]);
	$fields["v7"] = asctxt2html($_POST["v7"]);
	$fields["v8"] = $_POST["v8"];
	$fields["v9"] = $_POST["v9"];
	
	if ( "add" == $opt )
	{
		$ret = insert_db( "apartment", $fields );
		if ( 0 != $ret )
		{
			$err = mysql_error();
			err_do( "插入数据失败,错误：". $err );
			return;
		}
	}
	else if ( "set" == $opt )
	{
		$fields_conf["id"] = $id;
		$ret = update_db( "apartment", $fields, $fields_conf );
		if ( 0 != $ret )
		{
			$err = mysql_error();
			err_do( "更新数据失败,错误：". $err );
			return;
		}
	}
	else 
	{
		err_do( "未知操作" );
		return;
	}
}

create_roomjs( $bid );

// 重新跳转回楼盘管理页面
succ_do( "数据提交成功" );

?>
