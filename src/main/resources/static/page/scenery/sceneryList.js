layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#sceneryList',
        url : '/findAll',
        cellMinWidth : 95,
        page : true,
        height : "full-100",
        limit : 20,
        limits:[10,15,20,25],
        id : "sceneryListTable",
        cols:[[
            {type: 'checkbox', fixed:'left', },
            {type:'numbers',title:'序号'},
            {field: 'sceneryId', title: 'ID', width:80, align:"center"},
            {field: 'sceneryCity', title: '城市',width:80,align:"center"},
            {field: 'sceneryTitle', title: '标题',align:'center'},
            {field: 'sceneryIntroduce', title: '介绍',align:'center',hide:true},
            {field: 'sceneryPrice', title: '价格',width:120, align:'center'},
            {field: 'sceneryRoute', title: '路线', align:'center'},
            {title: '操作',  templet:'#sceneryOperate',width:120,fixed:"right",align:"center"}
        ]]
    });

    //添加景点
    function addScenery(){
        var index = layui.layer.open({
            title : "添加景点",
            type : 2,
            content : "addScenery.html",
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }


    $(".addScenery_btn").click(function(){
        addScenery();
    })


    //编辑景点
    function editScenery(edit){
        var index = layui.layer.open({
            title : "编辑",
            type : 2,
            content : "editScenery.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".sceneryId").val(edit.sceneryId);
                    body.find(".sceneryCity").val(edit.sceneryCity);
                    body.find(".sceneryTitle").val(edit.sceneryTitle);
                    body.find(".sceneryPrice").val(edit.sceneryPrice);
                    body.find(".sceneryRoute").val(edit.sceneryRoute);
                    body.find(".sceneryIntroduce").val(edit.sceneryIntroduce);

                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回景点列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }

    //列表操作
    table.on('tool(sceneryList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑

            editScenery(data);

        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此景点？',{icon:3, title:'提示信息'},function(index){
                $.post("/deleteSceneryById",{
                    id : data.sceneryId  //将需要删除的newsId作为参数传入
                },function(data){
                    // tableIns.reload();
                    layer.close(index);
                    layer.msg("权限不够！");

                })
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });


})