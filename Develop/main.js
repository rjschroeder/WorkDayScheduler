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

    $(".blockSaveButton").on("click", function () {
        let enteredText = $(this).siblings(".blockTextArea").val();
        let thisTime = $(this).parent().attr("id");
        loadedData[thisTime] = enteredText;
        window.localStorage.setItem("textDataWDS", JSON.stringify(loadedData));
    })

    let interval = setInterval(() => {
        let currentHour = moment().hours();
        $(".timeBlock").each(function () {
            let thisTime = $(this).attr("id");
            if(thisTime.length === 3 && thisTime[1] === "a") {
                thisTime = parseInt(thisTime[0]);
            } else if(thisTime.length === 4) {
                thisTime = parseInt(thisTime[0] + thisTime[1]);
            } else if (thisTime.length === 3 && thisTime[1] === "p") {
                thisTime = parseInt(thisTime[0]) + 12;
            }
            console.log("moment hour: "+ currentHour + "  this hour: " + thisTime);
            if(thisTime < currentHour){
                $(this).addClass("past");
            } else if (thisTime === currentHour) {
                $(this).removeClass("past");
                $(this).addClass("present");
            } else if (this.time > currentHour) {
                $(this).removeClass("past");
                $(this).removeClass("present")
                $(this).addClass("future");
            }
        })
    }, 1000)

});