const {MessageEmbed} = require("discord.js")

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const releasePublished = async (embed, body) => {
    const {
        release
    } = body

    let embedS = embed
    .setAuthor({ name: release.author.login, iconURL: release.author.avatar_url, url: release.author.html_url })
    .setTitle(`Release Published: ${release.name}`)
    .setURL(release.html_url)
    .setDescription(`${(release.body)}`)
    .setColor("GREEN")
    .setFooter({ text: `Published` })
    .setTimestamp(release.published_at)

    return embedS
}

module.exports = {
    releasePublished
}