Template.proServices.rendered = function () {
  Session.set("proNavbar", "Services");
    Session.set("AddedService", 0);
    Session.set("ProServices", Meteor.user().num_services);
    Meteor.call("GetProServices",function (err, result) {
        if (err) {
            throw err
        }
        if (result) {
            Session.set("GetProServices", result);
        }
    });
};

Template.proServices.helpers({
    service: function () {
        
        var numServices = Session.get("ProServices");
        var service = Session.get("GetProServices");
        console.log(numServices);
        var servicesArray = [];

        if ((Session.get("ProServices") - Session.get("GetProServices").length) == 0 ) {  
        for (var i=0; i<numServices; i++) {
                servicesArray.push({
                    "num": (i+1),
                    "title": service[i].title,
                    "price": service[i].price,
                    "length": service[i].length,
                    "id": service[i]._id
                });
            }
        }
        if ((Session.get("ProServices") - Session.get("GetProServices").length) == 1 ) {  
            for (var i=0; i<numServices-1; i++) {
                    servicesArray.push({
                        "num": (i+1),
                        "title": service[i].title,
                        "price": service[i].price,
                        "length": service[i].length,
                        "id": service[i]._id
                    });
                }
                servicesArray.push({
                        "num": (numServices),
                        "title": '',
                        "price": '',
                        "length": '',
                        "id": ''
                    });
        }


        Session.set("ServicesArray", servicesArray);

        return servicesArray;
    },

});

