Template.proCalendarList.helpers({
   
    settings: function () {
        return {
            collection: Session.get('CalEventsAsWalker'),
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'eventDetails', label: 'Client'},
                { key: '_id', label: 'Event Id', hidden: true },
                { key: 'date', label: 'Walk Date', sort: 1, hidden:true },
                { key: 'start', label: 'Walk Date', sort: 1, fn: function (val, obj) {
                    // var start = CalEvents.findOne(Session.get('details')._id).start;
                    return moment(val).format('MMM Do @ h:mm A');
                }},
                { key: 'title', label: 'Event' },
                { key: 'walkerName', label: 'Walker', tmpl: Template.calendarAssign},
                //{ key: 'Edit', label: 'Edit', tmpl: Template.calendarListButton}
            ],
            rowClass: 'centeredText'
        };
    },
    selected: function () {
        return Session.equals("selected", this._id) ? "selected" : '';
    }
});

Template.proCalendarList.events({
    'click .reactive-table tr': function () {
        var details = this;
        Session.set('details', details);
    }
});

Template.proCalendarListButton.events({
    'click #editDetails': function () {
        var details = this;
        Session.set('details', details);
        $('#editModal').modal('show');
    }
});

Template.proCalendarListModal.helpers({
    detailsID: function() {
        return CalEvents.findOne(Session.get('details')._id)._id;
    },
    detailsTitle: function(){
        return CalEvents.findOne(Session.get('details')._id).title;
    },
    detailsStart: function () {
        return CalEvents.findOne(Session.get('details')._id).start;
    },
    detailsClient: function () {
        return CalEvents.findOne(Session.get('details')._id).client;
    }
});

Template.proCalendarList.rendered = function () {
    Session.set("proNavbar", "My Scheduled Walks");
    $('#walkOptions').selectize({
        create: true,
        sortField: 'text'
    });
    Meteor.call('CalEventsAsWalker', function (e, r) {
        if (e) {
            console.log(e);
        }
        if (r) {
            Session.set('CalEventsAsWalker',r);
        }
    });
};

Template.reactiveTable.rendered = function () {
    $('#walkOptions').selectize({
        create: true,
        sortField: 'text'
    });
};
