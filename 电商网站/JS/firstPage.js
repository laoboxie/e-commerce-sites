window.onload=function(){

	if(typeof(firstPage_onload) != 'undefined'){
		firstPage_onload();
	}
	if(typeof(selectPage_onload) != 'undefined'){
		selectPage_onload();
	}
	if(typeof(goodIntroduce_onload) != 'undefined'){
		goodIntroduce_onload();
	}
	if(typeof(shoppingCart_onload) != 'undefined'){
		shoppingCart_onload();
	}

}



function firstPage_onload(){
	navigation();	//导航跳转页面
	list_items_show();	//绑定商品分类hover
	// alert("1");

	big_banner_show();	//绑定大banner图片切换的hover
	small_banner_show();	//绑定小banner图片切换的hover

	login_box_show();	//绑定登录点击事件


}
function navigation(){
	var header_nav_tab = document.getElementById('header_nav_tab');
	var lis = header_nav_tab.getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onclick=function(){
			var location;
			switch(this.index) {
				case 0: location = "firstPage.html";break;
				case 1: location = "productCategory.html";break;
				case 2: location = "selectPage.html";break;
				case 3: location = "goodIntroduce.html";break;
				case 4: location = "shoppingCart.html";break;
			}
			window.location.href=location;
			// for (var i = 0; i < lis.length; i++) {
			// 	lis[i].class="";
			// }
			// this.class="active";
		}
	}
}
function list_items_show(){
	var lists_item = document.getElementById('all_lists_items');
	var items = lists_item.getElementsByClassName('all_lists_item');
	
	for (var i = 0; i < items.length; i++) {
		items[i].onmouseover=function(){
			var detail_item = this.getElementsByClassName('shopClass_list')[0];
			detail_item.className="shopClass_list show";
		}
		items[i].onmouseout=function(){
			var detail_item = this.getElementsByClassName('shopClass_list')[0];
			detail_item.className="shopClass_list hide";
		}
	}
}
//banner图片切换 通用
function banner_img_switch(btns,show_area,img_width){
	for (var i = 0; i < btns.length; i++) {
		btns[i].index = i;
		btns[i].onmouseenter=function(){
			var left = -(this.index)*img_width;
			show_area.style.left = left+'px';
			for (var i = 0; i < btns.length; i++) {
				btns[i].className = "btn";
			}
			this.className = "btn active";
		}
	}
}
//获得大banner
function big_banner_show(){
	var big_banner = document.getElementById('big_banner');
	if(big_banner==undefined){
		return;
	}
	var btns = big_banner.getElementsByClassName('btn');
	var show_area = big_banner.getElementsByClassName('banner_imgs')[0];
	banner_img_switch(btns,show_area,811);
}
//获得小banner
function small_banner_show(){
	var good_show_area = document.getElementById('good_show');
	if(good_show_area==undefined){
		return;
	}
	var good_show_floor = good_show_area.getElementsByClassName('good_show_floor');
	for (var i = 0; i < good_show_floor.length; i++) {
		var banner_small = good_show_floor[i].getElementsByClassName('banner_small')[0];

		var btns = banner_small.getElementsByClassName('btn');
		var show_area = banner_small.getElementsByClassName('banner_imgs')[0];
		banner_img_switch(btns,show_area,190);
	}
}
function login_box_show(){	//显示登录盒子
	var login_link = document.getElementById('login_link');
	var mask = document.getElementById('mask');
	var login_box = document.getElementById('login_box');
	if( login_link==undefined ){
		return;
	}
	login_link.onclick=function(){
		mask.style.display="block";
		login_box.style.display="block";
		set_login_box_pos();
	}
	var login_close = document.getElementById('login_close');
	login_close.onclick=function(){
		mask.style.display="none";
		login_box.style.display="none";
	}
}
function set_login_box_pos(){	//设置登录盒子的位置
	var login_box = document.getElementById('login_box');
	var client_h = document.documentElement.clientHeight;
	var client_w = document.documentElement.clientWidth;
	var box_h = login_box.offsetHeight;
	var box_w = login_box.offsetWidth;
	login_box.style.top=client_h/2-box_h/2+"px";
	login_box.style.left=client_w/2-box_w/2+"px";
}



function get(id){
	if(id.substr(0,1)=='.'){
		return document.getElementsByClassName(id.substr(1));
	}else{
		return document.getElementById(id);
	}
}