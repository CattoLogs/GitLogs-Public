# GitLogs
Git Logs is a Simple Github Webhook logger for Discord 

*but wait you may be thinking "Doesn't discord already have a webhook thing for Github?"*  
Yes! But... It doesn't send everything that Github's Webhook gives. So this posts those cool things!

## Setting Up
To set this project up [Install Nodejs](https://nodejs.org/en/) 16 and [Git](https://git-scm.com/) once you got those installed follow the steps under

1) Edit example.env and fill in the details
2) Run the commands below
```sh
git clone https://github.com/CattoLogs/GitLogs-Public
cd GitLogs-Public
npm i
node .
```
3) Go to https://github.com/USERNAME/REPO_NAME/settings/hooks
4) Add a New webhook and the URL should be http(s)://domain/ip.com/github
5) Set a Secret (**MAKE SURE ITS THE SAME AS IN THE .ENV**)
6) Click send me everything (or pick what you would like)

Then you should be done :D It should start sending the embeds :)


# ToDo
- [x] More Events
- [x] Console Logging
- [ ] Better Embeds
- [ ] Whitelist/Blacklist events JSON file
- [ ] Add Comments
- [ ] All Events