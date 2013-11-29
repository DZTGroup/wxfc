var FCAPP = FCAPP || {};
FCAPP.APPLY = {
    CONFIG: {
        Server: 'php/admin_rooms.php'  
    },
    RUNTIME: {},
    
      g_hx:[],
    
    init: function() {
        var R = APPLY.RUNTIME,
        C = APPLY.CONFIG;
    
        APPLY.loadInfo();
       
    },

    loadInfo: function() {
        var R = APPLY.RUNTIME;
       
		  APPLY.g_hximgnum=0;
		  APPLY.g_hx = [];
		  //
		  APPLY.f_RenderLpList();
		  APPLY.f_Load();
		  
    },
	
	/*
		 楼盘户型数据
		 g_loupanid
		 g_hx[m][n]
		 ------------------ 
		 g_hx[m][0] = 户型id
		 g_hx[m][1] = 户型名
		 g_hx[m][2] = 户型描述
		 g_hx[m][3] = 户型
		 g_hx[m][4] = 楼层
		 g_hx[m][5] = 建筑面积
		 g_hx[m][6] = 套内面积
		 g_hx[m][7] = 详细信息
		 g_hx[m][8] = 户型整体效果图连接
		 
		 g_hx[m][9] = 户型局部图列表   array  struct{ 图片名，图片连接} 
		 g_hx[m][10] = 360全景首页背景图
		 g_hx[m][11] = 360全景列表    struct{ 全景名称，全景链接} 
	*/

	/* interface:
	   f_RenderLpList()      		  //填充楼盘选择列表
	   f_RenderHxList()     	  //绘制户型列表
	   f_RenderHxImgList(HxImgList)   //绘制户型局部图列表
       f_ShowHxInfo(hxid)    		  //显示hx信息，hxid为0表示新添加，否则为编辑
	   f_EditHx(hxid)                 //编辑户型
	   f_Save(hxid)                   //保存户型,hxid为0 则是新添加，否则为编辑保存
	   f_DeleteHx(hxid)               //删除户型
	   f_Load(loupid)				  //加载楼盘户型信息
	   
	   f_AddHxImg()				  	  //添加户型图片
	   f_AddHx360()                   //添加户型360全景信息
	   f_DeleteHxImg(ImgName)		  //删除户型图片
	   f_DeleteHx360(Hx360Name)		  //删除户型360		

	   OnSelectHximg(value)           //选择户型图片
	   f_GetNewHxID()                 //生成新的户型ID
	   f_SaveToDB()					  //存储到db
	   
	   f_UploadHxzt()
	*/
	 
	 f_UploadHxzt:function()
	 {
		 var ImgName="hxzt.jpg";

		 var e = document.getElementById("hxzt");
		 
		 e.action = "php/uploadfile3.php?id=v8&loupanid=" + APPLY.g_loupanid + "&name=" + ImgName;
		
		 e.submit();
	 },
	 
	 f_UploadHxjb:function()
	 {
		 var ImgName="hxjb_" + APPLY.g_hximgnum + ".jpg";

		 var e = document.getElementById("hxjb");
		 
		 e.action = "php/uploadfile3.php?id=v9_1&loupanid=" + APPLY.g_loupanid + "&name=" + ImgName;
		
		 e.submit();
	 },
	 
	 f_Upload360bj:function()
	 {
		 var ImgName="360bj.jpg";

		 var e = document.getElementById("360bj");
		 
		 e.action = "php/uploadfile3.php?id=v10&loupanid=" + APPLY.g_loupanid + "&name=" + ImgName;
		
		 e.submit();
	 },
	 
	 f_GetNewHxID:function()
	 {
		 var newhxid = 1000 + APPLY.g_hx.length;
		 return newhxid;
	 },
	 
	 f_get_loupan_id:function()
    {
    	var obj = document.getElementById("list_loupan"); //selectid

        var index = obj.selectedIndex; // 选中索引

        var text = obj.options[index].text; // 选中文本

        var id = obj.options[index].id; // 选中值
        
        return id;
    },
	
	f_Load:function()
	{
		APPLY.g_loupanid = APPLY.f_get_loupan_id();
		 
		var C = APPLY.CONFIG;
		var data = {};
		data.loupanid = APPLY.g_loupanid;
		data.cmd=4;
		$.post(C.Server,data,APPLY.f_LoadResult,'json');	 
	},
	
	f_LoadResult:function(res)
	{	
	    if(res.hxlist != null)
		{
			 APPLY.g_hx=res.hxlist;
		}
		APPLY.f_RenderHxList();
	},
	
	//填充楼盘列表
	f_RenderLpList:function()
	{
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
				 
				 
	  APPLY.g_loupanid = APPLY.f_get_loupan_id();
				 
				 
	},
	
	
			
	f_RenderHxList:function()
	{
		var  $obj=$("#list_hx");
	
     	var tpl = '<tr><td>{HXID}</td><td>{LOUPANID}</td><td>{HXNAME}</td><td>待审核</td><td><a onclick="APPLY.f_EditHx(this.id)" name="" id={HXID}  class="blue" href="#none">编辑</a><a onclick="APPLY.f_DeleteHx(this.id)" name="" id={HXID}  class="blue" href="#none">删除</a><a name="" id={HXID} class="blue" href={VIEWPATH}>预览</a></td></tr>',
        List = [];
        for (var i = 0,
        il = APPLY.g_hx.length; i < il; i++) {
        
            List.push(FCAPP.Common.format(tpl, {
                HXID:     APPLY.g_hx[i][0].toString(),
                LOUPANID: APPLY.g_loupanid.toString(),
                HXNAME:   APPLY.g_hx[i][1].toString(),
				VIEWPATH: g_TestPath + "houseview.html?loupanid=" + APPLY.g_loupanid
            }));
            
        }
        $obj.html(List.join(''));  
	},

	f_RenderHxImgList:function(HxImglist)
	{
		var  $obj=$("#list_hx_imgs");
		
     	var tpl = '<tr id={NAME}><td>{NAME}</td><td><img src={URL} width="60"/></td><td>{URL}</td><td><a onclick="APPLY.f_DeleteHxImg(this.name)" name={NAME}   class="blue" href="#none">删除</a></td></tr>',
        List = [];
        for (var i = 0,
        il = HxImglist.length; i < il; i++) {
        
            List.push(FCAPP.Common.format(tpl, {
                NAME:     HxImglist[i][0],
                URL:      HxImglist[i][1]
            }));
            
        }
        $obj.html(List.join(''));  
	},
	
	f_RenderHx360List:function(Hx360List)
	{
	    var  $obj=$("#list_360");
		
     	var tpl = '<tr id={NAME}><td>{NAME}</td><td>{URL}</td><td><a onclick="APPLY.f_DeleteHx360(this.name)" name={NAME}  class="blue" href="#none">删除</a></td></tr>',
        List = [];
        for (var i = 0,
        il = Hx360List.length; i < il; i++) {
        
            List.push(FCAPP.Common.format(tpl, {
                NAME:     Hx360List[i][0],
                URL:      Hx360List[i][1]
            }));
            
        }
        $obj.html(List.join('')); 
	},
	
	f_ShowHxInfo:function(hxid)
	{
		//新添加户型
		if(0 == hxid)
		{
			$("#v1").val("");
			$("#v2").val("");
			$("#v3").val("");
			$("#v4").val("");
			$("#v5").val("");
			$("#v6").val("");
			$("#v7").val("");
			$("#v8").val("");
			$("#v9_0").val("");$("#v9_1").val("");
			$("#v10").val("");
			$("#v11_0").val(""); $("#v11_1").val("");
			
			//Hx_detail
			
		}
		//编辑户型
		else
		{
		    //alert(hxid);
		    for(var i =0 ;i<APPLY.g_hx.length;i++)
			{
				if(APPLY.g_hx[i][0] == hxid)
				{
					$("#v1").val(APPLY.g_hx[i][1]);
				    $("#v2").val(APPLY.g_hx[i][2]);
					$("#v3").val(APPLY.g_hx[i][3]);
					$("#v4").val(APPLY.g_hx[i][4]);
					$("#v5").val(APPLY.g_hx[i][5]);
					$("#v6").val(APPLY.g_hx[i][6]);
					$("#v7").val(APPLY.g_hx[i][7]);
					$("#v8").val(APPLY.g_hx[i][8]);
					$("#v10").val(APPLY.g_hx[i][10]);
					$("#v9_0").val("");$("#v9_1").val("");
					APPLY.f_RenderHxImgList(APPLY.g_hx[i][9]);
					$("#v11_0").val(""); $("#v11_1").val("");
					APPLY.f_RenderHx360List(APPLY.g_hx[i][11]);
				}
			}
			
			
			
		}
		var obj = document.getElementById("Hx_detail");
			obj.style.visibility="visible";
			
		
		$("#save_all").attr("name",hxid);
		
	},
	
	f_EditHx:function(hxid)
	{
		APPLY.f_ShowHxInfo(hxid);
	},
	
	f_Save:function(hxid)
	{
		if("" == $("#v1").val())
			{
				alert("户型名不能为空");
				return;
			}
			
			if("" == $("#v2").val())
			{
				alert("户型描述不能为空");
				return;
			}
			
			if("" == $("#v3").val())
			{
				alert("几房几厅不能为空");
				return;
			}
			
			if("" == $("#v4").val())
			{
				alert("楼层不能为空");
				return;
			}
			
			if("" == $("#v5").val())
			{
				alert("建筑面积不能为空");
				return;
			}
			
			if("" == $("#v6").val())
			{
				alert("套内面积不能为空");
				return;
			}
			
			if("" == $("#v7").val())
			{
				alert("详细信息不能为空");
				return;
			}
			
			if("" == $("#v8").attr("src"))
			{
				alert("请选择并上传户型整体效果图");
				return;
			}
			
			
		//新添加户型保存
		if(0 == hxid)
		{
			var hx_detail = [];
			hx_detail[0] = APPLY.f_GetNewHxID();
			hx_detail[1] = $("#v1").val();
			hx_detail[2] = $("#v2").val();
			hx_detail[3] = $("#v3").val();
			hx_detail[4] = $("#v4").val();
			hx_detail[5] = $("#v5").val();
			hx_detail[6] = $("#v6").val();
			hx_detail[7] = $("#v7").val();
			hx_detail[8] = $("#v8").val();
			hx_detail[10] = $("#v10").val();
			
			//户型局部图列表
			var hximgTobody=document.getElementById("list_hx_imgs");
			var rows = hximgTobody.rows;
			var Hximg = [];
			hx_detail[9] = [];
			for(var i = 0;i<rows.length;i++)
			{
				Hximg[0] = rows[i].cells[0].textContent;
				Hximg[1] = rows[i].cells[2].textContent;
				
				hx_detail[9].push(Hximg);
				
			}
			//360列表
			var hx360Tobody=document.getElementById("list_360");
			rows = hx360Tobody.rows;
			var Hx360 = [];
			hx_detail[11] = [];
			for(var i = 0;i<rows.length;i++)
			{
				Hx360[0] = rows[i].cells[0].textContent;
				Hx360[1] = rows[i].cells[1].textContent;
				
				hx_detail[11].push(Hx360);
				
			}
			
			APPLY.g_hx.push(hx_detail);
			
			APPLY.f_SaveToDB(0);
		}
		//编辑户型保存
		else
		{
			for(var i = 0 ;i<APPLY.g_hx.length;i++)
			{
				if(APPLY.g_hx[i][0] == hxid)
				{
				    APPLY.g_hx[i][1] = $("#v1").val();
					APPLY.g_hx[i][2] = $("#v2").val();
					APPLY.g_hx[i][3] = $("#v3").val();
					APPLY.g_hx[i][4] = $("#v4").val();
					APPLY.g_hx[i][5] = $("#v5").val();
					APPLY.g_hx[i][6] = $("#v6").val();
					APPLY.g_hx[i][7] = $("#v7").val();
					APPLY.g_hx[i][8] = $("#v8").val();
					APPLY.g_hx[i][10] = $("#v10").val();
					
					APPLY.g_hx[i][9] = [];
					APPLY.g_hx[i][11] = [];
					//户型局部图列表
					var hximgTobody=document.getElementById("list_hx_imgs");
					var rows = hximgTobody.rows;
					var Hximg = [];
					for(var i = 0;i<rows.length;i++)
					{
						Hximg[0] = rows[i].cells[0].textContent;
						Hximg[1] = rows[i].cells[2].textContent;
					
						APPLY.g_hx[i][9].push(Hximg);
					
					}
					
					//360列表
					var hx360Tobody=document.getElementById("list_360");
					rows = hx360Tobody.rows;
					var Hx360 = [];
					for(var i = 0;i<rows.length;i++)
					{
						Hx360[0] = rows[i].cells[0].textContent;
						Hx360[1] = rows[i].cells[1].textContent;
						
						APPLY.g_hx[i][11].push(Hx360);
						
					}
					
				}
			}
			
			APPLY.f_SaveToDB(1);
		}
		
		APPLY.f_RenderHxList();
	},
	
	f_DeleteHx:function(hxid)
	{
		if(hxid <= 0)
		{
			return;
		}
		
		for(var i = 0 ;i<APPLY.g_hx.length;i++)
			{
				if(APPLY.g_hx[i][0] == hxid)
				{
					if(i == APPLY.g_hx.length - 1)
					{
						APPLY.g_hx[i] = [];
					}
					else
					{
						for(var n = i;n<APPLY.g_hx.length-1;n++)
						{
							APPLY.g_hx[n] = APPLY.g_hx[n+1];
						}
						APPLY.g_hx[n] = [];
					}
					
					APPLY.g_hx.length -= 1;
				}
			}
		
		APPLY.f_SaveToDB(2);
		
	},
	
	f_AddHxImg:function()
	{
		//$("#v9_0").val("");$("#v9_1").val("");
		
		if("" == $("#v9_0").val() )
		   {
			   alert("图片名不能为空");
			   return;
		   }
		   
		if("" == $("#v9_1").attr("src") )
		   {
			   alert("请选择图片");
			   return;
		   }
		   
		var HxImgTobody = document.getElementById("list_hx_imgs");
		
		var Name = "户型图_" + $("#v9_0").val();
		var Url = $("#v9_1").attr("src");
		
		var tr=document.createElement("TR");
		tr.id=Name;
		
		var td0=document.createElement("TD");
		td0.innerText=Name;
		tr.appendChild(td0);
		
		var td1=document.createElement("TD");
		td1.innerHTML ='<img src="'+Url+'" width="60"/>';
		tr.appendChild(td1);
	
		var td2=document.createElement("TD");
		td2.innerText = Url;
		tr.appendChild(td2);
		
		var td3=document.createElement("TD");
		td3.innerHTML = '<a onclick="APPLY.f_DeleteHxImg(this.name)" name="'+Name+'" class="blue" href="#none">删除</a>'
		tr.appendChild(td3);
		
		HxImgTobody.appendChild(tr);
		
		APPLY.g_hximgnum +=1;
		
		//var $Line = $("#list_hx_imgs");
		//var tpl = '<tr id={NAME}><td>{NAME}</td><td><img src={URL} width="60"/></td><td>{URL}</td><td><a onclick="APPLY.f_DeleteHxImg(this.name)" name={NAME} class="blue" href="#none">删除</a></td></tr>',
		//List = [];
  
        
       // List.push(FCAPP.Common.format(tpl, {
       //          NAME:     "户型图_" + $("#v9_0").val(),
       //          URL:      $("#v9_1").attr("src")
       //     }));
            
       // $Line.html(List.join(''));  
		   
	},
	
	f_AddHx360:function()
	{
		 if("" == $("#v11_0").val() )
		   {
			   alert("全景名不能为空");
			   return;
		   }
		   
		if("" == $("#v11_1").val() )
		   {
			   alert("全景链接不能为空");
			   return;
		   }
		   
		   
		   var HxImgTobody = document.getElementById("list_360");
		
		var Name = "360_" + $("#v11_0").val();
		var Url = $("#v11_1").val();
		
		var tr=document.createElement("TR");
		tr.id=Name;
		
		var td0=document.createElement("TD");
		td0.innerText=Name;
		tr.appendChild(td0);
		
		var td1=document.createElement("TD");
		td1.innerText = Url;
		tr.appendChild(td1);
		
		var td2=document.createElement("TD");
		td2.innerHTML = '<a onclick="APPLY.f_DeleteHx360(this.name)" name="'+Name+'" class="blue" href="#none">删除</a>'
		tr.appendChild(td2);
		
		HxImgTobody.appendChild(tr);
		
		
		//var $Line = $("#list_360");
		//var tpl = '<tr id="360{NAME}"><td>{NAME}</td><td>{URL}</td><td><a onclick="APPLY.f_DeleteHx360(this.name)" name="360{NAME}" class="blue" href="#none">删除</a></td></tr>',
		//List = [];
  
       // List.push(FCAPP.Common.format(tpl, {
        //         NAME:     $("#v11_0").val(),
        //         URL:      $("#v11_1").val()
        //    }));
            
        //$Line.html(List.join(''));  
	},
	
	f_DeleteHxImg:function(ImgID)
	{
		alert(ImgID.toString());
		var parent=document.getElementById("list_hx_imgs");
		var child=document.getElementById(ImgID);
		parent.removeChild(child);
		
		APPLY.g_hximgnum -=1;
	},
	
	f_DeleteHx360:function(Hx360ID)
	{	
		var parent=document.getElementById("list_360");
		var child=document.getElementById(Hx360ID);
		parent.removeChild(child);
	},
	
	OnSelectHximg:function(localurl)
	{
		$("#v9_1").attr("src",localurl);
		
	},
	
	f_SaveToDB:function(cmd)
	{
	     var C = APPLY.CONFIG;
		 var data = {};
		 data.g_hx = APPLY.g_hx;
		 data.loupanid = APPLY.g_loupanid;
		 data.cmd=cmd;
		 $.post(C.Server,data,APPLY.f_SaveResult,'json');
	},
	
	
	f_SaveResult:function(res)
	{
		
		if("0" == res.cmd)
		{
			alert("保存成功");
		}
    	
    	if("1" == res.cmd)
		{
			alert("修改成功");
		}
		
		if("2" == res.cmd)
		{
			alert("删除成功");
		}
		
		APPLY.f_RenderHxList();

	}
    /////////////////////////////////////////////////////////////////////////////////////////////below////////////////////////////////////////////////////////////////////////////////////////////////
	//@Begin初始化函数
    

};
var APPLY = FCAPP.APPLY;
$(document).ready(APPLY.init);
