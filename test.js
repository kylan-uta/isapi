require('amd-loader');
require('./isapi/websdk');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = window;
global.$ = require('jquery');
$.ajax = require('najax');
global.SHA256 = require('sha256');
global.MD5 = require('md5');
global.CryptoJS = require("crypto-js");

const common = require('./common');
const Utils = require('./lib/utils')
common.doLogin('admin','a12345678', 
    ()=>{
        console.log('登陆成功');
        // var l = ["FDID", "name", "thresholdValue", "customInfo", "faceLibType"];
        // WebSDK.WSDK_GetDeviceConfig('192.168.1.4','faceDataLibraryCfg',null,{success:(e,o)=>{
        // $(o).find("name").each((a,b)=>{console.log($(b).text())})
        // },
        WebSDK.WSDK_GetDeviceConfig('192.168.1.4', "faceDataLibrarySearch", {
            channel: 1
        }, {
            data: "<?xml version='1.0' encoding='utf-8'?><FDSearchDescription><FDID>C44E807B5725474EB21948D3D4F69E5A</FDID><searchID>C87D6FEF-7600-0001-2FAA-F800514C1424</searchID><maxResults>50</maxResults><searchResultPosition>0</searchResultPosition></FDSearchDescription>",
            success: console.log,
            error:console.log
        });
    }, 
(e)=>{console.log('登陆failed',e)});
