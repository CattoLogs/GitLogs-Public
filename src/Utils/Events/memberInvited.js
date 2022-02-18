const {MessageEmbed} = require("discord.js")

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const memberInvited = async (embed, body) => {
    const {
        invitation,
        sender,
        organization
    } = body

    let embedS = embed
        .setAuthor({ name: sender.login, iconURL: sender.avatar_url, url: sender.html_url })
        .setTitle(`Invited to ${organization.login}`)
        .setURL(organization.url.replace("api.", ""))
        .setDescription(`${invitation.inviter.login} invited ${invitation.login} to the repository`)
        .setColor("YELLOW")
        .setFooter({ text: `Invited` })
        .setTimestamp(invitation.created_at)

    return embedS
}

module.exports = {
    memberInvited
}