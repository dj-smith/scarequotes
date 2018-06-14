function reset(){
    chrome.storage.sync.set({"rate": default_rate});
}

function saveOptions(e) {
  var rate = $('#rate');
  chrome.storage.sync.set({"rate": rate,});
}

$(document).ready(function() {
  $("#save").on('click', saveOptions);

  $("#reset").on('click', reset)

  $("#options").on('input', saveOptions);
});
