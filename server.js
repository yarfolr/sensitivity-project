const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.static('public'))

// Получение чисел
app.get('/api/get-numbers', (req, res) => {
	fs.readFile(
		path.join(__dirname, 'public/numbers.txt'),
		'utf8',
		(err, data) => {
			if (err) {
				console.error('Failed to read numbers:', err)
				return res.status(500).send('12345')
			}
			res.send(data.trim() || '12345')
		}
	)
})

// Обновление чисел
app.post('/api/update-numbers', (req, res) => {
	const newNumbers = req.body.numbers

	fs.writeFile(path.join(__dirname, 'public/numbers.txt'), newNumbers, err => {
		if (err) {
			console.error('Failed to update numbers:', err)
			return res.status(500).send('Error updating numbers')
		}
		res.status(200).send('Numbers updated')
	})
})

// Запуск сервера
app.listen(process.env.PORT || 3000, () => {
	console.log(`Server running on port ${process.env.PORT || 3000}`)
})
