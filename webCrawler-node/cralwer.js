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

function query1(){

}

function query2(){
    
}