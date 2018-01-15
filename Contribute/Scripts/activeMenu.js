/**
 * Created on 25/11/2017.
 */
$(function($) {
    var path = window.location.pathname.split('/')[1];
    $('.mob-menu li a').each(function(i,item ) {
        if ($(item).attr('href') === '/' + path) {
            $(item).parent().addClass('current');
        }
    });

    var lang = $('input.lang').val();
    var header = '\
            <div class="header-wrap">\
                <div class="site-header__elements">\
                    <a href="" class="header-style site-logo">\
                        <img src="/images/logo.png" alt="Logo" width="300">\
                    </a>\
                    <nav class="header-style main-nav">\
                        <ul class="primary-menu">\
                            <li><a href="">Home</a></li>\
                            <li><a href="/STBChain-cn.pdf" target="_blank">WhitePaper</a></li>\
                            <li><a href="/#team_member">Team</a></li>\
                            <li><a href="/#partners">Partners</a></li>\
                            <li><a href="/#contact">Contact</a></li>\
                            <li><a href="/qa.html" target="_blank">Q&A</a></li>\
                            <li>\
                            <ul class="languagepicker roundborders large" dir="ltr">\
                                <li><span class="flag-icon flag-icon-'+(lang=='CN'?'cn':'gb')+'"></span>&nbsp; '+lang+'</li>\
                                <li><a href="index.html?lang=en"><span class="flag-icon flag-icon-gb"></span>&nbsp; EN</a></li>\
                                <li><a href="home.html?lang=cn"><span class="flag-icon flag-icon-cn"></span>&nbsp; CN</a></li>'+
                                /*<li><a href="soft2b.com/?lang=ar"><span class="flag-icon flag-icon-ae"></span>&nbsp; AR</a></li>*/
                            '</ul>\
                            <div class=""></div>\
                            </li>\
                            <li class="chat-mobile">\
                                <a id="livechat-badge" href="#" style="font-family:"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;display: block;color: #fff;border-bottom: 1px solid #222;padding: 1em 1.5em;text-decoration: none;font-size: 17px;"><i class="fa fa-comment-o" style="font-size: 22px;" aria-hidden="true"></i>\
                                    在线聊天</a>\
                            </li>\
                        </ul>\
                        <div class="margin-10 "></div>\
                    </nav>\
                    <a href="/Applications/Create" class="header-style btn btn--alt btn-hover hidden-on-mob" target="_blank">Whitelist</a >&ensp;\
                    <a class="header-style icon-telegram hidden-on-mob" href="https://t.me/soft2b" target="_blank"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></a>\
                </div>\
                <button class="toggle-nav">\
                    <span class="icon-bar"></span>\
                    <span class="icon-bar"></span>\
                    <span class="icon-bar"></span>\
                </button>\
            </div>'
    ;
    var footer = '\
		<div class="container-fluid">\
	        <div class="row text--centered" style="padding-bottom: 38px;">\
	            <div class="col-lg-12 col-md-12 col-sm-5 col-xs-12 arabic-display-none-new">\
	                <div class="footer-follow-us-wrap">\
	                    <p class="footer-widget-title">CONTACT US</p>\
	                    <ul class="footer-follow-us-icon-list">\
	                        <li><a href="mailto:stbchain@gmail.com?subject=stb" target="_blank" title="stbchain@gmail.com"><i class="fa fa-email" aria-hidden="true"><img src="/images/icon/email.png"></i></a></li>\
	                        <li><a href="https://t.me/soft2b" target="_blank" title="Telegram STB"><i class="fa fa-paper-plane" aria-hidden="true"></i></a></li>\
	                        <!-- <li><a href="https://facebook.com/soft2b.com" target="_blank" title="Facebook soft2b.com"><i class="fa fa-facebook" aria-hidden="true"></i></a></li> -->\
	                        <li><a href="https://github.com/stbchain" target="_blank" title="Github STB"><i class="fa fa-github" aria-hidden="true"></i></a></li>\
	                        <li><a href="https://twitter.com/stbchain" target="_blank" title="Twitter STB"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>\
	                        <li><a href="https://stbchain.slack.com/" target="_blank" title="slack"><i class="fa fa-slack" aria-hidden="true"></i></a></li>\
	                        <li><a href="https://qq.com" target="_blank" title="QQ"><i class="fa fa-qq" aria-hidden="true"></i></a></li>\
	                        <li><a href="https://weixin.com/@soft2b.com" target="_blank" title="Medium soft2b.com"><i class="fa fa-weixin" aria-hidden="true"><span class="inner"><img src="/images/1420920937.jpg" class="wximg"></span></i></a>\
	                            \
	                        </li>\
	                    </ul>\
	                </div>\
	            </div>\
	        </div>\
	        <div class="row">\
	            <p class="footer-copyright text--centered">©2017 Copyright By STBChain Foundation.</p>\
	        </div>\
	    </div>'
    ;
    var sitemenu = '\
        <div class="mobile-language">\
            <ul>\
                <li class="active parentLi">\
                    <a href="#" class="caret"></a>\
                    <span class="language-switcher">\
                          <img src="/images/globe.svg" class="lang__icon" alt="Globe" width="28" height="28"/>&nbsp Language<img src="/images/drop.svg" class="lang__icon-drop" alt="Globe" width="20" height="20"/>\
                        </span>\
                    <ul class="lang-submenu" style="display: none;width: 100%">\
                        <li><a href="index.html?lang=en"><span class="flag-icon flag-icon-gb"></span>&nbsp EN</a></li>\
                        <li ><a href="home.html?lang=cn"><span class="flag-icon flag-icon-cn"></span>&nbsp CN</a></li>\
                    </ul>\
                </li>\
            </ul>\
        </div>\
	    <ul class="mob-menu">\
	    <li><a href="">Home</a></li>\
	    <li><a href="STBChain-cn.pdf" target="_blank">WhitePaper</a></li>\
	    <li><a href="#team_member">Team</a></li>\
	    <li><a href="#partners">Partners</a></li>\
	    <li><a href="#contact">Contact</a></li>\
	    <li><a href="qa.html" target="_blank">Q&A</a></li>\
	    </ul>'
    ;
    $('header.site-header').append(header);
    $('footer.site-footer').append(footer);
    $('#site-menu').append(sitemenu);
});