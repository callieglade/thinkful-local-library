function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  const result = accounts.sort((accountA, accountB) => {
    const nameA = accountA.name.last;
    const nameB = accountB.name.last;
    return nameA > nameB ? 1 : -1;
  });
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  let accumulator = 0;
  let borrows = books.reduce((total, book) => {
    const bookBorrows = book.borrows.filter(borrow => borrow.id === account.id);
    return total + bookBorrows.length;
  }, accumulator);
  return borrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  // filters the books array for all book objects
  // where book.borrows.id === account.id AND borrows.returned === false
  let borrowedBooks = books.filter(book => {
    return book.borrows.find(borrow => {
      const {id, returned} = borrow;
      if (id === account.id && returned === false) return true;
    });
  });
  // adds author to each book object in the array
  borrowedBooks = borrowedBooks.map(book => {
    const matchedAuthor = authors.find(author => author.id === book.authorId);
    book.author = matchedAuthor;
    return book
  });
  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
