    Template.webSearchResults.rendered = function() {
        // For Demo purposes only (show hover effect on mobile devices)
        [].slice.call( document.querySelectorAll('a[href="#"') ).forEach( function(el) {
            el.addEventListener( 'click', function(ev) { ev.preventDefault(); } );
        } );
    }

    Handlebars.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});

Template.webSearchResults.rendered = function () {
    Session.set("Navbar", "Find A Walker");
    Meteor.call('ReturnAllWalkers', function (error, results) {
        if (error) {
            return sweetAlert({
                title: "Uh Oh!",
                type: "error",
                text: "There was an error, all we know is : " + error
            });
        } else {
            Session.set('WalkerResults', results);
            console.log("Session set WalkerREsults from server *****************");
            console.log(results);
        }
    });
    //Meteor.setTimeout(function() {
    //    console.log(Session.get('WalkerResults'));
    //    var walkersSession = Session.get("WalkerResults");
    //    var walkersArray = [];
    //    for (var i=0; i<walkersSession.length; i++) {
    //        walkersArray.push([walkersSession[i]]);
    //    }
    //    console.log("********************walkersarray**********");
    //    console.log(walkersArray);
    //
    //}, 100);

};
Template.webSearchResults.helpers({
    walkers: function () {
        var walkersSession = Session.get("WalkerResults");
        var walkerArray = [];

        for (var i=0; i<walkersSession.length; i++) {
            walkerArray.push({
                "about_me": walkersSession[i].about_me,
                "name": walkersSession[i].firstName + " " + walkersSession[i].lastName,
                "walkRadius": walkersSession[i].walkRadius,
                "phoneNum": walkersSession[i].phoneNum,
                "address": walkersSession[i].address,
                "pic": walkersSession[i].pic,
                "id" : walkersSession[i].id
            });

        }

        return walkerArray;
    }
});

Template.webSearchResults.events({
    'click li': function (e,t) {
        console.log('clicked');
        Router.go('/');
        Meteor.setTimeout(function () {
           var myDiv = $("body");
        var scrollto = myDiv.offset().top + (myDiv.height() / 6.5);
        myDiv.animate({ scrollTop:  scrollto}); 
        }, 300);
        
        sweetAlert({title: 'Booking', text: 'To book a walker, please login or signup!'});

    },
    'click #walkerSearch': function (e,t) {
        Session.set("SelectedWalkerId", this.id);
        console.log(this.id);
        console.log("******************^^^^^^^****************");
        
    },
    'click #reviews': function (e,t) {
    	Router.go('/spinner');
    	Meteor.setTimeout(function () {
            Meteor.call('Reviews', Session.get("SelectedWalkerId"), function (error, result) {
                if (error) {
                    return error
                }
                if (result) {
                    Session.set('Reviews', result);
                }
            });
    		Router.go('/reviews');
    	},300);	
    }
});

