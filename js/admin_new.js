var FCAPP = FCAPP || {};
FCAPP.APPLY = {
    CONFIG: {
       
        Server: 'php/admin_new.php'  
       
    },
    RUNTIME: {},
    
    v_arr_dyt_all_loupan:[],//所有楼盘多业态 
    
      v_dyt:{},    //多业态					yt-data.js
      v_yts:[],    //全局业态数据，数组

    //全局临时变量	
    modules:[],  //业态优惠
    module:[],   //业态优惠
    items:[],    //优惠items
   
    v_arr_yt_sc:[], //业态滚动图	  
    v_yt:{},
    init: function() {
        var R = APPLY.RUNTIME,
        C = APPLY.CONFIG;
    
        APPLY.loadInfo();
        //APPLY.getUserState();
        
       
    },

  
    loadInfo: function() {
        var R = APPLY.RUNTIME;
       
		  //
		  APPLY.add_events(R);

          //
          APPLY.render_list_loupan_op();
          
          
          
          //init
          APPLY.init_g_data();
          APPLY.init_yh_input();
          APPLY.init_yt_input();
          APPLY.init_dyt_input();
          
          //load all loupan dyt
          APPLY.load_all_dyt();
    },

	
	load_all_dyt:function()
    {
    	
    	 var C = APPLY.CONFIG;
    	 var data = {};
         data.cmd = 101;

         data.callback = 'Result_101';
         
         window.Result_101 = APPLY.Result_101;
    		
         $.post(C.Server,data,APPLY.Result_101,'json');   
    },

    //业态数据结构定义
    /*
    init_dyt:function(){
    
		v_dyt.bgImg = "http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/yt/bg.jpg";
		v_dyt.title = "狮子湖漫生活";
		v_dyt.desc  = "7年的倾力打造，狮子湖成就了南中国休闲生活的新地标，囊括超五星级酒店、国际锦标级高尔夫、高端别墅、商务休闲、健康休闲等板块，国际学校、温泉度假区、生活配套区现已全面启动，另规划中的温泉度假中心和被广东省列为省重点工程的五千年文化博览园也在筹建中，狮子湖，国际顶级浩瀚配套，豪迈气概领航中国。";
		v_dyt.banner = "http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/yt/yt-list/banner.jpg";
		
		v_dyt.items = v_dyt_items;	
	},
    var v_dyt_items = []; 
	
    init_dyt_items:function(){
    	var v_yt = {};
    	v_yt.id = "1003";
    	v_yt.icon = "http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/yt/yt-list/items/jkzx.jpg";
    	v_yt.title = "狮子湖健康中心";
    	v_yt.desc = "Lion Lake Health Center";
    	v_yt.intro= "狮子湖健康中心作为世界卫生组织上海中心认定的全国首个“高端长寿基地”、中国卫生部医促会认定的“抗衰老健康基地”；中国保健营养理事会认定的“养生健康研究中心”，狮子湖健康中心配备了国际医学奖得主、中国两院院士、中国国医大师为核心的顶级学术委员会。狮子湖健康中心秉承“为您排除生命暗礁，帮您提高生命质量”的经营理念，为会员提供国际顶尖的TJK健康预警、国际尖端的超早期防癌检测、全球顶级医疗专家团队在线视频咨询、全球顶级医疗资源VIP绿色通道、国内顶级疗养大师康复服务、15种疑难病症顶级康复等高端服务，创始会员包括三十多个国家的驻华大使以及数十位国内各行业的领军人物。";
    	
    	
    	var  images  = [];
    	var  contact = {};
    	var  modules = [];
    	v_yt.images  = images;   //[]
    	v_yt.contact = contact; //[]
    	v_yt.modules = modules; //[]
    	
    	v_dyt_items.push(v_yt);
    	
    	/*
    	 * images:[]
    	 *   var image = {};
		 *	 image.title = "健康中心全景";
		 *	 image.url = "http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/yt/yt-detail/topimages/jkzx/yh2.jpg";
		 *	 images.push(image);
    	 * */
    	
    	/*
    	 * contact:{}
    	 *   var phones = [];
		 *   contact.timesOn="早9:00-晚23:30";
		 *   phones.push("4009301688");
		 *   phones.push("0763-3631669");
		 *   contact.phones = phones;
    	 * */
    	
    	/*
    	 * modules:[]
    	 *   var module={};
			 var items=[],item={};
			 module.title="尊享优惠";
			 item.actid="10003";
			 item.icon="http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/yt/yt-detail/itemicons/jkzx/yh1.jpg";
			 item.title="探寻健康·排毒之旅套餐1";
			 item.desc = "生命排毒3天2夜套餐";
			 item.timeStart = "2013.07.15";
			 item.timeEnd = "2013.12.30";
			 items.push(item);
			 
			 module.items=items;
			 modules.push(module);
    	 * */
   
   
	//业态数据结构定义
    //demo 数据

    init_g_data:function()
    {
    	APPLY.v_yts = new Array();
    	
    	APPLY.v_yt.id    = "";
    	APPLY.v_yt.icon  = "";
    	APPLY.v_yt.title = "";
    	APPLY.v_yt.desc  = "";
    	APPLY.v_yt.intro = "";
    	
    	APPLY.v_yt.images  = new Array();
    	
    	APPLY.v_yt.contact = "";
    	
    	APPLY.v_yt.items = new Array();
    },

	//获取函数get_
	//提交函数apply_
	//初始化函数init_
	//删除函数del_
	//添加事件add_events
	//结果函数Result_

	//@Begin初始化函数
    init_yh_input:function()
    {
    	$("#yh_icon").val("http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/yt/yt-detail/itemicons/jkzx/yh1.jpg");
    	$("#yh_title").val("探寻健康·排毒之旅套餐1");
    	$("#yh_desc").val("生命排毒3天2夜套餐");
    	$("#yt_yh_s_time").val("9:00");
    	$("#yt_yh_e_time").val("23:00");
    	
    	
    	//yh详细说明
    	var  detail = "【费用】\n" +
    				  "生命排毒3天2夜套餐：单人6500元，情侣套餐12250元 \n" +
    				  "【疗效】\n" +
    				  "促进全身十大系统的新陈代谢，将隐藏在血液、组织、骨骼中的毒素代谢排出，甚至肌肤、经脉中的残留及疤痕都一并清除，促进细胞再生，还原身体活力。\n" +
    				  "【行程】\n" +
    				  "1、第一天：TJK健康预警+细胞能量恢复（1小时）、中医经络养疗（2小时）、养生讲座、晚餐、水幕电影欣赏、入住喜来登酒店。\n"+
    				  "2、第二天：喜来登早餐、养生晨练（40分钟）、狮子湖乡村俱乐部美国PGA2小时高尔夫健康课程、泥油王排毒（2小时）、午餐、茶岛茶道互动、豪华游艇游湖、水幕电影欣赏、夜岛PARTY、晚餐、入住喜来登酒店。\n"+
    				  "3、第三天：喜来登早餐、养生晨练（40分钟）、冷疗排毒（2小时）、午餐、茶岛打坐品茗、狮子湖惬意游园拍摄、再次TJK健康检测，针对健康指标数据变化作专业建议。\n";
    	
    	$("#yh_detail").val(detail);
    	
    	
    	var tips = [];  //温馨提示
    	tips.push("如需深入了解相关优惠信息详请致电客服中心电话4009301688/0763-3631669");
    	$("#yh_tip").val(tips);
    	
    	//预约须知
    	var toknow = "1、优惠套餐各不相同，请您根据需要选择适合的优惠套餐。\n" +
    				 "2、预定时，需留下具体的到达时间、人数及联系方式等相关信息。\n" +  
    				 "3、预约者均需在指定的预约时间内预约优惠，逾期无效。\n" + 
    				 "4、结算时，持预约信息前往狮子湖健康中心支付所有费用。\n" +
    				 "5、参与者均需持有效身份证件。\n";
    	
    	
    	$("#yh_toknow").val(toknow);
    
    },

    init_yt_input:function()
    {
    	//$("#yt_icon").attr("src")
    	
    	$("#yt_title").val("狮子湖健康中心");
    	$("#yt_desc").val("Lion Lake Health Center");
    	$("#yt_intro").val("狮子湖健康中心作为世界卫生组织上海中心认定的全国首个“高端长寿基地”、中国卫生部医促会认定的“抗衰老健康基地”；中国保健营养理事会认定的“养生健康研究中心”，狮子湖健康中心配备了国际医学奖得主、中国两院院士、中国国医大师为核心的顶级学术委员会。狮子湖健康中心秉承“为您排除生命暗礁，帮您提高生命质量”的经营理念，为会员提供国际顶尖的TJK健康预警、国际尖端的超早期防癌检测、全球顶级医疗专家团队在线视频咨询、全球顶级医疗资源VIP绿色通道、国内顶级疗养大师康复服务、15种疑难病症顶级康复等高端服务，创始会员包括三十多个国家的驻华大使以及数十位国内各行业的领军人物。");
    	$("#yt_phone1").val("4009301688");
    	$("#yt_phone2").val("0763-3631669");
    	
    	//APPLY.v_dyt.ytnum = 0;
    },

	render_dyt_info:function(dyt)
    {
    	$("#dyt_title").val(dyt['title']);
		$("#dyt_desc").val(dyt['desc']);
		$("#dyt_banner").attr("src",dyt['banner']);
    },
    
    render_yts_list:function()
    {
    	$("#yt_title").val("");
    	$("#yt_desc").val("");
    	$("#yt_intro").val("");
    	$("#yt_phone1").val("");
    	$("#yt_phone2").val("");
    	
    	
    	APPLY.render_yt_list();
    },
    
    //@End初始化
	

	//@Begin获取函数
	//获取(生成)优惠id
    get_yh_actid:function()
    {
    	var id = APPLY.items.length + 1 + 10000;
    	var actid = id.toString();
    	
    	return actid;
    },

	//获取(生成业态)id
	 get_yt_id:function()
    {
		if( APPLY.v_yts == null)
		{
			return 10001;
		}
    	var id = APPLY.v_yts.length + 1 + 1000;
    	var yt_id = id.toString();
    	
    	return yt_id;
    },
    //@End获取函数


    //@Begin提交函数
	//提交业态优惠数据
    apply_yt_yh_data:function(yt_id)
    {
	    var item={};
		item.actid=APPLY.get_yh_actid();
		
		
		item.icon=$("#yh_icon").attr("src");;
		item.title=$("#yh_title").val();
		item.desc = $("#yh_desc").val();
		item.timeStart = $("#yt_yh_s_time").val();	
		item.timeEnd =  $("#yt_yh_e_time").val();
		
		
		var  yhTime = [];  // 优惠时间
		yhTime.push(item.timeStart + "-" + item.timeEnd);
		item.yhTime = yhTime;
		
		var  detail = [];		//yh详细说明
		var  details = $("#yh_detail").val();
		detail =  details.split("\n");
		item.detail = detail;
		
		
		var tips = [];  //温馨提示
		var tip = $("#yh_tip").val();    
		tips = tip.split("\n"); 
		item.tips = tips;
		
		
		var toknow = [];    //预约须知
		var toknow_s = $("#yh_toknow").val();
		toknow = toknow_s.split("\n");
	
		item.toknow=toknow;
		
		//APPLY.v_yt.itemnum++;
		
		//APPLY.items.push(item);
		
		
		for(var i = 0;i<APPLY.v_yts.length;i++)
			{
				if(APPLY.v_yts[i]['id']==yt_id)
					{
						

						if(APPLY.v_yts[i]['items'] == null)
						{
								
							APPLY.v_yts[i]['items'] = new Array();
							APPLY.v_yts[i]['items'].push(item);
								
						}
						else
						{
							APPLY.v_yts[i]['items'].push(item);
						}
						
						
					}
			}
		
		//APPLY.module.items=APPLY.items;
		
		
    },
    
	//提交业态滚动图片
    apply_yt_images:function()
    {
    	//APPLY.v_arr_yt_sc
    	
    	var image = {};
	 	image.title = $("#sc_pic_title_0").val();
	 	image.url =  $("#sc_pic_url_0").attr("src");
	 	APPLY.v_arr_yt_sc.push(image);
	
	 	image.title = $("#sc_pic_title_1").val();
	 	image.url  =  $("#sc_pic_url_1").attr("src");
	 	APPLY.v_arr_yt_sc.push(image);
 
	 	image.title = $("#sc_pic_title_2").val();
	 	image.url = $("#sc_pic_url_2").attr("src");
	 	APPLY.v_arr_yt_sc.push(image);
	 	
	 	image.title = $("#sc_pic_title_3").val();
	 	image.url = $("#sc_pic_url_3").attr("src");
	 	APPLY.v_arr_yt_sc.push(image);
	 	
	 	image.title = $("#sc_pic_title_4").val();
	 	image.url = $("#sc_pic_url_4").attr("src");
	 	APPLY.v_arr_yt_sc.push(image);
    },
    
	//提交业态数据
	apply_yt_data:function()
    {
    	var v_yt = {};
    	v_yt.id = APPLY.get_yt_id(),
    	v_yt.icon  = $("#yt_icon").attr("src"),
    	v_yt.title = $("#yt_title").val(),
    	v_yt.desc  = $("#yt_desc").val(),
    	v_yt.intro = $("#yt_intro").val();
    	
    	var phone1 = $("#yt_phone1").val();
    	var phone2 = $("#yt_phone2").val();
    	
		var contact ={};
	       var phones = [];
		   contact.timesOn="早9:00-晚23:30";
		   phones.push(phone1);
		   phones.push(phone2);
		   contact.phones = phones;
		   
		   v_yt.contact = contact;
	 
	
		   APPLY.apply_yt_images();
	
	   
		   v_yt.images = APPLY.v_arr_yt_sc;

		   v_yt.items = new Array();
	   
		   APPLY.v_yts.push(v_yt);
	   
	      //APPLY.v_dyt.ytnum++;
	
	      APPLY.clear_yt_tmp_data();
    },
	
	//@End 提交函数

 
    
	//@Begin删除函数del_
    del_yt:function(id)
    {
    	for(var i = 0;i <APPLY.v_yts.length;i++)
    		{
    			if(APPLY.v_yts[i]['id'] == id)
    				{
    					APPLY.v_yts.splice(i,1);
    					return;
    				}	
    		}
    },

	del_dyt_by_loupanid:function(id)
	{
		for(var i = 0;i <APPLY.v_arr_dyt_all_loupan.length;i++)
    		{
    			if(APPLY.v_arr_dyt_all_loupan[i]['loupanid'] == id)
    				{
    					APPLY.v_arr_dyt_all_loupan.splice(i,1);
    					return;
    				}	
    		}
	},
    //@End删除函数


	clear_yt_tmp_data:function()
	{
		  APPLY.modules =[];  //业态优惠
		  APPLY.items =[];    //优惠items
		  APPLY.v_arr_yt_sc =[]; //业态滚动图	  
		  APPLY.v_yt = {};
		  
		  //APPLY.v_yt.itemnum = 0;
	},
 
	
	//@Begin添加事件
	add_events:function(R)
	{
		 //打开open_pop_0
          R.open_pop_0 = $("#open_pop_0");
          R.open_pop_0.click(APPLY.open_pop_0);
         
          //关闭close_pop_1
          R.close_pop_0 = $("#close_pop_0");
          R.close_pop_0.click(APPLY.close_pop_0);
          
          
          //打开open_pop_1
          R.open_pop_1 = $("#open_pop_1");
          R.open_pop_1.click(APPLY.open_pop_1);
          
          
          //关闭close_pop_1
          R.close_pop_1 = $("#close_pop_1");
          R.close_pop_1.click(APPLY.close_pop_1);
          
          
          //打开open_pop_2
          R.open_pop_2 = $("#open_pop_2");
          R.open_pop_2.click(APPLY.open_pop_2);
         
          //关闭close_pop_1
          R.close_pop_2 = $("#close_pop_2");
          R.close_pop_2.click(APPLY.close_pop_2);
          
          
          //打开open_pop_3
          R.open_pop_3 = $("#open_pop_3");
          R.open_pop_3.click(APPLY.open_pop_3);
          
          
          //关闭close_pop_3
          R.close_pop_3 = $("#close_pop_3");
          R.close_pop_3.click(APPLY.close_pop_3);
          
        //打开open_pop_3
          R.open_pop_5 = $("#open_pop_5");
          R.open_pop_5.click(APPLY.open_pop_5);
          
          //关闭close_pop_5
          R.close_pop_5 = $("#close_pop_5");
          R.close_pop_5.click(APPLY.close_pop_5);
          
          //
          R.ok_add_yh_detail = $("#ok_add_yh_detail");
          R.ok_add_dyt_top_banner = $("#ok_add_dyt_top_banner");
          R.ok_add_yt_thumbnail = $("#ok_add_yt_thumbnail");
          R.ok_add_yt_scroll_banner = $("#ok_add_yt_scroll_banner");
          
          R.ok_add_yh_detail.click(APPLY.ok_add_yh_detail);
          R.ok_add_dyt_top_banner.click(APPLY.ok_add_dyt_top_banner);
          R.ok_add_yt_thumbnail.click(APPLY.ok_add_yt_thumbnail);
          R.ok_add_yt_scroll_banner.click(APPLY.ok_add_yt_scroll_banner);
          
          //
          R.sbt_add_yt = $("#sbt_add_yt");
          R.sbt_add_yt.click(APPLY.sbt_add_yt);
          
          R.sbt_add_all = $("#sbt_add_all");
          R.sbt_add_all.click(APPLY.sbt_add_all);
          
          R.sbt_save_edit = $("#sbt_save_edit");
          R.sbt_save_edit.click(APPLY.sbt_save_edit);
          
          R.sbt_edit_yt = $("#sbt_edit_yt");
          R.sbt_edit_yt.click(APPLY.sbt_edit_yt);
          
          R.sbt_save_edit_yt=$("#sbt_save_edit_yt");
          R.sbt_save_edit_yt.click(APPLY.sbt_save_edit_yt);
	},

	//@End添加事件

	
    
    sbt_save_edit_yt:function()
    {
    	//alert("edit_yt");
    },
    
   
     
    sbt_save_edit:function(){
    	//alert("sbt_save_edit");
    },
    
    sbt_add_yt:function(){
    	//alert("sbt_add_yt");
    	
    	APPLY.apply_yt_data();
    	
    	APPLY.render_yt_list();
    },

	
	//@Begin结果函数
    Result_101:function(res)
    {
		 if(res.all_dyt[0] !=null)
		 {
			 
			 APPLY.v_arr_dyt_all_loupan=res.all_dyt;
    	 
    		 APPLY.render_list_lp_dyt();
		
			 APPLY.v_dyt = APPLY.get_dyt_by_loupanid(APPLY.get_loupan_id());

			 if(APPLY.v_dyt.items !=null)
			 {
				 APPLY.v_yts = APPLY.v_dyt.items ;
			 }
			// alert(APPLY.v_dyt['loupanid']);
		 }	
    },
    //@End结果函数


	//@Begin渲染刷新函数
	//渲染楼盘列表选项
    render_list_loupan_op:function()
    {
    	//list_loupan
    	 var $obj=$("#list_loupan");
    	 
    	 var tp2='<option id={ID} name={ID}>{option_name}</option>';
         var List2 = [];
         
         for (var i = 0,
                 il = g_data.length; i < il; i++) {	
                     List2.push(FCAPP.Common.format(tp2, {
                     	ID:   g_data[i][0].toString(),
                     	option_name: g_data[i][1].toString()
                     }));
                 }
                 $obj.html(List2.join(''));
                 
    },
	
    //渲染业态列表
    render_yt_list:function()
    {
    	//alert("here");
    	var  $obj=$("#list_yt");
    
    	if(APPLY.v_yts == null)
		{
			return ;
		}
    	//list_table
     	var tpl = '<tr><td>{NAME}</td><td>{NAME_EN}</td><td><a onclick="APPLY.OP(this.name,this.id)" name="yt_del" id={ID}  class="blue" href="#none">删除</a><a onclick="APPLY.OP(this.name,this.id)" name="add_yh" id={ID}  class="blue" href="#none">添加优惠</a></td></tr>',
        List = [];
        for (var i = 0,
        il = APPLY.v_yts.length; i < il; i++) {
        
    
            List.push(FCAPP.Common.format(tpl, {
                NAME:    APPLY.v_yts[i]['title'],
                NAME_EN: APPLY.v_yts[i]['desc'],
                ID:      APPLY.v_yts[i]['id']
            }));
            
        }
        $obj.html(List.join(''));  
        
        

    },
    
    //@End渲染刷新函数


  
    //@Begin编辑删除等操作
    OP:function(name,id)
    {
    	
    	if(name=="add_yh")
    		{
    		    //APPLY.dyt = APPLY.get_dyt_by_loupanid(id);
    		    //APPLY.v_yts =APPLY.dyt.items;
    			//alert(id);
    			APPLY.open_pop_0(id);
    			
    			return;
    		}
        if(name == "yt_del")
        	{
        		APPLY.del_yt(id);
        		APPLY.render_yt_list();
        		return;
        	}
        
        
        if(name=="dyt_edit")
        	{
        		
        		APPLY.edit_dyt(id);
        		return;
        	}
        
        if(name=="yt_add")
        	{
        	    APPLY.v_dyt = APPLY.get_dyt_by_loupanid(id);

				if(APPLY.v_dyt.items != null)
				{
					
					 APPLY.v_yts = APPLY.v_dyt.items;
				}
        	   

        		APPLY.open_pop_5(id);

        		return;
        	}

		if(name == "dyt_delete")
		{
		 var C = APPLY.CONFIG;
		
		 var data = {};

		 data.cmd=103;

         data.loupanid=APPLY.get_loupan_id();

		 //data.dyt=APPLY.get_dyt_by_loupanid();

         data.callback = 'Result_103';

         window.Result_103 = APPLY.Result_103;
 		
       
         $.post(C.Server,data,APPLY.Result_103,'json');
			return ;
		}

		if(name == "del_yh")
		{
			
			var obj = document.getElementById("ok_add_yh_detail");
			
			APPLY.del_yh_by_id(obj.name,id);

			APPLY.render_yh_list(obj.name);
		}
      
    },
    //@End编辑删除等操作

	
	del_yh_by_id:function(yt_id,yh_id)
	{
		
		var idx = APPLY.get_yt_idx_byid(yt_id);

		for(var i = 0;i < APPLY.v_yts[idx].items.length;i++)
		{
			if( APPLY.v_yts[idx].items[i]['actid'] == yh_id)
			{
				

				APPLY.v_yts[idx].items.splice(i,1);
			}
		}
	},
  
	
    
    edit_dyt:function(loupanid)
    {
    	APPLY.v_dyt = APPLY.get_dyt_by_loupanid(loupanid);
    	
    	APPLY.render_dyt_info(APPLY.v_dyt);
    	
    	APPLY.render_yts_list();
    },
    
    get_dyt_by_loupanid:function(id)
    {
    	for(var i = 0;i<APPLY.v_arr_dyt_all_loupan.length;i++)
    		{
    			if(id ==APPLY.v_arr_dyt_all_loupan[i]['loupanid'] )
    				{
					
    					return APPLY.v_arr_dyt_all_loupan[i];
    				}
    		}
    },
    
    add_yt_to_yt_arr:function(yt){
    	
    
    },
    
    get_loupan_id:function()
    {
    	var obj = document.getElementById("list_loupan"); //selectid

        var index = obj.selectedIndex; // 选中索引

        var text = obj.options[index].text; // 选中文本

        var id = obj.options[index].id; // 选中值
        
        return id;
    },
    //modules.items[n]  -- item
    //bgImg -- bgImg
    
	
	init_dyt_input:function()
	{
		$("#dyt_title").val("狮子湖浪漫生活");
		$("#dyt_desc").val("7年的倾力打造，狮子湖成就了南中国休闲生活的新地标，囊括超五星级酒店、国际锦标级高尔夫、高端别墅、商务休闲、健康休闲等板块，国际学校、温泉度假区、生活配套区现已全面启动，另规划中的温泉度假中心和被广东省列为省重点工程的五千年文化博览园也在筹建中，狮子湖，国际顶级浩瀚配套，豪迈气概领航中国。");
		//$("#dyt_banner").attr("src","http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/yt/yt-list/banner.jpg");
	},
	
	exist_loupan:function(id)
	{
		for(var i= 0 ;i<APPLY.v_arr_dyt_all_loupan.length; i++)
		{
			//存在楼盘id的
			if(APPLY.v_arr_dyt_all_loupan[i]['loupanid'] == id)
				{	
					return true;
				}
		}
		
		return false;
	},
    sbt_add_all:function(){
    	
    	

    	 APPLY.v_dyt.loupanid = APPLY.get_loupan_id();
    	 
    	 
    	 APPLY.v_dyt.lounpanname = $("#list_loupan").val();
    	 APPLY.v_dyt.date="2013-10-01";	 
    	 APPLY.v_dyt.bgImg = "http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/yt/bg.jpg";
     	 APPLY.v_dyt.title = $("#dyt_title").val();
     	 APPLY.v_dyt.desc  = $("#dyt_desc").val(); //"7年的倾力打造，狮子湖成就了南中国休闲生活的新地标，囊括超五星级酒店、国际锦标级高尔夫、高端别墅、商务休闲、健康休闲等板块，国际学校、温泉度假区、生活配套区现已全面启动，另规划中的温泉度假中心和被广东省列为省重点工程的五千年文化博览园也在筹建中，狮子湖，国际顶级浩瀚配套，豪迈气概领航中国。";
     	 APPLY.v_dyt.banner = $("#dyt_banner").attr("src");//"http://imgcache.gtimg.cn/lifestyle/app/wx_house/images/yt/yt-list/banner.jpg";
 		
		
     	 APPLY.v_dyt.items = APPLY.v_yts;
     	 
	
     	
    	 //APPLY.apply_yt_data();
    	// APPLY.init_dyt();
    	//add to DB  v_dyt
		
     	 var data = {};
		 if(APPLY.v_dyt.items.length == 0)
		{
			APPLY.v_dyt.itemnum = 0;
		}else
		{
			APPLY.v_dyt.itemnum = APPLY.v_dyt.items.length;
		}
		
     	 if(APPLY.exist_loupan(APPLY.v_dyt.loupanid))
     		 {
     		    data.cmd = 102;
     		 }
     	 else
     		 {
     	    	//APPLY.add_loupan_dyt(APPLY.v_dyt);
     		    data.cmd = 100;
     		 }
     	 	
     	 
    	 var C = APPLY.CONFIG;
		

         data.v_dyt=APPLY.v_dyt;

         data.callback = 'Result_100';

         window.Result_100 = APPLY.Result_100;
 		
         /*
         $.ajax({
        	 type: 'POST',
        	 url: C.Server + '?' + $.param(data),
            // url: C.Static ,
             dataType: 'jsonp'
 	
         });*/
         
         $.post(C.Server,data,APPLY.Result_100,'json');
    },
    Result_100:function(){
    	
    	alert("保存成功");
    	
		APPLY.add_loupan_dyt(APPLY.v_dyt);

		APPLY.render_list_lp_dyt();

    	//
    	//APPLY.v_dyt.ytnum = 0;
    },
	
	 Result_103:function(res){
    	
    	alert("Result_103");
    	
		APPLY.del_dyt_by_loupanid(res.id);

    	APPLY.render_list_lp_dyt();
    	
	
    	//
    	//APPLY.v_dyt.ytnum = 0;
    },
    
    render_list_lp_dyt:function(){
    	var  $obj=$("#list_lp_dyt");
    	  
    	//list_table
     	var tpl = '<tr><td>{ID}</td><td>{NAME}</td><td>{DATE}</td><td>待审核</td><td><a onclick="APPLY.OP(this.name,this.id)" name="dyt_edit" id={ID}  class="blue" href="#none">编辑</a><a onclick="APPLY.OP(this.name,this.id)" name="dyt_delete" id={ID}  class="blue" href="#none">删除</a><a onclick="APPLY.OP(this.name,this.id)" name="yt_add" id={ID}  class="blue" href="#none">添加业态</a></td></tr>',
        List = [];
        for (var i = 0,

		
        il = APPLY.v_arr_dyt_all_loupan.length; i < il; i++) {
        	
            List.push(FCAPP.Common.format(tpl, {
                ID:     APPLY.v_arr_dyt_all_loupan[i]['loupanid'],
                NAME:   APPLY.v_arr_dyt_all_loupan[i]['lounpanname'],
                DATE:   APPLY.v_arr_dyt_all_loupan[i]['date']
            }));
        }
        $obj.html(List.join(''));
    },
    
    add_loupan_dyt:function(dyt){
    	
    	for(var i= 0 ;i<APPLY.v_arr_dyt_all_loupan.length; i++)
    		{
    			//存在楼盘id的
    			if(APPLY.v_arr_dyt_all_loupan[i]['loupanid'] == dyt['loupanid'])
    				{
    					return;
    				}
    		}

		APPLY.v_arr_dyt_all_loupan[APPLY.v_arr_dyt_all_loupan.length] = dyt;


    	//APPLY.v_arr_dyt_all_loupan.push(dyt);
    	
    	//APPLY.v_dyt = {};
    },
    
    ok_add_yh_detail:function(){
    
    	var obj = document.getElementById("ok_add_yh_detail");
    	
    	APPLY.apply_yt_yh_data(obj.name);
    	
    	APPLY.render_yh_list(obj.name);
    	
    },
    
    get_yt_byid:function(yt_id)
    {
    	for(var i = 0 ;i<APPLY.v_yts.length;i++)
    		{
    			if(yt_id == APPLY.v_yts[i]['id'])
    				{
					
    					return APPLY.v_yts[i];
    				}
    		}
    },
    
	 get_yt_idx_byid:function(yt_id)
    {
    	for(var i = 0 ;i<APPLY.v_yts.length;i++)
    		{
    			if(yt_id == APPLY.v_yts[i]['id'])
    				{
					
    					return i;
    				}
    		}
    },
    render_yh_list:function(yt_id)
    {
    	var v_yt = {};
		v_yt = APPLY.get_yt_byid(yt_id);
    	
    	//APPLY.v_yts
    	
    	if(v_yt.items == null){
		
    		return;
    	}
    		
    	var  $obj=$("#yt_yh_list");
  
    	//list_table
     	var tpl = '<tr><td>{NAME}</td><td><a name="edit" id={ID}  class="blue" href="#none">编辑</a><a onclick="APPLY.OP(this.name,this.id)" name="del_yh" id={ID}  class="blue" href="#none">删除</a></td></tr>',
        List = [];
     	
        for (var i = 0,
        il =  v_yt.items.length; i < il; i++) {
        	
            List.push(FCAPP.Common.format(tpl, {
                NAME:   v_yt.items[i]['title'],
				ID:		v_yt.items[i]['actid']
            }));
        }
        $obj.html(List.join(''));  
    	
    },
    
    ok_add_dyt_top_banner:function(){
    	//upload pic
    	//回调设置图片
    	
    //	alert("ok_add_dyt_top_banner");
    	
    	
    },
    
    ok_add_yt_thumbnail:function(){
    	//upload pic
    	//回调设置图片
    	
    	alert("ok_add_yt_thumbnail");
    },
    
    ok_add_yt_scroll_banner:function(){
    	//v_arr_yt_sc
    	apply_yt_images();
    	alert("添加ok");
    },
    
    open_pop_0:function(id){
    	var obj = document.getElementById("pop_box_0");
    	obj.style.visibility="visible";
    	obj.style.postion="absolute";
    	
    	obj.style.display='block';
        //根据实际窗口定位弹出层
               var offsetX = Math.ceil((window.screen.availWidth - 425)/2) - 50-100;  
               obj.style.left = offsetX + 'px';
               var scrollTop = (document.body.scrollTop > 0)?document.body.scrollTop:document.documentElement.scrollTop;
               var offsetY = scrollTop + Math.ceil((window.screen.availHeight - 400)/2) - 50 -1200;
               obj.style.top = offsetY + 'px';
               
               
    	//obj.style.left="50%";
    	//obj.style.top="-20%";
    	obj.style.marginTop="0px";
    	
    	obj.style.marginLeft="-300px";	
    	
    	//obj.style.marginTop="-500px";
    	obj.style.marginLeft="-300px";
    	
    	var box0 = new _Dragdrop();
    	box0.registerDragdropHandler("box_banner_0","pop_box_0");
    	
    	
    	obj = document.getElementById("ok_add_yh_detail");
    	obj.name=id;
    	
    	APPLY.render_yh_list(id);
    },
    
    open_pop_5:function(id){
    	var obj = document.getElementById("pop_box_5");
    	obj.style.visibility="visible";
    	obj.style.postion="fixed";
    	
    	obj.style.left="50%";
    	//obj.style.top="50%";
    	obj.style.marginTop="-700px";
    	obj.style.marginLeft="-300px";	
    	
    	
    	
    	var box0 = new _Dragdrop();
    	box0.registerDragdropHandler("box_banner_5","pop_box_5");
    	
    	//obj = document.getElementById("ok_add_yh_detail");
    	
    	//obj.name=id;
    	
    	//APPLY.render_yh_list(id);
    	
    	APPLY.render_yt_list();
    },
    
    open_pop_1:function(){
    	var obj = document.getElementById("pop_box_1");
    	obj.style.visibility="visible";
    	
    	obj.style.left="50%";
    	obj.style.top="50%";
    	obj.style.postion="fixed";
    	obj.style.marginTop="-1300px";
    	obj.style.marginLeft="-300px";
    	
    	
    	var box1 = new _Dragdrop();
    	box1.registerDragdropHandler("box_banner_1","pop_box_1");
    },
    
    open_pop_2:function(){
    	var obj = document.getElementById("pop_box_2");
    	obj.style.visibility="visible";
    	
    	obj.style.left="50%";
    	obj.style.top="50%";
    	obj.style.postion="fixed";
    	obj.style.marginTop="-1300px";
    	obj.style.marginLeft="-300px";
    	
    	
    	var box2 = new _Dragdrop();
    	box2.registerDragdropHandler("box_banner_2","pop_box_2");
    },
    open_pop_3:function(){
    	var obj = document.getElementById("pop_box_3");
    	obj.style.visibility="visible";
    	
    	obj.style.left="50%";
    	obj.style.top="50%";
    	obj.style.postion="fixed";
    	obj.style.marginTop="-1300px";
    	obj.style.marginLeft="-300px";
    	
    	
    	var box3 = new _Dragdrop();
    	box3.registerDragdropHandler("box_banner_3","pop_box_3");
    },
    
    close_pop_0:function(){
    	var obj = document.getElementById("pop_box_0");
    	obj.style.visibility="hidden";
    },
    
    close_pop_1:function(){
    	var obj = document.getElementById("pop_box_1");
    	obj.style.visibility="hidden";
    },
    
    close_pop_2:function(){
    	var obj = document.getElementById("pop_box_2");
    	obj.style.visibility="hidden";
    },
    
    close_pop_3:function(){
    	var obj = document.getElementById("pop_box_3");
    	obj.style.visibility="hidden";
    },
  
    close_pop_5:function(){
    	var obj = document.getElementById("pop_box_5");
    	obj.style.visibility="hidden";
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