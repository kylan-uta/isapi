require('amd-loader');
const { JSDOM } = require('jsdom');
const { document, window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = document;
global.window = window;
global.$ = require('jquery');
const ajax = require('najax');

$.cookie = function (t, a, i) {
    if (arguments.length > 1 && (null === a || "object" != typeof a)) {
        if (i = this.extend({}, i),
            null === a && (i.expires = -1),
            "number" == typeof i.expires) {
            var n = i.expires,
                o = i.expires = new Date;
            o.setDate(o.getDate() + n)
        }
        global.document = {
            cookie: [encodeURIComponent(t), "=", i.raw ? a + "" : encodeURIComponent(a + ""), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "; path=/", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
        }
        return
    }
    i = a || {};
    var r, s = i.raw ? function (e) {
            return e
        } :
        decodeURIComponent;
    return (r = RegExp("(?:^|; )" + encodeURIComponent(t) + "=([^;]*)").exec(document.cookie)) ? s(r[1]) : null
};
$.ajax = function(a) {
    // console.log(a)
    ajax(a)
}
const jquery = require('jquery')
const common = require('./common');
common.doLogin('admin','a12345678', (a)=>{console.log('success',a)}, (e)=>{console.log('failed',e)});