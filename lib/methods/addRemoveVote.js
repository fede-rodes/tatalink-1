// ACCESIBLE FOR BOTH SERVER AND CLIENT SIDE:
// source: https://www.meteor.com/try/10

/*
Methods are server functions that can be called from the client. They
are useful in situations where you want to do something more
complicated than insert, update or remove, or when you need to do
data validation that is difficult to achieve with just allow and deny.

On the server, you don't have to pass a callback — the method call
will simply block until the method is complete, returning a result or
throwing an exception, just as if you called the function directly:
Synchronous call on the server with no callback
var result = Meteor.call('commentOnPost', comment, postId);

Source: http://docs.meteor.com/#/basic/methods
*/



//======================================================================
// INSERT NEW MATCH:
//======================================================================
Meteor.methods({

   'addRemoveVote': function(playerId) {

      // Check
      check(playerId, String);

   	// Check match author, and user log in
      var currentUserId = Meteor.userId();
      var currentUser = Meteor.users.findOne(currentUserId);
      if (!currentUser) {
         throw new Meteor.Error('Add/Remove Vote: the user is not logged in');
   		var message = {status: 'error', text: 'Se produjo un error. Bomba de humo ninja!'};
         return message;
   	}

      // Fetch player info
      var player = Players.findOne(playerId);
      if (!player) {
         throw new Meteor.Error('Add/Remove Vote: the given player does not exist');
   		var message = {status: 'error', text: 'Se produjo un error. Bomba de humo ninja!'};
         return message;
      }

      var goingInVotes = [];
      var goingOutVotes = [];

      if (!_.isUndefined(currentUser.votes)) {
         goingInVotes = currentUser.votes.goingIn;
         goingOutVotes = currentUser.votes.goingOut;
         //console.log('goingInVotes: ' + goingInVotes);
         //console.log('goingOutVotes: ' + goingOutVotes);
      } /*else {
         Meteor.users.update({_id: currentUserId}, {$set: {'votes.goingIn': [], 'votes.goingOut': []}});
      }*/

      var stats = Stats.findOne();
      if (!stats) {
         throw new Meteor.Error('Add/Remove Vote: no stats available');
   		var message = {status: 'error', text: 'Se produjo un error. Bomba de humo ninja!'};
         return message;
      }

      // If the player is playing and is not in the going out votes of the user, add him to said list
      if (player.status === 'playing' && _.indexOf(goingOutVotes, playerId) === -1) {
         if (goingOutVotes.length === 3) {
            var message = {status: 'error', text: 'Solo podes elegir 3 jugadores para sacar!'};
            return message;
         }
         Meteor.users.update({_id: currentUserId}, {$addToSet: {'votes.goingOut': playerId}});
         Players.update({_id: playerId}, {$inc: {goingOut: 1}});
         Stats.update({_id: stats._id}, {$inc: {votesGoingOut: 1}});
      }
      // If the player is playing and is already in the going out votes of the user, remove him from that list
      else if (player.status === 'playing' && _.indexOf(goingOutVotes, playerId) !== -1) {
         if (goingOutVotes.length === 0) {
            console.log('ya tenes cero');
            return;
         }
         Meteor.users.update({_id: currentUserId}, {$pull: {'votes.goingOut': playerId}});
         Players.update({_id: playerId}, {$inc: {goingOut: -1}});
         Stats.update({_id: stats._id}, {$inc: {votesGoingOut: -1}});
      }
      // If the player is playing and is not in the going out votes of the user, add him to said list
      else if (player.status === 'substitute' && _.indexOf(goingInVotes, playerId) === -1) {
         if (goingInVotes.length === 3) {
            var message = {status: 'error', text: 'Solo podes elegir 3 jugadores para poner!'};
            return message;
         }
         Meteor.users.update({_id: currentUserId}, {$addToSet: {'votes.goingIn': playerId}});
         Players.update({_id: playerId}, {$inc: {goingIn: 1}});
         Stats.update({_id: stats._id}, {$inc: {votesGoingIn: 1}});
      }
      // If the player is playing and is not in the going out votes of the user, add him to said list
      else if (player.status === 'substitute' && _.indexOf(goingInVotes, playerId) !== -1) {
         if (goingInVotes.length === 0) {
            console.log('ya tenes cero');
            return;
         }
         Meteor.users.update({_id: currentUserId}, {$pull: {'votes.goingIn': playerId}});
         Players.update({_id: playerId}, {$inc: {goingIn: -1}});
         Stats.update({_id: stats._id}, {$inc: {votesGoingIn: -1}});
      }
      else {
         throw new Meteor.Error('Add/Remove Vote: player status is different from playing or substitute');
   		var message = {status: 'error', text: 'Se produjo un error. Bomba de humo ninja!'};
         return message;
      }

      //var message = {status: 'success', text: 'METHODS_Match_created_successfully', response: matchId};
      //return message;
   }

});
