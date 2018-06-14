// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var default_rate = 0.10;

function injectionScript(tabId, info, tab) {
  chrome.storage.sync.get(null, function (result) {
    if (result && result["status"] === "enabled") {
      chrome.tabs.executeScript(tabId,
        {
          file: "scarequotes.js",
          runAt: "document_end"
        },
        function() {
          if (debug) { console.log('Script Executed');}
        });
    }
  });
}

function addMessage(request, sender, sendResponse) {
  chrome.storage.sync.get(null, function(result) {
    if (request === "config" && result["rate"]) {
      sendResponse(result["rate"]);
    }
  });
  return true;
}

function toggleActive() {
  chrome.storage.sync.get("status", function(result) {
    if (result["status"] === null) {
      status = "enabled";
    } else {
      status = result["status"];
    }
    if (status === "enabled") {
      icon = {
        "path": "images/disabled.png"
      };
      message = {
        "title": "enable scare quotes"
      };
      status = "disabled";
    } else if (status === "disabled") {
      icon = {
        "path": "images/enabled.png"
      };
      message = {
        "title": "disable scare quotes"
      };
      status = "enabled";
    }
    chrome.browserAction.setIcon(icon);
    chrome.browserAction.setTitle(message);
    chrome.storage.sync.set({
      "status": status
    });
  });
}

function fixDataCorruption() {
  chrome.storage.sync.get(null, function(result) {
    if (!result["status"]) {
      chrome.storage.sync.set({"status": "enabled"});
    }
    if (!result["rate"]) {
      chrome.storage.sync.set({"rate": default_rate});
    }
  });
}

chrome.browserAction.onClicked.addListener(toggleActive);
chrome.runtime.onMessage.addListener(addMessage);
chrome.tabs.onUpdated.addListener(injectionScript);
chrome.runtime.onInstalled.addListener(fixDataCorruption);
chrome.runtime.onStartup.addListener(fixDataCorruption);
