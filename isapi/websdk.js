define(function (require, exports, module) {
    function WebSDK() {
        var WSDK_ERROR_COMMOD = 1,
            WSDK_ERROR_PARAMNUM = 2,
            HTTP_STATUS_200 = 200,
            HTTP_STATUS_401 = 401,
            PARAM_OPTION_CHANNEL = "channel",
            PARAM_OPTION_STREAM = "videoStream",
            PARAM_OPTION_DISK = "disk",
            PARAM_OPTION_PRESET = "preset",
            PARAM_OPTION_PATROL = "patrol",
            PARAM_OPTION_PATTERN = "pattern",
            PARAM_OPTION_EXCEPTION = "exception",
            PARAM_OPTION_IO = "io",
            PARAM_OPTION_OUTPUT = "output",
            PARAM_OPTION_MODE = "mode",
            PARAM_OPTION_USER = "user",
            PARAM_OPTION_CUSTOM = "custom",
            PARAM_OPTION_REGION = "region",
            PARAM_OPTION_SCENE = "scene",
            PARAM_OPTION_DERECTION = "direction",
            PARAM_OPTION_LINE = "line",
            PARAM_OPTION_SMART = "smart",
            PARAM_OPTION_LINK = "link",
            PARAM_OPTION_SCHEDULE = "schedule",
            PARAM_OPTION_INTERFACE = "interface",
            PARAM_OPTION_CLOUD = "cloud",
            PARAM_OPTION_TIMESTAMP = "timeStamp",
            PARAM_OPTION_FILENAME = "filename",
            PARAM_OPTION_WANNUM = "wannum",
            PARAM_OPTION_URL = "cmd",
            PARAM_OPTION_QAID = "question",
            PARAM_OPTION_FACELIBRARY = "facelibrary",
            PARAM_OPTION_FACEDATA = "facedata",
            PARAM_OPTION_FACEMODELRANGE = "range",
            PARAM_OPTION_FACEMODELSTATU = "status",
            PARAM_OPTION_TASKID = "taskid",
            PARAM_OPTION_PARAMS = "params",
            PARAM_OPTION_ENGINE = "engine",
            PARAM_OPTION_EVENT = "event",
            m_oTransMethord = null,
            m_deviceSet = [],
            // m_bDebug = seajs.bDebugMode || !1,
            self = this;
        this.iSecurityVersion = 1, this.iKeyIterateNum = 0, this.szAESKey = "", this.oSecurityCap = {
            bSptUserCheck: !1,
            bSptGuidExport: !1,
            bSptQACfg: !1,
            iMaxQANum: 3,
            bSptOnlineUser: !1,
            bSupportONVIFUser: !1
        }, this.m_bReConnecting = !1, this.CGI = {
            deviceLan: {
                url: "%s%s:%s/SDK/language"
            },
            sessionCap: {
                url: "%s%s:%s/ISAPI/Security/sessionLogin/capabilities"
            },
            sessionLogin: {
                url: "%s%s:%s/ISAPI/Security/sessionLogin?timeStamp=%s",
                req: [PARAM_OPTION_TIMESTAMP]
            },
            sessionHeartbeat: {
                url: "%s%s:%s/ISAPI/Security/sessionHeartbeat"
            },
            sessionLogout: {
                url: "%s%s:%s/ISAPI/Security/sessionLogout"
            },
            login: {
                url: "%s%s:%s/ISAPI/Security/userCheck?timeStamp=%s",
                req: [PARAM_OPTION_TIMESTAMP]
            },
            securityCap: {
                url: "%s%s:%s/ISAPI/Security/capabilities"
            },
            securityExtCap: {
                url: "%s%s:%s/ISAPI/Security/extern/capabilities"
            },
            questionInfoList: {
                url: "%s%s:%s/ISAPI/Security/questionConfiguration",
                security1: ["answer", "password"]
            },
            questionInfo: {
                url: "%s%s:%s/ISAPI/Security/questionConfiguration/%s",
                req: [PARAM_OPTION_QAID],
                security1: ["answer"]
            },
            questionAuth: {
                url: "%s%s:%s/ISAPI/Security/questionCertification",
                security1: ["answer"]
            },
            loginPwdCheck: {
                url: "%s%s:%s/ISAPI/Security/loginPassword",
                security1: ["password"]
            },
            challenge: {
                url: "%s%s:%s/ISAPI/Security/challenge"
            },
            activateStatus: {
                url: "%s%s:%s/SDK/activateStatus"
            },
            activate: {
                url: "%s%s:%s/ISAPI/System/activate"
            },
            activateIPC: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/activate",
                security1: ["userName", "password"]
            },
            sHttpCapa: {
                url: "%s%s:%s/SDK/capabilities"
            },
            deviceCapa: {
                url: "%s%s:%s/ISAPI/System/capabilities"
            },
            deviceInfoCapa: {
                url: "%s%s:%s/ISAPI/System/deviceInfo/capabilities"
            },
            deviceInfo: {
                url: "%s%s:%s/ISAPI/System/deviceInfo"
            },
            imageCap: {
                url: "%s%s:%s/ISAPI/Image/channels/1/imageCap"
            },
            smartCap: {
                url: "%s%s:%s/ISAPI/Smart/capabilities"
            },
            channelAttrList: {
                url: "%s%s:%s/ISAPI/AUXInfo/attributes/Channels"
            },
            channelAttr: {
                url: "%s%s:%s/ISAPI/AUXInfo/attributes/Channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            AnalogChannelInfo: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels"
            },
            AnalogChannelSingleInfo: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            DigitalChannelInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels",
                security1: ["userName", "password"]
            },
            ChannelSingleInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s"
                },
                req: [PARAM_OPTION_CHANNEL],
                security1: ["userName", "password"]
            },
            DigitalChannelStatus: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/status",
                security1: ["userName"]
            },
            ZeroChannelInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels"
            },
            StreamChannels: {
                url: "%s%s:%s/ISAPI/Streaming/channels"
            },
            StreamProxyChannels: {
                url: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels"
            },
            sourceSupport: {
                url: "%s%s:%s/ISAPI/ContentMgmt/sourceSupport"
            },
            addIpc: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels",
                security1: ["userName", "password"]
            },
            modifyIpc: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s",
                req: [PARAM_OPTION_CHANNEL],
                security1: ["userName", "password"]
            },
            deleteIpc: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            sourceCapability: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/sourceCapability",
                security1: ["userName", "password"]
            },
            ipcSearch: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/search",
                security1: ["userName", "password"]
            },
            customProtocolInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/customProtocols"
            },
            customProtocol: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/customProtocols/%s",
                req: [PARAM_OPTION_CUSTOM]
            },
            customProtocolCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/customProtocols/%s/capabilities",
                req: [PARAM_OPTION_CUSTOM]
            },
            talkInfo: {
                url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/1/"
            },
            talkListInfo: {
                url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels"
            },
            holidayInfo: {
                url: "%s%s:%s/ISAPI/System/Holidays"
            },
            pnpInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/pnp"
            },
            IOCap: {
                url: "%s%s:%s/ISAPI/System/IO/capabilities"
            },
            IOAdvanceParameterCap: {
                url: "%s%s:%s/ISAPI/System/IO/outputs/advanceParameter/capabilities?format=json"
            },
            IOAdvanceParameter: {
                url: "%s%s:%s/ISAPI/System/IO/outputs/advanceParameter?format=json"
            },
            AnalogAlarmOutputInfo: {
                url: "%s%s:%s/ISAPI/System/IO/outputs"
            },
            DigitalAlarmOutputInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/outputs",
                security1: ["userName", "password"]
            },
            AnalogAlarmInputInfo: {
                url: "%s%s:%s/ISAPI/System/IO/inputs"
            },
            DigitalAlarmInputInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/inputs",
                security1: ["userName", "password"]
            },
            overlayCapa: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/overlays/capabilities"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/overlays/capabilities"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            overlayInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/overlays"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/overlays"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            videoCapa: {
                analog: {
                    url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/capabilities"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels/%s%s/capabilities"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            videoDynamicCapa: {
                analog: {
                    url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/dynamicCap"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels/%s%s/dynamicCap"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            videoInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/Streaming/channels/%s%s"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels/%s%s"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            audioCapa: {
                url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            audioInfo: {
                url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            audioDynamicCapa: {
                url: "%s%s:%s/ISAPI/System/Audio/channels/%s/dynamicCap",
                req: [PARAM_OPTION_CHANNEL]
            },
            eventVideoCapa: {
                url: "%s%s:%s/ISAPI/Event/notification/Streaming/%s01/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            eventVideoInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/Event/notification/Streaming/%s01"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/Event/notification/Streaming/%s01"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            zeroChannelCapa: {
                url: "%s%s:%s/ISAPI/ContentMgmt/ZeroStreaming/channels/101/capabilities"
            },
            zeroChannelInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/ZeroStreaming/channels/101"
            },
            zeroChannelEnable: {
                url: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels/1"
            },
            recordCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/record/tracks/%s01/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            captureCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/record/tracks/%s03/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            trackInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/record/tracks"
            },
            eventCapa: {
                url: "%s%s:%s/ISAPI/Event/capabilities"
            },
            exceptionLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/%s",
                req: [PARAM_OPTION_EXCEPTION]
            },
            snapshotCap: {
                analog: {
                    url: "%s%s:%s/ISAPI/Snapshot/channels/%s/capabilities"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/SnapshotProxy/channels/%s/capabilities"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            snapshotInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/Snapshot/channels/%s"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/SnapshotProxy/channels/%s"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            snapshotListInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/Snapshot/channels"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/SnapshotProxy/channels"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            motionCapa: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/motionDetection/layout/capabilities"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/motionDetection/layout/capabilities"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            motionInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/motionDetection"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/motionDetection"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            motionLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/VMD-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            motionSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/motionDetections/VMD_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            videoTamperInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/tamperDetection"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/tamperDetection"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            videoTamperLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/tamper-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            videoTamperSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/tamperDetections/Tamperdetection_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            videoTamperRegion: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/tamperDetection/regions"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/tamperDetection/regions"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            tamperInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/privacyMask"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/privacyMask"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            tamperRegion: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/privacyMask/regions"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/privacyMask//regions"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            displayCap: {
                analog: {
                    url: "%s%s:%s/ISAPI/Image/channels/%s/capabilities"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/capabilities"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            displayScene: {
                url: "%s%s:%s/ISAPI/Image/channels/imageModes"
            },
            displayInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/Image/channels/%s"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            videoLossInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/videoLoss"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/videoLoss"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            videoLossLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/videoloss-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            videoLossSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/videolosses/Videoloss_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            alarmInputInfo: {
                analogIOAI: {
                    url: "%s%s:%s/ISAPI/System/IO/inputs/%s"
                },
                digitalIOAI: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/inputs/%s"
                },
                req: [PARAM_OPTION_IO],
                security1: ["userName", "password"]
            },
            alarmInputLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/IO-%s",
                req: [PARAM_OPTION_IO]
            },
            alarmInputSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/inputs/%s",
                req: [PARAM_OPTION_IO]
            },
            alarmOutputInfo: {
                analogIO: {
                    url: "%s%s:%s/ISAPI/System/IO/outputs/%s"
                },
                digitalIO: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/outputs/%s"
                },
                req: [PARAM_OPTION_IO],
                security1: ["userName", "password"]
            },
            alarmOutputSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/outputs/%s",
                req: [PARAM_OPTION_IO]
            },
            alarmOutputTrigger: {
                analogIO: {
                    url: "%s%s:%s/ISAPI/System/IO/outputs/%s/trigger"
                },
                digitalIO: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/outputs/%s/trigger"
                },
                req: [PARAM_OPTION_IO]
            },
            alarmOutputStatus: {
                analogIO: {
                    url: "%s%s:%s/ISAPI/System/IO/outputs/%s/status"
                },
                digitalIO: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/IOProxy/outputs/%s/status"
                },
                req: [PARAM_OPTION_IO]
            },
            audioDetectCap: {
                url: "%s%s:%s/ISAPI/Smart/AudioDetection/channels/%s/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            audioDetectInfo: {
                url: "%s%s:%s/ISAPI/Smart/AudioDetection/channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            audioDetectionStatus: {
                url: "%s%s:%s/ISAPI/Smart/AudioDetection/channels/%s/status",
                req: [PARAM_OPTION_CHANNEL]
            },
            audioDetectLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/audioexception-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            audioDetectSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/audioDetections/audioexception_%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            virtualFocus: {
                url: "%s%s:%s/ISAPI/Smart/DefocusDetection/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            virtualFocusLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/defocus-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            sceneChangeInfo: {
                url: "%s%s:%s/ISAPI/Smart/SceneChangeDetection/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            sceneChangeLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/scenechangedetection-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            sceneChangeSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/sceneChangeDetections/scenechangedetection_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceDetectCap: {
                url: "%s%s:%s/ISAPI/Smart/FaceDetect/%s/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceDetectInfo: {
                url: "%s%s:%s/ISAPI/Smart/FaceDetect/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceDetectLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/facedetection-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceDetectSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/faceDetections/facedetection_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceContrastCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceContrast/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceContrastInfo: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceContrast",
                req: [PARAM_OPTION_CHANNEL]
            },
            FDLibInfo: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib"
            },
            faceContrastSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/faceContrast/faceContrast-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceContrastLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/faceContrast-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            whiteFaceContrastSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/whiteListFaceContrast/whiteListFaceContrast-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            whiteFaceContrastLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/whiteListFaceContrast-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            networkCap: {
                url: "%s%s:%s/ISAPI/System/Network/capabilities"
            },
            networkBondCapa: {
                url: "%s%s:%s/ISAPI/System/Network/Bond/capabilities"
            },
            networkBond: {
                url: "%s%s:%s/ISAPI/System/Network/Bond/%s",
                req: [PARAM_OPTION_INTERFACE]
            },
            networkInterfaceCapa: {
                url: "%s%s:%s/ISAPI/System/Network/interfaces/capabilities"
            },
            networkInterface: {
                url: "%s%s:%s/ISAPI/System/Network/interfaces"
            },
            networkInterfacePut: {
                url: "%s%s:%s/ISAPI/System/Network/interfaces/%s",
                req: [PARAM_OPTION_INTERFACE]
            },
            PPPoEInfo: {
                url: "%s%s:%s/ISAPI/System/Network/PPPoE/1",
                security1: ["userName", "password"]
            },
            PPPoEStatus: {
                url: "%s%s:%s/ISAPI/System/Network/PPPoE/1/status"
            },
            ddnsCapa: {
                url: "%s%s:%s/ISAPI/System/Network/DDNS/capabilities",
                security1: ["userName", "password"]
            },
            ddnsInfo: {
                url: "%s%s:%s/ISAPI/System/Network/DDNS/1",
                security1: ["userName", "password"]
            },
            ddnsCountry: {
                url: "%s%s:%s/ISAPI/System/Network/DDNS/CountryID/capabilities"
            },
            email: {
                url: "%s%s:%s/ISAPI/System/Network/mailing",
                security1: ["accountName", "password"]
            },
            emailCap: {
                url: "%s%s:%s/ISAPI/System/Network/mailing/capabilities",
                security1: ["accountName", "password"]
            },
            snmp: {
                url: "%s%s:%s/ISAPI/System/Network/SNMP",
                security1: ["userName", "snmpAuthenticationPassword", "snmpPrivacyPassword"]
            },
            portCap: {
                url: "%s%s:%s/ISAPI/Security/adminAccesses/capabilities"
            },
            portInfo: {
                url: "%s%s:%s/ISAPI/Security/adminAccesses"
            },
            ftpCapa: {
                url: "%s%s:%s/ISAPI/System/Network/ftp/capabilities",
                security1: ["userName", "password"]
            },
            ftpEvent: {
                url: "%s%s:%s/ISAPI/Event/notification/ftp"
            },
            ftpInfo: {
                url: "%s%s:%s/ISAPI/System/Network/ftp",
                security1: ["userName", "password"]
            },
            upnp: {
                url: "%s%s:%s/ISAPI/System/Network/UPnP"
            },
            upnpStatus: {
                url: "%s%s:%s/ISAPI/System/Network/UPnP/ports/status"
            },
            alarmCenter: {
                url: "%s%s:%s/ISAPI/Event/notification/alarmCenter/1"
            },
            telnet: {
                url: "%s%s:%s/ISAPI/System/Network/telnetd"
            },
            cfg28181: {
                url: "%s%s:%s/ISAPI/System/Network/SIP",
                security1: ["userName", "password"]
            },
            sip28181: {
                url: "%s%s:%s/ISAPI/System/Network/SIP/1/SIPInfo"
            },
            pictureURlCertificate: {
                url: "%s%s:%s/ISAPI/Security/pictureURlCertificate?format=json"
            },
            dialstatus: {
                url: "%s%s:%s/ISAPI/System/Network/WirelessDial/Interfaces/1/dialstatus"
            },
            ehomeCap: {
                url: "%s%s:%s/ISAPI/System/Network/Ehome/capabilities"
            },
            ehome: {
                url: "%s%s:%s/ISAPI/System/Network/Ehome"
            },
            ezviz: {
                url: "%s%s:%s/ISAPI/System/Network/EZVIZ",
                security1: ["verificationCode"]
            },
            networkExtension: {
                url: "%s%s:%s/ISAPI/System/Network/extension"
            },
            certificate: {
                url: "%s%s:%s/ISAPI/Security/serverCertificate/certificate"
            },
            deleteCertificate: {
                url: "%s%s:%s/ISAPI/Security/serverCertificate/certificate"
            },
            createCertificate: {
                url: "%s%s:%s/ISAPI/Security/serverCertificate/selfSignCert",
                security1: ["passwd"]
            },
            certSignReq: {
                url: "%s%s:%s/ISAPI/Security/serverCertificate/certSignReq",
                security1: ["passwd"]
            },
            deleteCertSignReq: {
                url: "%s%s:%s/ISAPI/Security/serverCertificate/certSignReq"
            },
            netPreviewStrategy: {
                url: "%s%s:%s/ISAPI/System/Network/NetPreviewStrategy"
            },
            wifiInfo: {
                url: "%s%s:%s/ISAPI/System/Network/interfaces/2/wireless",
                security1: ["encryptionKey", "sharedKey"]
            },
            wpsCap: {
                url: "%s%s:%s/ISAPI/System/Network/WPS/capabilities"
            },
            wpsInfo: {
                url: "%s%s:%s/ISAPI/System/Network/WPS"
            },
            devicePinCode: {
                url: "%s%s:%s/ISAPI/System/Network/interfaces/2/WPS/devicePinCode"
            },
            generatePinCode: {
                url: "%s%s:%s/ISAPI/System/Network/interfaces/2/WPS/devicePinCodeUpdate"
            },
            autoConnect: {
                url: "%s%s:%s/ISAPI/System/Network/WPS/AutoConnect"
            },
            manualConnect: {
                url: "%s%s:%s/ISAPI/System/Network/interfaces/2/WPS/ApPinCode"
            },
            wlanapCap: {
                url: "%s%s:%s/ISAPI/System/Network/wirelessServer/capabilities",
                security1: ["encryptionKey", "sharedKey"]
            },
            wlanap: {
                url: "%s%s:%s/ISAPI/System/Network/wirelessServer",
                security1: ["encryptionKey", "sharedKey"]
            },
            wlanRegionCap: {
                url: "%s%s:%s/ISAPI/System/Network/wirelessServer/RegionCapabilities"
            },
            wlanapList: {
                url: "%s%s:%s/ISAPI/System/Network/interfaces/2/wirelessServer/accessDeviceList"
            },
            wanList: {
                url: "%s%s:%s/ISAPI/System/Network/WAN"
            },
            wanCapa: {
                url: "%s%s:%s/ISAPI/System/Network/WAN/%s/capabilities",
                req: [PARAM_OPTION_WANNUM]
            },
            wanInfo: {
                url: "%s%s:%s/ISAPI/System/Network/WAN/%s",
                req: [PARAM_OPTION_WANNUM]
            },
            testFtp: {
                url: "%s%s:%s/ISAPI/System/Network/ftp/test",
                security1: ["userName", "password"]
            },
            testEmail: {
                url: "%s%s:%s/ISAPI/System/Network/mailing/test",
                security1: ["accountName", "password"]
            },
            storage: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage"
            },
            deletehdd: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/delete",
                req: [PARAM_OPTION_DISK]
            },
            startSmartTest: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/SMARTTest/start",
                req: [PARAM_OPTION_DISK]
            },
            smartTestInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/SMARTTest/config"
            },
            smartStatus: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/SMARTTest/status",
                req: [PARAM_OPTION_DISK]
            },
            startHddTest: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/start",
                req: [PARAM_OPTION_DISK]
            },
            hddTestPause: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/pause",
                req: [PARAM_OPTION_DISK]
            },
            hddTestResume: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/resume",
                req: [PARAM_OPTION_DISK]
            },
            stopHddTest: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/Stop",
                req: [PARAM_OPTION_DISK]
            },
            hddTestStatus: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/BadSectorsTest/status",
                req: [PARAM_OPTION_DISK]
            },
            hddCapa: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/capabilities"
            },
            hddProperty: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s",
                req: [PARAM_OPTION_DISK]
            },
            nasProperty: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas/%s",
                req: [PARAM_OPTION_DISK],
                security1: ["userName", "password"]
            },
            nasInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas",
                security1: ["userName", "password"]
            },
            nasSeach: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas/search"
            },
            formatHdd: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/format",
                req: [PARAM_OPTION_DISK]
            },
            formatNas: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas/%s/format",
                req: [PARAM_OPTION_DISK]
            },
            formatHddStatus: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/hdd/%s/formatStatus",
                req: [PARAM_OPTION_DISK]
            },
            formatNasStatus: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/nas/%s/formatStatus",
                req: [PARAM_OPTION_DISK]
            },
            storageExt: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/extension"
            },
            ptzCtrlCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/capabilities"
            },
            ptzChannelCap: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/capabilities"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/capabilities"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            ptzChannelInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            patrolCap: {
                url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols",
                req: [PARAM_OPTION_CHANNEL]
            },
            patrolInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols/%s"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patrols/%s"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATROL]
            },
            patrolStart: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols/%s/start"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patrols/%s/start"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATROL]
            },
            patrolStop: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols/%s/stop"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patrols/%s/stop"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATROL]
            },
            deletePatrol: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patrols/%s"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patrols/%s"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATROL]
            },
            patternInfo: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            patternRecordStart: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s/recordstart"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s/recordstart"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            patternRecordStop: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s/recordstop"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s/recordstop"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            patternStart: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s/start"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s/start"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            patternStop: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s/stop"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s/stop"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            deletePattern: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/patterns/%s"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/patterns/%s"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PATTERN]
            },
            oneKeyFocus: {
                url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/onepushfoucs/start",
                req: [PARAM_OPTION_CHANNEL]
            },
            initCamera: {
                url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/onepushfoucs/reset",
                req: [PARAM_OPTION_CHANNEL]
            },
            ptzFocus: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/focus"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/focus"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            ptzIris: {
                analog: {
                    url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/iris"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/%s/video/iris"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            setMenu: {
                analog: {
                    url: "%s%s:%s/ISAPI/Image/channels/%s/menu"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/menu"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            ptzControl: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/continuous"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/continuous"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            ptzAutoControl: {
                ipdome: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/1/presets/%s/goto"
                },
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/autoPan"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/autoPan"
                },
                req: [PARAM_OPTION_CHANNEL]
            },
            setPreset: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PRESET]
            },
            goPreset: {
                analog: {
                    url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto"
                },
                digital: {
                    url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s/goto"
                },
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_PRESET]
            },
            position3D: {
                url: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/position3D",
                req: [PARAM_OPTION_CHANNEL]
            },
            monthRecordSearch: {
                url: "%s%s:%s/ISAPI/ContentMgmt/record/tracks/%s/dailyDistribution",
                req: [PARAM_OPTION_CHANNEL]
            },
            recordSearch: {
                url: "%s%s:%s/ISAPI/ContentMgmt/search"
            },
            recordSmartSearch: {
                url: "%s%s:%s/ISAPI/ContentMgmt/SmartSearch"
            },
            startPlayback: {
                url: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s"
            },
            startDownloadRecord: {
                url: "%s%s:%s/ISAPI/ContentMgmt/download"
            },
            restart: {
                url: "%s%s:%s/ISAPI/System/reboot"
            },
            restore: {
                url: "%s%s:%s/ISAPI/System/factoryReset?mode=%s",
                req: [PARAM_OPTION_MODE]
            },
            startVoiceTalk: {
                open: {
                    url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/open"
                },
                close: {
                    url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/close"
                },
                audioData: {
                    url: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/audioData"
                }
            },
            startRealPlay: {
                channels: {
                    url: "%s%s:%s/PSIA/streaming/channels/%s"
                },
                zeroChannels: {
                    url: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"
                }
            },
            upgradeFlag: {
                url: "%s%s:%s/ISAPI/System/upgradeFlag"
            },
            startUpgrade: {
                upgrade: {
                    url: "%s%s:%s/ISAPI/System/updateFirmware"
                },
                status: {
                    url: "%s%s:%s/ISAPI/System/upgradeStatus"
                }
            },
            onlineUpgradeCapa: {
                url: "%s%s:%s/ISAPI/System/onlineUpgrade/capabilities"
            },
            onlineServerStatus: {
                url: "%s%s:%s/ISAPI/System/onlineUpgrade/server"
            },
            onlineNewVersion: {
                url: "%s%s:%s/ISAPI/System/onlineUpgrade/version?check=%s",
                req: [PARAM_OPTION_CUSTOM]
            },
            onlineUpgrade: {
                url: "%s%s:%s/ISAPI/System/onlineUpgrade/upgrade"
            },
            onlineUpgradeStatus: {
                url: "%s%s:%s/ISAPI/System/onlineUpgrade/status"
            },
            deviceConfig: {
                url: "%s%s:%s/ISAPI/System/configurationData"
            },
            timeInfo: {
                url: "%s%s:%s/ISAPI/System/time"
            },
            ntpServerCapa: {
                url: "%s%s:%s/ISAPI/System/time/ntpServers/capabilities"
            },
            ntpServerInfo: {
                url: "%s%s:%s/ISAPI/System/time/ntpServers/1"
            },
            rs232Capa: {
                url: "%s%s:%s/ISAPI/System/Serial/ports/1/capabilities"
            },
            rs232Info: {
                url: "%s%s:%s/ISAPI/System/Serial/ports/1"
            },
            menuOutputCapa: {
                url: "%s%s:%s/ISAPI/System/Video/outputs/channels/%s/capabilities",
                req: [PARAM_OPTION_OUTPUT]
            },
            menuOutput: {
                url: "%s%s:%s/ISAPI/System/Video/outputs/channels"
            },
            menuOutputMode: {
                url: "%s%s:%s/ISAPI/System/Video/Menu/1"
            },
            logSearch: {
                url: "%s%s:%s/ISAPI/ContentMgmt/logSearch"
            },
            service: {
                url: "%s%s:%s/ISAPI/System/Hardware"
            },
            softwareServiceCapa: {
                url: "%s%s:%s/ISAPI/Security/previewLinkNum/capabilities"
            },
            softwareService: {
                url: "%s%s:%s/ISAPI/Security/previewLinkNum"
            },
            rtspAuth: {
                url: "%s%s:%s/ISAPI/Streaming/channels/101"
            },
            webAuth: {
                url: "%s%s:%s/ISAPI/Security/webCertificate"
            },
            rtspAuthCap: {
                url: "%s%s:%s/ISAPI/Security/RTSPCertificate/capabilities"
            },
            rtspAuthInfo: {
                url: "%s%s:%s/ISAPI/Security/RTSPCertificate"
            },
            telnetService: {
                url: "%s%s:%s/ISAPI/System/Network/telnetd"
            },
            sshService: {
                url: "%s%s:%s/ISAPI/System/Network/ssh"
            },
            ipFilter: {
                url: "%s%s:%s/ISAPI/System/Network/ipFilter"
            },
            userPermission: {
                url: "%s%s:%s/ISAPI/Security/UserPermission/%s",
                req: [PARAM_OPTION_USER]
            },
            user: {
                url: "%s%s:%s/ISAPI/Security/users",
                security1: ["userName", "password", "loginPassword"]
            },
            userModify: {
                url: "%s%s:%s/ISAPI/Security/users/%s",
                req: [PARAM_OPTION_USER],
                security1: ["userName", "password", "loginPassword"]
            },
            userDelete: {
                url: "%s%s:%s/ISAPI/Security/users/%s",
                req: [PARAM_OPTION_USER],
                security1: []
            },
            userSyncIPCPassword: {
                url: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/syncIPCPasswd"
            },
            lockPTZ: {
                url: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/lockPTZ",
                req: [PARAM_OPTION_CHANNEL]
            },
            lockPTZIntelligent: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/lockPtz",
                req: [PARAM_OPTION_CHANNEL]
            },
            fieldDetectionCapa: {
                url: "%s%s:%s/ISAPI/Smart/%s/%s/capabilities",
                req: [PARAM_OPTION_SMART, PARAM_OPTION_CHANNEL]
            },
            fieldDetection: {
                url: "%s%s:%s/ISAPI/Smart/%s/%s",
                req: [PARAM_OPTION_SMART, PARAM_OPTION_CHANNEL]
            },
            fieldDetectionRegion: {
                url: "%s%s:%s/ISAPI/Smart/%s/%s/regions/%s",
                req: [PARAM_OPTION_SMART, PARAM_OPTION_CHANNEL, PARAM_OPTION_REGION]
            },
            fieldDetectionLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/%s",
                req: [PARAM_OPTION_LINK]
            },
            fieldDetectionSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/%s",
                req: [PARAM_OPTION_SCHEDULE]
            },
            lineDetectionCapa: {
                url: "%s%s:%s/ISAPI/Smart/LineDetection/%s/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            lineDetection: {
                url: "%s%s:%s/ISAPI/Smart/LineDetection/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            lineDetectionItem: {
                url: "%s%s:%s/ISAPI/Smart/LineDetection/%s/lineItem/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_LINE]
            },
            lineDetectionLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/linedetection-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            lineDetectionSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/lineDetections/linedetection_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            roadDetectionCap: {
                url: "%s%s:%s/ISAPI/ITC/capability"
            },
            VCADeviceCap: {
                url: "%s%s:%s/ISAPI/Intelligent/Capabilities"
            },
            VCAChannelsList: {
                url: "%s%s:%s/ISAPI/Intelligent/intelliChannelList"
            },
            VCAIntelliResource: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliType",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliScenes: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliTrace",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliLibVer: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliResource",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliOverlayCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliResource/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliShield: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/Shield",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliShieldByType: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/Shield/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_MODE]
            },
            VCAIntelliTrack: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/zoomRatio",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliFaceRuleCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceRule/Capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliFaceRule: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceRule",
                req: [PARAM_OPTION_CHANNEL]
            },
            delVCAIntelliScene: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliTrace/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliSceneParam: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/intelliTrace/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliSaveSceneLocation: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/scenePtz/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliGotoSceneLocation: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/scenePtz/%s/goto",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliPTZLimit: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/PTZLimited/%s/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE, PARAM_OPTION_DERECTION]
            },
            VCAIntelliGotoPTZLimit: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/PTZLimited/%s/%s/goto",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE, PARAM_OPTION_DERECTION]
            },
            VCAIntelliSceneRule: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/behaviorRule/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliSceneCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/behaviorRule/%s/rule/capabilities",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliCalibration: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/calibration",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliCalibrationVerify: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/calibration/verify",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliAdvanceParam: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/AlgParam",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliAdvanceCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/AlgParam/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliRestartLib: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/restoreBehaviorLib",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliRestoreLib: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/restoreAlgParam",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAIntelliSceneSchedule: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/behaviorRule/%s/schedules",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            VCAIntelliSceneLinkage: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/behaviorRule/%s/notifications",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            RacmCapa: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Capabilities"
            },
            DownLoadTypeCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/download/capabilities"
            },
            vehicleDetect: {
                url: "%s%s:%s/ISAPI/Traffic/channels/%s/vehicleDetect",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleDetectScene: {
                url: "%s%s:%s/ISAPI/Traffic/channels/%s/vehicleDetect/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            vehicleDetectCap: {
                url: "%s%s:%s/ISAPI/Traffic/capabilities"
            },
            vehicleSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/vehicledetects/vehicledetection-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleLinkage: {
                url: "%s%s:%s/ISAPI/Event/triggers/vehicledetection-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleBlackSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/blackList/blackList-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleBlackLinkage: {
                url: "%s%s:%s/ISAPI/Event/triggers/blackList-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleWhiteSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/whiteList/whiteList-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehicleWhiteLinkage: {
                url: "%s%s:%s/ISAPI/Event/triggers/whiteList-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            triggerCap: {
                url: "%s%s:%s/ISAPI/Event/triggersCap"
            },
            cloudStorage: {
                url: "%s%s:%s/ISAPI/ContentMgmt/channels/%s/cloudStorage/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_CLOUD],
                security1: ["userName", "password", "accessKey", "secretKey"]
            },
            cloudStorageCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/channels/1/cloudStorage/1/capabilities",
                security1: ["userName", "password"]
            },
            cloudStorageTest: {
                url: "%s%s:%s/ISAPI/ContentMgmt/channels/1/cloudStorage/test",
                security1: ["userName", "password", "accessKey", "secretKey"]
            },
            vehicleCamera: {
                url: "%s%s:%s/ISAPI/Traffic/channels/%s/cameraInfo",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehiclePicture: {
                url: "%s%s:%s/ISAPI/Traffic/channels/%s/picParam",
                req: [PARAM_OPTION_CHANNEL]
            },
            vehiclePictureCap: {
                url: "%s%s:%s/ISAPI/Traffic/channels/%s/picParam/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            workMode: {
                url: "%s%s:%s/ISAPI/ContentMgmt/workmode"
            },
            workModeCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/workmode/capabilities"
            },
            platformRestore: {
                url: "%s%s:%s/ISAPI/System/Network/MegaPlatform/PlatReset?mode=%s",
                req: [PARAM_OPTION_MODE]
            },
            platformVSB: {
                url: "%s%s:%s/ISAPI/System/Network/MegaPlatform/VSB"
            },
            platformNMS: {
                url: "%s%s:%s/ISAPI/System/Network/MegaPlatform/NetManagerAccess"
            },
            platformAccess: {
                url: "%s%s:%s/ISAPI/System/Network/MegaPlatform/PlatformAccess"
            },
            service28181Cap: {
                url: "%s%s:%s/ISAPI/System/Network/GB28181Service/capabilities"
            },
            service28181: {
                url: "%s%s:%s/ISAPI/System/Network/GB28181Service",
                security1: ["authPasswd"]
            },
            advertisingImport: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/import?filename=%s",
                req: [PARAM_OPTION_FILENAME]
            },
            advertisingImportStatus: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/importStatus"
            },
            advertisingFileList: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/fileList"
            },
            advertising: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Advertising"
            },
            advertisingCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/capabilities"
            },
            advertisingSchedule: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Advertising/schedule"
            },
            zeroEnLarge: {
                url: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels/%s/enlarge",
                req: [PARAM_OPTION_CHANNEL]
            },
            thirdCloudStorageCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloud/capabilities"
            },
            thirdCloudStorageInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloud"
            },
            thirdCloudUploadCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloud/channels/%s/uploadStrategy/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            thirdCloudUploadInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloud/channels/%s/uploadStrategy",
                req: [PARAM_OPTION_CHANNEL]
            },
            thirdCloudUrl: {
                url: "%s%s:%s/ISAPI/ContentMgmt/Storage/cloud/URL?type=%s",
                req: [PARAM_OPTION_MODE]
            },
            DualVCACap: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s/dualVCA",
                req: [PARAM_OPTION_CHANNEL]
            },
            regCropCap: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/regionClip/capabilities",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            regCropInfo: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/regionClip",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            vgaConfigCap: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/VGAConfig/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            vgaConfigInfo: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/VGAConfig",
                req: [PARAM_OPTION_CHANNEL]
            },
            activeMulticastCap: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/activeMulticast/capabilities",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            activeMulticastInfo: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/activeMulticast",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            rtmpCap: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/RTMPCfg/capabilities",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            rtmpInfo: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s%s/RTMPCfg",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            fireDetectionCap: {
                url: "%s%s:%s/ISAPI/Thermal/channels/%s/fireDetection/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            fireDetectionInfo: {
                url: "%s%s:%s/ISAPI/Thermal/channels/%s/fireDetection",
                req: [PARAM_OPTION_CHANNEL]
            },
            fireDetectionLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/fireDetection-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            atmCap: {
                url: "%s%s:%s/ISAPI/ContentMgmt/ATM/capabilities"
            },
            atmInfo: {
                url: "%s%s:%s/ISAPI/ContentMgmt/ATM/channels/1"
            },
            webPing: {
                url: "%s%s:%s/%s",
                req: [PARAM_OPTION_URL]
            },
            requestKeyFrame: {
                url: "%s%s:%s/ISAPI/Streaming/channels/%s0%s/requestKeyFrame",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_STREAM]
            },
            faceCaptrueSearch: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceCaptureStatistics/search",
                req: [PARAM_OPTION_CHANNEL]
            },
            heatMapCap: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/heatMap/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            heatMap: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/heatMap",
                req: [PARAM_OPTION_CHANNEL]
            },
            heatMapRegion: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/heatMap/regions/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_REGION]
            },
            heatMapLinkage: {
                url: "%s%s:%s/ISAPI/Event/triggers/heatMap-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            heatMapSchdule: {
                url: "%s%s:%s/ISAPI/Event/schedules/heatMaps/heatmap_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            heatMapSearch: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/heatMap/search",
                req: [PARAM_OPTION_CHANNEL]
            },
            heatMapPicInfo: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/heatMap/pictureInfo",
                req: [PARAM_OPTION_CHANNEL]
            },
            countingCap: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/counting/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            counting: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/counting",
                req: [PARAM_OPTION_CHANNEL]
            },
            countingLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/counting-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            countingSchdule: {
                url: "%s%s:%s/ISAPI/Event/schedules/countings/counting_video%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            countingSearch: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/counting/search",
                req: [PARAM_OPTION_CHANNEL]
            },
            resetCount: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/counting/resetCount",
                req: [PARAM_OPTION_CHANNEL]
            },
            clearFlashCouting: {
                url: "%s%s:%s/ISAPI/ContentMgmt/FlashStorage/remove/channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            recommendDemaWidth: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/counting/RecommendValue",
                req: [PARAM_OPTION_CHANNEL]
            },
            mutexFnErrorMsg: {
                url: "%s%s:%s/ISAPI/System/mutexFunctionErrorMsg"
            },
            onlineUser: {
                url: "%s%s:%s/ISAPI/Security/onlineUser"
            },
            uerRepairCap: {
                url: "%s%s:%s/ISAPI/System/repair/report/capabilities"
            },
            uerRepair: {
                url: "%s%s:%s/ISAPI/System/repair/report"
            },
            repairsCap: {
                url: "%s%s:%s/ISAPI/System/repair/maintain/capabilities"
            },
            repairs: {
                url: "%s%s:%s/ISAPI/System/repair/maintain"
            },
            testMaintainCap: {
                url: "%s%s:%s/ISAPI/System/repair/test/capabilities"
            },
            testMaintain: {
                url: "%s%s:%s/ISAPI/System/repair/test"
            },
            acceptManage: {
                url: "%s%s:%s/ISAPI/System/repair/check"
            },
            basicCfgCap: {
                url: "%s%s:%s/ISAPI/System/repair/generalset/capabilities"
            },
            basicCfg: {
                url: "%s%s:%s/ISAPI/System/repair/generalset"
            },
            alarmPicCap: {
                url: "%s%s:%s/ISAPI/System/repair/generalset/alarmpic/capabilities"
            },
            alarmPic: {
                url: "%s%s:%s/ISAPI/System/repair/generalset/alarmpic"
            },
            dailyPic: {
                url: "%s%s:%s/ISAPI/System/repair/generalset/dailypic"
            },
            generalConnect: {
                url: "%s%s:%s/ISAPI/System/repair/generalset/connect"
            },
            devMaintenanceCap: {
                url: "%s%s:%s/ISAPI/System/repair/capabilities"
            },
            defaultAlarmPic: {
                url: "%s%s:%s/ISAPI/System/repair/generalset/alarmpic/default"
            },
            defaultDailyPic: {
                url: "%s%s:%s/ISAPI/System/repair/generalset/dailypic/default"
            },
            defaultBasicCfg: {
                url: "%s%s:%s/ISAPI/System/repair/generalset/default"
            },
            VCAHumanRecognition: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/humanRecognition",
                req: [PARAM_OPTION_CHANNEL]
            },
            VCAHumanRecognitionCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/humanRecognition/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            humanDetectInfo: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/humanRecognition",
                req: [PARAM_OPTION_CHANNEL]
            },
            humanDetectSceneRegion: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/humanRecognition/regions",
                req: [PARAM_OPTION_CHANNEL]
            },
            humanDetectSceneRegionItem: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/humanRecognition/regions/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            algorithmsVersion: {
                url: "%s%s:%s/ISAPI/System/algorithmsVersion"
            },
            discardFalseAlarmCap: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/motionDetection/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            diagnoseStatusConfCap: {
                url: "%s%s:%s/ISAPI/System/diagnosedData/capabilities"
            },
            diagnoseStatusConf: {
                url: "%s%s:%s/ISAPI/System/diagnosedData/parameter"
            },
            diagnoseData: {
                url: "%s%s:%s/ISAPI/System/diagnosedData"
            },
            diagnoseStatus: {
                url: "%s%s:%s/ISAPI/System/diagnosedData/exportStatus"
            },
            faceSnapLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/faceSnap-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceSnapSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/faceSnap/faceSnap-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            analysisUnitSwitch: {
                url: "%s%s:%s/ISAPI/Smart/analysisUnitSwitch/channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            analysisUnitEventSwitch: {
                url: "%s%s:%s/ISAPI/Smart/analysisUnitSwitch/channels/%s/event/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_EVENT]
            },
            analysisUnitSwitchCap: {
                url: "%s%s:%s/ISAPI/Smart/analysisUnitSwitch/channels/%s/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            smdCalibrations: {
                url: "%s%s:%s/ISAPI/Smart/channels/%s/calibrations/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SMART]
            },
            eventChannelsCap: {
                url: "%s%s:%s/ISAPI/Event/channels/%s/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceCaptrueCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceCaptureStatistics/search/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceContrast: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceContrast",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceContrastSearch: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/FCSearch",
                security1: ["name", "value", "certificateType", "certificateNumber", "snapPicURL", "facePicURL", "FDname"]
            },
            faceDataLibraryCfgCap: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/capabilities",
                security1: ["name", "value", "certificateType", "certificateNumber"]
            },
            faceDataLibraryCfg: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib",
                security1: ["name", "customInfo"]
            },
            faceDataLibraryCfgModify: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib",
                security1: ["name", "customInfo"]
            },
            faceDataLibraryCfgDelete: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/%s",
                req: [PARAM_OPTION_FACELIBRARY]
            },
            faceDataLibrarySearch: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/FDSearch",
                security1: ["name", "value", "certificateType", "certificateNumber", "picURL"]
            },
            faceDataLibraryFaceData: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/%s/picture/%s",
                req: [PARAM_OPTION_FACELIBRARY, PARAM_OPTION_FACEDATA],
                security1: ["name", "value", "certificateType", "certificateNumber", "picURL"]
            },
            faceDataLibraryFaceDataDelete: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/%s/picture/%s",
                req: [PARAM_OPTION_FACELIBRARY, PARAM_OPTION_FACEDATA]
            },
            manualModelingRange: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/manualModelingRangeTask"
            },
            manualModeling: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/manualModeling?range=%s&FDID=%s",
                req: [PARAM_OPTION_FACEMODELRANGE, PARAM_OPTION_FACELIBRARY]
            },
            modelingStatus: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/modelingStatus?status=%s",
                req: [PARAM_OPTION_FACEMODELSTATU],
                security1: ["name"]
            },
            cameraInfoCap: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/cameraInfo/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            cameraInfo: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/cameraInfo",
                req: [PARAM_OPTION_CHANNEL]
            },
            picInfoOverlapCap: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/picInfoOverlap/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            picInfoOverlap: {
                url: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/picInfoOverlap",
                req: [PARAM_OPTION_CHANNEL]
            },
            personInfoExtendCap: {
                url: "%s%s:%s/ISAPI/Intelligent/faceContrast/personInfoExtend/capabilities",
                security1: ["name", "value"]
            },
            personInfoExtend: {
                url: "%s%s:%s/ISAPI/Intelligent/faceContrast/personInfoExtend",
                security1: ["name", "value"]
            },
            personJamsCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/personJams/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            personJams: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/personJams",
                req: [PARAM_OPTION_CHANNEL]
            },
            manualModelingProgress: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/manualModeling/progressState?taskID=%s",
                req: [PARAM_OPTION_TASKID]
            },
            faceDataLibraryCapacity: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/%s/picture/surplusCapacity",
                req: [PARAM_OPTION_FACELIBRARY]
            },
            faceDataLibraryPicture: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/%s/picture%s",
                req: [PARAM_OPTION_FACELIBRARY, PARAM_OPTION_PARAMS]
            },
            faceDataUploadPicture: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/pictureUpload",
                req: [PARAM_OPTION_FACELIBRARY, PARAM_OPTION_PARAMS]
            },
            faceLibTags: {
                url: "%s%s:%s/ISAPI/Intelligent/faceContrast/personInfoExtend/FDID/%s",
                req: [PARAM_OPTION_FACELIBRARY]
            },
            faceLibImportExistPic: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/%s/importFrom/FDLibSource",
                req: [PARAM_OPTION_FACELIBRARY]
            },
            platformFilterCap: {
                url: "%s%s:%s/ISAPI/System/Network/platformAccessFilter/capabilities"
            },
            platformFilter: {
                url: "%s%s:%s/ISAPI/System/Network/platformAccessFilter/%s",
                req: [PARAM_OPTION_MODE]
            },
            integrateProtocol: {
                url: "%s%s:%s/ISAPI/System/Network/Integrate"
            },
            integrateProtocolCap: {
                url: "%s%s:%s/ISAPI/System/Network/Integrate/capabilities"
            },
            integrateGenetec: {
                url: "%s%s:%s/ISAPI/System/Network/Integrate/genetec"
            },
            onvifUsers: {
                url: "%s%s:%s/ISAPI/Security/ONVIF/users",
                security1: ["userName", "password"]
            },
            onvifUsersCap: {
                url: "%s%s:%s/ISAPI/Security/ONVIF/users/capabilities"
            },
            onvifUserModify: {
                url: "%s%s:%s/ISAPI/Security/ONVIF/users/%s",
                req: [PARAM_OPTION_USER],
                security1: ["userName", "password"]
            },
            deleteONVIFUser: {
                url: "%s%s:%s/ISAPI/Security/ONVIF/users/%s",
                req: [PARAM_OPTION_USER]
            },
            portEnable: {
                url: "%s%s:%s/ISAPI/Security/adminAccesses"
            },
            discoveryModeCap: {
                url: "%s%s:%s/ISAPI/System/discoveryMode/capabilities"
            },
            discoveryMode: {
                url: "%s%s:%s/ISAPI/System/discoveryMode"
            },
            verificationCodeCheck: {
                url: "%s%s:%s/ISAPI/System/Network/verificationCodeCheck"
            },
            customConfigCap: {
                url: "%s%s:%s/ISAPI/Custom/ParamConfiguration/capabilities"
            },
            customConfig: {
                url: "%s%s:%s/ISAPI/Custom/ParamConfiguration/%s",
                req: [PARAM_OPTION_CUSTOM],
                security1: ["username", "password"]
            },
            getPromptCap: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/prompt/capabilities?format=json",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceContrastPrompt: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/faceContrastPrompt/channels/%s?format=json",
                req: [PARAM_OPTION_CHANNEL]
            },
            whiteListFaceContrastPrompt: {
                url: "%s%s:%s/ISAPI/Intelligent/FDLib/whiteListFaceContrastPrompt/channels/%s?format=json",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceScoreCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceContrast/faceScore/capabilities?format=json",
                req: [PARAM_OPTION_CHANNEL]
            },
            faceScoreInfo: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/faceContrast/faceScore?format=json",
                req: [PARAM_OPTION_CHANNEL]
            },
            personDensitySearch: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/PersonDensityDetection/search",
                req: [PARAM_OPTION_CHANNEL]
            },
            personDensityDetectionInfo: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/PersonDensityDetection",
                req: [PARAM_OPTION_CHANNEL]
            },
            personDensityRegions: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/PersonDensityDetection/regions",
                req: [PARAM_OPTION_CHANNEL]
            },
            personDensityDetectionCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/PersonDensityDetection/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            personDensityDataUpload: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/personDensityDetection/analyzeDataUploadCtrl",
                req: [PARAM_OPTION_CHANNEL]
            },
            personDensityAdvanceCfg: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/personDensityDetection/advancedConfiguration",
                req: [PARAM_OPTION_CHANNEL]
            },
            personDensitySchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/personDensityDetection/personDensityDetection-%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            personDensityResult: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/PersonDensityDetection/result",
                req: [PARAM_OPTION_CHANNEL]
            },
            eventTriggerCap: {
                url: "%s%s:%s/ISAPI/Event/triggersCap"
            },
            HFPDCap: {
                url: "%s%s:%s/ISAPI/SDT/HFPD/capabilities?format=json"
            },
            HFPDInfo: {
                url: "%s%s:%s/ISAPI/SDT/HFPD?format=json"
            },
            HFPDContrastLink: {
                url: "%s%s:%s/ISAPI/Event/triggers/HFPD"
            },
            HFPDSchedule: {
                url: "%s%s:%s/ISAPI/Event/schedules/HFPD"
            },
            analysisEnginesInfo: {
                url: "%s%s:%s/ISAPI/Intelligent/analysisEngines"
            },
            oneAnalysisEngine: {
                url: "%s%s:%s/ISAPI/Intelligent/analysisEngines/%s",
                req: [PARAM_OPTION_ENGINE]
            },
            analysisEnginesCap: {
                url: "%s%s:%s/ISAPI/Intelligent/analysisEngines/capabilities"
            },
            structureAnalysisVideo: {
                url: "%s%s:%s/ISAPI/Intelligent/structureAnalysis/video"
            },
            structureAnalysisCap: {
                url: "%s%s:%s/ISAPI/Intelligent/structureAnalysis/capabilities"
            },
            structureAnalysisTasks: {
                url: "%s%s:%s/ISAPI/Intelligent/structureAnalysis/tasks"
            },
            analysisTaskChannel: {
                url: "%s%s:%s/ISAPI/Intelligent/structureAnalysis/tasks/channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            analysisTasksChannel: {
                url: "%s%s:%s/ISAPI/Intelligent/structureAnalysis/tasks/channels/%s/concurrentProcessing",
                req: [PARAM_OPTION_CHANNEL]
            },
            analysisDailyProgress: {
                url: "%s%s:%s/ISAPI/Intelligent/structureAnalysis/dailyProgress/channels/%s",
                req: [PARAM_OPTION_CHANNEL]
            },
            DiscardFalseAlarmCap: {
                url: "%s%s:%s/ISAPI/Intelligent/misinfoFilter/statisticalMode/capabilities?format=json"
            },
            DiscardFalseAlarm: {
                url: "%s%s:%s/ISAPI/Intelligent/misinfoFilter/statisticalMode?format=json"
            },
            safetyHelmetDetectionCap: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/safetyHelmetDetection/capabilities",
                req: [PARAM_OPTION_CHANNEL]
            },
            safetyHelmetDetectionInfo: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/safetyHelmetDetection",
                req: [PARAM_OPTION_CHANNEL]
            },
            safetyHelmetDetectionRegion: {
                url: "%s%s:%s/ISAPI/Intelligent/channels/%s/safetyHelmetDetection/regions/%s",
                req: [PARAM_OPTION_CHANNEL, PARAM_OPTION_SCENE]
            },
            outputsResourceInfo: {
                url: "%s%s:%s/ISAPI/System/Video/outputs/resource?format=json"
            },
            outputsResourceCap: {
                url: "%s%s:%s/ISAPI/System/Video/outputs/resource/capabilities?format=json"
            }
        }, this.findDeviceIndexByIP = function (e, t) {
            for (var n = 0; m_deviceSet.length > n; n++)
                if (m_deviceSet[n].m_szHostName == e) return n;
            return t !== void 0 && _callUserFun(HTTP_STATUS_401, null, t), -1
        }, this.getSecurityVersion = function (e, t) {
            return this.iSecurityVersion > 0 && (t = t ? t : _getAesIV(), e += "?security=" + this.iSecurityVersion + "&iv=" + t + "&key=" + this.szAESKey), e
        }, this.WSDK_DeviceLan = function (e, t, n, a) {
            var i = _FormatString(this.CGI.deviceLan.url, 2 == t ? "https://" : "http://", e, n),
                o = {
                    type: "GET",
                    url: i,
                    success: null,
                    error: null
                };
            $.extend(o, a), $.extend(o, {
                success: function (e, t) {
                    "function" == typeof a.success && a.success(e, t)
                },
                error: function (e, t) {
                    "function" == typeof a.error && a.error(e, t)
                }
            }), _submitRequest(i, o)
        }, this.WSDK_Request = function (e, t, n, a) {
            var i = _FormatString(this.CGI[a.cmd].url, 2 == t ? "https://" : "http://", e, n),
                o = {
                    type: "GET",
                    url: i,
                    success: null,
                    error: null
                };
            $.extend(o, a), $.extend(o, {
                success: function (e, t, n) {
                    "function" == typeof a.success && a.success(e, t, n)
                },
                error: function (e, t, n) {
                    "function" == typeof a.error && a.error(e, t, n)
                }
            });
            return _submitRequest(i, o);
        }, this.WSDK_Login = function (e, t, n, a, i, o, r) {
            var s = this.findDeviceIndexByIP(e);
            if (-1 != s) return _PrintString("设备已经登录过"), void 0;
            var l = this.CGI.login.url,
                c = "GET";
            r.session && (l = this.CGI.sessionLogin.url, c = "POST");
            var u = _FormatString(l, 2 == t ? "https://" : "http://", e, n, o),
                d = {
                    type: c,
                    url: u,
                    username: a,
                    password: i,
                    success: null,
                    error: null
                };
            r.session && (d.username = "", d.password = ""), $.extend(d, r), $.extend(d, {
                success: function (o, s) {
                    if ("200" === $(s).find("statusValue").eq(0).text()) {
                        var l = new deviceInfoClass;
                        l.m_szHostName = e,
                        l.m_szHttpProtocol = 2 == t ? "https://" : "http://", 
                        l.iPort = n, 
                        l.szUserName = a, 
                        l.szPassword = i, 
                        l.szSessionId = _oUtils.nodeValue(s, "sessionID"), 
                        m_deviceSet.push(l), 
                        _getSecurityVersion(e, l.szUserName), 
                        l.szAESKey = _strToAESKey(l.szPassword, l.szUserName), 
                        _getChannelInfo(e), 
                        _getAlarmInputInfo(e), 
                        _getAlarmOutputInfo(e)
                    }
                    "function" == typeof r.success && r.success(o, s)
                },
                error: function (e, t) {
                    "function" == typeof r.error && r.error(e, t)
                }
            }), _submitRequest(u, d)
        }, this.WSDK_SetLoginInfo = function (e, t, n, a, i, o) {
            var r = this.findDeviceIndexByIP(e);
            if (-1 != r) return _PrintString("设备已经登录过"), m_deviceSet[r].m_szHttpProtocol = 2 == t ? "https://" : "http://", m_deviceSet[r].iPort = n, m_deviceSet[r].szUserName = a, m_deviceSet[r].szPassword = i, m_deviceSet[r].szSessionId = o.sessionId, m_deviceSet[r].szAESKey = _strToAESKey(m_deviceSet[r].szPassword, m_deviceSet[r].szUserName), void 0;
            var s = new deviceInfoClass;
            s.m_szHostName = e, s.m_szHttpProtocol = 2 == t ? "https://" : "http://", s.iPort = n, s.szUserName = a, s.szPassword = i, s.szSessionId = o.sessionId, m_deviceSet.push(s), _getSecurityVersion(e, s.szUserName), s.szAESKey = _strToAESKey(s.szPassword, s.szUserName), _getChannelInfo(e), _getAlarmInputInfo(e), _getAlarmOutputInfo(e)
        }, this.WSDK_GetDeviceConfig = function (e, t, n, a) {
            if (_checkCommond(t, a)) {
                var i = "GET";
                i = a.hasOwnProperty("type") ? a.type : _getHttpMethod("get", t), _submit(e, i, _getCmd(t), n, a)
            }
        }, this.WSDK_SetDeviceConfig = function (e, t, n, a) {
            if (_checkCommond(t, a)) {
                var i = "PUT";
                i = a.hasOwnProperty("type") ? a.type : _getHttpMethod("set", t), _submit(e, i, _getCmd(t), n, a)
            }
        }, this.WSDK_PTZControl = function (e, t, n, a, i, o) {
            a = 7 > a ? 15 * a : 100, i && (a = 0);
            var r = [{}, {
                    pan: 0,
                    tilt: a
                }, {
                    pan: 0,
                    tilt: -a
                }, {
                    pan: -a,
                    tilt: 0
                }, {
                    pan: a,
                    tilt: 0
                }, {
                    pan: -a,
                    tilt: a
                }, {
                    pan: -a,
                    tilt: -a
                }, {
                    pan: a,
                    tilt: a
                }, {
                    pan: a,
                    tilt: -a
                }, {
                    speed: -a
                }, {
                    speed: a
                }, {
                    speed: -a
                }, {
                    speed: a
                }, {
                    speed: -a
                }, {
                    speed: a
                }, {
                    speed: a
                }],
                s = null,
                l = "";
            switch (n) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    s = this.CGI.ptzControl, l = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + r[n].pan + "</pan>" + "<tilt>" + r[n].tilt + "</tilt>" + "</PTZData>";
                    break;
                case 9:
                case 10:
                    s = this.CGI.ptzControl, l = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + r[n].speed + "</zoom>" + "</PTZData>";
                    break;
                case 11:
                case 12:
                    s = this.CGI.ptzFocus, l = "<?xml version='1.0' encoding='UTF-8'?><FocusData><focus>" + r[n].speed + "</focus>" + "</FocusData>";
                    break;
                case 13:
                case 14:
                    s = this.CGI.ptzIris, l = "<?xml version='1.0' encoding='UTF-8'?><IrisData><iris>" + r[n].speed + "</iris>" + "</IrisData>";
                    break;
                case 15:
                    s = this.CGI.ptzAutoControl, l = "<?xml version='1.0' encoding='UTF-8'?><autoPanData><autoPan>" + r[n].speed + "</autoPan>" + "</autoPanData>";
                    break;
                default:
            }
            var c = "PUT",
                u = {
                    data: l
                };
            if ($.extend(u, o), null != s) {
                var d = {};
                d[PARAM_OPTION_CHANNEL] = t, _submit(e, c, s, d, u)
            } else _callUserFun(WSDK_ERROR_COMMOD, null, u)
        }, this.WSDK_checkVerificationCode = function (e) {
            var t = _getAesIV(),
                n = SHA256(t + e);
            e = _oBase64.encode(n);
            var a = "<?xml version='1.0' encoding='UTF-8'?>";
            return a += "<CheckInfo><randomString>" + t + "</randomString>", a += "<verificationCode>" + e + "</verificationCode>", a += "</CheckInfo>"
        };
        var _PrintString = function () {
                if (m_bDebug) {
                    var e = _FormatString(arguments);
                    console.log(e)
                }
            },
            _checkCommond = function (e, t) {
                return e in self.CGI ? !0 : (_callUserFun(WSDK_ERROR_COMMOD, null, t), !1)
            },
            _getHttpMethod = function (e, t) {
                var n = "GET";
                switch (e) {
                    case "get":
                        n = _gerGetMethod(t);
                        break;
                    case "set":
                        n = _gerSetMethod(t);
                        break;
                    default:
                }
                return n
            },
            _gerGetMethod = function (e) {
                var t = "GET";
                switch (e) {
                    case "monthRecordSearch":
                        t = "POST";
                        break;
                    case "recordSearch":
                        t = "POST";
                        break;
                    case "recordSmartSearch":
                        t = "POST";
                        break;
                    case "nasSeach":
                        t = "POST";
                        break;
                    case "logSearch":
                        t = "POST";
                        break;
                    case "testEmail":
                        t = "POST";
                        break;
                    case "testFtp":
                        t = "POST";
                        break;
                    case "countingSearch":
                        t = "POST";
                        break;
                    case "heatMapSearch":
                        t = "POST";
                        break;
                    case "faceCaptrueSearch":
                        t = "POST";
                        break;
                    case "heatMapPicInfo":
                        t = "POST";
                        break;
                    case "personDensitySearch":
                        t = "POST";
                        break;
                    case "faceContrastSearch":
                        t = "POST";
                        break;
                    case "faceDataLibrarySearch":
                        t = "POST";
                        break;
                    case "modelingStatus":
                        t = "POST";
                        break;
                    case "analysisDailyProgress":
                        t = "POST";
                        break;
                    default:
                }
                return t
            },
            _gerSetMethod = function (e) {
                var t = "PUT";
                switch (e) {
                    case "tamperRegion":
                        t = "DELETE";
                        break;
                    case "videoTamperRegion":
                        t = "DELETE";
                        break;
                    case "deleteCertificate":
                        t = "DELETE";
                        break;
                    case "deleteCertSignReq":
                        t = "DELETE";
                        break;
                    case "user":
                        t = "POST";
                        break;
                    case "userDelete":
                        t = "DELETE";
                        break;
                    case "addIpc":
                        t = "POST";
                        break;
                    case "deleteIpc":
                        t = "DELETE";
                        break;
                    case "delVCAIntelliScene":
                        t = "DELETE";
                        break;
                    case "deletePattern":
                        t = "DELETE";
                        break;
                    case "deletePatrol":
                        t = "DELETE";
                        break;
                    case "sourceCapability":
                        t = "POST";
                        break;
                    case "faceDataLibraryCfg":
                        t = "POST";
                        break;
                    case "faceDataLibraryCfgDelete":
                        t = "DELETE";
                        break;
                    case "faceDataLibraryFaceDataDelete":
                        t = "DELETE";
                        break;
                    case "manualModelingRange":
                        t = "POST";
                        break;
                    case "faceDataLibraryPicture":
                        t = "POST";
                        break;
                    case "verificationCodeCheck":
                        t = "POST";
                        break;
                    default:
                }
                return t
            },
            _getCmd = function (CommondString) {
                var oCommond;
                return eval("oCommond = self.CGI." + CommondString), oCommond
            },
            _FormatString = function () {
                for (var e = arguments[0], t = 1; arguments.length > t; t++) e = e.replace("%s", arguments[t]);
                return e
            },
            _submit = function () {
                var e = arguments[0],
                    t = arguments[1],
                    n = arguments[2],
                    a = arguments[3],
                    i = arguments[4],
                    o = self.findDeviceIndexByIP(e, i);
                if (-1 != o) {
                    if (n.req !== void 0)
                        for (var r = 0; n.req.length > r; r++)
                            if (!(n.req[r] in a)) return _callUserFun(WSDK_ERROR_PARAMNUM, null, i), void 0;
                    var s = m_deviceSet[o],
                        l = "";
                    "string" != typeof n.url ? "analog" in n ? l = parseInt(a[PARAM_OPTION_CHANNEL], 10) <= s.iAnalogChannelNum ? n.analog.url : n.digital.url : "analogIOAI" in n ? l = parseInt(a[PARAM_OPTION_IO], 10) <= s.iAnalogAlarmInputNum ? n.analogIOAI.url : n.digitalIOAI.url : "analogIO" in n && (l = parseInt(a[PARAM_OPTION_IO], 10) <= s.iAnalogAlarmOutputNum ? n.analogIO.url : n.digitalIO.url) : l = n.url;
                    var c = _FormatString(l, s.m_szHttpProtocol, s.m_szHostName, s.iPort);
                    if (n.req !== void 0)
                        for (var r = 0; n.req.length > r; r++) c = _FormatString(c, a[n.req[r]]);
                    var u = {
                        type: t,
                        username: s.szUserName,
                        password: s.szPassword,
                        sessionId: s.szSessionId,
                        cgi: n,
                        aesKey: s.szAESKey
                    };
                    $.extend(u, i);
                    var d = self.iSecurityVersion;
                    if (d > 0 && n["security" + d]) {
                        var m = _getAesIV();
                        c += "?security=" + d + "&iv=" + m, "DELETE" === t && -1 !== c.indexOf("users/") && self.oSecurityCap.bSptUserCheck && (c += "&loginPassword=" + _oUtils.encodeAES(_oBase64.encode(_oUtils.encodeString(u.loginPassword)), self.szAESKey, m))
                    }
                    _submitRequest(c, u)
                }
            },
            _submitRequest = function (e, t) {
                var n = new m_oTransMethord;
                n.submitRequest(e, t)
            },
            _getSecurityVersion = function (e, t) {
                _submit(e, "GET", self.CGI.securityCap, null, {
                    async: !1,
                    data: {
                        username: t
                    },
                    queryObject: !0,
                    processData: !0,
                    success: function (e, t) {
                        self.iKeyIterateNum = _oUtils.nodeValue(t, "keyIterateNum", "i");
                        var n = _oUtils.nodeAttr(t, "securityVersion", "opt");
                        if ("" != n) {
                            var a, i, o = n.split(",");
                            $.each(o, function () {
                                return a = parseInt("" + this, 10), a > self.iSecurityVersion ? !1 : (i = a, void 0)
                            }), i && (self.iSecurityVersion = i)
                        } else self.iSecurityVersion = 0;
                        self.iSecurityVersion && (self.oSecurityCap.bSptUserCheck = _oUtils.nodeValue(t, "isSupportUserCheck", "b")), self.oSecurityCap.bSptGuidExport = _oUtils.nodeValue(t, "isSupportGUIDFileDataExport", "b"), self.oSecurityCap.bSptQACfg = _oUtils.nodeValue(t, "isSupportSecurityQuestionConfig", "b"), self.oSecurityCap.bSptOnlineUser = _oUtils.nodeValue(t, "isSupportOnlineUser", "b") || _oUtils.nodeValue(t, "isSupportGetOnlineUserListSC", "b"), self.oSecurityCap.oIrreversibleEncrypt = {
                            bSupport: "true" === $(t).find("isIrreversible").text(),
                            salt: $(t).find("salt").text()
                        }, self.oSecurityCap.oDeviceParamFileEncrypt = {
                            bSupportImport: _oUtils.nodeValue(t, "isSupportConfigFileImport", "b"),
                            bSupportExport: _oUtils.nodeValue(t, "isSupportConfigFileExport", "b"),
                            iMaxEncrypt: _oUtils.nodeAttr(t, "cfgFileSecretKeyLenLimit", "max", "i") || 16,
                            iMinEncrypt: _oUtils.nodeAttr(t, "cfgFileSecretKeyLenLimit", "min", "i") || 1
                        }, self.oSecurityCap.oWebCap = {
                            aOptions: $(t).find("WebCertificateCap").length > 0 ? _oUtils.nodeAttr(t, "WebCertificateCap CertificateType", "opt").split(",") : ["basic", "digest"]
                        }, self.oSecurityCap.bSupportONVIFUser = _oUtils.nodeValue(t, "isSupportONVIFUserManagement", "b")
                    },
                    error: function () {
                        self.iSecurityVersion = 0
                    }
                })
            },
            _getChannelInfo = function (e) {
                var t = self.findDeviceIndexByIP(e);
                if (-1 != t) {
                    var n = m_deviceSet[t];
                    _submit(e, "GET", self.CGI.AnalogChannelInfo, null, {
                        async: !1,
                        success: function (e, t) {
                            n.iAnalogChannelNum = parseInt($(t).find("VideoInputChannel").length, 10)
                        }
                    })
                }
            },
            _getAlarmInputInfo = function (e) {
                var t = self.findDeviceIndexByIP(e);
                if (-1 != t) {
                    var n = m_deviceSet[t];
                    _submit(e, "GET", self.CGI.AnalogAlarmInputInfo, null, {
                        async: !1,
                        success: function (e, t) {
                            n.iAnalogAlarmInputNum = parseInt($(t).find("IOInputPort").length, 10)
                        }
                    })
                }
            },
            _getAlarmOutputInfo = function (e) {
                var t = self.findDeviceIndexByIP(e);
                if (-1 != t) {
                    var n = m_deviceSet[t];
                    _submit(e, "GET", self.CGI.AnalogAlarmOutputInfo, null, {
                        async: !1,
                        success: function (e, t) {
                            n.iAnalogAlarmOutputNum = parseInt($(t).find("IOOutputPort").length, 10)
                        }
                    })
                }
            },
            _callUserFun = function (e, t, n) {
                e != HTTP_STATUS_200 ? "function" == typeof n.error && n.error(e, t) : "function" == typeof n.success && n.success(e, t), "function" == typeof n.complete && n.complete(e, t)
            },
            _strToAESKey = function (e, t) {
                var n = "";
                if (self.iKeyIterateNum > 0) {
                    n = SHA256(getIrreversibleKey(e, t) + "AaBbCcDd1234!@#$");
                    for (var a = 1; self.iKeyIterateNum > a; a++) n = SHA256(n)
                }
                return self.szAESKey = n && n.substring(0, 32), self.szAESKey
            },
            getIrreversibleKey = function (e, t) {
                var n = e;
                if (self.oSecurityCap.oIrreversibleEncrypt.bSupport) {
                    var a = self.oSecurityCap.oIrreversibleEncrypt.salt;
                    return SHA256(t + a + e)
                }
                return n
            },
            _getAesIV = function () {
                return MD5("" + (new Date).getTime())
            },
            deviceInfoClass = function () {
                this.szIP = "", this.m_szHostName = "", this.szUserName = "", this.szPassword = "", this.szSessionId = "", this.m_szHttpProtocol = "http://", this.iPort = 80, this.szDeviceType = "", this.iAnalogChannelNum = 0, this.iDigitalChannelNum = 0, this.iAnalogAlarmInputNum = 0, this.iAnalogAlarmOutputNum = 0, this.szAESKey = ""
            },
            transClient = function () {
                this.options = {
                    timeout: 3e4,
                    data: null,
                    async: !0,
                    complete: null,
                    success: null,
                    error: null
                }
            };
        transClient.prototype.submitRequest = function () {}, transClient.prototype.processSuccessCB = function (e, t) {
            if (e && 4 == e.readyState) {
                var n = _oUtils.getResponseData(e);
                if (HTTP_STATUS_200 == e.status) {
                    if ("function" == typeof this.options.success) {
                        var a = self.iSecurityVersion,
                            i = this.options.cgi;
                        if (a > 0 && i) {
                            var o = n,
                                r = this.options.type,
                                s = this.options.aesKey,
                                l = i["security" + a];
                            if (l && ("GET" === r || "POST" === r))
                                for (var c, u, d = 0, m = l.length; m > d; d++) {
                                    c = $(o).find("" + l[d]);
                                    for (var p = 0, g = c.length; g > p; p++)
                                        if (u = $(c[p]).text(), u.length) {
                                            var h = t.substr(4 + t.indexOf("&iv="), 32),
                                                f = _oBase64.decode(_oUtils.decodeAES(u, s, h));
                                            $(c[p]).text(_oUtils.decodeString(f))
                                        }
                                }
                        }
                        this.options.success(HTTP_STATUS_200, n, e)
                    }
                } else "function" == typeof this.options.error && this.options.error(e.status, n, e)
            }
        }, transClient.prototype.processErrorCB = function (e, t) {
            4 == e.readyState ? "function" == typeof this.options.error && this.options.error(e.status, _oUtils.getResponseData(e), e) : ("timeout" == t || "error" == t) && "function" == typeof this.options.error && this.options.error(e.status, _oUtils.getResponseData(e), e)
        }, transClient.prototype.processCompleteCB = function (e) {
            "function" == typeof this.options.complete && this.options.complete(e.status, _oUtils.getResponseData(e), e)
        };
        transClient.prototype.processSuccessCBDfd = function (e, t) {
            const dfd = new $.Deferred();
            if (e && 4 == e.readyState) {
                var n = _oUtils.getResponseData(e);
                if (HTTP_STATUS_200 == e.status) {
                    var a = self.iSecurityVersion,
                        i = this.options.cgi;
                    if (a > 0 && i) {
                        var o = n,
                            r = this.options.type,
                            s = this.options.aesKey,
                            l = i["security" + a];
                        if (l && ("GET" === r || "POST" === r))
                            for (var c, u, d = 0, m = l.length; m > d; d++) {
                                c = $(o).find("" + l[d]);
                                for (var p = 0, g = c.length; g > p; p++)
                                    if (u = $(c[p]).text(), u.length) {
                                        var h = t.substr(4 + t.indexOf("&iv="), 32),
                                            f = _oBase64.decode(_oUtils.decodeAES(u, s, h));
                                        $(c[p]).text(_oUtils.decodeString(f))
                                    }
                            }
                    }
                    return dfd.resolve(HTTP_STATUS_200, n, e);
                } else {
                    return dfd.reject(e.status, n, e);
                }
            }
        }, transClient.prototype.processErrorCBDfd = function (e, t) {
            const dfd = new $.Deferred();
            if (4 == e.readyState || "timeout" == t || "error" == t) {
                return dfd.reject(e.status, _oUtils.getResponseData(e), e)
            }
        };
        var jqueryAjaxClient = function () {
            transClient.call(this)
        };
        jqueryAjaxClient.prototype = new transClient, 
        jqueryAjaxClient.prototype.submitRequest = function (e, t) {
            var n = this;
            $.extend(this.options, t);
            var a = this.options.data,
                i = null;
            i = "string" == typeof a ? a.indexOf("<?xml") > -1 ? _oUtils.parseXmlFromStr(a) : a : a && "object" == typeof a ? t.queryObject ? this.options.data : a.documentElement ? this.options.cgi && this.options.cgi.hasOwnProperty("security" + self.iSecurityVersion) ? _oUtils.parseXmlFromStr(_oUtils.xmlToStr(a)) : a : JSON.stringify(a) : a;
            var o = self.iSecurityVersion,
                r = this.options.cgi;
            if (o > 0 && r) {
                var s = this.options.type,
                    l = this.options.aesKey,
                    c = r["security" + o];
                if (c && -1 !== $.inArray(s, ["PUT", "POST"])) {
                    var u, d;
                    $.each(c, function () {
                        u = $(i).find("" + this), $.each(u, function () {
                            if (d = $(this).text(), "" != d) {
                                var t = e.substr(4 + e.indexOf("&iv="), 32),
                                    n = _oBase64.encode(_oUtils.encodeString(d));
                                $(this).text(_oUtils.encodeAES(n, l, t))
                            }
                        })
                    })
                }
            }
            var m = "", 
            p = "";
            this.options.sessionId ? $.cookie("WebSession", this.options.sessionId) : ($.cookie("WebSession", null), m = this.options.username, p = this.options.password);
            return $.ajax({
                type: this.options.type,
                beforeSend: function (e) {
                    e.setRequestHeader("If-Modified-Since", "0")
                },
                username: m,
                password: p,
                async: this.options.async,
                timeout: this.options.timeout,
                url: e,
                processData: !!this.options.processData,
                data: i,
                success: function (t, a, i) {
                    n.processSuccessCB(i, e)
                },
                error: function (e, t) {
                    n.processErrorCB(e, t)
                },
                complete: function (e) {
                    n.processCompleteCB(e)
                }
            })
            .then((t, a, i)=>{n.processSuccessCBDfd(i, e)}, (e, t)=>{n.processErrorCBDfd(e, t)})
            // .done("function" == typeof this.options.success ? this.options.success : null)
            // .fail("function" == typeof this.options.error ? this.options.error : null)
            // .always(e=>{n.processCompleteCB(e)})

//             $.ajax({url:'http://192.168.1.4/doc/page/login.aspx'})
// .then((a)=>{const kk=a.split('\n')[0];console.log(kk);return $.Deferred().resolve(kk)}, (b)=>{return $.Deferred().reject(b.status)})
// .done((a)=>{dfd = new $.Deferred();dfd.done(()=>{console.log(a)});setTimeout(()=>{dfd.resolve()},3000)})
// .fail((a)=>{console.log(456+" "+a)})
        }, m_oTransMethord = jqueryAjaxClient
    }
    var _oBase64 = require("../lib/base64"),
        _oUtils = require("../lib/utils");
    global.WebSDK = new WebSDK
});