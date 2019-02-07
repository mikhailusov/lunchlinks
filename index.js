require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const { WebClient} = require('@slack/client');
const token = process.env.SLACK_AUTH_TOKEN;
const web = new WebClient(token);

// const conversationId = 'CFZ3JKN2F'; // lunchlinks channel
// web.chat.postMessage({ channel: conversationId, text: 'Testing postMessage' })
//   .then((res) => {
//     // `res` contains information about the posted message
//     console.log('Message sent: ', res.ts);
//   })
//   .catch(console.error);

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

app.post('/signup', (req, res) => {
  return web.chat.postMessage({
      channel: res.user_id,
      text: "To help me match you with other AppDynamos, please select all the interests you would like to be matched on.",
      attachments: [
        {
          "text": "Food",
          "fallback": "You are unable to select an interest",
          "callback_id": "interests",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
            {
              "name": "interest",
              "text": "boba",
              "type": "button",
              "value": "boba"
            },
            {
              "name": "interest",
              "text": "coffee",
              "type": "button",
              "value": "coffee"
            }
          ]
        },
        {
          "text": "Pets",
          "fallback": "You are unable to select an interest",
          "callback_id": "interests",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
            {
              "name": "interest",
              "text": "cats",
              "type": "button",
              "value": "cats"
            },
            {
              "name": "interest",
              "text": "dogs",
              "type": "button",
              "value": "dogs"
            }
          ]
        },
        {
          "text": "Hobbies",
          "fallback": "You are unable to select an interest",
          "callback_id": "interests",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
            {
              "name": "interest",
              "text": "fire dancing",
              "type": "button",
              "value": "fire_dancing"
            },
            {
              "name": "interest",
              "text": "photography",
              "type": "button",
              "value": "photography"
            },
            {
              "name": "interest",
              "text": "pixar",
              "type": "button",
              "value": "pixar"
            },
            {
              "name": "interest",
              "text": "reading",
              "type": "button",
              "value": "reading"
            },
            {
              "name": "interest",
              "text": "ultimate frisbee",
              "type": "button",
              "value": "ultimate_frisbee"
            },
            {
              "name": "interest",
              "text": "video games",
              "type": "button",
              "value": "boba"
            },
            {
              "name": "interest",
              "text": "volunteering",
              "type": "button",
              "value": "volunteering"
            },
            {
              "name": "interest",
              "text": "watches",
              "type": "button",
              "value": "watches"
            },
            {
              "name": "interest",
              "text": "wine tasting",
              "type": "button",
              "value": "wine_tasting"
            },
            {
              "name": "interest",
              "text": "wrestling",
              "type": "button",
              "value": "wrestling"
            }
          ]
        },
        {
          "text": "Professional skills",
          "fallback": "You are unable to select an interest",
          "callback_id": "interests",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions":[
            {
              "name": "interest",
              "text": "ML/AI",
              "type": "button",
              "value": "ML/AI"
            },
            {
              "name": "interest",
              "text": "public speaking",
              "type": "button",
              "value": "public_speaking"
            }
          ]
        }
      ]
  })
  .then((res) => {
    console.log('Message posted!');
  })
  .catch(console.error);
})

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
  request.post('https://slack.com/api/dialog.open', data, function (error, response, body) {
    // Sends welcome message
    res.json();
    console.log(response.body)
  });
  Use the `chat.postMessage` method to send a message from this app
});
