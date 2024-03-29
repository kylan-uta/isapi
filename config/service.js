define(function (require, exports, module) {
    function e() {
        this.m_oAnalogChannel = null, this.m_iAnalogChannelNum = 0, this.m_aAnalogChannelId = [], this.m_aAnalogChannelInfo = [], this.m_aOnlineAnalogChannelId = [], this.m_aOnlineAnalogChannelInfo = [], this.m_oDigitalChannel = null, this.m_oDigitalChannelStatus = null, this.m_iDigitalChannelNum = 0, this.m_aDigitalChannelId = [], this.m_aDigitalChannelInfo = [], this.m_aOnlineDigitalChannelId = [], this.m_aOnlineDigitalChannelInfo = [], this.m_aDigitalProtocol = [], this.m_oAnalogAlarmOutput = null, this.m_iAnalogAlarmOutputNum = 0, this.m_aAnalogAlarmOutputId = [], this.m_oDigitalAlarmOutput = null, this.m_iDigitalAlarmOutputNum = 0, this.m_aDigitalAlarmOutputId = [], this.m_oDrawBtn = {
            bDraw: !1
        }, this.m_iChannelId = 0, this.m_szModule = "", this.m_bEnableLocalDetection = !1
    }
    var t, n, a, i, o, r, s;
    t = require("../common"), 
    // n = require("translator"), 
    a = require("../lib/utils"), 
    // i = require("dialog"), 
    o = require("../isapi/device"), 
    // r = require("common/plugin"), 
    // s = require("service"), 
    e.prototype = {
        init: function () {
            var e = this;
            e.m_iChannelId = 0, e.getChannel()
        },
        resetDefaultChannel: function () {
            var e = this;
            e.m_iChannelId = e.m_aOnlineAnalogChannelId.length ? e.m_aOnlineAnalogChannelId[0] : e.m_aOnlineDigitalChannelId.length ? e.m_aOnlineDigitalChannelId[0] : 1
        },
        getChannel: function () {
            var e = this;
            e.m_oAnalogChannel = o.getChannel(o.m_oChannelType.ANALOG);
            var t = $(e.m_oAnalogChannel).find("VideoInputChannel");
            e.m_iAnalogChannelNum = t.length, e.m_aAnalogChannelId.length = 0, e.m_aOnlineAnalogChannelId.length = 0, e.m_aOnlineAnalogChannelInfo.length = 0, e.m_aAnalogChannelInfo.length = 0, $.each(t, function (t) {
                var n = a.nodeValue(this, "id", "i"),
                    i = a.nodeValue(this, "videoInputEnabled"),
                    o = "" === i || "true" === i,
                    r = "";
                0 === e.m_iChannelId && o && (e.m_iChannelId = n), "object" == typeof s.m_aChannelList[t] && (r = s.m_aChannelList[t].szName), o && (e.m_aOnlineAnalogChannelId.push(n), e.m_aOnlineAnalogChannelInfo.push({
                    iChannelId: n,
                    szName: r
                })), e.m_aAnalogChannelInfo.push({
                    iChannelId: n,
                    szName: r
                }), e.m_aAnalogChannelId.push(n)
            }), e.m_oDigitalChannelStatus = o.getChannelStatus(), t = $(e.m_oDigitalChannelStatus).find("InputProxyChannelStatus"), e.m_iDigitalChannelNum = t.length, e.m_aDigitalChannelId.length = 0, e.m_aOnlineDigitalChannelId.length = 0, e.m_aOnlineDigitalChannelInfo.length = 0, e.m_aDigitalProtocol.length = 0, $.each(t, function (t) {
                var n = a.nodeValue(this, "id", "i"),
                    i = a.nodeValue(this, "online", "b"),
                    o = "";
                0 === e.m_iChannelId && i && (e.m_iChannelId = n), "object" == typeof s.m_aChannelList[s.m_iAnalogChNum + t] && (o = s.m_aChannelList[s.m_iAnalogChNum + t].szName), i && (e.m_aOnlineDigitalChannelId.push(n), e.m_aOnlineDigitalChannelInfo.push({
                    iChannelId: n,
                    szName: o
                })), e.m_aDigitalChannelId.push(n), e.m_aDigitalChannelInfo.push({
                    iChannelId: n,
                    szName: o
                }), e.m_aDigitalProtocol.push(a.nodeValue(this, "proxyProtocol"))
            })
        },
        updateChannelName: function (e, t) {
            var n = this;
            $.each(s.m_aChannelList, function (n, a) {
                return e === a.iId ? (s.m_aChannelList[n].szName = t, !1) : void 0
            }), e > n.m_iAnalogChannelNum ? $.each(n.m_aOnlineDigitalChannelInfo, function (a, i) {
                return e === i.iChannelId ? (n.m_aOnlineDigitalChannelInfo[a].szName = t, !1) : void 0
            }) : $.each(n.m_aOnlineAnalogChannelInfo, function (a, i) {
                return e === i.iChannelId ? (n.m_aOnlineAnalogChannelInfo[a].szName = t, !1) : void 0
            })
        },
        updateDigitalName: function (e) {
            var t = this;
            s.updateDigitalChannelName(e);
            var n = t.m_aOnlineDigitalChannelInfo,
                a = s.m_aChannelList.length,
                i = s.m_iAnalogChNum,
                o = s.m_iZeroChanNum;
            $.each(n, function () {
                for (var e = "", t = 0, n = i; a - o > n; n++) e = s.m_aChannelList[i].szName, t = s.m_aChannelList[i].iId, this.iChannelId === t && e !== this.szName && (this.szName = e)
            })
        },
        startPlay: function () {
            if (!r.isInstalled()) return -1;
            var e = this,
                l = e.m_iChannelId,
                c = !1;
            l > 0 && "object" == typeof s.m_aChannelList[l - 1] && (c = "littleEagleEye" === s.m_aChannelList[l - 1].szAttr), r.stop(0);
            var u = -1,
                d = r.getLocalConfig(),
                m = a.parseXmlFromStr(d);
            o.m_oDeviceCapa.bSupportStreamEncrypt && r.setSecretKey(1, a.nodeValue(m, "SecretKey")), u = a.nodeValue(m, "ProtocolType", "i"), 2 !== u && 0 !== u && ($(m).find("ProtocolType").eq(0).text("0"), r.setLocalConfig(a.xmlToStr(m)));
            var p, h, g;
            if (p = "https://" === t.m_szHttpProtocol ? o.m_oDevicePort.iSHttpPort : t.m_iHttpPort, o.m_oSHttpCapa.bSupportShttpPlayback && 0 == u)
                if (h = o.m_oSHttpCapa.bSupportShttpsPlayback ? t.m_szHttpProtocol : "http://", e.m_iAnalogChannelNum >= l) g = h + t.m_szHostName + ":" + p + "/SDK/play/" + 100 * l + "/004";
                else {
                    var f = o.m_oSHttpCapa.iIpChanBase + l - e.m_iAnalogChannelNum - 1;
                    g = h + t.m_szHostName + ":" + p + "/SDK/play/" + 100 * f + "/004"
                }
            else 4 != u && (p = o.m_oDevicePort.iRtspPort), g = "rtsp://" + t.m_szHostName + ":" + p + "/PSIA/streaming/channels/" + (100 * l + 1);
            var y = t.m_szPluginNamePwd;
            t.m_bSession && o.m_oSHttpCapa.bSupportShttpPlay && 0 === u && (y = t.m_szPluginSessionId), c ? (r.SetPlayModeType(10), r.setEagleEyeType(0)) : (r.SetPlayModeType(0), r.setEagleEyeType(1)), 0 === r.play(g, y, 0, "", "") ? (s.m_aWndList[s.m_iWndIndex].bPlay = !0, s.m_aWndList[s.m_iWndIndex].iChannelId = l) : (s.m_aWndList[s.m_iWndIndex].bPlay = !1, s.m_aWndList[s.m_iWndIndex].iChannelId = l, i.alert(n.getValue("previewFailed")))
        },
        getCurrentChannelXml: function () {
            var e = this,
                n = null;
            if (this.m_iChannelId <= this.m_iAnalogChannelNum ? n = this.m_oAnalogChannel : (null === this.m_oDigitalChannel && WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "DigitalChannelInfo", null, {
                    async: !1,
                    success: function (t, n) {
                        e.m_oDigitalChannel = n
                    }
                }), n = this.m_oDigitalChannel), null === n) console.log("Get channel data failed!");
            else {
                $(n).find("id").each(function () {
                    return $(this).text() === "" + e.m_iChannelId ? (n = $(this).parent().clone(!0).get(0), !1) : void 0
                });
                var i = a.createXml();
                i.appendChild(n), n = i
            }
            return n
        },
        getAlarmOutput: function () {
            var e = this,
                t = null;
            e.m_oAnalogAlarmOutput = o.getAlarmOutput(o.m_oAlarmOutputType.ANALOG), t = $(e.m_oAnalogAlarmOutput).find("IOOutputPort"), e.m_iAnalogAlarmOutputNum = t.length, e.m_aAnalogAlarmOutputId = [], $.each(t, function () {
                e.m_aAnalogAlarmOutputId.push(a.nodeValue(this, "id"))
            }), e.m_oDigitalAlarmOutput = o.getAlarmOutput(o.m_oAlarmOutputType.DIGITAL), t = $(e.m_oDigitalAlarmOutput).find("IOProxyOutputPort"), e.m_iDigitalAlarmOutputNum = t.length, e.m_aDigitalAlarmOutputId = [], $.each(t, function () {
                e.m_aDigitalAlarmOutputId.push(a.nodeValue(this, "id"))
            })
        },
        getLinkInfo: function (e, t) {
            var n = this;
            for (var i in e.oNormalLink.oInfo) e.oNormalLink.oInfo[i] = !1;
            var o = $(t).find("notificationMethod");
            $.each(o, function () {
                "email" === $(this).text() ? e.oNormalLink.oInfo.email = !0 : "beep" === $(this).text() ? e.oNormalLink.oInfo.beep = !0 : "center" === $(this).text() ? e.oNormalLink.oInfo.center = !0 : "monitorAlarm" === $(this).text() ? e.oNormalLink.oInfo.monitor = !0 : "FTP" === $(this).text() ? e.oNormalLink.oInfo.ftp = !0 : "cloud" === $(this).text() && (e.oNormalLink.oInfo.cloud = !0)
            });
            var r = null,
                s = 0;
            r = $(t).find("outputIOPortID"), $.each(n.m_aAnalogAlarmOutputId, function () {
                s = "" + this, e.oAlarmLink.oInfo[s] = !1, $.each(r, function () {
                    return $(this).text() === s ? (e.oAlarmLink.oInfo[s] = !0, !1) : void 0
                })
            }), r = $(t).find("dynOutputIOPortID"), $.each(n.m_aDigitalAlarmOutputId, function () {
                s = "" + this, e.oAlarmLink.oInfo[s] = !1, $.each(r, function () {
                    return $(this).text() === s ? (e.oAlarmLink.oInfo[s] = !0, !1) : void 0
                })
            });
            var l = null,
                c = 0;
            l = $(t).find("videoInputID"), $.each(n.m_aAnalogChannelId, function () {
                c = "" + this, e.oRecordLink.oInfo[c] = !1, $.each(l, function () {
                    return $(this).text() === c ? (e.oRecordLink.oInfo[c] = !0, !1) : void 0
                })
            }), l = $(t).find("dynVideoInputID"), $.each(n.m_aDigitalChannelId, function () {
                c = "" + this, e.oRecordLink.oInfo[c] = !1, $.each(l, function () {
                    return $(this).text() === c ? (e.oRecordLink.oInfo[c] = !0, !1) : void 0
                })
            });
            var u = null,
                d = 0,
                m = 0;
            u = $(t).find("ptzAction"), $.each(n.m_aAnalogChannelId, function () {
                m = "" + this, e.oPtzLink.oInfo[m] = e.oPtzLink.oInfo[m] || {}, e.oPtzLink.oInfo[m].szType = "", e.oPtzLink.oInfo[m].iNo = 0, $.each(u, function () {
                    return d = a.nodeValue(this, "ptzChannelID"), d === m ? (e.oPtzLink.oInfo[m].szType = a.nodeValue(this, "actionName"), e.oPtzLink.oInfo[m].iNo = a.nodeValue(this, "actionNum", "i"), !1) : void 0
                })
            }), $.each(n.m_aDigitalChannelId, function () {
                m = "" + this, e.oPtzLink.oInfo[m] = e.oPtzLink.oInfo[m] || {}, e.oPtzLink.oInfo[m].szType = "", e.oPtzLink.oInfo[m].iNo = 0, $.each(u, function () {
                    return d = a.nodeValue(this, "ptzChannelID"), d === m ? (e.oPtzLink.oInfo[m].szType = a.nodeValue(this, "actionName"), e.oPtzLink.oInfo[m].iNo = a.nodeValue(this, "actionNum", "i"), !1) : void 0
                })
            })
        },
        setLinkInfo: function (e, t, n) {
            var a = "<?xml version='1.0' encoding='UTF-8'?>";
            a += "<EventTrigger><id>" + t + "-" + n + "</id><eventType>" + t + "</eventType>", a += this.m_iAnalogChannelNum >= n ? "<videoInputChannelID>" + n + "</videoInputChannelID><EventTriggerNotificationList>" : "<dynVideoInputChannelID>" + n + "</dynVideoInputChannelID><EventTriggerNotificationList>";
            var i = e.oAlarmLink.oInfo;
            $.each(e.oAlarmLink.aAnalogAlarmId, function () {
                i[this] && (a += "<EventTriggerNotification><id>IO-" + this + "</id>", a += "<notificationMethod>IO</notificationMethod>", a += "<outputIOPortID>" + this + "</outputIOPortID></EventTriggerNotification>")
            }), $.each(e.oAlarmLink.aDigitalAlarmId, function () {
                i[this] && (a += "<EventTriggerNotification><id>IO-" + this + "</id>", a += "<notificationMethod>IO</notificationMethod>", a += "<dynOutputIOPortID>" + this + "</dynOutputIOPortID></EventTriggerNotification>")
            });
            var o = e.oRecordLink.oInfo;
            $.each(e.oRecordLink.aAnalogChannelId, function () {
                o[this] && (a += "<EventTriggerNotification><id>record-" + this + "</id>", a += "<notificationMethod>record</notificationMethod>", a += "<videoInputID>" + this + "</videoInputID></EventTriggerNotification>")
            }), $.each(e.oRecordLink.aDigitalChannelId, function () {
                o[this] && (a += "<EventTriggerNotification><id>record-" + parseInt(this, 10) + "</id>", a += "<notificationMethod>record</notificationMethod>", a += "<dynVideoInputID>" + parseInt(this, 10) + "</dynVideoInputID></EventTriggerNotification>")
            });
            var r = e.oNormalLink.oInfo;
            r.email && (a += "<EventTriggerNotification><id>email</id><notificationMethod>email</notificationMethod></EventTriggerNotification>"), e.oNormalLink.bMonitor && r.monitor && (a += "<EventTriggerNotification><id>monitorAlarm</id><notificationMethod>monitorAlarm</notificationMethod></EventTriggerNotification>"), r.beep && (a += "<EventTriggerNotification><id>beep</id><notificationMethod>beep</notificationMethod></EventTriggerNotification>"), r.center && (a += "<EventTriggerNotification><id>center</id><notificationMethod>center</notificationMethod></EventTriggerNotification>"), e.oNormalLink.bFtp && r.ftp && (a += "<EventTriggerNotification><id>FTP</id><notificationMethod>FTP</notificationMethod></EventTriggerNotification>"), e.oNormalLink.bCloud && r.cloud && (a += "<EventTriggerNotification><id>cloud</id><notificationMethod>cloud</notificationMethod></EventTriggerNotification>");
            var s = e.oPtzLink.oInfo;
            return $.each(e.oRecordLink.aAnalogChannelId, function () {
                return "" === s[this].szType || 0 === s[this].iNo ? !0 : (a += "<EventTriggerNotification><id>ptz" + this + "-" + s[this].szType + s[this].iNo + "</id>", a += "<notificationMethod>ptz</notificationMethod><ptzAction>", a += "<ptzChannelID>" + this + "</ptzChannelID><actionName>" + s[this].szType + "</actionName>", a += "<actionNum>" + s[this].iNo + "</actionNum></ptzAction></EventTriggerNotification>", void 0)
            }), $.each(e.oRecordLink.aDigitalChannelId, function () {
                return "" === s[this].szType || 0 === s[this].iNo ? !0 : (a += "<EventTriggerNotification><id>ptz" + this + "-" + s[this].szType + s[this].iNo + "</id>", a += "<notificationMethod>ptz</notificationMethod><ptzAction>", a += "<ptzChannelID>" + this + "</ptzChannelID><actionName>" + s[this].szType + "</actionName>", a += "<actionNum>" + s[this].iNo + "</actionNum></ptzAction></EventTriggerNotification>", void 0)
            }), a += "</EventTriggerNotificationList></EventTrigger>"
        },
        getSchedule: function (e, t) {
            for (var n = $(t).find("TimeBlockList").eq(0).find("TimeBlock"), i = -1, r = 0; 8 > r; r++) e[r] = [];
            $.each(n, function () {
                i = a.nodeValue(this, "dayOfWeek", "i") - 1, e[i].push({
                    sTime: $(this).find("TimeRange").eq(0).find("beginTime").eq(0).text(),
                    eTime: $(this).find("TimeRange").eq(0).find("endTime").eq(0).text(),
                    type: "CMR"
                })
            }), o.m_oDeviceCapa.bSupportHoliday && (n = $(t).find("HolidayBlockList").eq(0).find("TimeBlock"), i = 7, $.each(n, function () {
                e[i].push({
                    sTime: $(this).find("TimeRange").eq(0).find("beginTime").eq(0).text(),
                    eTime: $(this).find("TimeRange").eq(0).find("endTime").eq(0).text(),
                    type: "CMR"
                })
            }))
        },
        setSchedule: function (e, t) {
            var n = this,
                a = "<?xml version='1.0' encoding='UTF-8'?><Schedule>";
            return a += "<id>" + t + "-" + n.m_iChannelId + "</id><eventType>" + t + "</eventType>", a += "<videoInputID>" + n.m_iChannelId + "</videoInputID><TimeBlockList>", $.each(e.m_aTimes, function (e, t) {
                t.length > 0 && 7 > e && $.each(t, function () {
                    a += "<TimeBlock><dayOfWeek>" + (e + 1) + "</dayOfWeek><TimeRange><beginTime>" + this.sTime + "</beginTime><endTime>" + this.eTime + "</endTime></TimeRange></TimeBlock>"
                })
            }), a += "</TimeBlockList><HolidayBlockList>", o.m_oDeviceCapa.bSupportHoliday && $.each(e.m_aTimes[7], function () {
                a += "<TimeBlock><TimeRange><beginTime>" + this.sTime + "</beginTime><endTime>" + this.eTime + "</endTime></TimeRange></TimeBlock>"
            }), a += "</HolidayBlockList></Schedule>"
        },
        drawArea: function () {
            var e = this;
            e.m_oDrawBtn.bDraw = !e.m_oDrawBtn.bDraw, r.setDrawStatus(e.m_oDrawBtn.bDraw)
        },
        clearDraw: function () {
            i.confirm(n.getValue("clearDrawArea"), null, function () {
                r.clearRegion()
            })
        },
        isPTZLock: function () {
            var e = this,
                n = !1;
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "lockPTZ", {
                channel: e.m_iChannelId
            }, {
                async: !1,
                success: function () {
                    n = !0
                },
                error: function () {
                    n = !1
                }
            }), n
        },
        rangeValid: function (e, t, n) {
            var a = e;
            return "number" == typeof e && "number" == typeof t && "number" == typeof n && (t > e ? a = t : e > n && (a = n)), a
        },
        checkPolygonValid: function (e) {
            var t = this,
                n = e.length;
            if (4 > n) return !0;
            for (var a = 2; n > a; a++)
                for (var i = 0; a - 2 >= i; i++)
                    if ((a != n - 1 || 0 != i) && t.checkLineIntersect(e[a], "object" == typeof e[a + 1] ? e[a + 1] : e[0], e[i], e[i + 1])) return !1;
            return !0
        },
        checkLineIntersect: function (e, t, n, a) {
            var i = (a.x - n.x) * (e.y - n.y) - (a.y - n.y) * (e.x - n.x),
                o = (t.x - e.x) * (e.y - n.y) - (t.y - e.y) * (e.x - n.x),
                r = (a.y - n.y) * (t.x - e.x) - (a.x - n.x) * (t.y - e.y);
            if (0 != r) {
                var s = i / r,
                    l = o / r;
                return s >= 0 && 1 >= s && l >= 0 && 1 >= l ? !0 : !1
            }
            return 0 == i || 0 == o ? !0 : !1
        },
        getPtzChannnelCap: function (e) {
            var n = null;
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "ptzChannelInfo", {
                channel: e || s.m_iChannelId
            }, {
                async: !1,
                success: function (e, t) {
                    n = t
                },
                error: function () {}
            }), n
        },
        checkMutexFn: function (e, r, s) {
            if (!o.m_oDeviceCapa.bSptMutexFnCheck || !s) return !1;
            if ("mutexFunction" !== a.nodeValue(s.responseXML, "subStatusCode")) return !1;
            var l = this;
            e = e || l.m_iChannelId;
            var c = "",
                u = !1,
                d = ["lineDetection", "fieldDetection"];
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "mutexFnErrorMsg", null, {
                async: !1,
                success: function (t, i) {
                    var o = {
                        SMD: n.getValue("lineCrossDetect") + "/" + n.getValue("intrusionDetect"),
                        lineDetection: n.getValue("lineCrossDetect"),
                        fieldDetection: n.getValue("intrusionDetect"),
                        sceneChangeDetection: n.getValue("sceneChangeDetection"),
                        vehicleDetection: n.getValue("vehicleDetect"),
                        counting: n.getValue("peopleCount"),
                        heatMap: n.getValue("heatMap")
                    };
                    $(i).find("MutexFunction").each(function () {
                        var t = this,
                            i = a.nodeValue(t, "describe").split(","),
                            s = a.nodeValue(t, "channelNo"),
                            l = s.split(","),
                            u = -1 !== $.inArray("" + e, l),
                            m = [];
                        if ($.each(i, function () {
                                return u && this + "" === r ? !0 : "SMD" == this + "" && -1 !== $.inArray(r, d) ? !0 : (m.push(o[this]), void 0)
                            }), m.length) {
                            var p = m.join(" ");
                            c += n.getValue("mutexFnChannelConflict").replace("%d", s).replace("%s", p)
                        }
                    })
                }
            }), c && (i.alert(n.getValue("noEnoughResource") + c), u = !0), u
        }
    }, module.exports = new e
});