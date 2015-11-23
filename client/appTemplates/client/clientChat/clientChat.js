//**********************Pro Chat Main*********************************************************
Template.clientChat.rendered = function () {
	$('html').height('100%');
	$('body').height('100%');
	$('.st-content-inner').height('100%');
	$('.proChat-page').height('0');
	Session.set("Navbar", "Chat");
	Session.set("chatList", true);
	Meteor.call('ClientWalkerChatList', function (error, result) {
		if (result) {
			Session.set("ClientWalkerChatList", result);
		}
	});

	var autoRunChat = function () {
		Meteor.setTimeout(function (){
			Meteor.call("ChatList", Session.get("SelectedChat"), function (error, result) {
				if (result) {
					console.log(result);
					Session.set("ChatList", result);
				}
			});
		autoRunChat();
		}, 2000);
	} // autorun this function every interval to check for new messages. 
	autoRunChat();
}

Template.clientChat.helpers({
	chatList: function () {
		return Session.get("chatList");
	}
});

//**********************Pro Chat List**********************************************************

Template.clientChatList.helpers({
	walkers: function () {
		var clients = Session.get("ClientWalkerChatList");
		var clientNamesArray = [];
		for (var i=0; i<clients.length; i++) {
			clientNamesArray.push({
				"name": clients[i].name,
				"pic": clients[i].pic,
				"id": clients[i]._id
			})
		}
		return clientNamesArray;
	},
	allChatPic: function () {
		return Meteor.user().pic;
	}
});


Template.clientChatList.events({
	'click li' : function (e,t) {
		Session.set("SelectedChat", this.id);
		console.log(this.id);
		Session.set("SelectedChatPic", this.pic);
		Session.set("chatList", false);
	}
});

//**********************Pro Chat Message********************************************************

Template.clientChatMessage.rendered = function () {
	Meteor.subscribe("Chat");
	Meteor.call("ChatList", function (error, result) {
		if (result) {
			Session.set("ChatList", result);
		}
	});
};



Template.clientChatMessage.helpers({
	message: function () {
		var messages = Session.get("ChatList");
		var messageArray = [];
		var numMessages = Number(messages.length) - 1; 
		console.log(numMessages);
		if (messages.length < 6) {
			console.log('less than 5');
			for (var i = Number(messages.length)-1; i>=0; i--) {
				if (messages[i].from == Meteor.userId()) {
					var num = 2
				} else {
					num = 1
				}

				if (messages[i].from == Meteor.userId()) {
					var pic = Meteor.user().pic
				} else {
					pic = Session.get("SelectedChatPic");
				}
				messageArray.push({
					"num": num,
					"pic": pic,
					"time": messages[i].time,
					"txt": messages[i].message
				})
			}
		} else {
			for (var i = numMessages ; i>=numMessages-5; i--) {
				if (messages[i].from == Meteor.userId()) {
					var num = 2
				} else {
					num = 1
				}

				if (messages[i].from == Meteor.userId()) {
					var pic = Meteor.user().pic
				} else {
					pic = Session.get("SelectedChatPic");
				}
				messageArray.push({
					"num": num,
					"pic": pic,
					"time": messages[i].time,
					"txt": messages[i].message
				})
			}
		}
		return messageArray;
	}
});

Template.clientChatMessage.events({
	'click #send': function (e,t) {
		var message = $('#txtMsg').val();
		var sendTo = Session.get("SelectedChat");
		var from = Meteor.userId();
		var time = moment().format('M/D/YY @ h:mm A');
		Meteor.call('Chat', sendTo, message, time, from, function (error, result) {
			if (result) {
				console.log("message!!!!");
			}
		});
		$('#txtMsg').val("");
		// Meteor.setTimeout(function () {
		// 	Meteor.call("ChatList", function (error, result) {
		// 		if (result) {
		// 			Session.set("ChatList", result);
		// 		}
		// 	});
		// }, 1000);
	}
});