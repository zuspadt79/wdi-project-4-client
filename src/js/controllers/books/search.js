angular
  .module("bibliobibulio")
  .controller("booksSearchCtrl", booksSearchCtrl);

booksSearchCtrl.$inject = ['$http'];
function booksSearchCtrl($http) {
  const vm = this;

  vm.book = "";


  vm.getBooks = function(name) {
    $http
    .get("https://www.googleapis.com/books/v1/volumes?q=" + name + "&orderBy=relevance&langRestrict=en&printType=books&projection=lite&filter=paid-ebooks&maxResults=10&key=AIzaSyC0r7s2vIEhQLlGxNtNZayKQUKLw8EyJUY")
    .then(function(response){
      console.log(response.data);
      vm.books = response.data.items;
    });
  };

  vm.bookInfo = function(book) {
    console.log(book);

    vm.book = book;
  };

  vm.back = () => {
    vm.book = "";
  };
}
