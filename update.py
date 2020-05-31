# -*- coding:utf-8 -*-

import os
import time
import signal
import subprocess
import sys
import requests
import json
from codecs import open
cur_dir = os.path.dirname(os.path.abspath(__file__))


def send_to_bot(msg):
    url = 'https://oapi.dingtalk.com/robot/send?access_token=98d850f0d52ae98f0ddc7c51e4d0b092f3ddaecc8c6335f4a5744fda15298fbd'
    headers = {'Content-Type': 'application/json;charset=utf-8'}
    json_text = {
        "msgtype": "text",
        "text": {
            "content": msg
        },
        "at": {
            "atMobiles": [
                ""
            ],
            "isAtAll": False
        }
    }
    r = requests.post(url, json.dumps(json_text), headers=headers)
    print(r.status_code, r.text)


def get_git_msg():
    git_msg_file = os.path.join(cur_dir, 'gitmsg')
    if not os.path.exists(git_msg_file):
        return 'empty'
    with open(git_msg_file, encoding = 'utf-8') as f:
        return f.read()

        
def update():
    sha1 = get_git_msg()
    print(' begin update:', sha1)
    send_to_bot(u'采伐前端部署完成:{}'.format(sha1))
    time.sleep(5)
    print('end update')


if __name__ == "__main__":
    update()
