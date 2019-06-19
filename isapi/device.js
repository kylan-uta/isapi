define(function (require, exports, module) {
    function e() {
        this.m_oSHttpCapa = {}, this.m_oDeviceInfo = {}, this.m_oDeviceCapa = {}, this.m_oEventChannelCapa = {
            bSupportFaceSnap: !1,
            bSupportChAudioDection: !0,
            bSupportChDefousDection: !0,
            bSupportChSceneChangeDetection: !0,
            bSupportChFaceDect: !0,
            bSupportChLineDection: !0,
            bSupportChFieldDection: !0,
            bSupportChRegionEntrance: !0,
            bSupportChRegionExit: !0,
            bSupportChLoiter: !0,
            bSupportChGroup: !0,
            bSupportChRapidMove: !0,
            bSupportChPark: !0,
            bSupportChUnattendedBaggage: !0,
            bSupportChAttendedBaggage: !0
        }, this.m_oDevicePort = {
            iSHttpPort: 80,
            iHttpsPort: 443,
            iRtspPort: 554,
            iManagePort: 8e3
        }, this.m_oLinkCapName = {
            cloud: "isSupportCloud",
            monitor: "isSupportMonitorAlarm",
            email: "isSupportEmail",
            beep: "isSupportBeep",
            center: "isSupportCenter",
            alarmOut: "isSupportIO",
            record: "isSupportRecord",
            ptz: "isSupportPTZ"
        }, this.m_oCustomCapa = {
            szCustomModuleName: "",
            bSupportConfigCustom: !1,
            bSupportSystemCustom: !1,
            bSupportNetworkCustom: !1,
            bSupportStorageCustom: !1
        }, this.m_oChannelType = {
            ANALOG: "AnalogChannelInfo",
            DIGITAL: "DigitalChannelInfo",
            ZERO: "ZeroChannelInfo"
        }, this.m_oAlarmOutputType = {
            ANALOG: "AnalogAlarmOutputInfo",
            DIGITAL: "DigitalAlarmOutputInfo"
        }, this.m_oAlarmInputType = {
            ANALOG: "AnalogAlarmInputInfo",
            DIGITAL: "DigitalAlarmInputInfo"
        }, this.getSHttpCapa(), this.getDeviceInfo(), this.getRTSPPort(), this.getDeviceCapa(), this.getTriggersCap(), this.getCustomCap()
    }
    var t = require("../common"),
        n = require("../lib/utils"),
        // a = require("dialog");
    e.prototype = {
        getSHttpCapa: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "sHttpCapa", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oSHttpCapa.bSupportShttpPlay = n.nodeValue(a, "isSupportHttpPlay", "b"), e.m_oSHttpCapa.bSupportShttpPlayback = n.nodeValue(a, "isSupportHttpPlayback", "b"), e.m_oSHttpCapa.bSupportShttpsPlay = n.nodeValue(a, "isSupportHttpsPlay", "b"), e.m_oSHttpCapa.bSupportShttpsPlayback = n.nodeValue(a, "isSupportHttpsPlayback", "b"), e.m_oSHttpCapa.bSupportShttpPlaybackTransCode = n.nodeValue(a, "isSupportHttpTransCodePlayback", "b"), e.m_oSHttpCapa.bSupportShttpsPlaybackTransCode = n.nodeValue(a, "isSupportHttpsTransCodePlayback", "b"), $(a).find("ipChanBase").length > 0 && (e.m_oSHttpCapa.iIpChanBase = n.nodeValue(a, "ipChanBase", "i")), e.m_oSHttpCapa.aTransCodeResolution = $(a).find("transCodePlaybackCap").length > 0 ? $(a).find("transCodePlaybackchannelList").eq(0).find("resolution").eq(0).attr("opt").split(",") : ["255"]
                }
            })
        },
        getDeviceInfo: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "deviceInfo", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceInfo.szDeviceType = n.nodeValue(a, "deviceType"), e.m_oDeviceInfo.szModel = n.nodeValue(a, "model"), e.m_oDeviceInfo.szDeviceName = n.nodeValue(a, "deviceName")
                }
            })
        },
        getChannel: function (e) {
            var n = null;
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, e, null, {
                async: !1,
                success: function (e, t) {
                    n = t
                }
            }), n
        },
        getChannelStatus: function () {
            var e = null;
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "DigitalChannelStatus", null, {
                async: !1,
                success: function (t, n) {
                    e = n
                }
            }), e
        },
        getChannelAttrList: function () {
            var e = null;
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "channelAttrList", null, {
                async: !1,
                success: function (t, n) {
                    e = n
                }
            }), e
        },
        getAlarmOutput: function (e) {
            var n = null;
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, e, null, {
                async: !1,
                success: function (e, t) {
                    n = t
                }
            }), n
        },
        getAlarmInput: function (e) {
            var n = null;
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, e, null, {
                async: !1,
                success: function (e, t) {
                    n = t
                }
            }), n
        },
        getRTSPPort: function () {
            var e = this,
                t = !1;
            t = e.getPPPOEStatus(), t ? e.getInternalRTSPPort() : e.getUPnPStatus()
        },
        getPPPOEStatus: function () {
            var e = !1;
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "PPPoEStatus", null, {
                async: !1,
                success: function (t, a) {
                    e = $(a).find("ipAddress").length > 0 ? n.isDIPAddress(n.nodeValue(a, "ipAddress")) : $(a).find("ipv6Address").length > 0 ? n.isIPv6Address(n.nodeValue(a, "ipv6Address")) : !1
                }
            }), e
        },
        getInternalRTSPPort: function () {
            var e = this,
                a = "";
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "portInfo", null, {
                async: !1,
                success: function (t, i) {
                    $(i).find("AdminAccessProtocol").each(function () {
                        a = n.nodeValue(this, "protocol").toLowerCase(), "rtsp" === a ? e.m_oDevicePort.iRtspPort = n.nodeValue(this, "portNo", "i") : "http" === a ? e.m_oDevicePort.iSHttpPort = n.nodeValue(this, "portNo", "i") : "dev_manage" === a ? e.m_oDevicePort.iManagePort = n.nodeValue(this, "portNo", "i") : "https" === a && (e.m_oDevicePort.iHttpsPort = n.nodeValue(this, "portNo", "i"))
                    })
                }
            })
        },
        getUPnPStatus: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "upnpStatus", null, {
                async: !1,
                success: function (t, a) {
                    var i = 554,
                        o = 80,
                        r = "";
                    $(a).find("portStatusList").eq(0).find("portStatus").each(function () {
                        r = n.nodeValue(this, "internalPort").toLowerCase(), "rtsp" === r && (i = n.nodeValue(this, "externalPort", "i")), "http" === r && (o = n.nodeValue(this, "externalPort", "i"))
                    }), e.getNetworkBond(i, o)
                },
                error: function () {
                    e.getInternalRTSPPort()
                }
            })
        },
        getNetworkBond: function (e, a) {
            var i = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "networkBond", {
                "interface": 1
            }, {
                async: !1,
                success: function (o, r) {
                    if (n.nodeValue(r, "enabled", "b")) {
                        var s = t.getDispatchInfo("originalIp");
                        n.isIPv6Address(s) ? n.nodeValue(r, "ipv6Address") !== s ? (i.m_oDevicePort.iRtspPort = e, i.m_oDevicePort.iSHttpPort = a) : i.getInternalRTSPPort() : n.nodeValue(r, "ipAddress") !== s ? (i.m_oDevicePort.iRtspPort = e, i.m_oDevicePort.iSHttpPort = a) : i.getInternalRTSPPort()
                    } else i.getNetworkInterface(e, a)
                },
                error: function () {
                    i.getNetworkInterface(e, a)
                }
            })
        },
        getNetworkInterface: function (e, a) {
            var i = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "networkInterface", null, {
                async: !1,
                success: function (o, r) {
                    var s = !1,
                        l = t.getDispatchInfo("originalIp");
                    n.isIPv6Address(l) ? ($(r).find("NetworkInterface").each(function () {
                        return n.nodeValue(this, "ipv6Address") === l ? (s = !0, void 0) : ($(this).find("ipv6AddressList").find("v6Address").each(function () {
                            return n.nodeValue(this, "address") === l ? (s = !0, void 0) : void 0
                        }), void 0)
                    }), s ? i.getInternalRTSPPort() : (i.m_oDevicePort.iRtspPort = e, i.m_oDevicePort.iSHttpPort = a)) : ($(r).find("NetworkInterface").each(function () {
                        n.nodeValue(this, "ipAddress") === l && (s = !0)
                    }), s ? i.getInternalRTSPPort() : (i.m_oDevicePort.iRtspPort = e, i.m_oDevicePort.iSHttpPort = a))
                }
            })
        },
        getDeviceCapa: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "deviceCapa", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceCapa.bSupportATM = n.nodeValue($(a).find("SysCap").eq(0), "isSupportAtm", "b"), e.m_oDeviceCapa.bSupportTransCode = n.nodeValue($(a).find("RacmCap").eq(0), "isSupportTransCode", "b"), $(a).find("PTZCtrlCap").length > 0 && (e.m_oDeviceCapa.bSupportPatrols = n.nodeValue($(a).find("PTZCtrlCap").eq(0), "isSupportPatrols", "b")), e.m_oDeviceCapa.bSupportStreamEncrypt = n.nodeValue(a, "isSupportStreamingEncrypt", "b"), e.m_oDeviceCapa.bSupportPicDown = n.nodeValue(a, "isSupportSrcIDSearch", "b"), e.m_oDeviceCapa.bSupportReversePlayback = !("false" === $(a).find("isSupportReversePlayback").eq(0).text()), e.m_oDeviceCapa.bSupportHoliday = n.nodeValue(a, "isSupportHolidy", "b"), e.m_oDeviceCapa.bSupportFtp = n.nodeValue(a, "isSupportFtp", "b"), e.m_oDeviceCapa.bSupportExtHdCfg = n.nodeValue(a, "isSupportExtHdCfg", "b"), e.m_oDeviceCapa.bSupportPnp = n.nodeValue(a, "isSupportPNP", "b"), e.m_oDeviceCapa.bSupportZeroChan = n.nodeValue(a, "RacmCap isSupportZeroChan", "b"), e.m_oDeviceCapa.bSupportDST = n.nodeValue(a, "isSupportDst", "b"), e.m_oDeviceCapa.bSupport232Config = n.nodeValue($(a).find("SerialCap").eq(0), "supportRS232Config", "b");
                    var i = n.nodeValue($(a).find("RacmCap").eq(0), "isSupportPTZRs485Proxy", "b");
                    e.m_oDeviceCapa.bSupport485 = n.nodeValue($(a).find("SerialCap").eq(0), "rs485PortNums", "i") > 0 || i, e.m_oDeviceCapa.bSupportEZVIZ = n.nodeValue(a, "isSupportEZVIZ", "b"), e.m_oDeviceCapa.bSupportEhome = n.nodeValue(a, "isSupportEhome", "b"), e.m_oDeviceCapa.bSupportWirelessDial = n.nodeValue($(a), "isSupportWirelessDial", "b"), e.m_oDeviceCapa.bSupportSnmp = n.nodeValue($(a).find("SnmpCap").eq(0), "isSupport", "b"), e.m_oDeviceCapa.bSupportIpcStreamType = n.nodeValue($(a).find("RacmCap").eq(0), "isSupportIpcStreamType", "b"), e.m_oDeviceCapa.bSupportNetPreviewStrategy = n.nodeValue($(a).find("NetworkCap").eq(0), "isSupportNetPreviewStrategy", "b"), e.m_oDeviceCapa.bSupportIpcImport = n.nodeValue($(a).find("RacmCap").eq(0), "isSupportIpcImport", "b"), e.m_oDeviceCapa.bSupportNfs = n.nodeValue($(a).find("RacmCap").eq(0), "nasNums", "i") > 0, e.m_oDeviceCapa.bSupportAnalogChan = n.nodeValue($(a).find("VideoCap").eq(0), "videoInputPortNums", "i") > 0, e.m_oDeviceCapa.bSupportDigitalChan = n.nodeValue($(a).find("RacmCap").eq(0), "inputProxyNums", "i") > 0, e.m_oDeviceCapa.bSupportMenu = n.nodeValue($(a).find("VideoCap").eq(0), "menuNums", "i") > 0, e.m_oDeviceCapa.bSupportAudio = $(a).find("AudioCap").length > 0;
                    var o = n.nodeValue($(a).find("RacmCap").eq(0), "isSupportIOInputProxy", "b");
                    e.m_oDeviceCapa.bSupportAlarmIn = n.nodeValue($(a).find("IOCap").eq(0), "IOInputPortNums", "i") > 0 || o;
                    var r = n.nodeValue($(a).find("RacmCap").eq(0), "isSupportIOOutputProxy", "b");
                    e.m_oDeviceCapa.bSupportAlarmOut = n.nodeValue($(a).find("IOCap").eq(0), "IOOutputPortNums", "i") > 0 || r, e.m_oDeviceCapa.bSupportIPFilter = n.nodeValue(a, "isSupportIPFilter", "b"), e.m_oDeviceCapa.bSupportHddTest = n.nodeValue(a, "isSupportSMARTTest", "b"), e.m_oDeviceCapa.bSupportCapture = n.nodeValue(a, "isSupportSnapshot", "b"), e.m_oDeviceCapa.bSupportPlatformAccess = n.nodeValue($(a).find("MegaPlatformCap").eq(0), "isSupportPlatformAccess", "b"), e.m_oDeviceCapa.bSupportPlatformNMSAccess = n.nodeValue($(a).find("MegaPlatformCap").eq(0), "isSupportNetManagerAccess", "b"), e.m_oDeviceCapa.bSupportPlatformReset = n.nodeValue($(a).find("MegaPlatformCap").eq(0), "isSupportVSB", "b"), e.m_oDeviceCapa.bSupportPlatformVBS = n.nodeValue($(a).find("MegaPlatformCap").eq(0), "isSupportPlatReset", "b"), e.m_oDeviceCapa.bSupport28181Service = n.nodeValue($(a).find("NetworkCap").eq(0), "isSupportGB28181Service", "b");
                    var s = $(a).find("NetworkCap").eq(0);
                    if (e.m_oDeviceCapa.bSupportDdns = n.nodeValue(s, "isSupportDdns", "b"), e.m_oDeviceCapa.bSupportPPPoE = n.nodeValue(s, "isSupportPPPoE", "b"), e.m_oDeviceCapa.bSupportUpnp = n.nodeValue(s, "isSupportUpnp", "b"), e.m_oDeviceCapa.bSupportFtp = n.nodeValue(s, "isSupportFtp", "b"), e.m_oDeviceCapa.bSupportHttps = n.nodeValue(s, "isSupportHttps", "b"), e.m_oDeviceCapa.bSupportNetworkOther = n.nodeValue(s, "isSupportExtNetCfg", "b"), e.m_oDeviceCapa.bSupportWifi = n.nodeValue(s, "isSupportWireless", "b"), e.m_oDeviceCapa.m_bSupportWAN = n.nodeValue(s, "isSupportWAN", "b"), e.m_oDeviceCapa.bSupportWPS = n.nodeValue(s, "WPSCap isSupport", "b"), e.m_oDeviceCapa.bSupportWLANAP = n.nodeValue(s, "isSupportWirelessServer", "b") || n.nodeValue(s, "isSupportWirelessServerWithExternal", "b"), e.m_oDeviceCapa.bSptVerificationCode = !!$(s).find("VerificationCodeModification").length, e.m_oDeviceCapa.bSptVerificationLink = n.nodeValue(s, "isSupportDeclarationURL", "b"), e.m_oDeviceCapa.bSptVerificationCode && (e.m_oDeviceCapa.oVerifyCodeInfo = {
                            bEmpty: "empty" === n.nodeValue(s, "verificationCodeType"),
                            bSptModifyJudge: $(s).find("verificationCodeModify").length > 0,
                            bModified: n.nodeValue(s, "verificationCodeModify", "b"),
                            szDeclarationURL: n.nodeValue(s, "declarationURL"),
                            szPrivacyPolicyURL: n.nodeValue(s, "privacyPolicyURL")
                        }), e.m_oDeviceCapa.bOldVerificationCode = n.nodeValue(s, "isSupportOldVerificationCode", "b"), e.m_oDeviceCapa.bSupportSubStreamPlayback = n.nodeValue(a, "isSupportMainAndSubRecord", "b"), e.m_oDeviceCapa.bSupportAdvertising = n.nodeValue($(a).find("RacmCap").eq(0), "isSupportAdvertising", "b"), e.m_oDeviceCapa.bSupportThirdCloud = n.nodeValue($(a), "isSupportCloud", "b"), e.m_oDeviceCapa.m_bSupportMulticast = n.nodeValue($(a).find("StreamingWithoutChan").eq(0), "isSupportActiveMulticast", "b"), e.m_oDeviceCapa.m_bSupportRtmp = n.nodeValue($(a).find("StreamingWithoutChan").eq(0), "isSupportRTMPConfig", "b"), e.m_oDeviceCapa.bIsSupportRegCrop = n.nodeValue($(a).find("StreamingWithoutChan").eq(0), "isSupportRegionClip", "b"), e.m_oDeviceCapa.bSupportVGAAdjust = n.nodeValue($(a).find("StreamingWithoutChan").eq(0), "isSupportVGAConfig", "b"), e.m_oDeviceCapa.bSupportFireDetection = n.nodeValue($(a).find("ThermalCap").eq(0), "isSupportFireDetection", "b"), e.m_oDeviceCapa.bSupportThermometry = n.nodeValue($(a).find("ThermalCap").eq(0), "isSupportThermometry", "b"), e.m_oDeviceCapa.bSupportPOS = n.nodeValue($(a).find("RacmCap").eq(0), "isSupportPOS", "b"), e.m_oDeviceCapa.bSupportSmartSearch = n.nodeValue($(a).find("RacmCap").eq(0), "isSupportSmartSearch", "b"), $(a).find("TestCap").length > 0) {
                        var l = $(a).find("TestCap").eq(0);
                        e.m_oDeviceCapa.isSupportFTPTest = n.nodeValue(l, "isSupportFTPTest", "b"), e.m_oDeviceCapa.isSupportPingTest = n.nodeValue(l, "isSupportPingTest", "b"), e.m_oDeviceCapa.isSupportNTPTest = n.nodeValue(l, "isSupportNTPTest", "b"), e.m_oDeviceCapa.isSupportNASTest = n.nodeValue(l, "isSupportNASTest", "b"), e.m_oDeviceCapa.isSupportEmailTest = n.nodeValue(l, "isSupportEmailTest", "b")
                    }
                    if (e.m_oDeviceCapa.bIsSupportDualVCA = n.nodeValue(a, "isSupportStreamDualVCA", "b"), e.m_oDeviceCapa.bSupportPeopleCount = {
                            bSptPeople: !1,
                            bSptObjCount: !1
                        }, n.nodeValue($(a).find("VideoCap").eq(0), "isSupportCounting", "b")) {
                        var c = "object" == n.nodeValue($(a).find("VideoCap").eq(0), "countingType");
                        e.m_oDeviceCapa.bSupportPeopleCount.bSptObjCount = c, e.m_oDeviceCapa.bSupportPeopleCount.bSptPeople = !c
                    } else e.m_oDeviceCapa.bSupportPeopleCount.bSptObjCount = !1, e.m_oDeviceCapa.bSupportPeopleCount.bSptPeople = !1;
                    e.m_oDeviceCapa.bSupportHeatmap = n.nodeValue($(a).find("VideoCap").eq(0), "isSupportHeatmap", "b"), e.m_oDeviceCapa.bSupportFaceCaptureCount = n.nodeValue(a, "isSupportFaceCaptureStatistics", "b"), e.m_oDeviceCapa.bSptMutexFnCheck = n.nodeValue(a, "isSupportGetmutexFuncErrMsg", "b"), e.m_oDeviceCapa.bSupportDevMaintenance = n.nodeValue(a, "isSupportDeviceRepair", "b"), e.m_oDeviceCapa.bSupportDevMaintenance && e.getDevMaintenanceCap(), e.m_oDeviceCapa.bSupportDiagnoseData = n.nodeValue(a, "isSupportDiagnosedDataParameter", "b"), e.m_oDeviceCapa.bSupportExternalDevice = n.nodeValue(a, "isSupportExternalDevice", "b"), e.m_oDeviceCapa.bSupportHumanAttribute = n.nodeValue(a, "isSupportHumanAttribute", "b"), e.m_oDeviceCapa.bSupportChannelEventCap = n.nodeValue(a, "isSupportChannelEventCap", "b"), e.m_oDeviceCapa.bSupportFaceContrast = !0, n.nodeValue(a, "isSupportFaceContrast", "b"), e.m_oDeviceCapa.bSupportPersonDensityDetection = n.nodeValue(a, "isSupportPersonDensityDetection", "b"), e.m_oDeviceCapa.bSupportIntelligentStructureAnalysis = n.nodeValue(a, "isSupportIntelligentStructureAnalysis", "b"), e.m_oDeviceCapa.bSupportIntelligentAnalysisEngines = n.nodeValue(a, "isSupportIntelligentAnalysisEngines", "b")
                }
            })
        },
        getDevMaintenanceCap: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "devMaintenanceCap", null, {
                success: function (t, a) {
                    e.m_oDeviceCapa.bSupportDevUserRepair = n.nodeValue(a, "isSupportReportRepair", "b"), e.m_oDeviceCapa.bSupportDevRepairs = n.nodeValue(a, "isSupportMaintainRepair", "b"), e.m_oDeviceCapa.bSupportDevTestMaintain = n.nodeValue(a, "isSupportTestMaintain", "b"), e.m_oDeviceCapa.bSupportDevAcceptManage = n.nodeValue(a, "isSupportCheckManage", "b"), e.m_oDeviceCapa.bSupportDevBasicCfg = n.nodeValue(a, "isSupportGeneralset", "b")
                }
            })
        },
        getRegExposureFocusCap: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "imageCap", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceCapa.bIsSupportRegExposure = n.nodeValue(a, "isSupportRegionalExposure", "b"), e.m_oDeviceCapa.bIsSupportRegFocus = n.nodeValue(a, "isSupportRegionalFocus", "b")
                }
            })
        },
        getSmartCapa: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "smartCap", null, {
                async: !1,
                complete: function (t, a) {
                    e.m_oDeviceCapa.bSupportIntelliTrace = n.nodeValue(a, "isSupportIntelliTrace", "b"), e.m_oDeviceCapa.bSupportAudioDection = n.nodeValue(a, "isSupportAudioDetection", "b"), e.m_oDeviceCapa.bSupportDefousDection = n.nodeValue(a, "isSupportDefocusDetection", "b"), e.m_oDeviceCapa.bSupportSceneChangeDetection = n.nodeValue(a, "isSupportSceneChangeDetection", "b"), e.m_oDeviceCapa.bSupportFaceDect = n.nodeValue(a, "isSupportFaceDetect", "b"), e.m_oDeviceCapa.bSupportLineDection = n.nodeValue(a, "isSupportLineDetection", "b"), e.m_oDeviceCapa.bSupportFieldDection = n.nodeValue(a, "isSupportFieldDetection", "b"), e.m_oDeviceCapa.bSupportRegionEntrance = n.nodeValue(a, "isSupportRegionEntrance", "b"), e.m_oDeviceCapa.bSupportRegionExit = n.nodeValue(a, "isSupportRegionExiting", "b"), e.m_oDeviceCapa.bSupportLoiter = n.nodeValue(a, "isSupportLoitering", "b"), e.m_oDeviceCapa.bSupportGroup = n.nodeValue(a, "isSupportGroup", "b"), e.m_oDeviceCapa.bSupportRapidMove = n.nodeValue(a, "isSupportRapidMove", "b"), e.m_oDeviceCapa.bSupportPark = n.nodeValue(a, "isSupportParking", "b"), e.m_oDeviceCapa.bSupportUnattendedBaggage = n.nodeValue(a, "isSupportUnattendedBaggage", "b"), e.m_oDeviceCapa.bSupportAttendedBaggage = n.nodeValue(a, "isSupportAttendedBaggage", "b"), e.m_oDeviceCapa.bSupportAnalysisUnitSwitch = n.nodeValue(a, "isSupportAnalysisUnitSwitch", "b")
                }
            })
        },
        getPTZChanelCap: function (e) {
            var a = {
                bSupportPosition3D: !1,
                bSupportManualTrack: !1
            };
            return WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "ptzChannelCap", {
                channel: e
            }, {
                async: !1,
                success: function (e, t) {
                    a.bSupportPosition3D = n.nodeValue(t, "isSupportPosition3D", "b"), a.bSupportManualTrack = n.nodeValue(t, "isSupportManualTrack", "b")
                }
            }), a
        },
        getTalkInfo: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "talkListInfo", null, {
                async: !1,
                success: function (t, n) {
                    $(n).find("associateVideoInputs").length > 0 && (e.m_oDeviceCapa.bSupportTalkset = !0), e.m_oDeviceCapa.iTaklNum = $(n).find("TwoWayAudioChannel").length, e.m_oDeviceCapa.iTaklNum > 0 && $(n).find("audioCompressionType").length > 0 && (e.m_oDeviceCapa.m_szaudioCompressionType = $(n).find("audioCompressionType").eq(0).text())
                },
                error: function () {
                    e.m_oDeviceCapa.iTaklNum = 0
                }
            })
        },
        getNetworkVersion: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "networkInterface", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceCapa.szIPVersion = n.nodeValue(a, "ipVersion")
                }
            })
        },
        get28181Support: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "cfg28181", null, {
                async: !1,
                success: function () {
                    e.m_oDeviceCapa.bSupport28181 = !0
                },
                error: function () {
                    e.m_oDeviceCapa.bSupport28181 = !1
                }
            })
        },
        getAuthSupport: function () {
            var e = this;
            e.m_oDeviceCapa.oSupportAuth = {}, WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "rtspAuthCap", null, {
                async: !1,
                success: function (t, n) {
                    e.m_oDeviceCapa.oSupportAuth.bRtsp = $(n).find("certificateType").length > 0 ? !0 : !1
                },
                error: function () {
                    e.m_oDeviceCapa.oSupportAuth.bRtsp = !1
                }
            }), WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "webAuth", null, {
                async: !1,
                success: function () {
                    e.m_oDeviceCapa.oSupportAuth.bWeb = !0
                },
                error: function () {
                    e.m_oDeviceCapa.oSupportAuth.bWeb = !1
                }
            })
        },
        isEnableHoliday: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "holidayInfo", null, {
                async: !1,
                success: function (t, a) {
                    for (var i = $(a).find("holiday").length, o = 0; i > o; o++)
                        if (n.nodeValue($(a).find("holiday").eq(o), "enabled", "b")) {
                            e.m_oDeviceCapa.bEnableHoliday = !0;
                            break
                        } o === i && (e.m_oDeviceCapa.bEnableHoliday = !1)
                }
            })
        },
        getIntelliSupport: function () {
            var e = this;
            e.m_oDeviceCapa.bSupportIntelligent = !1, WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "VCADeviceCap", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceCapa.bSupportIntelligent = !0, e.m_oDeviceCapa.bSupportMisinfoFilterStatisticalMode = n.nodeValue(a, "isSupportMisinfoFilterStatisticalMode", "b")
                }
            })
        },
        getVehicleCap: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "roadDetectionCap", {
                channel: 1
            }, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceCapa.bSupportVehicle = n.nodeValue(a, "isSupportVehicleDetection", "b")
                }
            })
        },
        getSecurityService: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "telnetService", null, {
                async: !1,
                success: function () {
                    e.m_oDeviceCapa.bSupportTelnet = !0
                },
                error: function () {
                    e.m_oDeviceCapa.bSupportTelnet = !1
                }
            }), e.m_oDeviceCapa.bSupportSSH = !1, "admin" === t.m_oLoginUser.szType && WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "sshService", null, {
                async: !1,
                success: function () {
                    e.m_oDeviceCapa.bSupportSSH = !0
                }
            })
        },
        getBackOverlayCap: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "atmCap", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceCapa.bSupportBackOverlay = n.nodeValue(a, "isSupportBackOverlay", "b")
                }
            })
        },
        getPictureSearchCap: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "RacmCapa", null, {
                async: !1,
                success: function (t, n) {
                    var a = $(n).find("pictureSearchType").eq(0).attr("opt");
                    e.m_oDeviceCapa.bSupportPicSearch = $(n).find("pictureSearchType").length > 0 && "" !== a ? !0 : !1, e.m_oDeviceCapa.bSupportIPCTiming = "true" == $(n).find("isSupportIPCTiming").eq(0).text() ? !0 : !1
                }
            })
        },
        getTriggersCap: function (e, a) {
            var i = this;
            if (i.m_oDeviceCapa.triggerCapXml) {
                if ("string" == typeof e && a === void 0) return $(i.m_oDeviceCapa.triggerCapXml).find(e).eq(0);
                if ("object" == typeof e && a) return n.nodeValue(e, a, "b");
                if ("string" == typeof e && "string" == typeof a) return n.nodeValue($(i.m_oDeviceCapa.triggerCapXml).find(e).eq(0), a, "b")
            } else WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "triggerCap", null, {
                async: !1,
                success: function (e, t) {
                    i.m_oDeviceCapa.triggerCapXml = t
                }
            })
        },
        testNet: function (e, i, o) {
            var r = this;
            r.m_oWait = a.wait("", o.Testing), WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, e, null, {
                data: i,
                success: function (e, t) {
                    setTimeout(function () {
                        r.m_oWait && r.m_oWait.close();
                        var e = o.TestFailed,
                            i = n.nodeValue($(t), "errorDescription");
                        switch (i) {
                            case "ok":
                                e = o.TestSuccess;
                                break;
                            case "connect server fail":
                                e = o.ConnectServerFail;
                                break;
                            case "no nas directory":
                                e = o.NoNasDirectory;
                                break;
                            case "no permission":
                                e = o.NoNasPermission;
                                break;
                            case "no dns":
                                e = o.NoDns;
                                break;
                            case "no gateway":
                                e = o.NoGateway;
                                break;
                            case "password error":
                                e = o.PasswordError;
                                break;
                            case "exchange server fail":
                                e = o.ExchangeServerFail;
                                break;
                            case "create directory failed":
                                e = o.CreateDirectoryFail;
                                break;
                            case "no write permission":
                                e = o.NoWritePermission;
                                break;
                            case "port error":
                                e = o.portError;
                                break;
                            case "user or password error":
                                e = o.PasswordError;
                                break;
                            case "no storage pool":
                                e = o.StoragePoolError;
                                break;
                            case "storage pool full":
                                e = o.StoragePoolFull;
                                break;
                            case "unknown error":
                                e = o.UnknownError;
                                break;
                            default:
                        }
                        a.alert(e)
                    }, 2e3)
                },
                error: function () {
                    setTimeout(function () {
                        r.m_oWait && r.m_oWait.close(), a.alert(o.TestFailed)
                    }, 2e3)
                }
            })
        },
        getPlatformFilterCap: function () {
            var e = this;
            e.m_oDeviceCapa.oPlatformFilterCap = {
                bSupport28181White: !1,
                iWhite28181Num: 8
            }, WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "platformFilterCap", null, {
                async: !1,
                success: function (t, a) {
                    $(a).find("GB28181").length > 0 && (e.m_oDeviceCapa.oPlatformFilterCap.bSupport28181White = !0, e.m_oDeviceCapa.oPlatformFilterCap.iWhite28181Num = n.nodeValue(a, "allowNumber", "i"))
                }
            })
        },
        getNetworkCap: function () {
            var e = this;
            e.m_oDeviceCapa.bSupportIntegrate = !1, e.m_oDeviceCapa.bSupportGenetec = !1, e.m_oDeviceCapa.bSupport28181Switch = !1, e.m_oDeviceCapa.bSupportProtocolConfig = !1, WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "networkCap", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceCapa.bSupportIntegrate = n.nodeValue(a, "isSupportIntegrate", "b"), e.m_oDeviceCapa.bSupportGenetec = n.nodeValue(a, "isSupportGenetec", "b")
                }
            }), WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "service28181Cap", null, {
                async: !1,
                success: function (t, n) {
                    e.m_oDeviceCapa.bSupport28181Switch = $(n).find("enabled").length > 0
                }
            }), WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "integrateProtocolCap", null, {
                async: !1,
                success: function (t, n) {
                    e.m_oDeviceCapa.bSupportProtocolConfig = $(n).find("ONVIF").length > 0
                }
            })
        },
        getCloudStorage: function () {
            var e = this;
            e.m_oDeviceCapa.bSupportCloudStorage = !1, WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "cloudStorageCap", null, {
                async: !1,
                success: function () {
                    e.m_oDeviceCapa.bSupportCloudStorage = !0
                }
            })
        },
        getEventCap: function () {
            var e = this;
            e.m_oDeviceCapa.oEventCap = {
                bSupportHumanDetect: !1,
                bSupportFaceContrast: !1,
                bSupportFaceSnap: !1,
                bSupportHFPD: !1,
                bSupportSafetyHelmet: !1,
                bSupportMixTargetDetection: !1
            }, WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "eventCapa", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceCapa.oEventCap.bSupportHumanDetect = n.nodeValue(a, "isSupportHumanRecognition", "b"), e.m_oDeviceCapa.oEventCap.bSupportFaceContrast = n.nodeValue(a, "isSupportFaceContrast", "b"), e.m_oDeviceCapa.oEventCap.bSupportFaceSnap = n.nodeValue(a, "isSupportFaceSnap", "b"), e.m_oDeviceCapa.oEventCap.bSupportHFPD = n.nodeValue(a, "HFPD", "b"), e.m_oDeviceCapa.oEventCap.bSupportSafetyHelmet = n.nodeValue(a, "isSupportSafetyHelmetDetection", "b"), e.m_oDeviceCapa.oEventCap.bSupportMixTargetDetection = n.nodeValue(a, "isSupportMixedTargetDetection", "b")
                }
            })
        },
        getEventChannelCap: function (e) {
            var n = this;
            n.m_oEventChannelCapa = {
                bSupportFaceSnap: !1,
                bSupportChAudioDection: !1,
                bSupportChDefousDection: !1,
                bSupportChSceneChangeDetection: !1,
                bSupportChFaceDect: !1,
                bSupportChLineDection: !1,
                bSupportChFieldDection: !1,
                bSupportChRegionEntrance: !1,
                bSupportChRegionExit: !1,
                bSupportChLoiter: !1,
                bSupportChGroup: !1,
                bSupportChRapidMove: !1,
                bSupportChPark: !1,
                bSupportChUnattendedBaggage: !1,
                bSupportChAttendedBaggage: !1,
                aShieldEventType: [],
                bSupportHumanDet: !1,
                bSupportMixedTargetDetection: !1
            }, WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "eventChannelsCap", {
                channel: e
            }, {
                async: !1,
                success: function (e, t) {
                    var a = $(t).find("eventType").eq(0).attr("opt").split(",");
                    n.m_oEventChannelCapa = {
                        bSupportFaceSnap: -1 !== $.inArray("faceSnap", a),
                        bSupportChAudioDection: -1 !== $.inArray("audioDetection", a),
                        bSupportChDefousDection: -1 !== $.inArray("defocusDetection", a),
                        bSupportChSceneChangeDetection: -1 !== $.inArray("sceneChangeDetection", a),
                        bSupportChFaceDect: -1 !== $.inArray("faceDetection", a),
                        bSupportChLineDection: -1 !== $.inArray("lineDetection", a),
                        bSupportChFieldDection: -1 !== $.inArray("fieldDetection", a),
                        bSupportChRegionEntrance: -1 !== $.inArray("regionEntrance", a),
                        bSupportChRegionExit: -1 !== $.inArray("regionExiting", a),
                        bSupportChLoiter: -1 !== $.inArray("loitering", a),
                        bSupportChGroup: -1 !== $.inArray("group", a),
                        bSupportChRapidMove: -1 !== $.inArray("rapidMove", a),
                        bSupportChPark: -1 !== $.inArray("parking", a),
                        bSupportChUnattendedBaggage: -1 !== $.inArray("unattendedBaggage", a),
                        bSupportChAttendedBaggage: -1 !== $.inArray("attendedBaggage", a),
                        bSupportHumanDet: -1 !== $.inArray("humanRecognition", a),
                        bSupportMixedTargetDetection: -1 !== $.inArray("mixedTargetDetection", a)
                    }, $(t).find("shieldEventType").length > 0 && $(t).find("shieldEventType").eq(0).attr("opt") && (n.m_oEventChannelCapa.aShieldEventType = $(t).find("shieldEventType").eq(0).attr("opt").split(","))
                }
            })
        },
        getFaceLibCap: function () {
            var e = this;
            e.m_oDeviceCapa.oFaceLibCap = {
                bSupportFaceLib: !1
            }, WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "faceDataLibraryCfgCap", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oDeviceCapa.oFaceLibCap.bSupportFaceLib = $(a).find("CreateFDLibList").length > 0, e.m_oDeviceCapa.oFaceLibCap.bSupportPrompt = n.nodeValue(a, "isSupportPrompt", "b")
                }
            })
        },
        getCustomCap: function () {
            var e = this;
            WebSDK.WSDK_GetDeviceConfig(t.m_szHostName, "customConfigCap", null, {
                async: !1,
                success: function (t, a) {
                    e.m_oCustomCapa.bSupportConfigCustom = n.nodeValue(a, "isSupportConfigCustom", "b"), e.m_oCustomCapa.bSupportSystemCustom = n.nodeValue(a, "isSupportSystemCustom", "b"), e.m_oCustomCapa.bSupportNetworkCustom = n.nodeValue(a, "isSupportNetworkCustom", "b"), e.m_oCustomCapa.bSupportStorageCustom = n.nodeValue(a, "isSupportStorageCustom", "b"), e.m_oCustomCapa.szCustomModuleName = n.nodeValue(a, "customModuleName")
                }
            })
        }
    }, module.exports = new e
});