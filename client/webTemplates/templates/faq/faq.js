 Template.faq.rendered = function () {
    $('#faq').addClass('active');
    $('#tour').removeClass('active');
    $('#pricing').removeClass('active');
    $('#home').removeClass('active');
    $('#features').removeClass('active');
    $('#lo')
    console.log("next line is faq active");
    
 }

 Template.faq.events({
    'click #pricingSection': function () {
        $('body').scrollTop(0);
    }
 });