import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { patch } from "apis/services";
import { UserContext } from "contexts/UserContext";

import "./upload.scss";
import b64toBlob from "./b64toBlob";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

function Upload() {
  const [files, setFiles] = useState([]);
  const { data: user } = useContext(UserContext);

  useEffect(() => {
    if (user.userImage) {
      if (user.userImage.startsWith("https://")) {
        setFiles([{ source: user.userImage, options: { type: "local" } }]);
      } else {
        const blob = b64toBlob(user.userImage, "image/jpeg");
        setFiles([{ source: blob, options: { type: "local" } }]);
      }
    }
  }, [user.userImage]);

  const serverConfig = {
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
      // related to aborting the request
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
          headers: { "Content-Type": "application/json" },
          onUploadProgress: (e) => {
            // updating progress indicator
            progress(e.lengthComputable, e.loaded, e.total);
          },
        }
      )
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // the load method accepts either a string (id) or an object
            load();
          }
        })
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            // console.log("Request canceled", thrown.message);
          } else {
            error("Failed to upload the image");
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

  if (user) {
    return (
      <>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          server={serverConfig}
          name="userImage"
          labelIdle='Drag &amp; Drop your image or <span class="filepond--label-action">Browse</span>'
          imageCropAspectRatio="1:1"
          stylePanelAspectRatio="1:1"
          stylePanelLayout="compact circle"
          styleButtonRemoveItemPosition="bottom center"
          styleButtonProcessItemPosition="bottom left"
          styleLoadIndicatorPosition="center"
          styleProgressIndicatorPosition="bottom left"
          credits={false}
          acceptedFileTypes={["image/jpeg"]}
          maxFileSize="100KB"
          instantUpload={false}
        />
      </>
    );
  } else return null;
}

export default Upload;
