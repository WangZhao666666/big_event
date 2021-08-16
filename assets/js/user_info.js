$(function () {
    // 表单验证
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间';
            }
        }
    });

    initUserInfo();

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.code === 0) {
                    // 表单快速赋值
                    layui.form.val('formUserInfo', res.data);
                }
            }
        });
    };

    // 表单重置事件
    $('.layui-form').on({
        'reset': function (e) {
            e.preventDefault();
            initUserInfo();
        },
        'submit': function (e) {
            e.preventDefault();
            $.ajax({
                type: "PUT",
                url: "/my/userinfo",
                data: $(this).serialize(),
                success: function (res) {
                    layui.layer.msg(res.message);
                    if (res.code === 0) {
                        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                        window.parent.getUserInfo();
                    }
                }
            });
        }
    })
})