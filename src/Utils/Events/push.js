const {MessageEmbed} = require("discord.js")

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
 const push = async (embed, body) => {
    const {
        repository,
        ref,
        commits,
        sender
    } = body

    let embedS = embed
    .setAuthor({ name: sender.login, iconURL: sender.avatar_url, url: sender.html_url })
    .setTitle(`Push to ${ref.split("/")[2]} | ${commits.length} New ${commits.length > 1 ? "Commits" : "Commit"}`)
    .setURL(repository.html_url)
    .setDescription(`${commits.map(commit => `[${commit.id.slice(0, 8)}](${commit.url}) ${commit.message.toString().replaceAll("\n", "")} - ${commit.committer.username}${commits.length > 1 ? "\n" : ""}`).join("")}`)
    .setColor("BLUE")
    .setFooter({ text: `Pushed` })
    .setTimestamp(commits[0].timestamp)

    return embedS
}

module.exports = {
    push
}