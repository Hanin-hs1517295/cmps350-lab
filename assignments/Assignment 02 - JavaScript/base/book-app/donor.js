// Import the required repositories
const DonorsRepository = require("./donors-repo");
const BooksRepository = require("./books-repo");

// Create instances of the repositories
const donorsRepo = new DonorsRepository();
const booksRepo = new BooksRepository();

// Add donors
const donor1 = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};
const donor2 = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
};
donorsRepo.addDonor(donor1);