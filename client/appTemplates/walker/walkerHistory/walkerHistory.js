Template.walkerHistory.helpers({
    settings: function () {
        return {
            collection: Session.get('MyInvoices'),
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'clientName', label: 'Name'},
                { key: '_id', label: 'Event Id', hidden: true },
                { key: 'actual_start', label: 'Walk Date', sort: 1, fn: function (val, obj) {
                    // var start = CalEvents.findOne(Session.get('details')._id).start;
                    return moment(val).format('MMM Do @ h:mm A');
                }},
                { key: 'amount', label: 'Amount' },
                { key: 'paid', label: 'Paid'},
                //{ key: 'assignedWalker', label: 'Assigned To:', tmpl: Template.calendarAssign},
                //{ key: 'Edit', label: 'Edit', tmpl: Template.calendarListButton}
            ]
        };
    },
    selected: function () {
        return Session.equals("selected", this._id) ? "selected" : '';
    }
});

Template.walkerHistory.rendered = function () {
    Session.set("Navbar", "History");
    $('html').css('height', '100%');
    $('body').css('height', '100%');

    Meteor.call('Invoice', function (error, result) {
        if (error) {
            console.log(e);
        }
        if (result) {
            Session.set('MyInvoices', result);
        }
    });
  
}