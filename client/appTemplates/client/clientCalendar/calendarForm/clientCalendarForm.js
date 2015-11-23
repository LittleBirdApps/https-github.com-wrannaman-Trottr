Template.clientCalendarForm.rendered = function () {
            $('body').addClass('loaded');
        $('.toggle').click(function(e){
                e.preventDefault();
                $('body').toggleClass('loaded');
            }
        );
};

Template.clientCalendarForm.events({
    'click #addEvent': function(evt) {
        evt.preventDefault();
        $('#scheduleModal').modal('show');

    }
});
