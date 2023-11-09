import json
from channels.generic.websocket import WebsocketConsumer


class MyConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def receive(self, text_data=None):
        response_data = json.dumps(text_data)
        self.send(text_data=response_data)

    def disconnect(self, close_code):
        ...
