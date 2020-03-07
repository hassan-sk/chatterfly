const fs = require('fs');

module.exports = {
    picUploader: (id, path, picBase64) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(path+id, picBase64, (err) => {
                if (err) reject(err)
                else resolve('done');
            })
        })
    },
    picRetriever: (id, path) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path+id+".txt", 'utf8', (err, data) => {
                if (err) reject(err)
                else {
                    resolve(data);
                };
            })
        })
    }
}


