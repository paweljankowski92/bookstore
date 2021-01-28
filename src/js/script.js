{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    book: {
      image: '.books-list .book__image',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };


  function render () {

    // const thisBooksList = this;

    for(let books of dataSource.books) {
      //generate HTML of books
      const generatedHTML = templates.bookTemplate(books);
      // console.log('generatedHTML', generatedHTML);
      // create element using utils
      const element = utils.createDOMFromHTML(generatedHTML);
      console.log('element', element);
      // find list container
      const listContainer = document.querySelector(select.containerOf.bookList);
      // add element to list
      listContainer.appendChild(element);
    }
  }

  const favoriteBooks = [];

  function initActions () {
    // every element in bookslist
    const images = document.querySelectorAll(select.book.image);
    console.log('images', images);
    // for every element
    for(let element of images) {
      // add addEventListener
      element.addEventListener('click', function(event){
        // preventDefault
        event.preventDefault();

        // get element by Id
        const bookId = element.getAttribute('data-id');
        // console.log('element', element);
        // console.log('bookId', bookId);
        // add or remove class after click
        element.classList.toggle('favorite');
        // if clicked element included remove ID or add ID to favoriteBooks
        if(favoriteBooks.includes(bookId)){
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        }
        else{
          favoriteBooks.push(bookId);
        }
        console.log('favoriteBooks', favoriteBooks);
      });
    }
  }

  render();
  initActions();
}
