<?php

include ("db.php");
	

/*
 * ret = -1  ;  链接DB失败
 * ret = -2  ;  查询数据失败
 * ret = 0   ;  ok
 * */
//加载已有印象的楼盘
function loupan_listload_Cmd_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,&$Res_json)
{
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_house_impression";
		
		//select *, count(distinct `r_loupan_ID`) from tb_house_impression group by r_loupan_ID
		$sql="select *,count(distinct `r_loupan_ID`) from $tb_name group by r_loupan_ID";
		$db_result = mysql_query($sql);
		
		
			while ($row=mysql_fetch_array($db_result))
			{
			$ID=$row['r_loupan_ID'];
    		$desc=$row['r_House_impression_Desc'];
    		//$Date=$row['r_Date'];
    		$Date="2013-09-09";
    		array_push($Res_json, array('ID'=>"$ID",'desc'=>"$desc",'date'=>"$Date"));
			}
			
			db_end($db_result,$db_link);
			return 0;
		
		
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
//加载所有楼盘的印象,不包括用户自定义
function loupan_imp_listload_Cmd_105($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,&$Res_json)
{
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_house_impression";
		
		//select *, count(distinct `r_loupan_ID`) from tb_house_impression group by r_loupan_ID
		$sql="select * from $tb_name";
		$db_result = mysql_query($sql);
		
			while ($row=mysql_fetch_array($db_result))
			{
			$ID=$row['r_loupan_ID'];
    		$desc=$row['r_House_impression_Desc'];
    		$impid=$row['r_House_impression_ID'];
    		$votes=$row['r_House_impression_Votes'];
    		
    		//$Date=$row['r_Date'];
    		//$Date="2013-09-09";
    		array_push($Res_json, array('loupanid'=>"$ID",'desc'=>"$desc",'impid'=>"$impid",'votes'=>"$votes"));
			}
			
			db_end($db_result,$db_link);
			return 0;
		
		
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
function impression_Initilize_Cmd_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	 $Imp_1       = $_GET["Imp_1"];   //
	 $Imp_2       = $_GET["Imp_2"];   //
	 $Imp_3       = $_GET["Imp_3"];   //
	 $Imp_4       = $_GET["Imp_4"];   //
	 $Imp_5       = $_GET["Imp_5"];   //
	 $Imp_6       = $_GET["Imp_6"];   //
	 
	 $Imp_1_votes = $_GET["Imp_1_votes"];   //
	 $Imp_2_votes = $_GET["Imp_2_votes"];   //
	 $Imp_3_votes = $_GET["Imp_3_votes"];   //
	 $Imp_4_votes = $_GET["Imp_4_votes"];   //
	 $Imp_5_votes = $_GET["Imp_5_votes"];   //
	 $Imp_6_votes = $_GET["Imp_6_votes"];   //
	 
	 $loupanname = $_GET["loupanname"];
	 
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_house_impression";
		
		for ($i = 1;$i <= 6;++$i)
		{
			$ID=$i;
			$Imp = "Imp_". $i;
			$Imp_votes = $Imp . "_votes";
			
			$fields=array();
			push_field($fields, "r_House_impression_ID", $ID);
			push_field($fields, "r_House_impression_Desc", ${$Imp});
			push_field($fields, "r_House_impression_Votes", ${$Imp_votes});
			//push_field($fields, "r_loupan_ID", $Select_ID);
			push_field($fields, "r_loupan_ID", $loupanname);
			
			$db_result="";
			if (0!= insert_db($tb_name, $fields))
			{
				db_end($db_result,$db_link);
				return -2;	
			}
			//echo $ret;
			
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
//看房团信息录入
function delete_loupan_imp_Cmd_104($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	
	 $loupanid = $_GET["loupanid"];
	 
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_house_impression";
		
		$condition=array();
		
		push_field($condition, "r_loupan_ID", $loupanid);
		
		$db_result="";
		//delete house impression
		if (0!= del_db($tb_name, $condition))
		{
			db_end($db_result,$db_link);
			return -2;	
		}
		
		//delete users impression
		$tb_name = "tb_house_impression_users";
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

function impression_savedit_Cmd_106($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	 $Imp_1       = $_GET["Imp_1"];   //
	 $Imp_2       = $_GET["Imp_2"];   //
	 $Imp_3       = $_GET["Imp_3"];   //
	 $Imp_4       = $_GET["Imp_4"];   //
	 $Imp_5       = $_GET["Imp_5"];   //
	 $Imp_6       = $_GET["Imp_6"];   //
	 
	 $Imp_1_votes = $_GET["Imp_1_votes"];   //
	 $Imp_2_votes = $_GET["Imp_2_votes"];   //
	 $Imp_3_votes = $_GET["Imp_3_votes"];   //
	 $Imp_4_votes = $_GET["Imp_4_votes"];   //
	 $Imp_5_votes = $_GET["Imp_5_votes"];   //
	 $Imp_6_votes = $_GET["Imp_6_votes"];   //
	 
	 $loupanname = $_GET["loupanname"];
	 
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_house_impression";
		
		for ($i = 1;$i <= 6;++$i)
		{
			$ID=$i;
			$Imp = "Imp_". $i;
			$Imp_votes = $Imp . "_votes";
			
			
			//UPDATE tb_house_impression SET r_House_impression_Desc='印象描1',r_House_impression_Votes='102'  where r_House_impression_ID=1,r_loupan_ID=2;saveeditResult
			$sql="UPDATE tb_house_impression SET r_House_impression_Desc='${$Imp}',r_House_impression_Votes=${$Imp_votes} where r_House_impression_ID=$ID and r_loupan_ID='$loupanname'";
			
			
			
			$db_result="";
			$db_result = mysql_query($sql);
			
			if (!$db_result)
			{
				db_end($db_result,$db_link);
				return -2;	
			}
			
			//echo $ret;
			
		}
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
	
    $Cmd = $_GET["cmd"];;					
    //$Cmd = 100;	
	if ($Cmd == 100)
	{
		$CallBack = $_GET["callback"];
		
		$ret = impression_Initilize_Cmd_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
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
	
	
	
	//载入楼盘列表
	if ($Cmd == 105)
	{
		$CallBack = $_GET["callback"];
		
		$List_imp=array();
		
		$ret = loupan_imp_listload_Cmd_105($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,$List_imp);
		
		$Res_json=array('list'=>$List_imp);
		
		$Result = json_encode($Res_json);

		//echo $ret;
		echo "$CallBack($Result)";
	}
	//$Cmd = 104;	
    //删除楼盘印象
	if ($Cmd == 104)
	{
		$CallBack = $_GET["callback"];
		
		$ret = delete_loupan_imp_Cmd_104($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	
	
	//删除楼盘印象
	if ($Cmd == 106)
	{
		$CallBack = $_GET["callback"];
		
		$ret = impression_savedit_Cmd_106($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	
?>