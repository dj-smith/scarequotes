chrome.runtime.sendMessage("config", function(response) {
  "use strict";

  var substitute = (function() {
      "use strict";
      var rate;
      rate = response;
      return function(node, words) {
        var i;
        for (i = 0; i < words.length; i += 1) {
          var quoted;
          quoted = "\"" + words[i] + "\"";
          node.nodeValue = node.nodeValue.replace(words[i], quoted);
        }
      };

    })();

    var node, iter;
    var iter = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);

    while ((node = iter.nextNode())) {
      var rate, result, wordArray;
      rate = response;
      wordArray = node.nodeValue.match(/\S+/g) || []
      if (wordArray.length <= 1) {
        continue;
      }
      result = [];

      while (Math.random() <= rate) {
        var index = Math.floor(Math.random() * wordArray.length);
        result.push(wordArray[index])
      }
      substitute(node, result);
    }
});
