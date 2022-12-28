const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
//data to fill in excel - venue, data, opponent, result, runs, balls, fours sexes, sr
const request = require("request");
const cheerio = require("cheerio");
request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
        // console.log(html);
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html);
    let resultBoxs = $(".ds-w-full.ds-bg-fill-content-prime.ds-overflow-hidden.ds-rounded-xl.ds-border.ds-border-line .ds-border-t.ds-border-line.ds-text-center.ds-py-2");
    // console.log(resultBoxs.length); //4
    let resultBox = $(resultBoxs[0]);
    // console.log(resultBox.length); //1
    let resultLink = $(resultBox).find("a").attr("href");
    let resultLinkFull = `https://www.espncricinfo.com${resultLink}`;
    // console.log(resultLinkFull);
    getAllMatchesLink(resultLinkFull);
}

function getAllMatchesLink(url){
    request(url, cb);
    function cb(err, response, html){
        if(err){
            console.log(err);
        }else{
            extractMatchesLink(html);

        }
    }
}

function extractMatchesLink(html){
    let $ = cheerio.load(html);
    //60 matches on ipl matches page
    let matchesArr = $(".ds-grow.ds-px-4.ds-border-r.ds-border-line-default-translucent>a");
    // console.log(matchesArr.length);

    
    let matchesUrl = [];
    for(let i = 0; i < matchesArr.length; i++){
        let matchUrl = $(matchesArr[i]).attr("href");
        // console.log(matchUrl);
        let matchFullUrl = `https://www.espncricinfo.com${matchUrl}`;
        matchesUrl.push(matchFullUrl);
        //function name prep by me
        scoreCard(matchFullUrl);
    }
    // console.log(matchesUrl.length); //60  
    // console.log(matchesUrl); // arr of full url of matches
}

//function name prep by me
function scoreCard(url){
    request(url, cb);
    function cb(err, response, html){
        if(err){
            console.log(err);
        }else{
            //function prep by me
            prepScoreCard(html);
        }
    }
}

function prepScoreCard(html){
    let $ = cheerio.load(html);
}