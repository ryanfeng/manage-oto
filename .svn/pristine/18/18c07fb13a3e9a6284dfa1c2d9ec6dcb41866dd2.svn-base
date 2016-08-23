/*
 * 服务器设备
 * */

define(['Tool','component','text!/tpl/sell-after/server-set.html'],function(Tool,component,serverSet){
    var Params = {

    };
    var init = {
        default : function(){
            init.base();
            //表单信息
            init.formInput();
        },
        base : function(){
            //位置信息
            Tool.location([{
                class : "",
                href : "javascript:void(0)",
                text : "售后设备"
            },{
                class : "hover",
                href : "./school-device.html",
                text : "校园新风"
            },{
                class : "",
                href : "javascript:void(0)",
                text : "服务器设置"
            }]);
        },
        //表单信息
        formInput : function(){
            $(".info-table-box").html(serverSet);
            new Vue({
                el: ".input-form",
                //数据
                data: {
                    list : [{
                        title : "单价（元）",
                        placeholder : "请输入",
                        warning : false,
                        hint : "", 
                        value : "",
                        blur : function(val){
                            //验证正数
                            Check.ifPositive(val,["单价（元）不能为空"]);
                        },
                    },{
                        title : "服务开始",
                        placeholder : "例：1995-06-08",
                        warning : false,
                        hint : "",
                        value : "",
                        blur : function(val){ 
                            //验证日期
                            Check.ifDate(val,["服务开始日期不能为空"]);
                        },
                    },{
                        title : "服务到期",
                        placeholder : "例：1995-10-08",
                        class : "line",
                        warning : false,
                        hint : "",
                        value : "",
                        blur : function(val){
                            //验证日期
                            Check.ifDate(val,["服务到期日期不能为空"]);
                        },
                    }],
                    submitClass : "btn-success btn-submit",
                    submitValue : "保存",
                    cancelClass : "btn-default",
                    cancelValue : "取消"
                },
                methods : {
                    //提交
                    submit : function(){
                        if(this.dislabedSubmit){
                            return;
                        }
                        //验证列表不正确
                        if(Check.list(this.list,this.channel)){
                            return;
                        }
                        //btn提交等待中
                        Tool.btnStautsBusy("服务器设置费用");
                        this.dislabedSubmit = true;
                        //保存
                        this.save();
                    },
                    save : function(){
                        var self = this;
                        $.ajax({
                            url : API.schoolServiceFeeSet, 
                            type : "post",
                            data : {
                                amount : this.list[0].value,
                                serviceStart : this.list[1].value,
                                serviceEnd : this.list[2].value,
                            },
                            success : function(resp){
                                console.log(resp,"成功");
                                if(resp.code==0){
                                    //btn提交成功
                                    Tool.btnStautsSuccess("服务器费用设置成功","保存",function(){
                                        location.href = "./school-device.html";
                                    });
                                    //提示框-成功 
                                    Tool.alertboxSuccess("服务器费用设置成功");
                                }else{
                                    //btn提交失败
                                    Tool.btnStautsError("服务器费用设置失败","保存");
                                    //提示框-错误
                                    Tool.alertboxError(resp.msg);
                                    self.dislabedSubmit = false;
                                }
                            },
                            error : function(resp){
                                console.log(resp,"失败");
                                //btn提交失败
                                Tool.btnStautsError("服务器设置费用失败","保存");
                            }
                        });
                    }
                }
            });
        }
    };
    init.default();

});