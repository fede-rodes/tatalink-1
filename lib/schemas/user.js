//======================================================================
// USER SCHEMA:
//======================================================================
var Schema = {};

//----------------------------------------------------------------------
Schema.UserProfile = new SimpleSchema({

   guest: {
      type: Boolean
   }

});
//----------------------------------------------------------------------
/*Schema.UserGoingIn = new SimpleSchema({

   goingInIds: {
      type: [String],
      max: 3
   }

});
//----------------------------------------------------------------------
Schema.UserGoingOut = new SimpleSchema({

   goingOutIds: {
      type: [String],
      max: 3
   }

});*/
//----------------------------------------------------------------------
Schema.UserVotes = new SimpleSchema({

   goingIn: {
      type: [String],
      //max: 3
   },

   goingOut: {
      type: [String],
      //max: 3
   }

});
//----------------------------------------------------------------------
Schema.User = new SimpleSchema({

   profile: {
      type: Schema.UserProfile
   },

   username: {
      type: String,
      max: 50
   },

   /*votes: {
      type: Schema.UserVotes,
      optional: true
   },*/

   votes: {
      type: Object,
      blackbox: true,
      optional: true
   },

   createdAt: {
      type: Date
   },

   emails: {
      type: [Object],
      // this must be optional if you also use other login services like facebook,
      // but if you use only accounts-password, then it can be required
      optional: true
   },

   "emails.$.address": {
      type: String,
      regEx: SimpleSchema.RegEx.Email
   },

   "emails.$.verified": {
      type: Boolean
   },

   services: {
      type: Object,
      optional: true,
       blackbox: true
   }

});

Meteor.users.attachSchema(Schema.User);
