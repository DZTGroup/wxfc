<?php





$uploaddir = "../img/";//设置文件保存目录 注意包含/    
$type=array("jpg","gif","bmp","jpeg","png");//设置允许上传文件的类型    
$patch="http:///weixinfc/upload/files/";//程序所在路径   

/**
 * 
 * Enter description here ...
 * @param unknown_type $url
 * @param unknown_type $outrul
 * return  -2    -- 类型不对
 * return  -1    -- 上传失败
 * return  0     -- 上传成功
 */
//获取文件后缀名函数   
 function fileext($filename)   
 {   
     return substr(strrchr($filename, '.'), 1);   
 }   

//生成随机文件名函数       
 function random($length)   
 {   
    $hash = 'CR-';   
    $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';   
    $max = strlen($chars) - 1;   
    mt_srand((double)microtime() * 1000000);   
    for($i = 0; $i < $length; $i++)   
    {   
         $hash .= $chars[mt_rand(0, $max)];   
    }   
    
    return $hash;   
}   

	$a=strtolower(fileext($_FILES['picture']['name']));   
   //判断文件类型   
 
   if(!in_array(strtolower(fileext($_FILES['picture']['name'])),$type))   
     {   
        $text=implode(",",$type);   
        echo "您只能上传以下类型文件: ",$text,"<br>";   
     }   
   //生成目标文件的文件名       
   else{   
    $filename=explode(".",$_FILES['picture']['name']);   
        do   
        {   
            $filename[0]=random(10); //设置随机数长度   
            $name=implode(".",$filename);   
            //$name1=$name.".Mcncc";   
            $uploadfile=$uploaddir.$name;   
           // echo $uploadfile;
        }   
 	  while(file_exists($uploadfile));   
   		
   		if(is_uploaded_file($_FILES['picture']['tmp_name']))
   		{
   			if (move_uploaded_file($_FILES['picture']['tmp_name'],$uploadfile))
   			{
   				$Callback= "uploadResult";
   				
   				$id = $_GET["id"];
   				$Res_json=array('msg'=>0,'ret'=>0,'seq'=>0,'ts'=>0);
   				
   				$Result = json_encode($Res_json);
   				
   				//echo "<script language='javascript'>$Callback($Result)</script>";
   				//echo "$Callback($Result)";
   				
   				 $uploadfile=substr($uploadfile, 2);
   				 
   				 $uploadfile="http://112.124.55.78/wxfc/" . $uploadfile;
   				 
   				 #$uploadfile="http://localhost/weixinfc/admin/php/" . $uploadfile;
   				 
   				 echo "<script language='javascript'>parent.test('$uploadfile','$id');</script>";
   				 
   				  //输出图片预览   
               // echo "<center>您的文件已经上传完毕 上传图片预览: </center><br><center><img src='$uploadfile'></center>";   
               // echo"<br><center><a href='javascript:history.go(-1)'>继续上传</a></center>";   
   			}
   		}
   		
   }
   			
   		
   
      
            
              
             
     
     

   
//////////////////////////////////////////////////////////////////////Main///////////////////////////////
	
?>
