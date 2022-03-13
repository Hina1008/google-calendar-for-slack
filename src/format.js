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

  getTodaySchedule(titleList, urlList, timeList){
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

  getExceptTodaySchedule(titleList){
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
      this.getTodaySchedule(titleList, urlList,timeList);
    }else{
      this.getExceptTodaySchedule(titleList);
    }
    console.log(this.message)
    return this.message;
  }
}