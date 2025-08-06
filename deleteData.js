// import "dotenv/config";
// import { InfluxDB } from "@influxdata/influxdb-client";
// import { DeleteAPI } from "@influxdata/influxdb-client-apis";

// const influxDB = new InfluxDB({
//   url: process.env.INFLUX_URL,
//   token: process.env.INFLUX_TOKEN,
// });

// const deleteAPI = new DeleteAPI(influxDB);

// const org = process.env.INFLUX_ORG;
// const bucket = process.env.INFLUX_BUCKET_AUTH;

// const start = "2024-01-01T00:00:00Z";
// const stop = new Date().toISOString();
// const predicate = '_measurement="car"';

// async function deleteCarData() {
//   try {
//     await deleteAPI.postDelete({
//       org,
//       bucket,
//       body: { start, stop, predicate },
//     });
//     console.log("✅ Dữ liệu measurement 'car' đã bị xoá.");
//   } catch (err) {
//     console.error("❌ Lỗi khi xoá:", err);
//   }
// }

// deleteCarData();

import "dotenv/config";
import fetch from "node-fetch";

const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET_AUTH;
const token = process.env.INFLUX_TOKEN;
const url = process.env.INFLUX_URL;

async function deleteMeasurement(measurement) {
  const response = await fetch(
    `${url}/api/v2/delete?org=${org}&bucket=${bucket}`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: "1970-01-01T00:00:00Z",
        stop: "2100-01-01T00:00:00Z",
        predicate: `_measurement="${measurement}"`,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("❌ Lỗi xóa dữ liệu:", err);
  } else {
    console.log(`✅ Đã xóa measurement "${measurement}"`);
  }
}

deleteMeasurement("home");
