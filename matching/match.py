from __future__ import division
from slackclient import SlackClient
import os
from collections import defaultdict

CURR_USER_ID = "UFZRUAEUC"
CURR_USER_NAME = "Michael Ma"

slack_token = os.environ["SLACK_API_TOKEN"]
sc = SlackClient(slack_token)

user_id_to_name_dict = {}
user_id_list = []

#### IN THE SAME CHANNELS
def get_channel_score():
    channel_score_dict = {}
    channels = sc.api_call("channels.list")['channels']

    for channel in channels:
        curr_channel_members = channel['members']

        if CURR_USER_ID in curr_channel_members:
            for member_id in curr_channel_members:
                # skip yourself
                if CURR_USER_ID == member_id:
                    continue

                if member_id not in channel_score_dict:
                    channel_score_dict[member_id] = 1
                else:
                    channel_score_dict[member_id] += 1

    the_min = min(channel_score_dict.values())
    the_max = max(channel_score_dict.values())

    for key, value in channel_score_dict.iteritems():
        normalized = (value - the_min) / (the_max - the_min)
        channel_score_dict[key] = normalized

    return channel_score_dict

##### NUMBER OF REPLIES
def get_reply_score():
    reply_score_dict = {}
    channels = sc.api_call("channels.list")['channels']
    print(channels.keys())




def run():
    slack_users_list = sc.api_call("users.list")['members']

    for user in slack_users_list:
        try:
            user_id_list.append(user['id'])
            user_id_to_name_dict[(user['id'])] = user['real_name']
        except KeyError:
            continue

    channel_score_dict = get_channel_score()
    # max_id = max(channel_score_dict, key=channel_score_dict.get)
    get_reply_score()


run()










