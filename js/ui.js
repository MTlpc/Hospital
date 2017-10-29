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

//ui-slider

$.fn.UiSlider = function () {

    var ui = $(this);

    var wrap = $('.ui-slider-wrap');

    var btn_prev = $('.ui-slider-arrow .left',ui);
    var btn_next = $('.ui-slider-arrow .right',ui);

    var items = $('.ui-slider-wrap .item',ui);
    var tips = $('.ui-slider-process .item',ui);

    var current = 0;
    var size = items.length;
    var width = items.eq(0).width();
    var enableAuto = true;
    
    wrap
        .on('mouseover',function () {
            enableAuto = false;
        })
        .on('mouseout',function () {
            enableAuto = true;
        });

    //具体操作
    wrap.on('move_prev',function () {
        if(current <= 0){
            current = size;
        }
        current = current -1 ;

        wrap.triggerHandler('move_to',current);
    })
        .on('move_next',function () {
            if (current >= size - 1){
                current = -1;
            }
            current = current +1;
            wrap.triggerHandler('move_to',current);
        })
        .on('move_to',function (evt,index) {
            wrap.css('left',index*width*-1);
            tips.removeClass('item_focus').eq(index).addClass('item_focus');
        })
        .on('auto_move',function () {
            setInterval(function () {
                enableAuto && wrap.triggerHandler('move_next');
            },2000);
        })
        .triggerHandler('auto_move');

    //事件
    btn_prev.on('click',function () {
        wrap.triggerHandler('move_prev');
    });

    btn_next.on('click',function () {
        wrap.triggerHandler('move_next');
    });

    tips.on('click',function () {
        var index = $(this).index();
        wrap.triggerHandler('move_to',index);
    })
}

//页面的脚本逻辑

$(function () {
    $('.ui-search').UiSearch();
    $('.content-tab').UiTab('.caption > .item','.block > .item','');
    $('.content-tab .block .item').UiTab('.block-caption > a','.block-content > .block-wrap','block-caption-');
    $('body').UiBacktop();

    $('.ui-slider').UiSlider();
});