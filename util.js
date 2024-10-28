header = {}

function AjaxGet(url, header = {}, callBack) {
  return $.ajax({
    url: url,
    dataType: "json",
    type: "GET",
    contentType: 'application/json',
    "headers": header,
    success: function (data, textStatus, xhr) {
      return callBack("success", data); // return callBack() with data
    },
    error: function (xhr, textStatus, errorThrown) {
      return callBack("error", ""); // return callBack() with error
    },
  });
}


function AjaxPost(url, header = {}, userdata = {}, callBack) {
  return $.ajax({
    url: url,
    dataType: "json",
    type: "POST",
    contentType: 'application/json',
    "headers": header,
    data: JSON.stringify(userdata),
    success: function (data, textStatus, xhr) {
      return callBack("success", data); // return callBack() with data
    },
    error: function (xhr, textStatus, errorThrown) {
      return callBack("error", errorThrown); // return callBack() with error
    },
  });
}

