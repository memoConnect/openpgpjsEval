'use strict';

app.factory('LocalStorage',function(){
    function check(){
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch(e){
            return false;
        }
    }

    return {
        check: function(){
            return check();
        },

        get: function (key) {
            if(check() !== false){
                return localStorage.getItem(key);
            }

            return "";
        },

        getAllKeys: function(){
            if(check() !== false){
                // http://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
                return Object.keys(localStorage);
            }

            return [];
        },

        save: function (key, data) {
            if(check() !== false){
                    localStorage.setItem(key, JSON.stringify(data));
                return true;
            }

            return false;
        },

        remove: function (key) {
            if(check() !== false){
                localStorage.removeItem(key);
                return true;
            }

            return false;
        },

        clearAll : function () {
            if(check() !== false){
                localStorage.clear();
                return true;
            }

            return false;
        }
    }
});