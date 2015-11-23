

Template.webSearch.rendered = function () {
	Session.set('webSearchDestroyed', false);
	Session.set('listType', 'All Walkers');
	autorunSearch = function () {
		if (Session.get('webSearchDestroyed')) {
			console.log('stopped');
			return;
		} else {
			Meteor.setTimeout(function(){
				console.log('running');
				if ($('.morphsearch-input').val() == "") {
	        		Meteor.call('ReturnAllWalkers', function (error, result) {
		        		if (error) {
		        			console.log(error);
		        		}
		        		if (result) {
		        			Session.set('WalkerResults', result);
		        			Session.set('listType', 'All Walkers');
		        		}
		        	});
    			}
    			autorunSearch();
			},1000);
		}
	}
	autorunSearch();
}

Template.webSearch.destroyed = function () {
	Session.set('webSearchDestroyed', true);
}

Template.webSearch.helpers({
	'listType': function () {
		return Session.get('listType');
	}
});

Template.webSearch.events({
    'click .morphsearch-close': function (e,t) {
             Router.go('/');
    },
    'submit .morphsearch-form': function (e,t) {
    	e.preventDefault();
    	var search = $('.morphsearch-input').val();
    	if ($('.morphsearch-input').val() == "") {
    		Meteor.call('ReturnAllWalkers', function (error, result) {
        		if (error) {
        			console.log(error);
        		}
        		if (result) {
        			Session.set('WalkerResults', result);
        			Session.set('listType', 'All Walkers');
        		}
        	});
    	} else {
        	Meteor.call('ReturnWalkersFromSearch', search, function (error, result) {
        		if (error) {
        			console.log(error);
        		}
        		if (result) {
        			Session.set('WalkerResults', result);
        			Session.set('listType', 'Search Results');
        		}
        	});
    	}
    }
});