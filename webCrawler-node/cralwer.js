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

    request('http://www.shopping.com/products?KW=' + keyword, function (error, response, body) {
        if (error){
            throw Error(error);
        }
        if (response.statusCode !== 200) {
            return console.log("Returned response code = " + response.statusCode);
        }
        if (!error && response.statusCode === 200){
            var $ = cheerio.load(body);

            var body_id = $('body').attr("id");
            if (body_id === "noResults") {
                console.log("Sorry. No results returned");
            }
            else {
                var result = $('span.numTotalResults').text();
                matched = result.match(/of\s(\d*\+?)\n/);
                console.log("Number of results returned = " + matched[1]);
            }
        }
    })
}

// Query 2: Find all results for a given keyword on a specified page
function query2(){
    var given_keyword = process.argv[3];
    var page_num = process.argv[2];

    console.log("Searching for keyword '"+given_keyword+"' at page number "+page_num);

    var keyword = given_keyword.replace(/\s/g,"+");

    request('http://www.shopping.com/products~PG-' + page_num + '?KW=' + keyword, function (error, response, body) {
        if (error){
            throw Error(error);
        }
        else if (response.statusCode !== 200) {
            console.log("Returned response code = " + response.statusCode);
        }
        else if (!error && response.statusCode === 200) {
            var $ = cheerio.load(body);
            var body_id = $('body').attr("id");

            if (body_id === "noResults") {
                console.log("Sorry. No results returned")
            }
            else {
                $('div.gridBox > div.gridItemBtm').each(function (index) {
                    var results = $(this).find('a.productName > span').attr('title');
                    console.log(index + " " + results);
                })
            }
        }
    });
}