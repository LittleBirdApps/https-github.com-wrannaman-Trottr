Template.invoiceEmail.rendered = function () {
	$('#ha-header').css("display", "none");
};

Template.invoiceEmail.events({
	'click body': function () {
			console.log('clicked');
			alert('clicked');
        var dataContext={
            message:"New Invoice!",
             url:"trottr.us/invoiceEmail",
                title:"New Invoice, login to Trottr to view and pay!"
                };
            var html=Blaze.toHTMLWithData(Template.invoiceEmail,dataContext);
            console.log(html);
            var options= {
              from: "hello@trottr.us",
              to: Meteor.user().email,
              subject:"New Invoice!",
              text:html
              };
            
		Meteor.call('sendInvoiceEmail', options, function (error, result) {
			console.log(result);
		});
	}
});
Template.invoiceEmail.helpers({
	map: function () {
		return Session.get("Map");
	},
	pic: function () {
		return Session.get("WalkPic");
	},
	name: function () {
		return Session.get('walkDetails').clientName;
	},
	pee: function () {
		return Session.get('pee');
	},
	poop: function () {
		return Session.get('poop');
	},
	notes: function () {
		return Session.get('notes');
	},
	service: function () {
		return Session.get('walkDetails').service;
	}

});