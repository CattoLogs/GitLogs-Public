const {MessageEmbed} = require("discord.js")

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const repositoryUnarchived = async (embed, body) => {
    const {
        repository,
        sender
    } = body

    const embedS = embed
        .setAuthor({ name: sender.login, iconURL: sender.avatar_url, url: sender.html_url })
        .setTitle(`Repository Unarchived: ${repository.name}`)
        .setURL(repository.html_url)
        .setDescription(`${repository.description ? repository.description : "No description"}`)
        .setColor("GREEN")
        .addField("Status", `${repository.private ? "Private" : "Public"}`)
    return embedS
}

module.exports = {
    repositoryUnarchived
}