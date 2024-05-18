//(3) Creating first endpoint (POST /book)
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import the path module

const app = express();
const port = 3000;

//Where books will be
let books = [];

app.use(cors());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Book API!');
});

// Serve the book-list.html file when navigating to /book-list
app.get('/book-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'book-list.html'));
});

app.post('/book', (req, res) => {
    const book = req.body;

    //Output the book to the console for debugging
    //3.b
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

//(5.b)
app.post('/book/:isbn', (req, res) => {
    //reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    //Remove item from the books array
    for(let i = 0; i < books.length; i++) {
        let book = books[i]

        if(book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    //sending 404 when not found something is a good practice
    res.send('Book is edited');
})

app.get('/books', (req, res) => {//(4) Getting all Books (GET / books)
    res.json(books); 
});


app.listen(port, () => console.log('Hello world app listening on port'));

// // Serve the new-book.html file
// app.get('/new-book', (req, res) => {
//     res.sendFile(path.join(__dirname, 'new-book.html')); // Use path.join to get the correct file path
// });
