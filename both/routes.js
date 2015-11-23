
// Session.setDefault('editing_calevent', null);
// Session.setDefault('showEditEvent', false);
// Session.setDefault('lastMod', null);
// Session.setDefault('eventDetails', null);

//Get curreUI.registerHelper("currentRouteName",function(){
UI.registerHelper("currentRouteName",function(){
  return Router.current()?Router.current().route.getName():"";
});
//************************************************ Google Analytics CONFIG ************************************************************
Router.configure({
    trackPageView: true
});
//********************************** Main  ROUTING ****************************************************************//

// Not Found Page

Router.configure({
  notFoundTemplate: 'notFound'
});
// End Not Found Page

// This is main website controller for PRO / WALKERS 
MainController=RouteController.extend({
  layoutTemplate:"mainLayout",
  loadingTemplate: "spinner",
  // yield navbar and footer templates to navbar and footer regions respectively
  yieldTemplates:{
    "navbar":{
      to:"navbar"
    },
    "footer":{
      to:"footer"
    }
  }
});

ClientWebController = RouteController.extend({
  layoutTemplate:"mainClientWebLayout",
  loadingTemplate: "spinner",
  // yield navbar and footer templates to navbar and footer regions respectively
  yieldTemplates:{
    "clientWebNavbar":{
      to:"clientWebNavbar"
    },
    "footer":{
      to:"footer"
    }
  }
});

ClientMainController = RouteController.extend({
  layoutTemplate:"mainClientLayout",
  loadingTemplate: "spinner",
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
    } else if (Meteor.user().roles[0] === "client") {
      if (Meteor.user().emails[0].verified) {
        this.render('clientHome');
      } else {
        sweetAlert({
            title: "Verify Email",
            text: "Please verify your email address to continue",
            type: "error", 
          });
      }
      
      this.next();

      console.log("you're validated as client, proceed");
    } else {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
      this.next();
    }
    //this.next();
  },
  // yield navbar and footer templates to navbar and footer regions respectively
  yieldTemplates:{
    "clientNavbar":{
      to:"clientNavbar"
    }
  }
});   // main client controller
WalkerMainController = RouteController.extend({
  layoutTemplate:"mainWalkerLayout",
  loadingTemplate: "spinner",
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
    } else if (Meteor.user().roles[0] === "walker") {
      //Meteor.user.roles[0] === "walker"
      this.render('walkerHome');
      this.next();
      console.log("you're validated as walker, proceed");
    } else {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
      this.next();
    }
    //this.next();
  },
  // yield navbar and footer templates to navbar and footer regions respectively
  yieldTemplates:{
    "walkerNavbar":{
      to:"walkerNavbar"
    },
    "footer":{
      to:"footer"
    }
  }
});   // main walker controller

ProMainController = RouteController.extend({
  layoutTemplate:"mainProLayout",
  loadingTemplate: "spinner",
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
    } else if (Meteor.user().roles[0] === "pro") {
      //Meteor.user.roles[0] === "walker"
      this.render('proHome');
      this.next();
      console.log("you're validated as walker, proceed");
    } else {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
      this.next();
    }
    //this.next();
  },
  // yield navbar and footer templates to navbar and footer regions respectively
  yieldTemplates:{
    "proNavbar":{
      to:"proNavbar"
    }
  }
});   // main walker controller


AdminMainController = RouteController.extend({
  layoutTemplate:"adminLayout",
  loadingTemplate: "spinner",
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
    } else if (Meteor.user().email == "andrew@trottr.us" || Meteor.user().email == "ben@trottr.us") {
      //Meteor.user.roles[0] === "walker"
      this.render('adminHome');
      this.next();
      console.log("you're validated as walker, proceed");
    } else {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
      this.next();
    }
    //this.next();
  },
  // yield navbar and footer templates to navbar and footer regions respectively
  yieldTemplates:{
    "adminNavbar":{
      to:"adminNavbar"
    }
  }
});   // main walker controller
//********************************** END Main  ROUTING ****************************************************************//


//********************************** BEGIN WALKER ROUTING & CONTROLLERS********************************************//

WalkerHomeController = WalkerMainController.extend({
  template:"walkerHome"
});
Router.map(function(){
  this.route("walkerHome",{
    path:"/walkerHome",      
    controller:"WalkerHomeController"
  });
});

