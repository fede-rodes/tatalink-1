//======================================================================
// PRE-POPULATE PLAYERS LIST:
//======================================================================
Meteor.startup(function() {

   if (Players.find().count() !== 0) {
      return;
   }

   console.log('PRE-POPULATE PLAYERS. Players.find().count(): ' + Players.find().count());
   var players = [
      {name: 'ROMERO', avatar: 'romero.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'RONCAGLIA', avatar: 'roncaglia.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'GARAY', avatar: 'garay.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'OTAMENDI', avatar: 'otamendi.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'ROJO', avatar: 'rojo.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'BANEGA', avatar: 'banega.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'MASCHERANO', avatar: 'mascherano.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'PASTORE', avatar: 'pastore.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'MESSI', avatar: 'messi.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'AG&Uuml;ERO', avatar: 'aguero.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'DI MARIA', avatar: 'di_maria.jpg', goingOut: 0, goingIn: 0, status: 'playing'},
      {name: 'GUZMAN', avatar: 'guzman.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'ANDUJAR', avatar: 'andujar.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'ZABALETA', avatar: 'zabaleta.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'DEMICHELIS', avatar: 'demichelis.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'CASCO', avatar: 'casco.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'BIGLIA', avatar: 'biglia.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'PEREYRA', avatar: 'pereyra.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'GAGO', avatar: 'gago.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'LAMELA', avatar: 'lamela.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'TEVEZ', avatar: 'tevez.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'HIGUAIN', avatar: 'higuain.jpg', goingOut: 0, goingIn: 0, status: 'substitute'},
      {name: 'LAVEZZI', avatar: 'lavezzi.jpg', goingOut: 0, goingIn: 0, status: 'substitute'}
   ];

   _.each(players, function(player) {
      Players.insert(player);
   });

});

Meteor.startup(function() {

   if (Stats.find().count() !== 0) {
      return;
   }

   console.log('PRE-POPULATE STATS');
   var stats = {votesGoingIn: 0, votesGoingOut: 0};

   Stats.insert(stats);

});


//======================================================================
// PRE-POPULATE USER VOTES:
//======================================================================
/*Meteor.startup(function() {

   var currentUserId = Meteor.userId;
   if (!currentUserId) {
      return;
   }

   // Fetch current user
   var currentUser = Meteor.users.findOne(currentUserId);

   if (!currentUser) {
      console.log('not current user');
      return;
   }

   if (_.isUndefined(currentUser.votes)) {
      console.log('adding votes to user');
      Meteor.users.update({_id: currentUserId}, {$addToSet: {votes: {'goingIn': [], 'goingOut': []}}});
   }

});*/
