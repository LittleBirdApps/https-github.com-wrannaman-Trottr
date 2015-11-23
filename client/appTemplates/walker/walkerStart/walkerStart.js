Template.walkerStart.destroyed = function () {
//   if(this.ping) {
//     this.ping.stop();
//   }

}
Template.walkerStart.rendered = function () {
  Session.set("Navbar", "Walk");
  $('html').css('height', '100%');
  $('body').css('height', '100%');

  // Geolocation.currentLocation();
  // var lat = Geolocation.currentLocation().coords.latitude;
  // var long = Geolocation.currentLocation().coords.longitude;
  // var timeStamp = Geolocation.currentLocation().timestamp;
  // Session.set("Geo", [lat,long,timeStamp]);
  // Meteor.setTimeout(function(){
  //   Meteor.call('GeoPing', Session.get("Geo")[0], Session.get("Geo")[1], Session.get("Geo")[2], Session.get('details').userId, Session.get('details')._id, function (error, result) {
  //         console.log(error);
  //         console.log(results);
  //       });
  // },2000);
    console.log(Session.get('details').userId);
    Meteor.setTimeout(function(){
        Meteor.call('ClientDetails', Session.get('details').userId, function(err,results) {
            Session.set('ClientDetails', results);
        });
    },300);
   

/* Stop button */
stop.onclick = function() {
    clearTimeout(t);
}

// /* Clear button */
// clear.onclick = function() {
//     h1.textContent = "00:00:00";
//     seconds = 0; minutes = 0; hours = 0;
// }

$('#stop').trigger('click');

};

Template.walkerStart.helpers({
    clientName: function () {
        return Session.get('details').eventDetails;
    },
    clientPhone: function () {
        
        return Session.get('ClientDetails')[0].phoneNum;
    },
    walkLength: function () {
        return Session.get('details').title;
    },
    address: function () {
        return Session.get('ClientDetails')[0].address;
    },
    dog1: function () {
        return Session.get('ClientDetails')[0].dog1;
    },
    dog1Info: function () {
        return Session.get('ClientDetails')[0].dog1Info;
    } 
});

Template.walkerStart.events({
    'click #start': function (e,t) {
        $('#stop').trigger('click');
        sweetAlert({
            title: "Are you sure?",
            text: "You will not be able to start the walk over again.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Yes, start it!",
            closeOnConfirm: false
            },
            function(){
              Session.set("ActualStart", new Date());
                Session.set("startedWalk", true);
                Router.go('/walkerStart2');
                sweetAlert({title: "Walk Started!",text: "Be safe and have fun!", type: "success", timer: 1500});
        });
  },
    'click #stop': function (e,t) {
        //Router.go('/walkerCalendarList');
    }
    
});

   