//**********************Pro Chat Main*********************************************************
Template.proChat.rendered = function () {
	$('html').height('100%');
	$('body').height('100%');
	$('.st-content-inner').height('100%');
	$('.proChat-page').height('0');
	Session.set("proNavbar", "Chat");
	Session.set("chatList", true);
	Meteor.call('ProClientChatList', function (error, result) {
		if (result) {
			Session.set("ProClientChatList", result);
		}
	});
	Meteor.call('ProEmployeesChatList', function (error, result) {
		if (result) {
			Session.set("ProEmployeesChatList", result);
		}
	});
}

Template.proChat.helpers({
	chatList: function () {
		return Session.get("chatList");
	}
});

//**********************Pro Chat List**********************************************************

Template.proChatList.helpers({
	clients: function () {
		var clients = Session.get("ProClientChatList");
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
	employees: function () {
		var clients = Session.get("ProEmployeesChatList");
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
	},
	allChatId: function () {
		return 'groupChat';
	}
});


Template.proChatList.events({
	'click li' : function (e,t) {
		Session.set("SelectedChat", this.id);
		console.log(this.id);
		console.log(this);
		Session.set("SelectedChatPic", this.pic);
		Session.set("chatList", false);
		
	},
	'click #groupChat': function (e,t) {
		Session.set('SelectedChat', 'groupChat');
		Session.set("chatList", false);
		Session.set('groupChat', true);
		console.log('Group Chat !!!!!!!');
	}
});

//**********************Pro Chat Message********************************************************

Template.proChatMessage.rendered = function () {
	Meteor.subscribe("Chat");
	Meteor.call("ChatList", Session.get("SelectedChat"), function (error, result) {
		if (result) {
			console.log(result);
			Session.set("ChatList", result);
		}
	});
	Meteor.call("GroupChatMessages", Meteor.userId(), function (error, result) {
		if (result) {
			console.log(result);
			Session.set("groupChatMessages", result);
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

	var autoRunGroupChat = function () {
		Meteor.setTimeout(function (){
			Meteor.call("GroupChatMessages", Meteor.userId(), function (error, result) {
				if (result) {
					console.log(result);
					Session.set("groupChatMessages", result);
				}
			});
		autoRunGroupChat();
		}, 2000);
	} // autorun this function every interval to check for new messages. 
	autoRunGroupChat();
};



Template.proChatMessage.destroyed = function () {
	Session.set('groupChat', false);
}



Template.proChatMessage.helpers({
	message: function () {

		if (Session.get('groupChat')) {
			var messages = Session.get("groupChatMessages");
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
						var pic = Meteor.user().pic;
					} else {
						pic = messages[i].pic;
						console.log(pic);
						console.log('***^^^***Pic*****^^^^');
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
						pic = messages[i].pic;
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
		} else {
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
	}
});

Template.proChatMessage.events({
	'click #send': function (e,t) {
		var message = $('#txtMsg').val();
		var sendTo = Session.get("SelectedChat");
		var from = Meteor.userId();
		var time = moment().format('M/D/YY @ h:mm A');
		if (Session.get('groupChat')) {
			console.log('group chat !!');
			sendTo = 'Group'
			Meteor.call('GroupChat', sendTo, message, time, from, function (error, result) {
				if (result) {
					console.log("message!!!!");
				}
			});

		} else {
			Meteor.call('Chat', sendTo, message, time, from, function (error, result) {
				if (result) {
					console.log("message!!!!");
				}
			});
		}
		$('#txtMsg').val("");
		// Meteor.setTimeout(function () {
		// 	Meteor.call("ChatList", Session.get("SelectedChat"), function (error, result) {
		// 		if (result) {
		// 			Session.set("ChatList", result);
		// 		}
		// 	});
		// }, 1000);
	}
});