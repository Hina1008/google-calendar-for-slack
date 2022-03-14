# Google CalendarをSlackへ投稿する

## Google Calendar(例)
![a](https://user-images.githubusercontent.com/40563830/158176557-66322d3b-e7ec-40be-a004-fd3ef97287eb.png)

## Slackへの投稿
![スクリーンショット 2022-03-14 22 05 27](https://user-images.githubusercontent.com/40563830/158177824-6f7d610a-76e1-482c-a497-dc7a83b922f7.png)


## 使用させていただいたアイコン
<a href="https://www.flaticon.com/free-icons/calendar" title="calendar icons">Calendar icons created by Maxim Basinski Premium - Flaticon</a>

# 使い方の説明

## Slack Appの作成
以下のURLへ移動し、 「Create New App」を選択

https://api.slack.com/apps/
![スクリーンショット 2022-03-14 22 40 32](https://user-images.githubusercontent.com/40563830/158184067-874d39fe-39cc-44cb-9596-561f600ad128.png)

OAuth & Permissons > Scopes > Bot Token Scopes　

以下を設定
- chat:write(messageを送るため)
- chat:write.customize(リッチテキスト、bot名を変更するため)
- chat:write(DMへ送る場合に追加)
![スクリーンショット 2022-03-14 22 41 02](https://user-images.githubusercontent.com/40563830/158184042-3fe00e04-2bd6-466c-9c24-734e989002a4.png)

設定後、InstallAppへ移動
Install to Workspaceを選択
![スクリーンショット 2022-03-14 22 53 51](https://user-images.githubusercontent.com/40563830/158186330-9d337175-b2c0-466d-8f6f-8ad27d51f8c7.png)

以上で、SlackAppが作成されます。

作成後、 Bot User OAuth Tokenが発行されるので、どこかに保存しておいてください。
![スクリーンショット 2022-03-14 22 52 34](https://user-images.githubusercontent.com/40563830/158186339-8c07360e-fa13-4346-874a-69c5396a51ec.png)

## git clone
`git clone https://github.com/Hina1008/google-calendar-for-slack`

## コンテナに入る

1.vscodeの場合
F1キー > Remote-Containers: Rebuild and Reopen in Container

2.コマンドの場合
`docker-compose exec gas bash`

## Google Accountと連携
以下のコマンドを入力して、Google Accountと連携する。

`node@cxxxxxxx:/home/gas$ clasp login`

以下のページが開かれるので、「許可」を選択する。
![スクリーンショット 2022-03-14 22 16 46](https://user-images.githubusercontent.com/40563830/158179553-653b6e8f-8910-4c0d-82d1-8819edbd2d86.png)

## Google App Scriptを作成
以下のコマンドを入力して、 Google Apps Scriptを作成する。

`node@cxxxxxxx:/home/gas$ clasp create --title [GAS_NAME] --type standalone`

### option
- title：　プロジェクト名
- type： プロジェクトの種類
  - デフォルトは、standalone(←使用)
  - spreadsheet, Document等があり、指定したものにアタッチしたプロジェクトが作成される。

## .clasp.jsonを修正
Google Accountと連携時に作成された`.clasp.json`を修正する。

デフォルト
```
{
    "scriptId":"xxxxxx999999",
    "rootDir":"/home/gas"
}
```

rootDirの値を `"/home/gas"`から`"/home/gas/src`に修正。
```
{
    "scriptId":"xxxxxx999999",
    "rootDir":"/home/gas/src"
}
```

## Google Apps Scriptにpush
以下のコマンドを使って、pushする。

`node@cxxxxxxx:/home/gas$ clasp push`

## Google Apps Scriptへ移動
Google Driveから移動 or `clasp open`コマンドを使用して、Google Apps Scriptを開く

## Propertiesを設定する
mainファイルの `setProperties`関数内の変数に値を代入する。
```
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
```

### SLACK_TOKEN
Slack Appを作成した際の　Token ID
![スクリーンショット 2022-03-14 22 52 34](https://user-images.githubusercontent.com/40563830/158186339-8c07360e-fa13-4346-874a-69c5396a51ec.png)
### SLACK_CHANNEL
投稿したいSLACKチャンネルのID
![スクリーンショット 2022-03-14 22 57 26](https://user-images.githubusercontent.com/40563830/158187140-bc2d7db1-1ea5-4acf-b37e-42950db34fd9.png)
### SCHEDULE_ID
読み込みたいカレンダーのID

https://calendar.google.com/calendar/　へ移動

設定 > マイカレンダーの設定 > 使用したいカレンダー選択 > カレンダーの統合
![スクリーンショット 2022-03-14 23 01 46](https://user-images.githubusercontent.com/40563830/158187956-e0e81260-4367-4d21-9859-24ca6c23cfbb.png)

### APP_NAME
アプリの名前(投稿者名)　下記画像の「スケジュール管理」部分
![スクリーンショット 2022-03-14 22 05 27](https://user-images.githubusercontent.com/40563830/158177824-6f7d610a-76e1-482c-a497-dc7a83b922f7.png)

## 実行
設定後、 `setProperties`関数を実行する。

## スケジュールの設定
トリガー > トリガーの設定

- 実行する関数： main
- イベントのソース：　時間主導型
- 時間ベースのトリガーのタイプ：　日付ベースタイマー
- 時刻：　自分の好きな時間
![スクリーンショット 2022-03-14 23 05 41](https://user-images.githubusercontent.com/40563830/158188715-7bc7e81a-fa9a-4c0f-8c0c-535ad7e2f975.png)

以上の設定後、保存を押すことで使用できる。

それでは、よきSlackライフを✋