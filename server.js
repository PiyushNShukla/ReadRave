require('dotenv').config();
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
const express = require('express')
const app = express()
const path=require('path')
const axios = require('axios');

app.use("/images", express.static(path.join(__dirname, "/public/images")));
app.use("/styles", express.static(path.join(__dirname, "/public/styles")));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.set("view engine","hbs")
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/about",(req,res)=>{
    res.status(200).send("THis is about page")
})
app.get("/contact",(req,res)=>{
    res.status(200).send("THis is about page")
})
app.get('/search', async (req, res) => {
  const query = req.query.q; // Get the search query from the URL query parameter
  const startIndex = req.query.startIndex || 0; // Get the startIndex parameter (default to 0)
  const maxResults = req.query.maxResults || 10; // Get the maxResults parameter (default to 10)
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const books = response.data.items;
    res.json(books);
  } catch (error) {
    console.error('Error fetching data from Google Books API:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

  
  // Start the Express server
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
