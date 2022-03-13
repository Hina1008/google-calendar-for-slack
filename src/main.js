var PROP = PropertiesService.getScriptProperties().getProperties();
var scheduleId = PROP.SCHEDULE_ID;
// 表示させたい予定の日数
var days = 2;

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
  slack.post(PROP.SLACK_TOKEN, PROP.SLACK_CHANNEL, PROP.APP_NAME)
}

// 隠したい変数を代入
function setProperties(){
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperties({
    "SLACK_TOKEN": "xoxb-",
    "SLACK_CHANNEL": "CHANNEL_ID",
    "SCHEDULE_ID": "SCHEDULE_ID",
    "APP_NAME": "スケジュール管理"
  })
}