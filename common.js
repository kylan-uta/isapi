define(function (require, exports, module) {
    function e() {
        global.location = {
            protocol: 'http:',
            hostname: '192.168.1.4',
            port: 80,
            pathname: "/doc/page/login.asp",
        }
        this.m_szHostName = location.hostname, 
        this.m_szHostNameOriginal = location.hostname, 
        this.m_szDispatchHostName = this.getDispatchInfo("configIp"), 
        this.m_iHttpPort = 80, 
        this.m_szHttpProtocol = location.protocol + "//", 
        this.m_iHttpProtocal = "http://" == this.m_szHttpProtocol ? 1 : 2, 
        "" != location.port ? this.m_iHttpPort = location.port : "https://" == this.m_szHttpProtocol && (this.m_iHttpPort = 443), 
        this.m_szHostName.indexOf("[") > -1 && (this.m_szHostNameOriginal = this.m_szHostName.substring(1, this.m_szHostName.length - 1)), 
        Utils.isIPv6Address(this.m_szHostNameOriginal) && (this.m_szHostName = "[" + this.m_szHostNameOriginal + "]");
        var e = location.pathname.match(/\/doc\/page\/([^.]+).asp/);
        this.m_szPage = "", 
        null != e && (this.m_szPage = e[1]), 
        this.m_oLanCommon = null, this.m_szNamePwd = "", this.m_szSessionId = "", this.m_szPluginNamePwd = "", this.m_szPluginSessionId = "", this.m_bDigest = !0, this.m_bAnonymous = !1, this.m_oLoginUser = {
            szName: "",
            szType: ""
        }, this.m_bWizard = !1, this.m_bSession = !1, this.m_iSessionFailed = 0, this.m_iSessionInterval = 0, this.m_iReconnectFailed = 0, this.m_szDefaultPwd = ""
    }
    /*require("layout"), require("cookie"),*/ require("./lib/json2"), /*require("angular"), require("./isapi/websdk"),*/ require("cryptico");
    var t = require("./lib/base64"),
        WebSession = require("./lib/webSession"),
        // n = require("translator"),
        Utils = require("./lib/utils");
        // s = require("dialog");
    e.prototype = {
        init: function () {
            var e = this;
            window.console = window.console || {
                log: function () {}
            }, seajs.bDebugMode || "function" != typeof window.console.log || (window.console.log = function () {}), $.ajaxSetup({
                timeout: 3e4,
                beforeSend: function (e) {
                    e.setRequestHeader("If-Modified-Since", "0")
                },
                statusCode: {
                    401: function () {
                        e.goLogin()
                    },
                    403: function (t) {
                        "notActivated" == Utils.nodeValue(t, "subStatusCode") && e.goLogin()
                    }
                }
            });
            var n = ["login", "pwdReset"];
            if (-1 === $.inArray(e.m_szPage, n)) {
                if (e.m_szSessionId = WebSession.getItem("sessionId"), e.m_szSessionId && "" != e.m_szSessionId && e.setAuthMode("session"), e.m_szNamePwd = WebSession.getItem("userInfo"), null === e.m_szNamePwd) return e.goLogin(), void 0;
                var s = t.decode(e.m_szNamePwd);
                e.m_bSession && (s = Utils.decodeAES(s, MD5(e.m_szSessionId)), e.m_szNamePwd = s, s = t.decode(s));
                var a = Utils.parseNamePwd(s);
                e.m_oLoginUser.szName = a.szName, WebSDK.WSDK_SetLoginInfo(e.m_szHostName, e.m_iHttpProtocal, e.m_iHttpPort, a.szName, a.szPass, {
                    sessionId: e.m_szSessionId
                }), e.updatePluginAuth(a.szName, a.szPass), e.sessionHeartbeat()
            }
            // e.extendJQuery(), e.overrideAngular(), e.initLan(), e.initModule()
        },
        updateWebAuth: function (e, n) {
            var s = this,
                a = t.encode(e + ":" + n);
            s.m_szNamePwd = a, s.m_bSession && (0 === s.m_szSessionId.length && (s.m_szSessionId = WebSession.getItem("sessionId")), a = t.encode(Utils.encodeAES(a, MD5(s.m_szSessionId)))), WebSession.setItem("userInfo", a), WebSDK.WSDK_SetLoginInfo(s.m_szHostName, s.m_iHttpProtocal, s.m_iHttpPort, e, n, {
                sessionId: s.m_szSessionId
            })
        },
        setAuthMode: function (e) {
            var t = this;
            t.m_bSession = "session" === e, t.m_bDigest = !t.m_bSession
        },
        updatePluginAuth: function (e, i) {
            var n = this,
                o = "";
            n.m_bSession ? o = "::" : n.m_bDigest && (o = ":"), n.m_bAnonymous ? n.m_szPluginNamePwd = t.encode(o) : (n.m_szPluginNamePwd = t.encode(":" + e + ":" + i), n.m_bSession && (n.m_szPluginSessionId = t.encode(o + n.m_szSessionId)))
        },
        getPluginAuth: function () {
            var e = this,
                t = e.m_szPluginNamePwd;
            return e.m_bSession && (t = e.m_szPluginSessionId), t
        },
        initLoginUserInfo: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(e.m_szHostName, "user", null, {
                async: !1,
                success: function (t, i) {
                    $(i).find("User").each(function () {
                        if (e.m_oLoginUser.szName === Utils.nodeValue(this, "userName")) {
                            var t = Utils.nodeValue(this, "userLevel");
                            "Administrator" === t ? e.m_oLoginUser.szType = "admin" : "Operator" === t ? e.m_oLoginUser.szType = "operator" : "Viewer" === t && (e.m_oLoginUser.szType = "viewer")
                        }
                    })
                },
                error: function () {
                    "admin" === e.m_oLoginUser.szName && (e.m_oLoginUser.szType = "admin")
                }
            })
        },
        resize: function () {},
        // initLan: function () {
        //     var e = this,
        //         t = $.cookie("language");
        //     if (null === t) {
        //         var i = (navigator.language || navigator.browserLanguage).toLowerCase();
        //         if (t = i.substring(0, 2), "zh" == t) {
        //             var o = i.split("-");
        //             2 == o.length && (t = o[0] + "_" + o[1].toUpperCase(), "cn" == o[1] && (t = "zh"))
        //         }
        //     }
        //     var s = null !== $.cookie("dispatch");
        //     s && $.cookie("dispatch", null), $("#language_list").length > 0 || s ? n.initLanguageSelect(t, e) : n.szCurLanguage = t, e.m_oLanCommon = n.getLanguage("Common"), $("#footer").text("©20" + seajs.web_version.substr(seajs.web_version.indexOf("build") + 5, 2) + " Hikvision Digital Technology Co., Ltd. All Rights Reserved.")
        // },
        initCSS: function () {},
        initModule: function () {
            var e = this;
            require.async(e.m_szPage, function (e) {
                e && (e.init(), $(window).bind({
                    unload: function () {
                        try {
                            e.unload()
                        } catch (t) {}
                    }
                }))
            })
        },
        overrideAngular: function () {
            angular.oldModule = Utils.cloneFunc(angular.module), angular.module = function () {
                var e = angular.oldModule.apply(angular.oldModule, arguments);
                return e.config(function ($provide) {
                    $provide.decorator("ngBindDirective", ["$delegate", function (e) {
                        return e.shift(), e
                    }])
                }), e.directive("ngBind", function () {
                    return {
                        restrict: "A",
                        replace: !1,
                        link: function (e, t, i) {
                            t.addClass("ng-binding").data("$binding", i.ngBind), e.$watch(i.ngBind, function (e) {
                                if (t.text(void 0 == e ? "" : e), e && "" != e && t.is(":visible")) {
                                    var i = t.get(0).scrollWidth,
                                        n = t.outerHeight(!0);
                                    if (0 === i) {
                                        i = t.parent().width(), n = t.parent().outerHeight(!0);
                                        var o = 0,
                                            s = $(t).outerHeight(!0),
                                            a = t.siblings("input,label").length;
                                        1 == a ? t.parent().children().each(function () {
                                            o += $(this).outerWidth(!0)
                                        }) : o += $(t).outerWidth(!0), (o > i || s > n) && 1 >= t.siblings().length && t.parent().addClass("ellipsis").attr("title", $.trim(t.parent().text()))
                                    } else {
                                        var a = t.siblings("input,label").length,
                                            r = t.width();
                                        if (1 == a) {
                                            var c = t.siblings("input,label").eq(0).outerWidth();
                                            (c + i + 5 >= t.parent().width() || n > t.parent().height()) && t.parent().addClass("ellipsis").attr("title", $.trim(t.parent().text()))
                                        } else if (i > r || n > t.height()) {
                                            var u = $.trim(t.text());
                                            if ("BUTTON" === t.get(0).tagName) {
                                                var l = "none" === t.css("max-width") ? 1 / 0 : parseInt(t.css("max-width"));
                                                if (i > l) {
                                                    var m = Math.floor(t.text().length * r / i),
                                                        d = u.substring(0, m - 3) + "...";
                                                    t.attr("title", $.trim(t.text())).text(d)
                                                } else t.addClass("ellipsis").attr("title", u)
                                            } else t.addClass("ellipsis").attr("title", u)
                                        } else(i > t.parent().width() || n > t.parent().height()) && t.parent().addClass("ellipsis").attr("title", $.trim(t.parent().text()))
                                    }
                                }
                            })
                        }
                    }
                }), e
            }
        },
        sessionHeartbeat: function () {
            var e = this;
            if (e.m_bSession) {
                var t = 3e4;
                e.m_iSessionInterval > 0 && clearInterval(e.m_iSessionInterval), e.m_iSessionInterval = setInterval(function () {
                    WebSDK.WSDK_SetDeviceConfig(e.m_szHostName, "sessionHeartbeat", null, {
                        success: function () {
                            e.m_iSessionFailed = 0
                        },
                        error: function (t, i) {
                            e.m_iSessionFailed++, t > 300 && "notActivated" === Utils.nodeValue(i, "subStatusCode") && (e.m_iSessionInterval > 0 && clearInterval(e.m_iSessionInterval), e.goLogin())
                        },
                        complete: function () {
                            e.m_iSessionFailed >= 5 && (clearInterval(e.m_iSessionInterval), e.isDeviceAccessible() ? e.goLogin() : WebSDK.m_bReConnecting ? e.goLogin() : e.reconnect())
                        }
                    })
                }, t)
            }
        },
        goLogin: function () {
            var e = this,
                t = "login.asp?_" + (new Date).getTime() + "&page=" + e.m_szPage;
            window.location.href = t
        },
        extendJQuery: function () {
            $.browser || ($.extend({
                browser: {}
            }), function () {
                var e = navigator.userAgent.toLowerCase(),
                    t = /(webkit)[ \/]([\w.]+)/,
                    i = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                    n = /(msie) ([\w.]+)/,
                    o = /(trident.*rv:)([\w.]+)/,
                    s = /(mozilla)(?:.*? rv:([\w.]+))?/,
                    a = t.exec(e) || i.exec(e) || n.exec(e) || o.exec(e) || 0 > e.indexOf("compatible") && s.exec(e) || [];
                a.length > 0 && a[1].indexOf("trident") > -1 && (a[1] = "msie"), a[1] && ($.browser[a[1]] = !0, $.browser.version = a[2] || ""), $.browser.webkit && ($.browser.safari = !0)
            }())
        },
        doLogin: function (username, password, finishCB, errorCB, r, c) {
            var u = this;
            WebSession.removeItem("sessionId");
            var l = "",
                curTime = (new Date).getTime();
            WebSDK.WSDK_Request(u.m_szHostName, u.m_iHttpProtocal, u.m_iHttpPort, {
                cmd: "sessionCap",
                async: !1,
                name: username,
                password: password,
                data: {
                    username: username
                },
                queryObject: !0,
                processData: !0,
            })
            .then((t,i)=>{
                u.setAuthMode("session");
                var s = Utils.nodeValue(i, "sessionID"),
                    a = Utils.nodeValue(i, "challenge"),
                    r = Utils.nodeValue(i, "iterations", "i"),
                    c = Utils.nodeValue(i, "isIrreversible", "b"),
                    m = Utils.nodeValue(i, "salt"),
                    d = Utils.encodePwd(password, {
                        challenge: a,
                        userName: username,
                        salt: m,
                        iIterate: r
                    }, c);
                l = "<SessionLogin>", 
                l += "<userName>" + Utils.encodeString(username) + "</userName>", 
                l += "<password>" + d + "</password>", 
                l += "<sessionID>" + s + "</sessionID>", 
                l += "</SessionLogin>"
                return $.Deferred().resolve(l)
            }, ()=>{
                u.setAuthMode("digest")
            })
            .then((l)=>{
                WebSDK.WSDK_Login(u.m_szHostName, u.m_iHttpProtocal, u.m_iHttpPort, username, password, curTime, {
                    session: u.m_bSession,
                    data: l,
                    success: function (a, l) {
                        // var m = username + ":" + password;
                        // u.m_bSession && (u.m_szSessionId = Utils.nodeValue(l, "sessionID"), 
                        // WebSession.setItem("sessionId", u.m_szSessionId), 
                        // m = Utils.encodeAES(t.encode(m), MD5(u.m_szSessionId)), 
                        // u.sessionHeartbeat()), 
                        // WebSession.setItem("userInfo", t.encode(m)), 
                        "function" == typeof finishCB && finishCB.apply(r, [a, l].concat(c || []))
                    },
                    error: function (e, t) {
                        "function" == typeof errorCB && errorCB.apply(r, [e, t].concat(c || []))
                    }
                })
            })
        },
        exportGuid: function (e, i, a) {
            var r = this,
                c = r.m_szHttpProtocol + r.m_szHostName + ":" + r.m_iHttpPort + "/ISAPI/Security/GUIDFileData",
                u = MD5("" + (new Date).getTime());
            c = WebSDK.getSecurityVersion(c, u);
            var l = Utils.encodeAES(t.encode(Utils.encodeString(e)), WebSDK.szAESKey, u),
                m = "<?xml version='1.0' encoding='UTF-8'?><LoginPassword><password>" + l + "</password></LoginPassword>",
                d = i.exportFile(c, r.getPluginAuth(), m, 2, 0);
            if (0 === d) s.alert(n.getValue("exportOK"));
            else {
                if (1 === d) return;
                var p = n.getValue("exportFailed"),
                    m = i.getHttpErrorInfo();
                if (m && -1 !== m.indexOf("<?xml")) {
                    var g = Utils.parseXmlFromStr(m),
                        f = r.getLockTips(g),
                        _ = Number(i.getLastError()),
                        h = {
                            readyState: 4,
                            status: _ > 300 ? _ : 400,
                            responseXML: g
                        };
                    p = a.saveState(h, f.szTips, void 0, !0)
                }
                s.alert(p)
            }
        },
        setSecurityQA: function (e, t, i, a, r) {
            for (var c = this, u = [], l = !0, m = "<?xml version='1.0' encoding='UTF-8'?><SecurityQuestion><QuestionList>", d = 0, p = WebSDK.oSecurityCap.iMaxQANum; p > d; d++) {
                if (d && $.inArray(e[d].szId, u) > -1) return s.alert(n.getValue("sameSQAnswerTips")), !1;
                m += "<Question><id>" + e[d].szId + "</id><answer>" + Utils.encodeString(e[d].szAnswer) + "</answer></Question>", u.push(e[d].szId)
            }
            return m += "</QuestionList>", m += "<password>" + Utils.encodeString(t) + "</password>", m += "</SecurityQuestion>", WebSDK.WSDK_SetDeviceConfig(c.m_szHostName, "questionInfoList", null, {
                data: m,
                async: !1,
                success: function () {
                    r && s.alert(n.getValue("saveSucceeded"))
                },
                error: function (e, t, n) {
                    l = !1;
                    var o = c.getLockTips(t);
                    s.alert(i.saveState(n, o.szTips, void 0, !0))
                }
            }), l ? ("function" == typeof a && a(), void 0) : !1
        },
        getLockTips: function (e) {
            var t = "",
                i = Utils.nodeValue(e, "lockStatus"),
                s = Utils.nodeValue(e, "resLockTime", "i"),
                a = Utils.nodeValue(e, "retryTimes", "i"),
                r = "locked" === i;
            if (r) {
                var c;
                60 > s ? c = n.getValue("seconds") : (s = Math.ceil(s / 60), c = n.getValue("minute")), t = n.getValue("userLock", [s, c])
            } else "unlock" === i && (t = n.getValue("lockTimeTips", [a]));
            return {
                bLocked: r,
                szTips: t
            }
        },
        isDeviceFileExist: function (e) {
            var t = this,
                i = !1;
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "webPing", {
                cmd: e
            }, {
                async: !1,
                timeout: 2e3,
                success: function () {
                    i = !0
                },
                error: function () {
                    i = !1
                }
            }), i
        },
        isDeviceAccessible: function () {
            var e = this,
                t = !1;
            return WebSDK.WSDK_DeviceLan(e.m_szHostName, e.m_iHttpProtocal, e.m_iHttpPort, {
                async: !1,
                timeout: 2e3,
                success: function () {
                    t = !0
                }
            }), t
        },
        reconnect: function (e, t) {
            var i = this;
            WebSDK.m_bReConnecting || (i.m_iReconnectFailed = 0, i.reconnectProcess(e, t), WebSDK.m_bReConnecting = !0)
        },
        reconnectProcess: function (e, t) {
            var i = this;
            if (i.m_iReconnectFailed > 180) return i.goLogin(), void 0;
            if (i.m_bSession) WebSDK.WSDK_DeviceLan(i.m_szHostName, i.m_iHttpProtocal, i.m_iHttpPort, {
                async: !1,
                timeout: 5e3,
                success: function () {
                    e && e.close(), WebSDK.m_bReConnecting = !1, i.goLogin()
                },
                error: function () {
                    i.m_iReconnectFailed++, setTimeout(function () {
                        i.reconnectProcess(e, t)
                    }, 5e3)
                }
            });
            else {
                var n = (new Date).getTime();
                WebSDK.WSDK_GetDeviceConfig(i.m_szHostName, "login", {
                    timeStamp: n
                }, {
                    success: function () {
                        e && e.close(), WebSDK.m_bReConnecting = !1, "function" == typeof t && t()
                    },
                    error: function () {
                        i.m_iReconnectFailed++, setTimeout(function () {
                            i.reconnectProcess(e, t)
                        }, 5e3)
                    }
                })
            }
        },
        getDispatchInfo: function (e) {
            var t, n = this,
                o = WebSession.getItem("deviceInfo");
            o ? (t = JSON.parse(o), t.iConfigIp = t.DeviceInfo.ip.match(/^[^\[][a-z0-9]*:/i) ? "[" + t.DeviceInfo.ip + "]" : t.DeviceInfo.ip, t.iPreviewIp = t.DeviceInfo.ip.match(/^[^\[][a-z0-9]*:/i) ? "[" + t.DeviceInfo.ip + "]" : t.DeviceInfo.ip, t.iOriginalIp = t.DeviceInfo.ip.replace(/\[|\]/g, ""), t.iPort = t.DeviceInfo.httpPort) : t = {
                iConfigIp: location.hostname.match(/^[^\[][a-z0-9]*:/i) ? "[" + location.hostname + "]" : location.hostname,
                iPreviewIp: location.hostname.match(/^[^\[][a-z0-9]*:/i) ? "[" + location.hostname + "]" : location.hostname,
                iOriginalIp: location.hostname.replace(/\[|\]/g, ""),
                iPort: location.port ? location.port : "https://" === this.m_szHttpProtocol ? 443 : 80
            }, t.iConfigIp = n.getIPStr(t.iConfigIp), t.iPreviewIp = n.getIPStr(t.iPreviewIp);
            var s = "";
            switch (e) {
                case "configIp":
                    s = t.iConfigIp;
                    break;
                case "previewIp":
                    s = t.iPreviewIp;
                    break;
                case "originalIp":
                    s = t.iOriginalIp;
                    break;
                case "port":
                    s = t.iPort;
                    break;
                case "httpPort":
                    s = location.port ? location.port : 80;
                    break;
                case "httpsPort":
                    s = location.port ? location.port : 443;
                default:
            }
            return s
        },
        getIPStr: function (e) {
            var t = e,
                i = e;
            return e.indexOf("[") > -1 && (i = e.substring(1, e.length - 1)), Utils.isIPv6Address(i) && (t = "[" + i + "]"), t
        }
    }, module.exports = new e
});