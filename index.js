require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const { WebClient} = require('@slack/client');
const token = process.env.SLACK_AUTH_TOKEN;
const web = new WebClient(token);

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

  var form = {
    callback_id: "ryde-46e2b0",
    title: "Join lunchlinks",
    submit_label: "Join",
    notify_on_cancel: true,
    state: "Limo",
    elements: [
      {
        label: "Choose a first interest",
        name: "interest1",
        type: "select",
          "option_groups": [
            {
              "label": "Pets",
              "options": [
                {
                  "label": "Cats",
                  "value": "cats"
                },
                {
                  "label": "Dogs",
                  "value": "dogs"
                },
                {
                  "label": "Fish",
                  "value": "fish"
                }
              ]
            },
            {
              "label": "Food",
              "options": [
                {
                  "label": "Asian",
                  "value": "asian"
                },
                {
                  "label": "Boba",
                  "value": "boba"
                },
                {
                  "label": "Coffee",
                  "value": "coffee"
                },
                {
                  "label": "Italian",
                  "value": "italian"
                },
                {
                  "label": "Mexican",
                  "value": "mexican"
                }
              ]
            },
            {
              "label": "Hobbies",
              "options": [
                {
                  "label": "Card Games",
                  "value": "card_games"
                },
                {
                  "label": "Cars",
                  "value": "cars"
                },
                {
                  "label": "Fire Dancing",
                  "value": "fire_dancing"
                },
                {
                  "label": "Music",
                  "value": "music"
                },
                {
                  "label": "Photography",
                  "value": "photography"
                },
                {
                  "label": "Pixar Movies",
                  "value": "pixar_movies"
                },
                {
                  "label": "Reading",
                  "value": "reading"
                },
                {
                  "label": "Ultimate Frisbee",
                  "value": "ultimate_frisbee"
                },
                {
                  "label": "Video Games",
                  "value": "video_games"
                },
                {
                  "label": "Volunteering",
                  "value": "volunteering"
                },
                {
                  "label": "Watches",
                  "value": "watches"
                },
                {
                  "label": "Wrestling",
                  "value": "wrestling"
                }
              ]
            },
            {
              "label": "Professional Skills",
              "options": [
                {
                  "label": "Agile Practicioner",
                  "value": "agile_practicioner"
                },
                {
                  "label": "Facilitation",
                  "value": "facilitation"
                },
                {
                  "label": "ML/AI",
                  "value": "ml_ai"
                },
                {
                  "label": "Public Speaking",
                  "value": "public_speaking"
                }
              ]
            }
          ]
        }
        // {
        //   label: "Chose an interest 2",
        //   name: "interests2",
        //   type: "select",
        //   "option_groups": [
        //     {
        //       "label": "Pets",
        //       "options": [
        //         {
        //           "label": "Cats",
        //           "value": "cats"
        //         },
        //         {
        //           "label": "Dogs",
        //           "value": "dogs"
        //         },
        //         {
        //           "label": "Fish",
        //           "value": "fish"
        //         }
        //       ]
        //     },
        //     {
        //       "label": "Food",
        //       "options": [
        //         {
        //           "label": "Asian",
        //           "value": "asian"
        //         },
        //         {
        //           "label": "Boba",
        //           "value": "boba"
        //         },
        //         {
        //           "label": "Coffee",
        //           "value": "coffee"
        //         },
        //         {
        //           "label": "Italian",
        //           "value": "italian"
        //         },
        //         {
        //           "label": "Mexican",
        //           "value": "mexican"
        //         }
        //       ]
        //     },
        //     {
        //       "label": "Hobbies",
        //       "options": [
        //         {
        //           "label": "Card Games",
        //           "value": "card_games"
        //         },
        //         {
        //           "label": "Cars",
        //           "value": "cars"
        //         },
        //         {
        //           "label": "Fire Dancing",
        //           "value": "fire_dancing"
        //         },
        //         {
        //           "label": "Music",
        //           "value": "music"
        //         },
        //         {
        //           "label": "Photography",
        //           "value": "photography"
        //         },
        //         {
        //           "label": "Pixar Movies",
        //           "value": "pixar_movies"
        //         },
        //         {
        //           "label": "Reading",
        //           "value": "reading"
        //         },
        //         {
        //           "label": "Ultimate Frisbee",
        //           "value": "ultimate_frisbee"
        //         },
        //         {
        //           "label": "Video Games",
        //           "value": "video_games"
        //         },
        //         {
        //           "label": "Volunteering",
        //           "value": "volunteering"
        //         },
        //         {
        //           "label": "Watches",
        //           "value": "watches"
        //         },
        //         {
        //           "label": "Wrestling",
        //           "value": "wrestling"
        //         }
        //       ]
        //     },
        //     {
        //       "label": "Professional Skills",
        //       "options": [
        //         {
        //           "label": "Agile Practicioner",
        //           "value": "agile_practicioner"
        //         },
        //         {
        //           "label": "Facilitation",
        //           "value": "facilitation"
        //         },
        //         {
        //           "label": "ML/AI",
        //           "value": "ml_ai"
        //         },
        //         {
        //           "label": "Public Speaking",
        //           "value": "public_speaking"
        //         }
        //       ]
        //     }
        //   ]
        //   },
        // {
        //   label: "Chose an interest 3",
        //   name: "interests3",
        //   type: "select",
        //   "option_groups": [
        //     {
        //       "label": "Pets",
        //       "options": [
        //         {
        //           "label": "Cats",
        //           "value": "cats"
        //         },
        //         {
        //           "label": "Dogs",
        //           "value": "dogs"
        //         },
        //         {
        //           "label": "Fish",
        //           "value": "fish"
        //         }
        //       ]
        //     },
        //     {
        //       "label": "Food",
        //       "options": [
        //         {
        //           "label": "Asian",
        //           "value": "asian"
        //         },
        //         {
        //           "label": "Boba",
        //           "value": "boba"
        //         },
        //         {
        //           "label": "Coffee",
        //           "value": "coffee"
        //         },
        //         {
        //           "label": "Italian",
        //           "value": "italian"
        //         },
        //         {
        //           "label": "Mexican",
        //           "value": "mexican"
        //         }
        //       ]
        //     },
        //     {
        //       "label": "Hobbies",
        //       "options": [
        //         {
        //           "label": "Card Games",
        //           "value": "card_games"
        //         },
        //         {
        //           "label": "Cars",
        //           "value": "cars"
        //         },
        //         {
        //           "label": "Fire Dancing",
        //           "value": "fire_dancing"
        //         },
        //         {
        //           "label": "Music",
        //           "value": "music"
        //         },
        //         {
        //           "label": "Photography",
        //           "value": "photography"
        //         },
        //         {
        //           "label": "Pixar Movies",
        //           "value": "pixar_movies"
        //         },
        //         {
        //           "label": "Reading",
        //           "value": "reading"
        //         },
        //         {
        //           "label": "Ultimate Frisbee",
        //           "value": "ultimate_frisbee"
        //         },
        //         {
        //           "label": "Video Games",
        //           "value": "video_games"
        //         },
        //         {
        //           "label": "Volunteering",
        //           "value": "volunteering"
        //         },
        //         {
        //           "label": "Watches",
        //           "value": "watches"
        //         },
        //         {
        //           "label": "Wrestling",
        //           "value": "wrestling"
        //         }
        //       ]
        //     },
        //     {
        //       "label": "Professional Skills",
        //       "options": [
        //         {
        //           "label": "Agile Practicioner",
        //           "value": "agile_practicioner"
        //         },
        //         {
        //           "label": "Facilitation",
        //           "value": "facilitation"
        //         },
        //         {
        //           "label": "ML/AI",
        //           "value": "ml_ai"
        //         },
        //         {
        //           "label": "Public Speaking",
        //           "value": "public_speaking"
        //         }
        //       ]
        //     }
        //   ]
        //   }
    ]
  };

  var data = {
  trigger_id: req.body.trigger_id,
  dialog: JSON.stringify(form)
};
  var headers = {
      'Content-Type' : 'application/json',
      'Authorization': 'Bearer ' + process.env.SLACK_AUTH_TOKEN
  };
  request.post({url: 'https://slack.com/api/dialog.open', form: data, headers: headers}, function (error, response, body) {
    res.json();
    console.log(response.body)
  });
});

