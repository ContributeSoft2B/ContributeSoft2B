$(function(){
	$('.drop-arrow-button').on('click',function(){
		$(this).toggleClass('down').parents('.collapse_content').find('.collapse').slideToggle('fast');
	});
})