WalkerProfileController = WalkerMainController.extend({
  template:"walkerProfile"
});
Router.map(function(){
  this.route("walkerProfile",{
    path:"/walkerProfile",   
    controller:"WalkerProfileController"
  });
});

WalkerCalendarListController = WalkerMainController.extend({
  template:"walkerCalendarList"
});
Router.map(function(){
  this.route("walkerCalendarList",{
    path:"/walkerCalendarList",
    controller:"WalkerCalendarListController"
  });
});

WalkerHistoryController = WalkerMainController.extend({
  template:"walkerHistory"
});
Router.map(function(){
  this.route("walkerHistory",{
    path:"/walkerHistory",
    controller:"WalkerHistoryController"
  });
});

WalkerAvailabilityController = WalkerMainController.extend({
  template:"walkerAvailability"
});
Router.map(function(){
  this.route("walkerAvailability",{
    path:"/walkerAvailability",
    controller:"WalkerAvailabilityController"
  });
});

WalkerCalendarController = WalkerMainController.extend({
  template:"walkerCalendar"
});
Router.map(function(){
  this.route("walkerCalendar",{
    path:"/walkerCalendar",
    controller:"WalkerCalendarController"
  });
});
WalkerChatController = WalkerMainController.extend({
  template:"walkerChat",
  waitOn: function () {
    return Meteor.subscribe('Chat');
  }
});
Router.map(function(){
  this.route("walkerChat",{
    path:"/walkerChat",
    controller:"WalkerChatController"
  });
});

WalkerStartController = WalkerMainController.extend({
  template:"walkerStart",
  waitOn: function () {
    return 
  },
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      this.render('/');
    } else if (Meteor.user().roles[0] === "walker") {

      this.render('walkerStart');
      this.next();

      console.log("you're validated as walker, proceed");
    } else {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
      this.next();
    }
    //this.next();
  }
});
Router.map(function(){
  this.route("walkerStart",{
    path:"/walkerStart",
    controller:"WalkerStartController"
  });
});

WalkerStart2Controller = WalkerMainController.extend({
  template:"walkerStart2",
  waitOn: function () {

    return  
  },
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      this.render('/');
    } else if (Meteor.user().roles[0] === "walker") {

      this.render('walkerStart2');
      this.next();

      console.log("you're validated as walker, proceed");
    } else {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
      this.next();
    }
    //this.next();
  }
});
Router.map(function(){
  this.route("walkerStart2",{
    path:"/walkerStart2",
     
     
    controller:"WalkerStart2Controller"
  });
});

WalkerStopController = WalkerMainController.extend({
  template:"walkerStop",
  waitOn: function () {

    return  
  },
  onBeforeAction: function() {
    if(!Meteor.userId()) {
      this.render('/');
    } else if (Meteor.user().roles[0] === "walker") {

      this.render('walkerStop');
      this.next();

      console.log("you're validated as walker, proceed");
    } else {
      Router.go('/');
      sweetAlert({
            title: "Sneaky, Sneaky...",
            text: "You don't have permission! Try logging in, or registering.",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#eb6a5a",
            confirmButtonText: "Whoops",
            closeOnConfirm: true,
            closeOnCancel: true }
      );
      this.next();
    }
    //this.next();
  }
});
Router.map(function(){
  this.route("walkerStop",{
    path:"/walkerStop",
     
     
    controller:"WalkerStopController"
  });
});




//********************************** END WALKER ROUTING & CONTROLLERS********************************************//


//********************************** BEGIN CLIENT ROUTING & CONTROLLERS********************************************//

FindWalkerController = ClientMainController.extend({
  template:"findWalker"
});
Router.route('/findWalker', {
  path: '/findWalker',
  controller: 'FindWalkerController',

});

ClientHomeController = ClientMainController.extend({
  template:"clientHome",
});
Router.map(function(){
  this.route("clientHome",{
    path:"/clientHome",
    controller:"ClientHomeController"
  });
});

ClientProfileController = ClientMainController.extend({
  template:"clientProfile",
});
Router.map(function(){
  this.route("clientProfile",{
    path:"/clientProfile",
    controller:"ClientProfileController"
  });
});