app.post('/actions', (req, res) => {
  const payload = JSON.parse(req.body.payload);
  const {type, user, submission} = payload;
  console.log(payload);
  if (type === 'dialog_submission') {
    var interest1 = submission.interest1;
    var interest2 = submission.interest2;
    var interest3 = submission.interest3;
    var name = user.name;
    var attachments = [
            {
              "fallback": "You are unable to respond",
              "callback_id": "notify",
              "color": "#3AA3E3",
              "attachment_type": "default",
              "actions": [
                {
                  "name": "reply",
                  "text": "Accept",
                  "type": "button",
                  "style": "danger",
                  "value": "accept"
                },
                {
                  "name": "reply",
                  "text": "Decline",
                  "type": "button",
                  "style": "default",
                  "value": "decline"
                }
              ]
            }
          ];
    // var data = {
    //   channel: user.id,
    //   message: {
    //       text: `Hello ${name}! You have been matched with someone who shares the following interests as you: ${interest1}, ${interest2}, ${interest3}. Please accept or decline this match.`,
    //       attachments: attachments
    //     }
    // };
    // var headers = {
    //     'Content-Type' : 'application/json',
    //     'Authorization': 'Bearer ' + process.env.SLACK_AUTH_TOKEN
    // };
    // request.post({url: 'https://slack.com/api/chat.postMessage', form: data, headers: headers}, function (error, response, body) {
    //   res.json();
    //   console.log(response.body)
    // });
    var data = {form: {
      token: process.env.SLACK_AUTH_TOKEN,
      channel: user.id,
      text: `Hello ${name}! You have been matched with someone who shares the following interests as you: ${interest1}, ${interest2}, ${interest3}. Please accept or decline this match.`,
      attachments: JSON.stringify(attachments)
    }};
    request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
      // Sends welcome message
      res.json();
      console.log(response.body);
    });
  } else if (type === 'interactive_message') {
    var reply = submission.reply
    if (reply === 'yes') {
      var data = {form: {
        token: process.env.SLACK_AUTH_TOKEN,
        channel: user.id,
        text: `Thank you for your reply, ${name}! You have accepted the match.`
      }};
      request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
        res.json();
        console.log(response.body);
      });
    } else {
      var data = {form: {
        token: process.env.SLACK_AUTH_TOKEN,
        channel: user.id,
        text: `Thank you for your reply, ${name}! You have declined the match.`
      }};
      request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
        res.json();
        console.log(response.body);
      });
    }
  }
});

app.post('/signup', (req, res) => {
  return web.chat.postMessage({
      channel: "lunchlinks",
      thread_ts: req.ts,
      reply_broadcast: false,
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
    console.log(res
    )
  })
  .catch(console.error);
});
