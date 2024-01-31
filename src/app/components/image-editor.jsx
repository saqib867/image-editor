"use client";
import axios from "axios";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Button, Image as AntdImg, Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { IoMdClose } from "react-icons/io";
// import Modal from "react-modal";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../firebase";
import ImglyBackgroundRemoval from "@imgly/background-removal";
const ImageEditor = () => {
  const [imageFile, setImageFile] = useState(null);
  const [secondImg, setSecondImg] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [responseImage, setResponseImage] = useState([]);
  const [removeBgImg, setRemoveBgImg] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isPrompt, setIsPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBgRemoving, setIsBgRemoving] = useState(false);
  const [ImgError, setImgError] = useState("");
  const fileInputRef = useRef(null);
  const secondImage = useRef(null);
  const xApiKey = "b84e8750806d78328297224457ff2bff244c44cf";

  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };
  const handleSecondImg = () => {
    // Trigger the file input click event
    secondImage.current.click();
  };
  const handleSecondImgChange = async (event) => {
    // Access the selected file from the event
    const selectedFile = event.target.files[0];
    setSecondImg(selectedFile);
    // setIsBgRemoving(true);
    // setResponseImage([]);
    // console.log(selectedFile);
    // if (imageFile) {
    //   try {
    //     const formData = new FormData();
    //     formData.append("file", imageFile);
    //     const mainImgResponse = await axios.post(
    //       "https://elev3n.hybridmediaworks.com/api/upload-image",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data", // do not forget this
    //         },
    //       }
    //     );
    //     const secondFormData = new FormData();
    //     secondFormData.append("file", selectedFile);
    //     const secondImgResponse = await axios.post(
    //       "https://elev3n.hybridmediaworks.com/api/upload-image",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data", // do not forget this
    //         },
    //       }
    //     );

    //     if (secondImgResponse.data?.link && mainImgResponse?.data?.link) {
    //       const dataUrls = await axios.get(
    //         `https://beta-sdk.photoroom.com/v2/edit?imageUrl=${mainImgResponse?.data?.link}&removeBackground=true&background.imageUrl=${secondImgResponse.data?.link}`,

    //         {
    //           headers: {
    //             Accept: "image/*",
    //             "x-api-key": xApiKey,
    //           },
    //           responseType: "blob",
    //         }
    //       );

    //       setImageFile(dataUrls.data);
    //       setIsBgRemoving(false);
    //       setIsPrompt(false);
    //     }
    //   } catch (error) {
    //     console.error("Error in handleGenerateImge:", error);
    //     setIsBgRemoving(false);
    //   }
    // } else {
    //   toast.warning("Please Upload Image");
    // }
  };

  const handleFileChange = (event) => {
    // Access the selected file from the event
    setIsBgRemoving(false)
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);

    // if (selectedFile.type !== 'image/jpeg') {
    //   // alert('Please select a JPEG image.');
    //   setImgError('Please select a JPEG format.')
    //   event.target.value = ''; // Clear the file input
    //   return;
    // }

    // // Use FileReader to read the image dimensions
    // const reader = new FileReader();
    // reader.onload = function (e) {
    //   const img = new Image();
    //   img.onload = function () {
    //     const width = this.width;
    //     const height = this.height;

    //     // Check if the image dimensions are within the limit (0.25 megapixels)
    //     if (width * height > 0.25 * 1000000) {
    //     //  toast.error("Image size exceed from 250Kb pixel")
    //     setImgError('Image size should below then  250kb ')
    //       event.target.value = ''; // Clear the file input
    //     } else {
    //       // Image is valid, you can proceed with uploading or further processing
    //       console.log('Valid image:', selectedFile);

    //     }
    //   };
    //   img.src = e.target.result;
    // };
    // reader.readAsDataURL(selectedFile);
  };

  const handlePrompt = () => {
    if (!imageFile) {
      toast.warning("Please Upload Image");
    } else {
      setIsPrompt(true);
    }
  };

  const uploadFunction = async (seed, index) => {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("imageFile", imageFile);
    formData.append("seed", seed);
    const options = {
      method: "POST",
      url: "https://beta-sdk.photoroom.com/v1/instant-backgrounds",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
        Accept: "image/png, application/json",
        "x-api-key": xApiKey,
      },
      responseType: "blob",

      data: formData,
    };
    try {
      const { data } = await axios.request(options);
      console.log(data, "newResData");
      responseImage[index] = data;
      setResponseImage([...responseImage]);
      return data;
    } catch (error) {
      console.error(error);
    }
    // try {
    //   const response = await axios.get(
    //     `https://beta-sdk.photoroom.com/v2/edit?imageUrl=${img}&background.prompt=${prompt}&removeBackground=true&background.seed=${seed}`,

    //     {
    //       headers: {
    //         Accept: "image/*",
    //         "x-api-key": xApiKey,
    //       },
    //       responseType: "blob",
    //       maxRedirects: 5,
    //     }
    //   );

    //   return response.data;
    // } catch (error) {
    //   console.log("response.error ", error);
    // }
  };

  const handleRemoveImg = async () => {
    setIsBgRemoving(true);
    setResponseImage([]);
    if (imageFile) {
      const formData = new FormData();
      formData.append("image_file", imageFile);
      formData.append("format", "jpg");
      formData.append("bg_color", "white");
      formData.append("size", "preview");

      const options = {
        method: "POST",
        url: "https://sdk.photoroom.com/v1/segment",
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=---011000010111000001101001",
          Accept: "image/png, application/json",
          "x-api-key": xApiKey,
        },
        responseType: "blob",
        data: formData,
      };
      try {
        const { data } = await axios.request(options);
        setImageFile(data);
        setIsBgRemoving(false);
        setIsPrompt(false);
      } catch (error) {
        console.error("Error in handleGenerateImge:", error);
        setIsBgRemoving(false);
      }
    } else {
      toast.warning("Please Upload Image");
    }
  };
  const handleGenerateImge = async () => {
    setIsLoading(true);
    setResponseImage(Array.from({ length: 4 }, () => null));
    const seed = ["55994449", "117879368", "48672244", "117879368"];

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      // const response = await axios.post(
      //   "https://elev3n.hybridmediaworks.com/api/upload-image",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data", // do not forget this
      //     },

      //   }
      // );

      seed.map((s, index) => uploadFunction(s, index));

      // setResponseImage(dataUrls);
      setIsPrompt(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error in handleGenerateImge:", error);
    }
  };
  console.log(responseImage, "imagess");
  return (
    <div className="flex  h-full z-10 relative">
      <div className="min-w-[300px] min-h-full border-r border-gray-400">
        <div className="flex flex-col p-4">
          <h1 className="text-center text-2xl font-semibold">Tools</h1>
          <button
            className="flex justify-center flex-col items-center mt-4 cursor-pointer"
            onClick={handleRemoveImg}
            disabled={isBgRemoving}
          >
            <span className="flex w-24 h-16 bg-[#F2F3F7]  rounded-lg  justify-center items-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                role="img"
                class="h-7 w-7 text-blue-500 text-content-accent"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 11H3V6C3 4.34314 4.34326 3 6 3H18C19.6567 3 21 4.34314 21 6V11H22C22.5522 11 23 11.4477 23 12C23 12.5523 22.5522 13 22 13H21V18C21 19.6569 19.6567 21 18 21H6C4.34326 21 3 19.6569 3 18V13H2C1.44775 13 1 12.5523 1 12C1 11.4477 1.44775 11 2 11ZM18 5H6C5.44775 5 5 5.44769 5 6V11H19V6C19 5.44769 18.5522 5 18 5ZM16.2929 13H13.7071L7.70711 19H10.2929L16.2929 13ZM11.7071 19L17.7071 13H19V14.2929L14.2929 19H11.7071ZM15.7071 19H18C18.5522 19 19 18.5523 19 18V15.7071L15.7071 19ZM6.29289 19L12.2929 13H9.70711L5 17.7071V18C5 18.5523 5.44775 19 6 19H6.29289ZM5 16.2929L8.29289 13H5V16.2929Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="w-24 text-sm text-center mt-2">
              Remove Background
            </span>
          </button>
          <div
            className="flex justify-center flex-col items-center mt-4 cursor-pointer"
            onClick={handlePrompt}
          >
            <span className="flex w-24 h-16 bg-[#F2F3F7]  rounded-lg  justify-center items-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                role="img"
                class="h-7 w-7 text-blue-500 text-content-accent group-hover:text-accent-400 group-focus-visible:text-accent-400 group-active:text-accent-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.5547 1.16795C12.2188 0.944017 11.7812 0.944017 11.4453 1.16795L2.4453 7.16795C2.1671 7.35342 2 7.66565 2 8C2 8.33435 2.1671 8.64658 2.4453 8.83205L5.69723 11L2.4453 13.168C2.1671 13.3534 2 13.6657 2 14C2 14.3344 2.1671 14.6466 2.4453 14.8321L11.4453 20.8321C11.7812 21.056 12.2188 21.056 12.5547 20.8321L21.5547 14.8321C21.8329 14.6466 22 14.3344 22 14C22 13.6657 21.8329 13.3534 21.5547 13.168L18.3028 11L21.5547 8.83205C21.8329 8.64658 22 8.33435 22 8C22 7.66565 21.8329 7.35342 21.5547 7.16795L12.5547 1.16795ZM16.5 12.2019L12.5547 14.8321C12.2549 15.0319 11.874 15.0534 11.5567 14.8964L8.85208 16.6995L9.95069 17.4319L17.1479 12.6338L16.5 12.2019ZM12 18.7982L10.8521 18.0329L18.0493 13.2347L19.1972 14L12 18.7982ZM7.95069 16.0986L10.6479 14.3005L9.54931 13.5681L6.85208 15.3662L7.95069 16.0986ZM7.5 12.2019L8.64792 12.9671L5.95069 14.7653L4.80278 14L7.5 12.2019ZM12 12.7982L4.80278 8L12 3.20185L19.1972 8L12 12.7982Z"
                  clip-rule="evenodd"
                ></path>
                <path d="M4.24362 17.1763C4.16626 16.9412 3.83374 16.9412 3.75638 17.1763L3.40592 18.2422C3.38028 18.3196 3.31959 18.3803 3.24223 18.4059L2.1763 18.7564C1.94123 18.8337 1.94123 19.1663 2.1763 19.2436L3.24223 19.5941C3.31959 19.6197 3.38028 19.6804 3.40592 19.7578L3.75638 20.8237C3.83374 21.0588 4.16626 21.0588 4.24362 20.8237L4.59408 19.7578C4.61972 19.6804 4.68042 19.6197 4.75777 19.5941L5.8237 19.2436C6.05877 19.1663 6.05877 18.8337 5.8237 18.7564L4.75777 18.4059C4.68042 18.3803 4.61972 18.3196 4.59408 18.2422L4.24362 17.1763Z"></path>
                <path d="M15.3173 20.1322C15.3753 19.9559 15.6247 19.9559 15.6827 20.1322L15.9456 20.9317C15.9648 20.9897 16.0103 21.0352 16.0683 21.0544L16.8678 21.3173C17.0441 21.3753 17.0441 21.6247 16.8678 21.6827L16.0683 21.9456C16.0103 21.9648 15.9648 22.0103 15.9456 22.0683L15.6827 22.8678C15.6247 23.0441 15.3753 23.0441 15.3173 22.8678L15.0544 22.0683C15.0352 22.0103 14.9897 21.9648 14.9317 21.9456L14.1322 21.6827C13.9559 21.6247 13.9559 21.3753 14.1322 21.3173L14.9317 21.0544C14.9897 21.0352 15.0352 20.9897 15.0544 20.9317L15.3173 20.1322Z"></path>
                <path d="M21.2436 17.1763C21.1663 16.9412 20.8337 16.9412 20.7564 17.1763L20.4059 18.2422C20.3803 18.3196 20.3196 18.3803 20.2422 18.4059L19.1763 18.7564C18.9412 18.8337 18.9412 19.1663 19.1763 19.2436L20.2422 19.5941C20.3196 19.6197 20.3803 19.6804 20.4059 19.7578L20.7564 20.8237C20.8337 21.0588 21.1663 21.0588 21.2436 20.8237L21.5941 19.7578C21.6197 19.6804 21.6804 19.6197 21.7578 19.5941L22.8237 19.2436C23.0588 19.1663 23.0588 18.8337 22.8237 18.7564L21.7578 18.4059C21.6804 18.3803 21.6197 18.3196 21.5941 18.2422L21.2436 17.1763Z"></path>
              </svg>
            </span>
            <span className="w-24 text-sm text-center mt-2">Prompt</span>
          </div>

          <div
            className="flex justify-center flex-col items-center mt-4 cursor-pointer"
            onClick={handleSecondImg}
          >
            <span className="flex w-24 h-16 bg-[#F2F3F7]  rounded-lg  justify-center items-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                role="img"
                class="h-7 w-7 text-blue-500 text-content-accent"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 11H3V6C3 4.34314 4.34326 3 6 3H18C19.6567 3 21 4.34314 21 6V11H22C22.5522 11 23 11.4477 23 12C23 12.5523 22.5522 13 22 13H21V18C21 19.6569 19.6567 21 18 21H6C4.34326 21 3 19.6569 3 18V13H2C1.44775 13 1 12.5523 1 12C1 11.4477 1.44775 11 2 11ZM18 5H6C5.44775 5 5 5.44769 5 6V11H19V6C19 5.44769 18.5522 5 18 5ZM16.2929 13H13.7071L7.70711 19H10.2929L16.2929 13ZM11.7071 19L17.7071 13H19V14.2929L14.2929 19H11.7071ZM15.7071 19H18C18.5522 19 19 18.5523 19 18V15.7071L15.7071 19ZM6.29289 19L12.2929 13H9.70711L5 17.7071V18C5 18.5523 5.44775 19 6 19H6.29289ZM5 16.2929L8.29289 13H5V16.2929Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="w-24 text-sm text-center mt-2">
              Upload Background Image
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={secondImage}
            onChange={handleSecondImgChange}
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col ">
        <div className="flex justify-center  flex-col items-center  w-full h-full py-8">
          {!imageFile ? (
            <div className="bg-[#F2F3F7] lg:w-[800px] w-[400px] lg:h-[350px] h-[300px] flex justify-center items-center rounded-3xl">
              <div className="lg:w-[700px] w-[350px]  lg:h-[250px] h-[200px] border-dashed border-2 border-gray-500 rounded-2xl flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">Start From a Photo</h1>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <button
                  className="bg-blue-500 text-white text-sm px-5 py-2.5 text-center rounded-full mt-4"
                  onClick={handleButtonClick}
                >
                  + Select a photo
                </button>
              </div>
            </div>
          ) : (
            <div
            className=" flex flex-col items-center top-0 left-0 right-0 bottom-0 bg-gradient-to-b  py-8 from-slate-50 to-transparent"
            style={{
              backgroundImage:
                "radial-gradient(#eceaea  2px, transparent 3px)",
              backgroundSize: "20px 20px",
            }}
          >
              <div className="lg:w-[800px] w-[400px] py-4 ">
              
                  <div className="flex justify-end mr-4 ">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setImageFile(null),
                          setRemoveBgImg(null),
                          setResponseImage([]);
                      }}
                    >
                      <IoMdClose size={30} />
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-2 lg:w-[800px] w-[400px]  ">
                    <div
                      className={`w-full h-full flex justify-center  items-center `}
                    >
                      <Spin
                        spinning={isBgRemoving}
                        indicator={
                          <LoadingOutlined
                            style={{
                              fontSize: 35,
                            }}
                            spin
                          />
                        }
                      >
                        <AntdImg
                          active={isBgRemoving}
                          loading={isBgRemoving}
                          preview={false}
                          className=" object-contain"
                          src={URL.createObjectURL(imageFile)}
                          width={"300px"}
                          height={"300px"}
                          alt=""
                          // style={{ display: isBgRemoving ? "none" : "block" }}
                        />
                      </Spin>
                    </div>
                  </div>
                </div>
             
              {responseImage != 0 && (
                <div className="flex items-center gap-x-2 my-5 h-[200px] justify-center max-w-[700px] bg-[#F2F3F7] rounded-xl px-6 py-2">
                  {responseImage?.map((item, index) =>
                    item ? (
                      <AntdImg
                        key={index}
                        preview={false}
                        className={`cursor-pointer ${
                          index === selectedIndex && "border-4 border-blue-500"
                        } `}
                        width={150}
                        height={150}
                        src={URL.createObjectURL(item) || ""}
                        placeholder={
                          <AntdImg
                            preview={false}
                            className="object-contain"
                            src={URL.createObjectURL(item) || ""}
                            width={150}
                            height={150}
                          />
                        }
                        onClick={() => {
                          setImageFile(item), setSelectedIndex(index);
                        }}
                      />
                    ) : (
                      <div className="w-[150px] h-110px]" key={index}>
                        <Skeleton.Image
                          active
                          style={{
                            width: "150px",
                            height: "110px",
                            opacity: "0.5",
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
        
            </div>
          )}
          {isPrompt && (
            <div className="flex justify-center mt-10">
              <div className="flex p-2 w-[500px] bg-[#F2F3F7] rounded-lg px-2">
                <input
                  type="text"
                  className="outline-none w-full px-2 bg-[#F2F3F7] "
                  placeholder="Enter prompt..."
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button
                  type="primary"
                  className="bg-blue-500"
                  loading={isLoading}
                  onClick={handleGenerateImge}
                >
                  Generate
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
