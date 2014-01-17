'use strict';

/**
 * LocalStorage
 */
app.factory('LocalStorage',function(){
    return {
        check: function(){
            console.log("LocalStorage check")
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e){
                return false;
            }
        },

        get: function (key) {
            try {
                return localStorage.getItem(key);
            } catch (e){
                return "";
            }
        },

        /**
         * http://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
         */
        getAllKeys: function(){
            try {
                return Object.keys(localStorage);
            } catch (e) {
                return false;
            }
        },

        save: function (key, data) {
            try {
                localStorage.setItem(key, data);
                return true;
            } catch (e){
                return false;
            }
        },

        remove: function (key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e){
                return false;
            }
        },

        clearAll : function () {
            try {
                localStorage.clear();
                return true;
            } catch (e){
                return false;
            }
        }
    }
});

/**
 * LocalStorage Service
 */
app.factory('LocalStorageService',['LocalStorage',function(LocalStorage){
    var useable = false,
        useableCheck = false,
        ultimateKey = "MULTIKEY",
        ultimateValue = {};

    return {
        check: function(){
            if(useableCheck !== true){
                useable = LocalStorage.check();
                useableCheck = true;
            }

            return useable;
        },

        get: function (key) {
            if(useable !== false){
                return LocalStorage.getItem(key);
            }

            return "";
        },

        getAllKeys: function(){
            if(useable !== false){
                // http://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
                return LocalStorage.getAllKeys();
            }

            return [];
        },

        save: function (key, data) {
            if(useable !== false){
                LocalStorage.setItem(key, data);
                return true;
            }

            return false;
        },

        remove: function (key) {
            if(useable !== false){
                LocalStorage.removeItem(key);
                return true;
            }

            return false;
        },

        clearAll : function () {
            if(useable !== false){
                LocalStorage.clear();
                return true;
            }

            return false;
        }
    }
}]);