let fs = require("fs");
let xlsx = require("xlsx");
// let buffer = fs.readFileSync("./example.json");
// console.log(buffer);
// console.log("---------------------------");
// let data = JSON.parse(buffer);
// console.log(data);
// let data = require("./example.json");
// console.log(data);
// data.push(
//     {
//         "name":"Thor",
//         "last name":"Rogers",
//         "isAvenger":true,
//         "friens":["Bruce","Neter","Natasha"],
//         "age":45,
//         "address":{
//             "city":"New York",
//             "state":"Manhattan"
//         }
//     }
// );
// let stringedData =  JSON.stringify(data);
// fs.writeFileSync("./example.JSON", stringedData);

//XLSX EXCEL COMMANDS
//creates new workbook
// let newWB = xlsx.utils.book_new();
// //creates json data -> converted to excel format
// let newWS = xlsx.utils.json_to_sheet(json);
// //-> newWB, ws, sheet name
// xlsx.utils.book_append_sheet(newWB, newWS, name);
// //filePath
// xlsx.writeFile(newWB, filePath);

let newWB = xlsx.utils.book_new();
let newWS = xlsx.utils.json_to_sheet(data);
xlsx.utils.book_append_sheet(newWB, newWS, "sheet-1");
xlsx.writeFile(newWB, "abx.xlsx");