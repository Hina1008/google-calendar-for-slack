class FormatMessage{
  constructor() {
    this.message = [];
  }

  getSection(section){
    return {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": section
      }
    };
  }

  getFirstTime(titleList, urlList, timeList){
    for(var i = 0; i< titleList.length; i++){
      this.message.push({"blocks":[{
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "<" + urlList[i] + "|*" + titleList[i] + "*>"
        }
      },{
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": timeList[i]
        }
      }]});
    }
  }

  getOtherTime(titleList){
    var fields = [];
    titleList.forEach(title => {
      fields.push({
        "type": "plain_text",
				"text": title
      })
    });
    this.message = [
      {
        "blocks":[
          {
            "type": "section",
            "fields": fields
          }
        ]
      }
    ]
  }

  getSchedule(titleList, urlList, timeList, i){
    if(titleList.length == 0){
      this.message.push({"blocks":[{
        "type": "section",
			  "text": {
				  "type": "mrkdwn",
				  "text": "予定なし"
			  }
      }]});
    }else if(i == 0){
      this.getFirstTime(titleList, urlList,timeList);
    }else{
      this.getOtherTime(titleList);
    }
    console.log(this.message)
    return this.message;
  }

  getTime(timeList){
    this.time = [];
    timeList.forEach(time => {
      this.time.push({
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": time
        }
      });
    });
    return this.time;
  }
}