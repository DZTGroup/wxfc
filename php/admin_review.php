<?php

include ("db.php");
	

/*
 * ret = -1  ;  链接DB失败
 * ret = -2  ;  插入db失败/重复数据
 * ret = 0   ;  ok
 * */
function expert_review_query_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,&$List_impression)
{
	$loupanid = $_GET["loupanid"];
	
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		$tb_name = "tb_expert_review";
		
		$fields=array();
		push_field($fields, "r_loupanid", $loupanid);
		if (0 == select_db($tb_name,$fields,$db_result))
		{
			
    	 
			while ($row=mysql_fetch_array($db_result))
			{
				$ID=$row['r_expert_id'];
    			$name=$row['r_expert_name'];
    			$title=$row['r_expert_title'];
    			$date= $row['r_date'];
    			
    			$photo=$row['r_expert_photo'];
    			$intro=$row['r_expert_intro'];
    			$reviewTitle=$row['r_expert_reviewTitle'];
    			$reviewDesc=$row['r_expert_reviewDesc'];
    			$loupanid = $row['r_loupanid'];
    			
    			array_push($List_impression, array('loupanid'=>"$loupanid",'id'=>"$ID",'name'=>"$name", 'title'=>"$title",'date'=>"$date",'photo'=>"$photo",'intro'=>"$intro",'reviewTitle'=>"$reviewTitle",'reviewDesc'=>"$reviewDesc"));
    											   
    											
			}
			
			db_end($db_result,$db_link);
			return 0;
		}
		
		
		db_end($db_result,$db_link);
		
		return -2;
	}
	
	return  -1;
}


function generate_projlist($loupanid,$tb_name,$db_result)
{
		
		//generate prolist
			$condition=array();
			push_field($condition, "r_loupanid", $loupanid);
			if(0==select_db($tb_name, $condition, $db_result))
			{
				$list_pro_view = array();
				while ($row=mysql_fetch_array($db_result))
				{
					$ID=$row['r_expert_id'];
	    			$name=$row['r_expert_name'];
	    			$title=$row['r_expert_title'];
	    			$date= $row['r_date'];
	    			
	    			$photo=$row['r_expert_photo'];
	    			$intro=$row['r_expert_intro'];
	    			$reviewTitle=$row['r_expert_reviewTitle'];
	    			$reviewDesc=$row['r_expert_reviewDesc'];
	    			//$loupanid = $row['r_loupanid'];
	    			
	    			array_push($list_pro_view, array('name'=>"$name", 'title'=>"$title",'photo'=>"$photo",'intro'=>"$intro",'reviewTitle'=>"$reviewTitle",'reviewDesc'=>"$reviewDesc"));
	    											  							
				}
				
			    $Result = json_encode($list_pro_view);
		
			    $jsonp_Result = "renderProList(" .  $Result . ");";
		
			    $filename = "../../static/" . $loupanid . ".prolist.js";
			   
			    $file=fopen($filename, 'w');
		
			    fwrite($file, $jsonp_Result);
		
			    fclose($file);
			}
			
	//generate prolist
}

/*
 * ret = -1  ;  链接DB失败
 * ret = -2  ;  插入db失败
 * ret = 0   ;  ok
 * */
function expert_review_add_Cmd_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	 $loupanid = $_GET["loupanid"];
	 
	 $expert_photo      = $_GET["expert_photo"];   //
	 $expert_name       = $_GET["expert_name"];   //
	 $expert_title      = $_GET["expert_title"];   //
	 $expert_intro      = $_GET["expert_intro"];   //
	 $expert_reviewTitle   = $_GET["expert_reviewTitle"];   //
	 $expert_reviewDesc     = $_GET["expert_reviewDesc"];   //
	 
	 
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		   $tb_name = "tb_expert_review";
		
			$fields=array();
			push_field($fields, "r_expert_photo", $expert_photo);
			push_field($fields, "r_expert_name", $expert_name);
			push_field($fields, "r_expert_title", $expert_title);
			push_field($fields, "r_expert_intro", $expert_intro);
			push_field($fields, "r_expert_reviewTitle", $expert_reviewTitle);
			push_field($fields, "r_expert_reviewDesc", $expert_reviewDesc);
			push_field($fields, "r_loupanid", $loupanid);
			push_field($fields, "r_date", date('Y-m-j'));
			
			$db_result="";
			if (0!= insert_db($tb_name, $fields))
			{
				db_end($db_result,$db_link);
				return -2;	
			}
			
			//generate prolist
			generate_projlist($loupanid, $tb_name, $db_result);
			
			//generate prolist
		
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
function expert_review_del_Cmd_104($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	 $expert_id= $_GET["expert_id"];
	 $loupanid = $_GET["loupanid"];
	
	 
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		   $tb_name = "tb_expert_review";
		

			$fields=array();
			push_field($fields, "r_expert_id", $expert_id);
			
			$db_result="";
			if (0!= del_db($tb_name, $fields))
			{
				db_end($db_result,$db_link);
				return -2;	
			}
			//echo $ret;
			
			generate_projlist($loupanid, $tb_name, $db_result);
			
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
function expert_review_update_Cmd_102($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select)
{
	 $expert_id = $_GET["expert_id"];
	 $loupanid = $_GET["loupanid"];
	 $expert_photo      = $_GET["expert_photo"];   //
	 $expert_name       = $_GET["expert_name"];   //
	 $expert_title      = $_GET["expert_title"];   //
	 $expert_intro      = $_GET["expert_intro"];   //
	 $expert_reviewTitle   = $_GET["expert_reviewTitle"];   //
	 $expert_reviewDesc     = $_GET["expert_reviewDesc"];   //
	 
	 
	if (0 == db_begin($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select))
	{
		   $tb_name = "tb_expert_review";
		

			$fields=array();
			push_field($fields, "r_expert_photo", $expert_photo);
			push_field($fields, "r_expert_name", $expert_name);
			push_field($fields, "r_expert_title", $expert_title);
			push_field($fields, "r_expert_intro", $expert_intro);
			push_field($fields, "r_expert_reviewTitle", $expert_reviewTitle);
			push_field($fields, "r_expert_reviewDesc", $expert_reviewDesc);
		
			push_field($fields, "r_date", time());
			
			$condition=array();
			push_field($condition, "r_expert_id", $expert_id);
		 
		    
			$db_result="";
			if (0!= update_db($tb_name, $fields,$condition))
			{
				db_end($db_result,$db_link);
				return -2;	
			}
			//echo $ret;
			generate_projlist($loupanid, $tb_name, $db_result);
		
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
		
		$ret = expert_review_add_Cmd_100($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	
	
	//$Cmd = 101;	
	if ($Cmd == 101)
	{
		$CallBack = $_GET["callback"];
		
		$List_impression =array();
		
		$ret = expert_review_query_101($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select,$db_result,$List_impression);
		
		$Res_json=array('list'=>$List_impression);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	
	
	//$Cmd = 100;	
	if ($Cmd == 104)
	{
		$CallBack = $_GET["callback"];
		
	
		$ret = expert_review_del_Cmd_104($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
	
	
	
		//$Cmd = 100;	
	if ($Cmd == 102)
	{
		$CallBack = $_GET["callback"];
		
	
		$ret = expert_review_update_Cmd_102($db_addr,$db_user,$db_pass,$db_name,$db_link,$db_select);
		
		$Res_json=array('msg'=>$msg,'ret'=>$ret,'seq'=>$seq,'ts'=>$ts);
		
		$Result = json_encode($Res_json);
		
		//echo $Result;
		echo "$CallBack($Result)";
	}
?>