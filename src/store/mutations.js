import * as types from './mutationType.js';

export default {
    //lesson
    [types.SET_VIDEOINFO](state, videoInfo) {
        state.videoInfo = videoInfo;
    },
    [types.SET_PLAYINFO](state, playInfo) {
        state.playInfo = playInfo;
    },
    [types.SET_TEACHINFO](state, techInfo) {
        state.techInfo = techInfo;
    },
    [types.SET_CLASSINFO](state, classInfo) {
        state.classInfo = classInfo;
    },
    [types.SET_USERINFO](state, userInfo) {
        state.userInfo = userInfo;
    },
    [types.SET_CLASSID](state, classId) {
        state.classId = classId;
    },
    [types.SET_VIDEOID](state, videoId) {
        state.videoId = videoId;
    },
    //zhibo
    [types.SET_ENTERROOM](state, enterRoom) {
        state.enterRoom = enterRoom;
    },
    [types.SET_ROOMINFO](state, roomInfo) {
        state.roomInfo = roomInfo;
    },
    [types.SET_TECHMSGLIST](state, techMsgList) {
        state.techMsgList = techMsgList;
    },
    [types.SET_USERMSGLIST](state, userMsgList) {
        state.userMsgList = userMsgList;
    },
    [types.SET_ROOMID](state, roomId) {
        state.roomId = roomId;
    },
    [types.SET_ROUTER](state, router) {
        state.router = router;
    },
    [types.SET_IDEN](state, iden) {
        state.iden = iden;
    }
};