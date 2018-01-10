jQuery(document).ready(function (e) {
    function i() {
        e("#site-wrapper").hasClass("show-nav") ? e("#site-wrapper").removeClass("show-nav") : e("#site-wrapper").addClass("show-nav");
    }

    function t() {
        e("#site-wrapper").hasClass("show-nav") && e("#site-wrapper").removeClass("show-nav")
    }

    var swissTime = moment.tz("2017-12-07 09:00:00", "Asia/Shanghai").toDate();
    var d = Date.parse(swissTime);
    var dnow = Date.now();
    if (dnow >= d) {
        swissTime = moment.tz("2018-01-18 23:59:00", "Asia/Shanghai").toDate();
    }
    //Countdown for Token Distribution section
    var swissTime_tokenDistribution = moment.tz("2017-12-07 09:00:00", "Asia/Shanghai").toDate();
    var dtok = Date.parse(swissTime_tokenDistribution);
    var dnowTokenDistribution = Date.now();
    if (dnowTokenDistribution >= dtok) {
        swissTime_tokenDistribution = moment.tz("2018-01-08 10:00:00", "Asia/Shanghai").toDate();
    }
    svg4everybody(), e(document).on("scroll", function () {
        e(window).scrollTop() > 200 ? e(".scroll-to-top").addClass("show") : e(".scroll-to-top").removeClass("show")
    }), e(".scroll-to-top").on("click", function (i) {
        i.preventDefault();
        var t = e("body").offset().top;
        e("html, body").animate({scrollTop: t}, 500, "linear")
    }), e(".toggle-nav,.mob-menu a").click(function () {
        i()
    }), e(document).keyup(function (t) {
        27 === t.keyCode && e("#site-wrapper").hasClass("show-nav") && i()
    }), enquire.register("screen and (min-width: 768px)", {
        match: function () {
            t()
        }
    }), e("ul.mob-menu li").has("ul").addClass("parentLi"), e("ul.mob-menu li ul").addClass("sub-menu"), e("ul.mob-menu .parentLi > a").append("▼"), e("ul.mob-menu .sub-menu").hide(), e("ul.mob-menu .parentLi > a").on("click", function (i) {
        i.preventDefault(), e(this).toggleClass("expanded"), e(this).parent().find("ul.sub-menu").slideToggle()
    }), e(".mobile-language li").has("ul").addClass("parentLi").prepend('<a href="#" class="caret"></a>'), e(".lang-submenu").hide(), e(".mobile-language .caret").on("click", function (i) {
        i.preventDefault(), e(this).parent().find("ul.lang-submenu").slideToggle()
    }), "accepted" == Cookies.get("eu-cookie-law") ? e(".cookie-bar").removeClass("cookie-bar--not-accepted") : e(".cookie-bar").addClass("cookie-bar--not-accepted"), e(".js-accept-cookie").on("click", function (i) {
        i.preventDefault(), Cookies.set("eu-cookie-law", "accepted", {expires: 180}), e(".cookie-bar").removeClass("cookie-bar--not-accepted")
    }), FastClick.attach(document.body), e(".primary-menu .menu-item-has-children > a").on("click", function (i) {
        i.preventDefault(), e(this).parent().toggleClass("opened")
    }), e(document).on("click", function (i) {
        e(i.target).closest(".primary-menu .menu-item-has-children a").length || e(".primary-menu .menu-item-has-children").removeClass("opened")
    }), e(".lang span").on("click", function () {
        e(".lang__items").fadeToggle(300)
    }), e("a[href$=jpg], a[href$=jpeg], a[href$=jpe], a[href$=png], a[href$=gif]").magnificPopup({
        type: "image",
        removalDelay: 500,
        callbacks: {
            beforeOpen: function () {
                this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"), this.st.mainClass = "mfp-zoom-out"
            }
        },
        closeOnContentClick: !0,
        midClick: !0
    }), fitvids({}),
        AOS.init({disable: "mobile"}),
        objectFitImages(),
        e(".countdown").countdown(swissTime, function (i) {
            e("#days").html(i.strftime("%D")), e("#hours").html(i.strftime("%H")), e("#minutes").html(i.strftime("%M")), e("#seconds").html(i.strftime("%S"))
        }),
        //Countdown for Token Distribution section
        e(".countdown-blue").countdown(swissTime_tokenDistribution, function (i) {
            e(".countdown-blue #days").html(i.strftime("%D")), e(".countdown-blue #hours").html(i.strftime("%H")), e(".countdown-blue #minutes").html(i.strftime("%M")), e(".countdown-blue #seconds").html(i.strftime("%S"))
         }),
        e(".js-open-video").magnificPopup({
        type: "inline", removalDelay: 100, callbacks: {
            beforeOpen: function () {
                this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"), this.st.mainClass = "mfp-zoom-out"
            }, open: function () {
                if (e(this.content).find("iframe").length > 0) {
                    var i = e(this.content).find("iframe")[0].src;
                    videoLink = new Url(i), i.indexOf("wirewax") >= 0 && (videoLink.query.autoStart = "true", e(this.content).find("iframe")[0].src = videoLink), i.indexOf("youtube") >= 0 && (videoLink.query.autoplay = "1", videoLink.query.rel = "0", e(this.content).find("iframe")[0].src = videoLink), i.indexOf("vimeo") >= 0 && (videoLink.query.autoplay = "true", e(this.content).find("iframe")[0].src = videoLink)
                }
                e(this.content).find("video").length > 0 && e(this.content).find("video").get(0).play()
            }, beforeClose: function () {
                if (e(this.content).find("iframe").length > 0) {
                    var i = e(this.content).find("iframe")[0].src;
                    videoLink = new Url(i), i.indexOf("wirewax") >= 0 && (videoLink.query.autoStart = "false", e(this.content).find("iframe")[0].src = videoLink), i.indexOf("youtube") >= 0 && (videoLink.query.autoplay = "0", e(this.content).find("iframe")[0].src = videoLink), i.indexOf("vimeo") >= 0 && (videoLink.query.autoplay = "false", e(this.content).find("iframe")[0].src = videoLink)
                }
                e(this.content).find("video").length > 0 && e(this.content).find("video").get(0).pause()
            }
        }, closeOnContentClick: !0, midClick: !0
    }), e(".video-slider").slick({
        accessibility: !1,
        focusOnSelect: !1,
        infinite: !1,
        mobileFirst: !0,
        slidesToShow: 1,
        responsive: [{breakpoint: 768, settings: {slidesToShow: 2, slidesToScroll: 2}}]
    }), jQuery(".toggle .toggle-title").hasClass("active") && jQuery(".toggle .toggle-title.active").closest(".toggle").find(".toggle-inner").show(), jQuery(".toggle .toggle-title").click(function () {
        jQuery(this).hasClass("active") ? jQuery(this).removeClass("active").closest(".toggle").find(".toggle-inner").slideUp(200) : jQuery(this).addClass("active").closest(".toggle").find(".toggle-inner").slideDown(200)
    });

}), new WOW({mobile: !1}).init();


