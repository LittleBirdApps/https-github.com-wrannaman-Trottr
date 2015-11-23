 Template.clientWalkers.rendered = function () {
 	$('#tour').removeClass('active');
 	$('#home').removeClass('active');
 	$('#pricing').removeClass('active');
 	$('#faq').removeClass('active');
 	$('#features').addClass('active');
 	$('#loginNav').removeClass('active');

 	Session.set('contactForm2', true);
 }

  Template.clientWalkers.events({
 	'click #submit': function (e,t) {
 		e.preventDefault();
 		var fName = $('#fname').val();
 		var lName = $('#lname').val();
 		var phone = $('#phone').val();
 		var email = $('#email').val();
 		var howHear = "";
 		var text = $('textarea#text').val();
 		console.log(fName, lName, phone, email, howHear, text);

 		if (!fName || !email) {
			sweetAlert({
			        title: "Uh Oh!",
			        type: "error",
			        text: "Please fill out your first name and your email."
			    });
 		} else {
 			Meteor.call('sendContactFormEmail', fName, lName, phone, email, howHear, text, function (error, result) {
	 			if (error) {
					sweetAlert({
	                    title: "Uh Oh!",
	                    type: "error",
	                    text: error
	                });
	 			}
	 			if (result) {
	 				Session.set('contactForm2', false);
	 				sweetAlert({
	                    title: "Hey, thanks!",
	                    type: "success",
	                    text: "Message Sent"
	                });
	 			}
	 		});
 		}
 	}
 });
 Template.clientWalkers.helpers({
 	'contactForm': function () {
 		return Session.get('contactForm2');
 	}
 });