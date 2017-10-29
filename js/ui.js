/**
 * Created by 92806 on 2017/10/27.
 */
//ui-search 定义
$.fn.UiSearch = function () {
    var ui = $(this);
    $('.ui-search-selected',ui).on('click',function () {
        $('.ui-search-select-list').show();
        return false;
    });
    $('.ui-search-select-list a',ui).on('click',function () {
        $('.ui-search-selected').text($(this).text());
        $('.ui-search-select-list').hide();
        return false;
    });

    $('body').on('click',function () {
        $('.ui-search-select-list').hide();
    });
}

/**
 *
 * @param {String} header  TAB组件，所有选项卡 item
 * @param {String} content TAB组件，内容区域，所有item
 * @option {String} focus_prefix 选项卡高亮样式前缀，可选
 */
$.fn.UiTab = function (header,content,focus_prefix) {
    var ui = $(this);
    var tabs = $(header, ui);
    var cons = $(content, ui);
    var focus_prefix = focus_prefix || '';

    tabs.on('click', function () {
        var index = $(this).index();
        tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus');
        cons.hide().eq(index).show();

        return false;
    });
}

//Ui-backTop
$.fn.UiBacktop = function () {
    var ui = $(this);
    var el = $('<a href="#1" class="ui-backTop"></a>');
    ui.append(el);
    var windowHeight = $(window).height();

    $(window).on('scroll',function () {
        var top = $(document).scrollTop();
        if(top > windowHeight){
            el.show();
        }else{
            el.hide();
        }
    });
    el.on('click',function () {
        $(document).scrollTop(0);
});
}

//页面的脚本逻辑

$(function () {
    $('.ui-search').UiSearch();
    $('.content-tab').UiTab('.caption > .item','.block > .item','');
    $('.content-tab .block .item').UiTab('.block-caption > a','.block-content > .block-wrap','block-caption-');
    $('body').UiBacktop();
});