 Template.pricing.rendered = function () {
 	$('#tour').removeClass('active');
 	$('#pricing').addClass('active');
 	$('#home').removeClass('active');
 	$('#features').removeClass('active');
 	$('#faq').removeClass('active');
 }

 Template.pricing.events({
 	'click #pricingSection': function () {
 		$('body').scrollTop(0);
 	}
 });