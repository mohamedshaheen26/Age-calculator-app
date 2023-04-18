let form = document.getElementById("form");

form.addEventListener("submit", calcAge);

function calcAge(e) {
  e.preventDefault();

  let day = document.getElementById("day"),
    month = document.getElementById("month"),
    year = document.getElementById("year"),
    yearResult = document.querySelector(".year"),
    monthResult = document.querySelector(".month"),
    dayResult = document.querySelector(".day");

  let currentDate = new Date(),
    currentDay = currentDate.getDate(),
    currentMonth = 1 + currentDate.getMonth(),
    currentYear = currentDate.getFullYear(),
    months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day.value != "") {
    if (day.value <= 31) {
      success(day);
      if (day.value > currentDay) {
        currentDay = currentDay + months[currentMonth - 1];
        currentMonth = currentMonth - 1;
      }
    } else {
      errorMsg(day, "Must be a valid day");
    }
  } else {
    errorMsg(day, "This field is required");
  }

  if (month.value != "") {
    if (month.value <= 12) {
      success(month);
      if (month.value > currentMonth) {
        currentMonth = currentMonth + 12;
        currentYear = currentYear - 1;
      }
    } else {
      errorMsg(month, "Must be a valid month");
    }
  } else {
    errorMsg(month, "This field is required");
  }

  if (year.value != "") {
    if (year.value > currentYear || year.value < 1000) {
      errorMsg(year, "Must be in the past");
    } else {
      success(year);
    }
  } else {
    errorMsg(year, "This field is required");
  }

  if (
    day.value <= 31 &&
    month.value <= 12 &&
    year.value < 2023 &&
    day.value !== "" &&
    month.value !== "" &&
    year.value !== ""
  ) {
    let d = currentDay - day.value;
    let m = currentMonth - month.value;
    let y = currentYear - year.value;
    dayResult.innerHTML = d;
    monthResult.innerHTML = m;
    yearResult.innerHTML = y;
  } else {
    dayResult.innerHTML = "- -";
    monthResult.innerHTML = "- -";
    yearResult.innerHTML = "- -";
  }
}

function errorMsg(req, message) {
  req.className = "error";
  let formControl = req.parentElement;
  let span = formControl.querySelector("span");
  let label = formControl.querySelector("label");
  label.style.color = "hsl(0, 100%, 67%)";
  span.className = "error-text";
  span.innerText = message;
}

function success(req) {
  req.className = "success";
  let formControl = req.parentElement;
  let span = formControl.querySelector("span");
  let label = formControl.querySelector("label");
  label.style.color = "black";
  span.innerText = "";
}
