let contextMenuItem = {
  id: "spendMoney",
  title: "SpendMoney",
  contexts: ["selection"], // event that context will work
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
    if (Number.isInteger(parseInt(clickData.selectionText))) {
      chrome.storage.sync.get(["limit", "total"], (budget) => {
        let newTotal = 0;
        if (budget.total) {
          newTotal += parseInt(budget.total);
        }
        newTotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({ total: newTotal }, () => {
          if (newTotal >= budget.limit) {
            let notifOptions = {
              type: "basic",
              iconUrl: "icon48.png",
              title: "Limit reached",
              message: "Uh oh! Looks like you have reached your spending limit",
            };
            chrome.notifications.create("limitnotif", notifOptions);
          }
        });
      });
    }
  }
});

chrome.storage.onChanged.addListener((changes, storageName) => {
  chrome.browserAction.setBadgeText({
    text: changes.total.newValue.toString(),
  });
});
