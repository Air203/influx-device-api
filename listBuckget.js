const http = require("http");

function listBuckets() {
  const options = {
    hostname: "localhost",
    port: 8086,
    path: "/api/v2/buckets",
    method: "GET",
    headers: {
      Authorization:
        "Token FmeSxeHeOz0opNzrI1kAfUSChy8SRJHG8716BFQs2Ncgk8fnc-DfcY-rSsY9iQnbY5l5Lx0snloHTRY8fshxbw==",
      "Content-Type": "application/json",
    },
  };

  const req = http.request(options, (res) => {
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        const parsed = JSON.parse(rawData);
        console.log(parsed);
      } catch (e) {
        console.error("Error parsing response:", e);
      }
    });
  });

  req.on("error", (err) => {
    console.error("Request error:", err);
  });

  req.end();
}

listBuckets();
