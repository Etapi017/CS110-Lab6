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

// Serve the new-book.html file when navigating to /new-book
app.get('/new-book', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'new-book.html'));
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
app.post(`/book/:isbn`, (req, res) => {
    //reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // Update the book in the books array
    let bookFound = false;//new
    //Remove item from the books array
    for(let i = 0; i < books.length; i++) {
        let book = books[i]

        if(book.isbn === isbn) {
            books[i] = newBook;
            bookFound = true;//new
            break;//new
        }
    }

    if (bookFound){//new
    //sending 404 when not found something is a good practice
    res.send('Book is edited');
    }else{//new
        res.status(404).send('Book not found');//new
    }
});

app.get('/books', (req, res) => {//(4) Getting all Books (GET / books)
    res.json(books); 
});

// Get a single book by ISBN (GET /book/:isbn)
app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Delete a book by ISBN (DELETE /book/:isbn)
app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.send('Book deleted successfully');
    } else {
        res.status(404).send('Book not found');
    }
});

app.listen(port, () => console.log('Hello world app listening on port'));

