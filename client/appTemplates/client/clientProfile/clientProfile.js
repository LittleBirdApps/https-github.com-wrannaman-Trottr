//Stripe.setPublishableKey('pk_test_JJwZAPHfg7eDGW0PVeF81d0m');

Template.clientProfile.rendered = function () {
    $('html').css('height', '100%');
    $('body').css('height', '100%');

    Session.set("Navbar", "Profile");
    $('.btn-primary').css('border-color','none;');
    Meteor.call('ReturnClientProfileInfo', function (error, results) {
        if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: error
                    });
         } 
         if (results) {
                   Session.set('ReturnClientProfileInfo', results);
                   var email = results
                   console.log(email.emails[0]);
                   console.log(Session.get('ReturnClientProfileInfo'));
                     return
         }
    });
};

Template.clientProfile.helpers({
    name: function () {
        return Session.get('ReturnClientProfileInfo').name
    },
    phone: function () {
        return Session.get('ReturnClientProfileInfo').phoneNum
    },
    address: function () {
        return Session.get('ReturnClientProfileInfo').address
    },
    email: function () {
        return Session.get("ReturnClientProfileInfo").email;
    },
    pic: function () {
         return Session.get('ReturnClientProfileInfo').pic
    }
});

Template.clientProfile.events({
    'click #save': function () {
        
        var name =    $('#name').val();
        var phone =   $('#phone').val();
        var address = $('#address').val();
        var email =   $('#email').val();
    
          Meteor.call('SaveClientProfileInfo', name, phone, address, email, function (error, result) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: error,
                        timer: 3500
                    });
                } else {
                     return sweetAlert({
                        title: "Saved!",
                        type: "success",
                        text: "Your profile was updated.",
                        timer: 3500
                        });
                }
                return     
             });
    }
});

Template.s3_tester4.events({
    "click button.upload": function(){
        var files = $("input.file_bag")[0].files
        S3.upload(files,"subfolder",function(e,r){
            var pic = r.url;
            console.log(pic);
            Meteor.call('AddPic', pic, function (error, result) {
                if (result) {
                    Meteor.call('ReturnClientProfileInfo', function (error, results) {
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: error
                            });
                        } else {
                            return  Session.set('ReturnClientProfileInfo', results);
                        }
                    });
                }
            });    
        });
        $('#uploadPercent').remove();
    }
});

Template.s3_tester4.helpers({
    "files": function(){
        return S3.collection.find();
    }
})




