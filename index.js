require("dotenv").config();

const fs = require("node:fs")

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());

const {
    push,
    repository_edited, // Not Finished
    member_added, // Not Finished
    create, // Not Finished
    repository_unarchived, // Not Finished
    repository_archived, // Not Finished
    repository_deleted, // Not Finished
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

            const eventData = {
                "issues-reopened": issueReopened,
                "issues-edited": issueEdited,
                "issues-closed": issueClosed,
                "issues-opened": issueCreated,
                "release-published": releasePublished,
                "push": push,
                "organization-member_invited": member_invited,
                "repository-created": repository_created,
            }
            
            let embed = new MessageEmbed();
            if (eventData[eventName]) {
                embed = await eventData[eventName](embed, req.body);
            } else {
                if(process.env.debug) {
                fs.writeFileSync(`./Events/github-${eventName}.json`, JSON.stringify(req.body, null, 4));
                embed.setTitle(`${event}`).setDescription(`Debug:\nNo function for \`${eventName}\``).setColor("RED");
            } else {
                return res.status(200).send("No function for " + eventName);
            }
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
    console.log(`Listening on port ${process.env.port} ${process.env.debug ? "(Debug Mode)" : ""}`);
})