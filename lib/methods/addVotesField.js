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

   'addVotesField': function() {

      console.log('user: '+_.keys(Meteor.user()));
      console.log('userId: '+Meteor.userId());
   	// Check match author, and user log in
      var currentUserId = Meteor.userId();
      var currentUser = Meteor.users.findOne(currentUserId);
      if (!currentUser) {
         throw new Meteor.Error('Add Votes Field: the user is not logged in');
   		var message = {status: 'error', text: 'Se produjo un error. Bomba de humo ninja!'};
         return message;
   	}

      if (_.isUndefined(currentUser.votes)) {
         //Meteor.users.update({_id: currentUserId}, {$addToSet: {votes: {goingIn: [], goingOut: []}}});
         Meteor.users.update({_id: currentUserId}, {$set: {'votes.goingIn': [], 'votes.goingOut': []}});
      }

      console.log('votes field added');
   }

});
