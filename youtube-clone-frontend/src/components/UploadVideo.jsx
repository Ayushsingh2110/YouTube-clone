import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { postToServer } from "../utils/fetchFromAPI";
import { storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { LinearProgress, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Label = styled.label`
  font-size: 14px;
`;

const UploadVideo = ({ setOpen }) => {
  const [VideoInputs, setVideoInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [VideoThumbnail, setVideoThumbnail] = useState(undefined);
  const [VideoFile, setVideoFile] = useState(undefined);
  const [ThumbnailStoreName, setThumbnailStoreName] = useState(null);
  const [VideoStoreName, setVideoStoreName] = useState(null);
  const [Video_upload_percentage, setVideo_upload_percentage] =
    useState(undefined);
  const [Thumbnail_upload_percentage, setThumbnail_upload_percentage] =
    useState(undefined);

  const navigate = useNavigate();

  function deleteVideoFile(fileStoreName) {
    const VideoRef = ref(storage, `video/${fileStoreName}`);

    deleteObject(VideoRef)
      .then(() => {
        console.log("Video deleted from Firebase storage!");
      })
      .catch((error) => {
        console.log("Video not deleted from Firebase storage!");
      });
    setVideo_upload_percentage(undefined);
  }

  function deleteThumbnail(fileStoreName) {
    const imageRef = ref(storage, `thumbnail/${fileStoreName}`);

    deleteObject(imageRef)
      .then(() => {
        console.log("Thumbnail deleted from Firebase storage!");
      })
      .catch((error) => {
        console.log("Thumbnail not deleted from Firebase storage!");
      });
    setThumbnail_upload_percentage(undefined);
  }

  const closeUploadPage = () => {
    setOpen(false);
    if (VideoStoreName) {
      deleteVideoFile(VideoStoreName);
    }

    if (ThumbnailStoreName) {
      deleteThumbnail(ThumbnailStoreName);
    }
  };

  const handleInput = (e) => {
    setVideoInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(`videoInput:; ${{ ...VideoInputs }}`);
    console.log(`tags:; ${tags}`);
    try {
      const res = await postToServer("video/addVideo", {
        ...VideoInputs,
        tags,
      });
      setOpen(false);

      res.status === 200 && navigate(`/video/${res._id}`);
    } catch (error) {
      console.log("Upload failed");
    }
  };

  const removeVideo = (e) => {
    e.preventDefault();
    if (VideoStoreName) {
      deleteVideoFile(VideoStoreName);
    }
  };

  const removeThumbnail = (e) => {
    e.preventDefault();
    if (ThumbnailStoreName) {
      deleteThumbnail(ThumbnailStoreName);
    }
  };

  const videoUploadRef = useRef();
  const thumbnailUploadRef = useRef();

  async function uploadFile(file, type) {
    if (file.name !== undefined) {
      const fileName = new Date().getTime() + file.name;
      let storageRef;
      if (type === "thumbnail") {
        storageRef = ref(storage, `thumbnail/${fileName}`);
        setThumbnailStoreName(fileName);
        thumbnailUploadRef.current = uploadBytesResumable(storageRef, file);
      } else {
        storageRef = ref(storage, `video/${fileName}`);
        setVideoStoreName(fileName);
        videoUploadRef.current = uploadBytesResumable(storageRef, file);
      }
    }

    if (videoUploadRef.current) {
      const upload = videoUploadRef.current;
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setVideo_upload_percentage(Math.round(progress));
          switch (snapshot.state) {
            case "paused":
              console.log("Video Upload is paused");
              break;
            case "running":
              console.log("Video Upload is running");
              break;
            case "cancel":
              console.log("video Upload is cancelled");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
            setVideoInputs((prev) => {
              return { ...prev, videoUrl: downloadURL };
            });
          });
        }
      );
    }
    if (thumbnailUploadRef.current) {
      const upload = thumbnailUploadRef.current;
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setThumbnail_upload_percentage(Math.round(progress));
          switch (snapshot.state) {
            case "paused":
              console.log("Image Upload is paused");
              break;
            case "running":
              console.log("image Upload is running");
              break;
            case "cancel":
              console.log("image Upload is cancelled");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
            setVideoInputs((prev) => {
              return { ...prev, imgUrl: downloadURL };
            });
          });
        }
      );
    }
  }

  const handleCancelClick = (type) => {
    if (type === "video" && videoUploadRef) {
      videoUploadRef.current.cancel();
      setVideo_upload_percentage(undefined);
      setVideoFile(undefined);
    } else if (type === "thumbnail" && thumbnailUploadRef) {
      thumbnailUploadRef.current.cancel();
      setThumbnail_upload_percentage(undefined);
      setVideoThumbnail(undefined);
    }
  };

  useEffect(() => {
    if (VideoFile) {
      uploadFile(VideoFile, "video");
    }
  }, [VideoFile]);

  useEffect(() => {
    if (VideoThumbnail) {
      uploadFile(VideoThumbnail, "thumbnail");
    }
  }, [VideoThumbnail]);

  return (
    <div className="upload_container">
      <div className="upload_wrapper">
        <div
          className="upload_page_close_btn"
          onClick={() => closeUploadPage()}
        >
          <CloseIcon />
        </div>
        <h1>Add new video</h1>
        <Label>Video:</Label>
        {Video_upload_percentage > 0 ? (
          <Box
            sx={{
              px: "10px",
              py: "10px",
              border: "1px solid grey",
              borderRadius: "0.5rem",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: "9",
                gap: "1px",
              }}
            >
              <Typography sx={{ color: "azure" }}>
                {VideoFile && VideoFile.name}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  mr: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Video_upload_percentage}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="azure"
                >{`${Video_upload_percentage}%`}</Typography>
              </Box>
            </Box>
            <CloseIcon
              sx={{ flex: "0.5", cursor: "pointer" }}
              onClick={
                Video_upload_percentage === 100
                  ? removeVideo
                  : () => handleCancelClick("video")
              }
            />
          </Box>
        ) : (
          <input
            className="upload_input"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        )}
        <input
          className="upload_input"
          placeholder="Title"
          name="title"
          type="text"
          onChange={handleInput}
        />
        <textarea
          className="upload_input"
          name="description"
          placeholder="Description"
          rows="8"
          onChange={handleInput}
        ></textarea>
        <input
          className="upload_input"
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Thumbnail:</Label>
        {Thumbnail_upload_percentage > 0 ? (
          <Box
            sx={{
              px: "10px",
              py: "10px",
              border: "1px solid grey",
              borderRadius: "0.5rem",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: "9",
                gap: "1px",
              }}
            >
              <Typography sx={{ color: "azure" }}>
                {VideoThumbnail && VideoThumbnail.name}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  mr: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Thumbnail_upload_percentage}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="azure"
                >{`${Thumbnail_upload_percentage}%`}</Typography>
              </Box>
            </Box>
            <CloseIcon
              sx={{ flex: "0.5", cursor: "pointer" }}
              onClick={
                Thumbnail_upload_percentage === 100
                  ? removeThumbnail
                  : () => handleCancelClick("thumbnail")
              }
            />
          </Box>
        ) : (
          <input
            className="upload_input"
            type="file"
            accept="image/*"
            onChange={(e) => setVideoThumbnail(e.target.files[0])}
          />
        )}

        <button className="upload_btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
