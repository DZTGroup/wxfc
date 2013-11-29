<?php

$p = $_GET["p"];

echo "Upload: " . $_FILES["file"]["name"] . "<br />";
echo "Type: " . $_FILES["file"]["type"] . "<br />";
echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
echo "Stored in: " . $p . "<br />";

include ("comm.php");
$dst_path = "../building/" . $p;

if ( !mk_dir( dirname($dst_path) ) )
{
	echo "mkdir failed:" . $dst_path;
	return;
}

if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/pjpeg"))
&& ($_FILES["file"]["size"] < 204800))
{
	if ($_FILES["file"]["error"] > 0)
    {
    	echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
    }
	else
    {	
		$ret = move_uploaded_file( $_FILES["file"]["tmp_name"], $dst_path );
		if ( !$ret )
		{
			echo "上传失败.";
		}
		else
		{
			echo "上传成功.";
		}
    }
}
else
{
	echo "请上传JPEG格式图片，且小于200K.";
}

?>
