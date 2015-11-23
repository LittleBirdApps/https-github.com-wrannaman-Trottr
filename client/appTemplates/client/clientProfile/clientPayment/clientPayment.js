//Stripe.setPublishableKey('pk_test_JJwZAPHfg7eDGW0PVeF81d0m');

Template.clientPayment.rendered = function () {
    $('html').css('height', '100%');
    $('body').css('height', '100%');

    Session.set("Navbar", "Profile");
    $('.btn-primary').css('border-color','none;');

    Meteor.call('GetCardLabels', function(e,r) {
        if (r) {
            Session.set('CardLabels', r);
        }
    })
    
};

Template.clientPayment.helpers({
    cards: function () {
        return Session.get('CardLabels');
    },
    credit: function () {
        var credit = Meteor.user().credit
        return credit.toFixed(2);
    }
});

Template.clientPayment.events({
    'click #save': function () {
        var ccNum   = $('#ccNum').val();
        var ccExpMo = $('#ccExpMo').val();
        var ccExpYr = $('#ccExpYr').val();
        var ccCvc   = $('#ccCvc').val();
        var label   = $('#label').val();
        
        if (ccNum == "" || ccExpMo == "" || ccExpYr == "" || ccCvc == "") {
            sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Please enter all the card information",
                        timer: 1300
                    });
        } else {
            var stripe_token = Session.get("stripe_token");
            Meteor.call('CreateStripeCustomer',ccNum, ccExpYr, ccExpMo, ccCvc, function (error, result) {
                Session.set("stripe_customer", result);
                console.log(result);
                console.log("**************customer id********");
            });
            Meteor.call('AddCardLabel', label, function (e,r){
                if (r) {
                    Meteor.call('GetCardLabels', function(e,r) {
                        if (r) {
                            Session.set('CardLabels', r);
                        }
                    })
                }
            });
            
            Meteor.setTimeout(function(){
                var user_id = Meteor.userId();
                var stripe_customer = Session.get("stripe_customer").id;
                var stripe_card = Session.get("stripe_customer").default_card;
                Meteor.call('UpdateClientCreditCard', user_id, stripe_customer, stripe_card, function (error, result) {
                });
            },1000); 
        }
    },
    'click #card': function (e,t) {
        var that = this;
        Session.set('thisCard', that);
        console.log(that);
    },
    'click #delete': function (e,t) {
        Meteor.setTimeout(function() {
            Meteor.call('RemoveCardLabel', Session.get('thisCard')._id, function (e,r) {
                Meteor.call('GetCardLabels', function(e,r) {
                    if (r) {
                        Session.set('CardLabels',r);
                    }
                })
            })
        },400);
    },
    'click #promoSubmit': function (e,t) {
        var promo = $('#promoCode').val();
        if (promo) {
            Meteor.call('clientAddPromoCode', promo, function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    if (result == 'notFound') {
                        sweetAlert({
                            title: "Uh Oh!",
                            type: "error",
                            text: "Promo Code Not Found",
                            timer: 1300
                        });
                    } else if (result == "codeAlreadyUsed") {
                        sweetAlert({
                            title: "Uh Oh!",
                            type: "error",
                            text: "This Promo Code Has Already Been Used",
                            timer: 1300
                        });
                    } else {
                        console.log('added');
                        sweetAlert({
                            title: "Promo Code Applied!",
                            type: "success",
                            text: "Credit has been applied to your account, if it hasn't appeared above after 'Credit Amount: ', contact support and we'll sort it out ASAP",
                        });
                    }
                }
                
            });
        } else {
            sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Try entering something",
                        timer: 1300
                    });
        }
    }
});



