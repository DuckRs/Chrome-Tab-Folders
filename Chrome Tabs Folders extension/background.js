// background.js

// When the sort button is clicked, sort the tabs into folders.
document.getElementById('sort-button').addEventListener('click', sortTabs);

function sortTabs() {
  // Get the open tabs.
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    // Create an object to store the folders.
    const folders = {};

    // Iterate through the tabs and classify them based on their URLs.
    tabs.forEach(function(tab) {
      const url = new URL(tab.url);
      const hostname = url.hostname;

      // If the hostname is not already a key in the folders object, create a new folder for it.
      if (!folders[hostname]) {
        folders[hostname] = [];
      }

      // Add the tab to the appropriate folder.
      folders[hostname].push(tab);
    });

    // Create the folders in the bookmarks bar.
    for (const hostname in folders) {
		chrome.bookmarks.create({ title: hostname }, function(folder) {
  // Move the tabs into the new folder.
  folders[hostname].forEach(function(tab) {
    chrome.bookmarks.create({ parentId: folder.id, title: tab.title, url: tab.url });
  });
});