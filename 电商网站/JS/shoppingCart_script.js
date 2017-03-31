
function shoppingCart_onload(){
	shopping_cart();
}

function shopping_cart(){

	var cartTable = get("cartTable");
	var tbody = document.getElementsByTagName('tbody')[0];
	var tr = tbody.getElementsByTagName('tr');
	var checkall = get(".check-all");
	var checkboxs = get(".checkbox");
	var price = get(".price");
	var count = get(".count");
	//为数量增减 删除商品 绑定事件处理
	for (var i = 0; i < tr.length; i++) {
		tr[i].onclick=function(e){
			e = e || window.event;
			var el = e.srcElement;
			var cls = el.className;
			var num_input = this.getElementsByTagName("input")[1];
			var num = parseInt(num_input.value);
			var reduce = this.getElementsByTagName("span")[1];
			switch(cls) {
				case "reduce":
					num = Math.max(--num,1);
					num_input.value = num;
					if(num<=1){
						reduce.innerHTML="";
					}
					getsubtotal(this);
					break;
				case "add":
					num_input.value = ++num;
					if(num>=2){
						reduce.innerHTML="-";
					}
					getsubtotal(this);
					break;
				case "delete":
					var conf = confirm("确定不要我了吗?=\=")
					if(conf){
						this.parentNode.removeChild(this);
					}
					break;
			}
			gettotal();
			console.log('test');
		}
		//键盘输入数量
		var keyput = tr[i].getElementsByTagName('input')[1];
		keyput.onkeyup = function(){
			var thistr = this.parentNode.parentNode;
			var reduce = thistr.getElementsByTagName('span')[1];
			var val = parseInt(this.value);
			if(isNaN(val) || val<1){
				val = 1;
			}
			this.value = val;
			if(val==1){
				 reduce.innerHTML = '';
			}else {
				reduce.innerHTML = '-';
			}
			getsubtotal(thistr);
			gettotal();
			
		}
	}
	//为小计做处理
	function getsubtotal(ele){
		var tds = ele.cells;
		var price = parseFloat(tds[2].innerHTML);
		var amount = parseFloat(tds[3].getElementsByTagName('input')[0].value);
		var subtotal = parseFloat(price*amount);
		subtotal = subtotal.toFixed(2);
		tds[4].innerHTML = subtotal;
		return subtotal;
	}
	//全选
	for(var i=0;i<checkall.length;i++){
		checkall[i].onclick=function(){
			var trs = document.getElementsByTagName('tbody')[0].rows;
			for(var j=0;j<trs.length;j++){
				checkboxs[j].getElementsByTagName('input')[0].checked=this.checked;
			}
			checkall[0].checked=checkall[1].checked=this.checked;
			gettotal();
		}
	}
	//合计
	function gettotal(){
		var trs = document.getElementsByTagName('tbody')[0].rows;
		var goodnum=0,total=0;
		var HTMLstr="";
		for (var i = 0; i < trs.length; i++) {
			var ifchecked = trs[i].getElementsByTagName('input')[0].checked;
			if(ifchecked){
				total += parseFloat(trs[i].cells[4].innerHTML);
				var nums = trs[i].getElementsByTagName('input')[1].value;
				goodnum += parseInt(nums);
				HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>';
			}
		}
		total = total.toFixed(2);
		get("priceTotal").innerHTML = total;
		get("selectedTotal").innerHTML = goodnum;
		get("selectedViewList").innerHTML = HTMLstr;
	}
	//底部删除按钮
	get("deleteAll").onclick=function(){
		var trs = document.getElementsByTagName('tbody')[0].rows;
		for (var i = 0; i < trs.length; i++) {
			var ifchecked = trs[i].getElementsByTagName('input')[0].checked;
			if(ifchecked){
				trs[i].parentNode.removeChild(trs[i]);
				i--;
			}
		}
		gettotal();
	}
	//已选商品展示
	get("selected").onclick=function(){
		var foot = get('foot');
		var selectedTotal = get("selectedTotal");
		if (foot.className == 'foot') {
		    if (selectedTotal.innerHTML != '0') {
		        foot.className = 'foot show';
		    }
		}
		else {
		    foot.className = 'foot';
		}
	}
	//代理展示中的取消选择事件
	get("selectedViewList").onclick=function(e){
		var e = e || window.event;
		var elesrc = e.srcElement;
		if(elesrc.className == 'del'){
			var n = elesrc.getAttribute('index');
			var inputone = checkboxs[n].getElementsByTagName('input')[0];
			inputone.checked=false;
			elesrc.parentNode.removeChild(elesrc);
			inputone.onchange();
		}
		gettotal();

				//没有商品倍选中时隐藏
		var selectedTotal = get("selectedTotal");
		var foot = get('foot');
		if (selectedTotal.innerHTML == '0') {
		    foot.className = 'foot';
		}
	}
	//checkbox的onchange事件
	var check_one = get(".check-one");
	for(var i=0;i<check_one.length;i++){
		check_one[i].onchange=function(){
			var checkednum=0;
			if (!this.checked) {
				checkall[0].checked=checkall[1].checked=false;
			} else{
				for(var j=0;j<check_one.length;j++){
					if(check_one[j].checked){
						checkednum++;
					}else{
						break;
					}
				}
			}
			if (checkednum==check_one.length) {
				checkall[0].checked=checkall[1].checked=true;
			}
		}
	}
	checkall[0].checked=true;
	checkall[0].onclick();
}

