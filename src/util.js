export default {
  install(Vue)
  {
    Vue.prototype.getUrlParam=function(string){  
        //构造一个含有目标参数的正则表达式对象  
        var reg = new RegExp("(^|&)"+ string +"=([^&]*)(&|$)");  
        //匹配目标参数  
        var r = window.location.search.substr(1).match(reg);  
        //返回参数值  
        if (r!=null) return unescape(r[2]);
        return null;  
    }
    Vue.prototype.getData = function (url,fn,data) {
      data=typeof(data)=='undefined'?{}:data;
      this.$http({
        url:url,
        method:'jsonp',
        params:data,
        jsonp:'callback',
        'emulateJSON':true,
      }).then((response) => {
          fn&&fn(response.body)
        }, (response) => {
          // 响应错误回调
          console.log('getData err:'+response)
        });
    }
    Vue.prototype.setImgHttps=function(type,url){
      var imgurl = null;
      switch (type) {
        case 'logotool':
        imgurl=url&&url.indexOf('.tool')>-1? 'https://logotool'+ url.split('.tool')[1]:url;
          break;
      
        default:
          break;
      }
      return imgurl
    }
    Vue.prototype.setHttps=function(url){
      if(url&&url!=null&&url.indexOf('//')>0)
      {
        return '//'+url.split('//')[1]
      }else
      {
        return url
      } 
    }
    Vue.prototype.isHttps = function(){
      return document.location.protocol=='https:'?true:false;
    }
    Vue.prototype.isTest = function (text) {
      var istest=window.location.href.indexOf('pro')<0&&window.location.href.indexOf('test')>-1?true:false;
      var testlist={
        'undefined':istest,
        'test':istest?'test':'',
        'test-':istest?'test-':'',
        'test.':istest?'test.':'',
      }
      if(typeof(testlist[text])=='undefined')
      {
        return istest;
      }else if(typeof(testlist[text])=='function')
      {
        return testlist[text]();
      }else
      {
        return testlist[text];
      }
    }
    Vue.prototype.apilist = function(name){
        var api={
          'undefined':'',
          //跳转链接
          goplay:'http://'+this.isTest('test')+'lesson.homeway.com.cn/play/',
          godetail:'http://'+(this.isTest()?'testcaidao':'www')+'.homeway.com.cn/',
          gozhibo:'http://'+this.isTest('test')+'zhibo.homeway.com.cn/',
          //其他
          isLogin:'https://regtool.hexun.com/wapreg/checklogin.aspx?format=json&encode=no',//登录信息
          isBinPhone:'https://regtool.hexun.com/wapreg/checkbindmobile.aspx',//验证手机号
          //直播室
          zbGiftProductInfo:'https://'+this.isTest('test')+'apizhibo.hexun.com/api/room/get_gift_product_info?platform=web&productId=18005',//获取礼物信息
          zbEnterRoom:'https://'+this.isTest('test')+'apizhibo.hexun.com/api/room/enter_room',//直播室页面配置信息
          zbUsersMessages:'https://'+this.isTest('test')+'apizhibo.hexun.com/api/room/get_users_messages',//直播室右侧信息初始列表
          zbAllMessages:'https://'+this.isTest('test')+'apizhibo.hexun.com/api/room/get_room_all_messages',//直播室全部信息初始列表
          sendMessage:'https://'+this.isTest('test')+'apizhibo.hexun.com/api/room/send_message',//发送消息
          novip:'https://'+this.isTest('test')+'apizhibo.hexun.com/api/room/get_room_prices',//未付费用户显示购买
          payurl:'http://'+this.isTest('test-')+'order.homeway.com.cn/order/web/product?fromhost=liveclass&belong=peixunpt',//购买链接
          grouppayurl:'http://'+this.isTest('test-')+'order.homeway.com.cn/order/web/package?fromhost=liveclass&belong=peixunpt',//购买链接
          getPlay:'https://'+this.isTest('test')+'apilesson.hexun.com/play/classextends/',//获取直播室id
          //课程
          classauth:'https://'+this.isTest('test')+'apilesson.hexun.com/api/classauth/',//课程详情
          classpack:'https://'+this.isTest('test')+'apilesson.hexun.com/classpack/classpack/',//套课列表
          classlist:'https://'+this.isTest('test')+'apilesson.hexun.com/classpack/sectionpack/',//点播课列表
          openlist:'https://'+this.isTest('test')+'apilesson.hexun.com/play/openclasslist/',//回顾课列表
          historylist:'https://'+this.isTest('test')+'apilesson.hexun.com/videohistory/classhistorylist/',//历史回顾列表
          classfile:'https://'+this.isTest('test')+'apilesson.hexun.com/classfile/download',//获取下载地址
          videoPlay:'https://'+this.isTest('test')+'apilesson.hexun.com/api/video/',//获取回顾播放地址
          isLiveIng:'https://'+this.isTest('test')+'apilesson.hexun.com/play/classurl',//是否直播是否在线 classId
          classPrice:'https://'+this.isTest('test')+'apilesson.hexun.com/api/strategy/',//课程价格
          relatedclass:'https://'+this.isTest('test')+'apilesson.hexun.com/play/relatedclass?pageSize=10',//相关课程 ：teacherId=XXX
          isFavorite:'https://'+this.isTest('test')+'apicaidao.hexun.com/favorites/isfavorite/',//获取是否收藏了课程 :productType/:productId 课程类型/课程产品id
          cancleFavorite:'https://'+this.isTest('test')+'apicaidao.hexun.com/favorites/cancle/',//取消收藏课程 :productType/:productId 课程类型/课程产品id
          addFavorite:'https://'+this.isTest('test')+'apicaidao.hexun.com/favorites/add/',//添加收藏课程 :productType/:productId 课程类型/课程产品id
          article:'https://'+this.isTest('test')+'apicaidao.hexun.com/article/teacherId/1/3?columnId=0',//相关文章 ：teacherId=XXX 第一页显示3条
          dykc:'https://'+this.isTest('test')+'apicaidao.hexun.com/recommendposition/tag?positiontag=pxkc-xqy-wntj&page=1&pagesize=10',//订阅推荐课程
          dyphb:'https://'+this.isTest('test')+'apicaidao.hexun.com/recommendposition/tag?positiontag=pxkc-xqy-rbbd&page=1&pagesize=3',//订阅推荐排行榜
          isappment:'https://'+this.isTest('test')+'apilesson.hexun.com/appointment/status/',//是否预约
          appment:'https://'+this.isTest('test')+'apilesson.hexun.com/appointment/',//是否预约
          videohistory:'https://'+this.isTest('test')+'apilesson.hexun.com/videohistory/detail/',//回顾或者试听
          newhistory:'https://'+this.isTest('test')+'apilesson.hexun.com/videohistory/newestvideo/',//获取最新的一条回顾
          //老师
          techInfo:'https://'+this.isTest('test')+'partner.hexun.com/api/partner/get_partnershow_info',//合作者详情
          fans:'https://'+this.isTest('test')+'followzq.hexun.com/relation/getrelationinfo.do?source=2',//粉丝
          isFolow:'https://'+this.isTest('test')+'followzq.hexun.com/relation/isattention.do?source=2',//是否关注
          Folow:'https://'+this.isTest('test')+'followzq.hexun.com/relation/add.do?source=2',//关注
          canlFolow:'https://'+this.isTest('test')+'followzq.hexun.com/relation/cancel.do?source=2',//取关
        }
        return api[name]
    }
    Vue.prototype.othclick = function(){
      var _this=this;
      $(document).click(
        function(e){
          function isfo(obj){
            if($(e.target).parents("."+obj).length==0&&$(e.target).hasClass(obj)!=true)
            {
                return true;
            }else
            {
                return false;
            }
          }
          try {
            isfo('bf-gif-box')?_this.$refs.LiveRoom.gift.boxshow=false:'';
            isfo('editlay')&&isfo('reply')?_this.$refs.LiveRoom.LiveRoomResize():'';
          } catch (error) {
            console.log(error)
          }
      })
    }
    Vue.prototype.dateformat = function(t){
      if(typeof(t)=='undefined')
      {
        t=new Date()
      }else
      {
        t.replace(/-/ig,'/')
        t=new Date(t)
      }
        var n=t.getFullYear(),
        y=(t.getMonth() + 1)<10?'0'+(t.getMonth() + 1):(t.getMonth() + 1),
        r=t.getDate()<10?'0'+t.getDate():t.getDate(),
        nt=n+'-'+y+'-'+r;
        return nt;   
    }
    Vue.prototype.numToChinese = function(num) {
        var N = [
            "零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"
        ];
        var str = num.toString();
        var len = num.toString().length;
        var C_Num = [];
        for (var i = 0; i < len; i++) {
            C_Num.push(N[str.charAt(i)]);
        }
        return C_Num.join('');
    }
    Vue.prototype.isIe = function(){
      var theUA = window.navigator.userAgent.toLowerCase();
      if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        return ieVersion;
      }
    }
    Vue.prototype.$vue={
      console(txt){
        console.log(txt)
      },
      alert:{
        show(opt){
          
          // title: 'Vux is Cool',
          // content: 'Do you agree?',
          opt.onshow=function(fn){
  
          }
          opt.onhide=function(fn){
  
          }
        },
        hide(){
  
        }
      },
      confirm:{

      }
    }
  }
}