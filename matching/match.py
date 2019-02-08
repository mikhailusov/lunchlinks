from __future__ import division
from slackclient import SlackClient
import os
import sys
import operator
import unicodedata



slack_token = sys.argv[1]
sc = SlackClient(slack_token)

CURR_USER_ID = sys.argv[2]
INTEREST_KEYWORDS = [sys.argv[3], sys.argv[4], sys.argv[5]]


user_id_to_name_dict = {}
user_id_list = []

def normalize_dict(dict):
    the_min = min(dict.values())
    the_max = max(dict.values())

    for key, value in dict.iteritems():
        try:
            normalized = (value - the_min) / (the_max - the_min)
            dict[key] = normalized
        except ZeroDivisionError:
            print("there was a zero division error")
            dict[key] = 0
    return dict

# TODO: currently the user's interest words are hard-coded. Need to take these keywords from UI
# award points for people who mention your selected interest keywords
def get_interest_score():
    interest_score_dict = {}
    channels = sc.api_call("channels.list")['channels']

    for channel in channels:
        curr_channel_id = channel['id']
        curr_channel_history = sc.api_call("channels.history", channel=curr_channel_id)
        messages = curr_channel_history['messages']

        for message in messages:
            # bots don't have a user key, skip them
            if 'user' not in message:
                continue

            text = message['text']
            user_id = message['user']

            for word in INTEREST_KEYWORDS:
                if word.lower() in text.lower():
                    if user_id not in interest_score_dict:
                        interest_score_dict[user_id] = 1
                    else:
                        interest_score_dict[user_id] += 1

    return(normalize_dict(interest_score_dict))


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

    return(normalize_dict(reply_score_dict))

def get_react_score():
    react_score_dict = {}
    channels = sc.api_call("channels.list")['channels']

    for channel in channels:
        curr_channel_id = channel['id']
        curr_channel_history = sc.api_call("channels.history", channel=curr_channel_id)
        messages = curr_channel_history['messages']

        for message in messages:
            # awards points to people who react to you
            if 'reactions' in message and message['user'] == CURR_USER_ID:
                reactions_list = message['reactions']
                for reaction in reactions_list:
                    users_who_reacted = reaction['users']
                    for user in users_who_reacted:
                        if user not in react_score_dict:
                            react_score_dict[user] = 1
                        else:
                            react_score_dict[user] += 1

            # awards points to people you react to
            if 'reactions' in message:
                reactions_list = message['reactions']
                for reaction in reactions_list:
                        users_who_reacted = reaction['users']
                        if CURR_USER_ID in users_who_reacted:
                            user = message['user']
                            if user not in react_score_dict:
                                react_score_dict[user] = 1
                            else:
                                react_score_dict[user] += 1

    return normalize_dict(react_score_dict)


def translate_dictionary(dict):
    new_dict = {}
    for key, value in dict.iteritems():
        user_name = user_id_to_name_dict[key]
        new_dict[user_name] = dict[key]
    return new_dict


def combine_dictionaries(d1, d2, d3, d4):
    combined_dict = {}
    weight1 = 0.2
    weight2 = 0.2
    weight3 = 0.2
    weight4 = 0.4

    for k in d1:
        combined_dict[k] = weight1 * d1[k]
        if k in d2:
            combined_dict[k] += weight2 * d2[k]
        if k in d3:
            combined_dict[k] += weight3 * d3[k]
        if k in d4:
            combined_dict[k] += weight4 * d4[k]
    return combined_dict


def find_best_match():
    slack_users_list = sc.api_call("users.list")['members']

    for user in slack_users_list:
        try:
            user_id_list.append(user['id'])
            user_id_to_name_dict[(user['id'])] = user['real_name']
        except KeyError:
            continue

    # build all feature dictionaries
    react_score_dict = get_react_score()
    channel_score_dict = get_channel_score()
    reply_score_dict = get_reply_score()
    interest_score_dict = get_interest_score()

    # get aggregate dictionary from all the feature dictionaries
    combined_dict = combine_dictionaries(channel_score_dict, reply_score_dict, react_score_dict, interest_score_dict)

    # translate from user ids to real user names
    final_dict = translate_dictionary(combined_dict)

    # sort in descending order
    desc_order_tuples = sorted(final_dict.items(), key=operator.itemgetter(1), reverse=True)

    # get the names and convert from unicode to string
    ranked_user_names = [unicodedata.normalize('NFKD', tup[0]).encode('ascii','ignore') for tup in desc_order_tuples]

    # pass the best match name back to index.js
    print(ranked_user_names[0])
    sys.stdout.flush()


# takes about 15 seconds to run
find_best_match()









