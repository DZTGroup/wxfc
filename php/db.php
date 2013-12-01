<?php
$db_name = "wxfc";
$db_user = "root";
$db_pass = "655075d7dd";
$db_addr = "112.124.55.78";
$db_result = "";
$db_link = "";
$db_select ="" ;



function push_field( &$fields, $field_name, $field_val )
{
	$num = count( $fields );
	$fields[ $num ][ 0 ] = $field_name;
	$fields[ $num ][ 1 ] = $field_val;
}

function db_begin($db_addr,$db_user,$db_pass,$db_name,&$db_link,&$db_select)
{
	$db_link = mysql_connect($db_addr,$db_user,$db_pass);
	if ( !$db_link )
	{
		return -1;
	}
	$db_select = mysql_select_db( $db_name);
	if ( !$db_select )
	{
		return -2;
	}
	return 0;
}

function db_end($db_result,$db_link)
{

	mysql_close($db_link);
	
	return 0;
}

function select_db( $tb_name, $fileds ,&$db_result)
{
	if ( !$fileds )
	{
		$sql = "SELECT * FROM $tb_name;";
	}
	else
	{
		$sql = "SELECT * FROM $tb_name where ";
		
		
		$Count = count($fileds);
		$Idx = 1;
		foreach ($fileds as $record)
		{
			if ($Idx++ == $Count)
			{
				$sql = $sql . "$record[0]='$record[1]'";
			}
			else {
				$sql = $sql . "$record[0]='$record[1]',";
			}	
		}
		$sql = $sql . ";";
		
	}
	$db_result = mysql_query($sql);
	return 0;
}

function update_db( $tb_name, $fields ,$condition)
{
	$sql = "UPDATE $tb_name SET ";
	
	$Count_filed = count($fields);
	$Count_conditon = count($condition);
	$Idx = 1;
	
	//set
	foreach ($fields as $record)
	{
		if ($Idx++ == $Count_filed)
		{
			$sql = $sql . "$record[0]='$record[1]'";
		}
		else {
			$sql = $sql . "$record[0]='$record[1]',";
		}	
	}
	
	//where 
	$Idx = 1;
	$sql = $sql . " " ." where ";
	foreach ($condition as $record)
	{
		if ($Idx++ == $Count_conditon)
		{
			$sql = $sql . "$record[0]=$record[1]";
		}
		else {
			$sql = $sql . "$record[0]=$record[1],";
		}	
	}
	
	$sql = $sql . ";";
	//echo $sql;
	$db_result = mysql_query($sql);
	if ( !$db_result )
	{
		return -1;
	}
	return 0;
}

function insert_db( $tb_name, &$fields )
{
	$sql = "INSERT INTO $tb_name SET ";
	
	$Count = count($fields);
	$Idx = 1;
	foreach ($fields as $record)
	{
		if ($Idx++ == $Count)
		{
			$sql = $sql . "$record[0]='$record[1]'";
		}
		else {
			$sql = $sql . "$record[0]='$record[1]',";
		}	
		
	}
	
	$sql = $sql . ";";
	
	//echo $sql;
	$db_result = mysql_query($sql);
	if ( !$db_result )
	{
		return -1;
	}

	return 0;
}



function del_db( $tb_name, $fields )
{
	$sql = "DELETE FROM $tb_name where ";
	
	$Count = count($fields);
	$Idx = 1;
	foreach ($fields as $record)
	{
		if ($Idx++ == $Count)
		{
			$sql = $sql . "$record[0]=$record[1]";
		}
		else {
			$sql = $sql . "$record[0]=$record[1],";
		}	
		
	}
	
	$sql = $sql . ";";
	
	$db_result = mysql_query($sql);
	if ( !$db_result )
	{
		return -1;
	}
	return 0;
}
?>
