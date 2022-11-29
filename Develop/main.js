let dateElement = $('#currentDay');

$(document).ready(function () {
    $(dateElement).text(moment().format("dddd, MMMM Do"))
});