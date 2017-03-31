// (function(){
// 	if ( typeof(document.addEventListener) != "undefined" ) { 
// 		document.addEventListener("load",select_box,true); 
// 	} else { 
// 		document.attachEvent("onload",select_box); 
// 	}
// })();
function selectPage_onload(){
	select_more();
	//点击绑定函数
	select_item("pinpai");
	select_item("chicun");
	select_item("wangluo");

	select_address();
}
function select_more(){
	//品牌选择 更多选项
	var pinpai = get('pinpai');
	var more = get('.select_more')[0];
	more.onclick =function(){
		if (more.getAttribute("flag")=="1") {
			pinpai.style.height="auto";
			more.setAttribute("flag","0");
		}else {
			pinpai.style.height="23px";
			more.setAttribute("flag","1");
		}
	}
}
function select_item(parentId){	//选择框选择子项
	//点击子项
	var parent = document.getElementById(parentId);
	var select_cont = parent.getElementsByClassName("select_cont")[0];
	var items = select_cont.getElementsByTagName('a');
	var no_limit = parent.getElementsByClassName("no_limit")[0];
	var no_limit_a = no_limit.getElementsByTagName('a')[0];
	//点击子项
	for (var i = 0; i < items.length; i++) {
		items[i].onclick=function(){
			//激活子项
			for (var j = 0; j < items.length; j++) {
				items[j].className="";
			}
			this.className="active";
			//取消不限
			no_limit_a.className = "";
		}
	}
	//点击不限
	no_limit_a.onclick=function(){
		for (var k = 0; k < items.length; k++) {
			items[k].className="";
		}
		this.className="active";
	}

}

function select_address(){
	var add_box = get("address_box");
	var text_cont = document.getElementById("text_cont");
	var add_selection = add_box.getElementsByClassName("address_selection")[0];
	var add_items = add_selection.getElementsByTagName("span");
	add_box.onmouseover=function(){
		add_selection.style.display="block";
	}
	add_box.onmouseout=function(){
		add_selection.style.display="none";
	}
	for (var i = 0; i < add_items.length; i++) {
		add_items[i].onclick=function(){
			text_cont.innerHTML="深圳市 "+this.innerHTML;
			add_selection.style.display="none";
		}
	}


}

