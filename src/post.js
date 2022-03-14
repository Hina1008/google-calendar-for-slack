class Slack{
  constructor(body) {
    this.body = body;
  }

  post(token, channelId, userName){
    var payload = {
      "token" : token,
      "channel": channelId,
      "username": userName,
      "attachments": this.body
    }

    console.log(payload["attachments"]);
    var params = {
      "method" : "POST",
      "payload": payload
    }

    const response = UrlFetchApp.fetch("https://slack.com/api/chat.postMessage", params);
  }
  
}