document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("limit", (budget) => {
    document.getElementById("limit").value = budget.limit;
  });
  let savelimitbtn = document.getElementById("savelimit");
  savelimitbtn.addEventListener("click", () => {
    let limit = document.getElementById("limit").value;
    if (limit && limit != 0) {
      chrome.storage.sync.set({ limit: limit }, () => {
        close();
      });
    } else {
      let notifOptions = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Invalid limit",
        message: "Uh oh! Looks like you have entered invalid limit!",
      };
      chrome.notifications.create("limitinvalidnotif", notifOptions);
    }
  });

  let reset = document.getElementById("reset");
  reset.addEventListener("click", () => {
    chrome.storage.sync.set({ total: 0 });
    document.getElementById("success").innerHTML = `
    <div id = "dialog" style="background-color:green; position :absolute; right:20px; top:20px; padding:2rem; border-radius:1rem; color:white; font-size:1rem; font-weight:semibold">
    Reset done successfully !
    <span id="close" style = "color:white; font-weight:bold; position: relative; top:-20px; right:-20px; cursor:pointer;" > x </span>

    </div>
    `;
    let closepop = document.getElementById("close");
    closepop.addEventListener("click", () => {
      document.getElementById("dialog").remove();
      close();
    });
  });
});
