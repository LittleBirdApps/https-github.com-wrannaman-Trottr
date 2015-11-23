 Template.clientPricing.rendered = function () {
 	$('#tour').removeClass('active');
 	$('#pricing').addClass('active');
 	$('#home').removeClass('active');
 	$('#features').removeClass('active');
 	$('#faq').removeClass('active');
 	$('#loginNav').removeClass('active');
 }

 Template.clientPricing.events({
 	'click #pricingSection': function () {
 		$('body').scrollTop(0);
 	}
 });