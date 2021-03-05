// This is a module we are making that we can pull into other files
// as needed for help. Because the actual writing of CSV files
// will be done by this module, we'll pull the CSV Writer package
// into this module.
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'complete.csv',
  header: [
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

  newFile: [],

  /**
   * This function will take the value of the Filename field
   * which is currently "name1.jpg, name2.jpg, name3.jpg"
   * and convert them to an array so that we can make a
   * new row in our CSV for each filename.
   * @param {string} row The row from the CSV file
   */
  extractMultiRowsFromRow(row) {
    // This "compiled" variable will be covered later. We are delcaring 
    // it now so we can access it later.
    let compiled = []

    // First, we'll make sure that the "object" being provided to us (row)
    // isn't empty or missing. We can achieve this by using the "length" property
    // As long as the value is great theran 0, then we can continue. As a result
    // we can say "IF", theh "filanames" "length" property is less than 1, then 
    // there is nothing to do. So let's get out of the function so no errors happen
    // NOTE: I am using shorthand script here since it's a one line reaction to the 
    // "if" statement. Normally the if statement is wrapped in brackets. {}
    if( row.length < 1 ) return

    // By using some "console.log()" commands during development, I can see that
    // the 'Photo Filenames' key has the list of files we want to extract. So we 
    // will pull the string value out of of the object as this is what we are after.
    // NOTICE how we use the variable names to describe what we are doing
    let filesString = row['Photo Filenames']

    // We will use the built in "split()" method of a string object (fileString)
    // to make an array of strings containing each file. By including the space
    // after the comma, it means we don't have to worry about extra whitespace
    let filesList = filesString.split(', ')
    
    // At this point, the "fileList" will always be an array with at least one
    // entry. This means we can use a "for" loop to loop over the array
    // so we can begin to build the additional rows we need to for our file
    // NOTE the "for" statement accepts a "var" of (any letter or name you 
    // want as long as it hasn't been used) and then "in" the list of files.
    // This loop will repeat once for each entry/row in our fileList
    for( var i in filesList ) {

      // We are going to create the "row" we are going to use to insert. 
      // Only the filesList is going to be different, so we can just use
      // the "row" object to get the same info for the other fields. 
      // By using "filesList[i]" we are saying "get the value of the 'i' entry
      // in the array" which is going to be the filename we are looking for
      let newRow = {
        accessCode: row['Access Code'],
        lastName: row['Last Name'],
        firstName: row['First Name'],
        team: row['Team'],
        filename: filesList[i],
        featured: row['Featured Photo']
      }

      // Now we will use a built in JavaScript Array Function to "push" the data into the
      // end of our "compiled" object. 
      compiled.push(newRow)
    }

    // At this point, "compiled" should be one row for each "file" that existed for the 
    // original row. We can return this value so it can be used elsewhere.
    return compiled
  },

  /**
   * Adds the fully compiled rows to the object that will be our new file
   * @param {array} compiled 
   */
  addCompiledRows(compiled) {
    // This is a built in Javascript function that adds 
    // the compiled information to our "newFile" object that
    // will eventually be used to create our completed file
    Array.prototype.push.apply(this.newFile, compiled)
  },

  /**
   * Write the "newFile" object to a physical file on the disk.
   */
  outputFile(){
    // Using the csvWriter we can write all of the records at once. 
    // We just need to pass in the information we want added to the CSV
    // file and it will be added.
    csvWriter.writeRecords(this.newFile)
    .then( () => {
      // If this section is hit, then all is done. We are good to go. 
      // We just need to output a message to the user. 
      console.log('Hooray!! The file "complete.csv" is ready for you :)')
    }).catch( (err) => {
      // We hope this isn't hit, but if it is, it will output an error
      // message and then also dump out whatever the actual error was 
      // that was returned. 
      console.error('THERE WAS AN ERROR WRITING THE FILE')
      console.log(err)
    })
  }

}
