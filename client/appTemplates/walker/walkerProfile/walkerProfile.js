Template.walkerProfile.rendered = function () {
    Session.set("Navbar", "Profile");
    Meteor.call('ReturnWalkerProfileInfo', function (error, results) {
        if (error) {
            return sweetAlert({
                title: "Uh Oh!",
                type: "error",
                text: error
            });
        } else {
            return  Session.set('ReturnWalkerProfileInfo', results);
        }
    });
};

Template.walkerProfile.helpers({
    name: function () {
        return Session.get('ReturnWalkerProfileInfo').name
    },
    phone: function () {
        return Session.get('ReturnWalkerProfileInfo').phoneNum
    },
    address: function () {
        return Session.get('ReturnWalkerProfileInfo').address
    },
    radius: function () {
        return Session.get('ReturnWalkerProfileInfo').walkRadius
    },
    email: function () {
        return Session.get("ReturnWalkerProfileInfo").emails[0].address;
    },
    pic: function() {
        return Session.get("ReturnWalkerProfileInfo").pic
    },
    account: function () {
        return Session.get("ReturnWalkerProfileInfo").bank_account
    },
    routing: function () {
        return Session.get("ReturnWalkerProfileInfo").bank_routing
    },
    about: function () {

        if (!Session.get('ReturnWalkerProfileInfo').about_me) {
            return "";
        } else {
            return Session.get('ReturnWalkerProfileInfo').about_me
        }
    },
    notProEmployee: function () {
        if (Meteor.user().employee) {
            Session.set("notProEmployee", false);
            return false
        } else {
            Session.set("notProEmployee", true);
            return true
        }
    }
});

Template.walkerProfile.events({
    'click #save': function () {
        
        var name = $('#name').val();
        var phone = $('#phone').val();
        var address = $('#address').val();
        var email = $('#email').val();
        var about = $('#about').val();
        var radius = $('#radius').val();
        var account = $('#account').val();
        var routing = $('#routing').val();
        console.log(name, phone, address, email, about, radius);

        if (Session.get("notProEmployee") && account != "" && routing != "") {
                Meteor.call('SaveWalkerProfileInfo', name, phone, address, email, about, radius, account, routing, function (error, result) {
                    if (error) {
                        return sweetAlert({
                            title: "Uh Oh!",
                            type: "error",
                            text: error,
                            timer: 1000
                        });
                    }  
                    
                    if (result && account == "") {
                        return sweetAlert({
                            title: "Saved!",
                            type: "success",
                            text: "Your profile was updated",
                            timer: 1000

                        });
                    }
                });
                if (!Meteor.user().stripe_recipient) {
                        console.log('firing bank token');
                        Meteor.call('WalkerBankToken', function (err, result){
                            Session.set("WalkerRecipientId", result);
                            console.log(result);
                           
                           if (err) {
                            console.log(err);
                           }
                        });
                
                    Meteor.setTimeout(function () {
                        var stripe_recipient = Session.get("WalkerRecipientId").id
                        console.log(stripe_recipient);
                        Meteor.call('SaveWalkerBankToken', stripe_recipient, function (error, result) {
                            if (error) {
                                console.log("error");
                            }
                            if (result) {
                             sweetAlert({
                                title: "Saved!",
                                type: "success",
                                text: "Your profile was updated & you're all set for bank transfers!",
                                timer: 1000

                            });
                            }
                            return
                        });
                    }, 700)
                }
        } else {
            console.log('no account info or a pro');
            Meteor.call('SaveWalkerProfileInfoEmployee', name, phone, address, email, about, radius, function (error, result) {
                    if (error) {
                        return sweetAlert({
                            title: "Uh Oh!",
                            type: "error",
                            text: error,
                            timer: 1000
                        });
                    }  
                    
                    if (result && account == "") {
                        return sweetAlert({
                            title: "Saved!",
                            type: "success",
                            text: "Your profile was updated",
                            timer: 1000

                        });
                    }
                });
        }
    }
});

Template.s3_tester.events({
    "click button.upload": function(){
        var files = $("input.file_bag")[0].files
        S3.upload(files,"subfolder",function(e,r){
            var pic = r.url;
            console.log(pic);
            Meteor.call('AddPic', pic, function (error, result) {
                Meteor.call('ReturnWalkerProfileInfo', function (error, results) {
                    if (error) {
                         $('#uploadPercent').remove();
                        return sweetAlert({
                            title: "Uh Oh!",
                            type: "error",
                            text: error
                        });
                    } else {
                        $('#uploadPercent').remove();
                        return  Session.set('ReturnWalkerProfileInfo', results);
                    }
                });
            });    
        });

        
    }
})

Template.s3_tester.helpers({
    "files": function(){
        return S3.collection.find();
    }
})



