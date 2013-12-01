<?php
$jump=$_GET["jump"];
$name=$_POST["name"];
$pass=$_POST["pass"];

include ("comm.php");

$ret = login( $name, $pass );
if ( 0 == $ret )
{
    if($jump){
        echo "<script>window.location=\"$jump\";</script>";
    }else{
        echo "<script>window.location=\"property_manage.html\";</script>";
    }

}
else
{
	echo "login failed,name=$name,pass=$pass";
}

?>
