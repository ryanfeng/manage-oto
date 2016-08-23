/*
 * 绑定工厂用户
 * */
define(['Tool','component'],function(Tool,component){
    var urlParam = Tool.getUrlParam();
    var Params = {
        factoryName : decodeURIComponent(urlParam.factoryName)
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
                text : "售前设备" 
            },{
                class : "hover",
                href : "./manufacturer.html",
                text : "生产厂商" 
            },{
                class : "hover",
                href : "./user-list.html?factoryId="+urlParam.factoryId,
                text : "绑定用户"  
            },{
                class : "",
                href : "javascript:void(0)",
                text : "新增绑定用户"  
            }]);
        },
        //表单信息
        formInput : function(factoryList,factoryActive){
            new Vue({ 
                el: ".input-form",
                //数据
                data: {
                    title : "生产厂商",
                    titleName : Params.factoryName,
                    list : [{
                        title : "登录账号",
                        placeholder : "请输入",
                        warning : false,  
                        hint : "",
                        listClass : "line",
                        blur : function(val){
                            //验证是否有值
                            Check.haveValue(val,"登录账号不能为空");
                        },
                        value : ""
                    }],
                    submitClass : "btn-success btn-submit",
                    submitValue : "保存",
                    cancelClass : "btn-default",
                    cancelValue : "取消",
                    cancelLink : "./user-list.html?factoryId="+urlParam.factoryId
                },
                methods : { 
                    focus : function(val){
                        val.warning = false;
                        val.hint = "";
                    },
                    //设备分类选择
                    select : function(option,val){
                        val.active = option;
                    },
                    //提交
                    submit : function(){ 
                        var self = this;
                        if(self.dislabedSubmit){
                            return;
                        }
                        //验证列表不正确
                        if(Check.list(this.list)){
                            return;
                        }  
                        //btn提交等待中
                        Tool.btnStautsBusy("绑定用户");
                        self.dislabedSubmit = true;
                        //保存
                        this.save();
                    },
                    //保存 
                    save : function(){
                        var self = this;
                        $.ajax({
                            url : API.factoryBindUser,
                            type : "POST", 
                            data : {
                                factoryId : urlParam.factoryId,
                                loginName : this.list[0].value.trim()
                            },
                            success : function(resp){
                                if(resp.code==0){
                                    //btn提交成功
                                    Tool.btnStautsSuccess("绑定用户成功","保存",function(){
                                        location.href = "./user-list.html?factoryId="+urlParam.factoryId;
                                    });
                                    //提示框-成功 
                                    Tool.alertboxSuccess("绑定用户成功");
                                }else{
                                    //btn提交失败
                                    Tool.btnStautsError("绑定用户失败","保存");
                                    //提示框-错误
                                    Tool.alertboxError(resp.msg);
                                    self.dislabedSubmit = false;
                                }
                            }, 
                            error : function(resp){
                                //btn提交失败
                                Tool.btnStautsError("绑定用户失败","保存");
                                self.dislabedSubmit = false;
                            }
                        });
                    }
                }
            });
        }
    }; 
    init.default();
});