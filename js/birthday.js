// configure age
Date.daysBetween = function (date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
}
const birthday = new Date(2000, 8, 18);
const today = new Date();
const days_between = Date.daysBetween(birthday, today);
if (today.getMonth() == 8 && today.getDate() == 18) {
    document.getElementById('birthday-info').classList.remove('text-muted');
    document.getElementById('birthday-info').classList.add('text-dark');
    document.getElementById('years-old').innerHTML = "It's my birthday! <i class='em em-confetti_ball'></i>";
}
else {
    const years = days_between / 365;
    document.getElementById('years-old').innerText = years.toFixed(2) + " years old";
}