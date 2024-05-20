async function loadBooks() {
    let response = await fetch("http://localhost:3000/books");

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.text();
        console.log(data);
        const books = JSON.parse(data);

        document.getElementById('books').innerHTML = ''; // Clears the book list before adding updated list

        for (let book of books) {
            const x = `
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>
                            <div>Author: ${book.author}</div>
                            <div>Publisher: ${book.publisher}</div>
                            <div>Number Of Pages: ${book.numOfPages}</div>
                            <hr>
                            <button type="button" class="btn btn-danger" onclick="deleteBook('${book.isbn}')">Delete</button>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editBookModal" onclick="setEditModal('${book.isbn}')">Edit</button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('books').innerHTML += x;
        }
    }
}

async function setEditModal(isbn) {
    let response = await fetch(`http://localhost:3000/book/${isbn}`);

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.text();
        console.log(data);
        const book = JSON.parse(data);

        const {
            title,
            author,
            publisher,
            publish_date,
            numOfPages
        } = book;

        document.getElementById('isbn').value = isbn;
        document.getElementById('title').value = title;
        document.getElementById('author').value = author;
        document.getElementById('publisher').value = publisher;
        document.getElementById('publish_date').value = publish_date;
        document.getElementById('numOfPages').value = numOfPages;

        // Action URL for the book
        document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
    }
}

async function deleteBook(isbn) {
    let response = await fetch(`http://localhost:3000/book/${isbn}`, {
        method: 'DELETE',
    });

    if (response.status === 200) {
        alert('Book deleted successfully');
        loadBooks(); // Reloads the books after deleting
    } else {
        console.error('Failed to delete book', response.statusText);
    }
}

document.getElementById('editForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const isbn = document.getElementById('isbn').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publish_date = document.getElementById('publish_date').value;
    const publisher = document.getElementById('publisher').value;
    const numOfPages = document.getElementById('numOfPages').value;

    const updatedBook = { isbn, title, author, publish_date, publisher, numOfPages };

    let response = await fetch(`http://localhost:3000/book/${isbn}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBook)
    });

    if (response.status === 200) {
        alert('Book updated successfully');
        loadBooks(); // Reloads the books after updating
        $('#editBookModal').modal('hide'); // Hides the editBookModal after update
    } else {
        console.error('Failed to update book', response.statusText);
    }
});

document.getElementById('newBookForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const isbn = document.getElementById('newBookIsbn').value;
    const title = document.getElementById('newBookTitle').value;
    const author = document.getElementById('newBookAuthor').value;
    const publish_date = document.getElementById('newBookPublishDate').value;
    const publisher = document.getElementById('newBookPublisher').value;
    const numOfPages = document.getElementById('newBookNumOfPages').value;

    const newBook = { isbn, title, author, publish_date, publisher, numOfPages };

    let response = await fetch("http://localhost:3000/book", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    });

    if (response.status === 200) {
        alert('Book added successfully');
        document.getElementById('newBookForm').reset();
        loadBooks(); // Reloads the books after adding
    } else {
        console.error('Failed to add book', response.statusText);
    }
});

loadBooks();
