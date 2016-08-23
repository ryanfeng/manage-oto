/*
* 生产批次详情页面
* */
define(['Tool','component','text!/tpl/yield-batch/detail.html'],function(Tool,component,detail){
    var urlParam = Tool.getUrlParam();
    //参数
    var Params = {
        limit : 10,
        batchId : urlParam.batchId,
        categoryCode : decodeURIComponent(urlParam.categoryCode||""),
        initState : parseInt(urlParam.initState)||"",
        sn : urlParam.sn,
        page : urlParam.page||0
    }
    console.log(Params,"Params"); 
    var init = {
        default : function(){ 
            //添加正在加载中...
            Tool.loaddding({
                box : [".area-block",".info-table-box"],
                delayShow : true//N毫秒后展示 默认N毫秒"timeOut:N" 时间太快不显示正在加载中...
            }); 
            init.base(); 
            //刷新
            init.refresh();
            //筛选
            init.select();
            //获取批次详情
            init.getbatchDetail();
            //获取SN编码列表
            init.getBatchSnList();
        },
        base : function(){
            //位置信息
            Tool.location([{
                class : "hover",
                href : "./list.html",
                text : "生产批次" 
            },{
                class : "",
                href : "javascript:void(0)",
                text : "批次详情" 
            }]);
            //搜索
            Tool.search({
                val : Params.sn,
                categoryCode : urlParam.categoryCode,
                placeholder : "请输入SN编码"
            },{
                //提交搜索
                submitSearch : function(val){
                    Params.sn=val;
                    Params.page=0;
                    //改变链接值
                    Tool.changeUrlVal([
                        {name:"sn",val:val},
                        {name:"page",val:""}
                    ]);
                    //获取SN列表
                    init.getBatchSnList();
                }
            }); 
        },
        //刷新
        refresh : function(){
            new Vue({
                el: ".refresh",
                //数据
                data: {
                    newBtnClass : "btn-success",
                    type : "",
                    newBtnValue : "刷新"
                },
                //事件
                methods : {
                    refresh : function(){
                        var self = this;
                        this.type = true;
                        this.newBtnValue = "刷新中...";
                        //获取SN列表
                        init.getBatchSnList(function(){
                            self.newBtnValue = "刷新";
                            self.type = false;
                        });
                    }
                }
            });
        },
        //筛选
        select : function(){
            if(urlParam.categoryCode=="001"){
                var option = [{
                    text : "全部",
                    class : Params.initState==""&&"selected",
                    initState : ""
                },{
                    text : "设置出厂身份 ",
                    initState : "0",
                    class : Params.initState==0&&"selected",
                },{
                    text : "分配中",
                    initState : "1",
                    class : Params.initState==1&&"selected",
                },{
                    text : "待确认",
                    initState : "2",
                    class : Params.initState==2&&"selected",
                },{
                    text : "已设置",
                    initState : "3",
                    class : Params.initState==3&&"selected",
                }];

                new Vue({
                    el: '.select',
                    data : {
                        title : "筛选身份状态：", 
                        active : (Params.initState&&option[Params.initState+1].text)||"全部",
                        option : option
                    },
                    methods : {
                        selectStatus : function(val){
                            this.active = val.text; 
                            Params.initState = val.initState;
                            Params.page = 0;
                            console.log(val);
                            //改变链接值
                            Tool.changeUrlVal([
                                {name:"initState",val:val.initState},
                                {name:"page",val:""}
                            ]);
                            //获取SN列表
                            init.getBatchSnList();
                        }
                    },
                });
            }
        },
        //没有结果
        nothingInfo : function(searchVal,status){
            $(".nothing").remove();
            $(".info-table-box").html('<div class="nothing"><nothing></nothing></div>');
            $(".page").html("");
            $(".SN-list").remove();
            console.log(searchVal);
            // 搜索无结果
            component.nothing({
                searchVal:!status&&(searchVal||""),
                question : status=="question"?searchVal:""
            });
            new Vue({
                el: '.nothing'
            });
        },
        //获取批次详情
        getbatchDetail : function(){
            var data = {
                batchId : Params.batchId
            };
            $.ajax({
                url :API.batchDetail,
                type:"POST",
                data : data,
                success : function(resp){
                   console.log(resp,"成功");
                    if(resp.code==0){
                        //信息整理
                        init.detailInfo(resp.data);
                    }
                },
                error: function(resp){
                    console.log(resp,'失败')
                }
            });
        },
        //获取SN编码列表
        getBatchSnList : function(callback){
            callback = callback || function(){};
            var data = {
                batchId : Params.batchId,
                page : Params.page,
                limit : Params.limit,
                sn : Params.sn,
                initState : Params.initState,
                categoryCode : Params.categoryCode
            };
            $.ajax({
                url :API.batchSnList,
                type:"POST",
                data : data,
                success : function(resp){
                    console.log(resp,"成功");
                    callback();
                    if(resp.code==0){
                        if(resp.data.length){
                            //信息整理
                            init.infoNeaten(resp.data);
                            //页码
                            init.page(resp.info);
                        }else{
                            //没有结果
                            if(Params.sn){ 
                                init.nothingInfo(Params.sn);
                            }else{
                                //没有结果
                                init.nothingInfo("暂无数据","question");
                            }
                        }
                    }else{
                        //没有结果 
                        init.nothingInfo("暂无数据","question");
                    }
                },
                error: function(resp){
                    console.log(resp,'失败')
                }
            });
        },
        //信息整理
        infoNeaten : function(resp){
            var page = Params.page*Params.limit;
            for(var i=0;i<resp.length;i++){
                resp[i].number = i+1+page;
                resp[i].tools = ["设置出厂身份","分配中","待确认","已设置"];
            }
            //表格信息
            init.SNInfoList(resp);
        },
        //详情信息
        detailInfo : function(val){
            val.number = 1;
            // 创建表格信息
            new Vue({
                el: '.detail-info',
                data : {
                    titles : [
                        { text : "序号"},
                        { text : "批次名称"},
                        { text : "创建时间"},
                        { text : "操作人"},
                        { text : "设备分类"},
                        { text : "设备型号"},
                        { text : "数量"},
                        { text : "生产厂商"}
                    ],
                    val : val
                }
            });
            //删除正在加载中...  
            Tool.loaddding({
                status : "remove",
                box : [".area-block"]
            });
        },
        //SN列表信息
        SNInfoList : function(dataList){
            $(".info-table-box").html(detail);
            var titles = [
                { text : "序号"},
                { text : "SN编码"}
            ]
            console.log(urlParam.categoryCode);
            if(urlParam.categoryCode=="001"){
                titles.push({ text : "操作", styleObject : {
                    "width" : "150px"
                }});
            }
            // 创建表格信息
            new Vue({
                el: '.SN-list',
                data : {
                    titles : titles,
                    dataList : dataList,
                    categoryCode : urlParam.categoryCode
                },
                methods : {
                    //设置出厂身份
                    setDeviceAllocate : function(val){ 
                        $.ajax({
                            url : API.deviceAllocate,
                            type : "post",
                            data : {
                                deviceId : val.id
                            },
                            success : function(resp){
                                if(resp.code==0){
                                    val.initState = 1;
                                }else{
                                    //展示报错信息
                                    Tool.alertbox({
                                        autoHide : true, 
                                        data : { 
                                            clickBGclose : true,
                                            statusShow : "error",
                                            hint : resp.msg
                                        }, 
                                    });
                                }
                            },
                            error : function(resp){
                                console.log(resp,"失败");
                            }
                        });
                    }
                }
            });
        },
        //页码
        page : function(info){
            console.log(info);
            if(!info||info.totalPage<=1){
                return;
            }
            $(".page").html("<page></page>")
            // 创建搜索
            component.page(info,{
                changePage : function(num){
                    Params.page=num;
                    //改变链接值
                    Tool.changeUrlVal([{name:"page",val:num}]);
                    //获取SN列表
                    init.getBatchSnList();
                }
            });
            new Vue({
                el: '.page'
            });
        }
    };
    init.default();

});