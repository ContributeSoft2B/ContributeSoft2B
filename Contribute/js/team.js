$(function(){
    
    $('.dialog-bg,.close').on('click',function(){
        $('.dialog-bg,.intro-wrap').hide();
    });
    $('.home-team-member li').on('click',function(){
       var ind = $(this).index()+1;
       var name = $(this).find('p.name').text();
       var ptitle = $(this).find('p.title').text();
       var pintro = $(this).find('div.pintro').html();
       var pimg = $(this).find('span').eq(0).attr('class');
       var winH = $(window).height();
       var dialogH = 0;

       $('.intro-dialog .img').attr('class', 'img '+pimg )
       $('.intro-wrap,.dialog-bg').show();
       $('.intro-wrap').find('strong.pname').text(name).end().find('p.ptitle').text(ptitle).end().find('.pintro').html(pintro);

       dialogH = $('.intro-wrap').outerHeight();
       $('.intro-wrap').css('top',(winH-dialogH)/2);
    });
});