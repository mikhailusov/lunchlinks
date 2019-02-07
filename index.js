require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

// Creates express app
const app = express();
// The port used for Express server
const PORT = 3000;
// Starts server
app.listen(process.env.PORT || PORT, function() {
  console.log('Bot is listening on port ' + PORT);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  var data = {form: {
    token: process.env.SLACK_AUTH_TOKEN,
    channel: "#lunchlinks",
    text: "Hi! :wave: \n I'm your new bot."
  }};
  request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
    // Sends welcome message
    res.json();
    // console.log(response)
  });
});

app.post('/optin', (req, res) => {
  var data = {
  trigger_id: req.trigger_id,
  dialog: {
    callback_id: "ryde-46e2b0",
    title: "Request a Ride",
    submit_label: "Request",
    notify_on_cancel: true,
    state: "Limo",
    elements: [
        {
            type: "text",
            label: "Pickup Location",
            name: "loc_origin"
        },
        {
            type: "text",
            label: "Dropoff Location",
            name: "loc_destination"
        }
    ]
  }
};
var headers = {
    'Content-Type' : 'application/json',
    'Authorization:': process.env.SLACK_AUTH_TOKEN
};
  request.post({ url: 'https://slack.com/api/dialog.open', form: data, headers: headers }, function (error, response, body) {
    // Sends welcome message
    res.json();
    console.log(response.body)
  });
});
