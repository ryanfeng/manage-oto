require.config({
    baseUrl : "./js",
    paths:{
        //插件
        text : 'plugIn/require.text',
        require : 'plugIn/require.min',
        underscore : 'plugIn/underscore-min',
        jquery : 'plugIn/jquery-1.11.3.min',
        Vue : 'plugIn/vue',
        echarts : 'plugIn/echarts.common.min',
        md5 : 'plugIn/md5',   
        selectordie : 'plugIn/selectordie.min',

        //公用js
        base : 'public/base',
        form : 'public/form',
        Tool : 'public/Tool',
        Check : 'public/Check', 
        publicHtml : 'public/publicHtml',
        component : "public/component",
        RegEx : "public/RegEx",
        ajaxAPI : "public/ajaxAPI"

    },
    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'template': {
            exports: 'template'
        },
        echarts : {
            exports : 'echarts'
        }
    }
});