ClientChatController = ClientMainController.extend({
  template:"clientChat",
  waitOn: function () {
    return Meteor.subscribe('Chat');
  }
});
Router.map(function(){
  this.route("clientChat",{
    path:"/clientChat",
    controller:"ClientChatController"
  });
});


ClientCalendarListController = ClientMainController.extend({
  template:"clientCalendarList",
  waitOn: function () {
    Meteor.setTimeout(function () {
       var walker_id = Meteor.user().walkerId;
        return [Meteor.subscribe('IsPro', function (e,r) {
              console.log("*****************Testing1*****************");
             Session.set("Testing", r);
        }), Meteor.subscribe('GetProServicesList', [walker_id], function (e,r) {
            console.log("*****************Testing2*****************");
            Session.set("Testing2", r);
        })];
    }, 1000)
  }
});
Router.map(function(){
  this.route("clientCalendarList",{
    path:"/clientCalendarList", 
    controller:"ClientCalendarListController"
  });
});

ClientHistoryController = ClientMainController.extend({
  template:"clientHistory",
});
Router.map(function(){
  this.route("clientHistory",{
    path:"/clientHistory",
    controller:"ClientHistoryController"
  });
});

ClientCalendarController = ClientMainController.extend({
  template:"clientCalendar",
  waitOn: function () {

    var walkerId = Session.get("SelectedWalkerId");
    Meteor.call("MyWalkersAvailability", Meteor.user().walkerId, function (error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                 } else {
                    Session.set("WalkerAvailEvents", results);
                     return
                 }
             });
     Meteor.call("CalEventsForMyWalker", Meteor.userId(), Meteor.user().walkerId, function (error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                 } else {
                    Session.set("CalEventsForMyWalker", results);
                     return
                 }
             });

    // return one handle, a function, or an array
    return [Meteor.subscribe('WalkerAvailabilityEvents', Meteor.user().walkerId),
    Meteor.subscribe('MyCalEvents')]
  },
});
Router.map(function(){
  this.route("clientCalendar",{
    path:"/clientCalendar",
    controller:"ClientCalendarController"
  });
});

WalkerHighlightController = ClientMainController.extend({
    template:"walkerHighlight",
});
Router.map(function(){
    this.route("walkerHighlight",{
        path:"/walkerHighlight",
        controller:"WalkerHighlightController"
    });
});
ClientInvoiceController = ClientMainController.extend({
    template:"clientInvoice",
});
Router.map(function(){
    this.route("clientInvoice",{
        path:"/clientInvoice",  
        controller:"ClientInvoiceController"
    });
});

ClientDogsController = ClientMainController.extend({
    template:"clientDogs",
});
Router.map(function(){
    this.route("clientDogs",{
        path:"/clientDogs",
        controller:"ClientDogsController"
    });
});

ClientPaymentController = ClientMainController.extend({
    template:"clientPayment",
});
Router.map(function(){
    this.route("clientPayment",{
        path:"/clientPayment",
        controller:"ClientPaymentController"
    });
});


ClientReviewsController=ClientMainController.extend({
  template:"ClientReviews"
});
Router.map(function(){
  this.route("ClientReviews",{
    path:"/ClientReviews",
    controller:"ClientReviewsController"
  });
});


//********************************** END CLIENT ROUTING & CONTROLLERS********************************************//
//********************************** BEGIN PRO ROUTING & CONTROLLERS********************************************//

ProHomeController = ProMainController.extend({
  template:"proHome"
});
Router.map(function(){
  this.route("proHome",{
    path:"/proHome",
    controller:"ProHomeController"
  });
});

ProProfileController = ProMainController.extend({
  template:"proProfile"
});
Router.map(function(){
  this.route("proProfile",{
    path:"/proProfile",
    controller:"ProProfileController"
  });
});

ProCalendarListController = ProMainController.extend({
  template:"proCalendarList"
});
Router.map(function(){
  this.route("proCalendarList",{
    path:"/proCalendarList",
    controller:"ProCalendarListController"
  });
});

ProHistoryController = ProMainController.extend({
  template:"proHistory"
});
Router.map(function(){
  this.route("proHistory",{
    path:"/proHistory",
    controller:"ProHistoryController"
  });
});

ProAvailabilityController = ProMainController.extend({
  template:"proAvailability"
});
Router.map(function(){
  this.route("proAvailability",{
    path:"/proAvailability",
    controller:"ProAvailabilityController"
  });
});

