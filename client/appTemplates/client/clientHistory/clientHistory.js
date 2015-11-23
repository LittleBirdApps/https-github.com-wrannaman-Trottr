Template.clientHistory.helpers({
    settings: function () {
        return {
            collection: Session.get('MyInvoices'),
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'walkerName', label: 'Walker' },
                { key: '_id',        label: 'Event Id', hidden: true },
                { key: 'date', label: 'Walk Date', sort: 1, fn: function (val, obj) {
                    // var start = CalEvents.findOne(Session.get('details')._id).start;
                    return moment(val).format('MMM Do @ h:mm A');
                }},
                { key: 'amount',     label: 'Amount', tmpl: Template.amountFormat },
                { key: 'paid',       label: "Paid?", hidden:true },
                { key: 'Edit',       label: 'Pay', tmpl: Template.clientInvoiceButton}
            ]
        };
    },
    selected: function () {
        return Session.equals("selected", this._id) ? "selected" : '';
    }
});


Template.clientHistory.events({
    'click .reactive-table tr': function () {
      
            var details = this;
            Session.set('InvoiceDetails', details);
            //Router.go('/clientInvoice');
       
        
    }
});

Template.clientInvoiceButton.events({
    'click #Pay': function () {
        Meteor.setTimeout(function () {
            if (Session.get('InvoiceDetails').paid == true || Session.get('InvoiceDetails').paid == "Yes") {
                sweetAlert({
                    title: "Already Paid",
                    type: "info",
                    text: "You have already paid this invoice"
                });
             } else {
                Router.go('/clientInvoice');
            }
        },500);
        
    }
});
Template.clientInvoiceButton.helpers({
    'paid': function () {
        if (this.paid == true || this.paid == "Yes") {
            return true
        } else {
            return false
        }
    }
});

Template.clientHistory.rendered = function () {
    Session.set("Navbar", "Invoices");
    $('html').css('height', '100%');
    $('body').css('height', '100%');
    $('th').css('text-align', 'center');
    Meteor.call('Invoice', function (error, result) {
        if (error) {
            console.log(error);
        }
        if (result) {
            Session.set('MyInvoices', result);
        }
    });
}