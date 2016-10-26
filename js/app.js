angular
.module('bibliobibulio', [])
.controller("MainCtrl", MainCtrl);

MainCtrl.$inject = ["$http"];
function MainCtrl($http) {
  var vm = this;
  vm.getBooks = function(name) {
    $http
    .get("https://www.googleapis.com/books/v1/volumes?q=" + name + "&orderBy=relevance&langRestrict=en&printType=books&projection=full&filter=paid-ebooks&maxResults=10&key=AIzaSyC0r7s2vIEhQLlGxNtNZayKQUKLw8EyJUY")
    .then(function(response){
      console.log(response.data);
      vm.books = response.data.items;
    });
  };
}
