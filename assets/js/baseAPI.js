// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = `http://www.liulongbin.top:3008${options.url}`;
  // 在发起请求之前,统一设置complete函数
  options.complete = function (res) {
    if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1. 强制清空 token
      localStorage.removeItem('token');
      // 2. 强制跳转到登录页面
      location.href = '../../login.html';
    }
  };
  // 如果url中包含my说明与权限相关,统一设置header
  if (options.url.indexOf('/my/') >= 0) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    };
  };
})