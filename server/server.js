S3.config = {
    key: '',
    secret: '',
    bucket: ''
};

var Stripe = StripeAPI('');
var Future = Npm.require('fibers/future');
var fut = new Future();
var fut2 = new Future();
var fut3 = new Future();
var fut4 = new Future();
var fut5 = new Future();

Accounts.config({
    forbidClientAccountCreation: false
});

Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
    // can only change your own documents
    if(user._id === userId)
    {
      Meteor.users.update({_id: userId}, modifier);
      return true;
    }
    else return false;
  }
});

//sikka variables, going to have to change each time sikka upgrades
// its the firewal to prevent dos attacks.
// publickey 6LcwHgQTAAAAAJ9mPAOHJ2iDBuPhY1MvoZTQX3XX
// secret 6LcwHgQTAAAAANIUiNzN6UkR7fmDWdwYSnvhULu0

// Meteor.startup(function () {
//     process.env.SIKKA_CAPTCHA_SITE_KEY = '6LcwHgQTAAAAAJ9mPAOHJ2iDBuPhY1MvoZTQX3XX'
//     process.env.SIKKA_CAPTCHA_SECRET = '6LcwHgQTAAAAANIUiNzN6UkR7fmDWdwYSnvhULu0'
// });

// Meteor.startup(function () {
//     export SIKKA_CAPTCHA_SITE_KEY = '6LcwHgQTAAAAAJ9mPAOHJ2iDBuPhY1MvoZTQX3XX'
//     export SIKKA_CAPTCHA_SECRET = '6LcwHgQTAAAAANIUiNzN6UkR7fmDWdwYSnvhULu0'
// })
Meteor.setTimeout(function () {
    console.log(Meteor.settings)
    console.log(Meteor.settings)
},3000)

//********************************************* Email Templates ********************************//

Accounts.emailTemplates.siteName = "Trottr";
Accounts.emailTemplates.from = "Trottr <hello@trottr.us>";
Accounts.emailTemplates.resetPassword.subject = function () {
    return "Getting Back Into Trottr"
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
   return "Hi There, \n\n"
     + "Sorry you had to reset your password. The good news is, it's easy to get back in.\n\n"
     + " To reset your password, click the link below:\n\n"
     + url;
};

Accounts.emailTemplates.verifyEmail.subject = function () {
    return "Confirm Your Email Address For Trottr"
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    console.log('*this is email template');
    console.log(user);
    if (user.name) {
        return "Hi " + user.name + ", \n\n"
         + "To ensure that everyone on the app is a real person, we need you to verify your email address.\n\n"
         + "To verify your email, click the link below:\n\n"
         + url;
     } else if (user.firstName) {
        return "Hi " + user.name + ", \n\n"
         + "To ensure that everyone on the app is a real person, we need you to verify your email address.\n\n"
         + "To verify your email, click the link below:\n\n"
         + url;
     } else {
        return "Hi! , \n\n"
         + "To ensure that everyone on the app is a real person, we need you to verify your email address.\n\n"
         + "To verify your email, click the link below:\n\n"
         + url;
     }

};
//********************************************* PUBLISH FUNCTIONS ********************************//

Meteor.publish('WalkerAvailabilityEvents', function(walkerId) {
  return WalkerAvailabilityEvents.find({walkerId: walkerId});
});
Meteor.publish(null, function (){
    return Meteor.roles.find({});
});
Meteor.publish(null, function (){
    return Meteor.users.find({});
});
Meteor.publish('Chat', function () {
    return Chat.find({$or:[
        {"from": this.userId},
        {"send_to": this.userId}
    ]})
});
Meteor.publish('MyCalEvents', function () {
    return CalEvents.find({"userId": this.userId});
});

Meteor.publish('IsPro', function () {
    if (Meteor.users.findOne({_id: walker_id}).role[0] == "pro" || Meteor.users.findOne({_id: walker_id}).employee == true ){
        return true;
    } else {
        return false;
    }
});

Meteor.publish('GetProServicesList', function (walker_id) {
    if (Meteor.users.findOne({_id: walker_id}).employee == true) {
            var employer = Meteor.users.findOne({_id: walker_id}).employer_id;
             return ProServices.find({pro_id: employer}).fetch();
        } else {
            return ProServices.find({pro_id: walker_id}).fetch();
        }
});



//first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
    service: "facebook"
});
ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "",
    secret: ""
});

Accounts.onCreateUser(function(options,user) {
    var role = ['client'];
    user.roles = role;
    return user;
});

//********************************************* Methods *********************************************//

