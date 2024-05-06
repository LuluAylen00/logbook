const path = require('path');
const fs = require('fs');

const files = require('./file-service');

const services = {
    write: (data) => {
        let arr = data;
        arr = arr.sort(function (a, b) {

            if (Number(a.QSO_DATE + a.TIME_ON) > Number(b.QSO_DATE + b.TIME_ON)) {
              return 1;
            }
            if (Number(a.QSO_DATE + a.TIME_ON) < Number(b.QSO_DATE + b.TIME_ON)) {
              return -1;
            }
            return 0;
        });
        try {
            files.json.write(arr);
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    },
    create: (data) => {
        let results = services.findAll();
        results.push(data);
        return services.write(results);
    },
    import: (data) => {
        let results = services.findAll();
        console.log(data);
        data.body.forEach((reg)=>{
            // if (reg["OPERATOR"]) {
            //     reg["NAME"] = reg["OPERATOR"];
            //     delete reg["OPERATOR"];
            // }
            results.push(reg);
        })
        // results.push(data);
        return services.write(results);
    },
    findAll: () => {
        let results = files.json.read();
        
        return results;
    },
    findById: (id) => {
        let data = services.findAll();

        return data.find(r => r.id == id);
    },
    
    deleteById: (id) => {
        let data = services.findAll();
        let filtered = data.filter(r => r.id != id);
        return services.write(filtered);
    },
    deleteAll: () => {
        let data = services.findAll();
        let filtered = [];
        return services.write(filtered);
    },
    export: () => {
        let data = services.findAll();
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const mes = fechaActual.getMonth();
        const mesFormateado = mes+1 < 10 ? `0${mes+1}` : mes+1;
        const dia = fechaActual.getDate();
        const diaFormateado = dia < 10 ? `0${dia}` : dia;
        const hora = fechaActual.getHours();
        const minutos = fechaActual.getMinutes();
        const segundos = fechaActual.getSeconds();
        let stringToWrite = `<PROGRAMID:15>Not a XP Logger\n<PROGRAMVERSION:5>1.0.0\n<CREATED_TIMESTAMP:15>${year}${mesFormateado}${diaFormateado} ${hora}${minutos}${segundos}\n<ADIF_VER:5>3.1.4\n<EOH>\n`;
        data.forEach(reg => {
            Object.keys(reg).forEach((key,i) => {
                stringToWrite += `<${key}:${key.length}>${Object.values(reg)[i]}`
            })
            stringToWrite += `<EOR>\n`
        })
        fs.writeFileSync(path.join(__dirname, '../data/data.adi'),stringToWrite);
    },
    exportClean: () => {
        services.export();
        services.deleteAll();
    }
};

module.exports = services;