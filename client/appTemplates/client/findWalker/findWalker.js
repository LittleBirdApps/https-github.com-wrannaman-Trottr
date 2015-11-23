Handlebars.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});

Template.findWalker.rendered = function () {
    Session.set("Navbar", "Find A Walker");
    Meteor.call('ReturnWalkers', function (error, results) {
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
    
    Meteor.call()
};
Template.findWalker.helpers({
    walkers: function () {
        var walkersSession = Session.get("WalkerResults");
        console.log(walkersSession);
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

Template.findWalker.events({
    'click #walker': function (e,t) {
        Session.set("SelectedWalkerPic", this.pic);
        console.log(this.id);
        Session.set("SelectedWalkerId", this.id);
        console.log(this._id);
        console.log(this);
        console.log("******************^^^^^^^****************");
        Session.set("SelectedWalkerId", this.id);
        Session.set("SelectedWalkerName", this.name);
        Session.set("SelectedWalkerAbout", this.about_me);
        Session.set("SelectedWalkerPhone", this.phoneNum);    
        Router.go('/walkerHighlight');
        
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
            Router.go('/clientReviews');
        },300);
        
    }
});

