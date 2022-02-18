const {MessageEmbed} = require("discord.js")

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const issueClosed = async (embed, body) => {
    const {
        issue
    } = body

    let embedS = embed
    .setAuthor({ name: issue.user.login, iconURL: issue.user.avatar_url, url: issue.user.html_url })
    .setTitle(`Issue Closed: ${issue.title}`)
    .setURL(issue.html_url)
    .setColor("RED")
    .setFooter({ text: `Closed` })
    .setTimestamp(issue.closed_at)

    return embedS
}

module.exports = {
    issueClosed
}