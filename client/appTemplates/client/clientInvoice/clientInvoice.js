Template.clientInvoice.rendered = function () {
		Session.set("Navbar", "Invoices");
		$('html').css('height', '100%');
        $('body').css('height', '100%');
        $('#review').val("");
        Session.set('amountWithTip', Session.get("InvoiceDetails").amount);

        //set promo amount
        Session.set('promo', Meteor.user().credit);

        $('#rating').selectize({
            create: false,
            sortField: 'text',
        });


		var string = Session.get("InvoiceDetails").actual_start;
		var string2 = string.toString();
		var array = string2.split(" ");
		console.log(array[4]);
	

		var militaryToAmPm = function (time) {
		            var split = time.split(":");

		            if (Number(split[0]) < 12 ) {
		                return split[0] + ":" + split[1] + " AM";
		            } else if (Number(split[0]) === 12 ) {
		                return split[0] + ":" + split[1] + " PM";
		            } else {
		                if ((Number(split[0])-12) < 10) {
		                    return (Number(split[0])-12)+":" + split[1] + " PM";
		                } else {
		                    return (Number(split[0])-12)+":" + split[1] + " PM";
		                }
		            }
		        };
         Session.set("actual_start",(militaryToAmPm(array[4])));

        string = Session.get("InvoiceDetails").actual_end;
		string2 = string.toString();
		array = string2.split(" ");
		Session.set("actual_end",(militaryToAmPm(array[4])));

		if (Session.get("InvoiceDetails").paid == true) {
			$("#Payment a").attr("disabled","true");
			$("#paytext").text("Already Paid!");
		}
};