ProCalendarController = ProMainController.extend({
  template:"proCalendar"
});
Router.map(function(){
  this.route("proCalendar",{
    path:"/proCalendar",
    controller:"ProCalendarController"
  });
});

ProChatController = ProMainController.extend({
    template:"proChat"
});
Router.map(function(){
    this.route("proChat",{
        path:"/proChat",
        controller:"ProChatController"
    });
});

ProServicesController = ProMainController.extend({
  template:"proServices"
});
Router.map(function(){
  this.route("proServices",{
    path:"/proServices",
    controller:"ProServicesController"
  });
});

ProEmployeeController = ProMainController.extend({
  template:"proEmployee"
});
Router.map(function(){
  this.route("proEmployee",{
    path:"/proEmployee",
    controller:"ProEmployeeController"
  });
});

ProWalkerHighlightController = ProMainController.extend({
  template:"proWalkerHighlight"
});
Router.map(function(){
  this.route("proWalkerHighlight",{
    path:"/proWalkerHighlight",
    controller:"ProWalkerHighlightController"
  });
});

//********************************** END PRO ROUTING & CONTROLLERS********************************************//


//********************************** BEGIN WEBSITE ROUTING & CONTROLLERS********************************************//

SwitchController=MainController.extend({
   template:"switch"
});

Router.map(function(){
  this.route("switch",{ 
    path:"/",
    controller:"SwitchController"
  });
});

HomeController=MainController.extend({
  template:"home"
});
Router.map(function(){
  this.route("home",{ 
    path:"/home",
    controller:"HomeController"
  });
});


TourController=MainController.extend({
  template:"tour"
});
Router.map(function(){
  this.route("tour",{ 
    path:"/tour",
    controller:"TourController"
  });
});

PricingController=MainController.extend({
  template:"pricing"
});
Router.map(function(){
  this.route("pricing",{ 
    path:"/pricing",
    controller:"PricingController"
  });
});

FaqController=MainController.extend({
  template:"faq"
});
Router.map(function(){
  this.route("faq",{ 
    path:"/faq",
    controller:"FaqController"
  });
});

LoginController=MainController.extend({
  template:"login"
});
Router.map(function(){
  this.route("login",{ 
    path:"/pro/login",
    controller:"LoginController"
  });
});

SignupController=MainController.extend({
  template:"signup"
});
Router.map(function(){
  this.route("signup",{ 
    path:"/pro/signup",
    controller:"SignupController"
  });
});

ResetPasswordController=MainController.extend({
  template:"resetPassword"
});
Router.map(function(){
  this.route("resetPassword",{ 
    path:"/resetPassword",
    controller:"ResetPasswordController"
  });
});

/*****************************************FEATURES****************************************************************/
FeaturesController=MainController.extend({
  template:"features"
});
Router.map(function(){
  this.route("features",{ 
    path:"/features",
    controller:"FeaturesController"
  });
});

  OnlineBookingController=MainController.extend({
    template:"onlineBooking"
  });
  Router.map(function(){
    this.route("onlineBooking",{ 
      path:"/features/onlineBooking",
      controller:"OnlineBookingController"
    });
  });

  StaffResourcesController=MainController.extend({
    template:"staffResources"
  });
  Router.map(function(){
    this.route("staffResources",{ 
      path:"/features/staffResources",
      controller:"StaffResourcesController"
    });
  });

  ReportsController=MainController.extend({
    template:"reports"
  });
  Router.map(function(){
    this.route("reports",{ 
      path:"/features/reports",
      controller:"ReportsController"
    });
  });

  POSController=MainController.extend({
    template:"POS"
  });
  Router.map(function(){
    this.route("POS",{ 
      path:"/features/POS",
      controller:"POSController"
    });
  });

  ClientToolsController=MainController.extend({
    template:"clientTools"
  });
  Router.map(function(){
    this.route("clientTools",{ 
      path:"/features/clientTools",
      controller:"ClientToolsController"
    });
  });

  MarketingToolsController=MainController.extend({
    template:"marketingTools"
  });
  Router.map(function(){
    this.route("marketingTools",{ 
      path:"/features/marketingTools",
      controller:"MarketingToolsController"
    });
  });

  AutomationController=MainController.extend({
    template:"automation"
  });
  Router.map(function(){
    this.route("automation",{ 
      path:"/features/automation",
      controller:"AutomationController"
    });
  });
  /*****************************************  END  FEATURES  ****************************************************************/
