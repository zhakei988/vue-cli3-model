import * as types from './mutationType.js';
import api from '../../api/index'
export default {
    //lesson
    setPlay({commit},data){
        commit(types.SET_PLAYINFO,data);//set login for vuex
    },
    async stGetClassId({commit},vm){
        let _this = vm,classId=null,videoId=null;
        try{
            if(location.href.indexOf('classId')>-1)
            {
                classId=_this.getUrlParam('classId');
                videoId=_this.getUrlParam('videoId');
            }else
            {
                const id =location.href.split('play/')[1].split('.html')[0];
                if(id.indexOf('_')>-1)
                {
                    classId=id.split('_')[0];
                    videoId=id.split('_')[1];
                }else
                {
                    classId=id;
                    videoId=null;
                }
            }
        }catch(e){
            console.log(e)
        }
        commit(types.SET_CLASSID,classId);//set classId for vuex
        commit(types.SET_VIDEOID,videoId);//set videoId for vuex
    },
    async setVideoInfo({commit},data){
        commit(types.SET_VIDEOINFO,data);//set login for vuex
    },
    async setLogInfoAsyn({commit},vm){
        let _this = vm;
        let login = await api.getLogInfo(_this);//ajax data login
        commit(types.SET_USERINFO,login);//set login for vuex
    },
    async setClassInfoAsyn({commit},data){
        commit(types.SET_CLASSINFO,data);//set login for vuex
    },
    async setTeachInfoAsyn({commit},data){
        commit(types.SET_TEACHINFO,data);//set login for vuex
    },
    //zhibo
    async enterAsyn({commit},vm){
        const _this=vm;
        //获取房间id
        const roomid = location.pathname.split('/')[1];
        if(roomid<0)
        {
            alert('房间号错误！')
            return;
        }
        commit(types.SET_ROOMID, roomid);//set roomid for vuex
        //当前直播室类型
        /*[1:历史回顾，2：历史回顾详情页，A计划，4：徐小明，冯矿伟专版 ，5：冯矿伟 徐小明专版历史回顾]*/
        const rPage={
            history:1,
            historyDesc:2,
            sa:3,
            trader:4,
            trader_history:5
        },
        k=location.pathname.replace('.html','').split('/'),
        router=rPage[k[k.length-1]]>0?rPage[k[k.length-1]]:0;
        commit(types.SET_ROUTER,router);//set router for vuex
        //获取直播室初始配置异步数据
        const enterRoom = await api.getEnterRoom(_this);//ajax data enterroom
        commit(types.SET_ENTERROOM, enterRoom);//set enterroom for vuex
        //设置角色
        if(enterRoom.resultKey=='ok'&&enterRoom.data.userPermissions)
        {
            let s = 'user';
            if(enterRoom.data.userInfo.login==false)
            {
                s = 'anonymous';//没登录的游客
            }else if(enterRoom.data.userPermissions.isZhiboCompere)
            {
                s = 'presenter';//主持人
            }
            else if(Number(enterRoom.data.userInfo.userId)===Number(enterRoom.data.roomInfo.ownerId)&&enterRoom.data.userPermissions.isRoomOwner)
            {
                s = 'teacher';//老师
            }else if(enterRoom.data.userPermissions.isTeacherAssistant&&enterRoom.data.userPermissions.isRoomOwner)
            {
                s = 'teacher';//高级助理
            }else if(enterRoom.data.userPermissions.isClassLeader)
            {
                s = 'monitor' //班长
            }else if(enterRoom.data.userPermissions.isTeacherAssistant)
            {
                s = 'monitor' //助理
            }else if(enterRoom.data.userPermissions.isCustomerService)
            {
                s = 'service' //客服
            }else if(enterRoom.data.userPermissions.isTeachersStudent)
            {
                s = 'vip' //VIP
            }
            commit(types.SET_IDEN,s);//set identity for vuex
        }
    },
    async roomInfoAsyn({commit},vm){
        //获取直播室roominfo
        const _this=vm;
        const roomInfo =await api.getRoomInfo(_this);//ajax data enterroom
        commit(types.SET_ROOMINFO, roomInfo);//set roomInfo for vuex
    },
    async techMsgListAsyn({commit},vm){
        //获取老师消息
        const _this=vm;
        const techMsgList =await api.getTechMsgList(_this);//ajax data enterroom
        commit(types.SET_TECHMSGLIST, techMsgList);//set teachInfo for vuex
    },
};