import "dotenv/config";
import { InfluxDB, Point } from "@influxdata/influxdb-client";

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET_AUTH;

const influxDB = new InfluxDB({ url, token });
const writeApi = influxDB.getWriteApi(org, bucket);

const nowNs = Date.now() * 1_000_000; // kiểu number

// Ghi dữ liệu JSON (ví dụ: dữ liệu từ cảm biến)
const jsonData = [
  {
    room: "Kitchen",
    temp: 23.8,
    hum: 41.5,
    co: 2,
    time: nowNs,
  },
  {
    room: "Living Room",
    temp: 24.3,
    hum: 42.1,
    co: 3,
    time: nowNs,
  },
];

for (const entry of jsonData) {
  const point = new Point("home") // measurement name
    .tag("room", entry.room)
    .floatField("temp", entry.temp)
    .floatField("hum", entry.hum)
    .intField("co", entry.co)
    point.timestamp(entry.time);

  writeApi.writePoint(point);
  console.log("📝 Writing point:", point.toLineProtocol());
}

writeApi
  .close()
  .then(() => {
    console.log("✅ Dữ liệu đã được ghi vào InfluxDB.");
  })
  .catch((e) => {
    console.error("❌ Lỗi ghi dữ liệu:", e);
  });
