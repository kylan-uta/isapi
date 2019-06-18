define(function (require, exports, module) {
    module.exports = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        var t, n, a, i, o, r, s, l = "",
            c = 0;
        for (e = this._utf8_encode(e); e.length > c;) t = e.charCodeAt(c++), n = e.charCodeAt(c++), a = e.charCodeAt(c++), i = t >> 2, o = (3 & t) << 4 | n >> 4, r = (15 & n) << 2 | a >> 6, s = 63 & a, isNaN(n) ? r = s = 64 : isNaN(a) && (s = 64), l = l + this._keyStr.charAt(i) + this._keyStr.charAt(o) + this._keyStr.charAt(r) + this._keyStr.charAt(s);
        return l
    },
    decode: function (e) {
        var t, n, a, i, o, r, s, l = "",
            c = 0;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); e.length > c;) i = this._keyStr.indexOf(e.charAt(c++)), o = this._keyStr.indexOf(e.charAt(c++)), r = this._keyStr.indexOf(e.charAt(c++)), s = this._keyStr.indexOf(e.charAt(c++)), t = i << 2 | o >> 4, n = (15 & o) << 4 | r >> 2, a = (3 & r) << 6 | s, l += String.fromCharCode(t), 64 != r && (l += String.fromCharCode(n)), 64 != s && (l += String.fromCharCode(a));
        return l = this._utf8_decode(l)
    },
    _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", n = 0; e.length > n; n++) {
            var a = e.charCodeAt(n);
            128 > a ? t += String.fromCharCode(a) : a > 127 && 2048 > a ? (t += String.fromCharCode(192 | a >> 6), t += String.fromCharCode(128 | 63 & a)) : (t += String.fromCharCode(224 | a >> 12), t += String.fromCharCode(128 | 63 & a >> 6), t += String.fromCharCode(128 | 63 & a))
        }
        return t
    },
    _utf8_decode: function (e) {
        for (var t = "", n = 0, a = c1 = c2 = 0; e.length > n;) a = e.charCodeAt(n), 128 > a ? (t += String.fromCharCode(a), n++) : a > 191 && 224 > a ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((31 & a) << 6 | 63 & c2), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((15 & a) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
        return t
    }
}});