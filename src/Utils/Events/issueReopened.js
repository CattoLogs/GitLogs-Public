const {MessageEmbed} = require("discord.js")
const {_shortner} = require("../shortner")
/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const issueReopened = async (embed, body) => {
    const {
        issue
    } = body

    let embedS = embed
    .setAuthor({ name: issue.user.login, iconURL: issue.user.avatar_url, url: issue.user.html_url })
    .setTitle(`Issue Reopened: ${issue.title}`)
    .setURL(issue.html_url)
    .setDescription(`${_shortner(issue.body)}`)
    .setColor("PURPLE")
    .setFooter({ text: `Reopened` })
    .setTimestamp(issue.created_at)

    return embedS
}

module.exports = {
    issueReopened
}