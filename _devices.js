// import "dotenv/config";
// import { InfluxDB } from "@influxdata/influxdb-client";

// const INFLUX_ORG = process.env.INFLUX_ORG;
// const INFLUX_BUCKET = process.env.INFLUX_BUCKET_AUTH;
// const influxdb = new InfluxDB({
//   url: process.env.INFLUX_URL,
//   token: process.env.INFLUX_TOKEN,
// });

// export async function getDevices() {
//   const queryApi = influxdb.getQueryApi(INFLUX_ORG);

//   const fluxQuery = `
//     from(bucket: "${INFLUX_BUCKET}")
//       |> range(start: -30d)
//       |> filter(fn: (r) => r._measurement == "mp_calculation_esg_daily_3000045")
//       |> sort(columns: ["_time"])
//   `;

//   const allData = [];

//   return new Promise((resolve, reject) => {
//     queryApi.queryRows(fluxQuery, {
//       next(row, tableMeta) {
//         const o = tableMeta.toObject(row);
//         allData.push({
//           time: o._time,
//           room: o.room,
//           field: o._field,
//           value: o._value,
//         });
//       },
//       error(err) {
//         reject(err);
//       },
//       complete() {
//         resolve(allData);
//       },
//     });
//   });
// }



import "dotenv/config";
import { InfluxDB } from "@influxdata/influxdb-client";

const INFLUX_ORG = process.env.INFLUX_ORG;
const INFLUX_BUCKET = process.env.INFLUX_BUCKET_AUTH;
const influxdb = new InfluxDB({
  url: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN,
});

export async function getDevices() {
  const queryApi = influxdb.getQueryApi(INFLUX_ORG);

  const fluxQuery = `
    from(bucket: "${INFLUX_BUCKET}")
      |> range(start: -30d)
      |> filter(fn: (r) => r._measurement == "mp_calculation_usage_daily_3000045" and r.buildingName == "Nhà máy Nedspice" and r.equipmentName == "24E124468E395083")
      |> sort(columns: ["_time"])
  `;

  const allData = [];

  return new Promise((resolve, reject) => {
    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        allData.push(o); // ✅ Lưu toàn bộ object
      },
      error(err) {
        reject(err);
      },
      complete() {
        resolve(allData);
      },
    });
  });
}
