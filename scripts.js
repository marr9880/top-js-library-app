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

        bookCard.id = book.id;

        const removeBook = document.createElement("div");
        removeBook.classList.add("remove-book");
        
        const removeBookBtn = document.createElement("button");
        removeBookBtn.type = "button";
        removeBookBtn.textContent = "Remove";
        removeBookBtn.classList.add("remove-book-button");

        const removeBookLabel = document.createElement("p");
        removeBookLabel.classList.add("remove-book-label");
        removeBookLabel.textContent = "Click here to remove book from library";

        removeBook.appendChild(removeBookLabel);
        removeBook.appendChild(removeBookBtn);

        const changeReadStatus = document.createElement("div");
        changeReadStatus.classList.add("change-read-status");

        const changeReadStatusBtn = document.createElement("button");
        changeReadStatusBtn.type = "button";
        changeReadStatusBtn.textContent = "Change";
        changeReadStatusBtn.classList.add("change-read-status-button");

        const changeReadStatusLabel = document.createElement("p");
        changeReadStatusLabel.classList.add("change-read-status-label");
        changeReadStatusLabel.textContent = "Click here to change book's read status";

        changeReadStatus.appendChild(changeReadStatusLabel);
        changeReadStatus.appendChild(changeReadStatusBtn);

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(read);
        bookCard.appendChild(id);
        bookCard.appendChild(removeBook);
        bookCard.appendChild(changeReadStatus);

        bookCardContainer.appendChild(bookCard);

        removeBookBtn.addEventListener("click", function(e) {
            const bookToRemove = document.getElementById(book.id);
            bookCardContainer.removeChild(bookToRemove);
            const index = myLibrary.indexOf(bookToRemove);
            myLibrary.splice(index, 1);
        });

        changeReadStatusBtn.addEventListener("click", function(e) {
            const bookToChange = document.getElementById(book.id);
            if (read.textContent === "Read") {
                read.textContent = "Not read yet";
            } else {
                read.textContent = "Read";
            }
        });
    });
}

const newBookBtn = document.querySelector(".new-book-button");
newBookBtn.addEventListener("click", function(e) {    
    const pageContainer = document.querySelector(".page-container");
    
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-sidebar");
    formContainer.style.gridArea = "1 / 1 / 2 / 2";

    const mainContent = document.querySelector(".main-content");
    mainContent.style.gridArea = "1 / 2 / 2 / 3";

    const newBookForm = document.createElement("form");
    newBookForm.classList.add("new-book-form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "title";
    titleInput.placeholder = "Enter book's title";

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.setAttribute("for", "title");

    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.id = "author";
    authorInput.placeholder = "Enter book's author";

    const authorLabel = document.createElement("label");
    authorLabel.textContent = "Author:";
    authorLabel.setAttribute("for", "author");

    const pagesInput = document.createElement("input");
    pagesInput.type = "number";
    pagesInput.id = "pages";
    pagesInput.placeholder = "# of pages in book";

    const pagesLabel = document.createElement("label");
    pagesLabel.textContent = "# of pages:";
    pagesLabel.setAttribute("for", "pages");

    const readSelect = document.createElement("select");
    readSelect.name = "readStatus";
    readSelect.id = "readStatus";

    const readLabel = document.createElement("label");
    readLabel.textContent = "Select read status";
    readLabel.setAttribute("for", "readStatus");

    const optionOne = document.createElement("option");
    optionOne.value = "Read";
    optionOne.textContent = "Read";

    const optionTwo = document.createElement("option");
    optionTwo.value = "Not read yet";
    optionTwo.textContent = "Not read yet";

    const formSubmitBtn = document.createElement("button");
    formSubmitBtn.type = "submit";
    formSubmitBtn.classList.add("form-submit");
    formSubmitBtn.textContent = "Submit";

    readSelect.appendChild(optionOne);
    readSelect.appendChild(optionTwo);
    newBookForm.appendChild(titleLabel);
    newBookForm.appendChild(titleInput);
    newBookForm.appendChild(authorLabel);
    newBookForm.appendChild(authorInput);
    newBookForm.appendChild(pagesLabel);
    newBookForm.appendChild(pagesInput);
    newBookForm.appendChild(readLabel);
    newBookForm.appendChild(readSelect);
    newBookForm.appendChild(formSubmitBtn);
    formContainer.appendChild(newBookForm);
    pageContainer.appendChild(formContainer);

    formSubmitBtn.addEventListener("click", function(e) {
        e.preventDefault();
        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.valueAsNumber, readSelect.value);
        newBookForm.reset();
        pageContainer.removeChild(formContainer);
        mainContent.style.gridArea = "1 / 1 / 2 / 3";
    });
})