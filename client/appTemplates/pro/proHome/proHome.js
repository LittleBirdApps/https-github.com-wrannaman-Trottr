

Template.proHome.rendered = function () {
	Session.set("ProConfigured", Meteor.user().configured);
	Session.set("proNavbar", "Home");
	 // sessions. 
	// [].slice.call( document.querySelectorAll('a[href="#"') ).forEach( function(el) {
   //            el.addEventListener( 'click', function(ev) { ev.preventDefault(); } );
  //        } );
	
}
Template.proHome.helpers({
	configured: function () {
		return Session.get("ProConfigured");
	}
});

Template.revenue.rendered = function() {
  drawRevenue();
}
Template.clients.rendered = function() {
  drawClients();
}
Template.walks.rendered = function () {
	drawWalks();
}
Template.newClients.rendered = function () {
	drawNewClients();
}
Template.avgReview.rendered = function () {
	drawAvgReview();
}

function drawRevenue(){
  var data = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
        fillColor : "rgba(2235,106,90,0.7)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [3265,3359,3390,3181,3526,3525,3410]
    }
    ]
  }

  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#revenue").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Line(data);
}

function drawClients(){
  var data = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
        fillColor : "rgba(2235,106,90,0.7)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [25,27,29,31,35,35,34]
    }
    ]
  }

  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#clients").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Line(data);
}

function drawWalks(){
  var data = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
        fillColor : "rgba(2235,106,90,0.7)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [65,66,64,63,57,59,72]
    }
    ]
  }

  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#walks").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Line(data);
}

function drawNewClients(){
  var data = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
        fillColor : "rgba(2235,106,90,0.7)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [65,66,64,63,57,59,72]
    }
    ]
  }

  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#newClients").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Bar(data,{ 
  	scaleBeginAtZero: false
  });
}

function drawAvgReview(){
  var data = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
        fillColor : "rgba(2235,106,90,0.7)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [5,4.5,4,4.4,4.5,5,3]
    }
    ]
  }

  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#avgReview").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Bar(data, { 
  	scaleBeginAtZero: false
  });
}




