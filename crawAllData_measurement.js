import { InfluxDB } from "@influxdata/influxdb-client";
import * as dotenv from "dotenv";

dotenv.config();

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET_AUTH;

const influxDB = new InfluxDB({ url, token });

const queryApi = influxDB.getQueryApi(org);

const fluxQuery = `
  from(bucket: "${bucket}")
    |> range(start: 0)
    |> filter(fn: (r) => r._measurement == "home")
    |> sort(columns: ["_time"])
`;

const result = {};

queryApi.queryRows(fluxQuery, {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row);
    const time = o._time;
    const room = o.room;
    const field = o._field;
    const value = o._value;

    if (!result[time]) result[time] = {};
    if (!result[time][room]) result[time][room] = {};

    result[time][room][field] = value;
  },
  error(err) {
    console.error("❌ Query failed", err);
  },
  complete() {
    console.log("✅ Kết quả truy vấn:");
    console.log(JSON.stringify(result, null, 2));
  },
});
