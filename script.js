const url = "https://fakestoreapi.com/products";

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))

