const express = require('express');
const fs = require('fs');
const option_chain = require('./nse_lib');
const app = express();
const port = process.env.PORT || 8080;

app.use('ready',() => {
	console.log('Ready!');
	var CronJob = require('cron').CronJob;
	var remind = new CronJob('0 0,30 * * * *', function() {
	  console.log('check to see if dyno is on');
	}, 
	remind.start();
});
    
app.use(express.static('public'))

app.get('/', (req, res) => res.redirect('/index.html'));
app.get('/chain', async (req, res) => {
    try{
        let resp = await option_chain('NIFTY'); // can enter NIFTY / BANKNIFTY
        res.send(resp);
    }catch(err){
        res.status(500).send(err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