var msg = 'You cannot use right click on this page.';

function clickIE() {
    if (document.all) {
        ( msg);
        return false;
    }
}

function clickNS(e) {
    if
    (document.layers || (document.getElementById && !document.all)) {
        if (e.which == 2 || e.which == 3) {
            ( msg);
            return false;
        }
    }
}

if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS;
}
else {
    document.onmouseup = clickNS;
    document.oncontextmenu = clickIE;
}
//document.oncontextmenu = new Function('return false');

$(function(){
    // 初始化 传入dom id
    if($('#output').length){
        var victor = new Victor("container", "output");
        victor(["#050505", "#312203"]).set();
    }

    if($('#contact').length)return false;
    var winh = $(window).outerHeight();
    var sct = $(window).scrollTop();
    var pth = $('#partners').offset().top;
    var cth = $('#contact').offset().top-winh;
    $(window).on('scroll',function(){
        sct = $(window).scrollTop()+winh;
        if( sct<(pth+winh) && (sct+winh)>=pth ){
            $('.primary-menu li').eq(3).addClass('current-menu-item').siblings().removeClass('current-menu-item');
        }else{
            $('.primary-menu li').eq(3).removeClass('current-menu-item');
        }
        if(sct>=(cth-winh)){
            $('.primary-menu li').eq(4).addClass('current-menu-item').siblings().removeClass('current-menu-item');
        }else{
            $('.primary-menu li').eq(4).removeClass('current-menu-item')
        }
    });
    
    
});