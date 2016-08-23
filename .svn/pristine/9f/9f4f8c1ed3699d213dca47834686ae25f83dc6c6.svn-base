/*
 * 班级列表
 * */
define(['Tool','component','text!/tpl/sell-after/class-list.html'],function(Tool,component,classList){
    var urlParam = Tool.getUrlParam();
    //参数
    var Params = {
        limit : 10,
        page : urlParam.page||0,
        searchCategory : decodeURIComponent(urlParam.searchCategory||"班级名称"),
        search : decodeURIComponent(urlParam.search||"")
    }
    console.log(Params);
    var init = {
        default : function(){
            init.base();
            //获取班级列表
            init.getClassList();
        },
        base : function(){
            //位置信息
            Tool.location([{
                class : "",
                href : "javascript:void(0)",
                text : "售后管理" 
            },{ 
                class : "hover",
                href : "./school-device.html",
                text : "校园新风"
            },{
                class : "hover",
                href : "./school-manage.html",
                text : "学校管理"
            },{
                class : "",
                href : "javascript:void(0)",
                text : "班级列表"
            }]);
            //搜索
            Tool.search({
                val : Params.search,
                select : true,  
                option : [{
                    text : "班级名称", 
                    placeholder : "请输入班级名称查询",
                    class : Params.searchCategory=="班级名称"?"selected":""
                },{
                    text : "设备Sn",
                    placeholder : "请输入设备Sn查询",
                    class : Params.searchCategory=="设备Sn"?"selected":""
                },{
                    text : "滤网Sn",
                    placeholder : "请输入滤网Sn查询",
                    class : Params.searchCategory=="滤网Sn"?"selected":""
                }],
                optionDefault : Params.searchCategory
            },{
                //提交搜索
                submitSearch : function(val,info){
                    Params.search=val;
                    Params.page=0;
                    Params.searchCategory=info.optionDefault;
                    //改变链接值
                    Tool.changeUrlVal([
                        {name:"search",val:val},
                        {name:"page",val:""},
                        {name:"searchCategory",val:info.optionDefault}
                    ]);
                    //获取班级列表
                    init.getClassList();
                }
            });
        },
        //获取班级列表
        getClassList : function(){
            var data = {
                schoolId : urlParam.schoolId,
                page : Params.page,
                limit : Params.limit
            };
            //获取搜索类型和值
            var searchParam = init.searchParam()
            $.extend(data,init.searchParam());
            // console.log(data);
            //添加正在加载中...
            Tool.createLoadding();
            $.ajax({
                url :API.schoolClassListDevice,
                type:"POST",
                data : data,
                success : function(resp){
                    console.log(resp,"成功");
                    if(resp.code==0){
                        if(resp.data&&resp.data.length){
                            //信息整理
                            init.infoNeaten(resp.data);
                            //页码
                            init.page(resp.info);
                        }else{
                            //没有结果
                            init.nothingInfo(Params.search);
                        }
                    }else{
                        //没有结果
                        init.nothingInfo(resp.msg,"question");
                    }
                },
                error: function(resp){
                    console.log(resp,'失败')
                }
            });
        },
        //信息整理
        infoNeaten : function(resp){
            for(var i=0;i<resp.length;i++){
                resp[i].tools = {
                    look : "查看详情"
                };
            }
            //表格信息
            console.log(resp);
            //表格信息
            init.infoTable(resp);
        },
        //没有结果 
        nothingInfo : function(searchVal,status){
            $(".info-table-box").html('');
            //无结果
            Tool.nothing({
                searchVal:!status&&(searchVal||""),
                question : status=="question"?searchVal:""
            });
        },
        //表格信息
        infoTable : function(dataList){
            $(".info-table-box").html(classList);
            // 创建表格信息
            new Vue({
                el: '.info-table',
                data : {
                    page : Params.page*Params.limit,
                    titles : [ 
                        { text : "序号"},
                        { text : "年级"},
                        { text : "班级名称"},
                        { text : "设备类型"},
                        { text : "设备sn"},
                        { text : "滤网sn"}, 
                        { text : "操作"},
                    ],
                    dataList : dataList
                },
                methods : {
                    //状态改变
                    statueChange : function(tool){
                        $.ajax({
                            url : API.lockUser,
                            type : "POST",
                            data : {
                                userId : tool.webUserView.id,
                                isEnable : tool.webUserView.isEnable?0:1
                            },
                            success : function(resp){
                                tool.webUserView.isEnable?tool.webUserView.isEnable=0:tool.webUserView.isEnable=1;
                            },
                            error : function(resp){

                            }
                        });

                    },
                }
            });
        },
         //页码
        page : function(info){
            if(!info||info.totalPage<=1){
                return;
            }
            //页码
            Tool.page(info,function(num){
                Params.page=num;
                //改变链接值
                Tool.changeUrlVal([{name:"page",val:num}]);
                //获取班级列表
                init.getClassList();
            });
        },
        //查询参数
        searchParam : function(){
            if(Params.searchCategory=="班级名称"){
                return {className:Params.search};
            }
            if(Params.searchCategory=="设备Sn"){
                return {deviceSn:Params.search};
            }
            if(Params.searchCategory=="滤网Sn"){
                return {strainerSn:Params.search};
            }
        }
    };
    init.default();

});