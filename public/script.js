const textarea = document.getElementById('numbers')
const copyBtn = document.getElementById('copyBtn')

// Загружаем числа из API
fetch('/api/get-numbers')
	.then(response => response.text())
	.then(data => {
		textarea.value = data.trim() || '12345'
	})
	.catch(err => {
		console.error('Failed to load numbers:', err)
		textarea.value = '12345'
	})

// Кнопка копирования
copyBtn.addEventListener('click', () => {
	navigator.clipboard
		.writeText(textarea.value)
		.then(() => {
			copyBtn.textContent = 'Copied!'
			setTimeout(() => {
				copyBtn.textContent = 'Copy'
			}, 2000)
		})
		.catch(err => {
			console.error('Failed to copy: ', err)
		})
})
