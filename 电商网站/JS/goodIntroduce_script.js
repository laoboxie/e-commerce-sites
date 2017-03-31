// (function(){
// 	if ( typeof(document.addEventListener) != "undefined" ) { 
// 		document.addEventListener("load",select_box,true); 
// 	} else { 
// 		document.attachEvent("onload",select_box); 
// 	}
// })();

function goodIntroduce_onload(){
	//地址选择
	select_address();
	//颜色选择
	selection("color_select","color_selected");
	//版本选择
	selection("banben_select","banben_selected");
	//数量选择
	num_selection();

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

function selection(parentId,textId){
	var wrap = get(parentId);
	var items = wrap.getElementsByTagName("a");
	for (var i = 0; i < items.length; i++) {
		items[i].onclick=function(){
			for (var i = 0; i < items.length; i++) {
				items[i].className="";
			}
			this.className="active";
			var text = get(textId);
			text.innerHTML=this.innerHTML;
		}
	}
}

function num_selection(){
	var reduce_btn = get("num_reduce");
	var increase_btn = get("num_increase");
	var num_text = get("num_text");
	reduce_btn.onclick=function(){
		var num = parseInt(num_text.value);
		if (num>1) {
			num--;
			num_text.value=num;
			
		}else{
			alert("最低选择1件");
		}
	}
	increase_btn.onclick=function(){
		var num = parseInt(num_text.value);
		if (num<9) {
			num++;
			num_text.value=num;
		}else {
			alert("限购9件");
		}
	}

}