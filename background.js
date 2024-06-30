chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: './screen_capture.html' })
})