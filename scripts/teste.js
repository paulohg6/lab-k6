import http from "k6/http";
import { Counter } from "k6/metrics";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { URL } from "https://jslib.k6.io/url/1.0.0/index.js";

const jokes = require("../data/initialDate.json");
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

let finalDatFile = open("../data/finalDate.json");
let startDatFile = open("../data/finalDate.json");
let brandsFile = open("../data/appkey.json");
let brands = JSON.parse(brandsFile);
let finDate = JSON.parse(finalDatFile);
let startDate = JSON.parse(startDatFile);


export const options = {
  stages: [
    { duration: "2m", target: 5 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0"], // http errors should be less than 0%
    http_req_duration: ["p(95)<10000"], // 95% of requests should be below 10s
  },
};

export const requests = new Counter("http_reqs");
export default function () {
  let randomBrand = Math.floor(Math.random() * 6)-1;
  let randomDate = Math.floor(Math.random() * 100); 
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
  };

  const url = new URL();

  url.searchParams.append("dsada", "weqwewqe");
  // url.searchParams.append('skip_available', 'true');
  console.log(url.toString());
  const res = http.get(url.toString(), params);
  console.log("resposta: " + res.body);
}
