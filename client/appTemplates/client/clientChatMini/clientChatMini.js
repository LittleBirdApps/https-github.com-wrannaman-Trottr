Template.clientChatMini.rendered = function () {
(function() {

	$('#live-chat header').on('click', function() {

		$('.chat').slideToggle(300, 'swing');
		$('.chat-message-counter').fadeToggle(300, 'swing');

	});

	$('.chat-close').on('click', function(e) {

		e.preventDefault();
		$('#live-chat').fadeOut(300);

	});

}) ();
};

Template.clientChatMini.helpers({
	name: function () {
		return Session.get("SelectedWalkerName");
	},
	success: function () {
		if (Session.get("SuccessMessage")) {
			return Session.get("SuccessMessage")
		} else {
			return "Chat in real time! Feel free to ask them any questions you have about thier prices, etc."
		}
	} 
});

Template.clientChatMini.events({
	'click #sendMessage': function (e,t) {
		var message= $('#chatInput').val();
		console.log(message);
		Meteor.call('Chat', Session.get("SelectedWalkerId"), message, function (error, result) {
			if (error) {
				console.log(error);
			} else {
				Session.set("SuccessMessage", "Thanks for the message! I'll get back to you ASAP");
			}
		});
		$('#chatInput').val("");
	}
});

