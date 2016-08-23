/*
* 订单详情页面
* */
define(['Tool','component','text!/tpl/sell-after/order-detail.html','text!/tpl/sell-after/order-detail_device.html'],function(Tool,component,orderDetail,deviceList){
    var urlParam = Tool.getUrlParam();
    //参数
    var Params = {
        limit : 10,
        orderId : urlParam.orderId,
        searchCategory : decodeURIComponent(urlParam.searchCategory||"滤网sn"),
        search : decodeURIComponent(urlParam.search||""),
        page : urlParam.page||0
    }
    console.log(Params,"Params"); 
    var init = {
        default : function(){ 
            //位置信息
            init.location(); 
            //创建搜索
            init.search();
            //获取订单详情
            init.getOrderDetail();
            //获取订单设备列表
            init.getOrderDeviceList();
        },
        //位置信息
        location : function(){
            // 创建位置
            component.location({
                list : [
                    {
                        class : "",
                        href : "javascript:void(0)",
                        text : "售后管理"
                    },
                    {
                        class : "",
                        href : "javascript:void(0)",
                        text : "订单管理"
                    },
                    {
                        class : "",
                        href : "javascript:void(0)",
                        text : "查看详情"
                    }
                ]
            });
            new Vue({
                el: '.location'
            });
        },
        // 创建搜索
        search : function(){
            // 创建搜索 
            component.search({
                placeholder : "请输入联系人查询",
                val : Params.search,
                select : true, 
                option : [{
                    text : "滤网sn",
                    placeholder : "请输入滤网sn查询",
                    class : Params.searchCategory=="滤网sn"?"selected":""
                },{
                    text : "设备sn",
                    placeholder : "请输入设备sn查询",
                    class : Params.searchCategory=="设备sn"?"selected":""
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
                    //获取订单设备列表
                    init.getOrderDeviceList();
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
        getOrderDetail : function(){
            var data = {
                orderId : Params.orderId
            };
            //添加正在加载中...
            Tool.createLoadding(['.detail-info']);
            $.ajax({
                url :API.orderDetail,
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
        //获取订单设备列表
        getOrderDeviceList : function(){
            var data = {
                orderId : Params.orderId,
                page : Params.page,
                limit : Params.limit
            };
            //获取搜索类型和值
            var searchParam = init.searchParam()
            $.extend(data,init.searchParam());
            //添加正在加载中...
            Tool.createLoadding("","",function(){
                var $box = $(".info-table-box");
                $box.find(".nothing").remove();
                $(".page").html("");
                $box.find(".info-table").remove();
            });
            $.ajax({
                url :API.orderListDevice,
                type:"POST",
                data : data,
                success : function(resp){
                    console.log(resp,"成功");
                    if(resp.code==0){
                        if(resp.data.length){
                            //表格信息
                            init.deviceInfoList(resp.data); 
                            //页码
                            init.page(resp.info);
                        }else{
                            //没有结果
                            init.nothingInfo(Params.sn);
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
        //详情信息
        detailInfo : function(val){
            $(".detail-info").html(orderDetail);
            // 创建表格信息
            new Vue({
                el: '.detail-info',
                data : {
                    titles : [
                        { text : "订单编号"},
                        { text : "物流编号"},
                        { text : "创建日期"},
                        { text : "经销商（公司）"},
                        { text : "订单类型"},
                        { text : "用户名称"},
                        { text : "联系方式"},
                        { text : "数量"}
                    ],
                    val : val
                }
            });
        },
        //设备列表信息
        deviceInfoList : function(dataList){
            $(".info-table-box").html(deviceList);
            // 创建表格信息
            new Vue({
                el: '.order-device-list',
                data : {
                    page : Params.page*Params.limit,
                    titles : [
                        { text : "序号"},
                        { text : "滤网类型"},
                        { text : "滤网sn"},
                        { text : "设备类型"},
                        { text : "设备sn"},
                        { text : "（设备）生产厂商"},
                        { text : "（滤网）生产厂商"}, 
                    ],
                    dataList : dataList,
                    categoryCode : urlParam.categoryCode
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
                    //获取订单设备列表
                    init.getOrderDeviceList();
                }
            });
            new Vue({
                el: '.page'
            });
        },
        //查询参数
        searchParam : function(){
            if(Params.searchCategory=="滤网sn"){
                return {strainerSn:Params.search};
            }
            if(Params.searchCategory=="设备sn"){
                return {deviceSn:Params.search};
            }
        }
    };
    init.default();

});