Template.clientInvoice.events({
	'click #submitReview': function (e,t) {
		var rating = $('#rating').val();
		var review = $('#review').val();
		var walker_id = Session.get("InvoiceDetails").walker_id;

		if (review == "") {
			sweetAlert({   title: "Your review needs to be at least 5 words",   text: "Thanks for your feedback!",   timer: 1200 });
			return;
		}

		Meteor.call('SaveReview', review, rating, walker_id, function (e,r) {
			if (e) {
				return e;
			}
			if (r) {
				sweetAlert({   title: "Review Saved",   text: "Thanks for your feedback!",   timer: 1200 });
				$('#Review').hide();
				$('#myModal').hide();
			}
		});
	},
	'click #0': function (e,t) {
		$('#10').removeClass("act_inv_rate");
		$('#0').addClass("act_inv_rate");
		$('#15').removeClass("act_inv_rate");
		$('#20').removeClass("act_inv_rate");
		var oldAmount = Number(Session.get("InvoiceDetails").amount);
		var newAmount = oldAmount*1.0
		Session.set('amountWithTip', newAmount.toFixed(2))
		
	},
	'click #10': function (e,t) {
		$('#0').removeClass("act_inv_rate");
		$('#10').addClass("act_inv_rate");
		$('#15').removeClass("act_inv_rate");
		$('#20').removeClass("act_inv_rate");
		var oldAmount = Number(Session.get("InvoiceDetails").amount);
		var newAmount = oldAmount*1.1
		Session.set('amountWithTip', newAmount.toFixed(2))
		
	},
	'click #15': function (e,t) {
		$('#0').removeClass("act_inv_rate");
		$('#15').addClass("act_inv_rate");
		$('#10').removeClass("act_inv_rate");
		$('#20').removeClass("act_inv_rate");
		var oldAmount = Number(Session.get("InvoiceDetails").amount);
		var newAmount = oldAmount*1.15
		Session.set('amountWithTip', newAmount.toFixed(2))
		
	},
	'click #20': function (e,t) {
		$('#0').removeClass("act_inv_rate");
		$('#20').addClass("act_inv_rate");
		$('#15').removeClass("act_inv_rate");
		$('#10').removeClass("act_inv_rate");
		var oldAmount = Number(Session.get("InvoiceDetails").amount);
		var newAmount = oldAmount*1.2
		Session.set('amountWithTip', newAmount.toFixed(2))
	},
	'click #star1': function (e,t) {
		$('#star1').attr("src","img/star-on.png");
		$('#star2').attr("src","img/post_star_icon.png");
		$('#star3').attr("src","img/post_star_icon.png");
		$('#star4').attr("src","img/post_star_icon.png");
		$('#star5').attr("src","img/post_star_icon.png");

		
	},
	'click #star2': function (e,t) {
		$('#star1').attr("src","img/star-on.png");
		$('#star2').attr("src","img/star-on.png");
		$('#star3').attr("src","img/post_star_icon.png");
		$('#star4').attr("src","img/post_star_icon.png");
		$('#star5').attr("src","img/post_star_icon.png");
	},
	'click #star3': function (e,t) {
		$('#star1').attr("src","img/star-on.png");
		$('#star2').attr("src","img/star-on.png");
		$('#star3').attr("src","img/star-on.png");
		$('#star4').attr("src","img/post_star_icon.png");
		$('#star5').attr("src","img/post_star_icon.png");
	},
	'click #star4': function (e,t) {
		$('#star1').attr("src","img/star-on.png");
		$('#star2').attr("src","img/star-on.png");
		$('#star3').attr("src","img/star-on.png");
		$('#star4').attr("src","img/star-on.png");
		$('#star5').attr("src","img/post_star_icon.png");
	},
	'click #star5': function (e,t) {
		$('#star1').attr("src","img/star-on.png");
		$('#star2').attr("src","img/star-on.png");
		$('#star3').attr("src","img/star-on.png");
		$('#star4').attr("src","img/star-on.png");
		$('#star5').attr("src","img/star-on.png");
	},
	'click #Payment': function (e,t) {
		$("#Payment").attr("disabled","true");
		$('#Payment').hide();

			var rating = "";
		if ($('#star1').attr("src") == 'img/star-on.png') {
				rating = 1;
				$("#Payment").attr("disabled","false");
		} 
		if ($('#star2').attr("src") == 'img/star-on.png') {
				rating = 2;
				$("#Payment").attr("disabled","false");
		} 
		if ($('#star3').attr("src") == 'img/star-on.png') {
				rating = 3;
				$("#Payment").attr("disabled","false");
		} 
		if ($('#star4').attr("src") == 'img/star-on.png') {
				rating = 4;	
				$("#Payment").attr("disabled","false");
		} 
		if ($('#star5').attr("src") == 'img/star-on.png') {
				rating = 5;
				$("#Payment").attr("disabled","false");
		} 
		if (rating == "") {
			$("#Payment").attr("disabled","false");
			$('#Payment').show();
			return sweetAlert({ title: "No Rating Found",
  								text: "Please Rate Your Walker!",
  								type: "error"});
		}

		
		if ($('#0').hasClass("act_inv_rate")) {
			var tip = 1;
		} else if ($('#10').hasClass("act_inv_rate")) {
			tip = 1.1;
		} else if ($('#15').hasClass("act_inv_rate")) {
			tip = 1.15;
		} else if ($('#20').hasClass("act_inv_rate")) {
			tip = 1.2;
		}
		
		var invoice_id = Session.get('InvoiceDetails')._id;
		var amount = Session.get('InvoiceDetails').amount; 
		$("#Payment").attr("disabled","true");

		if (!tip) {
			tip = 1;
		}
		if (!rating) {
			rating = 5;
		}

		if (!invoice_id) {
			alert('something went wrong, try again.');
		} else {
			Meteor.call('PayInvoice', invoice_id, rating, tip, amount, function (error, result) {
				if (result) {
					Meteor.call('Invoice', function (error, result) {
				        if (error) {
				            console.log(error);
				            $('#Payment').show();
				        }
				        if (result) {
				            Session.set('MyInvoices', result);
				            $('#Payment').show();
				        }
				    });
				}
			});

			Meteor.setTimeout(function () {
				 Router.go('/clientHistory');
			},700)
		}
	}
});

Template.clientInvoice.helpers({
	pee: function () {
		return Session.get("InvoiceDetails").pee;
	},
	poop: function () {
		return Session.get("InvoiceDetails").poop;
	},
	amount: function () {
		return Session.get("amountWithTip");
	},
	start: function () {
		return Session.get("actual_start");
	},
	stop: function () {
		return Session.get("actual_end");
	},
	walkPath: function () {
		return Session.get("InvoiceDetails").map_url;
	},
	walkPic: function () {
		return Session.get("InvoiceDetails").walkPic;
	},
	length: function () {
		return Math.ceil(Session.get('InvoiceDetails').length/60)
	},
	promo: function () {
		 if (Number(Session.get('promo')) > 0) {
            return Session.get('promo');
        } else {
            return 0
        }
	},
	promoApplied: function () {
        if (Session.get("InvoiceDetails").amount == 0) { // it's a meet and greet
            return 0
        } else if (Number(Session.get('promo')) - Number(Session.get('amountWithTip')) > 0) {
            var number = Number(Session.get('promo')) - Number(Session.get('amountWithTip'))
            return number.toFixed(2)
        } else {
            number = Number(Session.get('amountWithTip')) - Number(Session.get('promo'))
            return  number.toFixed(2)
        }
    }

});