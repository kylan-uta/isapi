define(function (require, exports, module) {
    function e() {}
    var t, n, a, i;
    t = require("../common"), 
    // n = require("translator"), 
    // a = require("dialog"), 
    i = require("../lib/utils")
    e.prototype = {
        saveState: function (e, t, o, r, s) {
            var l = this;
            if ((void 0 === t || null === t) && (t = ""), e = $.isArray(e) ? e[0] : e, 4 == e.readyState) {
                if (200 == e.status || 403 == e.status || 400 == e.status || 503 == e.status || 500 == e.status) {
                    var c = e.responseXML,
                        u = "",
                        d = "";
                    if (c) u = i.nodeValue(c, "statusCode"), d = i.nodeValue(c, "subStatusCode");
                    else if ("object" == typeof JSON.parse(e.responseText)) {
                        var m = JSON.parse(e.responseText);
                        u = m.statusCode, d = m.subStatusCode
                    }
                    var p = "";
                    if ("1" == u) p = 1 === o ? t + n.getValue("deleteSuccess") : 2 === o ? t + n.getValue("restoreSucceeded") : t + n.getValue("saveSucceeded");
                    else if ("2" == u) p = "noMemory" === d ? t + n.getValue("deviceBusy") : "serviceUnavailable" === d ? t + n.getValue("deviceBusy") : "upgrading" === d ? t + n.getValue("deviceBusy") : "deviceBusy" === d ? t + n.getValue("deviceBusy") : "reConnectIpc" === d ? t + n.getValue("switchANR") : t + n.getValue("deviceBusy");
                    else if ("3" == u) p = "28181Uninitialized" === d ? t + n.getValue("param28181Uninitialized") : t + n.getValue("deviceError");
                    else if ("4" == u) {
                        if ("notSupport" === d) return p = t + n.getValue("notSupport"), a.alert(p), void 0;
                        p = "lowPrivilege" === d ? t + n.getValue("noPermission") : "badAuthorization" === d ? t + n.getValue("userPwdError") : "methodNotAllowed" === d ? t + n.getValue("methodError") : "notSetHdiskRedund" === d ? t + n.getValue("requiredOneRWHDD") : "invalidOperation" === d ? t + n.getValue("invalidOperation") : "loginPasswordError" === d ? n.getValue("adminPwdError") + " " + t : "ExceedMaxSmdType" === d ? n.getValue("ExceedMaxSmdType") : t + n.getValue("setParamFailed")
                    } else if ("5" == u) p = "badJsonFormat" === d ? t + n.getValue("badJsonFormat") : t + n.getValue("paramError");
                    else if ("6" == u) p = "badParameters" === d ? t + n.getValue("paramError") : "badHostAddress" === d ? t + n.getValue("ipAddrError") : "badXmlContent" === d ? t + n.getValue("paramError") : "badIPv4Address" === d ? t + n.getValue("ipAddrError") : "badIPv6Address" === d ? t + n.getValue("ipAddrError") : "conflictIPv4Address" === d ? t + n.getValue("ipAddrConflicted") : "conflictIPv6Address" === d ? t + n.getValue("ipAddrConflicted") : "badDomainName" === d ? t + n.getValue("domainError") : "connectSreverFail" === d ? t + n.getValue("communicationFailed") : "conflictDomainName" === d ? t + n.getValue("domainConflicted") : "badPort" === d ? t + n.getValue("portConflict") : "portError" === d ? t + n.getValue("invalidPort") : "badNetMask" === d ? t + n.getValue("subnetMaskError") : "badVersion" === d ? t + n.getValue("versionMismatch") : "badDevType" === d ? t + n.getValue("modelMismatch") : "badLanguage" === d ? t + n.getValue("lanMismatch") : "invalidChannel" === d ? t + n.getValue("confirmCamera") + " " + n.getValue("cameraExist") : "noAudioStream" === d ? t + n.getValue("confirmCamera") + " " + n.getValue("videoAndAudio") : "noRecAudio" === d ? t + n.getValue("confirmCamera") + " " + n.getValue("recordAudio") : "noAudio" === d ? t + n.getValue("confirmCamera") + " " + n.getValue("recordAudio") + ", " + n.getValue("videoAndAudio") : "linkedCameraOutLimit" === d ? n.getValue("linkedCameraOutOfLimit") : "WANNotSupport" === d ? n.getValue("wanNotSupportQAorGuid") : "ResetErrorNoSEQ" === d ? n.getValue("neverSetQATip") : "SEQConfigNumError" === d ? n.getValue("securityQuestionCfgNumError") + " " + t : "SEQCertificateUnmatch" === d ? n.getValue("securityQuestionUnMatch") + " " + t : "GUIDFileDataUnmatch" === d ? n.getValue("guidFileUnmatch") + " " + t : "ResetPasswordIllegal" === d ? n.getValue("resetPasswordIllegal") + " " + t : "illegalVerificationCode" === d ? n.getValue("modifyDefaultCodeTip") + " " + t : "lackVerificationCode" === d ? n.getValue("createDefaultCodeTip") + " " + t : "humanMisInfoFilterEnabledChanNumError" === d ? n.getValue("humanMisInfoFilterTip") : "humanEnginesNoResource" === d ? n.getValue("humanEnginesNoResourceTip") : "analysisEnginesNoResourceError" === d ? n.getValue("analysisEnginesNoResourceError") : "achieveMaxChannelLimit" === d ? n.getValue("achieveMaxChannelLimitTip") : "faceImagesNumError" === d ? t + n.getValue("faceImagesNumError") : "faceLibraryNumError" === d ? t + n.getValue("faceLibraryNumError") : "faceDataModeling" === d ? t + n.getValue("faceDataModeling") : "NoDataForModelingError" === d ? t + n.getValue("NoDataForModelingError") : "smdEncodingNoResource" === d ? t + n.getValue("smdEncodingNoResource") : "smdDecodingNoResource" === d ? t + n.getValue("smdDecodingNoResource") : "diskError" === d ? t + n.getValue("diskError") : "diskFull" === d ? t + n.getValue("diskFull") : "badverificationCode" === d ? n.getValue("badVerificationCode") : "identityKeyError" === d ? n.getValue("identityKeyError") : "identityKeyMissing" === d ? n.getValue("identityKeyMissing") : "noSupportWithPersonDensityDetect" === d ? n.getValue("noSupportWithPersonDensityDetect") : "invalidTaskID" === d ? n.getValue("invalidTaskID") : "channelNoSupportWithSMD" === d ? n.getValue("channelNoSupportWithSMD") : "polygonError" === d ? n.getValue("polygonError") : "safetyHelmetNoResource" === d ? t + n.getValue("safetyHelmetNoResource") : "behaviorEnginesNoResource" === d ? t + n.getValue("behaviorEnginesNoResource") : "retentionEnginesNoResource" === d ? t + n.getValue("retentionEnginesNoResource") : "leavePositionEnginesNoResource" === d ? t + n.getValue("leavePositionEnginesNoResource") : "peopleNumChangeEnginesNoResource" === d ? t + n.getValue("peopleNumChangeEnginesNoResource") : "channelNoSupportWithBehavior" === d ? t + n.getValue("channelNoSupportWithBehavior") : "analysisEnginesLoadingError" === d ? t + n.getValue("analysisEnginesLoadingError") : "analysisEnginesAbnormaError" === d ? t + n.getValue("analysisEnginesAbnormaError") : "analysisEnginesFacelibImporting" === d ? t + n.getValue("analysisEnginesFacelibImporting") : "analysisEnginesAssociatedChannel" === d ? t + n.getValue("analysisEnginesAssociatedChannel") : "ipcResolutionOverflow" === d ? t + n.getValue("ipcResolutionOverflow") : "noEnoughDecodeResource" === d ? t + n.getValue("noEnoughDecodeResource") : "channelResolutionNoSupport" === d ? t + n.getValue("channelResolutionNoSupport") : "channelCompressionNoSupport" === d ? t + n.getValue("channelCompressionNoSupport") : "channelOffline" === d ? n.getValue("channelOffline") : t + n.getValue("paramError");
                    else {
                        if ("7" == u) return p = "", l.toRestart(), void 0;
                        "51" == u && (p = "openSigNoOp" === d ? t + n.getValue("openSigNoOp") : t + n.getValue("paramError"))
                    }
                    "hasActivated" === d && (p = t + n.getValue("deviceActived"))
                } else p = t + n.getValue("invalidUrlOrHttp");
                if (s && (p += s), r) return p;
                a.tip(p)
            }
        },
        getState: function (e) {
            if (4 == e.readyState) {
                var t = "";
                if (403 == e.status || 400 == e.status || 503 == e.status || 500 == e.status) {
                    var o = e.responseXML,
                        r = i.nodeValue(o, "statusCode"),
                        s = i.nodeValue(o, "subStatusCode");
                    t = "4" == r ? "notSupport" === s ? n.getValue("notSupport") : n.getValue("networkAbnormal") : "3" == r ? "28181Uninitialized" === s ? n.getValue("param28181Uninitialized") : n.getValue("networkAbnormal") : n.getValue("networkAbnormal")
                } else t = n.getValue("networkAbnormal");
                a.alert(t)
            }
        },
        restart: function () {
            var e = this;
            a.confirm(n.getValue("rebootDeviceTip"), null, function () {
                e.toRestart()
            })
        },
        toRestart: function () {
            var e = this,
                o = null;
            o = a.wait(null, n.getValue("rebooting")), WebSDK.WSDK_SetDeviceConfig(t.m_szHostName, "restart", null, {
                success: function (n, a, r) {
                    "OK" == i.nodeValue(a, "statusString") ? setTimeout(function () {
                        t.reconnect(o)
                    }, 6e4) : (o.close(), e.saveState(r))
                },
                error: function (t, n, a) {
                    o.close(), e.saveState(a)
                }
            })
        },
        needReboot: function (e) {
            return e.responseXML ? "rebootRequired" === i.nodeValue(e.responseXML, "subStatusCode") : !1
        }
    }, module.exports = new e
});