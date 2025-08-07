import { getDevices } from './_devices.js'; // đường dẫn đúng với file bạn vừa gửi

const run = async () => {
  try {
    const data = await getDevices();
    if (data.length === 0) {
      console.log("⚠️ Không có dữ liệu nào được tìm thấy.");
    } else {
      console.log("✅ Dữ liệu truy vấn từ InfluxDB:");
      console.log(JSON.stringify(data, null, 2)); // In đẹp
      console.log("Total data queried: ", data.length);
    }
  } catch (err) {
    console.error("❌ Lỗi khi truy vấn InfluxDB:", err.message || err);
  }
};

run();
