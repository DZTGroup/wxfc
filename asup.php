<?php
$p = $_GET["p"];

include ("comm.php");

$dst_path = $p;


if ( !mk_dir( dirname($dst_path) ) )
{
	err_do( "创建目录失败:$dst_path" );
	return;
}

if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/pjpeg"))
&& ($_FILES["file"]["size"] < 204800))
{
	if ($_FILES["file"]["error"] > 0)
    {
    	err_do( "Return Code: " . $_FILES["file"]["error"] );
    }
	else
    {	
		$ret = move_uploaded_file( $_FILES["file"]["tmp_name"], $dst_path );
		if ( !$ret )
		{
			err_do( "上传文件到$dst_path失败" );
		}
		else
		{
			succ_do( "上传文件到".$dst_path."成功" );
		}
    }
}
else
{
	err_do( "请上传JPEG/GIF格式图片" );
}

?>
