Template.clientCalendarList.helpers({
    settings: function () {
        return {
            collection: Session.get('MyCalEvents'),
            rowsPerPage: 10,
            showFilter: false,
            fields: [
                { key: 'walkerName', label: 'Walker'},
                { key: '_id', label: 'Event Id', hidden: true },
                { key: 'date', label: 'Walk Date', sort: 1, hidden:true },
                { key: 'start', label: 'Walk Date', sort: 1, fn: function (val, obj) {
                    // var start = CalEvents.findOne(Session.get('details')._id).start;
                    return moment(val).format('MMM Do @ h:mm A');
                }},
                { key: 'title', label: 'Event' },
                { key: 'amount', label: 'Cost'},
                { key: 'Edit', label: 'Delete', tmpl: Template.clientCalendarDeleteButton}
            ]
        };
    },
    selected: function () {
        return Session.equals("selected", this._id) ? "selected" : '';
    }
});

Template.clientCalendarList.events({
    'click .reactive-table tr': function () {
        var details = this;
        Session.set('details', details);
    }
});

Template.clientCalendarDeleteButton.events({
    'click #delete': function () {
        
        sweetAlert({   
            title: "Delete this walk?",   
            text: "Are you sure you want to delete this walk?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#eb6a5a",  
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false }, 
            function () {  
                var details = Session.get('details');
                console.log(details._id); 
                    Meteor.call('RemoveCalEvent',details._id,function (error, results) {return});
                    sweetAlert({
                        title: "Deleted!", 
                        text: "Your walk has been deleted", 
                        type: "success",
                        timer: 1000
                    });
                    Meteor.call('MyCalEvents', function (e, r) {
                        if (e) {
                            console.log(e);
                        }
                        if (r) {
                            Session.set('MyCalEvents',r);
                        }
                    });   
            }
        );
    }
});



Template.clientCalendarList.rendered = function () {
    Session.set("Navbar", "Calendar Events");
    $('#walkOptions').selectize({
        create: true,
        sortField: 'text'
    });
    $('th').css('text-align', 'center');
    $('tr').css('text-align', 'center');
    Meteor.setTimeout(function () {
        $('th').css('text-align', 'center');
        $('tr').css('text-align', 'center');
    },500);
    Meteor.call('MyCalEvents', function (e, r) {
        if (e) {
            console.log(e);
        }
        if (r) {
            Session.set('MyCalEvents',r);
        }
    });
};

Template.reactiveTable.rendered = function () {
    $('#walkOptions').selectize({
        create: true,
        sortField: 'text'
    });
    $('th').css('text-align', 'center');
    $('tr').css('text-align', 'center');
};
