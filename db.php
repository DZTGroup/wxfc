<?php

$db_name = "wxfc";
$db_user = "root";
$db_pass = "655075d7dd";
$db_addr = "112.124.55.78";
$db_result;
$db_link;
$db_select;

function db_begin()
{
	global $db_name;
	global $db_user;
	global $db_pass;
	global $db_addr;
	global $db_result;
	global $db_link;
	global $db_select;
	
	$db_link = mysql_connect($db_addr,$db_user,$db_pass);
	if ( !$db_link )
	{
		return -1;
	}

	$db_select = mysql_select_db( $db_name );
	if ( !$db_select )
	{
		return -2;
	}
	return 0;
}

function db_end()
{
	global $db_name;
	global $db_user;
	global $db_pass;
	global $db_addr;
	global $db_result;
	global $db_link;
	global $db_select;
	
	mysql_free_result($db_result);
	mysql_close($db_link);
	return 0;
}

function select_db( $tb_name, $fields )
{
	global $db_name;
	global $db_user;
	global $db_pass;
	global $db_addr;
	global $db_result;
	global $db_link;
	global $db_select;
	
	if ( !$fields )
	{
		$sql = "SELECT * FROM $tb_name;";
	}
	else
	{
		$tag = key($fields);
		$val = $fields[$tag];
		next( $fields );

		$sql = "SELECT * FROM $tb_name where $tag='$val'";

		while ( $tag = key($fields) ) 
		{
				$val = $fields[$tag];
				$sql = $sql . " and $tag='$val'";
				next( $fields );
		}
		$sql = $sql . ";";
	}
	
	//echo "$sql;";
	
	$db_result = mysql_query($sql);
	return 0;
}

function update_db( $tb_name, $fields, $fields_conf )
{
	global $db_name;
	global $db_user;
	global $db_pass;
	global $db_addr;
	global $db_result;
	global $db_link;
	global $db_select;

	$tag = key($fields);
	$val = $fields[$tag];
	next( $fields );

	$sql = "UPDATE $tb_name SET $tag='$val'";
	while ( $tag = key($fields) ) 
	{
		$val = $fields[$tag];
		$sql = $sql . ",$tag='$val'";
		next( $fields );
	}
	
	if ( $fields_conf )
	{
		$tag = key($fields_conf);
		$val = $fields_conf[$tag];
		next( $fields_conf);
		
		$sql = $sql . " where $tag='$val'";
		while ( $tag = key($fields_conf) ) 
		{
			$val = $fields_conf[$tag];
			$sql = $sql . " and $tag='$val'";
			next( $fields_conf );
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

function insert_db( $tb_name, $fields )
{
	global $db_name;
	global $db_user;
	global $db_pass;
	global $db_addr;
	global $db_result;
	global $db_link;
	global $db_select;

	$tag = key($fields);
	$val = $fields[$tag];
	next( $fields );

	$sql = "INSERT INTO $tb_name SET $tag='$val'";
	while ( $tag = key($fields) ) 
	{
		$val = $fields[$tag];
		$sql = $sql . ",$tag='$val'";
		next( $fields );
	}
	$sql = $sql . ";";

	echo "<br>$sql<br>";

	$db_result = mysql_query($sql);
	if ( !$db_result )
	{
		return -1;
	}
	return 0;
}

function del_db( $tb_name, $fields )
{
	global $db_name;
	global $db_user;
	global $db_pass;
	global $db_addr;
	global $db_result;
	global $db_link;
	global $db_select;

	$tag = key($fields);
	$val = $fields[$tag];
	next( $fields );

	$sql = "DELETE FROM $tb_name where $tag='$val'";
	while ( $tag = key($fields) ) 
	{
		$val = $fields[$tag];
		$sql = $sql . " and $tag='$val'";
		next( $fields );
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
