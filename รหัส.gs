function myFunction() {
  var calendar_id = CalendarApp.getCalendarById("ใส่รหัสปฏิทิน");//รหัสปฏิทิน
  var notify_token = "ใส่ LINE Notify Generate access token";//LINE Notify Generate access token
  var url = "https://notify-api.line.me/api/notify";

  var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  var event = calendar_id.getEventsForDay(today);
  var msg = "";
  if (event.length === 0) {
    msg = "วันนี้คุณไม่มีกิจกรรมที่บันทึกไว้";
  }
  else {
    var date = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy")//แสดงวันที่ปัจจุบัน
    msg += "\n" + "วันที่ " + date;
    msg += "\n" + "วันนี้มีทั้งหมด " + String(event.length) + " กิจกรรม\n\n";
    msg += sendMessage(event);
  }
  var jsonData = {
    message: msg
  }
  var options =
  {
    "method": "post",
    "contentType": "application/x-www-form-urlencoded",
    "payload": jsonData,
    "headers": { "Authorization": "Bearer " + notify_token }
  };
  var res = UrlFetchApp.fetch(url, options);
}

function sendMessage(events) {
  //รายละเอียดการใช้งาน 
  //https://developers.google.com/apps-script/reference/calendar
  var msg = "";
  events.forEach(function (event, index) {
    var title = event.getTitle();//Gets the title of the event.
    var description = event.getDescription(); //Gets the description of the event.
    var start = event.getStartTime().getHours() + ":" + ("0" + event.getStartTime().getMinutes()).slice(-2);
    var end = event.getEndTime().getHours() + ":" + ("0" + event.getEndTime().getMinutes()).slice(-2);
    if (event.isAllDayEvent()) {
      msg += String(index + 1) + ") " +
        "เวลา : " + " ทั้งวัน" + "\n" +
        "เรื่อง : " + title + "\n" +
        "คำอธิบาย : " + description +
        "\n\n";
      return;
    }
    msg += String(index + 1) + ") " +
      "เวลา : " + start + " - " + end + " น." + "\n" +
      "เรื่อง : " + title + "\n" +
      "คำอธิบาย : " + description +
      "\n\n";
  });
  return msg;
}
