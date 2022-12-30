// const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");
//home page
function processScoreCardCatchUrl(url){
    request(url, cb);
}

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
    let venue = strArr[1];
    //trim venue
    let date = strArr[2];
    //trim date
    let result = $(resultBox).find(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title>span").text().trim();
    // console.log(result.length);
    // console.log(result);
    // console.log(venue);
    // console.log(date);

    let innings = $(".ds-w-full.ds-bg-fill-content-prime.ds-overflow-hidden.ds-rounded-xl.ds-border.ds-border-line.ds-mb-4");
    // console.log(innings.length); //10 
    // we require 0 and 1 index block
    // let htmlStr  = "";
    for(let i = 0; i < 2; i++){
        // htmlStr += $(innings[i]).html();
        let teamName = $(innings[i]).find(".ds-text-title-xs.ds-font-bold.ds-capitalize").text().trim();
        // console.log(`index i: ${i}`);
        // console.log(teamName);
        let oppIndex = i == 0?1:0;
        let oppTeamName = $(innings[oppIndex]).find(".ds-text-title-xs.ds-font-bold.ds-capitalize").text().trim();
        // console.log(oppTeamName);
        console.log(`${venue}| ${date}| ${teamName}| ${oppTeamName}| ${result} `);

        let currInning =  $(innings[i]);
        let allRows = currInning.find(".ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table tbody tr");
        // console.log(allRows.length);
        for(let j = 0; j < allRows.length; j++){
            let allCols = $(allRows[j]).find("td");
            // console.log(allCols.length);
            // console.log( $(allCols[0]).text());

            //***CAUTION => .hasClass("don't use .class format.  use class1 class2 format")***
            let isWorthy = $(allCols[0]).find("a").hasClass("ds-inline-flex ds-items-start ds-leading-none");
            // console.log(isWorthy);
            if(isWorthy == true){
                //to find -> batsmen name Runs	Balls	4s	6s	SR(strike rate)
                let playerName = $(allCols[0]).text().trim();
                // console.log(playerName);
                //*req para @ index:  runs - 2, balls - 3, 4s - 5, 6s - 6, sr - 7 *
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours =  $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let strikeRate = $(allCols[7]).text().trim();
                console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${strikeRate}`);




            }
        }


    }
    // console.log(htmlStr);
    //create the required short html file teams.html



}

module.exports = {
    pSCCU: processScoreCardCatchUrl
}
