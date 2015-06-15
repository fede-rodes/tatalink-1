var userSubsHandler = Meteor.subscribe('currentUser');
var playersSubsHandler = Meteor.subscribe('playersList');
var statsSubsHandler = Meteor.subscribe('stats');

//==================================//
// INTRO TEMPLATE
//==================================//
Template.intro.helpers({

   userId: function() {
      return Meteor.userId();
   }

});

//==================================//
// STATS TEMPLATE
//==================================//
Template.stats.helpers({

   totalGoingInVotes: function() {
      var stats = Stats.findOne();
      if (!stats) {
         return;
      }

      var totalVotesGoingIn = stats.votesGoingIn;
      Session.set('goingInVotes', totalVotesGoingIn);
      return totalVotesGoingIn;
   },

   totalGoingOutVotes: function() {
      var stats = Stats.findOne();
      if (!stats) {
         return;
      }

      var totalVotesGoingOut = stats.votesGoingOut;
      Session.set('goingOutVotes', totalVotesGoingOut);
      return totalVotesGoingOut;
   },

   statsGoingIn: function () {
      if (playersSubsHandler.ready()) {
         var playersGoingIn = Players.find({status: 'substitute'});
         var totalVotesGoingIn = Session.get('goingInVotes');
         /*var currentUser = Meteor.users.findOne(Meteor.userId());
         var userVotes = currentUser.votes;
         var goingInVotes = userVotes.goingIn;*/

   		var playersGoingInExt = [];
         var percentage = 0;
   		playersGoingIn.forEach(function(player) {
            percentage = (100 * (player.goingIn / totalVotesGoingIn)).toPrecision(4);
            playersGoingInExt.push(_.extend(player, {percentage: percentage}));
   		});

         return _.sortBy(playersGoingInExt, function(obj){ return -obj.percentage; });
      } else {
         return [];
      }

   },

   statsGoingOut: function () {
      var playersGoingOut = Players.find({status: 'playing'});
      var totalVotesGoingOut = Session.get('goingOutVotes');

		var playersGoingOutExt = [];
      var percentage = 0;
		playersGoingOut.forEach(function(player) {
         percentage = (100 * (player.goingOut / totalVotesGoingOut)).toPrecision(4);
			playersGoingOutExt.push(_.extend(player, {percentage: percentage}));
		});

      return _.sortBy(playersGoingOutExt, function(obj){ return -obj.percentage; });
   }

});

//==================================//
// BUTTONS TEMPLATE
//==================================//
Template.buttons.helpers({

   playersGoingIn: function () {

      var playersGoingIn = Players.find({status: 'substitute'});
      //var totalVotesGoingIn = Session.get('goingInVotes');
      var goingInVotes = [];

      //console.log('currentUserId: '+ Meteor.userId());
      if (userSubsHandler.ready()) {
         console.log('in');
         var currentUserId = Meteor.userId();
         if (!currentUserId) {
            console.log('no user at buttons players going in helper');
            return;
         }

         var currentUser = Meteor.users.findOne(currentUserId);
         if (_.isUndefined(currentUser.votes)) {
            console.log('user votes not set');
            return;
         }

         var userVotes = currentUser.votes;
         var goingInVotes = userVotes.goingIn;
         console.log('votes going in:' + goingInVotes);
      }


		var playersGoingInExt = [];
      //var percentage = 0;
		playersGoingIn.forEach(function(player) {
         //percentage = (100 * (player.goingIn / totalVotesGoingIn)).toPrecision(4);
         if (_.indexOf(goingInVotes, player._id) !== -1) {
            playersGoingInExt.push(_.extend(player, {selected: 'selected'}));
         } else {
            playersGoingInExt.push(_.extend(player, {selected: ''}));
         }

		});
      return playersGoingInExt;
   },

   playersGoingOut: function () {
      var playersGoingOut = Players.find({status: 'playing'});

      var goingOutVotes = [];

      //console.log('currentUserId: '+ Meteor.userId());
      if (userSubsHandler.ready()) {
         console.log('in');
         var currentUserId = Meteor.userId();
         if (!currentUserId) {
            console.log('no user at buttons players going in helper');
            return;
         }

         var currentUser = Meteor.users.findOne(currentUserId);
         if (_.isUndefined(currentUser.votes)) {
            console.log('user votes not set');
            return;
         }

         var userVotes = currentUser.votes;
         var goingOutVotes = userVotes.goingOut;
         console.log('votes going in:' + goingOutVotes);
      }


		var playersGoingOutExt = [];
      //var percentage = 0;
		playersGoingOut.forEach(function(player) {
         //percentage = (100 * (player.goingIn / totalVotesGoingIn)).toPrecision(4);
         if (_.indexOf(goingOutVotes, player._id) !== -1) {
            playersGoingOutExt.push(_.extend(player, {selected: 'selected'}));
         } else {
            playersGoingOutExt.push(_.extend(player, {selected: ''}));
         }

		});
      return playersGoingOutExt;
   }

});
//----------------------------------//
// CONTEXT: this = {name, avatar, goingOut, goingIn, status, _id}
Template.buttons.events({

   'click button': function (event) {
      event.preventDefault();

      Meteor.call('addRemoveVote', this._id, function(error, message) {
         if (error) {
            console.log(error);
         } else {
            processMessage(message);
         }
      });
      console.log('id: ' + this._id);
      console.log('name: ' + this.name);
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
   }

});


//==================================//
// FOOTER TEMPLATE
//==================================//
/*Template.footer.events({

   'click .twitterBtn': function (event) {
      event.preventDefault();

      Meteor.call('addRemoveVote', this._id, function(error, message) {
         if (error) {
            console.log(error);
         } else {
            processMessage(message);
         }
      });
      console.log('id: ' + this._id);
      console.log('name: ' + this.name);
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
   }

});*/
