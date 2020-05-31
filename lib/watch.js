const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const chalk = require('chalk')
const less = require('less')

function convertExt(fpath) {
    return fpath.replace(/(.less|.css)$/, '.wxss')
}
// async: true
function writeFile(fpath) {
    let content = fs.readFileSync(fpath, 'utf-8')
    less.render(content, {
        filename: path.resolve(fpath),
        async: false,
        fileAsync: false
    }).then(({ css, map, imports }) => {
        console.log(imports)
        fs.writeFileSync(convertExt(fpath), css)
    }).catch(error => {
        console.log()
        console.log(chalk.bgRed.white(error))
    })
}

function log(msg, color) {
    console.log(chalk[color](msg))
}

module.exports = dpath => {
    let len = dpath.length - 1
    if (dpath[len] === '\\') dpath = dpath.substring(0, len)
    chokidar.watch([`${dpath}/**/*.less`, `${dpath}/**/*.css`])
        .on('add', fpath => {
            writeFile(fpath)
            log(`Add ${fpath} file success!`, 'green')
        })
        .on('change', fpath => {
            writeFile(fpath)
            log(`Change ${fpath} file success!`, 'blue')
        })
        .on('unlink', fpath => {
            fs.unlinkSync(convertExt(fpath))
            log(`Unlink ${fpath} file success!`, 'red')
        })
}