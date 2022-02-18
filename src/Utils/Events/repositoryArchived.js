const {MessageEmbed} = require("discord.js")

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const repositoryArchived = async (embed, body) => {
    const {
        repository,
        sender
    } = body

    const embedS = embed
        .setAuthor({ name: sender.login, iconURL: sender.avatar_url, url: sender.html_url })
        .setTitle(`Repository Archived: ${repository.name}`)
        .setURL(repository.html_url)
        .setDescription(`${repository.description ? repository.description : "No description"}`)
        .setColor("RED")
        .addField("Issues left opened", `${repository.open_issues_count}`)
        .addField("Status", `${repository.private ? "Private" : "Public"}`)
    return embedS
}

module.exports = {
    repositoryArchived
}