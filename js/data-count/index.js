/*
* 数据统计页面
* */
define(['Tool','component','text!/tpl/data-count/trend-table.html'],function(Tool,component,trendTable){
    var  urlParam = Tool.getUrlParam();
    var Params = {
        startDate : urlParam.startDate||"",
        endDate : urlParam.endDate||"",
        day : urlParam.day||(!urlParam.startDate&&"0")||""
    };  
    var init = {
        default : function(){
            //获取应用概况
            init.getAppStatus();
            //展示趋势分析头部
            init.showTrendTop();
            //获取趋势分析信息
            init.getTrendInfo();
            //获取设备统计数据
            init.getDeivceStatistics();
            //获取终端统计数据
            init.getTerminalStatistics();
            //获取地图信息
            init.getMapInfo();
            //获取新增用户信息
            init.getNewUserInfo();
            //获取新增设备信息
            init.getNewDeviceInfo();
            //获取区域信息
            init.getAreaInfo();
        },
        //获取应用概况
        getAppStatus : function(){
            $.ajax({
                url : API.statisticsDeviceGeneral,
                type : "post",
                success : function(resp){
                    if(resp.code==0){
                        //展示应用概况
                        init.showAppStatus(resp.data);
                    }else{
                        //提示框-错误
                        Tool.alertboxError(resp.msg);
                    }
                },
                error : function(resp){
                    console.log(resp,"失败");  
                }
            });
        },
        //展示应用概况
        showAppStatus : function(data){
            new Vue({
                el: ".app-status",
                //数据 
                data: {
                    list : [
                        {
                            title : "设备总量",
                            text : data.total
                        },
                        {
                            title : "在线设备",
                            text : data.online
                        },
                        {
                            title : "离线设备",
                            text : data.offline
                        },
                        {
                            title : "未激活设备",
                            text : data.inactived
                        }
                    ]
                }
            });
        },
        //展示趋势分析头部
        showTrendTop : function(){
            new Vue({
                el: ".trend-top",
                //数据 
                data: {
                    btns : [{
                        value : "当天",
                        class : Params.day=="0"&&"btn-success",
                        day : "0"
                    },{
                        value : "最近7天",
                        class : Params.day=="7"&&"btn-success",
                        day : "7"
                    },{
                        value : "最近30天", 
                        class : Params.day=="30"&&"btn-success",
                        day : "30"
                    }],
                    //筛选
                    select : {
                        title : "时间筛选:",
                        startValue : Params.startDate,
                        startClass : "", 
                        endValue : Params.endDate,
                        endClass : "",
                        placeholder : "YYYY-MM-dd", 
                        submitValue : "确定"
                    }
                },
                methods : {
                    focus : function(select,Class){
                        select[Class] = "";
                    },
                    //选择日期
                    clickBtn : function(val){
                        if(val.class!="btn-success"){
                            for(var i=0;i<this.btns.length;i++){
                                this.btns[i].class = "";
                            }
                            val.class = "btn-success";
                            //改变链接值
                            Params.startDate="";
                            Params.endDate=""; 
                            Params.day=val.day;
                            Tool.changeUrlVal([
                                {name:"startDate",val:""},
                                {name:"endDate",val:""},
                                {name:"day",val:val.day}
                            ]);
                            //获取趋势分析信息  
                            init.getTrendInfo();
                        }
                    },
                    //判断格式
                    blur : function(val,select,Class){
                        if(RegEx.RegExpDate(val)){
                            select[Class] = ""; 
                        }else{
                            select[Class] = "warning";
                        }
                    },
                    //搜索
                    submit : function(){
                        if(!RegEx.RegExpDate(this.select.startValue)||!RegEx.RegExpDate(this.select.endValue)){
                            //提示框-警告
                            Tool.alertboxWarning("请填写正确的时间筛选");
                            Params.startDate="";
                            Params.endDate="";
                        }else{
                            Params.startDate=this.select.startValue;
                            Params.endDate=this.select.endValue;
                            Params.day="";
                            //改变链接值
                            Tool.changeUrlVal([
                                {name:"startDate",val:this.select.startValue},
                                {name:"endDate",val:this.select.endValue},
                                {name:"day",val:""}
                            ]);
                            //获取趋势分析信息 
                            init.getTrendInfo();
                        }
                    }
                }
            }); 
        },
        //获取趋势分析信息
        getTrendInfo : function(){
            $(".trend-table").html(trendTable);
            $.ajax({
                url : API.statisticsTendencyAnalyze, 
                type : "post", 
                data : {
                    startDate : Params.startDate||Tool.getTimeDate(Params.day),
                    endDate : Params.endDate||Tool.getTimeDate(-1)
                    
                },
                success : function(resp){
                    if(resp.code==0){
                        //展示趋势分析
                        init.showTrend(resp.data);
                    }else{
                        //提示框-错误 
                        Tool.alertboxError(resp.msg);
                    }
                },
                error : function(resp){
                    console.log(resp,"失败");
                }
            });
        },
        //展示趋势分析
        showTrend : function(data){
            new Vue({
                el: ".trend-table",
                //数据 
                data: {
                    list : [ 
                        { 
                            title : "设备用户",
                            text : data.totalCount,
                            status : "up",
                            other : "新增设备用户4987"
                        },
                        {
                            title : "活跃用户",
                            text : data.activeCount,
                            status : "down", 
                            other : "最高峰12000"
                        },
                        {
                            title : "新用户",
                            text : data.newCount, 
                            status : "up",
                            other : "新增设备用户4987"  
                        },
                        {
                            title : "设备平均在线时长",
                            text : data.binderCount,
                            status : "up",
                            other : "04:36:23"
                        }
                    ]
                }
            });
        },
        //获取设备统计数据
        getDeivceStatistics : function(){
            $.ajax({
                url : API.statisticsDeviceStatistics,
                type : "post",
                success : function(resp){
                    if(resp.code==0){
                        ////展示设备统计
                        init.showDeivceStatistics(resp.data);
                    }else{
                        $(".deivce-statistics").find(".hint").text(resp.msg);
                        //提示框-错误
                        Tool.alertboxError(resp.msg);
                    }
                },
                error : function(resp){
                    console.log(resp,"失败");  
                }
            });
        },
        //展示设备统计
        showDeivceStatistics : function(data){
            new Vue({
                el: ".deivce-statistics",
                //数据 
                data: { 
                    list : [
                        {
                            title : "一周内到期滤网数量",
                            text : data.expiringCount,
                            status : "link",
                            link : "./be-about-to-over.html"
                        },
                        {
                            title : "已更换滤网数量（累计）",
                            text : data.changedCount
                        },
                        {
                            title : "设备锁定状态数据",
                            text : data.lockedCount
                        }
                    ] 
                }
            });
        },
        //获取终端统计数据
        getTerminalStatistics : function(){
            $.ajax({
                url : API.statisticsTerminalStatistics,
                type : "post",
                success : function(resp){
                    if(resp.code==0){
                        //展示终端统计数据
                        init.showTerminalStatistics(resp.data);
                    }else{
                        $(".terminal-statistics").find(".hint").text(resp.msg);
                        //提示框-错误
                        Tool.alertboxError(resp.msg);
                    }
                },
                error : function(resp){
                    console.log(resp,"失败");  
                }
            });
        }, 
        //展示终端统计数据
        showTerminalStatistics : function(data){
            new Vue({
                el: ".terminal-statistics",
                //数据 
                data: {
                    titles : [
                        { text : "APP类型"},
                        { text : "累计用户"},
                        { text : "累计用户占比"},
                        { text : "累计新用户"},
                        { text : "累计新用户占比"}
                    ],
                    ios : "ios系统",
                    android : "android系统",
                    data : data
                }
            });
        },
        //获取地图信息
        getMapInfo : function(){
            $.ajax({
                url : API.statisticsDeviceDistribution,
                type : "post",
                success : function(resp){
                    console.log(resp,"成功");
                    if(resp.code==0){
                        var baseData = {};
                        baseData.numData = [];
                        baseData.contyrData = {};
                        $.each(resp.data, function (index, obj) {
                            obj.name = obj.shortName;
                            obj.value = obj.deviceCount;
                            if (obj.value != 0) {
                                baseData.numData.push(obj);
                                baseData.contyrData[obj.name] = {};
                                baseData.contyrData[obj.name].name = obj.name;
                                baseData.contyrData[obj.name].value = obj.deviceCount;
                            } 
                        });
                        //展示地图信息
                        init.showMapInfo(baseData.numData,baseData.contyrData);
                    }else{
                        //提示框-错误
                        Tool.alertboxError(resp.msg);
                    }
                },
                error : function(resp){
                    console.log(resp,"失败");  
                }
            });
        },
        //展示地图信息
        showMapInfo : function(numData,contyrData){
            require(['/json/china.js'],function(chinaJson){
                new Vue({
                    el: ".map", 
                    //数据 
                    data: {
                        show : true
                    }
                });
                //地图展示
                echarts.registerMap('china', chinaJson);
                var myChart = echarts.init($('#map_chart')[0]);
                var option = {
                    title: {text: '全国设备分布图', x: 'left', padding: [20, 15],textStyle:{color:"#afaebc"}},
                    tooltip: {trigger: 'item'},
                    legend: {padding: [50, 15], x: 'left', data: ['地球村设备'],textStyle:{color:"#afaebc"}},
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataRange: {
                        x: 'left',
                        y: 'bottom',
                        splitList: [
                            {start: 1500},
                            {start: 900, end: 1500},
                            {start: 310, end: 1000},
                            {start: 200, end: 300},
                            {start: 10, end: 200, label: '10 到 200（自定义label）'},
                            {start: 5, end: 5, label: '5（自定义特殊颜色）', color: 'black'},
                            {end: 10}
                        ],
                        color: ['#E0022B', '#E09107', '#A3E00B']
                    }, 
                    series: [
                        {
                            name: '默认底块',
                            type: 'map',
                            mapType: 'china',
                            padding: [0, 0],
                            // showLegendSymbol: true,
                            // roam: false,
                            itemStyle: {
                                normal: {
                                    areaColor : '#d7e9ff',
                                    label: {show: true, textStyle: {color: "#231816"}},
                                    color: '#dcecff',
                                    borderColor: '#FFF',
                                    borderWidth: 1
                                },
                                emphasis: {
                                    areaColor : "#19afc7",
                                    label: {show: true}, color: '#d7e9ff'
                                }
                            },
                            data: []
                        },
                        {
                            name: '地球村设备',
                            type: 'map',
                            tooltip: {show: true},
                            coordinateSystem: 'geo',
                            mapType: 'china',
                            itemStyle: {
                                normal: {
                                    areaColor : '#a2c605', 
                                    label: {show: true, textStyle: {color: "#231816"}}, color: '#abcd03'
                                },
                                emphasis: {label: {show: true, textStyle: {color: "#FFF"}}, color: '#00b3a9'}
                            },
                            data: numData,
                            nameMap: contyrData
                        }
                    ]
                };
                myChart.setOption(option); 
            });
        },
        //获取新增用户信息
        getNewUserInfo : function(){
            $.ajax({
                url : API.statisticsMonthlyNewUsers,
                type : "post",
                success : function(resp){
                    console.log(resp,"成功");
                    if(resp.code==0){
                        var data = [];
                        for(var i=0;i<12;i++){
                            data.push(resp.data[0]["month"+i]);
                        }
                        //展示新增用户
                        init.showNewUser(data);
                    }else{
                        //提示框-错误
                        Tool.alertboxError(resp.msg);
                    }
                },
                error : function(resp){
                    console.log(resp,"失败");
                }
            });
        },
        //展示新增用户
        showNewUser : function(data){
            console.log(data);
            new Vue({
                el: ".new-user", 
                //数据 
                data: {
                    show : true
                }
            });
            var myChart = echarts.init($('#new-user')[0]);
            var option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                }, 
                xAxis : [
                    {
                        type : 'category',
                        data : ['1月' ,'2月', '3月', '4月', '5月','6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar', 
                        barWidth: '40%',
                        data:data
                    }
                ]
            };
            myChart.setOption(option);
        },
        //获取新增设备信息
        getNewDeviceInfo : function(){
            $.ajax({
                url : API.statisticsMonthlyNewDevices,
                data : {
                    serviceType : 1
                },
                type : "post",
                success : function(resp){
                    if(resp.code==0){
                        var data = [];
                        for(var i=0;i<12;i++){
                            data.push(resp.data[0]["month"+i]);
                        }
                        //展示新增设备
                        init.showNewDevice(data);
                    }else{
                        //提示框-错误
                        Tool.alertboxError(resp.msg);
                    }
                },
                error : function(resp){
                    console.log(resp,"失败");
                }
            });
        },
        //展示新增设备
        showNewDevice : function(data){
            console.log(data);
            new Vue({
                el: ".new-device", 
                //数据 
                data: {
                    show : true
                }
            });
            var myChart = echarts.init($('#new-device')[0]);
            var option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                }, 
                xAxis : [
                    {
                        type : 'category',
                        data : ['1月' ,'2月', '3月', '4月', '5月','6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar', 
                        barWidth: '40%',
                        data:data
                    }
                ]
            };
            myChart.setOption(option);
        },
        //获取区域信息
        getAreaInfo : function(){
            $.ajax({
                url : API.statisticsDeviceDistribution,
                type : "post",
                success : function(resp){
                    console.log(resp,"成功");
                    if(resp.code==0){
                        $(".pie-hint").remove();
                        $(".pie").find(">ul").show();
                        //筛选数据 
                        var data = [];
                        for(var i=0;i<resp.data.length;i++){
                            if(resp.data[i].deviceCount!=0){
                                resp.data[i].name = resp.data[i].shortName;
                                resp.data[i].value = resp.data[i].deviceCount;
                                data.push(resp.data[i]);
                            }
                        }
                        console.log(data);
                        //饼图展示区域信息
                        init.pieShowAreaInfo(data);
                        //列表展示区域信息
                        init.ListShowAreaInfo(data);
                        
                    }else{
                        //提示框-错误
                        Tool.alertboxError(resp.msg);
                    }
                },
                error : function(resp){
                    console.log(resp,"失败");
                }
            });
        },
        //饼图展示区域信息
        pieShowAreaInfo : function(data){
            data[0].selected = true;
            var myChart = echarts.init($('#pie-area')[0]);
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '70%'],
                        data:data
                    }
                ]
            };
            myChart.setOption(option);
        },
        //列表展示区域信息
        ListShowAreaInfo : function(datalist){
            new Vue({
                el: ".list-show-area",
                //数据 
                data: {
                    titles : [
                        { text : ""},
                        { text : "省份"},
                        { text : "设备总量"},
                        { text : "设备占比"}
                    ],
                    datalist : datalist
                }
            });
        }
    };
    init.default();
});