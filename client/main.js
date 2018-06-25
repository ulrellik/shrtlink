import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import routes, { onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-config';

const DDP = require('asteroid').createClass();
const ddpclient = new DDP({
  endpoint: 'ws://localhost:3000/websocket',
  autoConnect: true,
  autoReconnect: true,
  reconnectInterval: 10000,
});
let subscription;

ddpclient.ddp.on('connected', () => {
  console.log('Successfully connected on DDP websocket', 'ws://localhost:3000/websocket');
});
// So far no real users exists for this scenario
ddpclient.loginWithPassword({ username: 'bot', password: 'CJc{,Y5Zj=(b,e+L' }).then((userId) => {
console.log('Successfully logged in on DDP', userId);
subscribe(['KdpsKSufqTPck59YE']);

}).catch((err) => {
  console.log('Failed to login on DDP', err);
});

export function subscribe(chatroomIds) {
  if (subscription) {
    ddpclient.unsubscribe(subscription.id);
    ddpclient.ddp.off('added', messageToFacebook); //Avoids having multiple listeners when resubscribing
  }
  subscription = ddpclient.subscribe('messages.bot', chatroomIds); //Chatroom IDs should be provided here

  // Initialize event listener after the initial batch has passed, since we don't care of
  // old messages
  subscription.on('ready', () => {
      console.log('Successfully subscribed on DDP for new messages of chatrooms', chatroomIds);
      ddpclient.ddp.on('added', messageToFacebook);
  });

  subscription.on('error', (error) => {
      console.log('Unable to subscribe on DDP for new messages', error);
  });
}

function messageToFacebook({collection, id, fields}) {
  //collection and id not used, fields contains values
  console.log(`New message ${collection} ${id} ${JSON.stringify(fields)}`);
}

export function messageFromFacebook() {
  ddpclient.call('messages.bot', {
    chatRoomId: 'KdpsKSufqTPck59YE',
    messageSender: 'test@test.com',
    messageBody: 'This is ust a test',
    messageMetaData: {
      type: 'chat',
    },
  }).then(() => console.log('called succes'))
  .catch((error) => console.log('error', error));
}


Tracker.autorun(() => {
  onAuthChange();
});

Meteor.startup(() => {
  Session.set('showVisible', true);
  Tracker.autorun(() => {
    ReactDOM.render(routes, document.getElementById('app'));
  });
});
