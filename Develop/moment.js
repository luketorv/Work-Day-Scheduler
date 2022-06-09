// updates time on the webpage
function updateTime() {
    let today = moment();

    //resets page
    $("#clearDay").on("click", function(){
        localStorage.clear();
        initPage()
      }) 

    // shows time from moment.js in header
    $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm.ss"));

    // for loop for past, present future
    let now = moment().format("kk");
    for (let i = 0; i < scheduleElArray.length; i++) {
        scheduleElArray[i].removeClass("future past present");
        if (now > scheduleElArray[i].data("hour")) {
            scheduleElArray[i].addClass("past");
        } else if (now === scheduleElArray[i].attr("data-hour")) {
            scheduleElArray[i].addClass("present");
        } else {
            scheduleElArray[i].addClass("future");
        }
    }
}

// textarea elements
let saveBttn = $(".save-icon");
let containerEl = $(".container");
let schedule9am = $("#9am");
let schedule10am = $("#10am");
let schedule11am = $("#11am");
let schedule12pm = $("#12pm");
let schedule1pm = $("#1pm");
let schedule2pm = $("#2pm");
let schedule3pm = $("#3pm");
let schedule4pm = $("#4pm");
let schedule5pm = $("#5pn");

let scheduleElArray = [
    schedule9am,
    schedule10am,
    schedule11am,
    schedule12pm,
    schedule1pm,
    schedule2pm,
    schedule3pm,
    schedule4pm,
    schedule5pm,
];

renderLastRegistered();
updateTime();
setInterval(updateTime, 1000); 

// render schedule saved in local storage
function renderLastRegistered() {
    for (let el of scheduleElArray) {
        el.val(localStorage.getItem("time block " + el.data("hour")));

    }
}


// function for handling clicks
function onClick(event) {
    event.preventDefault();

    let btnClicked = $(event.currentTarget);

    let targetText = btnClicked.siblings("textarea");
 
    let targetTimeBlock = targetText.data("hour");

    localStorage.setItem("time block " +  targetTimeBlock, targetText.val());
}

saveBttn.on("click", onClick);