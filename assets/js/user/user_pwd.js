$(function () {
    layui.form.verify({
        pwd: [/^\S{6,15}$/, '密码长度必须是6-15位的非空字符串'],
        samePwd: function (value) {
            if (value === $('[name="old_pwd"]').val()) {
                return '新旧密码不能相同!'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name="new_pwd"]').val()) {
                return '两次密码不一致！'
            }
        }
    });

    // 表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "patch",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                layui.layer.msg(res.message);
                $('.layui-form')[0].reset();
            }
        });
    })
})