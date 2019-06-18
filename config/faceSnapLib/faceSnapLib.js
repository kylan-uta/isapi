define(function (require, exports, module) {
    function e() {}
    var t, n = require("jquery"),
        // i = require("translator"),
        o = require("../../common"),
        a = require("../../lib/utils"),
        r = require("../service"),
        l = require("../../isapi/response"),
        // s = require("dialog"),
        // c = require("common/plugin"),
        d = null,
        u = null,
        m = null;
    // require("ui.jquery"), 
    // require("ui.table"), 
    require("uuid"), 
    // require("config/ui.config"), 
    // require("fileUpload"), 
    e.prototype = {
        init: function () {
            n("#view").addClass("face-library-view"), this.initPlugin(), this.initController()
        },
        initPlugin: function () {
            c.initPluginEvent(), c.initPlugin("0", "", 1, "normal")
        },
        initController: function () {
            angular.module("faceLibraryStatisticApp", ["ui.jquery", "ui.config"]).service("service", ["$timeout", "$q", "$compile", function ($timeout, $q, $compile) {
                var e = this;
                this.m_oLan = i.oLastLanguage, this.m_oParamsCap = {
                    iMaxLibraryNum: 3,
                    iMaxFaceNum: 3,
                    oDefLibrary: {
                        id: 0,
                        name: "",
                        thresholdValue: 1,
                        customInfo: "",
                        aTarget: [{
                            id: 1,
                            enabled: !1,
                            name: "",
                            value: ""
                        }, {
                            id: 2,
                            enabled: !1,
                            name: "",
                            value: ""
                        }, {
                            id: 3,
                            enabled: !1,
                            name: "",
                            value: ""
                        }, {
                            id: 4,
                            enabled: !1,
                            name: "",
                            value: ""
                        }]
                    },
                    aPersonInfoExtendList: [],
                    bSupportModelingStatusSearch: !1,
                    bSupportPhoneNumber: !1,
                    iMaxTagsNum: 4,
                    bSupportProvince: !0,
                    bSupportCity: !0,
                    bSupportCertificateType: !0
                }, this.m_oParams = {
                    aLibraryList: [],
                    iSelectLibraryIndex: -1,
                    oSelectLibrary: {},
                    szCheckCode: ""
                }, this.m_oSearchParamsCap = {
                    aSex: [],
                    oProvince: {},
                    oCityList: {},
                    oCity: {},
                    oCityFace: {},
                    aCertificateType: [],
                    aModelingStatus: [],
                    aModelStatus: []
                }, this.m_oSearchParams = {
                    searchResultPosition: 0,
                    searchResultNum: 500,
                    searchResultTotalNum: 0,
                    searchID: "",
                    name: "",
                    sex: "",
                    province: "",
                    city: "",
                    certificateType: "",
                    certificateNumber: "",
                    startTime: "",
                    endTime: "",
                    modelingStatus: "",
                    phoneNumber: "",
                    szCurSample: "",
                    fSimilarity: 80
                }, this.m_oAnalysisRes = {
                    aSamples: [],
                    bError: !1,
                    szErrorMsg: "",
                    szImgUrl: ""
                }, window.analyzePhoto = function () {
                    if ("" === n("#faceSearchPhoto").val()) s.alert(i.getValue("uploadImg"));
                    else {
                        e.m_oAnalysisRes.aSamples.length = 0, e.m_oAnalysisRes.bError = !1, e.m_oAnalysisRes.szErrorMsg = "", e.m_oSearchParams.szCurSample = "", e.m_oSearchParams.fSimilarity = 80, e.m_oAnalysisRes.szImgUrl = "";
                        var r = o.m_szHttpProtocol + o.m_szHostName + ":" + o.m_iHttpPort + "/ISAPI/Intelligent/analysisImage/face";
                        setTimeout(function () {
                            n.ajaxFileUpload({
                                url: r,
                                fileElementId: "faceSearchPhoto",
                                success: function (o) {
                                    if (n(o).find("FaceContrastTargetsList").length > 0) e.m_oSearchParams.szCurSample = 0, e.m_oAnalysisRes.szImgUrl = e.getImgPath("viewPhoto"), n(o).find("FaceContrastTarget").each(function () {
                                        e.m_oAnalysisRes.aSamples.push({
                                            oRect: {
                                                iWidth: a.nodeValue(this, "width", "f"),
                                                iHeight: a.nodeValue(this, "height", "f"),
                                                iPosX: a.nodeValue(this, "x", "f"),
                                                iPoxY: a.nodeValue(this, "y", "f")
                                            },
                                            szModeData: a.nodeValue(this, "modeData")
                                        })
                                    });
                                    else {
                                        var r = e.showAnalyzeErr(o);
                                        r || (e.m_oAnalysisRes.szErrorMsg = i.getValue("uploadFailed"))
                                    }
                                    t.$apply()
                                },
                                error: function () {},
                                complete: function () {
                                    var e = document.getElementById("faceSearchPhoto");
                                    e.outerHTML = e.outerHTML, $compile(angular.element("#viewPhoto"))(t)
                                }
                            })
                        }, 1e3)
                    }
                }, this.showAnalyzeErr = function (t) {
                    e.m_oAnalysisRes.bError = !0;
                    var n = "",
                        o = a.nodeValue(t, "statusCode"),
                        r = a.nodeValue(t, "subStatusCode");
                    return "6" === o && (n = "badParameters" === r ? i.getValue("paramError") : "faceImagesNumError" === r ? i.getValue("faceImagesNumError") : "faceLibraryNumError" === r ? i.getValue("faceLibraryNumError") : "faceDataAnalysisError" === r ? i.getValue("faceDataAnalysisError") : "faceDataPIDError" === r ? i.getValue("faceDataPIDError") : "faceLibraryIDError" === r ? i.getValue("faceLibraryIDError") : "faceLibraryDatabaseError" === r ? i.getValue("faceLibraryDatabaseError") : "checkCodeError" === r ? i.getValue("checkCodeError") : "faceLibraryError" === r ? i.getValue("faceLibraryError") : "multipleFaceObjectError" === r ? i.getValue("multipleFaceObjectError") : "analysisEnginesNoResourceError" === r ? i.getValue("analysisEnginesNoResourceError") : "analysisEnginesUsageExcced" === r ? i.getValue("analysisEnginesUsageExcced") : "PicAnalysisNoTargetError" === r ? i.getValue("picAnalysisNoTargetError") : "SubpicAnalysisModelingError" === r ? i.getValue("subpicAnalysisModelingError") : "faceLibPicImportingError" === r ? i.getValue("faceLibPicImportingError") : "picFormatError" === r ? i.getValue("picFormatError") : "picResolutionInvalidError" === r ? i.getValue("picResolutionInvalidError") : "picSizeExceedError" === r ? i.getValue("picSizeExceedError") : "PicAnalysisNoResourceError" === r ? i.getValue("picAnalysisNoResourceError") : "nameError" === r ? i.getValue("nameError") : "nameExistError" === r ? i.getValue("nameExistError") : "analysisEnginesLoadingError" === r ? i.getValue("analysisEnginesLoadingError") : "analysisEnginesAbnormaError" === r ? i.getValue("analysisEnginesAbnormaError") : "analysisEnginesFacelibImporting" === r ? i.getValue("analysisEnginesFacelibImporting") : "analysisEnginesAssociatedChannel" === r ? i.getValue("analysisEnginesAssociatedChannel") : "smdEncodingNoResource" === r ? i.getValue("smdEncodingNoResource") : "illegalPhoneNumber" === r ? i.getValue("illegalPhoneNumber") : "illegalCertificateNumber" === r ? i.getValue("illegalCertificateNumber") : i.getValue("paramError")), e.m_oAnalysisRes.szErrorMsg = n, n
                }, this.getImgPath = function (e) {
                    return "undefined" == typeof FileReader ? n("#" + e).attr("src") : n("#" + e).find("img").eq(0).attr("src")
                }, this.m_oTable = null, this.m_aSearchResult = [], this.m_oDefFaceInfo = {
                    PID: -1,
                    picURL: "",
                    name: "",
                    sex: "unknown",
                    province: "unknown",
                    city: "unknown",
                    certificateType: "unknown",
                    certificateNumber: "",
                    bornTime: "2000-01-01",
                    aPersonInfoExtendList: [],
                    phoneNumber: ""
                }, this.m_oSelectFaceInfo = {}, this.m_oPagingConf = {
                    currentPage: 0,
                    totalItems: 0,
                    itemsPerPage: 50,
                    pagesLength: 15,
                    perPageOptions: [50, 100],
                    onChange: function (t) {
                        t && e.searchLibrary(!1, !1)
                    }
                }, this.m_oResultView = {
                    iMode: 1
                }, this.m_oInputValid = {
                    oName: {
                        oEmpty: {
                            value: !1,
                            error: e.m_oLan.nullTips
                        },
                        oMaxLength: {
                            value: 32,
                            error: i.getValue("noMoreLength", [32])
                        },
                        oSpecChar: {
                            value: !1,
                            error: i.getValue("notChar") + " / \\ : * ? ' \" < > | % "
                        }
                    },
                    oCustomInfo: {
                        oMaxLength: {
                            value: 32,
                            error: i.getValue("noMoreLength", [32])
                        }
                    },
                    oThresholdValue: {
                        oEmpty: {
                            value: !1,
                            error: e.m_oLan.nullTips
                        },
                        oMinValue: {
                            value: 1,
                            error: i.getValue("range", [1, 100])
                        },
                        oMaxValue: {
                            value: 100,
                            error: i.getValue("range", [1, 100])
                        }
                    },
                    oCertificateNumber: {
                        oMaxLength: {
                            value: 32,
                            error: i.getValue("noMoreLength", [32])
                        },
                        oChinese: {
                            value: !1,
                            error: i.getValue("notZhChar")
                        }
                    },
                    oFaceName: {
                        oEmpty: {
                            value: !1,
                            error: e.m_oLan.nullTips
                        },
                        oMaxLength: {
                            value: 64,
                            error: i.getValue("noMoreLength", [64])
                        },
                        oSpecChar: {
                            value: !1,
                            error: i.getValue("notChar") + " / \\ : * ? ' \" < > | % "
                        }
                    },
                    oPersonExtend: {
                        oMaxLength: {
                            value: 32,
                            error: i.getValue("noMoreLength", [32])
                        }
                    },
                    oSimilarity: {
                        oEmpty: {
                            value: !1,
                            error: e.m_oLan.nullTips
                        },
                        oMinValue: {
                            value: 1,
                            error: i.getValue("range", [0, 100])
                        },
                        oMaxValue: {
                            value: 100,
                            error: i.getValue("range", [0, 100])
                        },
                        bFloatValue: !0
                    },
                    oPhoneNumber: {
                        oEmpty: {
                            value: !0,
                            error: e.m_oLan.nullTips
                        },
                        oMaxLength: {
                            value: 64,
                            error: i.getValue("noMoreLength", [64])
                        },
                        oChinese: {
                            value: !1,
                            error: i.getValue("notZhChar")
                        },
                        oSpecChar: {
                            value: !1,
                            error: i.getValue("notChar") + " / \\ : * ? ' \" < > | % "
                        }
                    }
                }, this.m_oInputValid.aTagsValid = [];
                for (var p = 0; this.m_oParamsCap.iMaxTagsNum > p; p++) this.m_oInputValid.aTagsValid.push({
                    oEmpty: {
                        value: !1,
                        error: e.m_oLan.nullTips
                    },
                    oMaxLength: {
                        value: 32,
                        error: i.getValue("noMoreLength", [32])
                    },
                    oSpecChar: {
                        value: !1,
                        error: i.getValue("notChar") + " / \\ : * ? ' \" < > | % "
                    }
                });
                this.oOptLan = {
                    officerID: i.getValue("militaryCard"),
                    ID: i.getValue("IDCard"),
                    passportID: i.getValue("passportID"),
                    other: i.getValue("other")
                }, this.oModelLan = {
                    modeling: i.getValue("modelingStatusSucc"),
                    unmodeled: i.getValue("modelingStatusNone"),
                    modelingFailed: i.getValue("modelingStatusFail"),
                    success: i.getValue("modelingStatusSucc"),
                    failed: i.getValue("modelingStatusFail"),
                    none: i.getValue("modelingStatusNone")
                };
                var h;
                this.resetSearchParams = function () {
                    var t = e.m_oParamsCap;
                    e.m_oSearchParamsCap;
                    var i = e.m_oDefFaceInfo,
                        o = e.m_oSearchParams;
                    o.name = "", o.sex = "unlimited", o.province = "unlimited", o.city = "unlimited", o.certificateType = "unlimited", o.certificateNumber = "", o.startTime = "", o.endTime = "", o.modelingStatus = "unlimited", o.phoneNumber = "", e.m_oAnalysisRes.aSamples.length = 0, e.m_oAnalysisRes.bError = !1, e.m_oAnalysisRes.szErrorMsg = "", o.szCurSample = "", o.fSimilarity = 80, e.m_oAnalysisRes.szImgUrl = "", i.aPersonInfoExtendList.length = 0, n.each(t.aPersonInfoExtendList, function (e, t) {
                        i.aPersonInfoExtendList.push({
                            id: t.id,
                            enabled: !0,
                            name: t.name,
                            value: ""
                        })
                    })
                }, this.getCap = function () {
                    var t = $q.defer();
                    return $q.all([e.getCfgCap(), e.getPersonInfoExtend()]).then(function () {
                        e.resetSearchParams(), $timeout(function () {
                            t.resolve()
                        })
                    }, function () {
                        $timeout(function () {
                            t.reject()
                        })
                    }), t.promise
                }, this.getCfgCap = function () {
                    var t = $q.defer(),
                        r = e.m_oParamsCap,
                        l = e.m_oSearchParamsCap;
                    return n.ajax({
                        url: "../script/province.json?version=" + seajs.web_version,
                        type: "GET",
                        async: !1,
                        dataType: "json",
                        success: function (e) {
                            l.oProvince = e
                        }
                    }), n.ajax({
                        url: "../script/city.json?version=" + seajs.web_version,
                        type: "GET",
                        async: !1,
                        dataType: "json",
                        success: function (e) {
                            l.oCityList = e
                        }
                    }), l.aModelingStatus.length = 0, n.extend(l.aModelingStatus, [{
                        name: i.getValue("success"),
                        value: "success"
                    }, {
                        name: i.getValue("failed"),
                        value: "failed"
                    }, {
                        name: i.getValue("modelingStatusNone"),
                        value: "none"
                    }]), WebSDK.WSDK_GetDeviceConfig(o.m_szHostName, "faceDataLibraryCfgCap", null, {
                        success: function (o, s) {
                            r.iMaxLibraryNum = a.nodeAttr(s, "CreateFDLibList", "size", "i");
                            var c = n(s).find("CreateFDLibList").eq(0);
                            r.iMaxFaceNum = a.nodeValue(c, "faceDataMax", "i"), r.oName = {
                                min: a.nodeAttr(c, "name", "min", "i"),
                                max: a.nodeAttr(c, "name", "max", "i")
                            }, r.oThresholdValue = {
                                min: a.nodeAttr(c, "thresholdValue", "min", "i"),
                                max: a.nodeAttr(c, "thresholdValue", "max", "i")
                            }, r.oCustomInfo = {
                                min: a.nodeAttr(c, "customInfo", "min", "i"),
                                max: a.nodeAttr(c, "customInfo", "max", "i")
                            }, r.oSimilarity = {
                                min: a.nodeAttr(s, "similarity", "min", "f"),
                                max: a.nodeAttr(s, "similarity", "max", "f")
                            };
                            var d = e.m_oInputValid;
                            d.oName.oMaxLength = {
                                value: r.oName.max,
                                error: i.getValue("noMoreLength", [r.oName.max])
                            }, d.oCustomInfo.oMaxLength = {
                                value: r.oCustomInfo.max,
                                error: i.getValue("noMoreLength", [r.oCustomInfo.max])
                            }, d.oThresholdValue.oMinValue = {
                                value: r.oThresholdValue.min,
                                error: i.getValue("range", [r.oThresholdValue.min, r.oThresholdValue.max])
                            }, d.oThresholdValue.oMaxValue = {
                                value: r.oThresholdValue.max,
                                error: i.getValue("range", [r.oThresholdValue.min, r.oThresholdValue.max])
                            }, d.oSimilarity.oMinValue = {
                                value: r.oSimilarity.min,
                                error: i.getValue("range", [r.oSimilarity.min, r.oSimilarity.max])
                            }, d.oSimilarity.oMaxValue = {
                                value: r.oSimilarity.max,
                                error: i.getValue("range", [r.oSimilarity.min, r.oSimilarity.max])
                            };
                            var u = n(s).find("FDSearchDescription").eq(0);
                            l.aCertificateType.length = 0;
                            var m = a.nodeAttr(u, "certificateType", "opt").split(",");
                            n.each(m, function (t, n) {
                                l.aCertificateType.push({
                                    name: e.oOptLan[n],
                                    value: n
                                })
                            }), l.aSex.length = 0;
                            var p = a.nodeAttr(u, "sex", "opt").split(",");
                            n.each(p, function (e, t) {
                                l.aSex.push({
                                    name: i.getValue(t),
                                    value: t
                                })
                            }), r.bSupportModelingStatusSearch = a.nodeValue(s, "isSupportModelingStatusSearch", "b"), r.bSupportModelStatusSearch = n(s).find("modelStatus").length > 0, r.bSupportPhoneNumber = a.nodeValue(s, "isSupportPhoneNumber", "b"), r.bSupportProvince = n(s).find("province").length > 0, r.bSupportCity = n(s).find("city").length > 0, r.bSupportCertificateType = n(s).find("certificateType").length > 0;
                            var h = a.nodeAttr(s, "modelStatus", "opt").split(",");
                            n.each(h, function (t, n) {
                                l.aModelStatus.push({
                                    name: e.oModelLan[n],
                                    value: n
                                })
                            }), $timeout(function () {
                                t.resolve()
                            })
                        },
                        error: function () {
                            $timeout(function () {
                                t.reject()
                            })
                        }
                    }), t.promise
                }, this.getPersonInfoExtend = function () {
                    var t = $q.defer(),
                        i = e.m_oParamsCap;
                    return WebSDK.WSDK_GetDeviceConfig(o.m_szHostName, "personInfoExtend", null, {
                        success: function (e, t) {
                            i.aPersonInfoExtendList.length = 0;
                            var o = i.aPersonInfoExtendList;
                            n(t).find("PersonInfoExtend").each(function () {
                                a.nodeValue(this, "enable", "b") && "" !== a.nodeValue(this, "name") && o.push({
                                    id: a.nodeValue(this, "id"),
                                    enabled: a.nodeValue(this, "enable"),
                                    name: a.nodeValue(this, "name"),
                                    value: a.nodeValue(this, "value")
                                })
                            })
                        },
                        complete: function () {
                            $timeout(function () {
                                t.resolve()
                            })
                        }
                    }), t.promise
                }, this.getInfo = function () {
                    var i = e.m_oParams;
                    WebSDK.WSDK_GetDeviceConfig(o.m_szHostName, "faceDataLibraryCfg", null, {
                        success: function (e, o) {
                            var r = i.aLibraryList;
                            r.length = 0;
                            var l = ["FDID", "name", "thresholdValue", "customInfo", "faceLibType"];
                            n(o).find("FDLibBaseCfg").each(function () {
                                r.push(a.getXmlNodeObject(this, l))
                            }), t.$apply()
                        }
                    })
                }, this.addLibrary = function () {
                    e.changeInputValid("face"), e.m_oParams.oSelectLibrary = n.extend({}, n.extend(!0, {}, e.m_oParamsCap.oDefLibrary));
                    var o, r = {
                        $destroy: angular.noop
                    };
                    n.get("config/faceSnapLib/faceLibraryDetail.asp", function (l) {
                        d = s.html({
                            nWidth: 400,
                            szTitle: i.getValue("add"),
                            szDialogID: "libraryInfoDialog",
                            szContent: l,
                            oButtons: {
                                bOK: !0,
                                bCancel: !0
                            },
                            cbOk: function () {
                                return e.addLibraryOK("add")
                            },
                            cbClose: function () {
                                e.selectLibrary(e.m_oParams.iSelectLibraryIndex), (o || r).$destroy(), t.oInputValidUtils.clearInputValidList(), a.removeValidTip()
                            }
                        }), o = t.$new(!1), u(angular.element("#faceLibraryDetail"))(o), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#faceLibraryDetail").hide().show()
                    })
                }, this.getFaceLibTargetXml = function (e) {
                    for (var t = '<?xml version="1.0" encoding="UTF-8"?><PersonInfoExtendList>', n = e.length, i = 0; n > i; i++) t += "<PersonInfoExtend>", t += "<id>" + e[i].id + "</id>", t += "<enable>" + ("" + e[i].enabled) + "</enable>", t += "<name>" + a.encodeString(e[i].name) + "</name>", t += "<value>" + a.encodeString(e[i].value) + "</value>", t += "</PersonInfoExtend>";
                    return t += "</PersonInfoExtendList>"
                }, this.addFaceLibTag = function (t, n) {
                    WebSDK.WSDK_SetDeviceConfig(o.m_szHostName, "faceLibTags", {
                        facelibrary: t
                    }, {
                        data: e.getFaceLibTargetXml(n),
                        error: function (e, t, n) {
                            l.saveState(n)
                        }
                    })
                }, this.getFaceLibTag = function (e, t) {
                    var i = [];
                    return WebSDK.WSDK_GetDeviceConfig(o.m_szHostName, "faceLibTags", {
                        facelibrary: e
                    }, {
                        async: !1,
                        success: function (e, o) {
                            n(o).find("PersonInfoExtend").each(function () {
                                ("addFace" !== t || a.nodeValue(this, "enable", "b")) && i.push({
                                    id: a.nodeValue(this, "id"),
                                    enabled: a.nodeValue(this, "enable", "b"),
                                    name: a.nodeValue(this, "name"),
                                    value: a.nodeValue(this, "value")
                                })
                            })
                        }
                    }), i
                }, this.editLibrary = function (o) {
                    e.changeInputValid("face"), e.m_oParams.oSelectLibrary = n.extend({}, e.m_oParams.aLibraryList[o]);
                    var r, l = {
                        $destroy: angular.noop
                    };
                    n.get("config/faceSnapLib/faceLibraryDetail.asp", function (c) {
                        e.m_oParams.oSelectLibrary.aTarget = e.getFaceLibTag(e.m_oParams.oSelectLibrary.FDID), d = s.html({
                            szTitle: i.getValue("modify"),
                            szContent: c,
                            szDialogID: "libraryInfoDialog",
                            nWidth: 420,
                            oButtons: {
                                bOK: !0,
                                bCancel: !0
                            },
                            cbOk: function () {
                                return e.addLibraryOK("mod")
                            },
                            cbClose: function () {
                                e.selectLibrary(o), (r || l).$destroy(), t.oInputValidUtils.clearInputValidList(), a.removeValidTip()
                            }
                        }), r = t.$new(!1), u(angular.element("#faceLibraryDetail"))(r), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#faceLibraryDetail").hide().show()
                    })
                }, this.getLibraryCfgXml = function (e, t) {
                    if (!e) return "";
                    var n = "<?xml version='1.0' encoding='UTF-8'?>";
                    return "add" === t ? (n += "<CreateFDLibList>", n += "<CreateFDLib>", n += "<id>1</id>", n += "<name>" + a.encodeString(e.name) + "</name>", n += "<thresholdValue>" + e.thresholdValue + "</thresholdValue>", n += "<customInfo>" + a.encodeString(e.customInfo) + "</customInfo>", n += "</CreateFDLib>", n += "</CreateFDLibList>") : "mod" === t && (n += "<FDLibBaseCfgList>", n += "<FDLibBaseCfg>", n += "<id>1</id>", n += "<FDID>" + e.FDID + "</FDID>", n += "<name>" + a.encodeString(e.name) + "</name>", n += "<thresholdValue>" + e.thresholdValue + "</thresholdValue>", n += "<customInfo>" + a.encodeString(e.customInfo) + "</customInfo>", n += "</FDLibBaseCfg>", n += "</FDLibBaseCfgList>"), n
                }, this.addLibraryOK = function (r) {
                    var c = e.m_oParams.oSelectLibrary;
                    if (t.oInputValidUtils.manualInputValid(), !t.oInputValid.bInputValid) return !1;
                    var u = e.getLibraryCfgXml(c, r),
                        m = c.aTarget;
                    return "add" === r ? WebSDK.WSDK_SetDeviceConfig(o.m_szHostName, "faceDataLibraryCfg", null, {
                        data: u,
                        success: function (o, r, d) {
                            if ("createFailed" === a.nodeValue(r, "FDID")) {
                                var u = e.showAnalyzeErr(r);
                                return u ? s.tip(u) : l.saveState(d), void 0
                            }
                            c.FDID = a.nodeValue(r, "FDID"), e.addFaceLibTag(c.FDID, m), e.m_oParams.aLibraryList.push(n.extend({}, c)), t.$apply(), s.tip(i.getValue("saveSucceeded"))
                        },
                        error: function (t, n, i) {
                            var o = e.showAnalyzeErr(n);
                            o ? s.tip(o) : l.saveState(i)
                        },
                        complete: function () {
                            d.close(), e.changeInputValid("library")
                        }
                    }) : WebSDK.WSDK_SetDeviceConfig(o.m_szHostName, "faceDataLibraryCfgModify", null, {
                        data: u,
                        success: function () {
                            e.m_oParams.aLibraryList[e.m_oParams.iSelectLibraryIndex] = c, e.addFaceLibTag(c.FDID, m), t.$apply(), s.tip(i.getValue("saveSucceeded"))
                        },
                        error: function (t, n, i) {
                            var o = e.showAnalyzeErr(n);
                            o ? s.tip(o) : l.saveState(i)
                        },
                        complete: function () {
                            d.close(), e.changeInputValid("library")
                        }
                    }), !1
                }, this.deleteLibrary = function () {
                    var t = i.getValue("deleteAsk");
                    s.confirm(t, 300, function () {
                        e.deleteLibraryByType("ok")
                    })
                }, this.deleteLibraryByType = function (i) {
                    if ("cancel" === i) return d && d.close(), void 0;
                    var a = e.m_oParams.iSelectLibraryIndex,
                        r = e.m_oParams.oSelectLibrary = n.extend({}, e.m_oParams.aLibraryList[a]);
                    WebSDK.WSDK_SetDeviceConfig(o.m_szHostName, "faceDataLibraryCfgDelete", {
                        facelibrary: r.FDID
                    }, {
                        success: function (n, o, r) {
                            e.m_oParams.aLibraryList.splice(a, 1), a >= e.m_oParams.aLibraryList.length ? e.m_oParams.iSelectLibraryIndex = -1 : e.selectLibrary(a), t.$apply(), l.saveState(r), "restart" === i && l.toRestart()
                        },
                        error: function (e, t, n) {
                            l.saveState(n)
                        },
                        complete: function () {
                            d && d.close()
                        }
                    })
                }, this.selectLibrary = function (t) {
                    0 > t || "private" !== e.m_oParams.aLibraryList[t].faceLibType && (e.m_oParams.iSelectLibraryIndex = t, e.m_oParams.oSelectLibrary = n.extend({}, e.m_oParams.aLibraryList[t]), e.searchByParams())
                }, this.searchByParams = function () {
                    e.m_oSearchParams.szCurSample = "", e.searchLibrary(!0)
                }, this.searchLibConditionCache = "", this.syncFaceData = function (o) {
                    if ("table" === o) {
                        var a = [],
                            r = i.getValue("unknown"),
                            l = e.m_oParamsCap,
                            s = e.m_oSearchParamsCap,
                            c = e.m_oTable;
                        n.each(this.m_aSearchResult, function () {
                            var t = [],
                                o = n.extend({}, this);
                            o.sex = i.getValue(o.sex), o.certificateType = e.oOptLan[o.certificateType];
                            var c = "",
                                d = "";
                            "unknown" !== o.province ? (d = s.oProvince[o.province], d ? (o.bornPlace = d, s.oCityList[o.province] && (c = s.oCityList[o.province][o.city] || r), o.bornPlace = "unknown" !== o.city ? d + c : d) : o.bornPlace = r) : o.bornPlace = r, o.modelingStatus = e.oModelLan[o.modelingStatus], t.push(o.name), t.push(o.sex || r), t.push(o.bornTime || r), (l.bSupportProvince || l.bSupportCity) && t.push(o.bornPlace), l.bSupportCertificateType && (t.push(o.certificateType || r), t.push(o.certificateNumber || r)), t.push(o.phoneNumber || r), (l.bSupportModelingStatusSearch || l.bSupportModelStatusSearch) && t.push(o.modelingStatus || r), n.each(o.aPersonInfoExtendList, function () {
                                t.push(this.value)
                            }), a.push(t)
                        }), c.deleteRows(), c.addRows(a), t.oSelectedFaceInfo.iIndex = -1, t.oSelectedFaceInfo.iCheckNum = 0
                    } else n.each(e.m_aSearchResult, function () {
                        this.bChecked = !1
                    }), t.oSelectedFaceInfo.iIndex = -1, t.oSelectedFaceInfo.iCheckNum = 0
                }, this.searchLibrary = function (c, d) {
                    var u = $q.defer(),
                        m = e.m_oParams,
                        p = e.m_oParamsCap;
                    e.m_oSearchParamsCap;
                    var h = e.m_oSearchParams;
                    e.m_oTable;
                    var g = e.m_aSearchResult,
                        f = e.m_oPagingConf;
                    if (-1 === m.iSelectLibraryIndex) return u.resolve(), u.promise;
                    if (Date.parse(h.startTime.replace(/-/g, "/")) - Date.parse(h.endTime.replace(/-/g, "/")) > 0) return s.tipInQueue(i.getValue("timeSegmentErrorTips")), u.resolve(), u.promise;
                    g.length = 0, !1 !== d && (h.searchID = new UUID), c ? (h.searchResultPosition = 0, f.currentPage = 1) : h.searchResultPosition = (f.currentPage - 1) * f.itemsPerPage, h.searchResultNum = f.itemsPerPage;
                    var v = "<?xml version='1.0' encoding='utf-8'?>";
                    if (v += "<FDSearchDescription>", c && (this.searchLibConditionCache = ""), !this.searchLibConditionCache) {
                        var b = "";
                        b += "<FDID>" + m.oSelectLibrary.FDID + "</FDID>", "" !== h.name && (b += "<name>" + a.encodeString(h.name) + "</name>"), "unlimited" !== h.sex && (b += "<sex>" + h.sex + "</sex>"), "unlimited" !== h.province && (b += "<province>" + h.province + "</province>"), "unlimited" !== h.city && (b += "<city>" + h.city + "</city>"), "unlimited" !== h.certificateType && (b += "<certificateType>" + h.certificateType + "</certificateType>"), "" !== h.certificateNumber && (b += "<certificateNumber>" + h.certificateNumber + "</certificateNumber>"), "" !== h.phoneNumber && (b += "<phoneNumber>" + h.phoneNumber + "</phoneNumber>"), "unlimited" !== h.modelingStatus && (p.bSupportModelingStatusSearch ? b += "<modelingStatus>" + h.modelingStatus + "</modelingStatus>" : !p.bSupportModelingStatusSearch && p.bSupportModelStatusSearch && (b += "<modelStatus>" + h.modelingStatus + "</modelStatus>")), "" !== h.szCurSample && (b += "<FaceModeList><FaceMode><ModeInfo>", b += "<similarity>" + h.fSimilarity + "</similarity>", b += "<modeData>" + e.m_oAnalysisRes.aSamples[parseInt(h.szCurSample, 10)].szModeData + "</modeData></ModeInfo></FaceMode></FaceModeList>"), h.startTime && (b += "<startTime>" + h.startTime + "</startTime>"), h.endTime && (b += "<endTime>" + h.endTime + "</endTime>"), this.searchLibConditionCache = b
                    }
                    return v += this.searchLibConditionCache, v += "<searchID>" + h.searchID + "</searchID>", v += "<maxResults>" + h.searchResultNum + "</maxResults>", v += "<searchResultPosition>" + h.searchResultPosition + "</searchResultPosition>", v += "</FDSearchDescription>", WebSDK.WSDK_GetDeviceConfig(o.m_szHostName, "faceDataLibrarySearch", {
                        channel: r.m_iChannelId
                    }, {
                        data: v,
                        success: function (r, l) {
                            g.length = 0, f.totalItems = a.nodeValue(l, "totalMatches", "i");
                            var c = ["FDID", "picURL", "PID", "bornTime", "name", "sex", "province", "city", "certificateType", "certificateNumber", "phoneNumber"];
                            n(l).find("MatchElement").each(function () {
                                var e = a.getXmlNodeObject(this, c),
                                    t = e.picURL;
                                if (t) {
                                    var i = t.lastIndexOf("/FDLib"); - 1 !== i && (t = t.substring(i, t.length), t = o.m_szHttpProtocol + o.m_szHostName + ":" + o.m_iHttpPort + t)
                                }
                                e.picURL = t;
                                var r = ["sex", "province", "city", "certificateType", "phoneNumber", "certificateNumber"];
                                n.each(r, function (t, n) {
                                    e[n] || (e[n] = "")
                                }), e.modelingStatus = a.nodeValue(this, "modelStatus"), p.bSupportModelingStatusSearch && a.nodeValue(this, "ModelingStatus") ? e.modelingStatus = a.nodeValue(n(this).find("ModelingStatus"), "status") : p.bSupportModelStatusSearch && (e.modelingStatus = a.nodeValue(this, "modelStatus"));
                                var l = e.aPersonInfoExtendList = [];
                                n(this).find("PersonInfoExtendList PersonInfoExtend").each(function () {
                                    a.nodeValue(this, "enable", "b") && "" !== a.nodeValue(this, "name") && l.push({
                                        id: a.nodeValue(this, "id"),
                                        enabled: a.nodeValue(this, "enable"),
                                        name: a.nodeValue(this, "name"),
                                        value: a.nodeValue(this, "value")
                                    })
                                }), e.bChecked = !1, g.push(e)
                            }), e.syncFaceData("table"), u.resolve(), t.$digest(), 0 === f.totalItems && s.tipInQueue(i.getValue("noMatches"))
                        },
                        error: function (e, n, i) {
                            l.saveState(i), u.resolve(), t.$digest()
                        },
                        complete: function () {}
                    }), u.promise
                }, this.initTalbe = function () {
                    var o = e.m_oParamsCap,
                        a = [{
                            display: i.getValue("fullName"),
                            percentWidth: "4"
                        }, {
                            display: i.getValue("gender"),
                            percentWidth: "2"
                        }, {
                            display: i.getValue("borntime"),
                            percentWidth: "2"
                        }];
                    (o.bSupportProvince || o.bSupportCity) && a.push({
                        display: i.getValue("bornPlace"),
                        percentWidth: "4"
                    }), o.bSupportCertificateType && (a.push({
                        display: i.getValue("certificateType"),
                        percentWidth: "4"
                    }), a.push({
                        display: i.getValue("certificateNumber"),
                        percentWidth: "4"
                    })), o.bSupportPhoneNumber && a.push({
                        display: i.getValue("contact"),
                        percentWidth: "4"
                    }), (o.bSupportModelingStatusSearch || o.bSupportModelStatusSearch) && a.push({
                        display: i.getValue("modelingStatus"),
                        percentWidth: "3"
                    }), n.each(o.aPersonInfoExtendList, function (e, t) {
                        a.push({
                            display: t.name,
                            percentWidth: "3"
                        })
                    });
                    var r = 0;
                    n.each(a, function () {
                        r += parseInt(this.percentWidth, 10)
                    }), e.m_oTable = n("#tableSearchResult").table({
                        header: a,
                        lan: {
                            index: i.getValue("serialNumber"),
                            item: i.getValue("items"),
                            total: i.getValue("total")
                        },
                        onSelect: function (e) {
                            t.oSelectedFaceInfo.iIndex = e, t.$digest()
                        },
                        onChecked: function (e) {
                            t.oSelectedFaceInfo.iCheckNum = e, t.$digest()
                        },
                        showIndex: !0,
                        showCheckbox: !0,
                        percentWidthSum: r
                    })
                }, this.addFace = function () {
                    e.changeInputValid("library"), e.m_oDefFaceInfo.aPersonInfoExtendList = e.getFaceLibTag(e.m_oParams.oSelectLibrary.FDID, "addFace"), n.extend(e.m_oSelectFaceInfo, e.m_oDefFaceInfo), e.resetCity();
                    var o, r = {
                        $destroy: angular.noop
                    };
                    n.get("config/faceSnapLib/faceLibraryAddFaceInfo.asp", function (l) {
                        d = s.html({
                            szTitle: i.getValue("add"),
                            szContent: l,
                            nWidth: 430,
                            oButtons: {
                                bOK: !0,
                                bCancel: !0
                            },
                            cbOk: function () {
                                return e.addFaceOK("add")
                            },
                            cbClose: function () {
                                (o || r).$destroy(), t.oInputValidUtils.clearInputValidList(), a.removeValidTip()
                            }
                        }), o = t.$new(!1), u(angular.element("#faceLibraryFaceInfo"))(o), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#faceLibraryFaceInfo").hide().show()
                    })
                }, this.editFace = function () {
                    var o = -1;
                    if (o = 2 === e.m_oResultView.iMode ? t.oSelectedFaceInfo.iIndex : e.m_oTable.getSelectedRowIndex(), -1 !== o) {
                        var r = e.m_aSearchResult[o];
                        e.m_oSelectFaceInfo && e.m_oSelectFaceInfo.aPersonInfoExtendList && (e.m_oSelectFaceInfo.aPersonInfoExtendList.length = 0), n.extend(!0, e.m_oSelectFaceInfo, r);
                        for (var l = ["city", "sex", "province", "certificateType"], c = 0; l.length > c; c++) e.m_oSelectFaceInfo[l[c]] = e.m_oSelectFaceInfo[l[c]] ? e.m_oSelectFaceInfo[l[c]] : "unknown";
                        e.resetCity(), e.changeInputValid("library");
                        var m, p = {
                            $destroy: angular.noop
                        };
                        n.get("config/faceSnapLib/faceLibraryEditFaceInfo.asp", function (o) {
                            d = s.html({
                                szTitle: i.getValue("modify"),
                                szContent: o,
                                nWidth: 430,
                                oButtons: {
                                    bOK: !0,
                                    bCancel: !0
                                },
                                cbOk: function () {
                                    return e.addFaceOK("mod")
                                },
                                cbClose: function () {
                                    (m || p).$destroy(), t.oInputValidUtils.clearInputValidList(), a.removeValidTip()
                                }
                            }), m = t.$new(!1), u(angular.element("#faceLibraryFaceInfo"))(m), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#faceLibraryFaceInfo").hide().show()
                        })
                    }
                }, this.changeInputValid = function (t) {
                    var n = e.m_oInputValid;
                    n.oName.bSkipValid = "library" === t, n.oCustomInfo.bSkipValid = "library" === t, n.oThresholdValue.bSkipValid = "library" === t, n.oCertificateNumber.bSkipValid = "face" === t, n.oFaceName.bSkipValid = "face" === t, n.oPersonExtend.bSkipValid = "face" === t
                }, this.addFaceOK = function (o) {
                    if ("add" === o)
                        if ("" === n("#facePhoto").val()) s.alert(i.getValue("uploadImg"));
                        else {
                            if (!n("#facePhoto").val().match(/\.jp(e)?g$/i)) return s.alert(i.getValue("picFormatError")), !1;
                            if (t.oInputValidUtils.manualInputValid(), !t.oInputValid.bInputValid) return !1;
                            e.uploadPic().then(function () {
                                d.close(), e.changeInputValid("face"), e.searchLibrary(!1, !0), s.tip(i.getValue("saveSucceeded"))
                            }, function (t) {
                                d.close(), e.changeInputValid("face"), e.searchLibrary(!1, !0);
                                var n = e.showAnalyzeErr(t);
                                n ? s.tip(n) : s.tip(i.getValue("uploadFailed"))
                            })
                        }
                    else {
                        if (t.oInputValidUtils.manualInputValid(), !t.oInputValid.bInputValid) return !1;
                        e.editFaceInfo().then(function () {
                            d.close(), e.changeInputValid("face"), setTimeout(function () {
                                e.searchLibrary(!1, !0)
                            }, 100), s.tip(i.getValue("saveSucceeded"))
                        }, function (t) {
                            var n = e.showAnalyzeErr(t.result);
                            n ? s.tip(n) : s.tip(i.getValue("saveFailed")), d.close(), e.changeInputValid("face")
                        })
                    }
                    return !1
                }, this.editFaceInfo = function () {
                    var t = $q.defer(),
                        n = e.m_oParams.oSelectLibrary,
                        i = e.m_oSelectFaceInfo,
                        a = e.makeFaceDataXml(i, !0);
                    return WebSDK.WSDK_SetDeviceConfig(o.m_szHostName, "faceDataLibraryFaceData", {
                        facelibrary: n.FDID,
                        facedata: i.PID
                    }, {
                        data: a,
                        success: function () {
                            $timeout(function () {
                                t.resolve()
                            })
                        },
                        error: function (e, n) {
                            $timeout(function () {
                                t.reject({
                                    result: n
                                })
                            })
                        }
                    }), t.promise
                }, this.resetCity = function (t) {
                    var n = e.m_oSearchParamsCap,
                        o = e.m_oSelectFaceInfo,
                        a = o.province,
                        r = n.oCityFace = n.oCityList[a];
                    r || (r = n.oCityFace = {}), r.unknown = i.getValue("unknown"), t && $timeout(function () {
                        o.city = "unknown"
                    }, 10)
                }, this.getSelectListItem = function () {
                    var t = [],
                        i = e.m_oTable;
                    return 1 === e.m_oResultView.iMode ? t = i.getCheckedRowsIndex() : n.each(e.m_aSearchResult, function (e) {
                        this.bChecked && t.push(e)
                    }), t
                }, this.delFace = function () {
                    function t(e) {
                        var t = $q.defer();
                        return WebSDK.WSDK_SetDeviceConfig(o.m_szHostName, "faceDataLibraryFaceDataDelete", {
                            facelibrary: a.FDID,
                            facedata: e.PID
                        }, {
                            error: function (i, o, a) {
                                return "lowPrivilege" === n(o).find("subStatusCode").text() ? (l.saveState(a), $timeout(function () {
                                    t.reject()
                                }), void 0) : (d.push(e.name), $timeout(function () {
                                    t.resolve()
                                }), void 0)
                            },
                            success: function () {
                                $timeout(function () {
                                    t.resolve()
                                })
                            }
                        }), t.promise
                    }
                    e.m_oTable;
                    var a = e.m_oParams.oSelectLibrary,
                        r = e.m_aSearchResult,
                        c = e.getSelectListItem(),
                        d = [];
                    if (c.length) {
                        var u = i.getValue("deleteAsk");
                        s.confirm(u, 300, function () {
                            var o = $q.defer();
                            $timeout(function () {
                                o.resolve()
                            }, 200);
                            var a = o.promise;
                            n.each(c, function (e, n) {
                                a = a.then(function () {
                                    return t(r[n])
                                })
                            }), a.then(function () {
                                u = d.length ? d.join("</br>") + "</br>" + i.getValue("deleteFailed") : i.getValue("deleteSuccess"), s.tip(u);
                                var t = e.m_oPagingConf;
                                e.searchLibrary(!1, !0).then(function () {
                                    var n = Math.ceil(t.totalItems / t.itemsPerPage);
                                    t.currentPage > 1 && t.currentPage > n && (t.currentPage = n, t.pagesLength = t.pagesLength - 1, e.searchLibrary(!1))
                                })
                            })
                        })
                    }
                }, this.exportFace = function () {
                    function t() {
                        h.HWP_StopDownload(p), p = -1
                    }

                    function r() {
                        var e = h.HWP_GetDownloadStatus(p);
                        if (0 === e) {
                            var t = h.HWP_GetDownloadProgress(p);
                            return t
                        }
                        return -1
                    }

                    function l(e, n) {
                        var a = null,
                            l = $q.defer();
                        return a = function (e, n) {
                            if (n = n.replace("・", "·"), p = c.startDownloadEx(e, o.getPluginAuth(), n + ".jpg", "", ""), p >= 0) var a = setInterval(function () {
                                var e = r();
                                (0 > e || e >= 100) && (t(), clearInterval(a), $timeout(function () {
                                    l.resolve()
                                }))
                            }, 100);
                            else -2 === p ? ($timeout(function () {
                                l.reject()
                            }), s.tip(i.getValue("noEnoughSpace"))) : (-3 === p || -1 === p) && ($timeout(function () {
                                l.reject()
                            }), s.tip(i.getValue("createFileFailed")))
                        }, document.createElement("a").download !== void 0 && (m = !0, a = function a(e, t) {
                            var n = document.createElement("a");
                            n.href = e, n.download = t + ".jpg", n.click(), l.resolve()
                        }), a(e, n), l.promise
                    }
                    e.m_oTable, e.m_oParams.oSelectLibrary;
                    var d = e.m_aSearchResult,
                        u = e.getSelectListItem(),
                        m = !1;
                    if (u.length) {
                        var p = -1,
                            h = n("#PreviewActiveX").get(0),
                            g = e.m_oParams;
                        g.iExportFace = 0, g.iTotalExportFace = u.length;
                        var f = $q.defer();
                        $timeout(function () {
                            f.resolve(), e.showDownloadProcess()
                        }, 300);
                        var v = f.promise;
                        n.each(u, function (e, t) {
                            v = v.then(function () {
                                return g.iExportFace++, l(d[t].picURL, d[t].name)
                            })
                        }), v.then(function () {
                            if (!m) {
                                var e = c.getLocalConfig(),
                                    t = a.parseXmlFromStr(e),
                                    o = a.nodeValue(t, "DownloadPath");
                                o += "\\" + a.dateFormat(new Date, "yyyy-MM-dd"), s.tip(i.getValue("exportOK") + "<p id='openDirectory' class='dir pointer'>" + o + "</a></p>", 5), n("#openDirectory").click(function () {
                                    c.openDirectory(o)
                                })
                            }
                        })
                    }
                }, this.importFacebyPic = function () {
                    n.get("config/faceSnapLib/faceLibraryImportPic.asp", function (o) {
                        d = s.html({
                            szTitle: i.getValue("import"),
                            szContent: o,
                            nHeight: 100,
                            oButtons: {
                                bOK: !0,
                                bCancel: !0
                            },
                            cbOk: function () {
                                return e.uploadMultiPic()
                            }
                        }), u(angular.element("#faceLibraryImportPic"))(t), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#faceLibraryImportPic").hide().show()
                    })
                }, this.uploadMultiPic = function () {
                    var a = !!document.getElementById("faceMultiPhoto").files,
                        r = document.getElementById("faceMultiPhoto").files || [{
                            name: document.getElementById("faceMultiPhoto").value
                        }],
                        l = r.length;
                    if (!l) return s.alert(i.getValue("uploadImg")), !1;
                    var c = e.m_oParams,
                        d = o.m_szHttpProtocol + o.m_szHostName + ":" + o.m_iHttpPort + "/ISAPI/Intelligent/FDLib/pictureUpload",
                        u = r,
                        m = [];
                    if ("true" === c.bCoverImport && (d += "&mode=cover"), c.aUploadFail = m, c.iImportFace = 0, c.iTotalImportFace = u.length, c.iSelectImportFace = l, e.showUploadProcess(), a) e.sendFiles(u, d, function () {
                        c.iImportFace = c.iImportFace + 1, t.$$phase || t.$apply()
                    }, function (e, n) {
                        m.push(n), c.iImportFace = c.iImportFace + 1, t.$$phase || t.$apply()
                    });
                    else {
                        var p = r[0].name.split("\\");
                        if (!("" + p[p.length - 1]).match(/\.jp(e)?g$/i)) return m.push(p[p.length - 1]), c.iImportFace = c.iImportFace + 1, t.$$phase || t.$apply(), void 0;
                        var h = "<?xml version='1.0' encoding='UTF-8'?><PictureUploadData>";
                        h += "<FDID>" + e.m_oParams.oSelectLibrary.FDID + "</FDID>", h += "<FaceAppendData>", h += "<name>" + p[p.length - 1].replace(/\..*$/, "") + "</name>", h += "</FaceAppendData>", h += "</PictureUploadData>", n.ajaxFileUpload({
                            url: d,
                            fileElementId: "faceMultiPhoto",
                            data: {
                                FaceAppendData: h
                            },
                            success: function () {
                                c.iImportFace = c.iImportFace + 1
                            },
                            error: function () {
                                m.push(p[p.length - 1]), c.iImportFace = c.iImportFace + 1
                            }
                        })
                    }
                }, this.showUploadResult = function () {
                    var o = e.m_oParams;
                    o.iFailUploadFace = o.aUploadFail.length, n.get("config/faceSnapLib/faceLibraryUploadResult.asp", function (o) {
                        s.html({
                            szTitle: i.getValue("uploadResult"),
                            szContent: o,
                            oButtons: {
                                bOK: !0
                            },
                            cbOk: function () {
                                e.searchLibrary(!1)
                            }
                        }), u(angular.element("#faceLibraryUploadResult"))(t), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#faceLibraryUploadResult").hide().show()
                    })
                }, this.exportUploadFail = function () {
                    var t = e.m_oParams;
                    szExportXml = "<?xml version='1.0' encoding='UTF-8'?><NSTable><tHead><NameList>name", szExportXml += "</NameList>", szExportXml += "<name>" + i.getValue("fullName") + "</name>", szExportXml += "</tHead><tBody>", n.each(t.aUploadFail, function (e, t) {
                        szExportXml += "<tDataItem>", szExportXml += "<name>" + t + "</name>", szExportXml += "</tDataItem>"
                    }), szExportXml += "</tBody></NSTable>";
                    var o = c.exportReport(szExportXml, "", 1);
                    0 === o ? s.tip(i.getValue("exportOK")) : 0 > o && s.tip(i.getValue("exportFailed"))
                }, this.getLibraryCapacity = function () {
                    var t = 0;
                    return WebSDK.WSDK_GetDeviceConfig(o.m_szHostName, "faceDataLibraryCapacity", {
                        facelibrary: e.m_oParams.oSelectLibrary.FDID
                    }, {
                        async: !1,
                        success: function (e, n) {
                            t = a.nodeValue(n, "FDPicturesNumber", "i")
                        },
                        error: function () {
                            t = -1
                        }
                    }), t
                }, this.uploadPic = function () {
                    var t, i = $q.defer(),
                        r = e.m_oSelectFaceInfo;
                    t = o.m_szHttpProtocol + o.m_szHostName + ":" + o.m_iHttpPort + "/ISAPI/Intelligent/FDLib/pictureUpload";
                    var l = e.getLibraryCapacity(),
                        s = e.checkCapacity(1, l);
                    return s.then(function () {
                        var o = e.m_oParams;
                        "true" === o.bCoverImport && (t += "?mode=cover");
                        var l = e.makeFaceDataXml(r);
                        n.ajaxFileUpload({
                            url: t,
                            fileElementId: "facePhoto",
                            data: {
                                FaceAppendData: l
                            },
                            success: function (e) {
                                r.PID = a.nodeValue(e, "PID"), r.picURL = a.nodeValue(e, "picURL") + "?" + (new Date).getTime(), r.PID ? $timeout(function () {
                                    i.resolve()
                                }) : $timeout(function () {
                                    i.reject(e)
                                })
                            },
                            error: function (e, t) {
                                $timeout(function () {
                                    i.reject(t)
                                })
                            }
                        })
                    }), i.promise
                }, this.makeFaceDataXml = function (t, i) {
                    var o = "<?xml version='1.0' encoding='UTF-8'?>";
                    return i || (o += "<PictureUploadData>", o += "<FDID>" + e.m_oParams.oSelectLibrary.FDID + "</FDID>"), o += "<FaceAppendData>", o += i ? "<name>" + a.encodeString(t.name) + "</name>" : "<name>" + a.encodeString(a.encodeString(t.name)) + "</name>", o += "<bornTime>" + t.bornTime + "</bornTime>", "unknown" !== t.sex ? o += "<sex>" + t.sex + "</sex>" : i && (o += "<sex></sex>"), "unknown" !== t.province ? o += "<province>" + t.province + "</province>" : i && (o += "<province></province>"), "unknown" !== t.city ? o += "<city>" + t.city + "</city>" : i && (o += "<city></city>"), "unknown" !== t.certificateType ? (o += "<certificateType>" + t.certificateType + "</certificateType>", o += i ? "<certificateNumber>" + a.encodeString(t.certificateNumber) + "</certificateNumber>" : "<certificateNumber>" + a.encodeString(a.encodeString(t.certificateNumber)) + "</certificateNumber>") : i && (o += "<certificateType></certificateType>", o += "<certificateNumber></certificateNumber>"), t.phoneNumber ? o += i ? "<phoneNumber>" + a.encodeString(t.phoneNumber) + "</phoneNumber>" : "<phoneNumber>" + a.encodeString(a.encodeString(t.phoneNumber)) + "</phoneNumber>" : i && (o += "<phoneNumber></phoneNumber>"), t.aPersonInfoExtendList.length && (o += "<PersonInfoExtendList>", n.each(t.aPersonInfoExtendList, function () {
                        o += "<PersonInfoExtend>", o += "<id>" + this.id + "</id>", o += "<enable>" + ("" + this.enabled) + "</enable>", i ? (o += "<name>" + a.encodeString(this.name) + "</name>", o += "<value>" + a.encodeString(this.value) + "</value>") : (o += "<name>" + a.encodeString(a.encodeString(this.name)) + "</name>", o += "<value>" + a.encodeString(a.encodeString(this.value)) + "</value>"), o += "</PersonInfoExtend>"
                    }), o += "</PersonInfoExtendList>"), o += "</FaceAppendData>", i || (o += "</PictureUploadData>"), o
                }, this.sendFiles = function (t, i, o, a) {
                    function r(c, d) {
                        if (!(s++ >= l)) {
                            if (!("" + c.name).match(/\.jp(e)?g$/i)) return a(null, c.name, l), new r(t[s], i), void 0;
                            var u = c.name;
                            u = u.substring(0, u.lastIndexOf("."));
                            var m = "<?xml version='1.0' encoding='UTF-8'?>";
                            m += "<PictureUploadData>", m += "<FDID>" + e.m_oParams.oSelectLibrary.FDID + "</FDID>", m += "<FaceAppendData>", m += "<name>" + u + "</name>", m += "</FaceAppendData>", m += "</PictureUploadData>";
                            var p = new FormData;
                            p.append("FaceAppendData", m), p.append("importImage", c), n.ajax({
                                url: d,
                                type: "POST",
                                cache: !1,
                                data: p,
                                processData: !1,
                                contentType: !1,
                                success: function (e) {
                                    o(e, c.name, l)
                                },
                                error: function (e) {
                                    a(e, c.name, l)
                                },
                                complete: function () {
                                    new r(t[s], i)
                                }
                            })
                        }
                    }
                    var l = t.length,
                        s = 0;
                    return new r(t[0], i), l
                }, this.checkCapacity = function (o, a) {
                    var r = $q.defer(),
                        l = e.m_oParams;
                    if (l.bCoverImport = "false", o > a && -1 !== a) {
                        e.m_oLan.szCoverAllTip = i.getValue("coverAllTip", [o - a]);
                        var c = "<div id='importAak' class='config'><div class='item'><label ng-bind='oLan.coverImport'></label></div><div class='item'><input id='coverYes' name='cover' value='true' ng-model='oParams.bCoverImport' type='radio' class='radio'/><label for='coverYes' ng-bind='oLan.szCoverAllTip'></label><input id='coverNo' name='cover' value='false' ng-model='oParams.bCoverImport' type='radio' class='radio'/><label for='coverNo' ng-bind='oLan.no'></label></div></div>";
                        s.html({
                            nWidth: 400,
                            szTitle: i.getValue("import"),
                            szContent: c,
                            id: "importAakDialog",
                            zIndex: 2e3,
                            oButtons: {
                                bOK: !0,
                                bCancel: !0
                            },
                            cbOk: function () {
                                $timeout(function () {
                                    r.resolve()
                                })
                            },
                            cbClose: function () {
                                $timeout(function () {
                                    r.reject()
                                })
                            }
                        }), u(angular.element("#importAak"))(t), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#importAak").hide().show()
                    } else $timeout(function () {
                        r.resolve()
                    });
                    return r.promise
                }, this.changeViewMode = function (t) {
                    e.m_oResultView.iMode = t, 1 === t ? $timeout(function () {
                        e.syncFaceData("table"), n("#tableSearchResult .table").resize()
                    }, 200) : $timeout(function () {
                        e.syncFaceData("preview")
                    }, 200)
                }, this.doMultiModel = function () {
                    e.m_oParams.bMultiModelForAll = !1, e.m_oParams.bMultiModelForUnModel = !0;
                    var o = "<div id='modelingMode' class='config width400'><div class='item'><input id='unModelingMode' ng-model='oParams.bMultiModelForUnModel' type='checkbox' class='checkbox'/><label for='unModelingMode' ng-bind='oLan.unModelingMode'></label></div>";
                    o += "<div id='modelingMode' class='item'><input id='allModelingMode' ng-model='oParams.bMultiModelForAll' type='checkbox' class='checkbox'/><label for='allModelingMode' ng-bind='oLan.allModelingMode'></label></div></div>", s.html({
                        nWidth: 400,
                        szTitle: i.getValue("doMultiFaceModeling"),
                        szContent: o,
                        oButtons: {
                            bOK: !0,
                            bCancel: !0
                        },
                        cbOk: function () {
                            var t = e.m_oParams.bMultiModelForUnModel ? "unmodeled" : "all";
                            e.doModeling(t)
                        }
                    }), u(angular.element("#modelingMode"))(t), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#modelingMode").hide().show()
                }, this.doModeling = function (t) {
                    var n = e.m_oParams.oSelectLibrary;
                    WebSDK.WSDK_GetDeviceConfig(o.m_szHostName, "manualModeling", {
                        facelibrary: n.FDID,
                        range: t
                    }, {
                        success: function (t, n) {
                            h = a.nodeValue(n, "id", "i"), e.showModelingProcess()
                        },
                        error: function (e, t, n) {
                            l.saveState(n)
                        }
                    })
                }, this.importToLib = function (t) {
                    function r(n) {
                        var i = $q.defer(),
                            r = "<FDLibSource>\n";
                        return r += "<FDID>" + c.FDID + "</FDID>\n", r += "<Picture>\n", r += "<PID>" + n.PID + "</PID>\n", r += "</Picture>\n", r += "</FDLibSource>", WebSDK.WSDK_SetDeviceConfig(o.m_szHostName, "faceLibImportExistPic", {
                            facelibrary: t
                        }, {
                            data: a.parseXmlFromStr(r),
                            error: function (t, o, a) {
                                $timeout(function () {
                                    i.reject({
                                        name: n.name,
                                        status: !1
                                    })
                                }), clearInterval(m), d.close();
                                var r = e.showAnalyzeErr(o);
                                return r ? (s.tip(r), void 0) : (l.saveState(a), void 0)
                            },
                            success: function () {
                                $timeout(function () {
                                    i.resolve({
                                        name: n.name,
                                        status: !0
                                    })
                                })
                            }
                        }), i.promise
                    }
                    e.m_oTable;
                    var c = e.m_oParams.oSelectLibrary,
                        u = e.m_aSearchResult,
                        p = e.getSelectListItem(),
                        h = e.m_oParams;
                    if (h.iCopyFace = 0, h.iTotalCopyFace = p.length, p.length) {
                        var g = [],
                            f = $q.defer();
                        $timeout(function () {
                            f.resolve(), e.showCopyProcess()
                        }, 300);
                        var v = f.promise;
                        n.each(p, function (e, t) {
                            v = v.then(function (e) {
                                return e && !e.status && g.push(e.name), h.iCopyFace++, r(u[t])
                            })
                        }), v.then(function () {
                            s.tip(i.getValue("copySuccess"))
                        })
                    }
                }, this.showCopyProcess = function () {
                    e.m_oParams;
                    var o = "<div id='importProcess' class='config modeling'>";
                    o += "<div class='item width400'>", o += "<span class='process'>{{oParams.iCopyFace}}/{{oParams.iTotalCopyFace}}</span></div></div>";
                    var a;
                    d = s.html({
                        id: "showUploadProcess",
                        nWidth: 400,
                        szTitle: i.getValue("copyTo"),
                        szContent: o,
                        oButtons: {
                            bOK: !1,
                            bCancel: !1,
                            bClose: !0
                        },
                        cbClose: function () {
                            clearInterval(m)
                        }
                    }), a = t.$new(!1), u(angular.element("#importProcess"))(a), t.$apply(), n("#importProcess").hide().show(), clearInterval(m), m = setInterval(function () {
                        e.getCopyProcess()
                    }, 1e3)
                }, this.getCopyProcess = function () {
                    var t = e.m_oParams;
                    t.iCopyFace >= t.iTotalCopyFace && (clearInterval(m), d.close())
                }, this.showDownloadProcess = function () {
                    e.m_oParams;
                    var o = "<div id='importProcess' class='config modeling'>";
                    o += "<div class='item width400'>", o += "<span class='process'>{{oParams.iExportFace}}/{{oParams.iTotalExportFace}}</span></div></div>";
                    var a;
                    d = s.html({
                        id: "showUploadProcess",
                        nWidth: 400,
                        szTitle: i.getValue("export"),
                        szContent: o,
                        oButtons: {
                            bOK: !1,
                            bCancel: !1,
                            bClose: !0
                        },
                        cbClose: function () {
                            clearInterval(m)
                        }
                    }), a = t.$new(!1), u(angular.element("#importProcess"))(a), t.$apply(), n("#importProcess").hide().show(), clearInterval(m), m = setInterval(function () {
                        e.getDownloadProcess()
                    }, 1e3)
                }, this.getDownloadProcess = function () {
                    var t = e.m_oParams;
                    t.iExportFace >= t.iTotalExportFace && (clearInterval(m), d.close())
                }, this.showUploadProcess = function () {
                    e.m_oParams;
                    var o = "<div id='importProcess' class='config modeling'>";
                    o += "<div class='item width400'>", o += "<span class='process'>{{oParams.iImportFace}}/{{oParams.iSelectImportFace}}</span></div></div>";
                    var a;
                    d = s.html({
                        id: "showUploadProcess",
                        nWidth: 400,
                        szTitle: i.getValue("importProcess"),
                        szContent: o,
                        oButtons: {
                            bOK: !1,
                            bCancel: !1,
                            bClose: !0
                        },
                        cbClose: function () {
                            clearInterval(m)
                        }
                    }), a = t.$new(!1), u(angular.element("#importProcess"))(a), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#importProcess").hide().show(), clearInterval(m), m = setInterval(function () {
                        e.getUploadProcess()
                    }, 1e3)
                }, this.getUploadProcess = function () {
                    var t = e.m_oParams;
                    t.iImportFace >= t.iTotalImportFace && (clearInterval(m), d.close(), e.showUploadResult())
                }, this.showModelingProcess = function () {
                    var o = e.m_oParams;
                    o.iModeledFace = 0, o.iTotalModelFace = 0;
                    var a = "<div id='modelingProcess' class='config modeling'><div class='item'>";
                    a += "<span ng-bind='oLan.modelingLimitTip'></span></div>", a += "<div class='item'>", a += "<span class='process'>{{oParams.iModeledFace}}/{{oParams.iTotalModelFace}}</span></div></div>", d = s.html({
                        nWidth: 400,
                        szTitle: i.getValue("modelingProcess"),
                        szContent: a,
                        oButtons: {
                            bOK: !1,
                            bCancel: !1,
                            bClose: !0
                        },
                        cbClose: function () {
                            clearInterval(m)
                        }
                    }), u(angular.element("#modelingProcess"))(t), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#modelingProcess").hide().show(), clearInterval(m), m = setInterval(function () {
                        e.getModelingProcess()
                    }, 1e3)
                }, this.getModelingProcess = function () {
                    WebSDK.WSDK_GetDeviceConfig(o.m_szHostName, "manualModelingProgress", {
                        taskid: h
                    }, {
                        success: function (t, n) {
                            $timeout(function () {
                                var t = e.m_oParams;
                                t.iTotalModelFace = a.nodeValue(n, "taskTotalNumber", "i"), t.iModeledFace !== t.iTotalModelFace && (t.iModeledFace = a.nodeValue(n, "completeNumber", "i"), t.iModeledFace === t.iTotalModelFace && (clearInterval(m), d.close(), e.showModelResult()))
                            })
                        }
                    })
                }, this.getInfoByModelStatus = function (t) {
                    function r() {
                        var e = "<?xml version='1.0' encoding='UTF-8'?>";
                        e += "<FDModelingStatusSearchDescription>", e += "<searchID>" + new UUID + "</searchID>", e += "<maxResults>100</maxResults>", e += "<searchResultPosition>" + u + "</searchResultPosition>", e += "<taskID>" + h + "</taskID>", e += "<CondList><Cond>", e += "<FDID>" + c.FDID + "</FDID>", e += "</Cond></CondList>", e += "</FDModelingStatusSearchDescription>", WebSDK.WSDK_GetDeviceConfig(o.m_szHostName, "modelingStatus", {
                            status: t
                        }, {
                            async: !1,
                            data: e,
                            success: function (e, t) {
                                u += a.nodeValue(t, "numOfMatches", "i");
                                var o = {
                                    noface: i.getValue("noface"),
                                    faceSizeSmall: i.getValue("faceSizeSmall"),
                                    shadeFace: i.getValue("shadeFace"),
                                    unknow: i.getValue("UnknownError")
                                };
                                n(t).find("ModelingStatus").each(function () {
                                    l.push({
                                        name: a.nodeValue(this, "name"),
                                        reason: o[a.nodeValue(this, "reason")]
                                    })
                                }), "MORE" === a.nodeValue(t, "responseStatusStrg") ? r() : d.close()
                            },
                            error: function () {
                                d.close()
                            }
                        })
                    }
                    var l = [],
                        c = e.m_oParams.oSelectLibrary,
                        u = 1;
                    return d = s.wait(i.getValue("getModelingResult")), r(), l
                }, this.showModelResult = function () {
                    var o = e.m_oParams;
                    o.aModelFail = e.getInfoByModelStatus("failed"), o.iFailModelFace = o.aModelFail.length, n.get("config/faceSnapLib/faceLibraryModelResult.asp", function (o) {
                        s.html({
                            szTitle: i.getValue("modelingResult"),
                            szContent: o,
                            oButtons: {
                                bOK: !0
                            },
                            cbOk: function () {
                                e.searchLibrary(!1)
                            }
                        }), u(angular.element("#faceLibraryModelResult"))(t), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#faceLibraryModelResult").hide().show()
                    })
                }, this.exportModelFail = function () {
                    var t = e.m_oParams;
                    szExportXml = "<?xml version='1.0' encoding='UTF-8'?><NSTable><tHead><NameList>name,reason", szExportXml += "</NameList>", szExportXml += "<name>" + i.getValue("fullName") + "</name>", szExportXml += "<reason>" + i.getValue("reason") + "</reason>", szExportXml += "</tHead><tBody>", n.each(t.aModelFail, function (e, t) {
                        szExportXml += "<tDataItem>", szExportXml += "<name>" + t.name + "</name>", szExportXml += "<reason>" + t.reason + "</reason>", szExportXml += "</tDataItem>"
                    }), szExportXml += "</tBody></NSTable>";
                    var o = c.exportReport(szExportXml, "", 1);
                    0 === o ? s.tip(i.getValue("exportOK")) : 0 > o && s.tip(i.getValue("exportFailed"))
                }, this.doRangeModel = function () {
                    var t = e.getSelectListItem();
                    if (t.length) {
                        var i = e.m_aSearchResult,
                            r = e.m_oParams.oSelectLibrary,
                            s = "<?xml version='1.0' encoding='UTF-8'?>";
                        s += "<ModelingRangeList>", n.each(t, function (e, t) {
                            s += "<ModelingRange>", s += "<FDID>" + r.FDID + "</FDID>", s += "<PID>" + i[t].PID + "</PID>", s += "</ModelingRange>"
                        }), s += "</ModelingRangeList>", WebSDK.WSDK_SetDeviceConfig(o.m_szHostName, "manualModelingRange", null, {
                            data: s,
                            success: function (t, n) {
                                h = a.nodeValue(n, "id", "i"), e.showModelingProcess()
                            },
                            error: function (e, t, n) {
                                l.saveState(n)
                            }
                        })
                    }
                }, this.searchByPic = function () {
                    e.m_oAnalysisRes.aSamples.length = 0, e.m_oAnalysisRes.bError = !1, e.m_oAnalysisRes.szErrorMsg = "", e.m_oSearchParams.szCurSample = "", e.m_oSearchParams.fSimilarity = 80;
                    var o, r = {
                        $destroy: angular.noop
                    };
                    n.get("config/faceSnapLib/faceLibrarySearchByPic.asp", function (l) {
                        s.html({
                            szTitle: i.getValue("searchByPic"),
                            szContent: l,
                            nWidth: 480,
                            nHeight: 400,
                            oButtons: {
                                bOK: !0,
                                bCancel: !0
                            },
                            cbOk: function () {
                                return t.oInputValidUtils.manualInputValid("similarity"), t.oInputValid.bInputValid ? "" === n("#faceSearchPhoto").val() && 0 === e.m_oAnalysisRes.aSamples.length ? (s.alert(i.getValue("uploadImg")), !1) : ("" === e.m_oAnalysisRes.szCurSample && s.alert(i.getValue("uploadImg")), e.searchLibrary(!0), void 0) : !1
                            },
                            cbClose: function () {
                                e.m_oSearchParams.szCurSample = "", (o || r).$destroy(), t.oInputValidUtils.clearInputValidList(), a.removeValidTip()
                            }
                        }), o = t.$new(!1), u(angular.element("#faceLibrarySearchByPic"))(o), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#faceLibrarySearchByPic").hide().show()
                    })
                }
            }]).controller("faceLibraryStatisticController", function ($scope, service, $compile) {
                t = $scope, u = $compile, $scope.oLan = service.m_oLan, $scope.oParamsCap = service.m_oParamsCap, $scope.filePath = "", $scope.showFilePath = function () {
                    var e = document.getElementById("faceMultiPhoto").files || [{
                        name: document.getElementById("faceMultiPhoto").value
                    }];
                    $scope.filePath = e.length ? i.getValue("filesSelected", [e.length]) : "", $scope.$apply()
                }, $scope.iChannelNum = r.m_iAnalogChannelNum + r.m_iDigitalChannelNum, $scope.oDigital = r.m_aDigitalChannelId, $scope.iAnalogChannelNum = r.m_iAnalogChannelNum, $scope.oAnalogId = r.m_aOnlineAnalogChannelId, $scope.oUtils = a, $scope.oInputValid = {}, $scope.aInputValidList = [], $scope.oInputValidUtils = {}, $scope.oParams = service.m_oParams, $scope.oSearchParamsCap = service.m_oSearchParamsCap, $scope.oSearchParams = service.m_oSearchParams, $scope.oInputValid = service.m_oInputValid, $scope.oSelectLibrary = {}, $scope.oSelectFaceInfo = service.m_oSelectFaceInfo, $scope.addLibrary = service.addLibrary, $scope.editLibrary = service.editLibrary, $scope.deleteLibrary = service.deleteLibrary, $scope.deleteLibraryByType = service.deleteLibraryByType, $scope.selectLibrary = service.selectLibrary, $scope.searchByParams = service.searchByParams, $scope.resetSearchParams = service.resetSearchParams, $scope.addFace = service.addFace, $scope.editFace = service.editFace, $scope.delFace = service.delFace, $scope.importFacebyPic = function () {
                    $scope.filePath = "", service.importFacebyPic()
                }, $scope.oResultView = service.m_oResultView, $scope.aViewData = service.m_aSearchResult, $scope.changeViewMode = service.changeViewMode, $scope.doMultiModel = service.doMultiModel, $scope.doRangeModel = service.doRangeModel, $scope.exportModelFail = service.exportModelFail, $scope.exportUploadFail = service.exportUploadFail, $scope.searchByPic = service.searchByPic, $scope.exportFace = function () {
                    service.exportFace()
                }, $scope.pagingConf = service.m_oPagingConf, $scope.oAnalysisRes = service.m_oAnalysisRes, $scope.changeProvince = function () {
                    service.resetCity(!0)
                }, $scope.checkPreviewImage = function () {
                    var e = 0;
                    n.each($scope.aViewData, function () {
                        this.bChecked && e++
                    }), $scope.oSelectedFaceInfo.iCheckNum = e
                }, $scope.oSelectedFaceInfo = {
                    iIndex: -1,
                    iCheckNum: 0,
                    aCheckInfo: []
                }, $scope.oSelectedCopyData = {
                    iIndex: -1
                }, $scope.copyFaceTo = function () {
                    var e, o = {
                        $destroy: angular.noop
                    };
                    n.get("config/faceSnapLib/faceLibraryCopyData.asp", function (a) {
                        d = s.html({
                            szTitle: i.getValue("copyTo"),
                            szContent: a,
                            nWidth: 430,
                            oButtons: {
                                bOK: !0,
                                bCancel: !0
                            },
                            cbOk: function () {
                                return $scope.oParams.aLibraryList[$scope.oSelectedCopyData.iIndex].FDID ? (service.importToLib($scope.oParams.aLibraryList[$scope.oSelectedCopyData.iIndex].FDID), void 0) : !1
                            },
                            cbClose: function () {
                                (e || o).$destroy()
                            }
                        }), e = t.$new(!1), u(angular.element("#faceLibraryCopyData"))(e), t.$apply(), artDialog.get("dialoghtml").position(artDialog.defaults.left, artDialog.defaults.top), n("#faceLibraryFaceInfo").hide().show()
                    })
                }, $scope.selectCopyToLibrary = function (e) {
                    "private" != $scope.oParams.aLibraryList[e].faceLibType && ($scope.oSelectedCopyData.iIndex = e)
                }, $scope.extendSearchOpt = function (e) {
                    var t;
                    return n.isArray(e) ? (t = n.extend(!0, [], e), t.push({
                        value: "unlimited",
                        name: i.getValue("unlimited")
                    })) : (t = n.extend(!0, {}, e), t.unlimited = i.getValue("unlimited")), t
                }, $scope.extendEditOpt = function (e) {
                    var t;
                    return n.isArray(e) ? (t = n.extend(!0, [], e), t.push({
                        value: "unknown",
                        name: i.getValue("unknown")
                    })) : (t = n.extend(!0, {}, e), t.unknown = i.getValue("unknown")), t
                }, $scope.$watch("oSearchParams.province", function (e) {
                    if (e) {
                        var t = $scope.oSearchParamsCap.oCity = $scope.oSearchParamsCap.oCityList[e] || {};
                        t.unlimited = i.getValue("unlimited"), $scope.oSearchParams.city = "unlimited"
                    }
                }), $scope.$watch("oParams.bMultiModelForAll", function (e) {
                    $scope.oParams.bMultiModelForUnModel = e ? !1 : !0
                }), $scope.$watch("oParams.bMultiModelForUnModel", function (e) {
                    $scope.oParams.bMultiModelForAll = e ? !1 : !0
                }), service.getCap().then(function () {
                    service.initTalbe(), service.getInfo()
                }), $scope.certificateTypeChange = function () {
                    "unknown" === $scope.oSelectFaceInfo.certificateType && ($scope.oSelectFaceInfo.certificateNumber = "")
                }
            }), angular.bootstrap(angular.element("#faceLibraryStatistic"), ["faceLibraryStatisticApp"])
        },
        resize: function () {},
        unload: function () {
            n("#view").removeAttr("style"), n("#view").removeClass("face-library-view")
        }
    }, module.exports = new e
});