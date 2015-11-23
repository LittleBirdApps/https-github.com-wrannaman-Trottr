 Template.home.rendered = function () {
    Meteor.defer(function(){
        $(".player").mb_YTPlayer();
    });
    $('.home-page').css('margin-top','0%');
    $('.navbar-nav').css('display', 'inline');
    $('nav').css('display', 'inline');
    $('#tour').removeClass('active');
    $('#features').removeClass('active');
    $('#pricing').removeClass('active');
    $('#faq').removeClass('active');

    console.log("I disabled Sessions in Routes.js ");
 }

 Template.home.destroyed = function () {
    $('.player').remove();
 }