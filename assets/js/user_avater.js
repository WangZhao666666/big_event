$(function () {
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $('#image').cropper(options);

    // 上传按钮点击事件
    $('#btnChoose').on('click', function () {
        $('#file').click();
    });

    // 文件选择框选择文件事件
    $('#file').on('change', function (e) {
        if (e.target.files.length > 0) {
            // 拿到用户选择的文件
            let file = e.target.files[0];
            // 根据选择的文件，创建一个对应的 URL 地址
            let ImgURL = URL.createObjectURL(file);
            // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
            $('#image')
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', ImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        } else {
            layui.layer.msg('请选择要上传的图片');
        }
    });

    // 上传确定按钮点击事件
    $('#btnUpload').on('click', function () {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        let dataURL = $('#image')
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: "PATCH",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                layui.layer.msg(res.message);
                if (res.code === 0) {
                    window.parent.getUserInfo();
                }
            }
        });
    })
})