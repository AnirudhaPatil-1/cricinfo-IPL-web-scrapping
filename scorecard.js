const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        extractMatchDetails(html);
    }
}

function extractMatchDetails(html){
    //venue details - location, date
    let $ = cheerio.load(html);
    let resultBoxArr = $(".ds-p-0");
    // console.log(resultBoxArr.length); //9
    let resultBox = $(resultBoxArr[0]);
    // console.log(resultBox.length); //1

    // let resultBoxHtml = $(resultBox).html();
    // console.log(resultBoxHtml);
    //EXTRACTED THE HTML FOR result box and created file "tempResultBoxhtml.html"
    //using to narrow search
    let venueDetailsArr = $(resultBox).find(".ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid");
    let venueDetails = $(venueDetailsArr[0]).text(); // 1st Match (N), Abu Dhabi, September 19, 2020, Indian Premier League
    // console.log(venueDetails);
    let strArr = venueDetails.split(",");
    let venue = strArr[1].trim();
    let date = strArr[2].trim();
    let result = $(resultBox).find(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title>span").text().trim();
    // console.log(result.length);
    // console.log(result);
    // console.log(venue);
    // console.log(date);

    let teamsBlock = $(".ds-w-full.ds-bg-fill-content-prime.ds-overflow-hidden.ds-rounded-xl.ds-border.ds-border-line.ds-mb-4 .ds-p-0");
    // console.log(teamsBlock.length); //8 
    //we require 0 and 1 index block
    let htmlStr = "";
    for(let i = 0; i < 2; i++){
        htmlStr += $(teamsBlock[i]).html();
    }
    console.log(htmlStr);
    //create the required short html file teams.html



}
