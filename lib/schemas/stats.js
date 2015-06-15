//======================================================================
// POST SCHEMA:
//======================================================================
Stats = new Mongo.Collection("stats");
var Schema = {};

Schema.Stat = new SimpleSchema({

   votesGoingIn: {
      type: Number,
      label: "Total number of votes for going in players",
      min: 0
   },

   votesGoingOut: {
      type: Number,
      label: "Total number of votes for going out players",
      min: 0
   }

});

Stats.attachSchema(Schema.Stat);
