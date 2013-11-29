var FCAPP = FCAPP || {};
FCAPP.APPLY = {
    CONFIG: {
       
        Server: 'php/admin_review.php'  
       
    },
    RUNTIME: {},
    g_ReviewList:{},   //房产列表缓存
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
        

        R.sbt_save_edit = $("#sbt_save_edit");
        R.sbt_add = $("#sbt_add");
        R.sbt_query = $("#sbt_query");
   
        R.sbt_save_edit.click(APPLY.review_edit);
        R.sbt_add.click(APPLY.review_add);
        R.sbt_query.click(APPLY.review_query);
        
        APPLY.render_loupan_list(g_data);
    
       
    },
   
    review_query:function(){
    	//alert("review_query");
    	var  C = APPLY.CONFIG;
    	
    	var obj = document.getElementById("listloupan_op"); //selectid

        var index = obj.selectedIndex; // 选中索引

        var text = obj.options[index].text; // 选中文本

        var loupanid = obj.options[index].id; // 选中值
    	
    	var data = [];
    	
    	data.loupanid = loupanid;
        data.cmd = 101;
        data.callback = 'queryResult';
        window.queryResult = APPLY.queryResult;
		
        $.ajax({
            url: C.Server + '?' + $.param(data),
            dataType: 'jsonp'
	
        });
    },
    
    review_edit:function(){
    
    	var expert_photo =  $("#expert_photo").val(),
    	expert_name =  $("#expert_name").val(),
    	expert_title =  $("#expert_title").val(),
    	expert_intro =  $("#expert_intro").val(),
    	expert_reviewTitle =  $("#expert_reviewTitle").val(),
    	expert_reviewDesc =  $("#expert_reviewDesc").val();
    	
    	var obj = document.getElementById("listloupan_op"); //selectid

        var index = obj.selectedIndex; // 选中索引

        var text = obj.options[index].text; // 选中文本

        var loupanid = obj.options[index].id; // 选中值
        
    //	loupanid = $("#listloupan_op").val();
    	
    	
    	if(loupanid == undefined)
    		{
    			alert("请选择楼盘");
    			return;
    		}
    	 var info = {
    			 expert_photo: expert_photo,
    			 expert_name: expert_name,
    			 expert_title: expert_title,
    			 expert_intro: expert_intro,
    			 expert_reviewTitle: expert_reviewTitle,
    			 expert_reviewDesc: expert_reviewDesc,
    			 loupanid:loupanid,
    	 		 expert_id:APPLY.g_State.current_edit
    	        };
      APPLY.save_edit(info);
    	
    },
    
    review_add:function(){
    	var expert_photo =  $("#expert_photo").val(),
    	expert_name =  $("#expert_name").val(),
    	expert_title =  $("#expert_title").val(),
    	expert_intro =  $("#expert_intro").val(),
    	expert_reviewTitle =  $("#expert_reviewTitle").val(),
    	expert_reviewDesc =  $("#expert_reviewDesc").val();
    	
    	var obj = document.getElementById("listloupan_op"); //selectid

        var index = obj.selectedIndex; // 选中索引

        var text = obj.options[index].text; // 选中文本

        var loupanid = obj.options[index].id; // 选中值
        
    	//loupanid = $("#listloupan_op").val();
    	
    	if(loupanid == undefined)
    		{
    			alert("请选择楼盘");
    			return;
    		}
    	 var info = {
    			 expert_photo: expert_photo,
    			 expert_name: expert_name,
    			 expert_title: expert_title,
    			 expert_intro: expert_intro,
    			 expert_reviewTitle: expert_reviewTitle,
    			 expert_reviewDesc: expert_reviewDesc,
    			 loupanid:loupanid
    	        };
      APPLY.save_add(info);
    },
    
    
    save_add:function(data){
    	 var C = APPLY.CONFIG;
         data.cmd = 100;
         data.callback = 'saveaddResult';
         window.saveaddResult = APPLY.saveaddResult;
 		
         $.ajax({
             url: C.Server + '?' + $.param(data),
             dataType: 'jsonp'
 	
         });
    	
    },
    save_edit:function(data){
    	
    	var C = APPLY.CONFIG;
        data.cmd = 102;
        data.callback = 'saveeditResult';
        window.saveeditResult = APPLY.saveeditResult;
		
        $.ajax({
            url: C.Server + '?' + $.param(data),
            dataType: 'jsonp'
	
        });
    },
    
    saveeditResult:function(data){
    	  if (data.ret == 0) {
           	 alert('修改专家评论成功');
           	 APPLY.review_query();
        
           } else if (data.ret == -1) {
           	alert('连接数据库失败，请联系管理员!');
           } else if (data.ret == -2){
           	alert('修改评论添加失败');
           }else
           {
           	alert('系统错误,请联系管理员!');
           }
    },
    saveaddResult:function(data){
    	//alert("saveaddResult");
    	  if (data.ret == 0) {
          	 alert('添加专家评论成功');
          	 APPLY.review_query();
          } else if (data.ret == -1) {
          	alert('连接数据库失败，请联系管理员!');
          } else if (data.ret == -2){
          	alert('专家评论添加失败');
          }else
          {
          	alert('系统错误,请联系管理员!');
          }
    },
    
    queryResult:function(data){
    	
    	
    	APPLY.g_ReviewList = [];
    	APPLY.g_ReviewList = data.list;
    	APPLY.render_reivew_list(data.list);
    },
    
    queryResult_afterdel:function(data){
    	
    	
    	APPLY.g_ReviewList = [];
    	APPLY.g_ReviewList = data.list;
    	APPLY.render_reivew_list(data.list);
    },
    
    render_reivew_list:function(data){
 
    	var  $obj=$("#review_list");
    	var tpl = '<tr><td>{name}</td><td>{title}</td><td>{date}</td><td><a name="edit" class="blue" href="javascript:void(0)" id={ID}>编辑</a><a name="delete" class="blue" href="#none1" id={ID}>删除</a><a  target="_blank" class="blue" href="http://112.124.55.78/test/review.html?loupanid={loupanid}" >查看</a></tr>',
        List = [];
        for (var i = 0,
        il = data.length; i < il; i++) {
            List.push(FCAPP.Common.format(tpl, {
            	ID:    data[i].id,
            	loupanid:data[i].loupanid,
                name:  data[i].name,
                title: data[i].title,
                date : data[i].date
            }));
       
   
        }
        $obj.html(List.join(''));
        
        var R = APPLY.RUNTIME;
        R.edit_group = $("a");
        R.edit_group.click(APPLY.op_views);
    },
    
    render_loupan_list: function(data){
    	
     	var  $obj=$("#listloupan_op");
    	
    	//list_option 
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
    

    op_views:function(){
    
    	$Cmd=$(this).attr('name');
    	$ID=$(this).attr('id');
    	
    	
    	if($Cmd == "delete")
    	{
    		if(confirm("确认要删除吗?")){
    			APPLY.review_delete($ID);
    			}
    		else{
    			return;
    		}
    	}
    	
    	if($Cmd == "edit")
    	{	
    		//alert($ID);
    		APPLY.review_edit_fill($ID);
    		APPLY.g_State.current_edit=$ID;
    	}
    },
    
    review_edit_fill:function(id){
    	
    	var review_info = [];
    	
    	for(var i = 0,il = APPLY.g_ReviewList.length;i<il;i++){
    		if(APPLY.g_ReviewList[i].id == id)
    			{
    			
    				review_info = APPLY.g_ReviewList[i];
    				//alert(review_info.name+id);
    			}
    	}
    	
    
    	 $("#expert_photo").val(review_info.photo);
    	 $("#expert_name").val(review_info.name);
    	 $("#expert_title").val(review_info.title);
    	 $("#expert_intro").val(review_info.intro);
    	 $("#expert_reviewTitle").val(review_info.reviewtitle);
    	 $("#expert_reviewDesc").val(review_info.reviewdesc);

    },
    
    review_delete:function(id){
    	if(id == undefined )
		{
			alert("不存在该项");
		}
	
    	var obj = document.getElementById("listloupan_op"); //selectid

        var index = obj.selectedIndex; // 选中索引

        var text = obj.options[index].text; // 选中文本

        var loupanid = obj.options[index].id; // 选中值
        
	 var C = APPLY.CONFIG;
	 var data = {};
     data.cmd = 104;
     data.expert_id = id;
     data.loupanid = loupanid;
     data.callback = 'delete_review_Result';
     window.delete_review_Result = APPLY.delete_review_Result;
		
     $.ajax({
    	 url: C.Server + '?' + $.param(data),
        // url: C.Static ,
         dataType: 'jsonp'
	
     });
    	
    },
    
    delete_review_Result:function(data){
        if (data.ret == 0) {
         	 alert('删除成功');
         	 APPLY.review_query();
         } else if (data.ret == -1) {
         	alert('连接数据库失败，请联系管理员!');
         } else if (data.ret == -2){
         	alert('删除失败!');
         }else
         {
         	alert('系统错误,请联系管理员!');
         }
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
