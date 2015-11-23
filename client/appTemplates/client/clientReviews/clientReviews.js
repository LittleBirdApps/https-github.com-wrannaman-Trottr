
    Template.clientReviews.rendered = function () {
        $('html').css('height', '100%');
        $('body').css('height', '100%');
        $('tbody').css('text-align', 'left');
        $('tbody').css('word-break','break-word');
        Session.set("Navbar", "Reviews");
        Meteor.call('Reviews', Session.get("SelectedWalkerId"), function (error, result) {
            if (error) {
                return error
            }
            if (result) {
                Session.set('Reviews', result);
            }
        });
    }

    Template.clientReviews.events({
        'click .morphsearch-close': function () {
            Router.go('/webSearch');
        }
    });

    Template.clientReviews.helpers({
    Reviews: function () {
        return Session.get('Reviews');
    },
    settings: function () {
        return {
            collection: Reviews,
            rowsPerPage: 5,
            showFilter: false,
            fields: [
                { key: 'date', label: 'Date', sort:-1, hidden: true},
                { key: 'format_date', label: 'Review Date'},
                { key: 'reviewer_name', label: 'Reviewer'},
                // format date is in format moment().format("MMM Do YY");
                { key: 'review', label: 'Review' },
                { key: 'rating', label: 'Rating' },
            ]
        };
    },
    selected: function () {
        return Session.equals("selected", this._id) ? "selected" : '';
    }
});

