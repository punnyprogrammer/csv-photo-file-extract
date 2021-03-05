// DEPENDENCIES
// These are other "packages" (or "libraries",
// "helpers", or whatever you want to call them)
// that we will need in order to do our work. I find
// these by using google to see how to do something specific
// in "nodejs"
// NOTE, you can name these whatever you want. I name them
// to be easy to understand what they are for.
const fs = require('fs') // Access to the File System
const csvRead = require('csv-parser') // reads CSV files
const helpers = require('./helpers') // Custom file I wrote to help us out
// END DEPENDENCIES

// The Input File should be the third argument in the command.
// Since the array starts at 0, 1, 2, then we need the "2" entry.
// We will get from the process (provided to us by node) the "argv"
// which contains the text typed to run the command so we can determine
// what actions to take.
const inputFile = process.argv[2]

// ^^ NOTE: the "process" is provided by the node environment. It is always
// available to us

// Now we need to ensure that an input file was provided. If not, then
// we really can't continue. We will use an if statement to make sure
// that the item is not "undefined".
if( inputFile === undefined ) {
  // Display a message in the terminal window to the user
  console.error('No input file was provided.')
  // Exit the script
  process.exit(1)
}

// Now that we know a file exists, let's ensure it is a CSV file
// If the file doesn't end in CSV, then we don't want to continue.
// HOW IT READS
// IF (!NOT) (Pattern for CSV) (dot) (method called => Test) against the filename
// If the inputFile doesn't end in CSV...then error
if( !/\.csv$/.test(inputFile) ) {
  // Display a message in the terminal window to the user
  console.error('The file provided was not a CSV')
  process.exit(1)
}

// Next up, we want to ensure the file exists before we attempt to open or take
// any actions on it. The exclamation point means "not", so the statement
// below reads "if not file exists"
// Because of the nature of javascript, it will not wait for the result of some
// actions that are handled in the background. For example, the file system will check
// in the background and the script will keep going on without waiting for the response.
// For that reason, we use a "try" and "catch" statement. This forces javascript to wait
// for the response in the "try" before moving onto the rest of the script.
try{
  if( fs.existsSync(inputFile) ) {
  } else {
    // Display a message in the terminal window to the user
    console.error(`Input File Not Found: ${inputFile}`)
    process.exit(1)
  }
} catch( err ) {
  // Display a message in the terminal window to the user
  console.log(`Input File Not Found: ${inputFile}`)
  process.exit(1)
}

// Now we need to read the input file. By looking up the
// API for "filesystem" I can see to use createReadStream
// to read the file. I then pipe the file through the
// csvRead package. That package provides two "Promises"
// One promise is named 'data' and the other is named 'end'
// When Data is returned, it's referring to a row of data
// when End is returned, it means the file is done processing
// So we will need to handle both of these.
// NOTE: a google search for "nodejs read csv" file will direct
// you to similar instructions. That's what I did :)
// Example: https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
fs.createReadStream(inputFile)
.pipe(csvRead())
.on('data', row => {
  // Each time a row is read, anything inside this block will be
  // executed. So this is where the logic of our work will go.
  // You are going to see references to the "Helpers" for the first time.
  // Feel free to jump into "helpers.js" and take a look at what we are
  // doing when we call those functions.
    let compiledRows = helpers.extractMultiRowsFromRow(row)
    helpers.addCompiledRows(compiledRows)
})
.on('end', () => {
  // Once all of the records have been read, and everything is done
  // then this block fo text will be excuted. We will use our helpers
  // function to write the file to disk. 
  helpers.outputFile()
})
