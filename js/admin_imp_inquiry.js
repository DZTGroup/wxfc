var FCAPP = FCAPP || {};
FCAPP.APPLY = {
    CONFIG: {
       
        Server: 'php/admin_imp_inquiry.php'  ,
        Static: 'static/list.loupan.js'
    },
    RUNTIME: {},
    init: function() {
        var R = APPLY.RUNTIME,
        C = APPLY.CONFIG;
        if (!R.noticeLink) {
			R.Imp_1 = $("#Imp_1");
			R.Imp_2 = $("#Imp_2");
			R.Imp_3 = $("#Imp_3");
			R.Imp_4 = $("#Imp_4");
			R.Imp_5 = $("#Imp_5");
			R.Imp_6 = $("#Imp_6");
			R.Imp_1_votes = $("#Imp_1_votes");
			R.Imp_2_votes = $("#Imp_2_votes");
			R.Imp_3_votes = $("#Imp_3_votes");
			R.Imp_4_votes = $("#Imp_4_votes");
			R.Imp_5_votes = $("#Imp_5_votes");
			R.Imp_6_votes = $("#Imp_6_votes");
        }
    
        APPLY.loadInfo();
        APPLY.getUserState();
  
    },

	
	//
    loadInfo: function() {
        var R = APPLY.RUNTIME;
          R.imp_inquiry = $("#imp_inquiry");
          R.imp_inquiry.click(APPLY.impquery); 

          //APPLY.loadloupanlist();
          APPLY.render_loupan_list(g_data);
       
    },
   
    impquery:function(){
    	
    	//var loupanname = $("#listloupan_op").val();
    	
    	var obj = document.getElementById("listloupan_op"); //selectid

        var index = obj.selectedIndex; // 选中索引

        var text = obj.options[index].text; // 选中文本

        var loupanname = obj.options[index].id; // 选中值
        
    	var beg_date=$("#query_beg_date").val();
    	var end_date=$("#query_end_date").val();
    	
    	
    	if(beg_date=="" || end_date=="")
    		{
    			alert("请选择查询日期");
    			return;
    		}
    	APPLY.load_impression_list(loupanname,beg_date,end_date);
    	APPLY.load_user_impression_list(loupanname,beg_date,end_date);
    },
    
    load_user_impression_list: function(loupanname,begdate,enddate){
    	
    	
    	var C = APPLY.CONFIG;
   	 	var data = {};
        data.cmd = 102;    
        data.begdate = begdate;
        data.enddate = enddate;
        data.loupanid = loupanname;
        data.callback = 'load_user_impression_list_Result';
        window.load_user_impression_list_Result = APPLY.load_user_impression_list_Result;
		
        $.ajax({
       	 url: C.Server + '?' + $.param(data),
           // url: C.Static ,
            dataType: 'jsonp'
	
        });
    },
    
    load_impression_list:function(loupanname,begdate,enddate){
    
    	var C = APPLY.CONFIG;
   	 	var data = {};
        data.cmd = 100;
        data.loupanid = loupanname;
        data.begdate = begdate;
        data.enddate = enddate;
        data.callback = 'load_impression_list_Result';
        window.load_impression_list_Result = APPLY.load_impression_list_Result;
		
        $.ajax({
       	 url: C.Server + '?' + $.param(data),
           // url: C.Static ,
            dataType: 'jsonp'
	
        });
    },
    
    load_impression_list_Result:function(res){
    	
    	APPLY.render_impression_list(res.list);
    },
    
    load_user_impression_list_Result:function(res){
    	
    	var data =res.list;
    	var tpl = '<tr><td>{ID}</td><td>{Desc}</td><td>{Votes}</td></tr>',
    	$obj = $("#listuserimp");
        List = [];
        for (var i = 0,
        il = data.length; i < il; i++) {
            List.push(FCAPP.Common.format(tpl, {
                ID:   (i+1).toString(),
                Desc: data[i].desc,
                Votes: data[i].votes,
   
            }));
       
   
        }
        $obj.html(List.join(''));
    },
    
    render_impression_list:function(data){
    	
    	var tpl = '<tr><td>{ID}</td><td>{Desc}</td><td>{Votes}</td><td>{UserVotes}</td></tr>',
    	$obj = $("#listloupan");
        List = [];
        for (var i = 0,
        il = data.length; i < il; i++) {
            List.push(FCAPP.Common.format(tpl, {
                ID:   data[i].ID,
                Desc: data[i].desc,
                Votes: data[i].votes,
                UserVotes: data[i].uservotes
            }));
       
   
        }
        $obj.html(List.join(''));
    	//alert("进来了");
    },
    
    render_loupan_list: function(data){   
    	//list_option 
        var $obj=$("#listloupan_op");
        
        var tp2='<option id={ID}>{option_name}</option>';
        var List2 = [];
        for (var i = 0,
                il = data.length; i < il; i++) {	
                    List2.push(FCAPP.Common.format(tp2, {
                    	ID:   data[i][0].toString(),
                    	option_name:   data[i][1]
                    }));
                }
         $obj.html(List2.join(''));
        
    },
    
    loadloupanlistResult:function(res){
    
    	var obj = $("#listloupan");
    	
    	var data = res.list;
    	
    	APPLY.render_loupan_list(res.list,obj);
    
    },
    
  
    
    loadloupanlist:function(){
    	 
    	 var C = APPLY.CONFIG;
    	 var data = {};
         data.cmd = 101;
         
         data.callback = 'loadloupanlistResult';
         window.loadloupanlistResult = APPLY.loadloupanlistResult;
 		
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
	
        Select_ID = $("#listloupan_op").get(0).selectedIndex,
		Imp_1 =  $("#Imp_2").val(),
		Imp_2 =  $("#Imp_2").val(),
		Imp_3 =  $("#Imp_3").val(),
		Imp_4 =  $("#Imp_4").val(),
		Imp_5 =  $("#Imp_5").val(),
		Imp_6 =  $("#Imp_6").val(),
		Imp_1_votes = $("#Imp_1_votes").val(),
		Imp_2_votes = $("#Imp_2_votes").val(),
		Imp_3_votes = $("#Imp_3_votes").val(),
		Imp_4_votes = $("#Imp_4_votes").val(),
		Imp_5_votes = $("#Imp_5_votes").val(),
		Imp_6_votes = $("#Imp_6_votes").val();
        FCAPP.Common.saveCookie('Imp_1', Imp_1, 300);
        FCAPP.Common.saveCookie('Imp_2', Imp_1, 300);
        FCAPP.Common.saveCookie('Imp_3', Imp_1, 300);
        FCAPP.Common.saveCookie('Imp_4', Imp_1, 300);
		FCAPP.Common.saveCookie('Imp_5', Imp_1, 300);
        FCAPP.Common.saveCookie('Imp_6', Imp_1, 300);
		
        Select_ID += 1;
        
         if (!/^[0-9]*$/.test(Imp_1_votes)) {
			alert('请给印象一输入正确的投票数');
            return;
        }
		
		 if (!/^[0-9]*$/.test(Imp_2_votes)) {
			 alert('请给印象二输入正确的投票数');
            return;
        }
		
		 if (!/^[0-9]*$/.test(Imp_3_votes)) {
			 alert('请给印象三输入正确的投票数');
            return;
        }
		
		 if (!/^[0-9]*$/.test(Imp_4_votes)) {
			 alert('请给印象四输入正确的投票数');
            return;
        }
		
		 if (!/^[0-9]*$/.test(Imp_5_votes)) {
			 alert('请给印象五输入正确的投票数');
            return;
        }
		
		 if (!/^[0-9]*$/.test(Imp_6_votes)) {
			 alert('请给印象六输入正确的投票数');
            return;
        }
		
		
        if (Imp_1.replace(/[\r\n\s]+/g, '').length < 1 || /[^\u4e00-\u9FA5\sa-z]+/i.test(name)) {
        	alert('请给印象一输入正确的印象名称');
            return;
        }
		
		 if (Imp_2.replace(/[\r\n\s]+/g, '').length < 1 || /[^\u4e00-\u9FA5\sa-z]+/i.test(name)) {
			 alert('请给印象二输入正确的印象名称');
            return;
        }
		
		 if (Imp_3.replace(/[\r\n\s]+/g, '').length < 1 || /[^\u4e00-\u9FA5\sa-z]+/i.test(name)) {
			 alert('请给印象三输入正确的印象名称');
            return;
        }
		
		 if (Imp_4.replace(/[\r\n\s]+/g, '').length < 1 || /[^\u4e00-\u9FA5\sa-z]+/i.test(name)) {
			 alert('请给印象四输入正确的印象名称');
            return;
        }
		
		 if (Imp_5.replace(/[\r\n\s]+/g, '').length < 1 || /[^\u4e00-\u9FA5\sa-z]+/i.test(name)) {
			 alert('请给印象五输入正确的印象名称');
            return;
        }
		
		 if (Imp_6.replace(/[\r\n\s]+/g, '').length < 1 || /[^\u4e00-\u9FA5\sa-z]+/i.test(name)) {
			 alert('请给印象六输入正确的印象名称');
            return;
        }
		
      
        var info = {
            Imp_1: Imp_1,
            Imp_2: Imp_2,
            Imp_3: Imp_3,
			Imp_4: Imp_4,
			Imp_5: Imp_5,
			Imp_6: Imp_6,
			Imp_1_votes: Imp_1_votes,
            Imp_2_votes: Imp_2_votes,
            Imp_3_votes: Imp_3_votes,
			Imp_4_votes: Imp_4_votes,
			Imp_5_votes: Imp_5_votes,
			Imp_6_votes: Imp_6_votes,
			Select_ID:Select_ID
        };
        APPLY.save(info);
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
    
    saveResult_0:function(data){
    	 var R = APPLY.RUNTIME,
         C = APPLY.CONFIG;
        
         if (data.ret == 0) {
         	 alert('添加楼盘成功');
         	 APPLY.loadloupanlist();
         } else if (data.ret == -1) {
         	alert('连接数据库失败，请联系管理员!');
         } else if (data.ret == -2){
         	alert('楼盘已存在，添加失败');
         }else
         {
         	alert('系统错误,请联系管理员!');
         }
    },
    
    saveResult: function(data) {
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