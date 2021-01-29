{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      filters: '.filters'
    },
    book: {
      image: 'book__image',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  const listContainer = document.querySelector(select.containerOf.bookList);

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
      // add element to list
      listContainer.appendChild(element);
    }
  }

  const favoriteBooks = [];
  const filters = [];


  function initActions () {

    // add addEventListener
    listContainer.addEventListener('click', function(event){
      // preventDefault
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      console.log('clickedElement', clickedElement);
      if(clickedElement.classList.contains(select.book.image)) {
        const bookId = clickedElement.getAttribute('data-id');
        console.log('bookId', bookId);
        if(!clickedElement.classList.contains('favorite')){
          favoriteBooks.push(bookId);
          clickedElement.classList.add('favorite');
        }
        else {
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
          clickedElement.classList.remove('favorite');
        }
      }
      console.log('favoriteBooks',favoriteBooks);
    });
    const filtersWrapper = document.querySelector(select.containerOf.filters);
    console.log('filtersWrapper', filtersWrapper);



    filtersWrapper.addEventListener('click', function(event){

      const clickedElement = event.target;
      console.log('clickedElement', clickedElement);

      if(clickedElement.name === 'filter'){
        // console.log('value', clickedElement.value);
        if(clickedElement.checked){
          filters.push(clickedElement.value);
        }
        else {
          const filterId = filters.indexOf(clickedElement.value);
          console.log(filterId);
          filters.splice(filters.indexOf(filterId), 1);
        }
      }
      console.log('filters', filters);
      filterBooks();
    });

  }

function filterBooks (){

  for(let hiddenBooks of dataSource.books){
    console.log('hiddenBooks', hiddenBooks)
      let shouldBeHidden = false;
      for(let filter of filters){
        console.log('filter', filter)
        if(!hiddenBooks.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }

    const book = document.querySelector('.book__image[data-id="' + hiddenBooks.id + '"]')
    console.log('book', book);
    if(shouldBeHidden){
      book.classList.add('hidden');
    }
    else {
      book.classList.remove('hidden');
    }
  }
}


  render();
  initActions();
}
