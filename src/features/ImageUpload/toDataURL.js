import axios from "axios";

async function toDataURL(url, callback) {
  await axios
    .get(url, {
      responseType: "blob",
    })
    .then((res) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(res.data);
    });
}

export default toDataURL;
