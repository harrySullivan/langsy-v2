const fs = require('fs')

var booksCache = {}

const preload = fs.readdirSync("../books-tokenized").map(async bookfile => {
	const execution = new Promise((resolve) => {
		fs.readFile(`../books-tokenized/${bookfile}`, (err, content) => {
			resolve(content.toString().split('\n'))
		})
	})

	booksCache[bookfile] = await execution
})

const findInBooks = (word) => {
	word = word.replace('\r', '')
	console.log(word)
	const locations = Object.keys(booksCache).map((key) => {
		const bookContent =  booksCache[key]

		const locations = bookContent.map((line, index) => line.indexOf(word) !== -1 ? index : null).filter(x => x !== null)
		var data = {}
		data[key] = locations
		return data
	})
	return locations
}

Promise.all(preload).then(() => {
	// console.log(booksCache)
	fs.readdirSync("../language-content").forEach(dir => {
		fs.readFile(`../language-content/${dir}/words.txt`, (err, content) => {
			const words = content.toString().split('\n')
			const locations = words.map(word => { return findInBooks(word) })
			const formattedLocations = locations.map(l => JSON.stringify(l))
			fs.writeFile(`../language-content/${dir}/locations.txt`, formattedLocations.join('\n'), console.log)
		})
	})
})



