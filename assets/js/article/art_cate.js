$(function () {

    initArtCateList();

    //初始化列表
    function initArtCateList() {
        //
        $.ajax({
            type: "GET",
            url: "/my/cate/list",
            success: function (res) {
                if (res.code === 0) {
                    let htmlStr = template('tpl', res);
                    $('tbody').html(htmlStr);
                } else {
                    layui.layer.msg(res.message);
                }
            }
        });
    };

    let dialog = null;

    // 添加类别按钮点击事件
    $('#btnAddCate').on('click', function () {
        dialog = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    });
    // 添加弹出框提交事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/cate/add',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code === 0) {
                    initArtCateList();
                    // 根据索引，关闭对应的弹出层
                    layui.layer.close(dialog);
                }
                layui.layer.msg(res.message);
            }
        });
    });

    $('tbody').on('click', '.btnEdit', function () {
        dialog = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        $.ajax({
            type: "GET",
            url: "/my/cate/info?id=" + this.dataset.id,
            success: function (res) {
                if (res.code === 0) {
                    layui.form.val('form-edit', res.data);
                }
            }
        });
    });

    // 修改分类弹出层提交事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'PUT',
            url: '/my/cate/info',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code === 0) {
                    initArtCateList();
                    // 根据索引，关闭对应的弹出层
                    layui.layer.close(dialog);
                }
                layui.layer.msg(res.message);
            }
        });
    });

    // 删除按钮点击事件
    $('tbody').on('click', '.btnDel', function () {
        let id = this.dataset.id;
        layer.confirm('确认删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: "delete",
                url: "/my/cate/del?id=" + id,
                success: function (res) {
                    if (res.code === 0) {
                        initArtCateList();
                    }
                    layer.msg(res.message);
                }
            });

            layer.close(index);
        });
    });
})