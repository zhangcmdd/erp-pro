
var rowId = "";

//单据的时间
var operTime = "";

layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form', 'laydate'], function (exports) {
    winui.renderColor();

    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table;
        
    //初始化统计时间
	operTime = getOneYMFormatDate();
	
	//获取本月日期
	function getOneYMFormatDate(){
		 var date = new Date;
		 var year = date.getFullYear(); 
		 var month = date.getMonth() + 1;
		 month = (month < 10 ? "0" + month : month); 
		 return year.toString() + "-" + month.toString();
	}
	
    laydate.render({
		elem: '#operTime', //指定元素
		type: 'month',
		value: operTime
	});
	
	initTable();
	function initTable(){
	    //表格渲染
	    table.render({
	        id: 'messageTable',
	        elem: '#messageTable',
	        method: 'post',
	        url: reqBasePath + 'statistics008',
	        where: {materialName: $("#materialName").val(), operTime: operTime},
	        even: true,  //隔行变色
	        page: true,
	        limits: [8, 16, 24, 32, 40, 48, 56],
	        limit: 8,
	        cols: [[
	            { title: '序号', type: 'numbers'},
	            { field: 'materialName', title: '产品名称', align: 'left', width: 250},
			    { field: 'model', title: '型号', align: 'left', width: 100},
			    { field: 'firstTypeName', title: '一级类型', align: 'left', width: 100},
			    { field: 'secondTypeName', title: '二级类型', align: 'left', width: 100},
	            { field: 'unitName', title: '单位', align: 'left', width: 80},
	            { field: 'currentTock', title: '出库数量', align: 'left', width: 100},
	            { field: 'currentTockMoney', title: '出库金额', align: 'left', width: 120}
	        ]]
	    });
	    form.render();
	}
	
    //搜索表单
    form.on('submit(formSearch)', function (data) {
        //表单验证
        if (winui.verifyForm(data.elem)) {
            loadTable();
        }
        return false;
    });

    $("body").on("click", "#reloadTable", function() {
        loadTable();
    });

    $("body").on("click", "#formSearch", function () {
        refreshTable();
    })
    
    //刷新
    function loadTable(){
    	if(isNull($("#operTime").val())){//一定要记得，当createTime为空时
    		winui.window.msg("请选择日期.", {icon: 2,time: 2000});
    	}else {
    		operTime = $("#operTime").val();
	        table.reload("messageTable", {where:{materialName: $("#materialName").val(), operTime: operTime}});
    	}
    }

    //搜索
    function refreshTable(){
    	if(isNull($("#operTime").val())){//一定要记得，当createTime为空时
    		winui.window.msg("请选择日期.", {icon: 2,time: 2000});
    	}else {
    		operTime = $("#operTime").val();
	        table.reload("messageTable", {page: {curr: 1}, where:{materialName: $("#materialName").val(), operTime: operTime}})
    	}
    }

    exports('incomingstatistics', {});
});
