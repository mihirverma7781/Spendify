document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["total", "limit"], function (budget) {
    document.getElementById("total").innerText = budget.total;
    document.getElementById("limit").innerText = budget.limit;
  });

  let btn = document.getElementById("submit");
  btn.addEventListener("click", () => {
    chrome.storage.sync.get(["total", "limit"], (budget) => {
      let newTotal = 0;
      let newLimit = 1000;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }
      if (budget.limit == 0 || !budget.limit) {
        chrome.storage.sync.set({ limit: newLimit });
      }

      let amount = document.getElementById("amount").value;
      if (amount) {
        newTotal += parseInt(amount);
      }

      chrome.storage.sync.set({ total: newTotal }, () => {
        if (amount && newTotal >= budget.limit) {
          let notifOptions = {
            type: "basic",
            iconUrl: "icon48.png",
            title: "Limit reached",
            message: "Uh oh! Looks like you have reached your spending limit",
          };
          chrome.notifications.create("limitnotif", notifOptions);
        }
      });

      let totalSpengings = document.getElementById("total");
      totalSpengings.innerHTML = newTotal;
      document.getElementById("amount").value = "";
    });
  });
});
