'use strict';

var ctrl = angular.module('Controllers',[]);

ctrl.controller('GenerateCtrl',['$scope','LocalStorage',function($scope, LocalStorage){
    var data;

    $scope.message = "";

    $scope.email = "";
    $scope.passphrase = "";

    $scope.keyType = 1;
    $scope.numBits = 1024;

    $scope.generateKeyPair = function(){
        if(html5_local_storage() !== true){
            $scope.message = "LocalStorage not available!";
            return false;
        }

        if(checkBrowserRandomValues() !== true){
            $scope.message = "\"window.crypto.getRandomValues\" not available!";
            return false;
        }

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

       } catch (e){
           $scope.message = e;
       }
    };

    $scope.load = function(){
        if(html5_local_storage() !== true){
            $scope.message = "LocalStorage not available!";
            return false;
        }

        $scope.privKey = LocalStorage.get("privKey");

    };

    function html5_local_storage(){
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch(e){
            return false;
        }
    }

    function checkBrowserRandomValues(){
        if(window.crypto.getRandomValues){
            return true;
        }

        return false;
    }
}]);