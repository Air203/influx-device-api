# 📊 InfluxDB Data Crawler

This project allows you to query data from **InfluxDB** using Node.js and display either device lists or data from specific measurements.

## 📁 Project Structure

```
project-root/
│
├── index.js               # Main entry file
├── _device.js             # Contains functions to query InfluxDB
├── .env                   # InfluxDB connection info
└── package.json           # (Auto-generated after `npm init`)
```

---

we login the influxdb UI by the VPN, the url is http://34.124.128.60:8086
user: neuron
password: read .env file
you can login in and apply for a read-only key.

---

## ⚙️ 1. Requirements

### 📦 Install Node.js

You need Node.js (>= v14). Download from: https://nodejs.org

### 📥 Install Required Libraries

Run the following commands in your terminal:

```bash
npm init -y
npm install @influxdata/influxdb-client dotenv
```

---

## 📁 2. Configure `.env`

Create a `.env` file in the root directory and add your connection info:

```env
INFLUX_URL=https://us-west-2-1.aws.cloud2.influxdata.com
INFLUX_TOKEN=your_token_here
INFLUX_ORG=your_org_id
INFLUX_BUCKET=your_bucket_name
```

> 🔵 **Note:** Replace the values of `your_token_here`, `your_org_id`, and `your_bucket_name` with your actual InfluxDB account and project credentials.

---

## 🧠 3. File Contents

### 📄 `_device.js`

Contains the `getDevices()` function used to query data from specific fields in InfluxDB.

> 🟣 **Example Query:**

```js
const fluxQuery = `from(bucket: "${INFLUX_BUCKET}")
  |> range(start: time(v: 2025-07-08T00:00:00.000Z))
  |> filter(fn: (r) => r._measurement == "mp_calculation_usage_daily_3000045" and r.buildingName == "Nhà máy Nedspice" and r.equipmentName == "24E124468E395083")
`;
```

---

### 📄 `index.js`

> 🟢 **This is the main file where you call the function from `_device.js` to display queried data.**

---

## 🚀 4. Run the Program

After configuration, run the following:

```bash
node index.js
```

You will see the data from InfluxDB printed to the console.

> 🟡 **Example Output:**

```json
{
  "result": "_result",
  "table": 0,
  "_start": "2025-07-08T00:00:00Z",
  "_stop": "2025-08-07T07:09:47.514603031Z",
  "_time": "2025-08-06T16:00:00Z",
  "_value": 6.28564453125,
  "_field": "_value",
  "_measurement": "mp_calculation_usage_daily_3000045",
  "buildingName": "Nhà máy Nedspice",
  "equipmentName": "24E124468E395083",
  "functionType": "EPI"
}
```

---

## 📌 Notes

- If you encounter the error:

```bash
Cannot use import statement outside a module
```

Add `"type": "module"` to your `package.json`:

```json
{
  "type": "module"
}
```
