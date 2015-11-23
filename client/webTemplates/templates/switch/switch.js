 Template.switch.rendered = function () {
    
 	Meteor.defer(function(){
 		$(".player").mb_YTPlayer();
 	});
 	$('.navbar-nav').css('display', 'none');
 	$('nav').css('display', 'none');
 	//$('nav').css('height', '0');
 	$('#tour').removeClass('active');
 	$('#features').removeClass('active');
 	$('#pricing').removeClass('active');
 	$('#faq').removeClass('active');
 	$('body').css('height', '100%');
 	$('html').css('height', '100%');
 }

 Template._justResetPasswordDialog.events({
    'click #just-verified-dismiss-button': function () {
        if (Meteor.user().role[0] === "walker") {
            Router.go('/walkerSchedule');
        }
        if (Meteor.user().role[0] === "pro") {
                Session.set("ProConfigured", Meteor.user().configured);
                Router.go('/proSchedule');
        }
        if (Meteor.user().role[0] === "client") {
            if (!Meteor.user().walkerId) {
                Router.go('/findWalker');
            } else {
                Router.go('/walkerServices');
            }
        }
    }
});

Template._justVerifiedEmailDialog.events({
    'click #just-verified-dismiss-button': function () {
        if (Meteor.user().role[0] === "walker") {
            Router.go('/walkerSchedule');
        }
        if (Meteor.user().role[0] === "pro") {
                Session.set("ProConfigured", Meteor.user().configured);
                Router.go('/proSchedule');
        }
        if (Meteor.user().role[0] === "client") {
            if (!Meteor.user().walkerId) {
                Router.go('/findWalker');
            } else {
                Router.go('/walkerServices');
            }
        }
    }
});