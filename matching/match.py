from __future__ import division
from slackclient import SlackClient
import os
import pprint
import operator

pp = pprint.PrettyPrinter(indent=4)

CURR_USER_ID = "UFZRUAEUC"
CURR_USER_NAME = "Michael Ma"

slack_token = os.environ["SLACK_API_TOKEN"]
sc = SlackClient(slack_token)

user_id_to_name_dict = {}
user_id_list = []

def normalize_dict(dict):

    the_min = min(dict.values())
    the_max = max(dict.values())

    for key, value in dict.iteritems():
        normalized = (value - the_min) / (the_max - the_min)
        dict[key] = normalized

    return dict


# award points for people who are in the same channel as you
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
    return normalize_dict(channel_score_dict)

# award points for when you reply to someone or when others reply to you
def get_reply_score():
    reply_score_dict = {}
    channels = sc.api_call("channels.list")['channels']

    for channel in channels:
        curr_channel_id = channel['id']

        curr_channel_history = sc.api_call("channels.history", channel=curr_channel_id)

        messages = curr_channel_history['messages']

        # points for people who reply to you
        for message in messages:
            # a reply message exists and you posted the original message (you're the parent)
            if 'parent_user_id' in message and message['parent_user_id'] == CURR_USER_ID:
                # add points for whoever replies to your message
                replier_id = message['user']
                if replier_id not in reply_score_dict:
                    reply_score_dict[replier_id] = 1
                else:
                    reply_score_dict[replier_id] += 1

            # points for when you reply to others (parent is the other person)
            if 'parent_user_id' in message and message['user'] == CURR_USER_ID:
                parent_id = message['parent_user_id']
                if parent_id not in reply_score_dict:
                    reply_score_dict[parent_id] = 1
                else:
                    reply_score_dict[parent_id] += 1

    # print(reply_score_dict)
    return(normalize_dict(reply_score_dict))


def combine_dictionaries(d1, d2):
    d3 = {}
    weight1 = 0.5
    weight2 = 0.5

    for k in d1:
        d3[k] = d1[k] * weight1
        if k in d2:
            d3[k] += weight2 * d2[k]

    return d3

def run():
    slack_users_list = sc.api_call("users.list")['members']

    for user in slack_users_list:
        try:
            user_id_list.append(user['id'])
            user_id_to_name_dict[(user['id'])] = user['real_name']
        except KeyError:
            continue

    channel_score_dict = get_channel_score()
    reply_score_dict = get_reply_score()


    final_dict = combine_dictionaries(channel_score_dict, reply_score_dict)
    desc_order_ids = sorted(final_dict.items(), key=operator.itemgetter(1), reverse=True)

    best_match_id = desc_order_ids[1][0]
    print(best_match_id)

    return(user_id_to_name_dict[best_match_id])



run()









