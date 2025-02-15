import axios from "axios";

import { successToast } from "components/Toasts/ToastHandler";
import { patch } from "apis/services";

export default (user, files, setRepeatRequest) => {
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
            successToast("Your profile picture was changed successfully!");
            setRepeatRequest(file.name);
          }
        })
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            error(thrown.message);
          } else {
            error("Failed to upload the picture.");
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
