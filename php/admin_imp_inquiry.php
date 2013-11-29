<?php

include ("db.php");
	

/*
 * ret = -1  ;  链接DB失败
 * ret = -2  ;  查询数据失败
 * ret = 0   ;  ok
 * */
function loupan_listload_Cmd_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,&$Res_json)
{
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_impression_loupan";
		
		$fields=array();
		if (0 == select_db($tb_name,$fields,$db_result))
		{
		
			while ($row=mysql_fetch_array($db_result))
			{
			$ID=$row['r_impression_loupan_ID'];
    		$desc=$row['r_impression_loupan_Desc'];
    		$Date=$row['r_Date'];
    		
    		array_push($Res_json, array('ID'=>"$ID",'desc'=>"$desc",'date'=>"$Date"));
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
 * ret = -2  ;  插入db失败/重复数据
 * ret = 0   ;  ok
 * */
function loupan_add_Cmd_99($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result)
{
	$Loupan_Name = $_GET["Loupan_name"];
	
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_impression_loupan";
		
		$fields=array();
		if (0 == select_db($tb_name,$fields,$db_result))
		{
			$ID = mysql_num_rows($db_result) + 1;
			
			push_field($fields, "r_impression_loupan_ID", $ID);
			push_field($fields, "r_impression_loupan_Desc", $Loupan_Name);
			push_field($fields, "r_Date", date("Y-m-d"));
			
			if (0!= insert_db($tb_name, $fields))
			{
				db_end($db_result,$db_link);
				return -2;	
			}
		}
		
		
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
function impression_load_Cmd_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,&$List_impression)
{

    $loupanid = $_GET["loupanid"];
	$enddate = $_GET["enddate"];
	$begdate = $_GET["begdate"];
	
	$t1 = strtotime($begdate);
	
   	$t2 = strtotime($enddate) + 3600*24;
	
	
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_house_impression";
		
		$fields=array();
		push_field($fields, "r_loupan_ID", $loupanid);
		if (0 == select_db($tb_name,$fields,$db_result))
		{
			while ($row=mysql_fetch_array($db_result))
			{
				$ID=$row['r_House_impression_ID'];
    			$desc=$row['r_House_impression_Desc'];
    			$votes=$row['r_House_impression_Votes'];
    		
    			//选取tb_house_impression_users中用户的投票数
    	
    		$sql="select r_House_impression_Desc,sum(r_House_impression_Votes) as count from tb_house_impression_users where r_impression_ID=$ID and r_loupan_ID=$loupanid
    		      and r_vote_time >= $t1 and  r_vote_time <= $t2";
    		//echo  $sql;
    		
    		$result_1=mysql_query($sql);
    		
    		$row=mysql_fetch_array($result_1);
    		
    		$uservotes=$row['count'];
    		
    		$r_Content=$row['r_House_impression_Desc'];
    		
    		//tb_house_impression_users中用户的投票数与tb_house_impression中的初始票数相加
    		//$r_Votes = $r_Votes + $count;
    			
    		if ($uservotes =="")
    		{
    			$uservotes = 0;
    		}
    		
    		array_push($List_impression, array('ID'=>"$ID",'desc'=>"$desc",'votes'=>"$votes",'uservotes'=>"$uservotes"));
			}
			mysql_free_result($result_1); 
			db_end($db_result,$db_link);
			return 0;
		}
		
		db_end($db_result,$db_link);
		
		return 0;
	}
	
	return  -1;
	
}
	
/*
 * ret = -1  ;  链接DB失败
 * ret = -2  ;  查询失败
 * ret = 0   ;  ok
 * */

function impression_load_Cmd_102($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,&$List_impression)
{
    $loupanid = $_GET["loupanid"];
	$enddate = $_GET["enddate"];
	$begdate = $_GET["begdate"];
	
	$t1 = strtotime($begdate);
	
   	$t2 = strtotime($enddate) + 3600*24;
   	
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_house_impression_users";
		
		//$fields=array();
		//push_field($fields, "r_loupan_ID", $loupanid);
		//push_field($fields, "r_impression_ID", 0);
		
		$sql="select * from $tb_name where r_loupan_ID=$loupanid and r_impression_ID=0  and r_vote_time >= $t1 and  r_vote_time <= $t2";
		$db_result = mysql_query($sql);
		
		if ($db_result)
		{
			while ($row=mysql_fetch_array($db_result))
			{
    			$desc=$row['r_House_impression_Desc'];
    			$votes=$row['r_House_impression_Votes'];
    		
    			array_push($List_impression, array('desc'=>"$desc",'votes'=>"$votes"));
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
	
    $Cmd = $_GET["cmd"];;					
    //$Cmd = 100;	
	if ($Cmd == 100)
	{
		$CallBack = $_GET["callback"];
		
		$List_impression=array();
		
		$ret = impression_load_Cmd_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$List_impression);
		
		$Res_json=array('list'=>$List_impression);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	//$Cmd = 102;查询用户自定义印象	
	if ($Cmd == 102)
	{
		$CallBack = $_GET["callback"];
		
		$List_impression=array();
		
		$ret = impression_load_Cmd_102($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$List_impression);
		
		$Res_json=array('list'=>$List_impression);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	
	//添加楼盘
	if ($Cmd == 99)
	{
		$CallBack = $_GET["callback"];
		
		$ret = loupan_add_Cmd_99($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);

		//echo $ret;
		echo "$CallBack($Result)";
	}
	
	//载入楼盘列表
	if ($Cmd == 101)
	{
		$CallBack = $_GET["callback"];
		
		$List_loupan=array();
		
		$ret = loupan_listload_Cmd_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,$List_loupan);
		
		$Res_json=array('list'=>$List_loupan);
		
		$Result = json_encode($Res_json);

		//echo $ret;
		echo "$CallBack($Result)";
	}
	
?>