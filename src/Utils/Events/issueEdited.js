const {MessageEmbed} = require("discord.js")
const {_shortner} = require("../shortner")

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const issueEdited = async (embed, body) => {
    const {
        issue,
        changes
    } = body

    let embedS = embed
    .setAuthor({ name: issue.user.login, iconURL: issue.user.avatar_url, url: issue.user.html_url })
    .setURL(issue.html_url)
    .setColor("YELLOW")
    .setFooter({ text: `Edited` })
    .setTimestamp(issue.updated_at)

    if (changes?.body?.from && changes?.body?.from != issue.body) {
        embedS.addFields({ name: "From", value: `${_shortner(changes.body.from)}` }, { name: "To", value: `${_shortner(issue.body)}` }).setTitle(`Issue Edited: ${issue.title} (Body)`)
    }

    if (changes?.title?.from && changes?.title?.from != issue.title) {
        embedS.addFields({ name: "From", value: `${changes.title.from}` }, { name: "To", value: `${issue.title}` }).setTitle(`Issue Edited: ${issue.title} (Title)`)
    }

    if (changes?.title?.from == issue.title && changes?.body?.from == issue.body) {
        embedS.setDescription("No changes made that were noticeable").setTitle(`Issue Edited: ${issue.title} (Unkown)`)
    }

    return embedS
}

module.exports = {
    issueEdited
}