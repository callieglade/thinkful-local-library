function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter(book => {
    const mostRecent = book.borrows[0];
    if(mostRecent.returned === false) return true;
  });
  const inStock = books.filter(book => {
    const mostRecent = book.borrows[0];
    if(mostRecent.returned === true) return true;
  });
  return [checkedOut, inStock];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const borrowers = borrows.map(borrow => {
    const borrower = accounts.find(account => account.id === borrow.id);
    borrower.returned = borrow.returned;
    return borrower;
  });
  return borrowers.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
