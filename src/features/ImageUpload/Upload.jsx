import React, { useState, useEffect, useRef, useContext } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// import { patch } from "apis/services";
import { UserContext } from "contexts/UserContext";
// import { isObjectEmpty } from "utils/objects";

import "./upload.scss";
// import toDataURL from "./toDataURL";

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
  const ref = useRef(null);
  const { data: user } = useContext(UserContext);

  useEffect(() => {
    if (ref) {
      ref.current.addFile(user.userImage);
    }
    // if (!isObjectEmpty(user) && ref) {
    //   if (user.userImage.startsWith("https://")) {
    //     toDataURL(user.userImage, function (dataURL) {
    //       ref.current.addFile(dataURL);
    //     });
    //   }
    // }
    // if (files.length > 0) {
    //   patch(
    //     "users",
    //     { userImage: files[0].getFileEncodeBase64String() },
    //     userId
    //   );
    // }
  }, [user, ref]);

  return (
    <>
      <FilePond
        ref={ref}
        files={files}
        onupdatefiles={setFiles}
        name="userImage"
        labelIdle='Drag &amp; Drop your image or <span class="filepond--label-action">Browse</span>'
        imageCropAspectRatio="1:1"
        stylePanelLayout="compact circle"
        styleLoadIndicatorPosition="center bottom"
        styleButtonRemoveItemPosition="center bottom"
        styleButtonProcessItemPosition="center"
        credits={false}
        acceptedFileTypes={["image/jpeg"]}
        maxFileSize="1MB"
      />
    </>
  );
}

export default Upload;
