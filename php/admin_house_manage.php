<?php

include ("db.php");
	
/*
 * ret = -1  ;  链接DB失败
 * ret = -2  ;  查询数据失败
 * ret = 0   ;  ok
 * */
function group_listload_Cmd_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,&$Res_json)
{
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_group_info";
		
		$fields=array();
		if (0 == select_db($tb_name,$fields,$db_result))
		{
		
			while ($row=mysql_fetch_array($db_result))
			{
			$ID=$row['r_group_id'];
			$group_line=$row['r_group_Line'];
			$group_title_pic=$row['r_title_pic'];
			$Title=$row['r_group_title'];
			$Qishu=$row['r_qishu'];
    		$Loupan=$row['r_loupan'];
    		$S_time=$row['r_apply_beg_datetime'];
    		$E_time=$row['r_apply_end_datetime'];
    		$V_time=$row['r_view_end_datetime'];
    		$Info_1=$row['r_info_1'];
    		$Info_2=$row['r_info_2'];
    		$Info_3=$row['r_info_3'];
    		$Info_4=$row['r_info_4'];	
    		$ApplyTime=$row['r_apply_datetime'];
    		
    		
    		
    		array_push($Res_json, array('ID'=>"$ID",'line'=>"$group_line",'TitlePic'=>"$group_title_pic",
    									'Title'=>"$Title",'Qishu'=>"$Qishu",'Loupan'=>"$Loupan",
    									'S_time'=>"$S_time",'E_time'=>"$E_time",'V_time'=>"$V_time",
										'Info_1'=>"$Info_1",'Info_2'=>"$Info_2",'Info_3'=>"$Info_3",'Info_4'=>"$Info_4",
    									'applydate'=>"$ApplyTime"));
			}
			
			db_end($db_result,$db_link);
			return 0;
		}
		
		db_end($db_result,$db_link);
		
		return -2;
	}
	
	return  -1;
	
}




/*
 * ret = -1  ;  链接DB失败
 * ret = -2  ;  插入db失败
 * ret = 0   ;  ok
 * */
//看房团信息录入
function apply_group_info_Cmd_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	 $line = $_GET["line"];
	 $title_pic_url = $_GET["title_pic_url"];
     $group_title    = $_GET["group_title"];
     $qishu   = $_GET["qishu"];
     $loupan_op =  $_GET["loupan_op"];
     $apply_beg_date = $_GET["apply_beg_date"];
     $apply_beg_time = $_GET["apply_beg_time"];
     $apply_end_date = $_GET["apply_end_date"];
     $apply_end_time = $_GET["apply_end_time"];
     $view_end_date = $_GET["view_end_date"];
     $view_end_time = $_GET["view_end_time"];
     $info_1 =  $_GET["info_1"];
     $info_2 =  $_GET["info_2"];
     $info_3 = $_GET["info_3"];
     $info_4 = $_GET["info_4"];
    
	 
	
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_group_info";
	
		$fields=array();
		$s_time = $apply_beg_date . " " . $apply_beg_time;
		$e_time = $apply_end_date . " " . $apply_end_time;
		$v_time = $view_end_date . " " . $view_end_time;
		push_field($fields, "r_group_Line", $line);
		push_field($fields, "r_title_pic", $title_pic_url);
		push_field($fields, "r_group_title", $group_title );
		push_field($fields, "r_qishu", $qishu);
		push_field($fields, "r_loupan", $loupan_op);
		push_field($fields, "r_apply_beg_datetime", $s_time);
		push_field($fields, "r_apply_end_datetime", $e_time);
		push_field($fields, "r_view_end_datetime", $v_time);
		push_field($fields, "r_info_1", $info_1);
		push_field($fields, "r_info_2", $info_2);
		push_field($fields, "r_info_3", $info_3);
		push_field($fields, "r_info_4", $info_4);
		push_field($fields, "r_apply_datetime", date('Y-m-d H:i:s'));
		
		
		$db_result="";
		if (0!= insert_db($tb_name, $fields))
		{
			db_end($db_result,$db_link);
			return -2;	
		}
		
		
		//generate js
		$sql="select MAX(r_group_id) from $tb_name";
		$db_result=mysql_query($sql);
		
		$ID=mysql_result($db_result,0);
		
		
		$lines=explode(";",$line);
		
		$line_json=array();
		
		
		foreach ($lines as $line_n)
		{	
			if($line_n != "")
			{
				array_push($line_json,array('value'=>"$line_n",'text'=>"$line_n"));
			}
		
		}
		
		
		$ads_json=array();
		array_push($ads_json, array('strong'=>"购房享折上折",'msg'=>"",'tps'=>"距本次报名截至还有:"));
		
		
		$info_1_arr=array($info_1);
		$info_2_arr=array($info_2);
		$info_3_arr=array($info_3);
		$info_1_jsaon=array('title'=>"活动优惠",'desc'=>$info_1_arr);
		$info_2_jsaon=array('title'=>"看房须知",'desc'=>$info_2_arr);
		$info_3_jsaon=array('title'=>"看房声明'",'desc'=>$info_3_arr);
		
		$rules_json=array();
		array_push($rules_json, $info_1_jsaon);
		array_push($rules_json, $info_2_jsaon);
		array_push($rules_json, $info_3_jsaon);
		
		
		$Res_json=array('issue'=>"0",'startTime'=>"$s_time",
						'endTime'=>"$e_time",
						'banner'=>"$title_pic_url",
					    'lines'=>$line_json,
						'ads'=>$ads_json,
						'rules'=>$rules_json);
		
		
		
		//var_dump($Res_json);
		$Result = json_encode($Res_json);
		
		$jsonp_Result = "loadInfoResult(" .  $Result . ");";
		
		$filename = "../../static/" . $ID . ".apply.js";
		$file=fopen($filename, 'w');
		
		fwrite($file, $jsonp_Result);
		
		fclose($file);
		//generate js
		
		db_end($db_result,$db_link);
		
		return 0;
	}
	
	return  -1;
	
}
	
