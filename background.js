chrome.webNavigation.onCompleted.addListener((details) => {
    console.log(details)
    // chrome.notifications.create({
    //   type: 'basic',
    //   iconUrl: 'icon.png',
    //   title: 'page loaded',
    //   message:
    //     'Completed loading: ' +
    //     details.url +
    //     ' at ' +
    //     details.timeStamp +
    //     ' milliseconds since the epoch.'
    // });
  });