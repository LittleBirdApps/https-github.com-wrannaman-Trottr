Template.proEmployee.rendered = function () {
  Session.set("proNavbar", "Employees");
};

Template.proEmployee.helpers({
    employees: function () {
        Meteor.call('MyEmployees', function (error, result) {
          Session.set("MyEmployees", result);
        });
        return Session.get("MyEmployees");
    },
    settings: function () {
        return {
            collection: Session.get("MyEmployees"),
            rowsPerPage: 10,
            showFilter: false,
            fields: [
                { key: 'name', label: 'Employee'},
                { key: 'email', label: 'Email'},
                { key: 'delete', label: 'Delete', tmpl:Template.proEmployeeDeleteButton},
                { key: 'view', label: 'View', tmpl: Template.ProEmployeeViewButton}
            ]
        };
    },
    selected: function () {
        return Session.equals("selected", this._id) ? "selected" : '';
    }
});

Template.proEmployee.events({
    'click #addEmployee': function () {
      var email = $('#email').val();
      Meteor.call('findEmployee', email, function (e, r) {
        Session.set("Employee", r[0]);
        if (r) {
          Meteor.call("AddEmployee", r[0]._id, r[0].email, r[0].name, function (e,r){
            if (r) {
              Session.set("MyEmployees", r);
              $('#proEmployeeModal').modal('hide');
              console.log("Employee Set")
            }
          })
        }
        if (e) {
          alert(e)
        }
        console.log(r[0]);
        console.log("************************");
      })
    },

    'click #showModal': function () {
        $('#proEmployeeModal').modal('show');
    },
    'click .reactive-table tr': function () {
        var details = this;
        Session.set('details', details);
        console.log(this);
    },
    'click #delete': function () {
      console.log("removing employee");
      var details = this;
      Session.set('details', details);
      console.log(Session.get('details')._id);
      Meteor.setTimeout(function() {
          Meteor.call('RemoveEmployee', Session.get('details')._id, function (e,r){
            if (r) {
              Session.set("MyEmployees", r);
            }
          });
      }, 300); 
    },
    'click #viewEmployee': function () {
      Session.set("SelectedWalkerId", this.employee);
      Meteor.call("WalkerNameAboutRadius", this.employee, function (e,r) {
        console.log(r[0]);
        console.log(r[0].name);
        console.log(r[0].about_me);
        Session.set('SelectedWalkerName', r[0].name);
        Session.set('SelectedWalkerAbout', r[0].about_me);
        Session.set('SelectedWalkerPhone', r[0].phoneNum);
        Session.set('SelectedWalkerPic', r[0].pic);
      });
    }
});



