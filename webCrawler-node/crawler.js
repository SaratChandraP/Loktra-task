/**
 * Created by Sarat Chandra on 5/24/2016.
 */
var request = require('request');
var cheerio = require('cheerio');

// Checking for number of arguments passed
switch (process.argv.length){
    case 2:
        // No arguments provided
        console.error("Arguments missing \nUsage: node script [page-number] keyword");
        break;
    case 3:
        // query type 1 to search for number of results for a given keyword
        query1();
        break;
    case 4:
        // query type 2 to get all results for a keyword in specified page
        query2();
        break;
    default:
        console.log("Unknown case");
}

// Query 1: Find number of search results for a given keyword
function query1(){
    console.log("Searching for keyword: "+process.argv[2]);
    // Making user input keyword URL compatible
    var keyword = process.argv[2].replace(/\s/g,"+");

    // Sending HTTP request
    request('http://www.shopping.com/products?KW=' + keyword, function (error, response, body) {
        if (error){
            throw Error(error);
        }
        if (response.statusCode !== 200) {
            return console.log("Returned response code = " + response.statusCode);
        }
        // In case of positive response
        if (!error && response.statusCode === 200){

            // Load HTML content
            var $ = cheerio.load(body);

            // Retrieve ID of the body element
            var body_id = $('body').attr("id");

            // No results case
            if (body_id === "noResults") {
                console.log("Sorry. No results returned");
            }
            else {
                // Number of results is found in the span element of class numTotalResults
                var result = $('span.numTotalResults').text();
                // Using regex to retrieve total count
                var num_results = result.match(/of\s(\d*\+?)\n/);
                console.log("Number of results returned = " + num_results[1]);
            }
        }
    })
}

// Query 2: Find all results for a given keyword on a specified page
function query2(){
    // User input args
    var given_keyword = process.argv[3];
    var page_num = process.argv[2];

    // Check if page number is an integer
    if(!page_num.match(/^\d+/)){
        console.log("Error !! \nUsage: node script [page-number] keyword");
        console.log("Enclose keyword within quotes if it contains whitespaces");    // Probable cause
        process.exit(-1);
    }

    console.log("Searching for keyword '"+given_keyword+"' at page number "+page_num);

    // Making keyword URL compatible
    var keyword = given_keyword.replace(/\s/g,"+");

    // Sending HTTP request to specified URL with keyword and page number
    request('http://www.shopping.com/products~PG-' + page_num + '?KW=' + keyword, function (error, response, body) {
        if (error){
            throw Error(error);
        }
        else if (response.statusCode !== 200) {
            console.log("Returned response code = " + response.statusCode);
        }
        // Checking for positive response
        else if (!error && response.statusCode === 200) {
            // Load HTML content
            var $ = cheerio.load(body);

            // Retrieve ID of the body element
            var body_id = $('body').attr("id");

            // No results case
            if (body_id === "noResults") {
                console.log("Sorry. No results returned")
            }
            else {
                // Accessing elements/results with the keyword
                $('div.gridBox > div.gridItemBtm').each(function (index) {
                    // Getting title of the element/result
                    var results = $(this).find('a.productName > span').attr('title');
                    console.log(index + " " + results);
                })
            }
        }
    });
}