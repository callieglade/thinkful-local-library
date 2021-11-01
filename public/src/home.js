function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const checkedOut = books.filter(book => {
    const {id, returned} = book.borrows[0];
    if(returned === false) return true;
  });
  return checkedOut.length
}

function getMostCommonGenres(books) {
  const commonGenres = [];
  books.forEach(book => {
    const genreMatch = commonGenres.find(genre => genre.name === book.genre );
    genreMatch ? genreMatch.count += 1 : commonGenres.push({name: book.genre, count: 1});
  });
  commonGenres.sort((genreA, genreB) => genreB.count - genreA.count);
  return commonGenres.slice(0,5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map(book => {
    const numBorrows = book.borrows.length;
    return {name: book.title, count: numBorrows};
  });
  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  return popularBooks.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  const authorCheckOuts = authors.map(author => {    
    const {name: {first, last}} = author;
    const authorBooks = books.filter(book => book.authorId === author.id);
    const borrows = authorBooks.map(book => book.borrows.length);
    const checkOuts = borrows.reduce((acc, borrows) => acc + borrows, 0);
    return {name: `${first} ${last}`, count: checkOuts};
  });
  authorCheckOuts.sort((authorA, authorB) => authorB.count - authorA.count);
  return authorCheckOuts.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
