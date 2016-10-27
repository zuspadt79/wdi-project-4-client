angular
.module('bibliobibulio')
.controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ["$http", "$rootScope", "CurrentUserService", "$state"];
function MainCtrl($http, $rootScope, CurrentUserService, $state) {
  var vm = this;
  vm.user = CurrentUserService.getUser();

  vm.logout = () => {
    event.preventDefault();
    CurrentUserService.clearUser();
  };

  $rootScope.$on("loggedIn", () => {
    vm.user = CurrentUserService.getUser();
    $state.go("booksSearch");
  });

  $rootScope.$on("loggedOut", () => {
    vm.user = null;
    $state.go("home");
  });
}
