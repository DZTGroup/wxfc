<?php

include ("db.php");

function err_do( $s )
{
        echo '<script>parent.msgbox_error("'.$s.'")</script>';
}

function succ_do($s)
{
        echo '<script>parent.msgbox_normal("'.$s.'")</script>';
}

function js_callback($s)
{
	echo '<script>parent.'.$s.'</script>';
}

function login( $name, $pass )
{
	$ret = db_begin();
	if ( 0 != $ret )
	{
		return $ret;
	}

	$fields["name"] = $name;
	$fields["pass"] = $pass;

	$ret = -1;
	select_db( "admin", $fields );
	
	global $db_result;
	while ($line = mysql_fetch_array($db_result))
	{
		if ( $line["name"] == $name && $line["pass"] == $pass )
		{
			$ret = 0;
			setcookie( "auth", $line["auth"], time()+3600*24 );
			setcookie( "name", $name, time()+3600*24 );
			setcookie( "type", $line["type"], time()+3600*24 );
			break;
		}
	}

	db_end();
	
	return $ret;
}

function logout()
{
	setcookie( "auth", "" );
	setcookie( "name", "" );
	setcookie( "type", "" );
}

function authentication( $type )
{
	$auth = $_COOKIE[ "auth" ];
	$name = $_COOKIE[ "name" ];
	
	if ( "" == $auth || "" == $name )
	{
		return -1;
	}
	
	$ret = db_begin();
	if ( 0 != $ret )
	{
		return $ret;
	}

	$fields["name"] = $name;
	$fields["auth"] = $auth;

	$ret = -1;
	select_db( "admin", $fields );
	
	global $db_result;
	while ($line = mysql_fetch_array($db_result))
	{
		if ( $line["name"] == $name && $line["auth"] == $auth )
		{
			$ret = 0;
			$type = $line["type"];
			break;
		}
	}

	db_end();
	
	return $ret;
}

function add_user( $user, $pass, $type )
{
	$self_type = "0";
	authentication( $self_type );
	
	if ( "1" != $self_type )
	{
		return -1;
	}
	
	$ret = db_begin();
	if ( 0 != $ret )
	{
		return $ret;
	}

	$fields["name"] = $name;
	$fields["pass"] = $pass;
	$fields["auth"] = md5( $name . "|" . $pass);
	$fields["type"] = $type;

	$ret = insert_db( "admin", $fields );
	
	db_end();

	return $ret;
}

function create_js( $fields )
{
	// 读取模板文件
	$filename = "data_tpl.js";
	$handle = fopen($filename, "r");
	$contents = fread($handle, filesize($filename) );
	fclose( $handle );

	// 替换内容
	while ( $tag = key($fields) ) 
	{
		$src = "<#" . $tag . "#>";
		$val = $fields[$tag];
		$contents = str_replace( $src, $val, $contents );
		next( $fields );
	}

	// 写临时文件
	$filename = "data_tmp.js";
	$handle = fopen($filename, "w");
	fwrite( $handle, $contents );
	fclose( $handle );
	
	rename( "data_tmp.js", "../building/" . $fields["id"] ."/data.js" );
}

function asctxt2html( $str )
{
	$str = str_replace( "\r", "", $str );
	$str = str_replace( "\n", "<br>", $str );
	return $str;
}

function mk_dir($dir, $mode = 0777) 
{
	if (is_dir($dir) || @mkdir($dir,$mode)) return true; 
	if (!mk_dir(dirname($dir),$mode)) return false; 
	return @mkdir($dir,$mode); 
} 

function create_roomjs( $bid )
{
	db_begin();
	$field["bid"] = $bid;
	select_db( "apartment", $field );
	global $db_result;
	
	$content = sprintf( '﻿showRooms({banner:"http://112.124.55.78/building/%d/img/hx/banner.jpg",rooms:[', $bid );
	
	while ($line = mysql_fetch_array($db_result))
	{
		$hximg = sprintf( "http://112.124.55.78/building/%u/img/hx/%u/hx.jpg", $bid, $line["id"] );
		$jsimg = json_decode($line["v8"]);
		
		$pics = "";
		for ( $i=0; $i<count($jsimg->data); $i++ )
		{
			if ( 0 != $i )
			{
				$pics .= ",";
			}
			$pics .= sprintf( '{img:"http://112.124.55.78/building/%u/img/hx/%u/%u.jpg",width:960,height:960,name:"%s"}', $bid, $line["id"], $jsimg->data[$i]->id, $jsimg->data[$i]->name );
		}
		
		$content .= sprintf( '{id:%u,name:"%s",desc:"%s",rooms:"%s",floor:"%s",area:"%s",simg:"%s",bimg:"%s",width:1600,height:1600,dtitle:["%s"],dlist:["%s"],pics:[%s]},', $line["id"], $line["v1"], $line["v2"], $line["v3"], $line["v4"], $line["v5"], $hximg, $hximg, $line["v6"], $line["v7"], $pics );
	}
	db_end();
	
	$content .= "]});";
	
	// echo "$content";
	// 写临时文件
	$filename = "rooms_tmp.js";
	$handle = fopen($filename, "w");
	fwrite( $handle, $content );
	fclose( $handle );
	
	rename( "rooms_tmp.js", "../building/" . $bid ."/hx/static/rooms.js" );
}

function create_hc_js( $fields )
{
	$o = json_decode( $fields["v31"] );
	
	$content = sprintf( ';
	showPics(%s);', json_encode( $o->d ) );
	
	$filename = "hc_tmp.js";
	$handle = fopen($filename, "w");
	fwrite( $handle, $content );
	fclose( $handle );

	rename( $filename, "../building/" . $fields["id"] ."/hx/static/10014.picshow.js" );
}

function slog( $path, $s )
{
	$handle = fopen($path, "a");
	fwrite( $handle, $s );
	fclose( $handle );
}

function dlog( $s )
{
	$handle = fopen("./t.log", "a");
	fwrite( $handle, $s . "\n" );
	fclose( $handle );
}

function logbyday( $path, $s )
{
	$path .= date( "Ymd" ).".log";
	$handle = fopen($path, "a");
	fwrite( $handle, $s );
	fclose( $handle );
}

function tjlog($s)
{
	logbyday( "/alidata/log/tj/tj", $s . "\n" );
}

function file2s( $filename )
{
	$handle = fopen($filename, "r");
	$contents = fread($handle, filesize($filename) );
	fclose( $handle );
	return $contents;
}

?>
