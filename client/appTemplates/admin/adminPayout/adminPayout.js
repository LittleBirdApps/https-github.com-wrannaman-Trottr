
Template.adminPayout.rendered = function() {
	Session.set("Navbar", "Users");
	$('document').ready(function() {
		$(window).scrollTop(0);
	});
    Meteor.call('getInvoices', function (e,r) {
        if (r) {
            Session.set('allInvoices',r);
        }
    })
};

Template.adminPayout.helpers({
   
    settings: function () {
        return {
            collection: Session.get('allInvoices'),
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: '_id', label: 'Id'},
                { key: 'clientName', label: 'Client'},
                { key: 'walkerName', label: 'walker'},
                { key: 'walkerId', label: 'walkerId', hidden: true},
                
                { key: 'stripe_payment_id', label: 'Stripe Id'},
                { key: 'actual_start', label: 'Start', sort: 1, fn: function (val, obj) {
                    return moment(val).format('MMM Do @ h:mm A');
                }},
                { key: 'actual_end', label: 'End', fn: function (val, obj) {
                    return moment(val).format('MMM Do @ h:mm A');
                }},
                { key: 'walkPic', label: 'Pic', tmpl: Template.adminWalkPic},
                { key: 'map_url', label: 'Track', tmpl: Template.adminWalkTrack},
                { key: 'paid', label: 'Paid'},
                { key: 'amount', label: 'Amount'},
                { key: 'amount', label: 'Transfer', fn: function (val, obj) {
                    var value = ((((Number(val)*.971)-.3)*.85)-.25); //  2.9% stripe take - $.30 stripe take * 15% our take + .- $.25 Stripe Transfer
                    return value.toFixed(2);
                }},
                { key: 'transfered', label: 'Transfer Status'},
                { key: 'transfer_id', label: 'Transfer Id'},
                { key: 'Pay', label: 'Pay', tmpl: Template.adminPay},
            ]
        };
    },
    selected: function () {
        return Session.equals("selected", this._id) ? "selected" : '';
    },
    users: function () {
        return Session.get('allUsers').length
    }
});

Template.adminPay.events({
    'click #pay': function (e,t) {
        //$('#pay').hide();
        // get recipient. 
        Meteor.setTimeout(function () {
            Meteor.call('getStripeRecipient',Session.get('details'), function (e,r) {
                if (r) {
                    Session.set('stripeRecipient', r);
                    console.log('stripe recipient: ' + r);
                }
            } )
        },800);

        Meteor.setTimeout(function () {
            if (!Session.get('details').transfer_id) {
                console.log(Session.get('details'));
                console.log(Session.get('stripeRecipient'));
                Meteor.call('transferMoney', Session.get('details'), Session.get('stripeRecipient'), function (e,r) {
                    if (e) {
                        sweetAlert({
                                    title: "Transfer Status:",
                                    type: "success",
                                    text: 'error'
                                });
                    }
                    if (r) {
                        sweetAlert({
                                    title: "Transfer Status:",
                                    type: "success",
                                    text: "pending",
                                    }, 
                                    function(){   
                                        Meteor.call('getInvoices', function (e,r) {
                                            if (r) {
                                                Session.set('allInvoices',r);
                                            }
                                        });
                                });
                        Session.set("TransferResult",r);
                    }
                } );
            } else {
                    sweetAlert({
                        title: "Transfer Status:",
                        type: "success",
                        text: "Already Transfered"
                    });
                }
        },1500);

        Meteor.setTimeout(function () {
            Meteor.call('getInvoices', function (e,r) {
                if (r) {
                    Session.set('allInvoices',r);
                }
            });
            $('#pay').show();
        },2500);
        
        
        // Meteor.setTimeout(function () {
        //     Meteor.call('updateTransfer', Session.get('details'), Session.get('TransferResult'), function (e,r) {
        //         if (r) {
        //             Meteor.call('getInvoices', function (e,r) {
        //                 if (r) {
        //                     Session.set('allInvoices',r);
        //                 }
        //             });
        //         }
        //     })
        // },1500);
    }
});

Template.adminPayout.events({
    'click .reactive-table tr': function () {
        var details = this;
        Session.set('details', details);
    },
    'click #pay': function (e,t) {
        //$('#pay').hide();
        // Meteor.setTimeout(function () {
        //     if (!Session.get('details').transfer_id) {
        //         console.log(Session.get('details'));
        //         Meteor.call('transferMoney',Session.get('details'), function (e,r) {
        //             if (e) {
        //                 sweetAlert({
        //                             title: "Transfer Status:",
        //                             type: "success",
        //                             text: 'error'
        //                         });
        //             }
        //             if (r) {
        //                 sweetAlert({
        //                             title: "Transfer Status:",
        //                             type: "success",
        //                             text: "pending",
        //                             }, 
        //                             function(){   
        //                                 Meteor.call('getInvoices', function (e,r) {
        //                                     if (r) {
        //                                         Session.set('allInvoices',r);
        //                                     }
        //                                 });
        //                         });
        //                 Session.set("TransferResult",r);
        //             }
        //         } );
        //     } else {
        //             sweetAlert({
        //                 title: "Transfer Status:",
        //                 type: "success",
        //                 text: "Already Transfered"
        //             });
        //         }
        // },600);

        // Meteor.setTimeout(function () {
        //     Meteor.call('getInvoices', function (e,r) {
        //         if (r) {
        //             Session.set('allInvoices',r);
        //         }
        //     });
        //     $('#pay').show();
        // },1500);
        
        // Meteor.setTimeout(function () {
        //     Meteor.call('updateTransfer', Session.get('details'), Session.get('TransferResult'), function (e,r) {
        //         if (r) {
        //             Meteor.call('getInvoices', function (e,r) {
        //                 if (r) {
        //                     Session.set('allInvoices',r);
        //                 }
        //             });
        //         }
        //     })
        // },1000);
        
    }
});

