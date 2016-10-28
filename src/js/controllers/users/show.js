angular
  .module("bibliobibulio")
  .controller("usersShowCtrl", usersShowCtrl);

usersShowCtrl.$inject = ['User', '$stateParams', 'Book'];
function usersShowCtrl(User, $stateParams, Book) {
  const vm = this;

  User
    .get($stateParams)
    .$promise
    .then(user => {
      vm.user = user;
      vm.filterByToRead();
    });

  vm.filterByRead = function(){
    vm.toggle = "read";
    vm.books = vm.user.books.filter(book => {
      return book.status === "read";
    });
  };

  vm.filterByToRead = function(){
    vm.toggle = "to_read";
    vm.books = vm.user.books.filter(book => {
      return book.status === "to_read";
    });
  };

  vm.read = function(book){
    Book
      .read({ book: book })
      .$promise
      .then(book => {
        User
          .get($stateParams)
          .$promise
          .then(user => {
            vm.user = user;
            vm.filterByToRead();
          });
      });
  };

  vm.delete = function(book) {
    Book
      .remove({ id: book.id })
      .$promise
      .then(book => {
        User
          .get($stateParams)
          .$promise
          .then(user => {
            vm.user = user;
            if (vm.toggle === "to_read") {
              vm.filterByToRead();
            } else {
              vm.filterByRead();
            }
          });
      });
  };

}
