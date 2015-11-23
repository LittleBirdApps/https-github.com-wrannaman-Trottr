Template.walkerCalendarList.rendered = function () {
    Session.set("Navbar", "My Schedule");
    $('th').css('text-align', 'center');
    $('tr').css('text-align', 'center');
    Meteor.setTimeout(function() {
        $('th').css('text-align', 'center');
        $('tr').css('text-align', 'center');
    },400);
    Meteor.call('CalEventsAsWalker', function (e, r) {
        if (e) {
            console.log(e);
        }
        if (r) {
            Session.set('CalEventsAsWalker',r);
        }
    });
}
Template.walkerCalendarList.helpers({
   
    settings: function () {
        return {
            collection: Session.get('CalEventsAsWalker'),
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'eventDetails', label: 'Client'},
                { key: '_id', label: 'Event Id', hidden: true },
                { key: 'date', label: 'Walk Date', sort: 1, hidden: true},
                { key: 'start', label: 'Walk Date', sort: 1, fn: function (val, obj) {
                    // var start = CalEvents.findOne(Session.get('details')._id).start;
                    return moment(val).format('MMM Do @ h:mm A');
                }},
                { key: 'title', label: 'Event' },
                //{ key: 'walkerName', label: 'Assigned To:'},
               // { key: 'Start', label: 'Start', tmpl: Template.walkerCalendarListButton}
            ]
        };
    },
    selected: function () {
        return Session.equals("selected", this._id) ? "selected" : '';
    }
});

Template.walkerCalendarList.events({
    'click .reactive-table tr': function () {
        var details = this;
        Session.set('details', details);
        Router.go('/walkerStart');
    }
});

Template.walkerCalendarListButton.events({
    'click #startWalk': function () {
       Router.go('/walkerStart');
    }
});

