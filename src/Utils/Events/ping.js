const {MessageEmbed} = require("discord.js")

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const ping = async (embed, body) => {
     const embedS = embed
        .setAuthor({ name: body.sender.login, iconURL: body.sender.avatar_url, url: body.sender.html_url })
        .setTitle("Works!")
        .setDescription("If you see this message, it means that the Webhook is working!")
        .setColor("GREEN")
    return embedS
 }


module.exports = {
    ping
}