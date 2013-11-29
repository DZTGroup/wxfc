<?php

include "comm.php";

$day = date( "Y-m-d" );
$user = $_GET["user"];
$type = $_GET["type"];
$bid = $_GET["bid"];

tjlog( $user . "|" . $type . "|" . $bid  );

?>