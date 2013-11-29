<?php
$jump=$_GET["jump"];
$name=$_POST["name"];
$pass=$_POST["pass"];

include ("comm.php");

$ret = login( $name, $pass );
if ( 0 == $ret )
{
	echo "<script>window.location=\"$jump\";</script>";
}
else
{
	echo "login failed,name=$name,pass=$pass";
}

?>
