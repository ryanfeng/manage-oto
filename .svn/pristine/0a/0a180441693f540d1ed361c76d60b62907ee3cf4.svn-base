/*
* 生产批次列表页面
* */
define(['Tool','component','text!/tpl/yield-batch/list.html'],function(Tool,component,list){
    var urlParam = Tool.getUrlParam();
    //参数
    var Params = {
        limit : 10,
        batchName : decodeURIComponent(urlParam.batchName||""),
        page : urlParam.page||0
    }
    console.log(Params,"Params");
    var init = {
        default : function(){
            //位置信息
            init.location();
            //创建搜索
            init.search();
            //获取批次列表
            init.getbatchList();
        },
        //位置信息
        location : function(){
            // 创建位置
            component.location({
                list : [
                    {
                        class : "",
                        href : "javascript:void(0)",
                        text : "生产批次"
                    }
                ]
            });
            new Vue({
                el: '.location'
            });
        },
        // 创建搜索
        search : function(){
            component.search({
                val : Params.batchName,
                placeholder : "请输入批次名称"
            },{
                //提交搜索
                submitSearch : function(val){
                    Params.batchName=val;
                    Params.page=0;
                    //改变链接值
                    Tool.changeUrlVal([
                        {name:"batchName",val:val},
                        {name:"page",val:""}
                    ]);
                    //获取批次列表
                    init.getbatchList();
                }
            });
            new Vue({
                el: '.search'
            });
        },
        //没有结果
        nothingInfo : function(searchVal,status){
            $(".nothing").remove();
            $(".info-table-box").html('<div class="nothing"><nothing></nothing></div>');
            $(".page").html("");
            $(".info-table").remove();
            // 搜索无结果
            component.nothing({
                searchVal:!status&&(searchVal||""),
                question : status=="question"?searchVal:""
            });
            new Vue({
                el: '.nothing'
            });
        },
        //获取批次列表
        getbatchList : function(){
            var data = {
                page : Params.page,
                limit : Params.limit,
                batchName : Params.batchName
            };
            //添加正在加载中...
            Tool.loaddding({
                box : [".info-table-box"],
                cover : true,//覆盖
                delayShow : true//N毫秒后展示 默认N毫秒"timeOut:N" 时间太快不显示正在加载中...
            });
            $.ajax({
                url :API.batchList,
                type:"POST",
                data : data,
                success : function(resp){
                   console.log(resp,"成功");
                    if(resp.code==0){
                        if(resp.data.length){
                            //信息整理
                            init.infoNeaten(resp.data);
                            //页码
                            init.page(resp.info);
                        }else{
                            //没有结果
                            init.nothingInfo(Params.batchName);
                        }
                    }else{
                        //没有结果
                        init.nothingInfo("","question");
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
                resp[i].tools = {
                    detail : "查看详情"
                };
            }
            //表格信息
            init.infoTable(resp);
        },
        //表格信息
        infoTable : function(dataList){
            $(".info-table-box").html(list);
            console.log(dataList);
            // 创建表格信息
            new Vue({
                el: '.info-table',
                data : {
                    titles : [
                        { text : "序号"},
                        { text : "批次名称"},
                        { text : "创建时间"},
                        { text : "操作人"},
                        { text : "设备分类"},
                        { text : "设备型号"},
                        { text : "数量"},
                        { text : "生产厂商"},
                        { text : "操作", styleObject : {
                            "width" : "150px"
                        }}
                    ],
                    dataList : dataList
                },
                methods : {

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
                    //获取批次列表
                    init.getbatchList();
                }
            });
            new Vue({
                el: '.page'
            });
        }
    };
    init.default();

});