const EventSource = require("eventsource");
const sleep = require("then-sleep");
const { post, del } = require("../http-client");

module.exports = function Subscription({ pubUrl, subUrl }) {
  const subscriptions = [];
  const urls = new Set();

  const resolve = (url, path) => (path ? `${url}/${path}` : url);

  const publish = async (message, channel) => {
    const url = resolve(pubUrl, channel);
    urls.add(url);
    await sleep(50);
    return post(url, { json: message });
  };

  const subscribe = channel => {
    const url = resolve(subUrl, channel);
    const eventSource = new EventSource(url);
    subscriptions.push(eventSource);

    return eventSource;
  };

  const unsubscribeAll = async () => {
    subscriptions.forEach(s => s.close());
    await Promise.all(Array.from(urls).map(url => del(url)));
    await sleep(1000);
  };

  return { publish, subscribe, unsubscribeAll };
};