/*
 * ret = -1  ;  链接DB失败
 * ret = -2  ;  插入db失败
 * ret = 0   ;  ok
 * */
//看房团信息修改
function update_group_info_Cmd_103($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	
	 $GroupID = $_GET["groupid"];
	 $line = $_GET["line"];
	 $title_pic_url = $_GET["title_pic_url"];
     $group_title    = $_GET["group_title"];
     $qishu   = $_GET["qishu"];
     $loupan_op =  $_GET["loupan_op"];
     $apply_beg_date = $_GET["apply_beg_date"];
     $apply_beg_time = $_GET["apply_beg_time"];
     $apply_end_date = $_GET["apply_end_date"];
     $apply_end_time = $_GET["apply_end_time"];
     $view_end_date = $_GET["view_end_date"];
     $view_end_time = $_GET["view_end_time"];
     $info_1 =  $_GET["info_1"];
     $info_2 =  $_GET["info_2"];
     $info_3 = $_GET["info_3"];
     $info_4 = $_GET["info_4"];
    
	
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_group_info";
	
		$fields=array();
		$s_time = $apply_beg_date . " " . $apply_beg_time;
		$e_time = $apply_end_date . " " . $apply_end_time;
		$v_time = $view_end_date . " " . $view_end_time;
		push_field($fields, "r_group_Line", $line);
		push_field($fields, "r_title_pic", $title_pic_url);
		push_field($fields, "r_group_title", $group_title );
		push_field($fields, "r_qishu", $qishu);
		push_field($fields, "r_loupan", $loupan_op);
		push_field($fields, "r_apply_beg_datetime", $s_time);
		push_field($fields, "r_apply_end_datetime", $e_time);
		push_field($fields, "r_view_end_datetime", $v_time);
		push_field($fields, "r_info_1", $info_1);
		push_field($fields, "r_info_2", $info_2);
		push_field($fields, "r_info_3", $info_3);
		push_field($fields, "r_info_4", $info_4);
		push_field($fields, "r_apply_datetime", date('Y-m-d H:i:s'));
		
		$condition=array();
		push_field($condition, "r_group_id", $GroupID);
		
		$db_result="";
		if (0!= update_db($tb_name, $fields,$condition))
		{
			db_end($db_result,$db_link);
			return -2;	
		}
			//echo $ret;
			
		//generate js
		
		$ID=$GroupID;
		
		$lines=explode(";",$line);
		
		$line_json=array();
		
		
		foreach ($lines as $line_n)
		{	
			if($line_n != "")
			{
				array_push($line_json,array('value'=>"$line_n",'text'=>"$line_n"));
			}
		
		}
		//array_push($line_json,array('value'=>"$line",'text'=>"$line"));
		
		
		
		$ads_json=array();
		array_push($ads_json, array('strong'=>"购房享折上折",'msg'=>"",'tps'=>"距本次报名截至还有:"));
		
		
		$info_1_arr=array($info_1);
		$info_2_arr=array($info_2);
		$info_3_arr=array($info_3);
		$info_1_jsaon=array('title'=>"活动优惠",'desc'=>$info_1_arr);
		$info_2_jsaon=array('title'=>"看房须知",'desc'=>$info_2_arr);
		$info_3_jsaon=array('title'=>"看房声明'",'desc'=>$info_3_arr);
		
		$rules_json=array();
		array_push($rules_json, $info_1_jsaon);
		array_push($rules_json, $info_2_jsaon);
		array_push($rules_json, $info_3_jsaon);
		
		
		$Res_json=array('issue'=>"0",'startTime'=>"$s_time",
						'endTime'=>"$e_time",
						'banner'=>"$title_pic_url",
					    'lines'=>$line_json,
						'ads'=>$ads_json,
						'rules'=>$rules_json);
		
		
		
		//var_dump($Res_json);
		$Result = json_encode($Res_json);
		
		$jsonp_Result = "loadInfoResult(" .  $Result . ");";
		
		$filename = "../../static/" . $ID . ".apply.js";
		$file=fopen($filename, 'w');
		
		fwrite($file, $jsonp_Result);
		
		fclose($file);
		//generate js
		
		db_end($db_result,$db_link);
		
		return 0;
	}
	
	return  -1;
	
}

