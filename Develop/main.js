let dateElement = $("#currentDay");

$(document).ready(function () {
    $(dateElement).text(moment().format("dddd, MMMM Do"));
    let loadedData = JSON.parse(window.localStorage.getItem("textDataWDS"));
    if(loadedData === null){
        let scheduleModel = {
            "9am": "",
            "10am": "",
            "11am": "",
            "12pm": "",
            "1pm": "",
            "2pm": "",
            "3pm": "",
            "4pm": "",
            "5pm": ""
        }
        window.localStorage.setItem("textDataWDS", JSON.stringify(scheduleModel));
    }

    $(".timeBlock").each(function () {
        let thisTime = $(this).attr("id");
        $(`#${thisTime} .blockTextArea`).val(loadedData[thisTime]);
    });

});