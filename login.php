<?php
$jump=$_GET["jump"];

$filename = "login.html";
$handle = fopen($filename, "r");
$contents = fread($handle, filesize($filename) );
fclose( $handle );

$contents = str_replace( "#JUMP#", $jump, $contents );
echo "$contents"

?>
