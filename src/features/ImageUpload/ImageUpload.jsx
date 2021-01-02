import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import Cropper from "react-easy-crop";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { UserContext } from "contexts/UserContext";
import Button from "components/button/Button";
import { errorToast } from "components/Toasts/ToastHandler";

import "./imageUpload.scss";
import b64toBlob from "./helpers/b64toBlob";
import serverConfig from "./helpers/serverConfig";
import getCroppedImg from "./helpers/cropImage";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageTransform,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

function Upload() {
  const [files, setFiles] = useState([]);
  const [imageB64, setImageB64] = useState(null);
  const [imageAdded, setImageAdded] = useState(false);
  const { data: user, setRepeatRequest } = useContext(UserContext);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const pondRef = useRef(null);
  const config = serverConfig(user, files, setRepeatRequest);

  useEffect(() => {
    if (user.userImage) {
      if (user.userImage.startsWith("https://")) {
        fetch(user.userImage)
          .then((res) => res.blob())
          .then((blob) => {
            setFiles([{ source: blob, options: { type: "local" } }]);
          });
      } else {
        const blob = b64toBlob(user.userImage, "image/jpeg");
        setFiles([{ source: blob, options: { type: "local" } }]);
      }
    }
  }, [user.userImage]);

  useEffect(() => {
    if (files.length > 0 && files[0].getFileEncodeBase64String?.())
      setImageB64(files[0].getFileEncodeBase64String());
  }, [files, imageB64]);

  const onCropComplete = useCallback((croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const addCroppedImage = useCallback(() => {
    const croppedImage = getCroppedImg(imageB64, croppedAreaPixels);
    pondRef.current.addFile(croppedImage);
  }, [croppedAreaPixels, imageB64]);

  const handleButtonConfirm = () => {
    setImageAdded(false);
    addCroppedImage();
  };

  const handleButtonCancel = () => {
    setImageAdded(false);
  };

  if (user) {
    return (
      <>
        <FilePond
          ref={pondRef}
          files={files}
          onupdatefiles={setFiles}
          onactivatefile={() => setImageAdded(true)}
          server={config}
          onerror={(error) =>
            error?.body ? errorToast(error.body) : errorToast(error.main)
          }
          name="userImage"
          labelIdle='<br>Drag &amp; Drop your image or <span class="filepond--label-action">Browse</span><br><br>max 150KB'
          imageCropAspectRatio="1:1"
          stylePanelLayout="compact circle"
          styleButtonRemoveItemPosition="bottom center"
          styleButtonProcessItemPosition="bottom left"
          styleLoadIndicatorPosition="center"
          styleProgressIndicatorPosition="bottom left"
          credits={false}
          acceptedFileTypes={["image/jpeg"]}
          maxFileSize="150KB"
          instantUpload={false}
        />
        {imageAdded && (
          <div className="crop-container">
            <Cropper
              image={`data:image/jpeg;base64,${imageB64}`}
              cropShape={"round"}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <Button handleClick={handleButtonConfirm}>Confirm crop</Button>
            <Button handleClick={handleButtonCancel}>Cancel</Button>
            <span className="crop-container__label">
              Use your mouse or your fingers to zoom in/out
            </span>
          </div>
        )}
      </>
    );
  } else return null;
}

export default Upload;