Template.proServices.events({
    'click #save': function () {
        var title1 = $('#title1').val();
        var title2 = $('#title2').val();
        var title3 = $('#title3').val();
        var title4 = $('#title4').val();
        var title5 = $('#title5').val();
        var title6 = $('#title6').val();
        var title7 = $('#title7').val();
        var title8 = $('#title8').val();
        var title9 = $('#title9').val();
        var title10 = $('#title10').val();

        var price1 = $('#price1').val();
        var price2 = $('#price2').val();
        var price3 = $('#price3').val();
        var price4 = $('#price4').val();
        var price5 = $('#price5').val();
        var price6 = $('#price6').val();
        var price7 = $('#price7').val();
        var price8 = $('#price8').val();
        var price9 = $('#price9').val();
        var price10 = $('#price10').val();

        var length1 = $('#length1').val();
        var length2 = $('#length2').val();
        var length3 = $('#length3').val();
        var length4 = $('#length4').val();
        var length5 = $('#length5').val();
        var length6 = $('#length6').val();
        var length7 = $('#length7').val();
        var length8 = $('#length8').val();
        var length9 = $('#length9').val();
        var length10 = $('#length10').val();
        //num added services 
        //update 1 
       if (Session.get("ServicesArray")[0].id != undefined) {
            Meteor.call('UpdateProService', Session.get("ServicesArray")[0].id, title1, price1, length1, function (err, result) {});
            
            sweetAlert("Updated", "Services Saved!", "success");
       }
       //update 2 
       if (Session.get("ServicesArray")[1].id !=undefined) {
            Meteor.call('UpdateProService', Session.get("ServicesArray")[0].id, title1, price1, length1, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[1].id, title2, price2, length2, function (err, result) {});
           
            sweetAlert("Updated", "Services Saved!", "success");
       }
       //update 3
       if (Session.get("ServicesArray")[2].id != undefined) {
            Meteor.call('UpdateProService', Session.get("ServicesArray")[0].id, title1, price1, length1, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[1].id, title2, price2, length2, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[2].id, title3, price3, length3, function (err, result) {});
            
            sweetAlert("Updated", "Services Saved!", "success");
       }
       //update 4 
       if (Session.get("ServicesArray")[3].id != undefined) {
            Meteor.call('UpdateProService', Session.get("ServicesArray")[0].id, title1, price1, length1, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[1].id, title2, price2, length2, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[2].id, title3, price3, length3, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[3].id, title4, price4, length4, function (err, result) {});
          
          
            sweetAlert("Updated", "Services Saved!", "success");
       }
       //update 5 
       if (Session.get("ServicesArray")[4].id !=undefined) {
            Meteor.call('UpdateProService', Session.get("ServicesArray")[0].id, title1, price1, length1, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[1].id, title2, price2, length2, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[2].id, title3, price3, length3, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[3].id, title4, price4, length4, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[4].id, title4, price4, length4, function (err, result) {});
           
            
            sweetAlert("Updated", "Services Saved!", "success");
       }
       //update 5 
       if (Session.get("ServicesArray")[5].id != undefined) {
            Meteor.call('UpdateProService', Session.get("ServicesArray")[0].id, title1, price1, length1, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[1].id, title2, price2, length2, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[2].id, title3, price3, length3, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[3].id, title4, price4, length4, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[4].id, title5, price5, length5, function (err, result) {});
            Meteor.call('UpdateProService', Session.get("ServicesArray")[5].id, title6, price6, length6, function (err, result) {});
            
            
            sweetAlert("Updated", "Services Saved!", "success");
       }
       //update 7 
       if (Session.get("ServicesArray")[6].id != undefined) {

       }
       //update 8 
       if (Session.get("ServicesArray")[7].id != undefined) {

       }
       //update 9 
       if (Session.get("ServicesArray")[8].id != undefined) {

       }
       //update 10 
       if (Session.get("ServicesArray")[9].id != undefined) {

       }
       // //add 2nd
       // if (Session.get("ServicesArray")[1].id == "") {
       //      Meteor.call('AddProService', Session.get("ProServices"), Session.get("ProServices"), title2, length2, price2 , function (error, result) {});
       //      console.log("addingOne");
       // }
       // //add 3rd
       // if (Session.get("ServicesArray")[2].id == "") {
       //      Meteor.call('AddProService', Session.get("ProServices"), Session.get("ProServices"), title3, length3, price3 , function (error, result) {});
       //      console.log("addingOne");
       // }
       // //add 4th
       // if (Session.get("ServicesArray")[3].id == "") {
       //      Meteor.call('AddProService', Session.get("ProServices"), Session.get("ProServices"), title4, length4, price4 , function (error, result) {});
       //      console.log("addingOne");
       // }
       // //add 5th
       // if (Session.get("ServicesArray")[4].id == "") {
       //      Meteor.call('AddProService', Session.get("ProServices"), Session.get("ProServices"), title5, length5, price5 , function (error, result) {});
       //      console.log("addingOne");
       // }
       // //add 6th
       // if (Session.get("ServicesArray")[5].id == "") {
       //      Meteor.call('AddProService', Session.get("ProServices"), Session.get("ProServices"), title6, length6, price6 , function (error, result) {});
       //      console.log("addingOne");
       // }
      
       

    },
    // 'click #addService': function () {
    //     if ((Session.get("ProServices") - Session.get("GetProServices").length) == 0 ) { 

    //         return Session.set("ProServices", Session.get("ProServices") + 1);
    //     }
    //     if ((Session.get("ProServices") - Session.get("GetProServices").length) == 1 ) {  
    //         return sweetAlert("One at a time", "Please save your added service before adding another", "error");
    //     }

       
    // },
    'click #showModal': function () {
        $('#proServicesModal').modal('show');
    },
    'click #addService': function () {
        Session.set("ProServices", Session.get("ProServices") + 1);
        $('#proServicesModal').modal('hide');
        Meteor.setTimeout(function(){
            var titlem = $('#titlem').val();
            var lengthm = $('#lengthm').val();
            var pricem = $('#pricem').val();
            Meteor.call('AddProService', Session.get("ProServices"), Session.get("ProServices"), titlem, lengthm, pricem , function (error, result) {});
        }, 350);
        Meteor.setTimeout(function() {
            Meteor.call("GetProServices",function (err, result) {
                if (err) {
                    throw err
                }
                if (result) {
                    Session.set("GetProServices", result);
                }
            });
        
        },400);

    },
    'click #delete1': function() {
        Meteor.call('DeleteProService', 1, function (error, result) {});
        Session.set("ProServices", Session.get("ProServices") - 1);
        Meteor.setTimeout(function(){
            Meteor.call('UpdateProNumServices', Session.get("ProServices") , function (error, result) {});
        },400);
        Meteor.setTimeout(function() {
            Meteor.call("GetProServices",function (err, result) {
                if (err) {
                    throw err
                }
                if (result) {
                    Session.set("GetProServices", result);
                }
            });
        
        },500);
        return sweetAlert("Deleted","Service deleted!", "success");
    },
    'click #delete2': function() {
        Meteor.call('DeleteProService', 2, function (error, result) {});
        Session.set("ProServices", Session.get("ProServices") - 1);
        Meteor.setTimeout(function(){
            Meteor.call('UpdateProNumServices', Session.get("ProServices") , function (error, result) {});
        },400);
        Meteor.setTimeout(function() {
            Meteor.call("GetProServices",function (err, result) {
                if (err) {
                    throw err
                }
                if (result) {
                    Session.set("GetProServices", result);
                }
            });
        
        },500);
        return sweetAlert("Deleted","Service deleted!", "success");
    },
    'click #delete3': function() {
        Meteor.call('DeleteProService', 3, function (error, result) {});
        Session.set("ProServices", Session.get("ProServices") - 1);
        Meteor.setTimeout(function(){
            Meteor.call('UpdateProNumServices', Session.get("ProServices") , function (error, result) {});
        },300);
        Meteor.setTimeout(function() {
            Meteor.call("GetProServices",function (err, result) {
                if (err) {
                    throw err
                }
                if (result) {
                    Session.set("GetProServices", result);
                }
            });
        
        },400);
        return sweetAlert("Deleted","Service deleted!", "success");
    }
});



