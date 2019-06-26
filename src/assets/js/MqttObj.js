export function mqttobj(_this) {
    console.log('mqtt')
    /*生产环境线上端口 flash 8565       原生89                    测试环境[flash 9090       原生90]    */
    var client,userId=_this.userInfo.userId+'',sessionId=_this.userInfo.sessionId,ownerId=_this.roomInfo.ownerId,socketPort=443,
    domain=_this.isTest()?'testbroker.hexun.com':'brokerzhibo.hexun.com';
        client=new Paho.MQTT.Client(domain,socketPort,userId)
        var one_mc = false, dmTopic, admTopic,
        roomTopic = 'zhibo/room/' + _this.roomId,
        klick_logout = false,//单点登陆踢出后不再重连
        subscribe_options = {
            qos: 0,
            onSuccess: onSubSuccess,
            onFailure: onSubFailed
        };
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    var connect_options = {
        useSSL: true,
        userName: userId,
        password: sessionId,
        cleanSession: true,
        onSuccess: onConnect,
        onFailure: onConnectFailed,
        keepAliveInterval: 60
    };
    client.connect(connect_options);
    /*创建连接MQTT方法*/
    function onConnect() {
        //是个人直播
        client.subscribe(roomTopic,subscribe_options);
        // 单点登录相关
        if (_this.userInfo.login) {
            dmTopic = 'zhibo/chat/dm/' + userId + '/#';
            client.subscribe(dmTopic,subscribe_options);
        }

        /*
         1助理，2高级助理，3老师，4主持人
         订阅私聊提问，问答
        */
        // if (d5.userInfo.identity == 'assistant' || d5.userInfo.identity == 'presenter'||d5.isAss_teacher) {
        //     admTopic = 'zhibo/chat/dm/' + ownerId + '/#';
        //     client.subscribe(admTopic,subscribe_options);
        // }
    }
    /*链接失败 回调方法*/
    function onConnectFailed(responseObject) {
        if (klick_logout||responseObject.errorCode==6) {
            console.log("onConnectFailed:", responseObject.errorMessage);
            return
        }
        if (responseObject.errorCode !== 0) {
            console.log("onConnectFailed:", responseObject.errorMessage);
        }
        setTimeout(function () {
            client.connect(connect_options);
            console.log('断后重连');
        }, 5000);
    }

    /*MQTT 初始连接成功*/
    function onSubSuccess() {
        console.log("MQTT——初始化成功onSubSccess");
    }

    /*MQTT 初始连接失败*/
    function onSubFailed(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onSubFailed:MQTT——初始化失败", responseObject.errorMessage);
        }
    }

    function onConnectionLost(responseObject) {
        if(responseObject.errorCode === 5){console.log("onSubFailed:MQTT——链接丢失", responseObject.errorMessage);return}
        if (responseObject.errorCode !== 0) {
            setTimeout(function () {
                client.connect(connect_options);
                console.log('断后重连');
            }, 5000);
        }
    }

    var Mess={
        t_s:function(a){
            //console.log('老师发表直播观点',a.type);
            _this.message.push(_this.setMes(a))
        },
        t_ssm:function(a){
            //console.log('推送隐私观点',a.type);

        },
        t_ss:function(a){
            //console.log('推送策略选股',a.type);

        },
        t_pumf:function(a){
            //console.log('vip推送学员反馈',a.type);

        },        
        t_pum:function(a){
            //console.log('大交易时推送学员反馈',a.type);

        },
        u_s:function(a){
            //console.log('学生发表网友互动',a.type);
            _this.message.push(_this.setMes(a,'mqqt'))
        },
        u_a:function(a){
            // console.log('学生提问',a.type);

        },
        t_rp:function(a){
            // console.log('老师解答学生提问（私密解答）',a.type);

        },
        t_ro:function(a){
            //老师公开解答

        },
        t_rol:function(a){
            //老师左侧公开回复
            _this.message.push(_this.setMes(a,'mqqt'))
        },
        t_ptrf:function(a){
            //console.log('vip推送老师公开回复',a.type);
        },
        t_ror:function(a){
            _this.message.push(_this.setMes(a,'mqqt'))
            // console.log('老师回互动交流右侧回复',a.type);
        },
        u_r:function(a){
            //  console.log('vip 回复互动的消息，右侧显示',a.type);
            _this.message.push(_this.setMes(a,'mqqt'))
        },
        cs_s:function(a){
            // console.log('和讯客服发言，右侧显示',a.type);
            _this.message.push(_this.setMes(a,'mqqt'))
        },
        cs_ro:function(a){
            // console.log('和讯客服回复用户，右侧互动交流显示',a.type);
            _this.message.push(_this.setMes(a,'mqqt'))
        },
        ta_ror:function(a){
            // console.log('助理互动交流回复用户，右侧显示',a.type);
            _this.message.push(_this.setMes(a,'mqqt'))
        },
        ta_rol:function(a){
            // console.log('助理互动交流回复用户，公开回复',a.type);
            _this.message.push(_this.setMes(a,'mqqt'))
        },
        ta_rp:function(a){
            //console.log('助理私密解答 右侧')
        },
        ta_ro:function(a){
            //console.log('助理公开解答 左侧')
        },
        ta_s:function(a){
            // console.log('助理发言，左则显示',a.type);
            _this.message.push(_this.setMes(a,'mqqt'))
        },
        zc_s:function(a){
            //主持人发言 左侧
        },
        zc_rp:function (a) {
            //主持人私密解答
        },
        zc_ro:function (a) {
            //主持人公开解答
        },
        zc_rol:function (a) {
            //主持人互动交流左侧回复
        },
        zc_ror:function(a){
            //主持人互动交流右侧回复
        },
        ad_robot_room:function (a) {
            //console.log('广告机器人(直播室[当前直播室])',a.type);
        },
        ad_robot_all:function(a){
            // console.log('广告机器人(直播平台[全局广告])',a.type);
        },
        room_sys_msg:function(a){
            // console.log('直播室内系统消息（在右侧用户区显示）',a.type);
        },
        notify_courses:function(a){
            //console.log('直播室视频课程消息（在左侧显示）',a);
        },
        notify_sqr:function(a){
            //console.log('隐藏观点名额不足',a);
            // var txt = d5.userInfo.identity!='teacher'&&$('#topInfo .btn-atten').attr('data-p')=='fv'?'':'名额已满，请关注老师',obj=$('#se_'+a.secretId).find('.voice-classroom-btn');
            // obj.find('.syme').html('');
            // obj.find('.intoclassroom').addClass('isfull');
        },
        kick_user:function(a){
            /*踢出用户*/
        },
        kick_user_multi_account:function(a){
            /*单点登陆检测冲突*/
            console.log('单点登录冲突',a)
            if(a.kick_by == 'sid' && a.toKickSessionId == _this.userInfo.sessionId &&  a.roomId == _this.roomId) {
                klick_logout=true;
                _this.kickLogin(a.body)
                //vm.exitLogin() // 退出登录
            }
        },
        blacklist_user:function(a){
            //console.log('拉黑用户');
        },
        delete_message:function(a){
            //解答问题后删除消息
            $('#s'+a.toDeleteMessageId).remove();
            $('#js-bf-gif').getNiceScroll().resize();
        },
        close_room:function(a){

        },
        silence_user:function(a){
            //console.log('将该用户禁言', a.type);
            //d5.leftMsg(a);
        },
        delete_a:function (a) {
            //删除消息
            $('#s'+a.toDeleteMessageId).remove();
            $('#js-bf-gif').getNiceScroll().resize();
        },
        topic_webinar_start:function(a){
            //console.log('主题直播功能已禁用');
            return false;
        },
        topic_webinar_stop:function(a){
            return false;
        },
        gift:function(a){
            //双11礼物
            _this.message.push(_this.setMes(a,'mqqt'))
            
        },
        sys_wnu:function(a)
        {
            //迎新欢迎
        },
        hongbao:function(a){
            //红包
        },
        update_room:function(a){

        }
    };

    /* 左右模块分类—处理 */
    function onMessageArrived(mqttMsg) {
        var a=null;
        try {
            a= JSON.parse(mqttMsg.payloadString);
            //console.log(a, '<-消息类型');
            Mess[a.type](a);
        } catch (e) {
            console.log('没有此类型！',e)
            //throw new TypeError('script error for message server connect fail');
        }
    }
    /*单点登陆冲突*/
    function user_exit(body) {
        var node = $('#openWrap_exit'), au = null;
        node.find('p.sys-tips').text(body);
        au = $('#dotNav').find('a');
        au.eq(0).text('登录').attr('data-p', 'login');
        au.eq(1).text('注册').attr({
            'href': 'https://reg.hexun.com/regname.aspx?gourl=http://zhibo.homeway.com.cn/',
            'target': '_blank'
        });
        node.find('a.re_login').click(function () {
            popupLogin();
            closeBox('openWrap_exit')
        });
        node.find("a.et_exit").click(function () {
            location.href = 'http://zhibo.homeway.com.cn/';
        });
        setTimeout(function () {
            document.getElementsByTagName('body')[0].removeChild($('#to_exit')[0])
        }, 2000);
    }
};