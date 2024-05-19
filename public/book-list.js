async function loadBooks (){//(4) Getting all Books (GET / books)


    let response = await fetch("http://localhost:3000/books");

    console.log(response.status); // 200
    console.log(response.statusText); // ok

    if(response.status === 200){
        let data = await response.text();
        console.log(data);
        const books = JSON.parse(data);

        for(let book of books){
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

                            <button type="button" class="btn btn-danger">Delete</button>
                            <button type="button" class="btn btn-primary" data-toggle="modal">Edit</button>
                        </div>
                    </div>
                </div>
            `
            
            document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
        }
    }
}

loadBooks();//This one


//(5) Editing a book
async function setEditModal (isbn) {

    let response = await fetch(`http://localhost:3000/book/${isbn}`, {
        method: 'Edit',
    });

    console.log(response.status); //200
    console.log(response.statusText); //ok
    if(response.status === 200) {
        let data = await response.text();
        console.log(data);
        const book = JSON.parse(data);
        
        const {
            title,
            author,
            publisher,
            publisher_date,
            numOfPages
        } = book;

        document.getElementById('isbn').value = isbn;
        document.getElementById('title').value = title;
        document.getElementById('author').value = author;
        document.getElementById('publisher').value = publisher;
        document.getElementById('publish_date').value = publisher_date;
        document.getElementById('numOfPages').value = numOfPages;

        //setting up the action url for the book
        document.getElementById('editForm').action = `http:localhost:3000/book/${isbn}`;
    }
}


async function deleteBook(isbn) {
    let response = await fetch(`http://localhost:3000/book/${isbn}`, {
        method: 'DELETE',
    });

    if (response.status === 200) {
        alert('Book deleted successfully');
        location.reload(); // Reload the page to see the changes
    } else {
        console.error('Failed to delete book', response.statusText);
    }
}

