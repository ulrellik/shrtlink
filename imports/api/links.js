import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const insertSchema = new SimpleSchema({
  link: {
    type: String,
    label: 'Your link',
    regEx: SimpleSchema.RegEx.Url,
  },
});

const setVisibilitySchema = new SimpleSchema({
  _id: {
    type: String,
  },
  visible: {
    type: Boolean,
  },
});

export default Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({userId: this.userId});
  });
}

Meteor.methods({
  'links.insert'(link) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized');
    }

    insertSchema.validate({ link });

    Links.insert({ link, userId: this.userId, visible: true, });
  },

  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized');
    }

    setVisibilitySchema.validate({ _id, visible });

    Links.update({ _id, userId: this.userId }, { $set: { visible } });

  },

  'links.visited'(_id) {
    Links.update({ _id }, { $set: { lastVisited: new Date().getTime() }, $inc: { visited: 1 } });
  }
});
