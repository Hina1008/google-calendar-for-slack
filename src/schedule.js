class Schedule{
    constructor(calendarId, date) {
        this.calendarId = CalendarApp.getCalendarById(calendarId);
        this.date = date;
        this.events = this.calendarId.getEventsForDay(date);
      }

    setTitle(){
      this.titles = this.events.map(event => event.getTitle());
    }

    getTitle(){
      this.setTitle()
      return this.titles;
    }

    setUrl(){
      this.url = this.events.map(event => 
                                  "https://www.google.com/calendar/event?eid=" +
                                  Utilities.base64Encode(event.getId().split('@')[0] +
                                  " " + 
                                  event.getOriginalCalendarId())
                                  .replace(/\=/g, '')
                                );
    }

    getUrl(){
      this.setUrl();
      return this.url;
    }

    formatTime(date){
      var hours = ("0" + date.getHours()).slice(-2);
      var minutes = ("0" + date.getMinutes()).slice(-2);
      return hours + ":" + minutes;
    }

    setStartTime(){
      this.startTime = this.events.map(event => this.formatTime(event.getStartTime()));
    }

    getStartTime(){
      this.setStartTime();
      return this.startTime;
    }
    setEndTime(){
      this.endTime = this.events.map(event => this.formatTime(event.getEndTime()));
    }

    getEndTime(){
      this.setEndTime();
      return this.endTime;
    }

    setTime(){
      this.setStartTime();
      this.setEndTime();
      this.time = [];
      for(var i = 0; i < this.startTime.length; i++){
        this.time.push("from " + this.startTime[i] + " to " + this.endTime[i])
      }
    }

    getTime(){
      this.setTime();
      return this.time;
    }

    getDate(){
      const YOUBI = ["日", "月", "火", "水", "木", "金", "土"];
      return Utilities.formatDate(this.date, "JST", "MM月dd日(" + YOUBI[this.date.getDay()] + ")の予定");
    }

    setName(){
      this.name = this.calendarId.getName();
    }

    getName(){
      this.setName();
      return this.name;
    }

}