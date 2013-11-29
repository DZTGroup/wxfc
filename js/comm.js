// JavaScript Document

function getCookie(objName){
	var arrStr = document.cookie.split("; "); 
	for(var i = 0;i < arrStr.length;i ++){
		var temp = arrStr[i].split("="); 
		if(temp[0] == objName)
			return unescape(temp[1]); 
	}
	return "";
}

function isLogin()
{
	if ( "" == getCookie( "auth" )
	|| "" == getCookie( "name" )
	|| "" == getCookie( "type" ) )
	{
		return false;
	}
	return true;
}

function checkLogin()
{
	if ( !isLogin() )
	{
		var jump = "login.php?jump=" + window.location;
		window.location = jump;
	}
}

function init_header()
{
	var e = document.getElementById("unm");
	e.innerHTML = getCookie("name");
}

function init_loupanselect()
{
	var s = "";
	for ( var i=0; i<g_data.length; i++ )
	{
		var d = g_data[i];
		s += "<option>" + d[1] + "</option>";
	}
	
	$("#lp_select").html( s );
}

function preview( file, id )
{
    var prevDiv = document.getElementById(id);
    if (file.files && file.files[0])
    {
        var reader = new FileReader();
        reader.onload = function(evt){
            prevDiv.innerHTML = '<img class="img-pre" src="' + evt.target.result + '" />';
        }   
        reader.readAsDataURL(file.files[0]);
    }else  
    {
        prevDiv.innerHTML = '<div class="img-pre" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
    }
}

/*
	path - 相对路径
*/
var g_up_id = 1;

function str_html_uploadform( path )
{
	g_up_id++;

	var imgid = "xx_up_img_id_" + g_up_id;
	var fmid = "xx_up_fm_id_" + g_up_id;
	var ifrnm = "xx_up_ifr_" + g_up_id;

	var s = '<form target="'+ifrnm+'" action="asup.php?p=' + path + '" enctype="multipart/form-data" method="post" id="' + fmid + '" >'
		+ '<div class="tipe-lb"><label>.</label> <div id="' + imgid + '"><img class="img-pre" src="' + path + '" /></div></div>'
		+ '<div class="tipe-lb"><label>.</label> <input type="file" name="file" onchange="preview_asup(this,\'' + g_up_id + '\')" /></div>'
		+ '</form><iframe name="' +ifrnm+ '" id="ifram_sign" src="" height="0" width="0" style="display:none;" ></iframe>';
	return s;
}

function create_uploadform( id, path )
{
	var e = document.getElementById(id);
	e.innerHTML = str_html_uploadform(path);
}

function msgbox_normal( s )
{
	alert(s);
}

function msgbox_error( s )
{
	alert(s);
}

function preview_asup( file, id )
{
	var e_img = document.getElementById( "xx_up_img_id_" + id );
	var e_fm = document.getElementById( "xx_up_fm_id_" + id );
    if (file.files && file.files[0])
    {
        var reader = new FileReader();
        reader.onload = function(evt){
            e_img.innerHTML = '<img class="img-pre" src="' + evt.target.result + '" />';
        }   
        reader.readAsDataURL(file.files[0]);
    }else  
    {
        e_img.innerHTML = '<div class="img-pre" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
    }
	
	e_fm.submit();
}

function img_upload_html( path, name )
{
	var s = '<div class="com-min">'
			+ '<h3>' + name + '</h3>'
			+ str_html_uploadform( path ) 
			+ '</div>';
	return s;
}

function create_img_upload( id, path, name )
{
        var e = document.getElementById(id);
        e.innerHTML = img_upload_html(path,name);
}

function erase_host( s )
{
	//'../building/'
	return s.replace( "http://112.124.55.78/", "" );
}

function getQQVidByUrl( s )
{
	// http://v.qq.com/cover/s/s7iexodqfujtotn.html?vid=e0011kjm9ut
	var arrStr = s.split("?");
	for(var i=0;i < arrStr.length;i ++){
		var temp = arrStr[i].split("="); 
		if(temp[0] == "vid")
			return temp[1]; 
	}
	
	// http://v.qq.com/boke/page/p/u/q/p01035qkduq.html
	arrStr = s.split("/");
	if ( arrStr.length > 0 )
	{
		return arrStr[ arrStr.length-1 ].replace( ".html", "" );
	}
	
	return s;
}

function a_html( name, url )
{
	return '<a href="' + url + '">' + name + '</a>';
}

function create_tblbyjson( v )
{
	var s = '<table width="760" border="0" cellspacing="1" cellpadding="0" bgcolor="#d7d7d7">';

	s += '<tr>';
	for ( var i=0; i<v.th.length; i++ )
	{
		s += '<th>' + v.th[i] + '</th>';
	}
	s += '</tr>';

	for ( var i=0; i<v.td.length; i++ )
	{
		s += '<tr>';
		for ( var j=0; j<v.td[i].length; j++ )
			s += '<td>' + v.td[i][j] + '</td>';
		s += '</tr>';
	}

	s += '</table>';
	return s;
}

function move_win( id_from, id_to )
{
	var from = $("#"+id_from);
	var to = $("#"+id_to);
	from.css("position","absolute");
	from.css("top",to.offset().top);
	from.css("left",to.offset().left);
}

function init_lp_select()
{
	var s = "";
	for ( var i=0; i<g_data.length; i++ )
	{
		s += '<option value="' + g_data[i][0] + '">' + g_data[i][1] + '</option>';
	}
	
	$("#lp_sel").html( s );
}
