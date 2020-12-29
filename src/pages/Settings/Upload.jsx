import React, { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";

import { useAuthentication } from "authentication/useAuthentication";
import { patch } from "apis/services";
import "./upload.scss";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

export default function Upload() {
  const [files, setFiles] = useState([]);
  const { userId } = useAuthentication();
  useEffect(() => {
    if (files.length > 0)
      patch(
        "users",
        { userImage: files[0].getFileEncodeBase64String() },
        userId
      );
  }, [files, userId]);

  return (
    <>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        name="userImage"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        imageCropAspectRatio="1:1"
        stylePanelLayout="compact circle"
        // styleLoadIndicatorPosition="center bottom"
        // styleButtonRemoveItemPosition="center bottom"
        styleButtonProcessItemPosition="center bottom"
        credits={false}
        acceptedFileTypes={["image/jpeg"]}
        maxFileSize="1MB"
      />
    </>
  );
}
