/**
 * Created by Sarat Chandra on 5/24/2016.
 */
var request = require('request');
var cheerio = require('cheerio');

// When no arguments are provided
if (process.argv.length <= 2) {
    //throw Error("Arguments missing \nUsage: node script [page-number] keyword");
    console.error("Arguments missing \nUsage: node script [page-number] keyword");
    process.exit(-1);
}

// Query type 1: program <keyword>
if (process.argv.length == 3){
    query1();
}

// Query type 2: program <page number> <keyword>
if (process.argv.length == 4){
    query2();
}

// Query 1: Find number of search results for a given keyword
function query1(){
    console.log("Searching for keyword: "+process.argv[2]);
    // Making user input keyword URL compatible
    var keyword = process.argv[2].replace(/\s/g,"+");

    request('http://www.shopping.com/products?KW=' + keyword, function (error, response, body) {
        if (error){
            throw Error(error);
        }
        if (response.statusCode !== 200) {
            return console.log("Returned response code = " + response.statusCode);
        }
        if (!error && response.statusCode === 200){
            var $ = cheerio.load(body);
            var result = $('span.numTotalResults').text();
            matched = result.match(/of\s(\d*\+?)\n/);
            console.log("Number of results returned = " + matched[1]);
        }
    })
}

// Query 2: Find all results for a given keyword on a specified page
function query2(){

}