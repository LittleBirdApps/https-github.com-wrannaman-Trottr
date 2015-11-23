Template.s3_tester2.rendered = function () {
    

 // Meteor.setTimeout(function(){
        //     var uploadedFile = $("input.file_bag")[0].files[0];
        //      console.log("first one");
        //     if (uploadedFile != undefined) {
        //         var files = $("input.file_bag")[0].files;
        //         S3.upload(files,"subfolder",function(e,r){
        //             var pic = r.url;
        //            Session.set("WalkPic",pic);
        //             var walkID = Session.get("details")._id;
        //             Meteor.call('WalkPic', walkID, pic, function (error, result) {
                        
        //             });
        //         }); 
        //         Session.set("WalkPhotoSent", true);
        //     }
        // },9000);    
        // Meteor.setTimeout(function(){
        //     var uploadedFile = $("input.file_bag")[0].files[0];
        //     console.log("middle one");
        //     if (uploadedFile != undefined && Session.get("WalkPhotoSent") != true) {
        //         console.log(uploadedFile);
        //         var files = $("input.file_bag")[0].files;
        //         S3.upload(files,"subfolder",function(e,r){
        //             var pic = r.url;
        //             Session.set("WalkPic",pic);
        //             Meteor.call('WalkPic', pic, function (error, result) {
                        
        //             });
        //         }); 
        //         Session.set("WalkPhotoSent", true);
        //     }
        // },18000); 
        // Meteor.setTimeout(function(){
        //     var uploadedFile = $("input.file_bag")[0].files[0];
        //     console.log("secondmiddle one");
        //     if (uploadedFile != undefined && Session.get("WalkPhotoSent") != true) {
        //         console.log(uploadedFile);
        //         var files = $("input.file_bag")[0].files;
        //         S3.upload(files,"subfolder",function(e,r){
        //             var pic = r.url;
        //            Session.set("WalkPic",pic);
        //             Meteor.call('WalkPic', pic, function (error, result) {
                        
        //             });
        //         }); 
        //         Session.set("WalkPhotoSent", true);
        //     }
        // },33000); 
        // Meteor.setTimeout(function(){
        //     var uploadedFile = $("input.file_bag")[0].files[0];
        //     console.log("long one");
        //     if (uploadedFile != undefined && Session.get("WalkPhotoSent") != true) {
        //         var files = $("input.file_bag")[0].files;
        //         S3.upload(files,"subfolder",function(e,r){
        //             var pic = r.url;
        //            Session.set("WalkPic",pic);
        //             Meteor.call('WalkPic', pic, function (error, result) {
                        
        //             });
        //         }); 
        //         Session.set("WalkPhotoSent", true);
        //     }
        // },50000); 
        // Meteor.setTimeout(function(){
        //     var uploadedFile = $("input.file_bag")[0].files[0];
        //     console.log("long one");
        //     if (uploadedFile != undefined && Session.get("WalkPhotoSent") != true) {
        //         var files = $("input.file_bag")[0].files;
        //         S3.upload(files,"subfolder",function(e,r){
        //             var pic = r.url;
        //           Session.set("WalkPic",pic);
        //             Meteor.call('WalkPic', pic, function (error, result) {
                        
        //             });
        //         }); 
        //         Session.set("WalkPhotoSent", true);
        //     }
        // },100000); 
}// end rendered

Template.walkerStop.rendered = function () {
    Session.set("Navbar", "Walk");
    $('html').css('height', '100%');
    $('body').css('height', '100%');
    
    var walk_id = Session.get("details")._id;
    Meteor.call('WalkRoute', walk_id, function (error, result) {
        Session.set("WalkRoute", result);
    });
};

Template.walkerStop.events({
    'click #completeWalk': function (e,t) {
        var pee = $('#pees').val();
        var poop = $('#poops').val();
        var notes = $('#notes').val();
         var walkID = Session.get("details")._id;
         var user_id = Session.get('details').userId;
         var walker_id = Session.get('details').walkerId;
         var amount = Session.get('details').amount;
         var actual_start = Session.get("ActualStart");
         var date1 = actual_start
         var walkPic = Session.get("WalkPic");
         var title = Session.get('details').title;
            
            var date1A = date1.toString();
            var date1Array = date1A.split(" ");
            var date1Array2 = date1Array[4].split(":");
            var date2 = new Date();
            console.log(date2);
            var date2A = date2.toString();
            var date2Array = date2A.split(" ");
            console.log(date2Array);
            var date2Array2 = date2Array[4].split(":");

            console.log(Number(date2Array2[0]));

            var hours = Number(date1Array2[0])-Number(date2Array2[0]);
            var minutes = Number(date1Array2[1])-Number(date2Array2[1]) + 1;

            var length = [hours, minutes];
            var uploadedFile = $("input.file_bag")[0].files[0];
            console.log("long one");
            if (uploadedFile != undefined && Session.get("WalkPhotoSent") != true) {
                var files = $("input.file_bag")[0].files;
                S3.upload(files,"subfolder",function(e,r){
                    var pic = r.url;
                  Session.set("WalkPic",pic);
                    Meteor.call('WalkPic', pic, function (error, result) {
                        
                    });
                }); 
                Session.set("WalkPhotoSent", true);
            }
        Meteor.call('CompleteWalk', pee,poop,notes,walkID,user_id,walker_id,actual_start, length, walkPic, amount, title, function (error, result) {
            if (result) {
                 //router.go('/walkerCalendarList');
                 Session.set("Map",result); 
                 Router.go('/walkerCalendarList');
                sweetAlert({
                    title: "Walk Completed!",
                    text: "Awesome!",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#eb6a5a",
                    confirmButtonText: "Werd",
                    closeOnConfirm: true,
                    timer: 1500
         });
              
            var dataContext= {
            message:"New Invoice From !",
             url:"localhost:3000/invoiceEmail",
                title:"Amazing stuff, click me !"
                };
            var html=Blaze.toHTMLWithData(Template.invoiceEmail,dataContext);
            var options= {
              from: "andrew@trottr.us",
              to: "andrewpierno@gmail.com",
              subject:"New Invoice!",
              html:html
              };
            
        Meteor.call('sendInvoiceEmail', options, function (error, result) {
            console.log(result);
        });

            }

        });

        
   


    }  //end click event
});//end events
Template.s3_tester2.events({
    "click button.upload": function(){
        
    },
    'click #walkPhoto': function (e,t) {
        $('input.file_bag').trigger('click');
         
       
    }
});

// Template.s3_tester2.helpers({
//     "files": function(){
//         return S3.collection.find();
//     }
// })