/************************************** Client WEB  Routes*******************************************************************/

ClientWebHomeController=ClientWebController.extend({
    template:"clientWebHome"
  });
  Router.map(function(){
    this.route("clientWebHome",{ 
      path:"/client/home",
      controller:"ClientWebHomeController"
    });
  });

  ClientWebLoginController=ClientWebController.extend({
    template:"clientLogin"
  });
  Router.map(function(){
    this.route("clientLogin",{ 
      path:"/client/login",
      controller:"ClientWebLoginController"
    });
  });

  ClientWebSignupController=ClientWebController.extend({
    template:"clientSignup"
  });
  Router.map(function(){
    this.route("clientSignup",{ 
      path:"/client/signup",
      controller:"ClientWebSignupController"
    });
  });

  ClientWebPricingController=ClientWebController.extend({
    template:"clientPricing"
  });
  Router.map(function(){
    this.route("clientPricing",{ 
      path:"/client/pricing",
      controller:"ClientWebPricingController"
    });
  });

  ClientWebFaqController=ClientWebController.extend({
    template:"clientFaq"
  });
  Router.map(function(){
    this.route("clientFaq",{ 
      path:"/client/faq",
      controller:"ClientWebFaqController"
    });
  });

 ClientWebWalkersController=ClientWebController.extend({
    template:"clientWalkers"
  });
  Router.map(function(){
    this.route("clientWalkers",{ 
      path:"/client/walkers",
      controller:"ClientWebWalkersController"
    });
  });

/*********************************************************************************************************/

//**********************************  WEBSITE ROUTING & CONTROLLERS********************************************//

WebSearchController=MainController.extend({
  template:"webSearch"
});
Router.map(function(){
  this.route("webSearch",{
    path:"/webSearch", 
    controller:"WebSearchController"
  });
});

AboutController=MainController.extend({
  template:"about"
});
Router.map(function(){
  this.route("about",{
    path:"/about",
    controller:"AboutController"
  });
});

TabsController=MainController.extend({
  template:"tabs"
});
Router.map(function(){
  this.route("tabs",{
    path:"/tabs",
    controller:"TabsController"
  });
});

BecomeClientController=MainController.extend({
  template:"becomeClient"
});
Router.map(function(){
  this.route("becomeClient",{
    path:"/becomeClient",
    controller:"BecomeClientController"
  });
});

BecomeWalkerController=MainController.extend({
  template:"becomeWalker"
});
Router.map(function(){
  this.route("becomeWalker",{
    path:"/becomeWalker",
    controller:"BecomeWalkerController"
  });
});

BecomeProController=MainController.extend({
  template:"becomePro"
});
Router.map(function(){
  this.route("becomePro",{
    path:"/becomePro",
    controller:"BecomeProController"
  });
});

InvoiceEmailController=MainController.extend({
  template:"invoiceEmail"
});
Router.map(function(){
  this.route("invoiceEmail",{
    path:"/invoiceEmail",
    controller:"InvoiceEmailController"
  });
});

ReviewsController=MainController.extend({
  template:"reviews"
});
Router.map(function(){
  this.route("reviews",{
    path:"/reviews",
    controller:"ReviewsController"
  });
});

SpinnerController = RouteController.extend({
  template:"spinner"
});
Router.map(function(){
  this.route("spinner",{
    path:"/spinner",
    controller:"SpinnerController"
  });
});


//********************************** END WEBSITE ROUTING & CONTROLLERS********************************************//

//********************************** BEGIN ADMIN ROUTING & CONTROLLERS********************************************//

AdminHomeController = AdminMainController.extend({
  template:"adminHome"
});
Router.map(function(){
  this.route("adminHome",{
    path:"/adminHome",
    controller:"AdminMainController"
  });
});

AdminPayoutController = AdminMainController.extend({
  template:"adminPayout"
});
Router.map(function(){
  this.route("adminPayout",{
    path:"/adminPayout",
    controller:"AdminPayoutController"
  });
});

//********************************** END ADMIN ROUTING & CONTROLLERS********************************************//





