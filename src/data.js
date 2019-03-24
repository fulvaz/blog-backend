const fs = require('fs');
const path = require('path');

const dirPath = path.resolve(__dirname, 'blog');
const fileNames = fs.readdirSync(dirPath);

const contents = fileNames
    .filter(e => e.endsWith('.md'))
    .map(e => {
        const content = fs.readFileSync(path.resolve(dirPath, e), {
            encoding: 'utf8',
        });
        const regTitle = new RegExp(/^@@@title:([^@\n]+)/gm);
        const regDate = new RegExp(/^@@@date:([^@\n]+)/gm);
        const title = regTitle.exec(content)[1];
        const date = regDate.exec(content)[1];
        return {
            title,
            date,
            content,
        };
    });

module.exports = contents;
