define(function (require, exports, module) {
    function e() {
        this.m_oProvince = null, this.m_oCity = null
    }
    require("./encryption/AES"), e.prototype = {
        lengthw: function (e) {
            return e.replace(/[^\x00-\xff]/g, "rr").length
        },
        isEmpty: function (e) {
            var e = $.trim(e);
            return 0 == e.length
        },
        isSpecChar: function (e) {
            return /[%\u0027:\*\?<>\|\/\\\"]/.test(e)
        },
        isChinese: function (e) {
            return /[^\x00-\xff]/.test(e)
        },
        isNumber: function (e) {
            return this.isInt(e) || this.isFloat(e)
        },
        isInt: function (e) {
            return /^\d+$/.test(e)
        },
        isFloat: function (e) {
            return /^\d+\.\d+$/.test(e)
        },
        isEmail: function (e) {
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(e)
        },
        isURL: function (e) {
            var t = /^(file|http|https|ftp|mms|telnet|news|wais|mailto):\/\/(.+)$/;
            return t.test(e)
        },
        isDomain: function (e) {
            var t = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
            return t.test(e)
        },
        isHiDDNS: function (e) {
            var t = /^([a-z]|[a-z][-a-z0-9]{0,62}[a-z0-9])$/;
            return t.test(e)
        },
        isIPAddress: function (e) {
            return this.isIPv4Address(e) || this.isIPv6Address(e) ? !0 : !1
        },
        isIPv4Address: function (e) {
            if (0 == e.length) return !1;
            var t = /^(\d{1}|\d{2}|[0-1]\d{2}|2[0-4]\d|25[0-5])\.(\d{1}|\d{2}|[0-1]\d{2}|2[0-4]\d|25[0-5])\.(\d{1}|\d{2}|[0-1]\d{2}|2[0-4]\d|25[0-5])\.(\d{1}|\d{2}|[0-1]\d{2}|2[0-4]\d|25[0-5])$/;
            return t.test(e)
        },
        isIPv6Address: function (e) {
            return /:/.test(e) && 8 > e.match(/:/g).length && /::/.test(e) ? 1 == e.match(/::/g).length && /^::$|^(::)?([\da-f]{1,4}(:|::))*[\da-f]{1,4}(:|::)?$/i.test(e) : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(e)
        },
        isIpMask: function (e) {
            var t = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
            return t.test(e)
        },
        isMulticastAddress: function (e) {
            var t = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
            if (t.test(e)) {
                if (0 == RegExp.$1 && 0 == RegExp.$2 && 0 == RegExp.$3 && 0 == RegExp.$4) return !0;
                if (RegExp.$1 > 223 && 240 > RegExp.$1 && 256 > RegExp.$2 && 256 > RegExp.$3 && 256 > RegExp.$4) return !0
            }
            return !1
        },
        isCountry: function (e) {
            return /[A-Z][A-Z]/.test(e)
        },
        isDIPAddress: function (e) {
            var t = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
            return t.test(e) && RegExp.$1 > 0 && 224 > RegExp.$1 && 256 > RegExp.$2 && 256 > RegExp.$3 && 256 > RegExp.$4 ? !0 : !1
        },
        getResponseData: function (e) {
            var t, n = e.responseText;
            if (n !== void 0) {
                if (n.indexOf("<?xml") > -1) t = new DOMParser().parseFromString(e.responseText, 'text/xml');
                else if (n.length && "{" === n.charAt(0)) try {
                    t = JSON.parse(n)
                } catch (i) {}
            } else t = e.responseText || null;
            return t
        },
        isNullObj: function (e) {
            var t = 0;
            for (var n in e) {
                t++;
                break
            }
            return 0 === t
        },
        encodeString: function (e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
        },
        decodeString: function (e) {
            var t = document.createElement("a");
            return t.innerHTML = e, window.navigator.userAgent.indexOf("MSIE 8.0") > -1 ? e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&apos;/g, "'").replace(/&amp;/g, "&") : t.textContent || t.innerText
        },
        createXml: function () {
            var e;
            try {
                e = $.browser.msie && 9 === parseInt($.browser.version, 10) ? new ActiveXObject("Microsoft.XMLDOM") : document.implementation.createDocument("", "", null)
            } catch (t) {
                e = new ActiveXObject("Microsoft.XMLDOM")
            }
            return e.async = "false", e
        },
        parseXmlFromStr: function (e) {
            if (null === e || "" === e) return null;
            e = e.replace(/&(?!lt;|amp;|gt;|apos;|quot;)/g, "&amp;");
            var t = null;
            try {
                if (window.navigator.userAgent.indexOf("MSIE 9.0") > 0) {
                    var t = new ActiveXObject("Microsoft.XMLDOM");
                    t.async = !1, t.loadXML(e)
                } else {
                    var n = new DOMParser;
                    t = n.parseFromString(e, "text/xml")
                }
            } catch (i) {
                var t = new ActiveXObject("Microsoft.XMLDOM");
                t.async = !1, t.loadXML(e)
            }
            return t
        },
        xmlToStr: function (e) {
            if (null == e) return "";
            var t = "";
            try {
                var n = new XMLSerializer;
                t = n.serializeToString(e)
            } catch (i) {
                try {
                    t = e.xml
                } catch (i) {
                    return ""
                }
            }
            return -1 == t.indexOf("<?xml") && (t = "<?xml version='1.0' encoding='utf-8'?>" + t), t
        },
        nodeValue: function (e, t, n, i) {
            var a = $(e).find(t).eq(0);
            if (void 0 === i) {
                var o = a.text();
                return "i" == n ? parseInt(o, 10) || 0 : "f" == n ? parseFloat(o) || 0 : "b" == n ? "true" == o ? !0 : !1 : o
            }
            return a.text(i), this
        },
        nodeAttr: function (e, t, n, i) {
            if ($(e).find(t).eq(0).attr(n)) {
                var a = $(e).find(t).eq(0).attr(n);
                return "i" == i ? parseInt(a, 10) || 0 : "f" == i ? parseFloat(a) || 0 : "b" == i ? "true" == a ? !0 : !1 : a
            }
            return ""
        },
        nodeList: function (e, t) {
            var n = [];
            return $(e).find(t).each(function () {
                n.push($(this).text())
            }), n
        },
        capValues: function (e, t) {
            var n = [];
            return "array" === $.type(e[t]) && $.each(e[t], function (e, t) {
                n.push(t.value)
            }), n
        },
        nodeSupport: function (e, t) {
            return "string" == typeof e[t] ? "support" === e[t] : 1 === e[t]
        },
        dayAdd: function (e, t) {
            var n = new Date(Date.parse(e.replace(/\-/g, "/"))),
                i = new Date(n.getTime() + 1e3 * 60 * 60 * 24 * t);
            return this.dateFormat(i, "yyyy-MM-dd hh:mm:ss")
        },
        dateFormat: function (e, t) {
            var n = {
                "M+": e.getMonth() + 1,
                "d+": e.getDate(),
                "h+": e.getHours(),
                "m+": e.getMinutes(),
                "s+": e.getSeconds(),
                "q+": Math.floor((e.getMonth() + 3) / 3),
                S: e.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var i in n) RegExp("(" + i + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[i] : ("00" + n[i]).substr(("" + n[i]).length)));
            return t
        },
        utcDateFormat: function (e, t) {
            var n = {
                "M+": e.getUTCMonth() + 1,
                "d+": e.getUTCDate(),
                "h+": e.getUTCHours(),
                "m+": e.getUTCMinutes(),
                "s+": e.getUTCSeconds(),
                "q+": Math.floor((e.getUTCMonth() + 3) / 3),
                S: e.getUTCMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getUTCFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var i in n) RegExp("(" + i + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[i] : ("00" + n[i]).substr(("" + n[i]).length)));
            return t
        },
        convertToLocalTime: function (e, t) {
            t === void 0 && (t = 0);
            var n = "yyyy-MM-dd hh:mm:ss",
                i = e.split(" ")[0].split("-"),
                a = parseInt(i[0], 10),
                o = parseInt(i[1], 10) - 1,
                r = parseInt(i[2], 10),
                s = e.split(" ")[1].split(":"),
                l = parseInt(s[0], 10),
                c = parseInt(s[1], 10),
                u = parseInt(s[2], 10),
                d = new Date(Date.UTC(a, o, r, l, c, u));
            return d.setTime(d.getTime() + t), this.dateFormat(d, n)
        },
        convertToUTCTime: function (e, t) {
            t === void 0 && (t = "yyyy-MM-dd hh:mm:ss");
            var n = new Date(Date.parse(e.replace(/-/g, "/")));
            return this.utcDateFormat(n, t)
        },
        regexTest: function (e, t, n) {
            var i = null;
            return i = angular.isUndefined(n) ? RegExp(t) : RegExp(t, n), i.test(e)
        },
        checkAddressingType: function (e, t) {
            var n = "hostName";
            return "v4" == t ? 1 == this.isIPv4Address(e) && (n = "ipAddress") : "v6" == t ? 1 == this.isIPv6Address(e) && (n = "ipv6Address") : 1 == this.isIPv4Address(e) ? n = "ipAddress" : 1 == this.isIPv6Address(e) && (n = "ipv6Address"), n
        },
        getXmlNodeObject: function (e, t) {
            if (!e || !t) return {};
            for (var n, i = t.length, a = {}, o = 0; i > o; o++) n = $(e).find(t[o]).eq(0), 0 == n.children().length ? (a[t[o]] = n.text(), !/^is|enable/i.test(t[o]) || "true" != a[t[o]] && "false" != a[t[o]] || (a[t[o]] = "true" == a[t[o]])) : a[t[o]] = n.get(0);
            return a
        },
        setXmlNodeObject: function (e, t) {
            if (!e || !t) return {};
            for (var n in t) "string" == typeof t[n] || "number" == typeof t[n] ? $(e).find(n).text(t[n]) : "boolean" == typeof t[n] && $(e).find(n).text("" + t[n])
        },
        validValue: function (e) {
            return e === void 0 ? !1 : null == e || "" === e || isNaN(e) ? !1 : !0
        },
        getURIParam: function (e, t) {
            -1 !== t.indexOf("?") && (t = t.split("?")[1]);
            var n = RegExp("(^|&)" + e + "=([^&]+\\[.*?\\]|[^&]*)(&|$)"),
                i = t.match(n);
            return null === i ? "" : i[2]
        },
        removeValidTip: function () {
            $(".inputValidTip").remove()
        },
        hideValidTip: function () {
            $(".inputValidTip").hide()
        },
        showErrorTip: function (e, t, n) {
            var i = $(e).data("validTipDiv");
            if ($(e).css("border", "1px solid red"), angular.isUndefined(i)) {
                var a = $(e).offset(),
                    o = $(e).outerWidth();
                i = $("<div class='inputValidTip border table-error'><i class='error'></i><label class='error-txt'>" + t + "</label></div>"), i.css({
                    position: "absolute",
                    left: a.left + o - 215 + $("#view").parent().scrollLeft(),
                    top: a.top - ("true" === this.getURIParam("nohead", document.URL) ? 0 : 36) + $("#view").parent().scrollTop()
                }), $("#view").append(i), $(e).data("validTipDiv", i)
            } else i.find(".error-txt").eq(0).text(t);
            n.bInputInValid = 0 === $(".table-error").length ? !1 : !0
        },
        hideErrorTip: function (e, t) {
            var n = $(e).data("validTipDiv");
            angular.isDefined(n) && n.remove(), t.bInputInValid = 0 === $(".table-error").length ? !1 : !0
        },
        uniqueArray: function (e, t) {
            if ("[object Array]" !== Object.prototype.toString.call(e)) return [];
            if (0 == e.length) return [];
            t = t ? !0 : !1;
            for (var n = {}, i = e.length, a = [], o = 0; i > o; o++) n[e[o]] !== void 0 ? delete e[o] : n[e[o]] = null;
            for (o = 0; i > o; o++) void 0 == e[o] ? t && (a[o] = void 0) : a.push(e[o]);
            return a
        },
        parseNamePwd: function (e) {
            var t = {
                szName: "",
                szPass: ""
            };
            if ("" == e) return t;
            ":" == e.charAt(0) && (e = e.substring(1));
            var n = e.indexOf(":");
            return n > -1 && (t.szName = e.substring(0, n), t.szPass = e.substring(n + 1)), t
        },
        checkNumber: function (e, t) {
            var n = t;
            return this.isNumber("" + Object(e)) && (n = Number(e)), n
        },
        replaceAll: function (e, t, n) {
            var i;
            i = "object" != typeof e ? [e] : e;
            var a = RegExp(t, "g"),
                o = [];
            return $.each(i, function () {
                o.push(this.replace(a, n))
            }), e !== i ? o[0] : o
        },
        getNewPoint: function (e, t) {
            var n = {
                iX: -1,
                iY: -1
            };
            return 2 == arguments.length && (n.iX = e, n.iY = t), n
        },
        pointPosTrans: function (e, t, n, i) {
            var a = 0;
            return isNaN(n) || (a = n), a = 0 == e ? t ? parseFloat(1 - parseFloat(n / i)).toFixed(4) : parseFloat(n / i).toFixed(4) : t ? parseInt((1 - n) * i, 10) : parseInt(n * i, 10)
        },
        polygonVaildCheck: function (e) {
            var t = e.length;
            if (4 > t) return !0;
            for (var n = 2; t > n; ++n)
                for (var i = 0; n - 2 >= i; ++i)
                    if ((n != t - 1 || 0 != i) && this.checkLineIntersect(e[n], "object" == typeof e[n + 1] ? e[n + 1] : e[0], e[i], e[i + 1])) return !1;
            return !0
        },
        checkLineIntersect: function (e, t, n, i) {
            var a = (i.iX - n.iX) * (e.iY - n.iY) - (i.iY - n.iY) * (e.iX - n.iX),
                o = (t.iX - e.iX) * (e.iY - n.iY) - (t.iY - e.iY) * (e.iX - n.iX),
                r = (i.iY - n.iY) * (t.iX - e.iX) - (i.iX - n.iX) * (t.iY - e.iY);
            if (0 != r) {
                var s = a / r,
                    l = o / r;
                return s >= 0 && 1 >= s && l >= 0 && 1 >= l ? !0 : !1
            }
            return 0 == a || 0 == o ? !0 : !1
        },
        getMaxDaysOnMoth: function (e) {
            var t = new Date(this.getMillisecondsFromString(e)),
                n = t.getFullYear(),
                i = t.getMonth() + 1,
                a = new Date(n, i, 0).getDate();
            return a
        },
        getMillisecondsFromString: function (e) {
            var t = e.replace("T", " ").replace("Z", ""),
                n = 0;
            t = this.replaceAll(t, "-", "/");
            try {
                n = Date.parse(t)
            } catch (i) {}
            return n
        },
        getDayInfoByType: function (e, t) {
            var n = " 00:00:00",
                i = " 23:59:59",
                a = "",
                o = "",
                r = "";
            return "daily" == e ? (a = t.split("T")[0] + n, o = t.split("T")[0] + i) : "weekly" == e ? (r = this.getFirstAndLastDayOnWeek(this.getMillisecondsFromString(t)), a = r.split("T")[0] + n, o = r.split("T")[1] + i) : "monthly" == e ? (r = this.getFirstAndLastDayOnMonth(this.getMillisecondsFromString(t)), a = r.split("T")[0] + n, o = r.split("T")[1] + i) : "yearly" == e && (a = t.split("-")[0] + "-01-01" + n, o = t.split("-")[0] + "-12-31" + i), a + "||" + o
        },
        getFirstAndLastDayOnMonth: function (e) {
            var t = new Date(e),
                n = t.getFullYear(),
                i = t.getMonth() + 1;
            10 > i && (i = "0" + i);
            var a = n + "-" + i + "-" + "01";
            t = new Date(n, i, 0);
            var o = n + "-" + i + "-" + t.getDate();
            return a + "T" + o
        },
        getFirstAndLastDayOnWeek: function (e) {
            var t = new Date(e),
                n = "",
                i = "",
                a = "",
                o = "",
                r = "",
                s = 0,
                l = 0,
                c = 0,
                u = t.getDay(),
                d = 0;
            if (0 == u) a = t.getFullYear(), o = t.getMonth() + 1, 10 > o && (o = "0" + o), r = t.getDate(), 10 > r && (r = "0" + r), i = a + "-" + o + "-" + r;
            else {
                d = 7 - u, l = t.getTime(), s = l + 864e5 * d, t.setTime(s), a = t.getFullYear();
                var o = t.getMonth() + 1;
                10 > o && (o = "0" + o), r = t.getDate(), 10 > r && (r = "0" + r), i = a + "-" + o + "-" + r
            }
            return s = t.getTime(), c = s - 5184e5, t.setTime(c), a = t.getFullYear(), o = t.getMonth() + 1, 10 > o && (o = "0" + o), r = t.getDate(), 10 > r && (r = "0" + r), n = a + "-" + o + "-" + r, n + "T" + i
        },
        max: function (e) {
            for (var t, n = -1 / 0, i = 0, a = e.length; a > i; ++i) t = parseFloat(e[i]), t > n && (n = t);
            return n
        },
        cloneFunc: function (e) {
            return function () {
                return e.apply(this, arguments)
            }
        },
        checkPasswordComplexity: function (e, t) {
            if (e === void 0) return 0;
            var n = 0;
            return e.match(/[a-z]/g) && n++, e.match(/[A-Z]/g) && (n += n ? 2 : 1), e.match(/[0-9]/g) && n++, e.match(/[^a-zA-Z0-9]/g) && (n += n ? 2 : 1), (8 > e.length || e === t || e === t.split("").reverse().join("")) && (n = 0), n && n--, n = n > 3 ? 3 : n
        },
        encodeAES: function (e, t, n, i) {
            var a = "";
            if ("ecb" === i)
                for (var o = e.length, r = 0; o > 0;) a += o > 16 ? aes_encrypt(e.substring(r, r + 16), t, !0) : aes_encrypt(e.substring(r), t, !0), o -= 16, r += 16;
            else {
                n === void 0 && (n = "6cd9616beb39d4034fdebe107df9a399");
                var s = CryptoJS.enc.Hex.parse(t),
                    l = CryptoJS.enc.Hex.parse(n),
                    c = CryptoJS.AES.encrypt(e, s, {
                        mode: CryptoJS.mode.CBC,
                        iv: l,
                        padding: CryptoJS.pad.Pkcs7
                    });
                a = "" + c.ciphertext
            }
            return a
        },
        decodeAES: function (e, t, n, i) {
            var a = "";
            if ("ecb" === i)
                for (var o = e.length, r = 0; o > 0;) a += o > 32 ? aes_decrypt(e.substring(r, r + 32), t, !1) : aes_decrypt(e.substring(r), t, !1), o -= 32, r += 32;
            else {
                n === void 0 && (n = "6cd9616beb39d4034fdebe107df9a399");
                var s = CryptoJS.enc.Hex.parse(t),
                    l = CryptoJS.enc.Hex.parse(n),
                    c = CryptoJS.enc.Hex.parse(e),
                    u = CryptoJS.enc.Base64.stringify(c),
                    d = CryptoJS.AES.decrypt(u, s, {
                        mode: CryptoJS.mode.CBC,
                        iv: l,
                        padding: CryptoJS.pad.Pkcs7
                    });
                a = d.toString(CryptoJS.enc.Utf8)
            }
            return a
        },
        toHex: function (e) {
            for (var t = "", n = 0; e.length > n; n++) "" === t ? t = e.charCodeAt(n).toString(16) : t += 16 > e.charCodeAt(n) ? "0" + e.charCodeAt(n).toString(16) : e.charCodeAt(n).toString(16);
            return t
        },
        getRSABits: function () {
            var e = window.navigator.userAgent.toLowerCase().match(/msie\s([\d\.]+)/);
            return e && 9 > Number(e[1]) ? 256 : 1024
        },
        encodeUTF8: function (e) {
            for (var t = "", n = "", i = 0, a = e.length; a > i; i++) t = e.charCodeAt(i).toString(16), n += "\\u" + Array(5 - t.length).join("0") + t;
            return n
        },
        decodeUTF8: function (e) {
            return e.replace(/(\\u)(\w{4}|\w{2})/gi, function (e, t, n) {
                return String.fromCharCode(parseInt(n, 16))
            })
        },
        getWndSplitByNum: function (e) {
            var t = 0;
            return t = 2 > e ? 1 : 5 > e ? 4 : 10 > e ? 9 : 16
        },
        getProvince: function (e) {
            var t = this;
            return t.m_oProvince || $.ajax({
                url: "../script/province.json?version=" + seajs.web_version,
                type: "GET",
                async: !1,
                dataType: "json",
                success: function (e) {
                    t.m_oProvince = e
                }
            }), t.m_oProvince[e] || ""
        },
        getCity: function (e, t) {
            var n = this;
            return n.m_oCity || $.ajax({
                url: "../script/city.json?version=" + seajs.web_version,
                type: "GET",
                async: !1,
                dataType: "json",
                success: function (e) {
                    n.m_oCity = e
                }
            }), n.m_oCity[e] ? n.m_oCity[e][t] || "" : ""
        },
        encodePwd: function (e, t, n) {
            var i = "";
            if (n) {
                i = SHA256(t.userName + t.salt + e), i = SHA256(i + t.challenge);
                for (var a = 2; t.iIterate > a; a++) i = SHA256(i)
            } else {
                i = SHA256(e) + t.challenge;
                for (var a = 1; t.iIterate > a; a++) i = SHA256(i)
            }
            return i
        }
    };
    var DOMParser = require('xmldom').DOMParser;
    module.exports = new e
});