/*
 * ret = -1  ;  链接DB失败
 * ret = -2  ;  插入db失败
 * ret = 0   ;  ok
 * */
//看房团信息录入
function delete_group_info_Cmd_104($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	
	 $GroupID = $_GET["groupid"];
	 
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_group_info";
	
	
		$condition=array();
		push_field($condition, "r_group_id", $GroupID);
		
		$db_result="";
		if (0!= del_db($tb_name, $condition))
		{
			db_end($db_result,$db_link);
			return -2;	
		}
			//echo $ret;
			
		
		db_end($db_result,$db_link);
		
		return 0;
	}
	
	return  -1;
	
}


/////////////////////////////////////Main//////////////////////////////////////////////
	//saveResult({"msg":"success","ret":0,"seq":0,"ts":1379001129})
	$msg="success";
	$ret=0;
	$seq=0;
	$ts=time();
	
    $Cmd = $_GET["cmd"];		
    		
    //$Cmd = 100;	
    //录入看房团信息
	if ($Cmd == 100)
	{
		$CallBack = $_GET["callback"];
		
		$ret = apply_group_info_Cmd_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	//$Cmd = 103;	
    //录入看房团信息
	if ($Cmd == 103)
	{
		$CallBack = $_GET["callback"];
		
		$ret = update_group_info_Cmd_103($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	//$Cmd = 104;	
    //录入看房团信息
	if ($Cmd == 104)
	{
		$CallBack = $_GET["callback"];
		
		$ret = delete_group_info_Cmd_104($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	//加载看房团列表
	if ($Cmd == 101)
	{
		$CallBack = $_GET["callback"];
		
		$List_group=array();
		
		$ret = group_listload_Cmd_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,$List_group);
		
		$Res_json=array('list'=>$List_group);

		$Result = json_encode($Res_json);
		
		//echo $Result;
        if($CallBack){
            echo "$CallBack($Result)";
        }else{
            echo "$Result";
        }

	}
	
	
?>