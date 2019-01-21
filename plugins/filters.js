import { parse } from "url"; // вроде deprecated parse(url).hostname
// import { URL } from "url"; // или это deprecated new Url(url).hostname, ругался линтер, поэтому я просто выключил это правило
import Vue from "vue";
import { distanceInWordsToNow } from "date-fns";

Vue.filter("timeSince", timestamp => {
  const time = Number(timestamp) * 1000;
  return distanceInWordsToNow(time);
});

// Vue.filter("hostname", url => parse(url).hostname); // www.jacobinmag.com and jacobinmag.com

Vue.filter("hostname", url => parse(url).hostname.replace(/^www\./, "")); // only jacobinmag.com
