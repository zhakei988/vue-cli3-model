export default {
    //lesson
    getHisList(vm,id){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('historylist')+id,function(a){
                resolve(a);
            },{showclassfile:true})
        })
    },
    getOpenList(vm,id){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('openlist')+id,function(a){
                resolve(a);
            },{showmakeorder:true})
        })
    },
    getVideoHistory(vm,id){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('videohistory')+id,function(a){
                resolve(a);
            })
        })
    },
    getIsAppMent(vm,id){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('isappment')+id,function(a){
                resolve(a);
            })
        })
    },
    getAppMent(vm,id){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('appment')+id,function(a){
                resolve(a);
            })
        })
    },
    getLogInfo(vm){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('isLogin'),function(a){
                resolve(a);
            })
        })
    },
    getRoomId(vm){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('getPlay')+_this.classId,function(a){
                resolve(a);
            })
        })
    },
    getClsAuth(vm,cid){
        return new Promise((resolve, reject) => {
            let _this=vm;
            let id = typeof cid =='undefined'?_this.classId:cid;
            _this.getData(_this.apilist('classauth')+id,function(a){
                resolve(a);
            },{showclassplan:true,showteacher:true,showprice:true})
        })
    },
    getClassPrice(vm,prid){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('classPrice')+prid,function(a){
                resolve(a);
            },{showclassplan:true})
        })
    },
    getTeachInfo(vm,tid){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('techInfo'),function(a){
                resolve(a);
            },{partnerId:tid})
        })
    },
    //zhibo
    getEnterRoom(vm){
        return new Promise((resolve, reject) => {
            var _this=vm;
            _this.getData(_this.apilist('zbEnterRoom'),function(a){
                resolve(a);
            },{roomId:_this.roomId})
        })
    },
    getRoomInfo(vm)
    {
        var _this=vm;
        return new Promise((resolve, reject) => {
            _this.getData(_this.apilist('zbRoomInfo'),function(a){
                resolve(a);
            },{roomId:_this.roomId})
        })
    },
    getTechMsgList(vm)
    {
        var _this=vm;
        return new Promise((resolve, reject) => {
            _this.getData(_this.apilist('zbTeachMessages'),function(a){
                resolve(a);
            },{roomId:_this.roomId})
        })
    },

};