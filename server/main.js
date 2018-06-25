import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/user';
import Links from '../imports/api/links';
import '../imports/startup/simple-schema-config';

// import { Accounts } from 'meteor/accounts-base'
// import '../imports/api/messages';

Meteor.startup(() => {
  // Called once to create bot user
  // Accounts.createUser({ username: 'bot', email: 'bot@bot.com', password: 'CJc{,Y5Zj=(b,e+L'});

  WebApp.connectHandlers.use((req, res, next) => {
    let link = Links.findOne(req.url.slice(1));

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.link);
      res.end();
      Meteor.call('links.visited', link._id);
    } else {
      next();
    }
  });
});
