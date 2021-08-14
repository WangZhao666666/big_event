$(function () {
    // 去注册点击事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 自定义表单的校验规则
    layui.form.verify({
        uname: [/^[a-zA-Z0-9]{1,10}$/, '用户名必须是1-10位字母和数字'],
        pwd: [/^\S{6,15}$/, '密码长度必须是6-15位的非空字符串'],
        repwd: function (value) {
            if (value !== $('.reg-box [name="password"]').val()) {
                return '两次密码不一致！'
            }
        }
    });

    // 注册表单提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/api/reg',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.code === 0) {
                    //注册成功
                    $('#form-login')[0].reset();
                    layui.layer.msg('注册成功,请登录');
                    $('#link_login').click();
                } else {
                    layui.layer.msg(res.message);
                }
            }
        });
    });

    // 登录表单提交事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.code === 0) {
                    //登录成功
                    localStorage.setItem('username', $('.login-box [name="username"]').val());
                    localStorage.setItem('token', res.token);
                    location.href = '../../index.html';
                } else {
                    layui.layer.msg(res.message);
                }
            }
        });
    });
})