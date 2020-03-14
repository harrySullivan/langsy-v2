const fs = require('fs')

const regex = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\;|\!)\s/gm;

fs.readdirSync("../books-raw").forEach(filename => {
	fs.readFile(`../books-raw/${filename}`, 'utf8', (err, contents) => {
		const tokenized = contents.toString().split(regex).map(s => s.replace(/(\n+|\r+)/g, " ").trim()).join('\n')
		fs.writeFile(`../books-tokenized/${filename}`, tokenized, 'utf8', console.log)
	})
})