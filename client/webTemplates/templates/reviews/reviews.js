
    Template.reviews.rendered = function () {

        $('tbody').css('text-align', 'left');
        Meteor.call('Reviews', Session.get("SelectedWalkerId"), function (error, result) {
            if (error) {
                return error
            }
            if (result) {
                Session.set('Reviews', result);
            }
        });
    }

    Template.reviews.events({
        'click .morphsearch-close': function () {
            Router.go('/webSearch');
        }
    });

    Template.reviews.helpers({
    Reviews: function () {
        

        var walkersSession = Session.get('Reviews');;
        console.log(walkersSession);
        var walkerArray = [];

        for (var i=0; i<walkersSession.length; i++) {
            walkerArray.push({
                "rating": walkersSession[i].rating,
                "review": walkersSession[i].review,
                "reviewer_name": walkersSession[i].reviewer_name,
                "walker_id": walkersSession[i].walker_id,
                "format_date": walkersSession[i].format_date
            });

        }

        return walkerArray;


    },
    settings: function () {
        return {
            collection: Reviews,
            rowsPerPage: 10,
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

