var scheduleId = "shota.bamitonton@gmail.com";
var days = 1;
dates = [];
var date = (i) => {
    var today = new Date();
    today.setDate(today.getDate() + i);
    return today;
  };
for (var i = 0; i < days; i++) {
  dates.push(date(i));
}


function main() {
  var schedules = [];
  console.log(dates)
  dates.forEach(date => {
    var schedule = new Schedule(scheduleId, date);
    schedules.push(schedule);
  })

  var num=0;
  var message = []
  schedules.forEach(schedule =>{
    var formatMessage = new FormatMessage();
    message.push({"blocks":[formatMessage.getSection(schedule.getDate())]});
    formatMessage.getSchedule(schedule.getTitle(), schedule.getUrl(), schedule.getTime(), num).forEach(t =>{
      message.push(t);
    })
    num++;
  })

  var slack = new Slack(JSON.stringify(message));
  slack.post("xoxb-2093132894290-3230557254722-U7cHRlWKYVWYwRfzWl47eic3", "C02E4TZE5JL", "今日の予定")
}