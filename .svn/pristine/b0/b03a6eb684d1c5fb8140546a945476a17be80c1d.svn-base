/*
* 地图页面
* */
define(['Tool','component'],function(Tool,component){
    var init = {
        default : function(){
            //获取应用概况
            init.getAppStatus();
            //获取地图信息 
            init.getMapInfo();
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
        }
    };
    init.default();
});