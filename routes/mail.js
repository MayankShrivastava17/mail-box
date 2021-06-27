const express = require('express')
const app = express.Router()
const cron = require('node-cron')
const nodemailer = require("nodemailer");
const Mails = require('../modals/mails')

app.post('/send-mail', async(req, res) => {
    let mail = {
        userid: res.locals.curuser.email,
        to: req.body.to,
        cc: req.body.cc,
        subject: req.body.sub,
        content: req.body.con,
        schedule: req.body.type
    }
    await Mails.create(mail);
    var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            }
        });
    var mailOptions = {
        from: process.env.MAIL,
        to: mail.to,
        cc:mail.cc,
        subject: mail.subject,
        text: mail.content,
    };
    if (req.body.type == "Recurring schedule")
    {
        cron.schedule(`${req.body.sec} * * * * *`, () => {
            transporter.sendMail(mailOptions, async function(error, info){
                if (error) {
                    console.log(error);
                }
                else
                {
                    console.log(info.messageId)
                    let user = await Mails.findOne({ userid: res.locals.curuser.email })
                    user.isSent = true
                    await user.save()
                }
            });
        })
    }
    else if (req.body.type == "Weekly schedule")
    {
        cron.schedule(`* * * * ${req.body.dayofweek}`, () => {
            transporter.sendMail(mailOptions, async function(error, info){
                if (error) {
                    console.log(error);
                }
                else
                {
                    console.log(info.messageId)
                    let user = await Mails.findOne({ userid: res.locals.curuser.email })
                    user.isSent = true
                    await user.save()
                }
            });
        })
    }
    else if (req.body.type == "Monthly schedule")
    {
        cron.schedule(`* * * ${req.body.mon} *`, () => {
            transporter.sendMail(mailOptions, async function(error, info){
                if (error) {
                    console.log(error);
                }
                else
                {
                    console.log(info.messageId)
                    let user = await Mails.findOne({ userid: res.locals.curuser.email })
                    user.isSent = true
                    await user.save()
                }
            });
        })
    }
    else if (req.body.type == "Yearly schedule")
    {
        cron.schedule(`${req.body.min} ${req.body.hours} ${req.body.day} ${req.body.mon} *`, () => {
            transporter.sendMail(mailOptions, async function(error, info){
                if (error) {
                    console.log(error);
                }
                else
                {
                    console.log(info.messageId)
                    let user = await Mails.findOne({ userid: res.locals.curuser.email })
                    user.isSent = true
                    await user.save()
                }
            });
        })
    }
    res.json({status: "success"})
})


app.get('/history', async (req, res) => {
    const mails = await Mails.find({ isSent: true })
    res.render('history', {mails: mails})
})

app.get('/delete/:id/:email/', async (req, res) => {
    const mail = await Mails.findById(req.params.id);
    let i = mail.to.map(m => m).indexOf(req.params.email)
    mail.to.splice(i, 1);
    await mail.save();
    res.redirect('/')
})

app.get('/show/:id/', async (req, res) => {
    const mail = await Mails.findById(req.params.id)
    res.render('show', {mail: mail})
})

module.exports = app