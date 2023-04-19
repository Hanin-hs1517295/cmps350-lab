class DonorsRepository {
    constructor() {
      this.donors = [];
    }
  
    // Function to get donor by id
    getDonor(donorId) {
      return this.donors.find((donor) => donor.donorID === donorId);
    }
  
    // Function to add a donor
    addDonor(donor) {
      // Assign a random donorID
      donor.donorID = Math.floor(Math.random() * 1000);
      this.donors.push(donor);
      return donor.donorID;
    }
  
    // Function to update a donor
    updateDonor(donor) {
      const index = this.donors.findIndex(
        (d) => d.donorID === donor.donorID
      );
      if (index !== -1) {
        this.donors[index] = donor;
        return true;
      }
      return false;
    }
  
    // Function to delete a donor
    deleteDonor(donorID) {
      const index = this.donors.findIndex((d) => d.donorID === donorID);
      if (index !== -1) {
        // Check if donor is associated with any books
        const associatedBook = booksRepo.books.find(
          (book) => book.donorID === donorID
        );
        if (!associatedBook) {
          this.donors.splice(index, 1);
          return true;
        }
      }
      return false;
    }
  }
  
  // Export the donors repository class
  module.exports = DonorsRepository;