const path = require('path');
const fs = require('fs');

const file = path.join(__dirname,"../data/registry.json");
const programData = {
    name: "Not a XP Logger",
    version: "1.0.0",
    adifVersion: "3.1.4"
}

const services = {
    json: {
        read: () => {
            let data = fs.readFileSync(file, "utf8");
            let results = JSON.parse(data);
            return results;
        },
        write: (data) => {
            fs.writeFileSync(file, JSON.stringify(data, null, 2));
            return true;
        }
    },
    adi: {
        parseToJson: (adi) => {
            let parsing = {
                header: {},
                body: []
            };
    
            // Separando el header
            adi.split("<EOH>")[0].replace(/\n/g,"").replace(/\r/g,"").split("<").forEach((entry) =>{
                let entryFormatted = entry.trim();
                let tag = entryFormatted.split(":")[0] ? entryFormatted.split(":")[0].trim() : "";
                let value = entryFormatted.split(">")[1] ? entryFormatted.split(">")[1].trim() : undefined;
                if (tag != "" && !tag.includes(" ") && value != undefined) {
                    parsing.header[tag] = value;
                }
            })
    
            // Separando el body
            adi.split("<EOH>")[1].replace(/\n/g,"").replace(/\r/g,"").split("<EOR>").forEach((log) =>{
                let newQso = {};
                log.split("<").forEach((entry) =>{
                    let entryFormatted = entry.trim();
                    let tag = entryFormatted.split(":")[0] ? entryFormatted.split(":")[0].trim() : "";
                    let value = entryFormatted.split(">")[1] ? entryFormatted.split(">")[1].trim() : undefined;
                    if (tag != "" && !tag.includes(" ") && value != undefined && tag != "EOF>") {
                        newQso[tag] = value;
                    }
                });
    
                if (Object.keys(newQso).length > 0) {
                    parsing.body.push(newQso);
                }
            })
            return parsing;
        },
        generate: (jsonData) => {
            let adi = ""

            let date = new Date(Date.now());
            let thisDate = `${date.getFullYear()}${String(date.getMonth()+1).length == 1 ? 0+String(date.getMonth()+1) : date.getMonth()+1}${date.getDate()} ${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
            adi += `<PROGRAMID:${programData.name.length}>${programData.name}\r\n<PROGRAMVERSION:${programData.version.length}>${programData.version}\r\n<CREATED_TIMESTAMP:${thisDate.length}>${thisDate}\r\n<ADIF_VER:${programData.adifVersion.length}>${programData.adifVersion}\r\n<EOH>`

            // Parseando body a formato adi
            jsonData.body.forEach((entry,z) =>{
                Object.values(entry).forEach((key,i) =>{
                    if (i != (Object.values(entry).length - 1)) {
                        adi += `<${Object.keys(entry)[i]}:${key.length}>${key}`;
                    } else {
                        adi += `<${Object.keys(entry)[i]}:${key.length}>${key}<EOR>\r\n`;
                    }
                });
                if (z == (jsonData.body.length - 1)) {
                    adi += `<EOF>`;
                }
            })
            // console.log(adi);
            return adi;
        }
    }
}

module.exports = services;