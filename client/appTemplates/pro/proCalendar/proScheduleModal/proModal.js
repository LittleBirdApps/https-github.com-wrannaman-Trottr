Session.set('isConflict', false);
Template.proScheduleModal.rendered = function() {

    $('#walkOptions').selectize({
        create: true,
        sortField: 'text'
    });
    $('#walkRecurring').selectize({
        create: true,
        sortField: 'text'
    });

    $('#datepicker').datepicker({
        autoclose: true,
        todayHighlight: true,
        format: "D, M, dd, yy ",
        startDate: '-1d'
    });

    $('#timepicker').timepicker({
        minuteStep: 15,
        showInputs: false,
        disableFocus: true
    });
};

Template.proScheduleModal.events({
    'click #scheduleWalks': function(evt) {
        // for checking if they're trying to schedule something in the past.
        var d = new Date();
        var changeTime = function(eventTime, eventDuration) {
            var splitTime = eventTime.split(":");
            var hoursToMinutes = Number(splitTime[0])*60;
            var toMinutes = hoursToMinutes + Number(splitTime[1]) + Number(eventDuration);
            if (toMinutes <= 1439) {
                var newTime = [Math.floor(toMinutes/60), toMinutes%60];
                if (newTime[1].toString() == "0"){
                    newTime[1] = "00";
                }
                if (newTime[0].toString() <= 9){
                    newTime[0] = "0"+newTime[0];
                }
                return newTime[0]+":"+newTime[1]+":00";
            } else if (toMinutes == 1440){
                return "00:00:00";
            } else{
                toMinutes = toMinutes-1440;
                newTime = [Math.floor(toMinutes/60), toMinutes%60];
                if (newTime[0].toString() < "9"){
                    newTime[0] = "0"+newTime[0];
                }
                if (newTime[1].toString() == "0"){
                    newTime[1] = "00";
                }
                return newTime[0]+":"+newTime[1]+":00";
            }

        };
        var militaryTime = function (time) {
            var amPM = time.charAt(6) + time.charAt(7);
            if (amPM === "AM") {
                var cut = time.replace(" AM", ":00");
                return cut;
            } else if (time.charAt(0) === "1" && time.charAt(1) === "2" && amPM === "PM")  {
                var  noon = time.replace(" PM",":00");
                console.log("yep");
                return noon;
            } else {
                cut = time.replace(" PM","");
                var array = cut.split(":");
                array[0] = Number(array[0]) + 12;
                return array[0]+":"+array[1]+":00"
            }

        }; // changes selected time hh:mm AM to military time.
        var dateSortFormat = function(eventTime) {
            console.log(eventTime);
            var timeAndDate = eventTime.split(" ");
            console.log(timeAndDate);
            var splitDate = timeAndDate[0].split("-");
            var finalDate =  splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
            var splitTime = timeAndDate[1].split(":");
            var hoursToMinutes = Number(splitTime[0])*60;
            var toMinutes = hoursToMinutes + Number(splitTime[1]);
            if (toMinutes > 720) {
                var amPm = "PM"
            } else {
                amPm = "AM"
            }
            var hours = Math.floor(toMinutes/60);
            if (hours > 12) {
                hours = hours-12
            }
            if (hours < 10) {
                hours = "0"+hours;
            }
            var minutes = toMinutes%60;
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return hours + ":" + minutes + " " + amPm+ " on " + finalDate ;
        }; // goes from '2014-11-18 19:30:00' to '07:30 PM on 18-11-2014'
        var recurringEvent = function (originalDate, interval) {
            var newDate = new Date(originalDate).getTime();
            var finalDate = new Date(newDate+(1000*60*60*24*interval));
            var splitFinal = finalDate.toString().split(" ");
            var month = splitFinal[1];
            switch (month) {
                case "Jan": splitFinal[1] = "01";
                    break;
                case "Feb": splitFinal[1] = "02";
                    break;
                case "Mar": splitFinal[1] = "03";
                    break;
                case "Apr": splitFinal[1] = "04";
                    break;
                case "May": splitFinal[1] = "05";
                    break;
                case "Jun": splitFinal[1] = "06";
                    break;
                case "Jul": splitFinal[1] = "07";
                    break;
                case "Aug": splitFinal[1] = "08";
                    break;
                case "Sep": splitFinal[1] = "09";
                    break;
                case "Oct": splitFinal[1] = "10";
                    break;
                case "Nov": splitFinal[1] = "11";
                    break;
                case "Dec": splitFinal[1] = "12";
                    break;
            }
            return splitFinal[3] + "-" + splitFinal[1] + "-"+splitFinal[2]
        }; // adds selected interval and formats properly
        var militaryToMinutes = function(eventTime) {
            var splitTime = eventTime.split(":");
            var hoursToMinutes = Number(splitTime[0])*60;
            var toMinutes = hoursToMinutes + Number(splitTime[1]);
            return toMinutes
        };
        var toCalendarDateFormat = function (date) {
            var newDate = date.split("/");
            return newDate[2] + "-"+newDate[0]+"-"+newDate[1] + " ";
        }; // toCalendarDateFormat changes shit  from 11/14/2014to 2014-11-14
        var preEventStart    = $('#datepicker').val();
        var arrayOfDayOnly = preEventStart.split("/")
        var eventStart = toCalendarDateFormat(preEventStart);
        var startDateForMatching = eventStart.split("-").join("").trim(); //from 2014-11-14 to 20141114
        var preEventTime     = $('#timepicker').val();
        var eventTime = militaryTime(preEventTime);
        var eventDuration = $('#walkOptions').val();
        var eventInterval = $('#walkRecurring').val(); // returns user selected walk interval in weeks.
       //starting availability check
        var eventStartMinutes = militaryToMinutes(eventTime);
        var eventEndMinutes = eventStartMinutes + Number(eventDuration);

        var isAvailable = WalkerAvailabilityEvents.find({startDateForMatching: eventStart.split("-").join("")}).fetch();
        //console.log(isAvailable.startTime);
        //end walker availability check

        if (eventDuration === "") {
            $('.form-horizontal').before(
                '<div class="alert alert-danger alert-dismissable">'+
                '<button type="button" class="close" ' +
                'data-dismiss="alert" aria-hidden="true">' +
                '&times;' +
                '</button>' +
                'Please Select a Walk Option' +
                '</div>');
            $(".alert").fadeOut(2000);
        } else if (preEventStart === "") {
            $('.form-horizontal').before(
                '<div class="alert alert-danger alert-dismissable">'+
                '<button type="button" class="close" ' +
                'data-dismiss="alert" aria-hidden="true">' +
                '&times;' +
                '</button>' +
                'Please Select a Date' +
                '</div>');
            $(".alert").fadeOut(2000);


        } else if (d.getDate() > arrayOfDayOnly[1]) {
            $('.form-horizontal').before(
                '<div class="alert alert-danger alert-dismissable">'+
                '<button type="button" class="close" ' +
                'data-dismiss="alert" aria-hidden="true">' +
                '&times;' +
                '</button>' +
                'Please Select a Date either today or in the future' +
                '</div>');
            $(".alert").fadeOut(3000);


        } else if (eventInterval == "0") {
            Meteor.call('IsWalkerAvailableForSelectedDate', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                     Session.set('isWalkerAvailable', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 100); // set isThereAConflict

            Meteor.setTimeout(function() {
                if (Session.get('isWalkerAvailable') === true && Session.get('isThereAConflict') === false) {
                    var changedTime = changeTime(eventTime, eventDuration);
                    var title =  $('#walkOptions').val() + " Minute Walk";

                    Meteor.call('AddWalk',
                        title,
                        eventStart + eventTime,
                        eventStart.trim().split("-").join(""),
                        eventStart + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(eventStart + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                } else if (Session.get('isWalkerAvailable') === false) {
                        return sweetAlert({
                            title: "Uh Oh!",
                            type: "error",
                            text: "Your walker isn't available at this time!"
                        });
                } else {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Your walker is busy at this time!"
                    });
                }
            },200); /// check avail and conflicts and insert event.
        } else if (eventInterval == "7") {

            Meteor.call('IsWalkerAvailableForSelectedDate', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 100); // set is there a conflict
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 7).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable7', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail 7
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable7')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 7).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict7', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 300); // set is there conflict 7

            Meteor.setTimeout(function() {

                if (Session.get('isWalkerAvailable') === true && Session.get('isThereAConflict') === false && Session.get('isWalkerAvailable7') === true && Session.get('isThereAConflict7') === false) {
                    var changedTime = changeTime(eventTime, eventDuration);
                    var title =  $('#walkOptions').val() + " Minute Walk";

                    Meteor.call('AddWalk',
                        title,
                        eventStart + eventTime,
                        eventStart.trim().split("-").join(""),
                        eventStart + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(eventStart + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 7) + " " + eventTime,
                        recurringEvent(eventStart, 7).trim().split("-").join(""),
                        recurringEvent(eventStart, 7) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 7) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );


                    $('#scheduleModal').modal('hide');
                    sweetAlert({
                        title: "All Set!",
                        text: "Your walk has been scheduled",
                        imageUrl: "img/successWalk.png"
                    });
                } else if (Session.get('isWalkerAvailable') === false || Session.get('isWalkerAvailable7') === false) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Your walker isn't available at this time!"
                    });
                } else {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Your walker is busy at this time!"
                    });
                }
            },400); // check avail and conflicts and insert event

        } else if (eventInterval == "14") {
            Meteor.call('IsWalkerAvailableForSelectedDate', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            });                                     // set is walker avail
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 100);                                                                                                                                     // set is there a conflict
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 7).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable7', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            });  // set is walker avail 7
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable7')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 7).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict7', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 300);                                                                                                                                     // set is there conflict 7
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 14).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable14', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail 14
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable14')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 14).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict14', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 300);                                                                                                                                     // set is there conflict 14

            Meteor.setTimeout(function() {
                if (Session.get('isWalkerAvailable') === true && Session.get('isThereAConflict') === false && Session.get('isWalkerAvailable7') === true && Session.get('isThereAConflict7') === false && Session.get('isWalkerAvailable14') === true && Session.get('isThereAConflict14') === false) {
                    var changedTime = changeTime(eventTime, eventDuration);
                    var title =  $('#walkOptions').val() + " Minute Walk";

                    Meteor.call('AddWalk',
                        title,
                        eventStart + eventTime,
                        eventStart.trim().split("-").join(""),
                        eventStart + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(eventStart + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 7) + " " + eventTime,
                        recurringEvent(eventStart, 7).trim().split("-").join(""),
                        recurringEvent(eventStart, 7) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 7) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 14) + " " + eventTime,
                        recurringEvent(eventStart, 14).trim().split("-").join(""),
                        recurringEvent(eventStart, 14) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 14) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );


                    $('#scheduleModal').modal('hide');
                    sweetAlert({
                        title: "All Set!",
                        text: "Your walk has been scheduled",
                        imageUrl: "img/successWalk.png"
                    });
                } else if (Session.get('isWalkerAvailable') === false || Session.get('isWalkerAvailable7') === false || Session.get('isWalkerAvailable14') === false) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Your walker isn't available on one of the dates at this time!"
                    });
                } else {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Your walker is busy at this time!"
                    });
                }
            },400);                                                                                                                                        // check avail and conflicts and insert event

        } else if (eventInterval == "21") {
            Meteor.call('IsWalkerAvailableForSelectedDate', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            });                                     // set is walker avail
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 100);                                                                                                                                     // set is there a conflict
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 7).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable7', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            });  // set is walker avail 7
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable7')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 7).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict7', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 300);                                                                                                                                     // set is there conflict 7
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 14).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable14', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail 14
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable14')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 14).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict14', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 300);                                                                                                                                     // set is there conflict 14
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 21).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable21', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail 21
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable21')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 21).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict21', results);
                        }
                    });
                }
            }, 300);                                                                                                                                     // set is there conflict 21

            Meteor.setTimeout(function() {
                if (Session.get('isWalkerAvailable') === true && Session.get('isThereAConflict') === false && Session.get('isWalkerAvailable7') === true && Session.get('isThereAConflict7') === false && Session.get('isWalkerAvailable14') === true && Session.get('isThereAConflict14') === false && Session.get('isWalkerAvailable21') === true && Session.get('isThereAConflict21') === false) {
                    var changedTime = changeTime(eventTime, eventDuration);
                    var title =  $('#walkOptions').val() + " Minute Walk";

                    Meteor.call('AddWalk',
                        title,
                        eventStart + eventTime,
                        eventStart.trim().split("-").join(""),
                        eventStart + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(eventStart + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 7) + " " + eventTime,
                        recurringEvent(eventStart, 7).trim().split("-").join(""),
                        recurringEvent(eventStart, 7) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 7) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 14) + " " + eventTime,
                        recurringEvent(eventStart, 14).trim().split("-").join(""),
                        recurringEvent(eventStart, 14) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 14) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 21) + " " + eventTime,
                        recurringEvent(eventStart, 21).trim().split("-").join(""),
                        recurringEvent(eventStart, 21) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 21) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walks have been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );


                    $('#scheduleModal').modal('hide');
                    sweetAlert({
                        title: "All Set!",
                        text: "Your walk has been scheduled",
                        imageUrl: "img/successWalk.png"
                    });
                } else if (Session.get('isWalkerAvailable') === false || Session.get('isWalkerAvailable7') === false || Session.get('isWalkerAvailable14') === false || Session.get('isWalkerAvailable21') === false) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Your walker isn't available at this time!"
                    });
                } else {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Your walker is busy at this time!"
                    });
                }
            },400);                                                                                                                                        // check avail and conflicts and insert event

        } else if (eventInterval == "49") {
            Meteor.call('IsWalkerAvailableForSelectedDate', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            });                                     // set is walker avail
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', startDateForMatching, eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 100);                                                                                                                                     // set is there a conflict
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 7).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable7', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            });  // set is walker avail 7
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable7')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 7).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict7', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 300);                                                                                                                                     // set is there conflict 7
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 14).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable14', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail 14
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable14')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 14).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict14', results);

                            console.log("Session set is there a conflict from server *******False to Allow Scheduling**********");
                        }
                    });
                }
            }, 350);                                                                                                                                     // set is there conflict 14
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 21).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable21', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail 21
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable21')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 21).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict21', results);
                        }
                    });
                }
            }, 400);                                                                                                                                     // set is there conflict 21
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 28).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable28', results);

                }
            }); // set is walker avail 28
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable28')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 28).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict28', results);
                        }
                    });
                }
            }, 450);                                                                                                                                     // set is there conflict 28
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 35).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable35', results);

                }
            }); // set is walker avail 35
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable35')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 35).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict35', results);
                        }
                    });
                }
            }, 500);                                                                                                                                     // set is there conflict 35
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 42).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable42', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail 42
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable42')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 42).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict42', results);
                        }
                    });
                }
            }, 500);                                                                                                                                     // set is there conflict 42
            Meteor.call('IsWalkerAvailableForSelectedDate',recurringEvent(eventStart, 49).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results) {
                if (error) {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "There was an error, all we know is : " + error
                    });
                } else {
                    Session.set('isWalkerAvailable49', results);
                    console.log("Session set is walker available from server ******True to allow scheduling***********")
                }
            }); // set is walker avail 49
            Meteor.setTimeout(function () {
                if (Session.get('isWalkerAvailable49')) {
                    console.log("okay, now we need to check if there is a conflict");
                    Meteor.call('isThereAConflict', recurringEvent(eventStart, 49).trim().split("-").join(""), eventStartMinutes, eventEndMinutes, function(error, results){
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            Session.set('isThereAConflict49', results);
                        }
                    });
                }
            }, 500);                                                                                                                                     // set is there conflict 49

            Meteor.setTimeout(function() {


                if (Session.get('isWalkerAvailable') === true && Session.get('isThereAConflict') === false
                    && Session.get('isWalkerAvailable7') === true && Session.get('isThereAConflict7') === false
                    && Session.get('isWalkerAvailable14') === true && Session.get('isThereAConflict14') === false
                    && Session.get('isWalkerAvailable21') === true && Session.get('isThereAConflict21') === false
                    && Session.get('isWalkerAvailable28') === true && Session.get('isThereAConflict28') === false
                    && Session.get('isWalkerAvailable35') === true && Session.get('isThereAConflict35') === false
                    && Session.get('isWalkerAvailable42') === true && Session.get('isThereAConflict42') === false
                    && Session.get('isWalkerAvailable49') === true && Session.get('isThereAConflict49') === false
                )

                {
                    var changedTime = changeTime(eventTime, eventDuration);
                    var title =  $('#walkOptions').val() + " Minute Walk";

                    Meteor.call('AddWalk',
                        title,
                        eventStart + eventTime,
                        eventStart.trim().split("-").join(""),
                        eventStart + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(eventStart + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 7) + " " + eventTime,
                        recurringEvent(eventStart, 7).trim().split("-").join(""),
                        recurringEvent(eventStart, 7) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 7) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 14) + " " + eventTime,
                        recurringEvent(eventStart, 14).trim().split("-").join(""),
                        recurringEvent(eventStart, 14) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 14) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk has been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                    title,
                    recurringEvent(eventStart, 21) + " " + eventTime,
                    recurringEvent(eventStart, 21).trim().split("-").join(""),
                    recurringEvent(eventStart, 21) + " " + changedTime,
                    militaryToMinutes(eventTime),
                    militaryToMinutes(changedTime),
                    eventTime,
                    dateSortFormat(recurringEvent(eventStart, 21) + " " + eventTime),
                    "Andrew Pierno",
                    function (error, results) {
                        if (error) {
                            return sweetAlert({
                                title: "Uh Oh!",
                                type: "error",
                                text: "There was an error, all we know is : " + error
                            });
                        } else {
                            $('#scheduleModal').modal('hide');
                            sweetAlert({
                                title: "All Set!",
                                text: "Your walks have been scheduled",
                                imageUrl: "img/successWalk.png"
                            });
                        }
                    }
                );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 28) + " " + eventTime,
                        recurringEvent(eventStart, 28).trim().split("-").join(""),
                        recurringEvent(eventStart, 28) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 28) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walks have been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 35) + " " + eventTime,
                        recurringEvent(eventStart, 35).trim().split("-").join(""),
                        recurringEvent(eventStart, 35) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 35) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walk have been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 42) + " " + eventTime,
                        recurringEvent(eventStart, 42).trim().split("-").join(""),
                        recurringEvent(eventStart, 42) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 42) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walks have been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );
                    Meteor.call('AddWalk',
                        title,
                        recurringEvent(eventStart, 49) + " " + eventTime,
                        recurringEvent(eventStart, 49).trim().split("-").join(""),
                        recurringEvent(eventStart, 49) + " " + changedTime,
                        militaryToMinutes(eventTime),
                        militaryToMinutes(changedTime),
                        eventTime,
                        dateSortFormat(recurringEvent(eventStart, 49) + " " + eventTime),
                        "Andrew Pierno",
                        function (error, results) {
                            if (error) {
                                return sweetAlert({
                                    title: "Uh Oh!",
                                    type: "error",
                                    text: "There was an error, all we know is : " + error
                                });
                            } else {
                                $('#scheduleModal').modal('hide');
                                sweetAlert({
                                    title: "All Set!",
                                    text: "Your walks have been scheduled",
                                    imageUrl: "img/successWalk.png"
                                });
                            }
                        }
                    );


                    $('#scheduleModal').modal('hide');
                    sweetAlert({
                        title: "All Set!",
                        text: "Your walk has been scheduled",
                        imageUrl: "img/successWalk.png"
                    });
                } else if (Session.get('isWalkerAvailable') === false || Session.get('isWalkerAvailable7') === false
                    || Session.get('isWalkerAvailable14') === false || Session.get('isWalkerAvailable21') === false
                    || Session.get('isWalkerAvailable28') === false || Session.get('isWalkerAvailable35') === false
                    || Session.get('isWalkerAvailable42') === false || Session.get('isWalkerAvailable49') === false

                )
                {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Your walker isn't available at this time!"
                    });
                } else {
                    return sweetAlert({
                        title: "Uh Oh!",
                        type: "error",
                        text: "Your walker is busy at this time!"
                    });
                }
            },1000);                                                                                                                                        // check avail and conflicts and insert event
        }
            $('#calendar').fullCalendar('refetchEvents');
    } // end of click event
});
Meteor.autorun(function(){
    Template.proScheduleModal.helpers({
        selectedDate: function() {
            return Session.get('selectedDate');
        },
        selectedTime: function () {
            return Session.get('selectedTime');
        }
    });
    Deps.autorun(function () {
        var isConflict = Session.get('isConflict');
        console.log(isConflict + " from deps autorun ");
    });

    //Meteor.autorun(function() {
    //    $('#calendar').fullCalendar('refetchEvents');
    //});
});
Template.proCalendar.helpers({
    lastMod: function(){
        return Session.get('lastMod');
    },
    showEditEvent: function() {
        return Session.get('showEditEvent');
    }
});
var modalTime = function(date) {
    var splitDate = date.split(" ");

    var day = splitDate[0] + ",";
    var month = splitDate[1] + ",";
    var dayNum = splitDate[2] + ",";
    var year = splitDate[3];
    var finalDate = day + " " + month + " " + dayNum + " " + year + " ";


//time manipulation
    var time = splitDate[4];
    var timeSplit = time.split(":");
    if (timeSplit[0] < 12) {
        var amPM = " AM";
    } else {
        amPM = " PM";
    }
    if (timeSplit[0] > 12) {
        timeSplit[0] = timeSplit[0] - 12;
    }
    var timeJoin = timeSplit[0] + ":" + timeSplit[1] + amPM;

    var allTogetherNow = [finalDate,timeJoin];

    return allTogetherNow;
};
