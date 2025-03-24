const TelegramBot = require('node-telegram-bot-api')
const fetch = require('node-fetch')

// Замени на свой новый токен от @BotFather после /revoke
const token = 'YOUR_NEW_BOT_TOKEN_HERE'
const bot = new TelegramBot(token, { polling: true })

// Замени на URL твоего сайта на Render после деплоя
const siteUrl = 'https://sensitivity-project.onrender.com'
const apiUrl = `${siteUrl}/api/update-numbers`

bot.onText(/\/start/, msg => {
	const chatId = msg.chat.id
	bot.sendMessage(chatId, 'Введи новую чувствительность:')
})

bot.on('message', async msg => {
	const chatId = msg.chat.id
	const text = msg.text

	if (text === '/start') return

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ numbers: text }),
		})
		if (response.ok) {
			bot.sendMessage(chatId, `Чувствительность изменена на сайте: ${text}`)
		} else {
			bot.sendMessage(chatId, 'Чувствительность не изменена. Произошла ошибка.')
		}
	} catch (err) {
		console.error(err)
		bot.sendMessage(chatId, 'Чувствительность не изменена. Ошибка подключения.')
	}
})

console.log('Bot is running...')
