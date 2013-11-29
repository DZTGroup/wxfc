<?php

include ("db.php");
	

//yt=data.js
function gen_yt_data_js($v_dyt,$path)
{
	//var_dump($v_dyt);

		$itemnum = $v_dyt['itemnum'];
		
		$items= array();

		if($itemnum != 0)
	    {
			
			$v_yts = $v_dyt['items'];
		
			for ($i = 0;$i<count($v_yts);$i++)
			{
				array_push($items, array('id'=>$v_yts[$i]['id'],'icon'=>$v_yts[$i]['icon'],
				'title'=>$v_yts[$i]['title'],'desc'=>$v_yts[$i]['desc']));	
			
				gen_yt_detail_js($v_dyt['bgImg'],$v_yts[$i],$path);
			}
		}

	   
	 
	
	
	$yt_data = array('bgImg'=>$v_dyt['bgImg'],'title'=>$v_dyt['title'],
	'desc'=>$v_dyt['desc'],'banner'=>$v_dyt['banner'],'items'=>$items);
	
	$Result = json_encode($yt_data);
	
	generate_js_File("renderData","yt-data.js",$path,$Result);
	//echo $Result;
}


//生成优惠活动页面js
function gen_yt_detail_js($bgImg,$v_yt,$path)
{
		
	//$module = $v_yt['modules'];
	
			$modules = array();
	
			$items = $v_yt['items'];
	
			$items_t = array();
	
			//echo count($items);
			for ($i = 0;$i<count($items);$i++)
			{
				array_push($items_t, array('actid'=>$items[$i]['actid'],
								   'icon'=>$items[$i]['icon'],
								   'title'=>$items[$i]['title'],
								   'desc'=>$items[$i]['desc'],
								   'timeStart'=>$items[$i]['timeStart'],
								   'timeEnd'=>$items[$i]['timeEnd']));
		
				gen_yt_join_js($bgImg,$v_yt['title'],$v_yt['contact'],$items[$i],$path);
			}
	
	
		
			array_push($modules,array('title'=>"尊享优惠",'items'=>$items_t));
	

	
	
	$yt_detail = array('ytid'=>$v_yt['id'],'bgImg'=>$bgImg,'ytName'=>$v_yt['title'],
					   'desc'=>$v_yt['intro'],'images'=>$v_yt['images'],'contact'=>$v_yt['contact'],
					   'modules'=>$modules);
	
	
	$Result = json_encode($yt_detail);
	//echo $Result;
	
	generate_js_File("renderData",$v_yt['id']."."."yt-detail.js",$path,$Result);
}


//生成优惠活动detail js
function gen_yt_join_js($bgImg,$ytName,$contact,$v_yh,$path)
{
	$contact = $contact;
	
	$FsRule  = array();
	array_push($FsRule, array('type'=>"0",'rule'=>array('enrollbt'=>$v_yh['timeStart'],'enrollet'=>$v_yh['timeEnd'])));
	array_push($FsRule, array('type'=>"1",'rule'=>array('nummax'=>"10",'nummin'=>"1")));
	array_push($FsRule, array('type'=>"4",'rule'=>array('totalmaxoneday'=>"100",'totalminoneday'=>"0")));
	
	
	$items =array();
	array_push($items,array('title'=>"优惠时间",'descList'=>$v_yh['yhTime']));
	array_push($items,array('title'=>"详细说明",'descList'=>$v_yh['detail']));
	array_push($items,array('title'=>"温馨提示",'descList'=>$v_yh['tips']));
	$discountInfo = array('title'=>"优惠说明",'items'=>$items);
	
	$items1=array();
	array_push($items1,array('title'=>"优惠时间",'descList'=>$v_yh['toknow']));
	$bookingInfo = array('title'=>"预约须知",'items'=>$items1);
	
	
	
	$yt_join = array('actid'=>$v_yh['actid'],'bgImg'=>$bgImg,'ytName'=>$ytName,'activityName'=>$v_yh['title'],
					 'banner'=>$v_yh['icon'],'status'=>"0",'joinType'=>"1",'FsRule'=>$FsRule,
					 'contact'=>$contact,'discountInfo'=>$discountInfo,'bookingInfo'=>$bookingInfo);
	
	
	$Result = json_encode($yt_join);
	
	
	generate_js_File("renderStaticData",$v_yh['actid']."."."yt-join.js",$path,$Result);
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

function add_dyt_by_loupan_id_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	// $dyt= $_GET["dyt"];
	 
	$v_dyt=$_POST["v_dyt"];
	 
	$v_dyt['loupanid'];
	 
	$tb_name = "tb_dyt";
	//mysql_query("set names utf8");
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$fields=array();
		push_field($fields, "r_loupan_ID", $v_dyt['loupanid']);
		push_field($fields, "r_dyt", serialize($v_dyt));
				
		//echo serialize($v_dyt);
		$db_result="";
		if (0!= insert_db($tb_name, $fields))
		{
				db_end($db_result,$db_link);
				return -1;	
		}
	}	
	db_end($db_result,$db_link);

    $path="../../building/".$v_dyt['loupanid']."/";

	if(mkdir($path))
	{
		 gen_yt_data_js($v_dyt,$path);
	}
   
	 
	return  0;
	
	
}

