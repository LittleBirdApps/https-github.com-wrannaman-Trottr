 Template.clientFaq.rendered = function () {
 	$('#faq').addClass('active');
 	$('#tour').removeClass('active');
 	$('#pricing').removeClass('active');
 	$('#home').removeClass('active');
 	$('#features').removeClass('active');
 	$('#loginNav').removeClass('active');
 	console.log("next line is faq active");
 	
 }

 Template.clientFaq.events({
 	'click #pricingSection': function () {
 		$('body').scrollTop(0);
 	}
 });