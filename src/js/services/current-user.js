angular
  .module("bibliobibulio")
  .service("CurrentUserService", CurrentUserService);

CurrentUserService.$inject = ["$rootScope", "TokenService", "User"];
function CurrentUserService($rootScope, TokenService, User){
  let currentUser = TokenService.decodeToken(); // <-- currentUser === 5

  if (currentUser) {
    currentUser = User.get(currentUser);
  }


  return {
    user: currentUser,
    saveUser(user) {
      currentUser = user;
      $rootScope.$broadcast("loggedIn");
    },
    getUser() {
      return currentUser;
    },
    clearUser() {
      currentUser = null;
      TokenService.clearToken();
      $rootScope.$broadcast("loggedOut");
    }
  };
}
