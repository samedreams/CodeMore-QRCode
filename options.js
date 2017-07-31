var check = document.querySelector('input');

function setBrowserAction (isBlack) {
  chrome.browserAction.setIcon({
    path: isBlack ? 'icon/icon-black.png' : 'icon/icon.png'
  });

  chrome.browserAction.setTitle({
    title: isBlack ? 'Not That CodeMore QRCode' : 'CodeMore QRCode'
  });
}

check.onchange = function () {
  if (this.checked) {
      chrome.notifications.create(
          'autoMission' ,
          {
              type    : "basic",
              iconUrl : "icon/icon.png",
              title   : "CodeMore 提醒您",
              message : "已经保存",
          }
          );
    alert('好吧，已保存！');
  } else {
      chrome.notifications.create(
          'autoMission' ,
          {
              type    : "basic",
              iconUrl : "icon/icon.png",
              title   : "CodeMore 提醒您",
              message : "已经保存😀",
          }
          );
    alert('已保存，(♥◠‿◠)');
  }

  chrome.storage.sync.set({
    isBlack: this.checked
  });

  setBrowserAction(this.checked);

  chrome.tabs.getCurrent(function (tab) {
    chrome.tabs.remove(tab.id);
  });
};

chrome.storage.sync.get(function (options) {
  check.checked = !!options && options.isBlack;

  setBrowserAction(check.checked);
});
