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
 * ret = -2  ;  查询数据失败
 * ret = 0   ;  ok
 * */
function users_listload_Cmd_102($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,&$Res_json)
{
	$groupid=$_GET['groupid'];
	
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_group_apply";
		
		$fields=array();
		push_field($fields, 'r_apply_group_id', $groupid);
		
		if (0 == select_db($tb_name,$fields,$db_result))
		{
			while ($row=mysql_fetch_array($db_result))
			{
				
			$name=$row['r_apply_User_Name'];
			$phone=$row['r_apply_User_phone'];
			$nums=$row['r_apply_User_Num'];
			
    		
    		
    		array_push($Res_json, array('name'=>"$name",'phone'=>"$phone",'nums'=>"$nums"));
			}
			
			db_end($db_result,$db_link);
			return 0;
		}
		
		db_end($db_result,$db_link);
		
		return -2;
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
 
	
	//加载看房团列表
	if ($Cmd == 101)
	{
		$CallBack = $_GET["callback"];
		
		$List_group=array();
		
		$ret = group_listload_Cmd_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,$List_group);
		
		$Res_json=array('list'=>$List_group);

		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	//加载看房团列表
	if ($Cmd == 102)
	{
		$CallBack = $_GET["callback"];
		
		$List_users=array();
		
		$ret = users_listload_Cmd_102($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,$List_users);
		
		$Res_json=array('list'=>$List_users);

		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
?>