$(function () {
    getUserInfo();

    // 退出按钮点击事件
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1.清空localStorage中的token
            localStorage.removeItem('token');
            // 2.跳转到login页面
            location.href = '../../login.html';
            // 3.关闭询问框
            layer.close(index);
        });
    })

    // 获取用户信息
    function getUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.code === 0) {
                    // 渲染头像
                    console.log(res);
                    renderAvatar(res.data);
                } else {
                    layui.layer.msg(res.message);
                }
            }
        });
    };
    // 渲染头像和欢迎文本
    function renderAvatar(user) {
        // 1. 获取用户的名称(如果有昵称则使用昵称没有昵称使用用户名)
        let name = user.nickname || user.username;
        // 2. 设置欢迎的文本
        $('#welcome').html(`欢迎您&nbsp;&nbsp;${name}`);
        // 3.设置头像(如果有头像则设置头像,没有头像显示文本头像)
        if (user.user_pic) {
            $('.layui-nav-img').prop('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            $('.text-avatar').html(name[0].toUpperCase()).show();
            $('.layui-nav-img').hide();
        }
    }
})