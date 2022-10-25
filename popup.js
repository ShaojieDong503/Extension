const empty = document.getElementById("empty");
const cont = document.getElementById("continue");
const cancel = document.getElementById("cancel");
const check = document.getElementById("check");
const start = document.getElementById("start");
empty.addEventListener("click", () => {
    start.style.display = "none";
    check.style.display = "block"
})
cancel.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.storage.local.set({cont_work: "no"}, function() {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['sites/emptyGroup.js'],
        })
        })

        start.style.display = "block";
        check.style.display = "none";
});

cont.addEventListener("click", async () => {
    
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.storage.local.set({cont_work: "yes"}, function() {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['sites/emptyGroup.js'],
        })
      });
    
})