var FCAPP = FCAPP || {};
FCAPP.APPLY = {
    CONFIG: {
       
        Server: 'php/admin_house_manage.php' 
        
    },
    RUNTIME: {},
    g_GroupList:{},   //全局房产列表缓存
    g_State:{},
    init: function() {
        var R = APPLY.RUNTIME,
        C = APPLY.CONFIG;
        APPLY.loadInfo();
        APPLY.getUserState();
  
    },

	
	//
    loadInfo: function() {
        var R = APPLY.RUNTIME;
        APPLY.loadgrouplist();
        
        R.submitBtn = $("#apply_sumbit");
        R.submitBtn.click(APPLY.checkForm);
        
        R.submibiedit = $("#apply_edit_sumbit");
        R.submibiedit.click(APPLY.checkForm_edit);
        
        var obj = document.getElementById("title_pic"); //selectid
     	obj.value="(推荐图片尺寸：720*130；图片小于100k)";
        
    },
    
    editgroup:function(){
    	
    	$Cmd=$(this).attr('name');
    	$ID=$(this).attr('id');
    	if($Cmd == "edit")
    	{
		addGroup();
    		APPLY.group_edit_fill($ID);
    		APPLY.g_State.current_edit=$ID;
    		//alert(APPLY.g_State.current_edit);
    	}
    	
    	
    	if($Cmd == "delete")
    	{
 
    	//	alert("老子要删除了"+$ID);
    		
    		if(confirm("确认要删除吗?")){
    			APPLY.group_delete($ID);
    			}else{
    			return;
    				;}
    	}
    	//$("a#edit_${$ID}")
    },
    
    OnUpload:function(url){
   	 var reg=/^(.*\\).*\.(?:.*)$/i; 
        reg.test(url);
        path=RegExp.$1+"";
    	 if(path){
     	 var obj = document.getElementById("title_pic"); //selectid
     	 obj.value=url;
     	 
     	 //obj = document.getElementById("process");
     	// obj.style.visibility="visible";
    	 }
    	 
    	//APPLY.uploadpicture(url);
    	 
   },
    group_delete:function(groupid){
    	
    	if(groupid == undefined )
    		{
    			alert("不存在该项");
    		}
    	
    	 var C = APPLY.CONFIG;
    	 var data = {};
         data.cmd = 104;
         data.groupid = groupid;
         
         data.callback = 'deletegroupResult';
         window.deletegroupResult = APPLY.deletegroupResult;
 		
         $.ajax({
        	 url: C.Server + '?' + $.param(data),
            // url: C.Static ,
             dataType: 'jsonp'
 	
         });
    },
    
    str2date :function(c_date) {
        if (!c_date)
            return "";
        var tempArray = c_date.split("-");
        if (tempArray.length != 3) {
            //alert("你输入的日期格式不正确,正确的格式:2000-05-01 02:54:12");
            return 0;
        }
        var dateArr = c_date.split(" ");
        var date = null;
        if (dateArr.length == 2) {
            var yymmdd = dateArr[0]; 
            var hhmmss = dateArr[1];
            
            date = yymmdd;
        }
        return date;
    },
    
    str2time : function(c_date) {
        if (!c_date)
            return "";
        var tempArray = c_date.split("-");
        if (tempArray.length != 3) {
           // alert("你输入的日期格式不正确,正确的格式:2000-05-01 02:54:12");
            return 0;
        }
        var dateArr = c_date.split(" ");
        var date = null;
        if (dateArr.length == 2) {
            var yymmdd = dateArr[0]; 
            var hhmmss = dateArr[1];
            
            date=hhmmss;
        }
        return date;
    },
    
    group_edit_fill:function(groupid){
    	
    	var group_info = [];
    	for(var i = 0,il = APPLY.g_GroupList.length;i<il;i++){
    		if(APPLY.g_GroupList[i].ID == groupid)
    			{
    				group_info = APPLY.g_GroupList[i];
    				//alert(group_info.Title+groupid);
    			}
    	}
    	
    	  $("#title_pic").val(group_info.TitlePic);
          $("#group_title").val(group_info.Title);
          $("#qishu").val(group_info.Qishu);
          $("#loupan_op").val(group_info.Loupan);
          $("#apply_beg_date").val(APPLY.str2date(group_info.S_time));
          $("#apply_beg_time").val(APPLY.str2time(group_info.S_time));
          $("#apply_end_date").val(APPLY.str2date(group_info.E_time));
          $("#apply_end_time").val(APPLY.str2time(group_info.E_time));
          $("#view_end_date").val(APPLY.str2date(group_info.V_time));
          $("#view_end_time").val(APPLY.str2time(group_info.V_time));
          $("#info_1").val(group_info.Info_1);
          $("#info_2").val(group_info.Info_2);
          $("#info_3").val(group_info.Info_3);
          $("#info_4").val(group_info.Info_4);
          
          var banner = document.getElementById("banner");
          banner.src=group_info.TitlePic;
         // $("#line").val(group_info.line);
          
          
          //init lines
          for(var n = 1;n<lineNum;n++){
        	  var delid = document.getElementById("div_line"+(n+1)).id;
            	
         	  var parent=document.getElementById("lines");
         	  var child=document.getElementById(delid);
         	  parent.removeChild(child);
         	
         	  
          }
          lineNum=1;
          
      		//add
          var lines = group_info.line.split(";");
          
          var line = "";
         
           for(var i = 0; i < lines.length-1; i++) {   
           	//"line"+lineNum
           	var obj  = document.getElementById("line"+(i+1));
           	
           	if(obj == undefined && lines[i]!= "")
           		{
           			//alert(lines[i]);
           			APPLY.AddlineWithValue(lines[i]);
           		}
           	else
           		{
           			obj.value = lines[i];
           		}
           }  
           
           
    	
    },
    
    AddlineWithValue :function(linevalue){
    	var para=document.createElement("div");
		para.setAttribute("class","tipe-lb");
		para.setAttribute("id","div_line"+(lineNum+1));
		
		var label=document.createElement("label");
		var labertxt=document.createTextNode("线路名称：");
		label.appendChild(labertxt);
	
		var input=document.createElement("input");
		input.setAttribute("class","inp-tex");
		input.setAttribute("id","line"+(lineNum+1));
		input.value=linevalue;
		
		var a=document.createElement("a");
		a.setAttribute("class","blue");
		a.setAttribute("href","#none");
		a.setAttribute("name",(lineNum+1));
		a.setAttribute("onclick","Delline(this.name)");
		var atxt=document.createTextNode(" 删除路线");
		a.appendChild(atxt);
	
		para.appendChild(label);
		para.appendChild(input);
		para.appendChild(a);
	
		var element=document.getElementById("lines");
		element.appendChild(para);
	
		lineNum++;
    },
    
    render_group_list: function(data,$obj){
  
    	var tpl = '<tr><td>{Title}</td><td>{ID}</td><td>{Loupan}</td><td>{V_Date}</td><td><a name="edit" class="blue" href="javascript:void(0)" id={ID}>编辑</a><a name="delete" class="blue" href="#none1" id={ID}>删除</a><a target="_blank" name="view" class="blue" href="http://112.124.55.78/test/apply.html?id={ID}" id={ID}>查看</a></td></tr>',
        List = [];
        for (var i = 0,
        il = data.length; i < il; i++) {
            List.push(FCAPP.Common.format(tpl, {
            	Title:   data[i].Title,
            	ID:data[i].ID,
            	Loupan: data[i].Loupan,
            	V_Date: data[i].V_time,
            	Applydate: data[i].applydate,
            	ID:data[i].ID
            }));
           
   
        }
        $obj.html(List.join(''));
        
    	//list_option 
        $obj=$("#loupan_op");
        
        var tp2='<option>{option_name}</option>';
        var List2 = [];
        for (var i = 0,
                il = g_data.length; i < il; i++) {	
                    List2.push(FCAPP.Common.format(tp2, {
                    	option_name:  g_data[i][1].toString()
                    }));
                }
        $obj.html(List2.join(''));
                
                
        var R = APPLY.RUNTIME;
        R.edit_group = $("a");
        R.edit_group.click(APPLY.editgroup);
        
    
        
    },
    
    loadgrouplistResult:function(res){
    
    	
    	var obj = $("#group_list");
    	
    	APPLY.g_GroupList = [];
    	
    	APPLY.g_GroupList = res.list;
    	
    	APPLY.render_group_list(res.list,obj);
    
    },
    
    loadgrouplist:function(){
    	
    	 var C = APPLY.CONFIG;
    	 var data = {};
         data.cmd = 101;
         
         data.callback = 'loadgrouplistResult';
         window.loadgrouplistResult = APPLY.loadgrouplistResult;
 		
         $.ajax({
        	 url: C.Server + '?' + $.param(data),
            // url: C.Static ,
             dataType: 'jsonp'
 	
         });
    },
    
    getUserState: function() {
        var C = APPLY.CONFIG,
        data = {
            appid: window.gQuery && gQuery.appid ? gQuery.appid: '',
            wticket: window.gQuery && gQuery.wticket ? gQuery.wticket: '',
            cmd: 'getuserbyappid',
            callback: 'userStateResult',
            _: new Date().getTime()
        };
        window.userStateResult = APPLY.userStateResult;
        $.ajax({
            url: C.State + '?' + $.param(data),
            dataType: 'jsonp',
            error: APPLY.userStateError
        });
    },
    userStateResult: function(res) {
        var R = APPLY.RUNTIME,
        C = APPLY.CONFIG;
        if (res.ret != 0) {
            APPLY.userStateError();
        } else {
            R.openID = res.openid;
            APPLY.isApply();
        }
    },
    userStateError: function() {
        var C = APPLY.CONFIG;
        if (window.gQuery && gQuery.debug == 1) {
            if (gQuery.form != 1) {
                FCAPP.Common.msg(true, {
                    msg: ''
                });
            }
        } else {
            FCAPP.Common.msg(true, {
                msg: '',
                ok: function() {
                    location.href = "";
                }
            });
        }
		
    },
  
    addloupan:function(){
    	var R = APPLY.RUNTIME,
    	
    	Loupan_name = $("#Loupan_name").val();
    
    	 if (Loupan_name.replace(/[\r\n\s]+/g, '').length < 1 || /[^\u4e00-\u9FA5\sa-z]+/i.test(name)) {
         	alert('请输入正确的楼盘名称');
             return;
         }
    	 
    	 var data = {
    			 Loupan_name: Loupan_name
    	        };
    	 
    	 var C = APPLY.CONFIG;
         data.cmd = 99;
         data.callback = 'saveResult_0';
         window.saveResult_0 = APPLY.saveResult_0;
 		
         $.ajax({
             url: C.Server + '?' + $.param(data),
             dataType: 'jsonp'
 	
         });

    },
    
    checkForm: function() {
        var R = APPLY.RUNTIME,
        title_pic_url =  $("#title_pic").val(),
        group_title   =  $("#group_title").val(),
        qishu	 	  =  $("#qishu").val(),
        loupan_op     =  $("#loupan_op").val(),
        apply_beg_date =  $("#apply_beg_date").val(),
        apply_beg_time =  $("#apply_beg_time").val(),
        apply_end_date =  $("#apply_end_date").val(),
        apply_end_time = $("#apply_end_time").val(),
        view_end_date = $("#view_end_date").val(),
        view_end_time = $("#view_end_time").val(),
        info_1 = $("#info_1").val(),
        info_2 = $("#info_2").val(),
        info_3 = $("#info_3").val(),
        info_4 = $("#info_4").val();
        
        var line = "";
       // var line_n = "";
    
        for(var i = 1; i <=lineNum; i++) {      
        	//"line"+lineNum
        	var obj  = document.getElementById("line"+i);
        	if(obj.value != null)
        	{
        		line += obj.value;
        		line += ";";
        	}
        	
        }  
       
        
        var info = {
        		title_pic_url: title_pic_url,
        		group_title: group_title,
        		qishu: qishu,
        		loupan_op: loupan_op,
        		apply_beg_date: apply_beg_date,
        		apply_beg_time: apply_beg_time,
        		apply_end_date: apply_end_date,
        		apply_end_time: apply_end_time,
        		view_end_date: view_end_date,
        		view_end_time: view_end_time,
        		info_1: info_1,
        		info_2: info_2,
        		info_3: info_3,
        		info_4: info_4,
        		line:line
        };
        APPLY.save(info);
    },
	
    checkForm_edit: function(){
    	
    	var R = APPLY.RUNTIME,
        title_pic_url =  $("#title_pic").val(),
        group_title   =  $("#group_title").val(),
        qishu	 	  =  $("#qishu").val(),
        loupan_op     =  $("#loupan_op").val(),
        apply_beg_date =  $("#apply_beg_date").val(),
        apply_beg_time =  $("#apply_beg_time").val(),
        apply_end_date =  $("#apply_end_date").val(),
        apply_end_time = $("#apply_end_time").val(),
        view_end_date = $("#view_end_date").val(),
        view_end_time = $("#view_end_time").val(),
        info_1 = $("#info_1").val(),
        info_2 = $("#info_2").val(),
        info_3 = $("#info_3").val(),
        info_4 = $("#info_4").val();
        
    	  var line = "";
          // var line_n = "";
       
           for(var i = 1; i <=lineNum; i++) {      
           	//"line"+lineNum
           	var obj  = document.getElementById("line"+i);
           	if(obj.value != null)
           		{
           	 	line += obj.value;
               	line += ";";
           		}
          
           }  
        
         
        var info = {
        		title_pic_url: title_pic_url,
        		group_title: group_title,
        		qishu: qishu,
        		loupan_op: loupan_op,
        		apply_beg_date: apply_beg_date,
        		apply_beg_time: apply_beg_time,
        		apply_end_date: apply_end_date,
        		apply_end_time: apply_end_time,
        		view_end_date: view_end_date,
        		view_end_time: view_end_time,
        		info_1: info_1,
        		info_2: info_2,
        		info_3: info_3,
        		info_4: info_4,
        		line:line
        };
        APPLY.update(info);
    },

    update: function(data){
    	 var C = APPLY.CONFIG;
         data.cmd = 103;
         data.groupid = APPLY.g_State.current_edit;
         data.callback = 'updateResult';
         window.updateResult = APPLY.updateResult;
 		
         $.ajax({
             url: C.Server + '?' + $.param(data),
             dataType: 'jsonp'
 	
         });
    },
    
    save: function(data) {
    	
        var C = APPLY.CONFIG;
        data.cmd = 100;
        data.callback = 'saveResult';
        window.saveResult = APPLY.saveResult;
		
        $.ajax({
            url: C.Server + '?' + $.param(data),
            dataType: 'jsonp'
	
        });
	   	
    },
    
    saveResult:function(data){
    	 var R = APPLY.RUNTIME,
         C = APPLY.CONFIG;
        
         if (data.ret == 0) {
         	 alert('信息录入成功');
         	 APPLY.loadgrouplist();
         } else if (data.ret == -1) {
         	alert('连接数据库失败，请联系管理员!');
         } else if (data.ret == -2){
         	alert('信息已存在，添加失败');
         }else
         {
         	alert('系统错误,请联系管理员!');
         }
    },
    
    updateResult:function(data){
   	 var R = APPLY.RUNTIME,
        C = APPLY.CONFIG;
       
        if (data.ret == 0) {
        	 alert('修改成功!');
        	 APPLY.loadgrouplist();
        } else if (data.ret == -1) {
        	alert('连接数据库失败，请联系管理员!');
        } else if (data.ret == -2){
        	alert('数据更新失败');
        }else
        {
        	alert('系统错误,请联系管理员!');
        }
   },
   
   deletegroupResult:function(data){
	   	 var R = APPLY.RUNTIME,
	        C = APPLY.CONFIG;
	       
	        if (data.ret == 0) {
	        	 alert('删除成功!');
	        	 APPLY.loadgrouplist();
	        } else if (data.ret == -1) {
	        	alert('连接数据库失败，请联系管理员!');
	        } else if (data.ret == -2){
	        	alert('删除失败');
	        }else
	        {
	        	alert('系统错误,请联系管理员!');
	        }
	   },
   
    saveResult_0: function(data) {
        var R = APPLY.RUNTIME,
        C = APPLY.CONFIG;
      
        if (data.ret == 0) {
        	 alert('初始化印象成功');
        } else if (data.ret == -1) {
        	alert('连接数据库失败，请联系管理员!');
        } else if (data.ret == -2){
        	alert('添加数据失败,楼盘已经添加过印象!');
        }else
        {
        	alert('系统错误,请联系管理员!');
        }
    }
};
var APPLY = FCAPP.APPLY;
$(document).ready(APPLY.init);
