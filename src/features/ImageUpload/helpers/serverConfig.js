import axios from "axios";

import { warnToast } from "components/Toasts/ToastHandler";
import { toast } from "react-toastify";
import { patch } from "apis/services";

export default (user, files) => {
  return {
    process: (
      fieldName,
      file,
      metadata,
      load,
      error,
      progress,
      abort,
      transfer,
      options
    ) => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      patch(
        "users",
        {
          userImage: files[0].getFileEncodeBase64String(),
        },
        user.id,
        {
          cancelToken: source.token,
          onUploadProgress: (e) => {
            progress(e.lengthComputable, e.loaded, e.total);
          },
        }
      )
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            load();
            toast.success("Your picture was uploaded successfully!");
          }
        })
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            error(thrown.message);
          } else {
            error("Failed to upload the image");
            warnToast("Failed to upload the image");
          }
        });
      return {
        abort: () => {
          source.cancel("Operation canceled by the user.");
        },
      };
    },
    revert: null,
    load: null,
    fetch: null,
    restore: null,
    remove: null,
  };
};
