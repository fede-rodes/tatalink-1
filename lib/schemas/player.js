//======================================================================
// POST SCHEMA:
//======================================================================
Players = new Mongo.Collection("players");
var Schema = {};

Schema.Player = new SimpleSchema({

   name: {
      type: String,
      //regEx: /^[a-zA-Z]{2,30}$/,
      max: 50,
      denyUpdate: true
   },

   avatar: {
      type: String,
      denyUpdate: true
   },

   goingOut: {
      type: Number,
      label: "Number of votes to remove this player",
      min: 0/*,
      autoValue: function() {
               if (this.isInsert) {
                  return 0;
               }
            }*/
   },

   goingIn: {
      type: Number,
      label: "Number of votes suppporting this player to play",
      min: 0/*,
      autoValue: function() {
               if (this.isInsert) {
                  return 0;
               }
            }*/
   },

   status: {
      type: String,
      allowedValues: ['playing', 'substitute', 'out'],
   },

});

Players.attachSchema(Schema.Player);
