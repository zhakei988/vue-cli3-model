// JavaScript Document
function showBox(idname){
    var isIE = (document.all) ? true : false;
    //var isIE6 = isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);
    var isIE6 = isIE && ([/MSIE (\d+)\.0/i.exec(navigator.userAgent)][0][1] == 6); //¼æÈÝie10£¬IE10²»Ö§³Ö¼ì²âIE6µÄ´úÂë
	var newbox=document.getElementById(idname);
	newbox.style.zIndex = "8999";
	newbox.style.display="block";
	if(!isIE6){
		var mt,ml,t,l;
		mt = ($(window).height()-newbox.offsetHeight) / 2 + "px";
		ml = ($(window).width()-newbox.offsetWidth) / 2 + "px";
		
	    $("#"+idname).css({marginLeft:ml,marginTop:0,left:0,top:0,opacity:"0"});
		$("#"+idname).animate({marginLeft:ml,marginTop:mt,left:l,opacity:"1"},500)

	}
	var lay_l=$("#layer").length;
	var layer=$("#layer");
	if(lay_l==0){
	 layer=$("<div/>");
	 layer.attr("id","layer");
	 layer.css({"width":"100%","height":"100%","top":"0","left":"0"});
	 layer.css("position",function(){return !isIE6 ? "fixed": "absolute"});
	 layer.appendTo("body");
	 ishaslayer=true;
	}
	layer.css({"background":"#000","z-Index":"8998","opacity":"0.7","display":""})
	var sel = document.getElementsByTagName("select");
	for (var i = 0; i < sel.length; i++) {
		sel[i].style.visibility = "hidden";
	}
	var nowsel=newbox.getElementsByTagName("select");
	for (var i = 0; i < nowsel.length; i++) {
		nowsel[i].style.visibility = "visible";
	}
	function layer_iestyle() {
		layer.style.width = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
		layer.style.height = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
	}
	if (isIE) {
		layer.style.filter = "alpha(opacity=70)";
	}
	if (isIE6) {
		layer_iestyle();
		window.attachEvent("onresize", layer_iestyle)
	}
}
function closeBox(boxId){
	$("#"+boxId).animate({marginTop:"0",top:"-50%",opacity:"0"},300,function(){
		$(this).hide();
		if($("#layer").length>0){
			$("#layer").hide();
		}
	})
	
	//newbox.style.display = "none";
	var sel = document.getElementsByTagName("select");
	for (var i = 0; i < sel.length; i++) {
		sel[i].style.visibility = "visible";
	}
}