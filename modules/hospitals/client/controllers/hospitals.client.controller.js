(function() {
  'use strict';

  angular
    .module('hospitals')
    .controller('HospitalsController', HospitalsController);

  HospitalsController.$inject = ['$scope', 'HospitalRegs', '$location'];

  function HospitalsController($scope, HospitalRegs, $location) {
    var vm = this;

    $scope.hospitalObj = {};

    $scope.find = function () {
      $scope.hospitalRegs = HospitalRegs.query();
    };

    $scope.create = function (isValid) {
      $scope.error = '';
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'hospitalRegForm');
        return false;
      }
      var hospitalReg = new HospitalRegs($scope.hospitalObj);

      hospitalReg.$save(function (response) {
        $scope.hospitalObj = {};
        $location.path('/hospitals');
      }, function (errResponse) {
        $scope.error = errResponse.data.message;
      });
    };

    $scope.delete = function (hospitalReg) {
      if (hospitalReg) {
        hospitalReg.$remove();
        for(var i in $scope.hospitalRegs) {
          if ($scope.hospitalRegs[i] === hospitalReg) {
            $scope.hospitalRegs.splice(i,1);
          }
        }
      }
    };

    init();

    function init() {
    }
  }
})();
