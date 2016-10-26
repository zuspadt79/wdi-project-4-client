angular
  .module("bibliobibulio")
  .controller("usersShowCtrl", usersShowCtrl);

usersShowCtrl.$inject = ['User', '$stateParams'];
function usersShowCtrl(User, $stateParams) {
  const vm = this;

  vm.user = User.get($stateParams);
}
