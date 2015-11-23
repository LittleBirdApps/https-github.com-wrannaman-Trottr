//Stripe.setPublishableKey('pk_test_JJwZAPHfg7eDGW0PVeF81d0m');

Template.clientDogs.rendered = function () {
    $('html').css('height', '100%');
    $('body').css('height', '100%');

    Session.set("Navbar", "Profile");
    $('.btn-primary').css('border-color','none;');
    Meteor.call('GetDogs', function(e,r) {
        if (r) {
            Session.set('MyDogs',r);
        }
    })
};

Template.clientDogs.helpers({
   dogs: function () {
        return Session.get('MyDogs');
    }
});

Template.clientDogs.events({
    'click #save': function(e,t) {
        var dogName = $('#dogName').val();
        var dogInfo = $('#dogInfo').val();
        if (dogName == "" || dogInfo == "") {
            sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Please enter a name and your dog's special needs, or other information you'd like us to know.",
                        timer: 1300
                    });
        } else {
            Meteor.call('AddDog', dogName, dogInfo, function (e,r) {
                if (r) {
                    Meteor.call('GetDogs', function(e,r) {
                        if (r) {
                            Session.set('MyDogs',r);
                        }
                    })
                }
            });
        }
    },
    'click #dog': function (e,t) {
        var that = this;
        Session.set('thisDog', that);
        console.log(that);
    },
    'click #delete': function (e,t) {
        Meteor.setTimeout(function() {
            Meteor.call('RemoveDog', Session.get('thisDog')._id, function (e,r) {
                Meteor.call('GetDogs', function(e,r) {
                    if (r) {
                        Session.set('MyDogs',r);
                    }
                })
            })
        },400);
    }
});

