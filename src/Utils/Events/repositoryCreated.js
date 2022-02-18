const {MessageEmbed} = require("discord.js")

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const repositoryCreated = async (embed, body) => {
    const {
        repository,
        sender
    } = body

    let embedS = embed
        .setAuthor({ name: sender.login, iconURL: sender.avatar_url, url: sender.html_url })
        .setTitle(`Repository Created: ${repository.name}`)
        .setURL(repository.html_url)
        .setDescription(`${repository.description ? repository.description : "No description"}`)
        .setColor("GREEN")
        .setFooter({ text: `Created` })
        .setTimestamp(repository.created_at)

    return embedS
}

module.exports = {
    repositoryCreated
}