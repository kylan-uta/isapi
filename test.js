require('amd-loader');
require('./isapi/websdk');
const { JSDOM } = require('jsdom');
const { document, window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = document;
global.window = window;
global.$ = require('jquery');
$.ajax = require('najax');
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
global.SHA256 = require('sha256');
global.MD5 = require('md5');


const common = require('./common');
common.doLogin('admin','a12345678', ()=>{console.log('登陆成功')}, (e)=>{console.log('登陆failed',e)});
WebSDK.WSDK_GetDeviceConfig('192.168.1.4','faceDataLibraryCfgCap',null,{success:console.log,error:console.log})