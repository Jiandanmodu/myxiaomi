$(function() {
    /*头部导航数据加载*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/nav',
        success: function(data) {
            var navArr = JSON.parse(data);
            for (var i = 0; i < navArr.length; i++) {
                var result = '<li class="nav-item" nav-type="' + navArr[i].type + '"><a href="#">' + navArr[i].name + '</a></li>'
                $('.nav-list').append(result);
            }
        }
    });
    /*搜索框获得焦点事件*/
    $('.search-input').focus(function() {
        /*边框样式变化*/
        $('.search-input').css('border-color', '#ff6700');
        $('.search-btn').css('border-color', '#ff6700');
        /*搜索选项变化*/
        $('.search-list').css('opacity', '0');
        /*搜索结果出现*/
        $('.search-result').css('display', 'block');
    });
    /*搜索框失去焦点事件*/
    $('.search-input').blur(function() {
        /*边框样式变化*/
        $('.search-input').css('border-color', '#ccc');
        $('.search-btn').css('border-color', '#ccc');
        /*搜索选项变化*/
        $('.search-list').css('opacity', '1');
        /*搜索结果消失*/
        $('.search-result').css('display', 'none');
    });
    /*搜索按钮移入事件*/
    $('.search-btn').mouseover(function() {
        $(this).css('background-color', '#ff6700');
        $(this).css('color', '#fff');
    });
    /*搜索按钮移出事件*/
    $('.search-btn').mouseout(function() {
        $(this).css('background-color', '#fff');
        $(this).css('color', '#000');
    });
    /*导航栏下拉框事件*/
    $('.nav-list').on('mouseover', 'a', function() {
        /*获取当前type值*/
        var currentType = $(this).parent().attr('nav-type');
        /*最后两个触发不执行*/
        if (currentType == $('.nav-item').last().attr('nav-type')) {
            return;
        } else {
            /*显示下拉栏*/
            $('.navs-menus').stop().slideDown();
        }
        /*先清空ul中的内容*/
        $('.menus-list').html('');
        /*根据type值获取对应数据*/
        // imgUrl - name - price - sourcePath
        $.ajax({
            url: 'http://127.0.0.1:9900/api/nav',
            data: {
                type: currentType
            },
            success: function(data) {
                var menuArr = JSON.parse(data);
                for (var i = 0; i < menuArr.length; i++) {
                    // console.log(menuArr[i]);
                    /*渲染页面*/
                    var menuItem = '<li class="menu-item">';
                    menuItem += '<a href="' + menuArr[i].sourcePath + '">';
                    menuItem += '<img src="' + menuArr[i].imgUrl + '" alt=""></a>';
                    menuItem += '<span>' + menuArr[i].name + '</span>';
                    menuItem += '<span>' + menuArr[i].price + '</span>';
                    menuItem += '</li>'
                    $('.menus-list').append(menuItem);
                }

            }
        });
    });
    $('.nav-list').mouseout(function() {
        $('.navs-menus').stop().slideUp();
    });
    /*导航栏下拉框移入事件*/
    /*显示下拉栏*/
    $('.navs-menus').mouseover(function() {
        $('.navs-menus').stop().slideDown();
    });
    /*隐藏下拉栏*/
    $('.navs-menus').mouseout(function() {
        $('.navs-menus').stop().slideUp();
    });
    /*右侧分类导航数据加载*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/items',
        success: function(data) {
            var sidebarArr = JSON.parse(data);
            // console.log(JSON.parse(data));
            for (var i = 0; i < sidebarArr.length; i++) {
                var sidebarItem = '<li class="sidebar-item" sidebar-type="' + sidebarArr[i].type + '">' + sidebarArr[i].content + '</li>';
                $('.sidebar-list').append(sidebarItem);
            };
        }
    });
    /*右侧导航栏鼠标移入事件*/
    $('.banner').on('mouseover', '.sidebar-item', function() {
        /*每次移入清空展开栏的内容*/
        $('.spread-list').html('');
        /*改变当前颜色*/
        $(this).css('background', 'rgba(255,103,0,1)');
        /*获取type值*/
        var currentType = $(this).attr('sidebar-type');
        /*左侧导航栏展开数据加载*/
        $.ajax({
            url: 'http://127.0.0.1:9900/api/items',
            data: {
                type: currentType
            },
            success: function(data) {
                var spreadArr = JSON.parse(data);
                // console.log(spreadArr);
                for (var i = 0; i < spreadArr.length; i++) {
                    var spreadItem = '<li class="spread-item col-md-12"><a href = "' + spreadArr[i].sourceUrl + '" >';
                    spreadItem += '<img src = "' + spreadArr[i].imgUrl + '" alt = ""><span>' + spreadArr[i].name + '</span></a></li>'
                        /*加入展开栏*/
                    $('.spread-list').append(spreadItem);
                };
                /*展开栏显示*/
                $('.siderabr-spread').stop().show();
            }
        });
    });
    /*左侧导航栏鼠标移出事件*/
    $('.banner').on('mouseout', '.sidebar-item', function() {
        /*改变当前颜色*/
        $(this).css('background', 'none');
        $('.siderabr-spread').stop().hide();
    });
    /*移入扩展栏，显示*/
    $('.siderabr-spread').mouseover(function() {
        $(this).stop().show();
    });
    /*移出扩展栏，隐藏*/
    $('.siderabr-spread').mouseout(function() {
        $(this).stop().hide();
    });
    /*轮播图请求数据*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/lunbo',
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var res = '<li slide-id="' + data[i].id + '"><a href="' + data[i].sourceUrl + '"><img src="' + data[i].imgUrl + '" alt=""></a></li>';
                $('.slider-list').append(res);
            };
            $('.slider-list li:first-of-type').addClass("active");
        }
    });
    /*轮播图向左点击*/
    $('.slider-pre').click(function() {
        /*找到有active的li，再次加到ul里*/
        $('.slider-list').append($('.slider-list li[class="active"]'));
        /*移除active类*/
        $('.slider-list li').removeAttr('class');
        /*给第一个增加类*/
        $('.slider-list li:first-of-type').addClass("active");
    });
    /*轮播图向右点击*/
    $('.slider-next').click(function() {
        /*找到有最后一个li，加到有active类的前面*/
        var lastLi = $('.slider-list li:last-of-type');
        var firstLi = $('.slider-list li:first-of-type');
        firstLi.before(lastLi);
        /*移除active类*/
        $('.slider-list li').removeAttr('class');
        /*给第一个增加类*/
        $('.slider-list li:first-of-type').addClass("active");
    });
    /*智能硬件请求数据*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/hardware',
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var hardwareItem = '<li><a href="' + data[i].sourceUrl + '"><img src="' + data[i].imgUrl + '" alt="">';
                hardwareItem += '<h3 class="hardwareName">' + data[i].title + '</h3></a><p class="hardwareInfo">' + data[i].desc + '</p>';
                hardwareItem += '<p class="hardwarePrice">' + data[i].price + '元</p><span class="' + data[i].discountType + '">' + data[i].discount + '</span></li>';
                $('.hardware-right').append(hardwareItem);
            };
        }
    });
    /*搭配请求数据*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/product',
        dataType: 'json',
        data: { "toptitle": "match" },
        success: function(data) {
            /*拼接数据*/
            /*h2拼接*/
            $('.match-title').append('<h2>' + data.topTitleName + '</h2>');
            /*title-right拼接*/
            for (var i = 0; i < data.subs.length; i++) {
                $('.match-title-right').append('<li subs-key="' + data.subs[i].key + '">' + data.subs[i].name + '</li>');
            };
            /*标题右侧第一个标签加active类名*/
            $('.match-title-right li:first-of-type').addClass('active');
            /*主体左侧拼接*/
            for (var j = 0; j < data.leftGoods.length; j++) {
                var matchBL = '<li><a href="' + data.leftGoods[j].sourceUrl + '"><img src="' + data.leftGoods[j].imgUrl + '" alt=""></a></li>';
                $('.match-body-left').append(matchBL);
            };
            /*主体右侧拼接*/
            for (var m = 0; m < data.hotgoods.length - 1; m++) {
                var matchItem = '<li><a href="' + data.hotgoods[m].sourceUrl + '"><img src="' + data.hotgoods[m].imgUrl + '" alt="">';
                matchItem += '<h3 class="matchGoodsName">' + data.hotgoods[m].title + '</h3></a><p class="matchGoodsPrice">' + data.hotgoods[m].price + '元</p>';
                matchItem += '<p class="matchGoodsNum">' + data.hotgoods[m].heat + '人评价</p><span class="' + data.hotgoods[m].discountType + '">' + data.hotgoods[m].discount + '</span>';
                if (data.hotgoods[m].reviewDesc != '') {
                    matchItem += '<div class="goods-review"><p>' + data.hotgoods[m].reviewDesc + '</p><p>来自于' + data.hotgoods[m].reviewAuthor + '的评价</p></div></li>';
                } else {
                    matchItem += '</li>';
                }
                $('.match-body-right').append(matchItem);
            };
            /*主体右侧最后拼接*/
            var lastArr = data.hotgoods[data.hotgoods.length - 1];
            var lastItem = '<ul class="match-last"><li><a href="' + lastArr.sourceUrl + '"><h3>' + lastArr.title + '</h3><p>' + lastArr.price + '元</p><img src="' + lastArr.imgUrl + '" alt=""></a></li>';
            lastItem += '<li><a href="#"><h3>浏览更多</h3><p>热门</p><i class="iconfont icon-you1"></i></a></li></ul>';
            $('.match-body-right').append(lastItem);
        }
    });
    /*搭配选项卡切换*/
    $('.match-title-right').on('mouseover', 'li', function() {
        /*颜色变化*/
        $('.match-title-right li').removeClass('active');
        /*当前li增加类*/
        $(this).addClass('active');
        /*请求数据*/
        /*获取key值*/
        var currentKey = $(this).attr('subs-key');
        /*请求数据*/
        $.ajax({
            url: 'http://127.0.0.1:9900/api/product',
            dataType: 'json',
            data: { "key": currentKey },
            success: function(data) {
                /*清空右侧数据内容*/
                $('.match-body-right').html('');
                /*拼接数据*/
                for (var m = 0; m < data.datas.length - 1; m++) {
                    var matchItem = '<li><a href="' + data.datas[m].sourceUrl + '"><img src="' + data.datas[m].imgUrl + '" alt="">';
                    matchItem += '<h3 class="matchGoodsName">' + data.datas[m].title + '</h3></a><p class="matchGoodsPrice">' + data.datas[m].price + '元</p>';
                    matchItem += '<p class="matchGoodsNum">' + data.datas[m].heat + '人评价</p><span class="' + data.datas[m].discountType + '">' + data.datas[m].discount + '</span>';
                    if (data.datas[m].reviewDesc != '') {
                        matchItem += '<div class="goods-review"><p>' + data.datas[m].reviewDesc + '</p><p>来自于' + data.datas[m].reviewAuthor + '的评价</p></div></li>';
                    } else {
                        matchItem += '</li>';
                    }
                    $('.match-body-right').append(matchItem);
                };
                /*主体右侧最后拼接*/
                var lastArr = data.datas[data.datas.length - 1];
                var lastItem = '<ul class="match-last"><li><a href="' + lastArr.sourceUrl + '"><h3>' + lastArr.title + '</h3><p>' + lastArr.price + '元</p><img src="' + lastArr.imgUrl + '" alt=""></a></li>';
                lastItem += '<li><a href="#"><h3>浏览更多</h3><p>热门</p><i class="iconfont icon-you1"></i></a></li></ul>';
                $('.match-body-right').append(lastItem);
            }
        })
    });
    /*配件请求数据*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/product',
        dataType: 'json',
        data: { "toptitle": "accessories" },
        success: function(data) {
            /*拼接数据*/
            /*h2拼接*/
            $('.part-title').append('<h2>' + data.topTitleName + '</h2>');
            /*title-right拼接*/
            for (var i = 0; i < data.subs.length; i++) {
                $('.part-title-right').append('<li subs-key="' + data.subs[i].key + '">' + data.subs[i].name + '</li>');
            };
            /*标题右侧第一个标签加active类名*/
            $('.part-title-right li:first-of-type').addClass('active');
            /*主体左侧拼接*/
            for (var j = 0; j < data.leftGoods.length; j++) {
                var partBL = '<li><a href="' + data.leftGoods[j].sourceUrl + '"><img src="' + data.leftGoods[j].imgUrl + '" alt=""></a></li>';
                $('.part-body-left').append(partBL);
            };
            /*主体右侧拼接*/
            for (var m = 0; m < data.hot.length - 1; m++) {
                var partItem = '<li><a href="' + data.hot[m].sourceUrl + '"><img src="' + data.hot[m].imgUrl + '" alt="">';
                partItem += '<h3 class="partGoodsName">' + data.hot[m].title + '</h3></a><p class="partGoodsPrice">' + data.hot[m].price + '元</p>';
                partItem += '<p class="partGoodsNum">' + data.hot[m].heat + '人评价</p><span class="' + data.hot[m].discountType + '">' + data.hot[m].discount + '</span>';
                if (data.hot[m].reviewDesc != '') {
                    partItem += '<div class="goods-review"><p>' + data.hot[m].reviewDesc + '</p><p>来自于' + data.hot[m].reviewAuthor + '的评价</p></div></li>';
                } else {
                    partItem += '</li>';
                }
                $('.part-body-right').append(partItem);
            };
            /*主体右侧最后拼接*/
            var lastArr = data.hot[data.hot.length - 1];
            var lastItem = '<ul class="part-last"><li><a href="' + lastArr.sourceUrl + '"><h3>' + lastArr.title + '</h3><p>' + lastArr.price + '元</p><img src="' + lastArr.imgUrl + '" alt=""></a></li>';
            lastItem += '<li><a href="#"><h3>浏览更多</h3><p>热门</p><i class="iconfont icon-you1"></i></a></li></ul>';
            $('.part-body-right').append(lastItem);
        }
    });
    /*配件选项卡切换*/
    $('.part-title-right').on('mouseover', 'li', function() {
        /*颜色变化*/
        $('.part-title-right li').removeClass('active');
        /*当前li增加类*/
        $(this).addClass('active');
        /*请求数据*/
        /*获取key值*/
        var currentKey = $(this).attr('subs-key');
        /*请求数据*/
        $.ajax({
            url: 'http://127.0.0.1:9900/api/product',
            dataType: 'json',
            data: { "key": currentKey },
            success: function(data) {
                /*清空右侧数据内容*/
                $('.part-body-right').html('');
                /*拼接数据*/
                for (var m = 0; m < data.datas.length - 1; m++) {
                    var partItem = '<li><a href="' + data.datas[m].sourceUrl + '"><img src="' + data.datas[m].imgUrl + '" alt="">';
                    partItem += '<h3 class="partGoodsName">' + data.datas[m].title + '</h3></a><p class="partGoodsPrice">' + data.datas[m].price + '元</p>';
                    partItem += '<p class="partGoodsNum">' + data.datas[m].heat + '人评价</p><span class="' + data.datas[m].discountType + '">' + data.datas[m].discount + '</span>';
                    if (data.datas[m].reviewDesc != '') {
                        partItem += '<div class="goods-review"><p>' + data.datas[m].reviewDesc + '</p><p>来自于' + data.datas[m].reviewAuthor + '的评价</p></div></li>';
                    } else {
                        partItem += '</li>';
                    }
                    $('.part-body-right').append(partItem);
                };
                /*主体右侧最后拼接*/
                var lastArr = data.datas[data.datas.length - 1];
                var lastItem = '<ul class="part-last"><li><a href="' + lastArr.sourceUrl + '"><h3>' + lastArr.title + '</h3><p>' + lastArr.price + '元</p><img src="' + lastArr.imgUrl + '" alt=""></a></li>';
                lastItem += '<li><a href="#"><h3>浏览更多</h3><p>热门</p><i class="iconfont icon-you1"></i></a></li></ul>';
                $('.part-body-right').append(lastItem);
            }
        })
    });
    /*周边请求数据*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/product',
        dataType: 'json',
        data: { "toptitle": "around" },
        success: function(data) {
            /*拼接数据*/
            /*h2拼接*/
            $('.circum-title').append('<h2>' + data.topTitleName + '</h2>');
            /*title-right拼接*/
            for (var i = 0; i < data.subs.length; i++) {
                $('.circum-title-right').append('<li subs-key="' + data.subs[i].key + '">' + data.subs[i].name + '</li>');
            };
            /*标题右侧第一个标签加active类名*/
            $('.circum-title-right li:first-of-type').addClass('active');
            /*主体左侧拼接*/
            for (var j = 0; j < data.leftGoods.length; j++) {
                var circumBL = '<li><a href="' + data.leftGoods[j].sourceUrl + '"><img src="' + data.leftGoods[j].imgUrl + '" alt=""></a></li>';
                $('.circum-body-left').append(circumBL);
            };
            /*主体右侧拼接*/
            for (var m = 0; m < data.hotcloths.length - 1; m++) {
                var circumItem = '<li><a href="' + data.hotcloths[m].sourceUrl + '"><img src="' + data.hotcloths[m].imgUrl + '" alt="">';
                circumItem += '<h3 class="circumGoodsName">' + data.hotcloths[m].title + '</h3></a><p class="circumGoodsPrice">' + data.hotcloths[m].price + '元</p>';
                circumItem += '<p class="circumGoodsNum">' + data.hotcloths[m].heat + '人评价</p><span class="' + data.hotcloths[m].discountType + '">' + data.hotcloths[m].discount + '</span>';
                if (data.hotcloths[m].reviewDesc != '') {
                    circumItem += '<div class="goods-review"><p>' + data.hotcloths[m].reviewDesc + '</p><p>来自于' + data.hotcloths[m].reviewAuthor + '的评价</p></div></li>';
                } else {
                    circumItem += '</li>';
                }
                $('.circum-body-right').append(circumItem);
            };
            /*主体右侧最后拼接*/
            var lastArr = data.hotcloths[data.hotcloths.length - 1];
            var lastItem = '<ul class="circum-last"><li><a href="' + lastArr.sourceUrl + '"><h3>' + lastArr.title + '</h3><p>' + lastArr.price + '元</p><img src="' + lastArr.imgUrl + '" alt=""></a></li>';
            lastItem += '<li><a href="#"><h3>浏览更多</h3><p>热门</p><i class="iconfont icon-you1"></i></a></li></ul>';
            $('.circum-body-right').append(lastItem);
        }
    });
    /*周边选项卡切换*/
    $('.circum-title-right').on('mouseover', 'li', function() {
        /*颜色变化*/
        $('.circum-title-right li').removeClass('active');
        /*当前li增加类*/
        $(this).addClass('active');
        /*请求数据*/
        /*获取key值*/
        var currentKey = $(this).attr('subs-key');
        /*请求数据*/
        $.ajax({
            url: 'http://127.0.0.1:9900/api/product',
            dataType: 'json',
            data: { "key": currentKey },
            success: function(data) {
                /*清空右侧数据内容*/
                $('.circum-body-right').html('');
                /*拼接数据*/
                for (var m = 0; m < data.datas.length - 1; m++) {
                    var circumItem = '<li><a href="' + data.datas[m].sourceUrl + '"><img src="' + data.datas[m].imgUrl + '" alt="">';
                    circumItem += '<h3 class="circumGoodsName">' + data.datas[m].title + '</h3></a><p class="circumGoodsPrice">' + data.datas[m].price + '元</p>';
                    circumItem += '<p class="circumGoodsNum">' + data.datas[m].heat + '人评价</p><span class="' + data.datas[m].discountType + '">' + data.datas[m].discount + '</span>';
                    if (data.datas[m].reviewDesc != '') {
                        circumItem += '<div class="goods-review"><p>' + data.datas[m].reviewDesc + '</p><p>来自于' + data.datas[m].reviewAuthor + '的评价</p></div></li>';
                    } else {
                        circumItem += '</li>';
                    }
                    $('.circum-body-right').append(circumItem);
                };
                /*主体右侧最后拼接*/
                var lastArr = data.datas[data.datas.length - 1];
                var lastItem = '<ul class="circum-last"><li><a href="' + lastArr.sourceUrl + '"><h3>' + lastArr.title + '</h3><p>' + lastArr.price + '元</p><img src="' + lastArr.imgUrl + '" alt=""></a></li>';
                lastItem += '<li><a href="#"><h3>浏览更多</h3><p>热门</p><i class="iconfont icon-you1"></i></a></li></ul>';
                $('.circum-body-right').append(lastItem);
            }
        })
    });
    /*为你推荐*/
    for (var i = 1; i <= 4; i++) {
        $.ajax({
            url: 'http://127.0.0.1:9900/api/recommend',
            dataType: 'json',
            data: {
                page: i
            },
            success: function(data) {
                /*拼接数据*/
                for (var m = 0; m < data.length; m++) {
                    var recommendItem = '<li><a href="' + data[m].sourceUrl + '"><img src="' + data[m].imgUrl + '" alt="">';
                    recommendItem += '<h3 class="recommendGoodsName">' + data[m].name + '</h3><p class="recommendGoodsPrice">' + data[m].price + '元</p>';
                    recommendItem += '<p class="recommendGoodsNum">' + data[m].favorable + '人评价</p></a></li>';
                    $('.recommend-list').append(recommendItem);
                };
            }
        });
    }
    /*推荐点击事件*/
    var recommendPageNum = 1;
    $('.recommend-btn .icon-more').click(function() {
        if (recommendPageNum == 4) {
            return;
        }
        /*向左滑动*/
        /*滑动距离*/
        var currentTranslateX = 1235 * (recommendPageNum);
        $('.recommend-list').css('transform', 'translateX(-' + currentTranslateX + 'px)');
        recommendPageNum++;
    });
    $('.recommend-btn .icon-back').click(function() {
        if (recommendPageNum == 1) {
            return;
        }
        recommendPageNum--;
        /*向右滑动*/
        /*滑动距离*/
        var currentTranslateX = 1235 * (recommendPageNum - 1);
        $('.recommend-list').css('transform', 'translateX(-' + currentTranslateX + 'px)');
    });
    /*热评产品*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/hotcomment',
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var hotcommentItem = ' <li class = "hotcomment-item"><a href = "' + data[i].sourceUrl + '"><img alt="" src = "' + data[i].imageUrl + '">';
                hotcommentItem += '<p class="review">' + data[i].review + '</p><p class="author">来自' + data[i].author + '的评价</p>';
                hotcommentItem += '<span>' + data[i].name + '</span><span>|</span><span>' + data[i].price + '元</span></a ></li>'
                $('.hotcomment-list').append(hotcommentItem);
            };
        }
    });
    /*内容*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/content',
        dataType: 'json',
        success: function(data) {
            $('.content-out-list').append(template('content-template', data.contents));
            /*注册点击事件*/
            /*第一个li*/
            var contentBookPage = 1;
            $('.outItem[content-type="book"]').on('click', '.control-more', function() {
                if (contentBookPage == 4) {
                    return;
                }
                $(this).parent().find('.content-in-list').css('transform', 'translateX(-' + (296 * contentBookPage) + 'px)');
                $('.content-book li').removeClass('active');
                $('.content-book li').eq(contentBookPage).addClass('active');
                contentBookPage++;
            });
            $('.outItem[content-type="book"]').on('click', '.control-back', function() {
                if (contentBookPage == 1) {
                    return;
                }
                contentBookPage--;
                $('.content-book li').removeClass('active');
                $('.content-book li').eq(contentBookPage - 1).addClass('active');
                $(this).parent().find('.content-in-list').css('transform', 'translateX(-' + (296 * (contentBookPage - 1)) + 'px)');

            });
            /*第二个li*/
            var contentThemePage = 1;
            $('.outItem[content-type="theme"]').on('click', '.control-more', function() {
                if (contentThemePage == 4) {
                    return;
                }
                $(this).parent().find('.content-in-list').css('transform', 'translateX(-' + (296 * contentThemePage) + 'px)');
                $('.content-theme li').removeClass('active');
                $('.content-theme li').eq(contentThemePage).addClass('active');
                contentThemePage++;
            });
            $('.outItem[content-type="theme"]').on('click', '.control-back', function() {
                if (contentThemePage == 1) {
                    return;
                }
                contentThemePage--;
                $('.content-theme li').removeClass('active');
                $('.content-theme li').eq(contentThemePage - 1).addClass('active');
                $(this).parent().find('.content-in-list').css('transform', 'translateX(-' + (296 * (contentThemePage - 1)) + 'px)');
            });
            /*第三个li*/
            var contentGamePage = 1;
            $('.outItem[content-type="game"]').on('click', '.control-more', function() {
                if (contentGamePage == 4) {
                    return;
                }
                $(this).parent().find('.content-in-list').css('transform', 'translateX(-' + (296 * contentGamePage) + 'px)');
                $('.content-game li').removeClass('active');
                $('.content-game li').eq(contentGamePage).addClass('active');
                contentGamePage++;
            });
            $('.outItem[content-type="game"]').on('click', '.control-back', function() {
                if (contentGamePage == 1) {
                    return;
                }
                contentGamePage--;
                $('.content-game li').removeClass('active');
                $('.content-game li').eq(contentGamePage - 1).addClass('active');
                $(this).parent().find('.content-in-list').css('transform', 'translateX(-' + (296 * (contentGamePage - 1)) + 'px)');
            });
            /*第四个li*/
            var contentAppPage = 1;
            $('.outItem[content-type="app"]').on('click', '.control-more', function() {
                if (contentAppPage == 4) {
                    return;
                }
                $(this).parent().find('.content-in-list').css('transform', 'translateX(-' + (296 * contentAppPage) + 'px)');
                $('.content-app li').removeClass('active');
                $('.content-app li').eq(contentAppPage).addClass('active');
                contentAppPage++;
            });
            $('.outItem[content-type="app"]').on('click', '.control-back', function() {
                if (contentAppPage == 1) {
                    return;
                }
                contentAppPage--;
                $('.content-app li').removeClass('active');
                $('.content-app li').eq(contentAppPage - 1).addClass('active');
                $(this).parent().find('.content-in-list').css('transform', 'translateX(-' + (296 * (contentAppPage - 1)) + 'px)');
            });
        }
    });
    /*视频*/
    $.ajax({
        url: 'http://127.0.0.1:9900/api/video',
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                var videoItem = '<li class="video-item"><a href="' + data[i].videoUrl + '"><img src="' + data[i].imgUrl + '" alt="">';
                videoItem += '<h3>' + data[i].videotitle + '</h3><p>' + data[i].desc + '</p><i class="iconfont icon-you2"></i></a></li>';
                $('.video-list').append(videoItem);
            };
        }
    });
})