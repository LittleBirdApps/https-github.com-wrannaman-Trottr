 Template.clientWebHome.rendered = function () {
 	Meteor.defer(function(){
 		$(".player").mb_YTPlayer();
 	});
 	$('.navbar-nav').css('display', 'visible');
 	$('nav').css('display', 'visible');
 	$('#tour').removeClass('active');
 	$('#features').removeClass('active');
 	$('#pricing').removeClass('active');
 	$('#faq').removeClass('active');
 	$('#loginNav').removeClass('active');

 	//true to show, false to disable
 	Session.set('contactForm', true);
 }
 Template.clientWebHome.events({
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
	 				Session.set('contactForm', false);
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
 Template.clientWebHome.helpers({
 	'contactForm': function () {
 		return Session.get('contactForm');
 	}
 });

 // var first_Name = $('#first_name').val();
 // 		var last_Name = $('#last_name').val();
 // 		var phone = $('#phone').val();
 // 		var email = $('#email').val();
 // 		var password = $('#password').val();
 // 		var address = $('#busAddress').val();
 // 		var radius = $('#radius').val();
 // 		var howHear = $('#howHear').val();

 // 		if (!first_name || !last_name || !phone || !address || !email || !password || !radius) {
 // 			sweetAlert({
	//                     title: "Uh Oh!",
	//                     type: "error",
	//                     text: "Please fill out all the fields."
	//                 });
 // 		} else {
 // 			Accounts.createUser({'email': email, 'password':password }, function(e,r) {
	//             if (e) {
	//                 sweetAlert({
	// 	                        title: "Uh Oh!",
	// 	                        type: "error",
	// 	                        text: "There was an error, all we know is : " + error
	// 	                    });
	//             } else {
	//                 Meteor.call('AddWalkerProfile', Meteor.userId(), ["walker"], first_Name, last_Name, phone, address, radius, function (e,r) {
	// 	                if (e) {
	// 	                    return sweetAlert({
	// 	                        title: "Uh Oh!",
	// 	                        type: "error",
	// 	                        text: "There was an error, all we know is : " + error
	// 	                    });
	// 	                } else {
	// 						Router.go('/findWalker');
	// 						sweetAlert({
	// 	                        title: "Thanks!",
	// 	                        type: "info",
	// 	                        text: "Your application has been recieved, we will be in touch. For now, check out how the client side of the app works!"
	// 	                    });
	// 	                }
	// 	            });
	//             }
	//         }); 