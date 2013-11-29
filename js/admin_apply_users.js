var FCAPP = FCAPP || {};
FCAPP.APPLY = {
    CONFIG: {
       
        Server: 'php/admin_apply_users.php' 
        
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
        
        R.submitBtn = $("#users_query");
        R.submitBtn.click(APPLY.users_query);
       
    },
    
    users_query :function(){
    	
    	var groupid = $("#listloupan_op").val();
    	
    	var Arrgroupid = groupid.split(" ");
    	
    	groupid = Arrgroupid[1];
    	
    	if(groupid == undefined)
    		{
    			alert("请选择看房团");
    			return;
    		}
    	
    	
    	 var C = APPLY.CONFIG;
    	 var data = {};
         data.cmd = 102;
         data.groupid = groupid;
         data.callback = 'queryResult';
         window.queryResult = APPLY.queryResult;
 		
         $.ajax({
        	 url: C.Server + '?' + $.param(data),
            // url: C.Static ,
             dataType: 'jsonp'
 	
         });
         
    },
    
    queryResult:function(res){
    	
    	var data = res.list;
    	
    	if(data.length ==0)
    		{
    			alert("该看房团还没有用户报名");
    			return;
    		}
    	
    	var  $obj=$("#listusers");
    	var tpl = '<tr><td>{name}</td><td>{phone}</td><td>{nums}</td><td></tr>',
        List = [];
        for (var i = 0,
        il = data.length; i < il; i++) {
            List.push(FCAPP.Common.format(tpl, {
                name:  data[i].name,
                phone: data[i].phone,
                nums : data[i].nums
            }));
       
   
        }
        $obj.html(List.join(''));
        
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

    render_group_list: function(data,$obj){

    	
    	//list_option 
        $obj=$("#listloupan_op");
        
        var tp2='<option>{option_name}</option>';
        var List2 = [];
        for (var i = 0,
                il = data.length; i < il; i++) {	
                    List2.push(FCAPP.Common.format(tp2, {
                    	option_name:  data[i].Title + '   ' + data[i].ID
                    }));
                }
        $obj.html(List2.join(''));

    },
    
    loadgrouplistResult:function(res){

    	var obj = $("#listloupan_op");

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
        info_4 = $("#info_4").val(),
        line = $("#line").val();
        
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