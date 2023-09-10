document.addEventListener("DOMContentLoaded", () => {
  const thumbnailImage = document.getElementById("thumbnail-image");
  const mainBookTitle = document.getElementsByClassName("main-book-title")[0];
  const mainBookCategory = document.getElementsByClassName("main-book-category")[0];

  const mainBookThumbnail = async () => {
    fetch(`/search?q=all the sinners bleed`)
      .then(response => response.json())
      .then(data => {
        const book = data[0]; // Access the first book in the data array

        if (book) { // Check if a book is found
          thumbnailImage.src = book.volumeInfo.imageLinks.thumbnail;
          mainBookTitle.textContent = book.volumeInfo.title;
          mainBookCategory.textContent = book.volumeInfo.categories || "Category not available";
        } else {
          // Handle the case where no books were found
          thumbnailImage.src = ""; // Set a default image or leave it empty
          mainBookTitle.textContent = "No book found";
          mainBookCategory.textContent = "Category not available";
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };
  
  // Call the function to fetch and display a random book thumbnail on page load
  mainBookThumbnail();
});




