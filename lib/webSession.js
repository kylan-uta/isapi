define(function (require, exports, module) {
    function webSession() {
        // this._bSupportSession = "object" == typeof sessionStorage, this._bSupportSession || document.documentElement.addBehavior("#default#userdata")
    }
    webSession.prototype = {
        getItem: function (szAttr) {
            // with(this) {
            //     if (_bSupportSession) return sessionStorage.getItem(szAttr);
            //     with(document.documentElement) try {
            //         return load(szAttr), getAttribute("value")
            //     } catch (ex) {
            //         return null
            //     }
            // }
            return null;
        },
        setItem: function (szAttr, szVal) {
            // with(this) {
            //     if (_bSupportSession) return sessionStorage.setItem(szAttr, szVal);
            //     with(document.documentElement) try {
            //         return load(szAttr), setAttribute("value", szVal), save(szAttr), getAttribute("value")
            //     } catch (ex) {
            //         return null
            //     }
            // }
            return null;
        },
        removeItem: function (szAttr) {
            // with(this) if (_bSupportSession) sessionStorage.removeItem(szAttr);
            //     else with(document.documentElement) try {
            //         load(szAttr), expires = new Date(630892799e3).toUTCString(), save(szAttr)
            //     } catch (ex) {}
            return null;
        }
    }, module.exports = new webSession
});