Meteor.methods({
//********************************************* Website Contact From *********************************************//
     sendContactFormEmail: function (firstName, lastName, phone, from, howHear, text) {
        check([firstName, lastName, from, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
          to: 'hello@trottr.us',
          from: from,
          subject: "Message From Contact Form by " + firstName + " " + lastName,
          text: "first name: " + firstName + " last name: " + lastName + " phone: " + phone + " how hear: " + howHear + " " + text
        });
        return 1;
  },
//********************************************* Users *********************************************//
    AddFbInfo: function(id, fbEmail, fbName, fbFirstName, fbLastName, fbLink) {

        Meteor.users.update({_id:id}, {$set: {"emails[0].address": fbEmail}});
        Meteor.users.update({_id:id}, {$set: {"email": fbEmail}});
        Meteor.users.update({_id:id}, {$set: {"about_me": ""}});
        Meteor.users.update({_id:id}, {$set: {"name": fbName}});
        Meteor.users.update({_id:id}, {$set: {"firstName": fbFirstName}});
        Meteor.users.update({_id:id}, {$set: {"lastName": fbLastName}});
        Meteor.users.update({_id:id}, {$set: {"link": fbLink}});
        Meteor.users.update({_id:id}, {$set: {"credit": 0}});
        // Add profile picture from faebook graph api upon registering with facebook.
        //https://graph.facebook.com/592771998/picture?type=large
        var fbPic = "https://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture?type=large";
        Meteor.users.update({_id:id}, {$set: {"pic": fbPic}});
    },
    AddClientProfile: function (firstName, lastName, phoneNum, address) {

        var id = Meteor.userId();
        console.log(firstName, lastName, phoneNum, address, id);
        Meteor.users.update({_id:id}, {$set: {"firstName": firstName}});
        Meteor.users.update({_id:id}, {$set: {"name": firstName + " " + lastName}});
        Meteor.users.update({_id:id}, {$set: {"lastName": lastName}});
        Meteor.users.update({_id:id}, {$set: {"phoneNum": phoneNum}});
        Meteor.users.update({_id:id}, {$set: {"address": address}});
        Meteor.users.update({_id:id}, {$set: {"role": ["client"]}});
        Meteor.users.update({_id:id}, {$set: {"credit": 0}});

        var geo = new GeoCoder();
        var result = geo.geocode(address);
        // console.log(result[0].latitude);
        // console.log(result[0].longitude);
        Meteor.users.update({_id:id}, {$set: {"lat": result[0].latitude}});
        Meteor.users.update({_id:id}, {$set: {"long": result[0].longitude}});

        console.log("Client Profile was updated");

        var email= Meteor.user().emails[0].address;
        Meteor.users.update({_id:id}, {$set: {"email": email}});
    },
    AddWalkerProfile: function (id, role, firstName, lastName, phoneNum, address, walkRadius, about) {
        Meteor.users.update({_id:id}, {$set: {"role": ["walker"]}});
        Meteor.users.update({_id:id}, {$set: {"roles": ["walker"]}});
        Meteor.users.update({_id:id}, {$set: {"name": firstName + " " + lastName}});
        Meteor.users.update({_id:id}, {$set: {"firstName": firstName}});
        Meteor.users.update({_id:id}, {$set: {"lastName": lastName}});
        Meteor.users.update({_id:id}, {$set: {"phoneNum": phoneNum}});
        Meteor.users.update({_id:id}, {$set: {"address": address}});
        Meteor.users.update({_id:id}, {$set: {"walkRadius": walkRadius}});
        Meteor.users.update({_id:id}, {$set: {"about_me": about}});
        Meteor.users.update({_id:id}, {$set: {"credit": 0}});

        // services the walker can provide
        WalkerServices.insert({walker_id: Meteor.userId(), title: '15 Minute Meet And Greet', price: 0, length: 15});
        WalkerServices.insert({walker_id: Meteor.userId(), title: '15 Minute Walk', price: 15, length: 15});
        WalkerServices.insert({walker_id: Meteor.userId(), title: '30 Minute Walk', price: 20, length: 30});
        WalkerServices.insert({walker_id: Meteor.userId(), title: '45 Minute Walk', price: 25, length: 45});
        WalkerServices.insert({walker_id: Meteor.userId(), title: '60 Minute Walk', price: 30, length: 60});

        var email= Meteor.user().emails[0].address;
        Meteor.users.update({_id:id}, {$set: {"email": email}});

        var geo = new GeoCoder();
        var result = geo.geocode(address);
        // console.log(result[0].latitude);
        // console.log(result[0].longitude);
        Meteor.users.update({_id:id}, {$set: {"lat": result[0].latitude}});
        Meteor.users.update({_id:id}, {$set: {"long": result[0].longitude}});


        // I dont kow why the .5 works but it does for 1 mile and 5 miles for where we are on the equator. fuck it.
        var latRadius = Number(result[0].latitude) + ((1/68.68) * Number(walkRadius)*.5);
        var longRadius = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(walkRadius)*.5);


        // I dont kow a better way to do this but I'm setting up a square arond the users address to imageine
        // a circle with long top the top part of the circle and long bottom the bottom part of the circle
        // and lat left the left part of the circle and lat right the right part of the circle that way if
        //the client is within that square we can return that walker.

        var latRight = Number(result[0].latitude) + ((1/68.68) * Number(walkRadius)*.5);
        var latLeft = Number(result[0].latitude) - ((1/68.68) * Number(walkRadius)*.5);
        var longTop = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(walkRadius)*.25);
        var longBottom = result[0].longitude - ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(walkRadius)*.25);

        // console.log(latRight);
        // console.log(latLeft);
        // console.log(longTop);
        // console.log(longBottom);


        Meteor.users.update({_id:id}, {$set: {"latRight": Number(latRight)}});
        Meteor.users.update({_id:id}, {$set: {"latLeft": Number(latLeft)}});
        Meteor.users.update({_id:id}, {$set: {"longTop": Number(longTop)}});
        Meteor.users.update({_id:id}, {$set: {"longBottom": Number(longBottom)}});

        var review = "This awesome walker passed Trottr's rigorous interview process. " + firstName + " has earned our trust, and we feel they are ready to take care of your pet."

        Reviews.insert({  walker_id:Meteor.userId(), date: new Date(), format_date: new Date(), review: review, rating: 5, reviewer_name: "Trottr"  });

        Email.send({
            from: email,
            to: "hello@trottr.us",
            subject: "New Walker Applicant",
            html: "Name is: " + firstName + " " + lastName + "\n\n<br> Phone Number is: " + phoneNum + "\n\n<br> Their address is: " + address + "\n\n<br> Their walk radius: " + walkRadius
        });

        Meteor.users.update({_id:id}, {$set: {"role": ["client"]}});
        Meteor.users.update({_id:id}, {$set: {"roles": ["client"]}});
        console.log("walker Profile was updated");
    },
    AddProProfile: function (id, firstName, lastName, businessName, phoneNum, address, walkRadius, about) {
        Roles.addUsersToRoles(id, ["pro"]);
        Meteor.users.update({_id:id}, {$set: {"firstName": firstName}});
        Meteor.users.update({_id:id}, {$set: {"lastName": lastName}});
        Meteor.users.update({_id:id}, {$set: {"phoneNum": phoneNum}});
        Meteor.users.update({_id:id}, {$set: {"name": firstName +  " " + lastName}});
        Meteor.users.update({_id:id}, {$set: {"address": address}});
        Meteor.users.update({_id:id}, {$set: {"businessName": businessName}});
        Meteor.users.update({_id:id}, {$set: {"walkRadius": walkRadius}});
        Meteor.users.update({_id:id}, {$set: {"role": ["pro"]}});
        Meteor.users.update({_id:id}, {$set: {"roles": ["pro"]}});
        Meteor.users.update({_id:id}, {$set: {"about_me": about}});
        Meteor.users.update({_id:id}, {$set: {"configured": false}});
        Meteor.users.update({_id:id}, {$set: {"credit": 0}});

        var email= Meteor.user().emails[0].address;
        Meteor.users.update({_id:id}, {$set: {"email": email}});

        var geo = new GeoCoder();
        var result = geo.geocode(address);
        Meteor.users.update({_id:id}, {$set: {"lat": Number(result[0].latitude)}});
        Meteor.users.update({_id:id}, {$set: {"long": Number(result[0].longitude)}});
        // I dont kow why the .5 works but it does for 1 mile and 5 miles for where we are on the equator. fuck it.
        var latRadius = Number(result[0].latitude) + ((1/68.68) * Number(walkRadius)*.5);
        var longRadius = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(walkRadius)*.5);
        // I dont kow a better way to do this but I'm setting up a square arond the users address to imageine
        // a circle with long top the top part of the circle and long bottom the bottom part of the circle
        // and lat left the left part of the circle and lat right the right part of the circle that way if
        //the client is within that square we can return that walker.
        var latRight = Number(result[0].latitude) + ((1/68.68) * Number(walkRadius)*.5);
        var latLeft = Number(result[0].latitude) - ((1/68.68) * Number(walkRadius)*.5);
        var longTop = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(walkRadius)*.25);
        var longBottom = result[0].longitude - ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(walkRadius)*.25);
        Meteor.users.update({_id:id}, {$set: {"latRight": latRight}});
        Meteor.users.update({_id:id}, {$set: {"latLeft": latLeft}});
        Meteor.users.update({_id:id}, {$set: {"longTop": longTop}});
        Meteor.users.update({_id:id}, {$set: {"longBottom": longBottom}});

        Meteor.users.update({_id:id}, {$set: {"role": ["client"]}});
        Meteor.users.update({_id:id}, {$set: {"roles": ["client"]}});
        console.log("pro was updated");
    },
    IsPro: function (walker_id) {
        if (Meteor.users.findOne({_id: walker_id}).roles[0] == "pro" || Meteor.users.findOne({_id: walker_id}).employee == true ){
            return true;
        } else {
            return false;
        }
    },
    GetProServicesList: function (walker_id) {

        // the walker is an employee
        if (Meteor.users.findOne({_id: walker_id}).employee == true) {
            var employer = Meteor.users.findOne({_id: walker_id}).employer_id;
             return ProServices.find({pro_id: employer}).fetch();
        } else {
            return ProServices.find({pro_id: walker_id}).fetch();
        }
        // else the person is a pro themselves.
    },
    AddWalk: function (title, start, date, end, startTimeMinutes, endTimeMinutes, actual_start, actual_end, eventDetails, dateSortFormat, client) {
        var userId = Meteor.userId();
        var walkerId = Meteor.user().walkerId;
        var walkerName = Meteor.users.findOne({_id: walkerId}).firstName + " " + Meteor.users.findOne({_id: walkerId}).lastName;
        var userName = Meteor.user().name;
        var amount = 0

        if ((endTimeMinutes - startTimeMinutes) == 15) {
            //check if 15 minute meet and greet.
            if (title == "15 Minute Meet And Greet") {
                amount = 0
            } else {
                 amount = 15;
            }

        }
        if ((endTimeMinutes - startTimeMinutes) == 30) {
            amount = 20;
        }
        if ((endTimeMinutes - startTimeMinutes) == 45) {
            amount = 25;
        }
        if ((endTimeMinutes - startTimeMinutes) == 60) {
            amount = 30;
        }

        // send client an email
        Email.send({
            from: "hello@trottr.us",
            to: Meteor.user().email,
            subject: "You Booked A " +  title + "!",
            html: "Hi " + userName + "<br>" + "You booked a " + title +  " with " + walkerName + " on " + moment(start).format('M/D/YY') + " at " + moment(start).format('h:m A') + ".<br>"
            + "If you need to cancel, log in and click on 'scheduled' in the nav bar. There will be an orange 'x' next to each walk. You can click or tap on it to delete a walk."
        });

        // get walker email
        var walkerEmail = Meteor.users.find({_id: walkerId}).fetch()[0].email;
        //send email to walker too.
        Email.send({
            from: "hello@trottr.us",
            to: walkerEmail,
            subject: "You've Been Booked For A " +  title + "!",
            html: "Hi " + walkerName + "<br>" + "You've been booked for a " + title +  " with " + Meteor.user().name + " on " + moment(start).format('M/D/YY') + " at " + moment(start).format('h:m A') + ".<br><br>"
            + "All of the details for the walk, including their address, email, and phone number are in the app. To view it, log in and click or tap on 'My Schedule'. If you need to cancel, you will have to"
            + " contact the client and have them cancel the walk. You can contact them via chat, phone, or email."
        });

        CalEvents.insert(
            {
                title: title,
                start: start,
                date: date,
                end: end,
                startTimeMinutes: startTimeMinutes,
                endTimeMinutes: endTimeMinutes,
                actual_start: null,
                actual_end: null,
                eventDetails: eventDetails,
                dateSortFormat: dateSortFormat,
                client: client,
                walkerId: walkerId,
                userId: userId,
                userName: userName,
                walkerName: walkerName,
                amount: amount
            }
        );

        return "walk added";
    },
    ProServiceEventDetails: function (_id) {
        return ProServices.find({_id: _id}).fetch()[0];
    },
    AddProWalk: function (amount, title, start, date, end, startTimeMinutes, endTimeMinutes, actual_start, actual_end, eventDetails, dateSortFormat, client) {
        var userId = Meteor.userId();
        var walkerId = Meteor.user().walkerId;
        var walkerName = Meteor.users.findOne({_id: walkerId}).firstName + " " + Meteor.users.findOne({_id: walkerId}).lastName;
        var userName = Meteor.user().name;
        CalEvents.insert(
            {
                title: title,
                start: start,
                date: date,
                end: end,
                startTimeMinutes: startTimeMinutes,
                endTimeMinutes: endTimeMinutes,
                actual_start: null,
                actual_end: null,
                eventDetails: eventDetails,
                dateSortFormat: dateSortFormat,
                client: client,
                walkerId: walkerId,
                userId: userId,
                userName: userName,
                walkerName: walkerName,
                amount: amount
            }
        );

        // send client an email
        Email.send({
            from: "hello@trottr.us",
            to: Meteor.user().email,
            subject: "You Booked A " +  title + "!",
            html: "Hi " + userName + " <br>" + "You booked a " + title +  " with " + walkerName + " on " + moment(start).format('M/D/YY') + " at " + moment(start).format('h:m A') + ".<br>"
            + "If you need to cancel, log in and click on 'scheduled' in the nav bar. There will be an orange 'x' next to each walk. You can click or tap on it to delete a walk."
        });

        // get walker email
        var walkerEmail = Meteor.users.find({_id: walkerId}).fetch()[0].email;
        //send email to walker too.
        Email.send({
            from: "hello@trottr.us",
            to: walkerEmail,
            subject: "You've Been Booked For A " +  title + "!",
            html: "Hi " + walkerName + " <br>" + "You've been booked for a " + title +  " with " + Meteor.user().name + " on " + moment(start).format('M/D/YY') + " at " + moment(start).format('h:m A') + ".<br><br>"
            + "All of the details for the walk, including their address, email, and phone number are in the app. To view it, log in and click or tap on 'My Schedule'. If you need to cancel, you will have"
            + " to contact the client and have them cancel the walk. You can contact them via chat, phone, or email."
        });

        return "walk added";
    },
    SendNewWalkerEmail: function (bothNames,phoneNum,address,walkRadius,socialShare,ownIphone,about,whyTrottr) {
        Email.send({
            from: "andrew@trottr.us",
            to: "hello@trottr.us",
            subject: "New Walker Applicant",
            html: "Name is: " + bothNames + "<br> Phone Number is: " + phoneNum + "<br> Their address is: " + address + "<br> Their walk radius: " + walkRadius+ "<br> Share on social media: " + socialShare+ "<br> Have iPhone: " + ownIphone + "<br> about themselves: " + about + "<br> Why do they wanna be trottr walker:  " +whyTrottr
        });
        console.log("messageSent");
    },
    ReturnScheduledEvents: function ( date ) {
        var scheduledCursor = CalEvents.find({date: date });
        var arrayOfScheduledEvents = [];
        if (!scheduledCursor.count()) {
            return
        } else {
            scheduledCursor.forEach(function(row){
                arrayOfScheduledEvents.push(row.startTimeMinutes + " " + row.endTimeMinutes);
            });
        }

        return arrayOfScheduledEvents;
    },
    WalkerServicesList: function (walker_id) {

        if (Meteor.users.findOne({_id: walker_id}).roles[0] == "walker") {
            var walkerServices = WalkerServices.find({walker_id: Meteor.user().walkerId}).fetch();
             return walkerServices;
        } else { // otherwise they are a pro
             if (Meteor.users.findOne({_id: walker_id}).employee == true) {
                var employer = Meteor.users.findOne({_id: walker_id}).employer_id;
                console.table(ProServices.find({pro_id: employer}).fetch());
                 return ProServices.find({pro_id: employer}).fetch();
            } else {
                console.table(ProServices.find({pro_id: walker_id}).fetch());
                return ProServices.find({pro_id: walker_id}).fetch();
            }
        }

    },
    WalkerHighlightServicesList: function (id) {
        if (Meteor.users.findOne({_id: id}).roles[0] == "walker") {
            console.log('calling walker')
            var walkerServices = WalkerServices.find({walker_id: id}).fetch();
             return walkerServices;
        } else { // otherwise they are a pro
             if (Meteor.users.findOne({_id: id}).employee == true) {
                console.log('calling employee')
                var employer = Meteor.users.findOne({_id: id}).employer_id;
                 return ProServices.find({pro_id: employer}).fetch();
            } else {
                 console.log('calling Pro itself');
                return ProServices.find({pro_id: id}).fetch();
            }
        }

        //return WalkerServices.find({walker_id: id}).fetch();
    },
    IsWalkerAvailableOnDate: function(walker_id, date) {
        return WalkerAvailabilityEvents.find({$and: [{walkerId: walker_id},{startDateForMatching: date}]}).fetch();
    },
    RemoveOldAvailability: function(walker_id) {

        var avail = WalkerAvailabilityEvents.find({walkerId: walker_id}).fetch();
         //console.log(avail);


        console.log(moment(new Date()).format('YYYYMMDD'));

        for (var i=0; i<avail.length; i++) {
            if (avail[i].startDateForMatching < moment(new Date()).format('YYYYMMDD')) {
                WalkerAvailabilityEvents.remove({_id: avail[i]._id});
                //console.log(avail[i]);
                console.log('removing an old event');
            }
        }
        //return WalkerAvailabilityEvents.find({$and: [{walkerId: walker_id},{startDateForMatching: date}]}).fetch();
    },
    IsWalkerAvailableForSelectedDate : function (startDateForMatching, eventStartMinutes, eventEndMinutes) {
        var resultsArray = [];
        WalkerAvailabilityEvents.find({ startDateForMatching: startDateForMatching }).map( function (a) {
            resultsArray.push(a.startTimeMinutes + " " + a.endTimeMinutes);
        });
        var isAvailable = function (resultsArray, eventStartMinutes, eventEndMinutes) {
            var newArray = []; // now we've got an array of start and end times
            var isAvailable = false;
            for (var i = 0; i < resultsArray.length; i++) {
                newArray.push(resultsArray[i].split(" "));
            }
            //loop through each of the arrays start times and see if any number matches the given start time.
            for (i = 0; i < newArray.length; i++) { // iterating through each of the arrays in the array
                if (isAvailable === true) { //at the start of each loop, check if is Avail is true
                    console.log("is avail found true, breaking");
                    break;
                } else {
                    if (eventStartMinutes >= newArray[i][0] && eventEndMinutes <= newArray[i][1]) {
                        isAvailable = true;
                    }
                }
            }
            return isAvailable;
        };
        return isAvailable(resultsArray, eventStartMinutes, eventEndMinutes);
    },
    isThereAConflictSingle: function (startDateForMatching, eventStartMinutes, eventEndMinutes){

        var resultsArray = [];
        CalEvents.find({$and: [{walkerId: Meteor.user().walkerId}, {date: startDateForMatching}]}).map( function (e) {
            resultsArray.push(e.startTimeMinutes + " " + e.endTimeMinutes);
        });
        console.log(resultsArray);
        console.log("*******resultsArray^^^^****");

        var isThereAConflict = function (fromServer, eventStartMinutes, eventEndMinutes) {
                     var newArray = []; // now we've got an array of start and end times
                     var conflict = false;
                     if (resultsArray.length < 1) {
                         console.log("the is there a conflict was empty");
                         return conflict;
                     } else {
                         for (var i = 0; i < resultsArray.length; i++) {
                             newArray.push(resultsArray[i].split(" "));
                         }
                         //loop through each of the arrays start times and see if any number matches the given start time.
                         for (i = 0; i < newArray.length; i++) { // iterating through each of the arrays in the array
                             for (var j = (Number(newArray[i][0]) + 1); j < Number(newArray[i][1]); j++) { // iterate through each of the times in each array position
                                 //check those iterations (j) against another looper k that goes through the desired event time
                                 for (var k = Number(eventStartMinutes); k < Number(eventEndMinutes); k++) {
                                     if (j === k) {
                                         conflict = true;
                                     }
                                 }
                             }
                         }
                         return conflict;
                     }
                 };

       var finalIsTherAConflict = isThereAConflict(resultsArray, eventStartMinutes, eventEndMinutes);
        console.log(finalIsTherAConflict + "  *******final is there a conflict **");
        return finalIsTherAConflict;
    },
    isThereAConflict: function (startDateForMatching, eventStartMinutes, eventEndMinutes){
        var resultsArray = [];
        CalEvents.find({date: startDateForMatching}).map( function (e) {
            resultsArray.push(e.startTimeMinutes + " " + e.endTimeMinutes);
        });
        // console.log(resultsArray);
        // console.log("*******resultsArray^^^^****");

        var isThereAConflict = function (fromServer, eventStartMinutes, eventEndMinutes) {
                     var newArray = []; // now we've got an array of start and end times
                     var conflict = false;
                     if (resultsArray.length < 1) {
                         console.log("the is there a conflict was empty");
                         return conflict;
                     } else {
                         for (var i = 0; i < resultsArray.length; i++) {
                             newArray.push(resultsArray[i].split(" "));
                         }
                         //loop through each of the arrays start times and see if any number matches the given start time.
                         for (i = 0; i < newArray.length; i++) { // iterating through each of the arrays in the array
                             for (var j = (Number(newArray[i][0]) + 1); j < Number(newArray[i][1]); j++) { // iterate through each of the times in each array position
                                 //check those iterations (j) against another looper k that goes through the desired event time
                                 for (var k = Number(eventStartMinutes); k < Number(eventEndMinutes); k++) {
                                     if (j === k) {
                                         conflict = true;
                                     }
                                 }
                             }
                         }
                         return conflict;
                     }
                 };

       var finalIsTherAConflict = isThereAConflict(resultsArray, eventStartMinutes, eventEndMinutes);
        //console.log(finalIsTherAConflict + "  *******final is there a conflict **");
        return finalIsTherAConflict;
    },
    SaveWalkerAvailability: function (day, startDateForMatching, startTimeMinutes, endTimeMinutes, startTime, endTime, start, end ) {
        return WalkerAvailabilityEvents.insert({ walkerId: Meteor.user()._id,"title" : "Available", "startDate": day, "startDateForMatching": startDateForMatching ,"startTimeMinutes": startTimeMinutes, "endTimeMinutes": endTimeMinutes, "startTime": startTime, "endTime": endTime, "start" : start, "end" : end, "color":"rgba(13,149,100,.4)", "holiday":"true", "sendTop":"true", rendering: 'background', className: "Availability"});
        console.log("avail saved");
    },
    ReturnWalkers: function ( ) {
        var allArray = [];
        var longitude = Number(Meteor.user().long);
        var latitude = Number(Meteor.user().lat);
        //db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
        //$and: [ { role: ["walker"]}, {longTop: {$lt: longitude}}, {longBottom: {$gt: longitude}}, {latRight: {$lt: latitude}}, {latLeft: {$gt: latitude}}] }
        //{longTop: {$gt: longitude}}, {longBottom: {$gt: longitude}}
           Meteor.users.find({ $or: [ {role: ["walker"]}, {role: ["pro"]} ] }).map( function (e) {
            allArray.push(
                {
                    "firstName":  e.firstName,
                    "lastName":   e.lastName,
                    "walkRadius": e.walkRadius,
                    "phoneNum":   e.phoneNum,
                    "address":    e.address,
                    "about_me":   e.about_me,
                    "id":         e._id,
                    "pic":        e.pic,
                    "latLeft":    e.latLeft,
                    "latRight":   e.latRight,
                    "longTop":    e.longTop,
                    "longBottom": e.longBottom,
                    "role":       e.role
                });
        });
           // console.log(allArray);
           // console.log("*********AllArray********");
           var resultsArray=[];
           for (var i=0;i<allArray.length; i++) {
                if (latitude >= allArray[i].latLeft && latitude <= allArray[i].latRight && longitude<=allArray[i].longBottom && longitude>= allArray[i].longTop) {
                    resultsArray.push({
                        "firstName":  allArray[i].firstName,
                        "lastName":   allArray[i].lastName,
                        "walkRadius": allArray[i].walkRadius,
                        "phoneNum":   allArray[i].phoneNum,
                        "address":    allArray[i].address,
                        "about_me":   allArray[i].about_me,
                        "id":         allArray[i].id,
                        "pic":        allArray[i].pic,
                        "role":       allArray[i].role
                    });
                }
           }
           // console.log(resultsArray);
           // console.log("*********ResultsArray********");
        return resultsArray;
    },
    ReturnAllWalkers: function ( ) {
        var allArray = [];
        Meteor.users.find({ $or: [ {role: ["walker"]}, {role: ["pro"]} ] }).map( function (e) {
            allArray.push(
                {
                    "firstName":  e.firstName,
                    "lastName":   e.lastName,
                    "walkRadius": e.walkRadius,
                    "phoneNum":   e.phoneNum,
                    "address":    e.address,
                    "about_me":   e.about_me,
                    "id":         e._id,
                    "pic":        e.pic,
                    "latLeft":    e.latLeft,
                    "latRight":   e.latRight,
                    "longTop":    e.longTop,
                    "longBottom": e.longBottom,
                    "role":       e.role
                });
        });
        return allArray;
    },
    ReturnWalkersFromSearch: function (address) {
        var geo = new GeoCoder();
        var result = geo.geocode(address);
        var allArray = [];
        var longitude = Number(result[0].longitude);
        var latitude = Number(result[0].latitude);
        console.log(longitude);
        console.log(latitude);
           Meteor.users.find({ $or: [ {role: ["walker"]}, {role: ["pro"]} ] }).map( function (e) {
            allArray.push(
                {
                    "firstName":  e.firstName,
                    "lastName":   e.lastName,
                    "walkRadius": e.walkRadius,
                    "phoneNum":   e.phoneNum,
                    "address":    e.address,
                    "about_me":   e.about_me,
                    "id":         e._id,
                    "pic":        e.pic,
                    "latLeft":    e.latLeft,
                    "latRight":   e.latRight,
                    "longTop":    e.longTop,
                    "longBottom": e.longBottom,
                    "role":       e.role
                });
        });
           var resultsArray=[];
           for (var i=0;i<allArray.length; i++) {
                if (latitude >= allArray[i].latLeft && latitude <= allArray[i].latRight && longitude<=allArray[i].longBottom && longitude>= allArray[i].longTop) {
                    resultsArray.push({
                        "firstName":  allArray[i].firstName,
                        "lastName":   allArray[i].lastName,
                        "walkRadius": allArray[i].walkRadius,
                        "phoneNum":   allArray[i].phoneNum,
                        "address":    allArray[i].address,
                        "about_me":   allArray[i].about_me,
                        "id":         allArray[i].id,
                        "pic":        allArray[i].pic,
                        "role":       allArray[i].role
                    });
                }
           }
        return resultsArray;
    },
    SelectedWalkerSchedule: function (walkerId) {
        var resultsArray = [];
        WalkerAvailabilityEvents.find({walkerId: walkerId}).map(function (e){
            resultsArray.push(e);
        });
        return resultsArray;
    },
    ClientSelectedWalker : function (walkerId, userId) {
        Meteor.users.update({_id: userId}, {$set: {walkerId: walkerId}});
        return;
    },
    MyWalkersAvailability: function (walkerId) {
        //console.log(WalkerAvailabilityEvents.find({walkerId: walkerId}).fetch());
        return WalkerAvailabilityEvents.find({walkerId: walkerId}).fetch();
    },
    ReturnWalkersAvailabilityList: function(){
        return WalkerAvailabilityEvents.find({walkerId: Meteor.user().walkerId}).fetch();
    },
    DeleteWalkerAvailability: function (id) {
        return WalkerAvailabilityEvents.remove({_id:id});
    },
    ReturnWalkersAvailabilityListAsWalker: function(){
        return WalkerAvailabilityEvents.find({walkerId: Meteor.userId()}).fetch();
    },
    ReturnWalkersAvailabilityTimes: function (startDateForMatching) {
        return WalkerAvailabilityEvents.find({$and: [{walkerId: Meteor.user().walkerId},{startDateForMatching: startDateForMatching}]}).fetch();
    },
    MyWalkerId: function () {
        return Meteor.user().walkerId;
    },
    WalkerIdAsWalker: function () {
        return Meteor.user()._id;
    },
    CalEventsForMyWalker: function () {
        return CalEvents.find({$and: [{walkerId: Meteor.user().walkerId},{userId: Meteor.userId()}]}).fetch();
    },
    CalEventsAsWalker: function () {
        if (Meteor.user().roles[0] == "pro") {

            var resultsArray = [{'name': Meteor.user().name, '_id': Meteor.user()._id, 'pic': Meteor.user().pic}];
             ProEmployees.find({employer_id: Meteor.userId()}).map(function (e) {
                resultsArray.push({ 'name': e.name, '_id': e.employee, 'pic': e.pic});
             });
             console.log(resultsArray);

             var finalProCalEvents = [];
             for (var i=0; i<resultsArray.length; i++) {
                CalEvents.find({walkerId: resultsArray[i]._id}).map(function(e) {
                    console.log(e);
                    finalProCalEvents.push(e)
                });
             }

             console.log(finalProCalEvents);
            return finalProCalEvents;
        } else {
            return CalEvents.find({walkerId: Meteor.userId()}).fetch();
        }

    },
    MyCalEvents: function () {
        return CalEvents.find({userId: Meteor.userId()}).fetch();
    },
    RemoveCalEvent: function (eventId) {
        // send client an email
        var event = CalEvents.find({_id: eventId}).fetch();
        var date = event.date;
        // CalEvents.insert(
        //     {
        //         title: title,
        //         start: start,
        //         date: date,
        //         end: end,
        //         startTimeMinutes: startTimeMinutes,
        //         endTimeMinutes: endTimeMinutes,
        //         actual_start: null,
        //         actual_end: null,
        //         eventDetails: eventDetails,
        //         dateSortFormat: dateSortFormat,
        //         client: client,
        //         walkerId: walkerId,
        //         userId: userId,
        //         userName: userName,
        //         walkerName: walkerName,
        //         amount: amount
        //     }
        // );

        Email.send({
            from: "hello@trottr.us",
            to: Meteor.user().email,
            subject: "You Cancelled A " + event[0].title,
            html: "Hi " + Meteor.user().firstName + ", <br>" + "Just wanted to confirm that you cancelled a " + event[0].title +  " with " + event[0].walkerName + " on " + moment(event[0].start).format('M/D/YY') + " at " + moment(event[0].start).format('h:m A')
            + ".<br>"
        });

        // get walker email
        console.log('1: ', Meteor.users.find({_id: event[0].walkerId}).fetch() );
        var walker = Meteor.users.find({_id: event[0].walkerId}).fetch();

        //send email to walker too.
        Email.send({
            from: "hello@trottr.us",
            to: walker[0].email,
            subject: "Cancellation",
            html: "Hi " + event[0].walkerName + " <br>" + event[0].userName + " cancelled a " + event[0].title +  " with you. It was scheduled for " + moment(event[0].start).format('M/D/YY') + " at " + moment(event[0].start).format('h:m A') + ".<br>"
            + "No action is required."
        });
         return CalEvents.remove({_id: eventId});
    },
    ReturnClientProfileInfo: function () {
        return Meteor.users.findOne({_id: Meteor.userId()});
    },
    ReturnProProfileInfo: function () {
        var userId = Meteor.userId();
        return Meteor.users.findOne({_id:userId});
    },
    ReturnWalkerProfileInfo: function () {
        var userId = Meteor.userId();
        return Meteor.users.findOne({_id:userId});
    },
    ReturnMyWalker: function () {
        return Meteor.users.find({_id: Meteor.user().walkerId}).fetch()[0];
    },
    SaveClientProfileInfo: function (name, phone, address, email) {
        var userId = Meteor.userId();
        Meteor.users.update({_id:userId}, {$set: {"name": name}});
        Meteor.users.update({_id:userId}, {$set: {"phoneNum": phone}});
        Meteor.users.update({_id:userId}, {$set: {"address": address}});
        Meteor.users.update({_id:userId}, {$set: {"email": email}});

        var geo = new GeoCoder();
        var result = geo.geocode(address);
        Meteor.users.update({_id:userId}, {$set: {"lat": Number(result[0].latitude)}});
        Meteor.users.update({_id:userId}, {$set: {"long": Number(result[0].longitude)}});
        return;
    },
    SaveProProfileInfo: function (name, phone, address, email, businessName, about, radius) {
        var userId = Meteor.userId();
        Meteor.users.update({_id:userId}, {$set: {"name": name}});
        Meteor.users.update({_id:userId}, {$set: {"phoneNum": phone}});
        Meteor.users.update({_id:userId}, {$set: {"address": address}});
        Meteor.users.update({_id:userId}, {$set: {"email": email}});
        Meteor.users.update({_id:userId}, {$set: {"businessName": businessName}});
        Meteor.users.update({_id:userId}, {$set: {"about_me": about}});
        Meteor.users.update({_id:userId}, {$set: {"walkRadius": radius}});
        var geo = new GeoCoder();
        var result = geo.geocode(address);
        Meteor.users.update({_id:userId}, {$set: {"lat": Number(result[0].latitude)}});
        Meteor.users.update({_id:userId}, {$set: {"long": Number(result[0].longitude)}});
        // I dont kow why the .5 works but it does for 1 mile and 5 miles for where we are on the equator. fuck it.
        var latRadius = Number(result[0].latitude) + ((1/68.68) * Number(radius)*.5);
        var longRadius = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(radius)*.5);
        // I dont kow a better way to do this but I'm setting up a square arond the users address to imageine
        // a circle with long top the top part of the circle and long bottom the bottom part of the circle
        // and lat left the left part of the circle and lat right the right part of the circle that way if
        //the client is within that square we can return that walker.
        var latRight = Number(result[0].latitude) + ((1/68.68) * Number(radius)*.5);
        var latLeft = Number(result[0].latitude) - ((1/68.68) * Number(radius)*.5);
        var longTop = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(radius)*.25);
        var longBottom = result[0].longitude - ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(radius)*.25);
        Meteor.users.update({_id:userId}, {$set: {"latRight": latRight}});
        Meteor.users.update({_id:userId}, {$set: {"latLeft": latLeft}});
        Meteor.users.update({_id:userId}, {$set: {"longTop": longTop}});
        Meteor.users.update({_id:userId}, {$set: {"longBottom": longBottom}});
        return;
    },
    'RemoveBankFromWalker': function () {
        Meteor.users.update({_id:Meteor.userId()}, {$set: {"bank_account": ""}});
        return Meteor.users.update({_id:Meteor.userId()}, {$set: {"bank_routing": ""}});
    },
    SaveWalkerProfileInfo: function (name, phone, address, email, about, radius, bank_account, bank_routing) {
        var userId = Meteor.userId();
        if (name == "" || phone == "" || address == "" || email == "" || about == "" || radius == "") {

        } else {
            Meteor.users.update({_id:userId}, {$set: {"name": name}});
            Meteor.users.update({_id:userId}, {$set: {"phoneNum": phone}});
            Meteor.users.update({_id:userId}, {$set: {"address": address}});
            Meteor.users.update({_id:userId}, {$set: {"email": email}});
            Meteor.users.update({_id:userId}, {$set: {"about_me": about}});
            Meteor.users.update({_id:userId}, {$set: {"walkRadius": radius}});
            var geo = new GeoCoder();
            var result = geo.geocode(address);
            Meteor.users.update({_id:userId}, {$set: {"lat": Number(result[0].latitude)}});
            Meteor.users.update({_id:userId}, {$set: {"long": Number(result[0].longitude)}});
            // I dont kow why the .5 works but it does for 1 mile and 5 miles for where we are on the equator. fuck it.
            var latRadius = Number(result[0].latitude) + ((1/68.68) * Number(radius)*.5);
            var longRadius = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(radius)*.5);
            // I dont kow a better way to do this but I'm setting up a square arond the users address to imageine
            // a circle with long top the top part of the circle and long bottom the bottom part of the circle
            // and lat left the left part of the circle and lat right the right part of the circle that way if
            //the client is within that square we can return that walker.
            var latRight = Number(result[0].latitude) + ((1/68.68) * Number(radius)*.5);
            var latLeft = Number(result[0].latitude) - ((1/68.68) * Number(radius)*.5);
            var longTop = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(radius)*.25);
            var longBottom = result[0].longitude - ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(radius)*.25);
            Meteor.users.update({_id:userId}, {$set: {"latRight": latRight}});
            Meteor.users.update({_id:userId}, {$set: {"latLeft": latLeft}});
            Meteor.users.update({_id:userId}, {$set: {"longTop": longTop}});
            Meteor.users.update({_id:userId}, {$set: {"longBottom": longBottom}});
        }

        if (bank_account == "" || bank_routing == "" ) {

        } else {
            Meteor.users.update({_id:userId}, {$set: {"bank_account": bank_account}});
            Meteor.users.update({_id:userId}, {$set: {"bank_routing": bank_routing}});
        }

        return true;
    },
    SaveWalkerProfileInfoEmployee: function (name, phone, address, email, about, radius) {
        var userId = Meteor.userId();
        Meteor.users.update({_id:userId}, {$set: {"name": name}});
        Meteor.users.update({_id:userId}, {$set: {"phoneNum": phone}});
        Meteor.users.update({_id:userId}, {$set: {"address": address}});
        Meteor.users.update({_id:userId}, {$set: {"email": email}});
        Meteor.users.update({_id:userId}, {$set: {"about_me": about}});
        Meteor.users.update({_id:userId}, {$set: {"walkRadius": radius}});
        var geo = new GeoCoder();
        var result = geo.geocode(address);
        Meteor.users.update({_id:userId}, {$set: {"lat": Number(result[0].latitude)}});
        Meteor.users.update({_id:userId}, {$set: {"long": Number(result[0].longitude)}});
        // I dont kow why the .5 works but it does for 1 mile and 5 miles for where we are on the equator. fuck it.
        var latRadius = Number(result[0].latitude) + ((1/68.68) * Number(radius)*.5);
        var longRadius = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(radius)*.5);
        // I dont kow a better way to do this but I'm setting up a square arond the users address to imageine
        // a circle with long top the top part of the circle and long bottom the bottom part of the circle
        // and lat left the left part of the circle and lat right the right part of the circle that way if
        //the client is within that square we can return that walker.
        var latRight = Number(result[0].latitude) + ((1/68.68) * Number(radius)*.5);
        var latLeft = Number(result[0].latitude) - ((1/68.68) * Number(radius)*.5);
        var longTop = result[0].longitude + ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(radius)*.25);
        var longBottom = result[0].longitude - ((1/(69.17*Math.cos(Number(result[0].latitude)))) * Number(radius)*.25);
        Meteor.users.update({_id:userId}, {$set: {"latRight": latRight}});
        Meteor.users.update({_id:userId}, {$set: {"latLeft": latLeft}});
        Meteor.users.update({_id:userId}, {$set: {"longTop": longTop}});
        Meteor.users.update({_id:userId}, {$set: {"longBottom": longBottom}});
        return true;
    },
    Chat: function(sendTo, message, time, from) {
        var userId = Meteor.userId();
        var from_name = Meteor.user().name;
        var sendToName = Meteor.users.find({_id: sendTo}).fetch()[0].name;
        var sendToEmail = Meteor.users.find({_id: sendTo}).fetch()[0].email;
        var date = new Date();
        Chat.insert({from: userId, from_name: from_name, send_to: sendTo, send_to_name: sendToName, message: message, "date": date, time:time});

        return true ;
    },
    GroupChat: function (sendTo, message, time, from) {
        var userId = Meteor.userId();
        var from_name = Meteor.user().name;
        var pic = Meteor.user().pic;

        if (Meteor.user().role[0] == "pro") {
            var employer = Meteor.userId()
        } else {
            employer = Meteor.user().employer_id
        }
        var date = new Date();
        GroupChat.insert({employer: employer, 'pic': pic, from: userId, from_name: from_name, message: message, "date": date, time:time});

        return true ;
    },
    ProClientChatList: function () {
        var resultsArray = [];
         Meteor.users.find({walkerId: Meteor.userId()}).map(function (e) {
            resultsArray.push({ 'name': e.name, '_id': e.employee, 'pic': e.pic});
         });
         return resultsArray;
    },
    WalkerClientChatList: function () {
        var resultsArray = [];
         Meteor.users.find({walkerId: Meteor.userId()}).map(function (e) {
            resultsArray.push({ 'name': e.name, '_id': e._id, 'pic': e.pic});
         });
         return resultsArray;
    },
    ClientWalkerChatList: function () {
        var resultsArray = [];

         Meteor.users.find({_id: Meteor.user().walkerId}).map(function (e) {
            resultsArray.push({ 'name': e.name, '_id': e._id, 'pic': e.pic});
         });
         console.log(resultsArray);
         return resultsArray;
    },
    ProEmployeesChatList: function () {
        var resultsArray = [];
         ProEmployees.find({employer_id: Meteor.userId()}).map(function (e) {
            resultsArray.push({ 'name': e.name, '_id': e.employee, 'pic': e.pic});
         });
         console.log(resultsArray);
         return resultsArray;
    },
    WalkerEmployerChatList: function () {
        var employer = Meteor.user().employer_id;
        var resultsArray = [];
         Meteor.users.find({_id: employer}).map(function (e) {
            resultsArray.push({ 'name': e.name, '_id': e._id, 'pic': e.pic});
         });
         return resultsArray
    },
    GroupChatMessages: function (employer_id) {
        if (Meteor.user().role[0] == "pro") {
            var employer = Meteor.userId()
        } else {
            employer = Meteor.user().employer_id
        }
        var resultsArray = [];

        GroupChat.find({employer: employer}).map(function (e) {
            resultsArray.push({'date': e.date, 'from': e.from, 'pic': e.pic, 'from_name': e.from_name, 'message':e.message, 'send_to':e.send_to, 'send_to_name': e.send_to_name, 'time': e.time});
        });
        resultsArray.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.date) - new Date(b.date);
        });

        return resultsArray;
    },
    ChatList: function(send_to) {
        var resultsArray = [];

        Chat.find({$and: [{send_to: send_to},{from: Meteor.userId()}]}).map(function (e) {
            resultsArray.push({'date': e.date, 'from': e.from, 'from_name': e.from_name, 'message':e.message, 'send_to':e.send_to, 'send_to_name': e.send_to_name, 'time': e.time});
        });
        Chat.find({$and: [{from: send_to}, {send_to: Meteor.userId()} ]}).map(function (e) {
            resultsArray.push({'date': e.date, 'from': e.from, 'from_name': e.from_name, 'message':e.message, 'send_to':e.send_to, 'send_to_name': e.send_to_name, 'time': e.time});
        });
        resultsArray.sort(function(a,b){
          return new Date(a.date) - new Date(b.date);
        });

        return resultsArray;
    },
    WalkerName: function() {
        walker_id = Meteor.user().walkerId;

        return Meteor.users.findOne({_id: walker_id}).name;
    },
    WalkerPic: function () {
       return Meteor.users.find({_id: Meteor.user().walkerId}).fetch()[0].pic;
    },
    ClientDetails: function (userId) {
        return Meteor.users.find({_id:userId}).fetch();
    },
    AddPic: function(pic) {
        var userId = Meteor.userId();
        Meteor.users.update({_id:userId}, {$set: {pic: pic}});
        return "picupdated";
    },
    WalkPic: function(walkId, pic) {
        CalEvents.update({_id:walkId}, {$set: {pic: pic}});
        return "picupdated";
    },
    GeoPing: function (lat, long, timeStamp, userId, walkId ) {
        walkerId = Meteor.user()._id;
        WalkTrack.insert({userId: userId, walkerId: walkerId, walkId: walkId, lat: lat, long: long, timeStamp: timeStamp});
        console.log("Ping");
        console.log(lat);
        console.log(long);
        return "ping";
    },
    CompleteWalk: function (pee, poop, notes, walk_id, user_id, walker_id, actual_start, length, walkPic, amount, title) {
        var actual_end = new Date();
        CalEvents.remove({_id:walk_id});
        var resultsArray=[];
        WalkTrack.find({walkId: walk_id}).map(function (e){
            resultsArray.push(e);
        });

        var mapPoints = resultsArray;
        var trackPoints = "";
        for (var i=0; i<mapPoints.length;i++) {
            trackPoints= trackPoints + ("|"+ mapPoints[i].lat + "," + mapPoints[i].long);
        }
        console.log(trackPoints);

        var mapUrl = "https://maps.googleapis.com/maps/api/staticmap?path=color:0xFF3300|weight:5" + trackPoints + "&zoom=14&size=375x500&sensor=false&scale=2";
        console.log(mapUrl);
        console.log(walkPic);
        clientName = Meteor.users.findOne({_id: user_id}).name;
        walkerName =  Meteor.users.findOne({_id: walker_id}).name;
        Invoice.insert({walk_id: walk_id, title:title, pee:pee, poop:poop, clientName:clientName, walkerName: walkerName, notes:notes, actual_start:actual_start, actual_end: actual_end, length: length, date: actual_end, client_id: user_id, walker_id: walker_id, map_url: mapUrl, walkPic: walkPic, amount: amount, payment_id: null, payout_stripe_txn_id: null, payout_date:null, paid: "No", transfered: false});

        return mapUrl;
    },
    WalkRoute: function (walk_id) {
        var resultsArray=[];
        WalkTrack.find({walkId: walk_id}).map(function (e){
            resultsArray.push(e);
        });
        var mapPoints = resultsArray;
        var trackPoints = "";
        for (var i=0; i<mapPoints.length;i++) {
            trackPoints= trackPoints + ("|"+ mapPoints[i].lat + "," + mapPoints[i].long);
        }
        console.log(trackPoints);
        var mapUrl = "https://maps.googleapis.com/maps/api/staticmap?path=color:0x0000ff|weight:5" + trackPoints + "&zoom=14&size=375x500&sensor=false&scale=2";
        return mapUrl;
    },
    Invoice: function() {
        console.log('calling invoice!');
        if (Meteor.user().roles[0] == "client") {
            console.log('calling invoice for client');
            return Invoice.find({client_id:Meteor.userId()}).fetch();
        } else if (Meteor.user().roles[0] == "walker") {
            console.log('calling invoice for walker');
            return Invoice.find({walker_id: Meteor.userId()}).fetch();
        } else {
            return Invoice.find({walker_id: Meteor.userId()}).fetch();
        }
    },
    sendInvoiceEmail: function(options){
        Email.send(options);
        return "invoice Email Sent";
    },
    WalkersClientList: function () {
        walker_id = Meteor.userId();
        var allClientId = [];
        CalEvents.find({walkerId: walker_id}).map(function(e){
            allClientId.push(e.userId);
        });

        var uniqueId = _.uniq(allClientId, false, function(d) {return d});
        console.log(uniqueId);
        console.log("******************************unique IDDDDD****************");

        var allClientData = [];
        for (var i=0; i<uniqueId.length; i++) {
            Meteor.users.find({_id: allClientId[i]}).map(function(e) {
                allClientData.push(e.name);
            });
        }
        console.log(allClientData);
       return allClientData;
    },
    ClientIdFromName: function(name) {
        return Meteor.users.findOne({name: name});
    },
    CreateStripeToken: function (user_id, ccNum, ccExpYr, ccExpMo, ccCvc) {
        //"number": '4242424242424242', "exp_month": 12, "exp_year": 2015, "cvc": '123'
     Stripe.tokens.create({ card: { "number": ccNum, "exp_month": ccExpMo, "exp_year": ccExpYr, "cvc": ccCvc } }, function(err, token) {
            if (err) {
                console.log(err);
                return err;
            }
            if (token) {
                fut['return'](token.id);
            }
        });
         return fut.wait();
    },
    CreateStripeCustomer: function (ccNum, ccExpYr, ccExpMo, ccCvc) {
     //    Stripe.customers.create({ card: { "number": ccNum, "exp_month": ccExpMo, "exp_year": ccExpYr, "cvc": ccCvc }, description: 'client for trottr.us' }, function(err, customer) {
     //        if (err) {
     //            console.log(err);
     //            return err;
     //        }
     //        if (customer) {
     //            fut2['return'](customer);
     //        }
     //        console.log(customer);
     //    });
     // return fut2.wait();

    var customer = Meteor.wrapAsync(Stripe.customers.create, Stripe.customers);
        customer({
            card: { "number": ccNum, "exp_month": ccExpMo, "exp_year": ccExpYr, "cvc": ccCvc },
            description: 'client for trottr.us' },
            function(err, customer) {
            if (err) {
                console.log(err);
                return err;
            }
            if (customer) {
                Meteor.users.update({_id: Meteor.userId()}, {$set: {stripe_card: customer.sources.data[0].id, stripe_customer: customer.id}});
            }
            console.log(customer);
        });;




  },
   WalkerBankToken: function () {
        var account = Meteor.user().bank_account;
        var routing = Meteor.user().bank_routing;

        Stripe.recipients.create ({
            name: Meteor.user().name,
            type: 'individual',
            bank_account: {
                country: 'US',
                routing_number: routing,
                account_number: account
            }
        }, function (err, recipient) {
            if (recipient) {
                fut4['return'](recipient);
                console.log(recipient);
            }
            if (err) {
                console.log(err);
                //return err
            }
        });
            return fut4.wait();
    },
    SaveWalkerBankToken: function (stripe_recipient) {
        Meteor.users.update({_id: Meteor.userId()} , {$set: {stripe_recipient: stripe_recipient}});
        return true;
    },
    UpdateClientCreditCard: function (user_id, stripe_customer, stripe_card) {
        return 1
        //return Meteor.users.update({_id: user_id}, {$set: {stripe_card: stripe_card, stripe_customer: stripe_customer}});
    },
    PayInvoice: function (invoice_id, rating, tip, amount) {
        var card = Meteor.user().stripe_card;
        var customer = Meteor.user().stripe_customer;


        // if they don't have credit , just do as normal
        if (Meteor.user().credit == 0) {
            var chargeAmount = Number(amount) * Number(tip) * 100; //have to use cents
            var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);
            charge({
                amount: chargeAmount,
                currency: "usd",
                card: card,
                customer: customer,
                description: "Charge for pet services on Trottr",
            }, function(err, charge) {
                if (err && err.type === 'StripeCardError') {
                  // The card has been declined
                  throw new Meteor.Error("stripe-charge-error", err.message);
                } else {
                    console.log(charge);
                    return Invoice.update({_id: invoice_id}, {$set: {"amount": Number(charge.amount)/100, "paid": true, "stripe_payment_id": charge.id, "usedPromoCode": false}});
                }

            });
        } else {
            // they do have credit
            var credit = Meteor.user().credit;
            var amount = Number(amount) * Number(tip)
            // if credit is greater than invoice amount,
            if (credit - amount > 0) {
                // don't charge at all, marked as paid, etc.
                Invoice.update({_id: invoice_id}, {$set: {"amount": 0, "paid": true, "stripe_payment_id": "promo code", "usedPromoCode": true}});
                // subtract credit by amount
                var newCreditAmount = credit - amount;
                Meteor.users.update({_id: Meteor.userId()} , {$set: {credit: newCreditAmount}});
            } else {
                //credit is less than or == invoice amount
                var chargeAmount = (amount - credit)*100; // have to use cents
                // set credit to 0
                Meteor.users.update({_id: Meteor.userId()} , {$set: {credit: 0}});
                // market as paid, etc.

                var charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);
                charge({
                    amount: chargeAmount,
                    currency: "usd",
                    card: card,
                    customer: customer,
                    description: "Charge for pet services on Trottr",
                }, function(err, charge) {
                    if (err && err.type === 'StripeCardError') {
                      // The card has been declined
                      throw new Meteor.Error("stripe-charge-error", err.message);
                    } else {
                        console.log(charge);
                        return Invoice.update({_id: invoice_id}, {$set: {"amount": Number(charge.amount)/100, "paid": true, "stripe_payment_id": charge.id, "usedPromoCode": true}});
                    }

                });
            }

        }
        // what do we do for walker payout amounts? maybe in the admin panel it says on the invoice if promo code
        // was used. if it was it's a special case and we should deal with it separately.
    },
    UpdateInvoice: function (invoice_id, amount, stripe_payment_id, paid) {
        return 1;
        //Invoice.update({_id: invoice_id}, {$set: {"amount": Number(amount)/100, "paid": paid, "stripe_payment_id": stripe_payment_id}});
     },
     WalkerNameAboutRadius: function (walker_id) {
       return Meteor.users.find({_id: walker_id}).fetch();
     },
  AddProService: function (num_services, service, title, length, price) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {num_services: num_services}});
    Meteor.users.update({_id: Meteor.userId()}, {$set: {configured: true}});
    ProServices.insert({pro_id: Meteor.userId(), service: service, title: title, price: price, length: length});
  },
  GetProServices: function () {
    return ProServices.find({pro_id: Meteor.userId()}).fetch();
  },
  UpdateProService: function(id, title, price, length) {
        ProServices.update({_id:id}, {$set: {"title": title, price: price, length:length}});
  },
  UpdateProNumServices: function(num_services) {
        Meteor.users.find({_id: Meteor.userId()}, {$set: {num_services: num_services}});
  },
  DeleteProService: function (service) {
    ProServices.remove({service:service});
  },
  findEmployee: function (email) {
    return Meteor.users.find({email: email}).fetch();
  },
  AddEmployee: function (id, email, name) {
    Meteor.users.update({_id:id}, {$set: {employer_id: Meteor.userId(), employee: true}});
    var pic = Meteor.users.find({_id:id}).fetch()[0].pic
    ProEmployees.insert({employer_id: Meteor.userId(), employee: id, email: email, name: name, pic:pic})
    var myEmployees = [];
            ProEmployees.find({employer_id: Meteor.userId()}).map(function(e) {
                myEmployees.push({"name": e.name, 'email': e.email, '_id': e.id, 'employee': e.employee, 'employer_id': e.employer_id});
            });

    return myEmployees;
  },
  MyEmployees: function () {
    var myEmployees = [];
    ProEmployees.find({employer_id: Meteor.userId()}).map(function(e) {
        myEmployees.push({"name": e.name, 'email': e.email, '_id': e._id, 'employee': e.employee, 'employer_id': e.employer_id});
    });

    return myEmployees;
  },
  RemoveEmployee: function (id) {
    ProEmployees.remove({_id: id});
    var myEmployees = [];
    ProEmployees.find({employer_id: Meteor.userId()}).map(function(e) {
        myEmployees.push({"name": e.name, 'email': e.email, '_id': e.id, 'employee': e.employee, 'employer_id': e.employer_id});
    });

    return myEmployees;
  },
  SaveReview: function (review, rating, walker_id ) {
    return Reviews.insert({  walker_id:walker_id, date: new Date(), format_date: new Date(), review: review, rating: rating, reviewer_name: Meteor.user().name   });
  },
  Reviews: function (walker_id) {
    return Reviews.find({walker_id: walker_id}).fetch();
  },
  AddDog: function(dogName, dogInfo) {
    return Dogs.insert({user_id:Meteor.userId(), dogName:dogName, dogInfo:dogInfo});
  },
  RemoveDog: function(dogId) {
    return Dogs.remove({_id:dogId});
  },
  GetDogs: function() {
    return Dogs.find({user_id: Meteor.userId()}).fetch();
  },
  AddCardLabel: function(label) {
    return Cards.insert({user_id:Meteor.userId(), label:label});
  },
  RemoveCardLabel: function(card_id) {
    return Cards.remove({_id:card_id});
  },
  GetCardLabels: function() {
    return Cards.find({user_id: Meteor.userId()}).fetch();
  },
  'WalkPing': function () {

  },
  'GetClientDogs': function (user_id) {
    return Dogs.find({user_id: user_id}).fetch();
  },
