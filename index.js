require("dotenv").config();

const fs = require("node:fs")

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());

const {
    push,
    repository_edited,
    member_added,
    create,
    repository_unarchived,
    repository_archived,
    repository_deleted,
    repository_created,
    member_invited,
    releasePublished,
    issueReopened,
    issueEdited,
    issueClosed,
    issueCreated,
    verifyGithubPayload
} = require('./Utils.js');


const {
    WebhookClient,
    MessageEmbed
} = require("discord.js"),
    githubclient = new WebhookClient({ url: process.env.webhook })

app.post("/github", verifyGithubPayload, async (req, res) => {
    try {
        res.setHeader("X-Powered-By", "CattoLogs")

        const event = req.headers['x-github-event'],
            eventName = `${event}${req.body.action ? "-" + req.body.action : ""}`;

        fs.writeFileSync(`./Events/github-${eventName}.json`, JSON.stringify(req.body, null, 4));


        const eventData = {
            "issues-reopened": issueReopened,
            "issues-edited": issueEdited,
            "issues-closed": issueClosed,
            "issues-opened": issueCreated,
            "release-published": releasePublished,
            "push": push,
           // "create": create,
            "organization-member_invited": member_invited,
           // "organization-member_added": member_added,
            "repository-created": repository_created,
            // "repository-deleted": repository_deleted,
            // "repository-archived": repository_archived,
            // "repository-unarchived": repository_unarchived,
        }

        let embed = new MessageEmbed();
        if (eventData[eventName]) {
            embed = await eventData[eventName](embed, req.body);
        } else {
            //embed.setTitle(`${event}`).setDescription(`Debug:\nNo function for \`${eventName}\``).setColor("RED");
            return res.status(200).send("No function for " + eventName);
        }

        githubclient.send({
            embeds: [embed],
            username: req.body.repository ? req.body.repository.full_name : "Github",
            avatarURL: req.body.organization.avatar_url
        })

        res.send("Successfully posted to Discord");

    } catch (err) {
        console.log(err);
        return res.status(500).send({error: true, message: err.message});
    }
})

app.listen(process.env.port, () => {
    console.log('listening on port ' + process.env.port);
})