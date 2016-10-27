angular
  .module("bibliobibulio")
  .factory("Book", bookFactory);

bookFactory.$inject =["API", "$resource"];
function bookFactory(API, $resource){
  return $resource(`${API}/books/:id`, { id: "@id"}, {
    'read': {
      method: "POST",
      url: `${API}/books/read`
    },
    'to_read': {
      method: "POST",
      url: `${API}/books/to_read`
    },
  });
}
