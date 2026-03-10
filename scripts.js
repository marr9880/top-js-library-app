const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Your must use the 'new' operator to use the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    displayMyLibrary();
}

function displayMyLibrary() {
    const bookCardContainer = document.querySelector(".book-card-container");
    bookCardContainer.replaceChildren();
    
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const title = document.createElement("h2");
        title.textContent = book.title;
        title.classList.add("book-title");

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;
        author.classList.add("book-author");

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;
        pages.classList.add("book-pages");

        const read = document.createElement("p");
        read.textContent = book.read;
        read.classList.add("book-read");

        const id = document.createElement("p");
        id.textContent = `ID: ${book.id}`;

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(read);
        bookCard.appendChild(id);

        bookCardContainer.appendChild(bookCard);
    });
}