// ************************************ Accounts ************************************************************
  'resetPasswordByEmail': function (emailAddress) {
    var user = Meteor.users.find({email: emailAddress}).fetch();
    return Accounts.sendResetPasswordEmail(user[0]._id);
  },
  'verifyEmailForUser': function (id) {
    return Accounts.sendVerificationEmail(id);
  },

  // ************************************ Admin ************************************************************
  'getUsers': function () {
    return Meteor.users.find().fetch();
  },
  'changeUser': function (details, role) {
        Meteor.users.update({_id:details._id}, {$set: {"role": [role]}});
        return Meteor.users.update({_id:details._id}, {$set: {"roles": [role]}});
  },
  'getInvoices': function () {
        return Invoice.find().fetch();
  },
  'transferMoney': function (invoice) {
    var recipient = Meteor.users.findOne({_id: invoice.walker_id}).stripe_recipient;
    var amount = ((((Number(invoice.amount)*.971)-.3)*.85)-.25); // 15% transfer + 2.9% stripe take - $.30 stripe take - $.25 Stripe Transfer
    var amountFixed = amount.toFixed(2) * 100; // fixed decimal then multiply to get in cents

    // Stripe.transfers.create({
    //       amount: amountFixed,
    //       currency: "usd",
    //       recipient: recipient,
    //       description: "Transfer from Trottr"
    //     }, function(err, transfer) {
    //         if (transfer) {
    //             console.log(transfer);
    //             fut5['return'](transfer);
    //         }
    //         if (err) {
    //             fut5['return'](err);
    //         }
    // });
    // return fut5.wait();

    var transfer = Meteor.wrapAsync(Stripe.transfers.create, Stripe.transfers);
        transfer({
           amount: amountFixed,
           currency: "usd",
           recipient: recipient,
           description: "Transfer from Trottr"
        }, function(err, transfer) {
            if (err && err.type === 'StripeCardError') {
              // The card has been declined
              throw new Meteor.Error("stripe-charge-error", err.message);
            } else {
                console.log(transfer);
               //fut3['return'](charge);
               //return Invoice.update({_id: invoice_id}, {$set: {"amount": Number(charge.amount)/100, "paid": true, "stripe_payment_id": charge.id}});
               Invoice.update({_id: invoice._id}, {$set: {"transfered": transfer.status}});
               return Invoice.update({_id: invoice._id}, {$set: {"transfer_id": transfer.id}});
            }

        });


  },
  'updateTransfer': function (invoice, stripe) {
    //Invoice.update({_id: invoice._id}, {$set: {"transfered": stripe.status}});
    //return Invoice.update({_id: invoice._id}, {$set: {"transfer_id": stripe.id}});
  },
// ************************************ Promo Codes ************************************************************
    'clientAddPromoCode': function (code) {
        var id = Meteor.userId();
        var code = PromoCodes.findOne({code:code});
        if(!code) {
            return 'notFound';
        } else {
            if (code.used == true) {
                console.log(code.used)
                return 'codeAlreadyUsed'
            } else {
                console.log(code.code, code._id);
                PromoCodes.update({_id:code._id}, {$set: {usedBy: id}});
                PromoCodes.update({_id:code._id}, {$set: {usedDate: new Date()}});
                PromoCodes.update({_id:code._id}, {$set: {used: true}});
                // if they have existing credit, add to it.
                var credit = Meteor.users.find({_id:id}).fetch()[0].credit || 0;
                var addedCredit = Number(credit) + Number(code.amount);

                Meteor.users.update({_id:id}, {$set: {"credit": addedCredit}});
            }
        }
    }
});
