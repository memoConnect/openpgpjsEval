'use strict';

var ctrl = angular.module('Controllers',[]);

ctrl.controller('GenerateCtrl',['$scope','LocalStorage',function($scope, LocalStorage){
    $scope.message = "";

    $scope.email = "";
    $scope.passphrase = "";

    $scope.keyType = 1;
    $scope.numBits = 2048;

    $scope.privKey = "";
    $scope.pubKey = "";


    $scope.generateKeyPair = function(){
        var data;

        clearKeys();

        if(LocalStorage.check() !== true){
            $scope.message = "LocalStorage not available!";
            return false;
        }

        if(checkBrowserRandomValues() !== true){
            $scope.message = "\"window.crypto.getRandomValues\" not available!";
            return false;
        }

        $scope.message = "Working in Progress.... ";

        try {
            var start = new Date().getTime();

            data = openpgp.generateKeyPair($scope.keyType,$scope.numBits,$scope.email,$scope.passphrase);

            var end = new Date().getTime() - start;

            if(data.privateKeyArmored != undefined ){
                $scope.privKey = data.privateKeyArmored;
            }

            if(data.publicKeyArmored != undefined){
                $scope.pubKey = data.publicKeyArmored;
            }

            LocalStorage.save("privKey",data.privateKeyArmored);
            LocalStorage.save("pubKey",data.publicKeyArmored);

            $scope.timer = end / 1000;
            $scope.message = "Finished in " + $scope.timer + "s";

        } catch (e){
           $scope.message = e;
        }

        return true;
    };

    $scope.load = function(){
        if(LocalStorage.check() !== true){
            $scope.message = "LocalStorage not available!";
            return false;
        }

        $scope.privKey  = LocalStorage.get("privKey");
        $scope.pubKey   = LocalStorage.get("pubKey");

        return true;
    };

    $scope.clearStorage = function(){
        clearKeys();
        LocalStorage.clearAll();
    };

    function checkBrowserRandomValues(){
        if(window.crypto.getRandomValues){
            return true;
        }

        return false;
    }

    function clearKeys (){
        $scope.privKey = "";
        $scope.pubKey = "";
    }
}]);

ctrl.controller('StorageCtrl',['$scope','LocalStorage',function($scope,LocalStorage){
    $scope.checkLocalStorageMessage = 'LocalStorage nicht verfügbar!';

    $scope.refreshKeys = function(){
        $scope.storageKeys = LocalStorage.getAllKeys();
    }

    $scope.checkStorage = function(){
        if(LocalStorage.check() !== false){
            $scope.checkLocalStorageMessage = 'LocalStorage ist verfügbar!';
            $scope.$broadcast('refreshKeys');
        }
    };

    $scope.isLocalStorage = function(){
        if(localStorage !== false){
            return true;
        }

        return false;
    }

    $scope.clearStorage = function(){
        localStorage.clearAll();
    }

    $scope.$on('refreshKeys', $scope.refreshKeys);
}]);

ctrl.controller('addFormKeyCtrl',['$rootScope','$scope','LocalStorage',function($rootScope,$scope,LocalStorage){
    $scope.addStorageKey = function(){
       if(LocalStorage.save($scope.key, $scope.value)){
           $scope.resetForm();
           $rootScope.$broadcast('refreshKeys');
       }
    };

    $scope.resetForm = function(){
        $scope.key = "";
        $scope.value = "";
    };
}]);

ctrl.controller('handleKeyCtrl',['$rootScope','$scope','LocalStorage', function($rootScope,$scope,LocalStorage){
    $scope.currentValue = "";

    $scope.deleteKey = function(key){
        if($scope.currentValue == LocalStorage.get(key)){
            $scope.clearValue();
        };

        if(LocalStorage.remove(key)){
            $rootScope.$broadcast('refreshKeys');
        }
    };
    $scope.showValue = function(key){
        $scope.currentValue = LocalStorage.get(key);
    };

    $scope.clearValue = function (){
        $scope.currentValue = "";
    };
}]);

ctrl.controller('handleAllKeysCtrl',['$rootScope','$scope','LocalStorage', function($rootScope, $scope, LocalStorage){
    var ultimateKey = "MULTIKEY";
    var ultimateValue = {};

    $scope.generateUltimateValue = function(){
        ultimateValue = {};
        var keys = LocalStorage.getAllKeys();

        angular.forEach(keys, function(key, index){
            this[key] = LocalStorage.get(key);
        }, ultimateValue);

        if(LocalStorage.save(ultimateKey, JSON.stringify(ultimateValue))){
            $rootScope.$broadcast('refreshKeys');
        }
    }
}]);