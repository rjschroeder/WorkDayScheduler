//declare element that will contain the current day at the top of the page
let dateElement = $("#currentDay");

//jQuery function to run as soon as page loads
$(document).ready(function () {
    //sets the earlier declared element to display current date
    $(dateElement).text(moment().format("dddd, MMMM Do"));

    //try to load the saved data into a variable
    let loadedData = JSON.parse(window.localStorage.getItem("textDataWDS"));

    //if there is nothing saved, initiate a model of what the data will be saved in
    if(loadedData === null){
        loadedData = {
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
        //make sure to save at least one instance of this model
        window.localStorage.setItem("textDataWDS", JSON.stringify(loadedData));
    }

    //load the saved data into the time blocks
    $(".timeBlock").each(function () {
        //the key for the saved data will be equal to the element id
        let thisTime = $(this).attr("id");

        //sets the text of the text area child as the value from localstorage using the matching key
        $(`#${thisTime} .blockTextArea`).val(loadedData[thisTime]);
    });

    //saves the entered text when save button is clicked
    $(".blockSaveButton").on("click", function () {
        let enteredText = $(this).siblings(".blockTextArea").val();
        let thisTime = $(this).parent().attr("id");

        //again, uses keys and matching id's to save the correct text in the correct spot
        loadedData[thisTime] = enteredText;
        window.localStorage.setItem("textDataWDS", JSON.stringify(loadedData));
    })

    //interval function to update the time blocks every 10 seconds
    let interval = setInterval(() => {
        //gets current hour (0-23) from moment.js
        //this isnt good becuase the object reads in 12-hour time
        let currentHour = moment().hours();
        currentHour -= 5;
        $(".timeBlock").each(function () {
            let thisTime = $(this).attr("id");
            //if the block we are checking is a 1 digit am
            if(thisTime.length === 3 && thisTime[1] === "a") {
                thisTime = parseInt(thisTime[0]);
            //if the block we are checking is a 2 digit am(however, includes noon)
            } else if(thisTime.length === 4) {
                thisTime = parseInt(thisTime[0] + thisTime[1]);
            //if the block we are checking is a 1 digit pm
            //if so, adds 12 hours to match the hour of the day
            } else if (thisTime.length === 3 && thisTime[1] === "p") {
                thisTime = parseInt(thisTime[0]) + 12;
            }
            //assign classes based on wether or not current hour has passed each block
            if(thisTime < currentHour){
                $(this).addClass("past");
            } else if (thisTime === currentHour) {
                $(this).removeClass("past");
                $(this).addClass("present");
            } else if (thisTime > currentHour) {
                $(this).removeClass("past");
                $(this).removeClass("present")
                $(this).addClass("future");
            }
        })
    }, 10000)
});