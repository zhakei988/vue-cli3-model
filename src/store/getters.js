//lesson
export const playInfo = (state) => {
    return state.playInfo
}
export const techInfo = (state) => {
    return state.techInfo
}
export const classInfo = (state) => {
    return state.classInfo
}
export const userInfo = (state) => {
    return state.userInfo
}
export const classId = (state) => {
    return state.classId
}
export const videoId = (state) => {
    return state.videoId
}
export const videoInfo = (state) => {
    return state.videoInfo
}
//zhibo
export const enterRoom = (state) => {
    return state.enterRoom;
}
export const roomInfo = (state) => {
    return state.roomInfo
}
export const techMsgList = (state) => {
    return state.techMsgList;
}
export const userMsgList = (state) => {
    return state.userMsgList
}
export const roomId = (state) => {
    return state.roomId
}
export const router = (state) => {
    return state.router
}
export const iden = (state) => {
    return state.iden
}
export const teachInfo = (state) => {
    return state.teachInfo
}
export const other = (state) => {
    return `other:${state}`;
}