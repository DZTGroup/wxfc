<?php

include ("comm.php");

$ret = authentication();
if ( 0 != $ret )
{
	err_do( "请先登陆。" );
	return;
}

$id = $_GET["id"];
$opt = $_GET["opt"];

$ret = db_begin();
if ( "del" == $opt )
{
	$fields["id"] = $id;
	$ret = del_db( "building", $fields );
	if ( 0 != $ret )
	{
		$err = mysql_error();
		err_do( "删除数据失败,错误：". $err );
		return;
	}
}
else
{
	$fields["v1"] = $_POST["v_1"];
	$fields["v2"] = $_POST["v_2"];
	$fields["v3"] = $_POST["v_3"];
	$fields["v4"] = $_POST["v_4"];
	/*$fields["v5"] = $_POST["v_5"];
	$fields["v6"] = $_POST["v_6"];
	$fields["v7"] = $_POST["v_7"];
	$fields["v8"] = $_POST["v_8"];
	$fields["v9"] = $_POST["v_9"];
	$fields["v10"] = $_POST["v_10"];
	$fields["v11"] = $_POST["v_11"];
	$fields["v12"] = $_POST["v_12"];
	$fields["v13"] = $_POST["v_13"];
	$fields["v14"] = $_POST["v_14"];
	$fields["v15"] = $_POST["v_15"];
	$fields["v16"] = $_POST["v_16"];
	$fields["v17"] = $_POST["v_17"];*/
	$fields["v18"] = $_POST["v_18"];
	$fields["v19"] = $_POST["v_19"];
	$fields["v20"] = $_POST["v_20"];
	$fields["v21"] = $_POST["v_21"];
	$fields["v22"] = $_POST["v_22"];
	$fields["v23"] = $_POST["v_23"];
	$fields["v24"] = asctxt2html($_POST["v_24"]);
	$fields["v25"] = asctxt2html($_POST["v_25"]);
	$fields["v26"] = time();
	$fields["v27"] = $_POST["v_27"];
	//$fields["v31"] = $_POST["v_31"];
	$fields["v32"] = asctxt2html($_POST["v_32"]);
	
	if ( "add" == $opt )
	{
		$ret = insert_db( "building", $fields );
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
		$ret = update_db( "building", $fields, $fields_conf );
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

	// 生成楼盘简介页面JS数据	
	$fields["id"] = $id;
	create_js($fields);
}

succ_do( "数据提交成功" );

?>
