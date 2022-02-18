require("dotenv").config();

const fs = require("node:fs"),
    chalk = require("chalk"),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());

const {
    issueClosed,
    issueCreated,
    issueEdited,
    issueReopened,
    memberInvited,
    ping,
    push,
    releasePublished,
    repositoryCreated,
    repositoryUnarchived,
    repositoryArchived,
    verifyGithubPayload
} = require('./Utils/Events/events.js');


const { WebhookClient, MessageEmbed } = require("discord.js"),
    githubclient = new WebhookClient({ url: process.env.webhook })

app.post("/github", verifyGithubPayload, async (req, res) => {
    try {
        let then = Date.now()
        res.setHeader("X-Powered-By", "CattoLogs")

        const event = req.headers['x-github-event'],
            eventName = `${event}${req.body.action ? "-" + req.body.action : ""}`;

        const eventData = {
            "issues-reopened": issueReopened,
            "issues-edited": issueEdited,
            "issues-closed": issueClosed,
            "issues-opened": issueCreated,
            "release-published": releasePublished,
            "ping": ping,
            "push": push,
            "organization-member_invited": memberInvited,
            "repository-created": repositoryCreated,
            "repository-unarchived": repositoryUnarchived,
            "repository-archived": repositoryArchived
        }

        let embed = new MessageEmbed(),
            edata = eventData[eventName]

        if (edata) {
            embed = await edata(embed, req.body);
        } else if (process.env.debug == "true") {
            if (!fs.existsSync("./Debug")) throw Error("No Debug folder found")

            fs.writeFileSync(`./Debug/github-${eventName}.json`, JSON.stringify(req.body, null, 4));
            embed.setTitle(`${event}`).setDescription(`Debug:\nNo function for \`${eventName}\``).setColor("RED");
        } else {
            return res.status(404).send({
                error: true,
                message: `No function for ${eventName}`,
                timeTaken: Math.round((Date.now() - then) / 1000)
            });
        }


        githubclient.send({
            embeds: [embed],
            username: req.body.repository ? req.body.repository.full_name : "Github",
            avatarURL: req.body.organization.avatar_url
        })

        res.send({
            error: false,
            message: "Successfully sent to Discord",
            timeTaken: (Math.round(Date.now() - then) / 1000).toFixed(3)
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error: true,
            message: err.message,
            timeTaken: null
        });
    }
})

app.listen(process.env.port, () => {
    console.log(`${chalk.green("[GitLogs]")} Listening on port ${process.env.port} `);
    if(process.env.debug == "true") console.log(`${chalk.yellow("[GitLogs]")} Debug mode is on`);
})