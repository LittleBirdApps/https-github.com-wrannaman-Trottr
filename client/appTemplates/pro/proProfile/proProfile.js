Template.proProfile.rendered = function () {
     Session.set("proNavbar", "Profile");
    Meteor.call('ReturnProProfileInfo', function (error, results) {
        if (error) {
            return sweetAlert({
                title: "Uh Oh!",
                type: "error",
                text: error
            });
        } else {
            return  Session.set('ReturnProProfileInfo', results);
        }
    });
};

Template.proProfile.helpers({
    name: function () {
        return Session.get('ReturnProProfileInfo').name
    },
    phone: function () {
        return Session.get('ReturnProProfileInfo').phoneNum
    },
    pic: function () {
        return Session.get('ReturnProProfileInfo').pic
    },
    address: function () {
        return Session.get('ReturnProProfileInfo').address
    },
    radius: function () {
        return Session.get('ReturnProProfileInfo').walkRadius
    },
    email: function () {
        return Session.get("ReturnProProfileInfo").email;
    },
    businessName: function () {
        return Session.get('ReturnProProfileInfo').businessName
    },
    about: function () {

        if (!Session.get('ReturnProProfileInfo').about_me) {
            return "";
        } else {
            return Session.get('ReturnProProfileInfo').about_me
        }

    }
});

Template.proProfile.events({
    'click #save': function () {

        var name = $('#name').val();
        var phone = $('#phone').val();
        var address = $('#address').val();
        var email = $('#email').val();
        var businessName = $('#businessName').val();
        var about = $('#about').val();
        var radius = $('#radius').val();
        console.log(name, phone, address, email, businessName, about, radius);

        Meteor.call('SaveProProfileInfo', name, phone, address, email, businessName, about, radius, function (error, result) {
            if (error) {
                return sweetAlert({
                    title: "Uh Oh!",
                    type: "error",
                    text: error,
                    timer: 1000
                });
            } else {
                return sweetAlert({
                    title: "Saved!",
                    type: "success",
                    text: "Your profile was updated",
                    timer: 1000

                });
            }
        });
    }
});

Template.s3_tester3.events({
    "click button.upload": function(){
        var files = $("input.file_bag")[0].files
        S3.upload(files,"subfolder",function(e,r){
            var pic = r.url;
            console.log(pic);
            Meteor.call('AddPic', pic, function (error, result) {
                if (result) {
                    Meteor.call('ReturnProProfileInfo', function (error, results) {
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: error
                            });
                        } else {
                            return  Session.set('ReturnProProfileInfo', results);
                        }
                    });
                }
            });    
        });
        $('#uploadPercent').remove();
    }
})

Template.s3_tester3.helpers({
    "files": function(){
        return S3.collection.find();
    }
})