function load_all_dyt_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,&$all_loupan_dyt)
{
	
	//$v_dyt['loupanid'];

	$tb_name = "tb_dyt";
	$db_result="";
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$fields=array();
		
				
		
		if (0!= select_db($tb_name, $fields,$db_result))
		{
			mysql_free_result($db_result); 
			db_end($db_result,$db_link);
			return -1;	
		}
		
	
		while ($row = mysql_fetch_array($db_result))
		{
	
			$dyt = $row['r_dyt'];
			//echo $dyt;
			
			//echo json_decode($dyt);
    		array_push($all_loupan_dyt, unserialize($dyt));
    		
    		//echo $all_loupan_dyt;
		}
			
		
		
		
	}	
	mysql_free_result($db_result); 
	db_end($db_result,$db_link);
	 
	return  0;
	
	
}

function add_dyt_by_loupan_id_102($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	// $dyt= $_GET["dyt"];
	 $v_dyt=$_POST["v_dyt"];
	 
	 
	
	 $v_dyt['loupanid'];
	 
	$tb_name = "tb_dyt";
	//mysql_query("set names utf8");
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$fields=array();
		push_field($fields, "r_dyt", serialize($v_dyt));
		
		//echo serialize($v_dyt);
		$conditon=array();
		push_field($conditon, "r_loupan_ID", $v_dyt['loupanid']);
		$db_result="";
		if (0!= update_db($tb_name, $fields,$conditon))
		{
				db_end($db_result,$db_link);
				return -1;	
		}
	}	
	db_end($db_result,$db_link);
	 
	 $path="../../building/".$v_dyt['loupanid']."/";

	if(!file_exists($path))
	{
		 mkdir($path);
	}

	gen_yt_data_js($v_dyt,$path);
	return  0;
	
	
}

function del_dyt_by_loupan_id_103($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,&$id)
{
	// $dyt= $_GET["dyt"];

	$loupanid=$_POST["loupanid"];
	 
	$id = $loupanid;

	$tb_name = "tb_dyt";
	//mysql_query("set names utf8");
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$fields=array();
		push_field($fields, "r_loupan_ID", $loupanid);
		
		//echo serialize($v_dyt);
	
		$db_result="";
		if (0!= del_db($tb_name, $fields))
		{
				db_end($db_result,$db_link);
				return -1;	
		}
	}	
	db_end($db_result,$db_link);
	 

	//del js by loupan id

	return  0;
	
	
}
/////////////////////////////////////Main//////////////////////////////////////////////
	//saveResult({"msg":"success","ret":0,"seq":0,"ts":1379001129})
	$msg="success";
	$ret=0;
	$seq=0;
	$ts=time();
	
    $Cmd = $_POST["cmd"];	
    			
    //$Cmd = 100;	
	if ($Cmd == 100)
	{
		$CallBack = $_POST["callback"];
		
		//$dyt=$_POST["v_dyt"];

		$ret = add_dyt_by_loupan_id_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$Result";
	}
	
	
	if ($Cmd == 101)
	{
		$CallBack = $_POST["callback"];
		
		$all_loupan_dyt = array();
			
		$ret = load_all_dyt_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$all_loupan_dyt);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'all_dyt'=>$all_loupan_dyt);
		
		$Result = json_encode($Res_json);
		
		//echo $all_loupan_dyt;
		
		//echo $Result;
		echo "$Result";
	}
	
	if ($Cmd == 102)
	{
		$CallBack = $_POST["callback"];
		
		$ret = add_dyt_by_loupan_id_102($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$Result";
	}
	

	
	if ($Cmd == 103)
	{
		$CallBack = $_POST["callback"];
		

		$ret = del_dyt_by_loupan_id_103($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$id);
		
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'id'=>$id);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$Result";
	}
?>
