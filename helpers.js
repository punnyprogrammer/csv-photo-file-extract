// This is a module we are making that we can pull into other files
// as needed for help. Because the actual writing of CSV files
// will be done by this module, we'll pull the CSV Writer package
// into this module.
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'complete.csv',
  headers: [
    // These headers are just a way for us to Map
    // the title which has spaces to a key we can
    // use to make it a little easier on us
    // We can name the id's whatever we want
    // Also, the "title" will be the value of the first row
    { id: 'accessCode', title: 'Access Code' },
    { id: 'lastName', title: 'Last Name' },
    { id: 'firstName', title: 'First Name' },
    { id: 'team', title: 'Team' },
    { id: 'filename', title: 'Photo Filename' },
    { id: 'featured', title: 'Featured Photo' }
  ]
})

// Here is the actual module of methods that will be available
// to us in whichever file we "require" this helper into
// When we import, we'll assign this to a variable (such as helpers)
// const helpers = require('helpers')
// then we can call the methods using dot syntax such as
// const results = helpers.extractPhotoFilenames('Name1.jpg, Name2.jpg, Name3.jpg')
module.exports = {

  /**
   * This function will take the value of the Filename field
   * which is currently "name1.jpg, name2.jpg, name3.jpg"
   * and convert them to an array so that we can make a
   * new row in our CSV for each filename.
   * @param {string} filenames The String of Filenames
   */
  extractPhotoFilenames(filenames) {

  }
}
