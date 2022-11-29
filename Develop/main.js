let dateElement = $("#currentDay");

$(document).ready(function () {
    $(dateElement).text(moment().format("dddd, MMMM Do"));
    let loadedData = localStorage.getItem("textData");
    if(!loadedData){
        let scheduleModel = [
            {time: "9am", text: ""},
            {time: "10am", text: ""},
            {time: "11am", text: ""},
            {time: "12pm", text: ""},
            {time: "1pm", text: ""},
            {time: "2pm", text: ""},
            {time: "3pm", text: ""},
            {time: "4pm", text: ""},
            {time: "5pm", text: ""},
        ]
        localStorage.setItem("textData", scheduleModel);
    }
    $(".timeBlock").each(function () {
        let thisTime = $(this).attr('id');
        $(this).val(localStorage.getItem(thisTime))
    })
});