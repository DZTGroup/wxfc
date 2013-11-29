<?php

include ("db.php");
	


function create_rooms_js($g_hx,$path)
{
	$rooms = array();
	for($i = 0;$i<count($g_hx);$i++)
	{
		 
		 //"http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/djyf/j350a.jpg",width:1600,height:1600,
		 $bimg=$g_hx[$i][8];
		 $dtitle=array();
		 $jxmj="建筑面积:".$g_hx[$i][5];
		 $tnmj="套内面积:".$g_hx[$i][6];
		 array_push($dtitle,$jxmj);
		 array_push($dtitle,$tnmj);
		 
		 $dlist=array();
		 array_push($dlist,$g_hx[$i][7]);
		 
		 $pics=array();
		 $Imglist=$g_hx[$i][9];
		 for($j = 0;$j<count($Imglist);$j++)
		 {
			 array_push($pics,array('img'=>$Imglist[$j][1],'width'=>960,'height'=>960,'name'=>$Imglist[$j][0]));
		 }
		 
		 $full3d=array();
		 $list3d=array();
		 $list360=$g_hx[$i][11];
		 
		 for($j = 0;$j<count($list360);$j++)
		 {
			 array_push($list3d,array('name'=>$list360[$j][0],'url'=>$list360[$j][1]));
		 }
		 
		 array_push($full3d,array('name'=>$g_hx[$i][1],'list'=>$list3d,'bimg'=>$g_hx[$i][10]));
		 
		 array_push($rooms,array('id'=>$g_hx[$i][0],
								 'name'=>$g_hx[$i][1],
								 'desc'=>$g_hx[$i][2],
								 'rooms'=>$g_hx[$i][3],
								 'floor'=>$g_hx[$i][4],
								 'area'=>$g_hx[$i][5],
								 'simg'=>$g_hx[$i][8],
								 'bimg'=>$bimg,
								 'width'=>1600,
								 'height'=>1600,
								 'dtitle'=>$dtitle,
								 'dlist'=>$dlist,
								 'pics'=>$pics,
								 'full3d'=>$full3d));
								 
	}
	
	
	$hxlist=array('banner'=>"http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/im_1440260.jpg",'rooms'=>$rooms );
	
	$Result=json_encode($hxlist);
	
	//var_dump($Result);
	
	generate_js_File("﻿showRooms","rooms.js",$path,$Result);
}


function generate_js_File($jCallback,$FileName,$Path,$json)
{
	$jsonp_Result = $jCallback."(".  $json . ");";
		
	$filename = $Path . $FileName ;
			   
#	echo $filename;
#	echo $jsonp_Result;
    $file=fopen($filename, 'w');
		
    fwrite($file, $jsonp_Result);
		
	fclose($file);
}


function f_SaveLouPanHx($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	// $dyt= $_GET["dyt"];
	 
	$g_hx= $_POST["g_hx"];	
	$loupanid=$_POST["loupanid"];	
	
	 
	$tb_name = "tb_hx";
	//mysql_query("set names utf8");
	
	
	
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		
		$field_d=array();
		push_field($field_d, "r_loupan_ID", $loupanid);
		del_db($tb_name,$field_d);
		
	
		$fields=array();
		push_field($fields, "r_loupan_ID", $loupanid);
		push_field($fields, "r_hxlist", serialize($g_hx));
		
		//echo serialize($v_dyt);
		$db_result="";
		if (0!= insert_db($tb_name, $fields))
		{
				db_end($db_result,$db_link);
				return -1;	
		}
	}	
	db_end($db_result,$db_link);

    $path="../../building/".$loupanid."/";

	if(!file_exists($path))
	{
		mkdir($path);
	}
	
	
	create_rooms_js($g_hx,$path);
   
	 
	return  0;
}


function load_hxlist($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,&$hxlist)
{
	
	//$v_dyt['loupanid'];
	$loupanid=$_POST["loupanid"];	
	
	$tb_name = "tb_hx";
	
	$db_result="";
	
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$fields=array();
		push_field($fields, "r_loupan_ID", $loupanid);
		
		if (0!= select_db($tb_name, $fields,$db_result))
		{
			mysql_free_result($db_result); 
			db_end($db_result,$db_link);
			return -1;	
		}
		
	
		while ($row = mysql_fetch_array($db_result))
		{
			$hx = $row['r_hxlist'];
			
    		$hxlist = unserialize($hx);
			
		}
			
	}	
	mysql_free_result($db_result); 
	db_end($db_result,$db_link);
	 
	return  0;
	
	
}

/////////////////////////////////////Main//////////////////////////////////////////////
	//saveResult({"msg":"success","ret":0,"seq":0,"ts":1379001129})
	$msg="success";
	$ret=0;
	$seq=0;
	$ts=time();
	
    $Cmd = $_POST["cmd"];	
    
	
    if($Cmd == 4)
	{
		
		$hxlist = "";
			
		$ret = load_hxlist($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$hxlist);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'hxlist'=>$hxlist);
		
		$Result = json_encode($Res_json);
		
		echo "$Result";
		
	}
	else
	{
		$g_hx= $_POST["g_hx"];	
		
		$ret = f_SaveLouPanHx($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'cmd'=>$Cmd);
		
		$Result = json_encode($Res_json);
		
		echo $Result;
	}
	
	

	
	
?>
