Template.walkerAvailability.rendered = function () {
    Session.set("Navbar", "Availability");
    $('#weekpicker1').pickadate({
        format: 'Week of:  mm-dd-yyyy',
        disable: [
            true,
            2,
        ]
    });
    $('#timepicker1').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker1A').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker2').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker2A').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker3').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker3A').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker4').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker4A').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker5').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker5A').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker6').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker6A').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker7').pickatime({
        interval: 30,
        format: 'hh:i A'
    });
    $('#timepicker7A').pickatime({
        interval: 30,
        format: 'hh:i A'
    });

};

Template.walkerAvailability.events({
    'click #saveAvail': function (evt, tmpl) {
        var weekBegin = $('#weekpicker1').val();
        function changeWeekFormat(string) {
            var week = string.replace("Week of:  ","");
            var format = week.split("-");
            return format;
        }
        var militaryToMinutes = function(eventTime) {
            var splitTime = eventTime.split(":");
            var hoursToMinutes = Number(splitTime[0])*60;
            var toMinutes = hoursToMinutes + Number(splitTime[1]);
            return toMinutes
        };
        var incrementDate = function (date, interval) {
            var timeEpoch = new Date(date).getTime();
            var finalDate = new Date(timeEpoch+(1000*60*60*24*interval));
//back to fullcal format.
            var finalSplit = finalDate.toString().split(" ");


            var month = finalSplit[1];
            switch (month) {
                case "Jan": finalSplit[1] = "01";
                    break;
                case "Feb": finalSplit[1] = "02";
                    break;
                case "Mar": finalSplit[1] = "03";
                    break;
                case "Apr": finalSplit[1] = "04";
                    break;
                case "May": finalSplit[1] = "05";
                    break;
                case "Jun": finalSplit[1] = "06";
                    break;
                case "Jul": finalSplit[1] = "07";
                    break;
                case "Aug": finalSplit[1] = "08";
                    break;
                case "Sep": finalSplit[1] = "09";
                    break;
                case "Oct": finalSplit[1] = "10";
                    break;
                case "Nov": finalSplit[1] = "11";
                    break;
                case "Dec": finalSplit[1] = "12";
                    break;
            }


            return finalSplit[3] + "-" + finalSplit[1] + "-" + finalSplit[2];
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

        };
        var id = Meteor.userId();
        var militaryToAmPm = function (time) {
            var split = time.split(":");

            if (Number(split[0]) < 12 ) {
                return split[0] + ":" + split[1] + " AM";
            } else if (Number(split[0]) === 12 ) {
                return split[0] + ":" + split[1] + " PM";
            } else {
                if ((Number(split[0])-12) < 10) {
                    return "0"+(Number(split[0])-12)+":" + split[1] + " PM";
                } else {
                    return (Number(split[0])-12)+":" + split[1] + " PM";
                }
            }


        };
        var weekOf    = changeWeekFormat(weekBegin);
        var monday    = weekOf[2] + "-" + weekOf[0]+"-"+weekOf[1];
        var tuesday   = incrementDate(weekOf, 1);
        var wednesday = incrementDate(weekOf, 2);
        var thursday  = incrementDate(weekOf, 3);
        var friday    = incrementDate(weekOf, 4);
        var saturday  = incrementDate(weekOf, 5);
        var sunday    = incrementDate(weekOf, 6);
        var monStart  = militaryTime($('#timepicker1').val());
        var monEnd    = militaryTime($('#timepicker1A').val());
        var tuesStart = militaryTime($('#timepicker2').val());
        var tuesEnd   = militaryTime($('#timepicker2A').val());
        var wedStart  = militaryTime($('#timepicker3').val());
        var wedEnd    = militaryTime($('#timepicker3A').val());
        var thsStart  = militaryTime($('#timepicker4').val());
        var thsEnd    = militaryTime($('#timepicker4A').val());
        var friStart  = militaryTime($('#timepicker5').val());
        var friEnd    = militaryTime($('#timepicker5A').val());
        var satStart  = militaryTime($('#timepicker6').val());
        var satEnd    = militaryTime($('#timepicker6A').val());
        var sunStart  = militaryTime($('#timepicker7').val());
        var sunEnd    = militaryTime($('#timepicker7A').val());
        //var monGeneralStart = militaryToAmPm($('#timepicker1').val());
        //var monGeneralEnd = militaryToAmPm($('#timepicker1A').val());
        //var tueGeneralStart = militaryToAmPm($('#timepicker2').val());
        //var tueGeneralStart = militaryToAmPm($('#timepicker2A').val());
        //var wedGeneralStart = militaryToAmPm($('#timepicker3').val());
        //var wedGeneralStart = militaryToAmPm($('#timepicker3A').val());
        //var thsGeneralStart = militaryToAmPm($('#timepicker4').val());
        //var thsGeneralStart = militaryToAmPm($('#timepicker4A').val());
        //var friGeneralStart = militaryToAmPm($('#timepicker5').val());
        //var friGeneralStart = militaryToAmPm($('#timepicker5A').val());
        //var satGeneralStart = militaryToAmPm($('#timepicker6').val());
        //var satGeneralStart = militaryToAmPm($('#timepicker6A').val());
        //var sunGeneralStart = militaryToAmPm($('#timepicker7').val());
        //var sunGeneralStart = militaryToAmPm($('#timepicker7A').val());

        if (monStart!=="12:undefined:00" && monEnd!=="12:undefined:00"){
            Meteor.call('SaveWalkerAvailability', monday, monday.split("-").join(""), militaryToMinutes(monStart), militaryToMinutes(monEnd), monStart, monEnd, monday + " " + monStart, monday + " " + monEnd, function (error, results) {
                if (error) {
                    sweetAlert({title: "Uh Oh!",   text: "Something went wrong. Go ahead and try again",   timer: 2000, type:"warning"});
                } else {
                    console.log("walker Availability Updated for " + monday);
                }
            });
            //Meteor.call('WalkerGeneralAvailability', monGeneralStart, monGeneralEnd, null, null, null, null, null, null, null, null, null, null, null, null, function (error, results) {});
        }

        if (tuesStart!=="12:undefined:00" && tuesEnd!=="12:undefined:00"){
            Meteor.call('SaveWalkerAvailability', tuesday, tuesday.split("-").join(""), militaryToMinutes(tuesStart), militaryToMinutes(tuesEnd), tuesStart, tuesEnd, tuesday + " " + tuesStart, tuesday + " " + tuesEnd, function (error, results) {
                if (error) {
                    sweetAlert({title: "Uh Oh!",   text: "Something went wrong. Go ahead and try again",   timer: 2000, type:"warning"});
                } else {
                    console.log("walker Availability Updated for " + tuesday);
                }
            });
        }
        if (wedStart!=="12:undefined:00" && wedEnd!=="12:undefined:00"){
            Meteor.call('SaveWalkerAvailability', wednesday, wednesday.split("-").join(""), militaryToMinutes(wedStart), militaryToMinutes(wedEnd), wedStart, wedEnd, wednesday + " " + wedStart, wednesday + " " + wedEnd, function (error, results) {
                if (error) {
                    sweetAlert({title: "Uh Oh!",   text: "Something went wrong. Go ahead and try again",   timer: 2000, type:"warning"});
                } else {
                    console.log("walker Availability Updated for " + wednesday);
                }
            });
        }
        if (thsStart!=="12:undefined:00" && thsEnd!=="12:undefined:00"){
            Meteor.call('SaveWalkerAvailability', thursday, thursday.split("-").join(""), militaryToMinutes(thsStart), militaryToMinutes(thsEnd), thsStart, thsEnd, thursday + " " + thsStart, thursday + " " + thsEnd, function (error, results) {
                if (error) {
                    sweetAlert({title: "Uh Oh!",   text: "Something went wrong. Go ahead and try again",   timer: 2000, type:"warning"});
                } else {
                    console.log("walker Availability Updated for " + thursday);
                }
            });
        }
        if (friStart!=="12:undefined:00" && friEnd!=="12:undefined:00"){
            Meteor.call('SaveWalkerAvailability', friday, friday.split("-").join(""), militaryToMinutes(friStart), militaryToMinutes(friEnd), friStart, friEnd, friday + " " + friStart, friday + " " + friEnd, function (error, results) {
                if (error) {
                    sweetAlert({title: "Uh Oh!",   text: "Something went wrong. Go ahead and try again",   timer: 2000, type:"warning"});
                } else {
                    console.log("walker Availability Updated for " + friday);
                }
            });
        }
        if (satStart!=="12:undefined:00" && satEnd!=="12:undefined:00"){
            Meteor.call('SaveWalkerAvailability', saturday, saturday.split("-").join(""), militaryToMinutes(satStart), militaryToMinutes(satEnd), satStart, satEnd, saturday + " " + satStart, saturday + " " + satEnd, function (error, results) {
                if (error) {
                    sweetAlert({title: "Uh Oh!",   text: "Something went wrong. Go ahead and try again",   timer: 2000, type:"warning"});
                } else {
                    console.log("walker Availability Updated for " + saturday);
                }
            });
        }
        if (sunStart!=="12:undefined:00" && sunEnd!=="12:undefined:00"){
            Meteor.call('SaveWalkerAvailability', sunday, sunday.split("-").join(""), militaryToMinutes(sunStart), militaryToMinutes(sunEnd), sunStart, sunEnd, sunday + " " + sunStart, sunday + " " + sunEnd, function (error, results) {
                if (error) {
                    sweetAlert({title: "Uh Oh!",   text: "Something went wrong. Go ahead and try again",   timer: 2000, type:"warning"});
                } else {
                    console.log("walker Availability Updated for " + sunday);
                }
            });
        }

        sweetAlert({title: "All Set!", text: "Your availability has been added", imageUrl: "img/successWalk.png" });
    }
});

