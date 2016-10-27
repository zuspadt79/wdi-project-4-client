angular
.module("bibliobibulio")
.controller("booksSearchCtrl", booksSearchCtrl);

booksSearchCtrl.$inject = ['$http', 'API', '$state', "Book", "CurrentUserService"];
function booksSearchCtrl($http, API, $state, Book, CurrentUserService) {
  const vm = this;

  vm.book = "";
  vm.user = CurrentUserService.getUser();

  getBooks();

  vm.getBooks = getBooks;

  function getBooks(name) {
    if (!name) name = "Javascript";
    $http
    .get("https://www.googleapis.com/books/v1/volumes?q=" + name + "&orderBy=relevance&langRestrict=en&printType=books&projection=lite&filter=paid-ebooks&maxResults=10&key=AIzaSyC0r7s2vIEhQLlGxNtNZayKQUKLw8EyJUY")
    .then(function(response){
      vm.books = response.data.items;
      vm.name = "";
    });
  }

  vm.toRead = function(object){
    let book = {
      title: object.volumeInfo.title,
      image: object.volumeInfo.imageLinks.thumbnail,
      author: object.volumeInfo.authors[0],
      isbn : object.id
    };

    Book
    .to_read({ book: book })
    .$promise
    .then(data => {
      $state.go("usersShow", { id: vm.user.id });
    });
  };

  vm.read = function(object){
    let book = {
      title: object.volumeInfo.title,
      image: object.volumeInfo.imageLinks.thumbnail,
      author: object.volumeInfo.authors[0],
      isbn : object.id
    };

    Book
    .read({ book: book })
    .$promise
    .then(data => {
      $state.go("usersShow", { id: vm.user.id });
    });
  };

  // vm.addBook = (object) => {
  //   let book = {
  //     title: object.volumeInfo.title,
  //     image: object.volumeInfo.imageLinks.thumbnail,
  //     author: object.volumeInfo.authors[0],
  //     isbn : object.id
  //
  //   };
  //
  //   $http
  //     .post(`${API}/books`, book)
  //     .then(data => {
  //       $state.go('usersShow', { id: data.data.user_id });
  //     });
  // };

  vm.bookInfo = (book) => {
    vm.book = book;
  };

  vm.back  = () => {
    vm.book = "";
  };
}
