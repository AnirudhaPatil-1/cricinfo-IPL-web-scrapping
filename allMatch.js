const request = require("request");
const cheerio = require("cheerio");
const ScoreCardObj = require("./scorecard");
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
        // console.log(matchFullUrl);
        //function name prep by me
        // scoreCard(matchFullUrl);
        ScoreCardObj.pSCCU(matchFullUrl);

    }
    // console.log(matchesUrl.length); //60  
    // console.log(matchesUrl); // arr of full url of matches
}
module.exports = {
    gAML: getAllMatchesLink
}