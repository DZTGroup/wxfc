var FCAPP = FCAPP || {};
FCAPP.APPLY = {
    CONFIG: {
       
        Server: 'php/admin_imp_set.php'  ,
        Static: 'static/list.loupan.js'
    },
    RUNTIME: {},
    g_list_impression:{},
    init: function() {
        var R = APPLY.RUNTIME,
        C = APPLY.CONFIG;
       
    
        APPLY.loadInfo();
        APPLY.getUserState();
  
    },

	
	//
    loadInfo: function() {
        var R = APPLY.RUNTIME;
        

        R.submitBtn = $("#submitBtn");

        R.submitBtn.click(APPLY.checkForm);
        
        R.submitBtn_edit = $("#submitBtn_edit");
        R.submitBtn_edit.click(APPLY.sbt_edit);
        
        APPLY.render_loupan_op_list(g_data);
        
        //APPLY.render_loupan_list(g_data);
        APPLY.louallloupanimp();
        APPLY.loadloupanlist();
       
    },
    sbt_edit:function(){
    	
    	 var R = APPLY.RUNTIME;
    	 
    	Imp_1 =  $("#Imp_1").val(),
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
      
		
        var obj = document.getElementById("listloupan_op"); //selectid

        var index = obj.selectedIndex; // 选中索引

        var text = obj.options[index].text; // 选中文本

        var loupanname = obj.options[index].id; // 选中值
        
      // alert(loupanname);
        
       
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
			loupanname:loupanname
        };
        APPLY.save_edit(info);
    },
    
    save_edit:function(data){
    	 var C = APPLY.CONFIG;
         data.cmd = 106;
         data.callback = 'saveeditResult';
         window.saveeditResult = APPLY.saveeditResult;
 		
         $.ajax({
             url: C.Server + '?' + $.param(data),
             dataType: 'jsonp'
 	
         });
    },
    
    saveeditResult:function(data)
    {
    	 if (data.ret == 0) {
         	 alert('修改成功');
         	  APPLY.louallloupanimp();
         } else if (data.ret == -1) {
         	alert('连接数据库失败，请联系管理员!');
         } else if (data.ret == -2){
         	alert('修改失败');
         }else
         {
         	alert('系统错误,请联系管理员!');
         }
    },
    render_loupan_op_list:function(data){
    	
    	//list_option 
        var $obj=$("#listloupan_op");
        
        var tp2='<option id={ID} name={ID}>{option_name}</option>';
        var List2 = [];
        for (var i = 0,
                il = data.length; i < il; i++) {	
                    List2.push(FCAPP.Common.format(tp2, {
                    	ID:   data[i][0].toString(),
                    	option_name: data[i][1].toString()
                    }));
                }
                $obj.html(List2.join(''));
                
                
      
    },
    
    getloupan_name_by_id:function(id){
    	
    	for(var n =0,n1 = g_data.length;n<n1;n++){
    		 if( g_data[n][0] == id)
    			 {
    			 	return g_data[n][1];
    			 }
    		
    	}
    },
    
    render_loupan_list: function(data){
    	
     	var  $obj=$("#listloupan");
    	
    	//list_table
     	var tpl = '<tr><td>{ID}</td><td>{Desc}</td><td><a name="edit" id={ID}  class="blue" href="#none">编辑</a><a target="_blank" class="blue" href="http://112.124.55.78/test/review.html?loupanid={ID}">预览</a><a name="delete" id={ID}  class="blue" href="#none">删除</a></td></tr>',
        List = [];
        for (var i = 0,
        il = data.length; i < il; i++) {
        	//
        	
        	
            List.push(FCAPP.Common.format(tpl, {
                ID:   data[i].ID,
                Desc: APPLY.getloupan_name_by_id(data[i].ID),
                Date: data[i].date
            }));
        }
        $obj.html(List.join(''));  
        
        var R = APPLY.RUNTIME;
        R.edit_group = $("a");
        R.edit_group.click(APPLY.edit);
       
    },
    
   
    
    edit:function(){
    	
    	$Cmd=$(this).attr('name');
    	$ID=$(this).attr('id');
    	
    	if($Cmd == "delete")
    	{
    		if(confirm("确认要删除吗?")){
    			APPLY.loupan_impression_delete($ID);
    			}
    		else{
    			return;
    		}
    	}
    	
    	if($Cmd == "edit")
    		{
    			addImp();	
    			var loupan_imp = APPLY.getloupanimp_byloupanid($ID);
    			
    	
    			
    			for(var n=0,n1=loupan_imp.length;n<n1;n++)
    				{
    				 if(loupan_imp[n].impid == "1")
    					{
    						$("#Imp_1").val(loupan_imp[n].desc);
    						$("#Imp_1_votes").val(loupan_imp[n].votes);
    					}
    					
    					if(loupan_imp[n].impid == "2")
						{
							$("#Imp_2").val(loupan_imp[n].desc);
							$("#Imp_2_votes").val(loupan_imp[n].votes);
						}
    					if(loupan_imp[n].impid == "3")
						{
							$("#Imp_3").val(loupan_imp[n].desc);
							$("#Imp_3_votes").val(loupan_imp[n].votes);
						}
    					if(loupan_imp[n].impid == "4")
						{
							$("#Imp_4").val(loupan_imp[n].desc);
							$("#Imp_4_votes").val(loupan_imp[n].votes);
						}
    					if(loupan_imp[n].impid == "5")
						{
							$("#Imp_5").val(loupan_imp[n].desc);
							$("#Imp_5_votes").val(loupan_imp[n].votes);
						}
    					if(loupan_imp[n].impid == "6")
						{
							$("#Imp_6").val(loupan_imp[n].desc);
							$("#Imp_6_votes").val(loupan_imp[n].votes);
						}
    				}
    			
    			
    			
    		}
    },
    
    getloupanimp_byloupanid:function(id)
    {
    	//alert(APPLY.g_list_impression.length);
    	var loupan_imp = [];
    	
    	for(var n=0,n1=APPLY.g_list_impression.length;n<n1;n++)
    		{
    			if(id == APPLY.g_list_impression[n].loupanid)
    				{
    					loupan_imp.push(APPLY.g_list_impression[n]);
    				}
    		}
    	
    	return loupan_imp;
    },
    
    loupan_impression_delete:function(id){
    	if(id == undefined )
		{
			alert("不存在该项");
		}
	
	 var C = APPLY.CONFIG;
	 var data = {};
     data.cmd = 104;
     data.loupanid = id;
     
     data.callback = 'delete_loupan_imp_Result';
     window.delete_loupan_imp_Result = APPLY.delete_loupan_imp_Result;
		
     $.ajax({
    	 url: C.Server + '?' + $.param(data),
        // url: C.Static ,
         dataType: 'jsonp'
	
     });
    	
    },
    
    loadloupanlistResult:function(res){
    
    	var obj = $("#listloupan");
    	var data = res.list;
    	
    	APPLY.render_loupan_list(res.list,obj);
    
    },
    
  
    louallloupanimp:function(){
    	 var C = APPLY.CONFIG;
    	 var data = {};
         data.cmd = 105;
         
         data.callback = 'loadallloupanimplistResult';
         window.loadallloupanimplistResult = APPLY.loadallloupanimplistResult;
 		
         $.ajax({
        	 url: C.Server + '?' + $.param(data),
            // url: C.Static ,
             dataType: 'jsonp'
 	
         });
    },
    
    loadallloupanimplistResult:function(data){
    	APPLY.g_list_impression = data.list;
    	//alert(g_list_impression);
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
	
        loupanname = $("#listloupan_op").val(),
        
		Imp_1 =  $("#Imp_1").val(),
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
		
        
        var obj = document.getElementById("listloupan_op"); //selectid

        var index = obj.selectedIndex; // 选中索引

        var text = obj.options[index].text; // 选中文本

        var loupanname = obj.options[index].id; // 选中值
        
      // alert(loupanname);
        
       
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
			loupanname:loupanname
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
    
    delete_loupan_imp_Result:function(data){
    	  var R = APPLY.RUNTIME,
          C = APPLY.CONFIG;
        
          if (data.ret == 0) {
          	 alert('删除成功');
          } else if (data.ret == -1) {
          	alert('连接数据库失败，请联系管理员!');
          } else if (data.ret == -2){
          	alert('删除失败!');
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
        	 APPLY.loadloupanlist();
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
