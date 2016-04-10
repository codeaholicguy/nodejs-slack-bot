var Botkit = require('botkit')

var controller = Botkit.slackbot({
  debug: true
})

controller.spawn({
  token: process.env.SLACK_API_TOKEN,
}).startRTM()

controller.hears(
  ['xin chào', 'chào mày'],
  ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'ờ chào ' + user.name + '!')
        } else {
            bot.reply(message, 'chào!')
        }
    })
})

controller.hears(
  ['tên mày là gì?'],
  ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    bot.reply(message, 'tao là <@' + bot.identity.name +'>, còn mày?')
})

controller.hears(
  ['mày có thể gọi tao là (.*)'],
  ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    var name = message.match[1]
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            }
        }
        user.name = name
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'ờ, từ giờ tao sẽ gọi mày là ' + user.name)
        })
    })
})

controller.hears(
  ['mày biết tao là ai rồi chứ?'],
  ['direct_message', 'direct_mention', 'mention'],
  function(bot, message) {
    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'mày là ' + user.name + ' chứ gì')
        } else {
            bot.reply(message, 'tao éo biết, mày là thằng éo nào?')
        }
    })
})
