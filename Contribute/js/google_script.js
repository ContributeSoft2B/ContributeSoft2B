/* JS Enable Check */
(function (H) {
    H.className = H.className.replace(/\bno-js\b/, 'js')
})(document.documentElement)
/* Detect if JavaScript is enabled and change class in html element */
/* JS Enable Check */

window.__lc = window.__lc || {};
window.__lc.license = 9124465;
(function () {
    var lc = document.createElement('script');
    lc.type = 'text/javascript';
    lc.async = true;
    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(lc, s);
})();
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-107713913-1');

(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start':
            new Date().getTime(), event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-WLHR9B4');

window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'AW-829928504');
