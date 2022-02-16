const crypto = require('crypto')
const {
    MessageEmbed
} = require('discord.js')


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

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
const issueCreated = async (embed, body) => {
    const {
        issue
    } = body

    let embedS = embed
    .setAuthor({ name: issue.user.login, iconURL: issue.user.avatar_url, url: issue.user.html_url })
    .setTitle(`Issue Created #${issue.number}: ${issue.title}`)
    .setURL(issue.html_url)
    .setDescription(`${_shortner(issue.body)}`)
    .setColor("ORANGE")
    .setFooter({ text: `Created` })
    .setTimestamp(issue.created_at)

    return embedS
}

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

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
const push = async (embed, body) => {
    const {
        repository,
        ref,
        commits,
        sender,
        compare
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

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
const member_invited = async (embed, body) => {
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

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
const repository_unarchived = async (embed, body) => {
    const {
        repository,
        sender
    } = body

    const embedS = embed
        
}

/**
 * @param {MessageEmbed} embed 
 * @param {Object} body 
 */
const repository_created = async (embed, body) => {
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


const _createComparisonSignature = (body) => {
    const hmac = crypto.createHmac('sha1', process.env.secret)
    const self_signature = hmac.update(JSON.stringify(body)).digest('hex')
    return `sha1=${self_signature}`
}

const _compareSignatures = (signature, comparison_signature) => {
    const source = Buffer.from(signature)
    const comparison = Buffer.from(comparison_signature)
    return crypto.timingSafeEqual(source, comparison)
}

const verifyGithubPayload = (req, res, next) => {
    const {
        headers,
        body
    } = req

    const signature = headers['x-hub-signature']
    const comparison_signature = _createComparisonSignature(body)

    if (!_compareSignatures(signature, comparison_signature)) {
        return res.status(401).send('Mismatched signatures')
    }

    const {
        action,
        ...payload
    } = body

    req.event_type = headers['x-github-event']
    req.action = action
    req.payload = payload
    next()
}


module.exports = {
    issueReopened,
    issueEdited,
    issueClosed,
    issueCreated,
    releasePublished,
    verifyGithubPayload,
    push,
    member_invited,
    repository_created
}

function _shortner(text) {
    if (text && text.length > 500) {
        return text.substring(0, 500) + "..."
    } else {
        return text ? text : "No description"
    }
}

