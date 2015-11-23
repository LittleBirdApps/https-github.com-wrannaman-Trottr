
Template.adminHome.rendered = function() {
	Session.set("Navbar", "Users");
	$('document').ready(function() {
		$(window).scrollTop(0);
	});
    Meteor.call('getUsers', function (e,r) {
        if (r) {
            Session.set('allUsers',r);
        }
    })
    Session.set('roleCounter',1);
};

Template.adminHome.helpers({
   
    settings: function () {
        return {
            collection: Session.get('allUsers'),
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: '_id', label: 'Id'},
                { key: 'firstName', label: 'First'},
                { key: 'lastName', label: 'Last'},
                { key: 'address', label: 'Addy'},
                { key: 'createdAt', label: 'Created', sort: 1, fn: function (val, obj) {
                    return moment(val).format('MMM Do @ h:mm A');
                }},
                { key: 'email', label: 'Email'},
                { key: 'phoneNum', label: 'Phone'},
                { key: 'roles', label: 'Role'},
                //{ key: 'roles', label: 'Role', tmpl: Template.adminRoles},
                { key: 'about_me', label: 'About'},
                { key: 'walkRadius', label: 'Radius'},
                { key: 'employee', label: 'Employee'},
                { key: 'pic', label: 'Pic', tmpl: Template.adminPic},
                { key: 'Change', label: 'Change', tmpl: Template.adminSave},
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

Template.adminHome.events({
    'click .reactive-table tr': function () {
        var details = this;
        Session.set('details', details);
    },
    'click #save': function (e,t) {
        Meteor.setTimeout(function () {
            var role;
            if (Session.get('roleCounter') == 1) {
                role = "client";
            }
            if (Session.get('roleCounter') == 2) {
                role = "walker";
            }
            if (Session.get('roleCounter') == 3) {
                role = "pro";
            }
            console.log(role);
            console.log(Session.get('details'));
            Meteor.call('changeUser', Session.get('details'), role, function (e,r) {
                if (r) {
                    Meteor.call('getUsers', function (e,r) {
                        if (r) {
                            Session.set('allUsers',r);
                            sweetAlert({
                                title: "User Role Changed to " + role,
                                type: "success",
                                text: "updated",
                                timer: 1000
                            });
                            if (Session.get('roleCounter') >= 3) {
                                Session.set('roleCounter', 1 );
                            } else {
                                Session.set('roleCounter', Session.get('roleCounter') + 1 );
                            }
                        }
                    })
                }
            })
        },300);
        
    },
    'blur input': function () {
        var details = this;
        Session.set('role', details.roles);
        //alert(details);
        console.log(details);
    },
});

