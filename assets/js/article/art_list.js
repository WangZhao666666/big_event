$(function () {
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    let q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    };

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    initTable();
    initCate();

    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.code === 0) {
                    // 使用模板引擎渲染页面的数据
                    let htmlStr = template('tpl-table', res);
                    $('tbody').html(htmlStr);
                    renderPage(res.total);
                } else {
                    layer.msg(res.message);
                }
            }
        });
    };

    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success: function (res) {
                if (res.code === 0) {
                    // 调用模板引擎渲染分类的可选项
                    var htmlStr = template('tpl-cate', res);
                    $('[name=cate_id]').html(htmlStr);
                    // 通过 layui 重新渲染表单区域的UI结构
                    layui.form.render();
                } else {
                    layer.msg('获取分类数据失败！');
                }
            }
        });
    };

    // 筛选表单提交事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = $('[name=cate_id]').val();
        q.state = $('[name=state]').val();
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    });

    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        layui.laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            // 自定义分页的功能项(前后顺序很重要),limits表示每页条数下拉框默认10条
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            // 设置每页条数下拉框的值
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            jump: function (obj, first) {
                if (!first) {
                    // 把最新的页码值，赋值到 q 这个查询参数对象中
                    q.pagenum = obj.curr;
                    // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                    q.pagesize = obj.limit
                    initTable();
                }
            }
        });
    };
})