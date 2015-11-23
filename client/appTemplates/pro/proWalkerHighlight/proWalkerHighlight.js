Template.proWalkerHighlight.rendered = function () {
    Session.set("proNavbar", "Walker Highlight");
    var walkerId = Session.get("SelectedWalkerId");
    var today = moment();
    var monday = "";
    for (var i=0; i<7; i++) {
        //console.log(moment().subtract(i, 'days').format('dddd'));
        if (moment().subtract(i, 'days').format('dddd') === "Monday") {
            monday = moment().subtract(i, 'days').format('MM DD YY');
            break
        }
    }
    var findMonday = monday.split(" ");
    Session.set("FindMonday", "20"+findMonday[2]+findMonday[0]+findMonday[1]);
    
    Meteor.call("SelectedWalkerSchedule", walkerId, function (error, results) {
        if (error) {
            return sweetAlert({
                title: "Uh Oh!",
                type: "error",
                text: "There was an error, all we know is : " + error
            });
        } else {
            Session.set('WalkerSchedule', results);
        }
    });

    Meteor.setTimeout(function(){
        $('#openChat').trigger('click');
    }, 1000);
    
    Meteor.call("MyWalkersAvailability", walkerId, function (error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                 } else {
                    
                     return Session.set("WalkerAvailEvents", results);
                 }
             });
    

    Meteor.setTimeout(function(){
        var militaryToAmPm = function (time) {
            var split = time.split(":");

            if (Number(split[0]) < 12 ) {
                return split[0] + ":" + split[1] + " AM";
            } else if (Number(split[0]) === 12 ) {
                return split[0] + ":" + split[1] + " PM";
            } else {
                if ((Number(split[0])-12) < 10) {
                    return (Number(split[0])-12)+":" + split[1] + " PM";
                } else {
                    return (Number(split[0])-12)+":" + split[1] + " PM";
                }
            }


        };
        var mondayMatch = Session.get("FindMonday");
        var walkerSchedule = Session.get("WalkerSchedule");
        console.log(mondayMatch);
        console.log(walkerSchedule);
        console.log((Number(mondayMatch)+2));
        var monday, tuesday, wednesday, thursday, friday, saturday, sunday = null;

        for (var i=0; i<walkerSchedule.length; i++) {
            if (walkerSchedule[i].startDateForMatching == Number(mondayMatch)) {
                monday = [walkerSchedule[i].startDateForMatching, walkerSchedule[i].startTime, walkerSchedule[i].endTime];
            }
            if (walkerSchedule[i].startDateForMatching == (Number(mondayMatch)+1)) {
                tuesday = [walkerSchedule[i].startDateForMatching, walkerSchedule[i].startTime, walkerSchedule[i].endTime];
            }
            if (walkerSchedule[i].startDateForMatching == (Number(mondayMatch)+2)) {
                wednesday = [walkerSchedule[i].startDateForMatching, walkerSchedule[i].startTime, walkerSchedule[i].endTime];
            }
            if (walkerSchedule[i].startDateForMatching == (Number(mondayMatch)+3)) {
                thursday = [walkerSchedule[i].startDateForMatching, walkerSchedule[i].startTime, walkerSchedule[i].endTime];
            }
            if (walkerSchedule[i].startDateForMatching == (Number(mondayMatch)+4)) {
                friday =[walkerSchedule[i].startDateForMatching, walkerSchedule[i].startTime, walkerSchedule[i].endTime];
            }
            if (walkerSchedule[i].startDateForMatching == (Number(mondayMatch)+5)) {
                saturday= [walkerSchedule[i].startDateForMatching, walkerSchedule[i].startTime, walkerSchedule[i].endTime];
            }
            if (walkerSchedule[i].startDateForMatching == (Number(mondayMatch)+6)) {
                sunday= [walkerSchedule[i].startDateForMatching, walkerSchedule[i].startTime, walkerSchedule[i].endTime];
            }

        }
        console.log(monday, tuesday, wednesday, thursday, friday, saturday, sunday);

        if (monday == null) {
            Session.set("monStart", null);
            Session.set("monEnd", null);
        } else {
            Session.set("monStart", militaryToAmPm(monday[1]));
            Session.set("monEnd", militaryToAmPm(monday[2]));
        }
        if (tuesday == null) {
            Session.set("tueStart", null);
            Session.set("tueEnd", null);
        } else {
            Session.set("tueStart", militaryToAmPm(tuesday[1]));
            Session.set("tueEnd", militaryToAmPm(tuesday[2]));
        }
        if (wednesday == null) {
            Session.set("wedStart", null);
            Session.set("wedEnd", null);
        } else {
            Session.set("wedStart", militaryToAmPm(wednesday[1]));
            Session.set("wedEnd", militaryToAmPm(wednesday[2]));
        }
        if (thursday == null) {
            Session.set("thsStart", null);
            Session.set("thsEnd", null);
        } else {
            Session.set("thsStart", militaryToAmPm(thursday[1]));
            Session.set("thsEnd", militaryToAmPm(thursday[2]));
        }
        if (friday == null) {
            Session.set("friStart", null);
            Session.set("friEnd", null);
        } else {
            Session.set("friStart", militaryToAmPm(friday[1]));
            Session.set("friEnd", militaryToAmPm(friday[2]));
        }
        if (saturday == null) {
            Session.set("satStart", null);
            Session.set("satEnd", null);
        } else {
            Session.set("satStart", militaryToAmPm(saturday[1]));
            Session.set("satEnd", militaryToAmPm(saturday[2]));
        }
        if (sunday == null) {
            Session.set("sunStart", null);
            Session.set("sunEnd",  null);
        } else {
            Session.set("sunStart", militaryToAmPm(sunday[1]));
            Session.set("sunEnd", militaryToAmPm(sunday[2]));
        }

    },300);
};
Template.proWalkerHighlight.helpers({
    name: function () {
        return Session.get("SelectedWalkerName");
    },
    about: function () {
        return Session.get("SelectedWalkerAbout");
    },
    phone: function () {
        return Session.get("SelectedWalkerPhone");
    },
    pic: function () {
        return Session.get("SelectedWalkerPic");
    },
    monStart: function () {
        return Session.get("monStart");
    },
    monEnd: function () {
        return Session.get("monEnd");
    },
    tueStart: function () {
        return Session.get("tueStart");
    },
    tueEnd: function () {
        return Session.get("tueEnd");
    },
    wedStart: function () {
        return Session.get("wedStart");
    },
    wedEnd: function () {
        return Session.get("wedEnd");
    },
    thsStart: function () {
        return Session.get("thsStart");
    },
    thsEnd: function () {
        return Session.get("thsEnd");
    },
    friStart: function () {
        return Session.get("friStart");
    },
    friEnd: function () {
        return Session.get("friEnd");
    },
    satStart: function () {
        return Session.get("satStart");
    },
    satEnd: function () {
        return Session.get("satEnd");
    },
    sunStart: function () {
        return Session.get("sunStart");
    },
    sunEnd: function () {
        return Session.get("sunEnd");
    }

});

Template.proWalkerHighlight.events({
    
    
});
