import React, { useState, useEffect, useRef } from "react";
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
import { get, patch } from "apis/services";
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
  const [userImg, setUserImg] = useState(null);
  const ref = useRef(null);
  const { userId } = useAuthentication();

  useEffect(() => {
    if (userId) {
      get(`users/${userId}`).then(function ({ data }) {
        setUserImg(data.userImage);
      });
    }
    if (ref && !userImg) {
      ref.current.addFile(`data:image/jpeg;base64,${userImg}`);
    }
    if (files.length > 0) {
      patch(
        "users",
        { userImage: files[0].getFileEncodeBase64String() },
        userId
      );
    }
  }, [files, userId, userImg]);

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
        styleLoadIndicatorPosition="center"
        styleButtonRemoveItemPosition="center bottom"
        styleButtonProcessItemPosition="center"
        credits={false}
        acceptedFileTypes={["image/jpeg"]}
        maxFileSize="1MB"
      />
    </>
  );
}
