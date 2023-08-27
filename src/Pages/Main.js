import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Main() {
  const Navigate = useNavigate();
  const [startButton, setStart] = useState(false);
  const [stopButton, setStop] = useState();
  const [disClose, setDisClose] = useState();
  const [stream, setStream] = useState();
  const [recorder, setRecorder] = useState(null);
  // const [URL, setURL] = useState();
  // the stream data is stored in this array
  let data = [];

  useEffect(() => {
    const Token = localStorage.getItem("user");
    console.log(Token);
    if (!Token) logOutUser();
    axios({
      method: "post",
      url: "http://localhost:5000/varify",
      headers: { Authorization: `Bearer ${Token}` },
    })
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || err?.message);
        logOutUser()
      });
  }, []);

  const logOutUser = ()=>{
    console.log('removed')
    localStorage.removeItem("user");
    Navigate("/");
  }

  useEffect(() => {
    if (recorder && recorder.state !== "inactive")
      recorder.ondataavailable = (e) => {
        console.log(e.data);
        if (e.data.size > 0) {
          data.push(e.data);
        }
      };

    if (recorder && recorder.state !== "inactive")
      recorder.onstop = () => {
        const userConfirmation = window.confirm(
          "Do you want to save the recorded file?"
        );

        if (userConfirmation) saveFile(data);

        data = [];
        setStop(false);
        setStart(true);
      };
  }, [recorder]);

  const SelectScreen = async () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: {
          mediaSource: "screen",
        },
        audio: true,
      })
      .then(async (e) => {
        // For recording the mic audio
        let audio = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setStart(true);

        // Combine both video/audio stream with MediaStream object
        let combine = new MediaStream([...e.getTracks(), ...audio.getTracks()]);
        setStream(combine);
        setStart(true);
      })
      .catch((err) => console.log(err));
      setDisClose(true)
  };

const disCloseScreen = ()=>{
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(mediaStream => {
    const stream = mediaStream;
    const tracks = stream.getTracks();

    tracks[0].stop();
    setDisClose(false)
    window.location.reload(); // Reload the page when disClose becomes true

  }).catch((err) => console.log(err));
}
  async function startRecording() {
    // Starts the recording when clicked
    setStart(false);
    setStop(true);
    let mediaRecorder = createRecorder(stream);
    setRecorder(mediaRecorder);
    alert("recording started");
    // For a fresh start
    data = [];
  }

  function stopRecording() {
    // Stops the recording
    recorder.stop();
    alert("recording stopped");
  }

  function createRecorder(stream) {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.

    return mediaRecorder;
  }

  function saveFile(recordedChunks) {
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    console.log(recordedChunks);
    let filename = window.prompt("Enter file name"),
      downloadLink = document.createElement("a");
    console.log(blob);
    if (typeof URL !== "undefined" && "createObjectURL" in URL)
      downloadLink.href = URL.createObjectURL(blob);

    downloadLink.download = `${filename}.webm`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(blob); // clear from memory
    document.body.removeChild(downloadLink);
  }
  let Content;
  // if(!disClose)
  Content = (
    <div
      className="w-1/6 h-1/3 font-serif rounded-full shadow 
    hover:bg-blue-400 flex justify-center items-center  
     bg-white hover:text-white text-blue-400 sm:text-xl font-bold 
     transition ease-in-out hover:translate-y-1 hover:scale-125 duration-700 cursor-pointer"
      onClick={() => SelectScreen()}
    >
      record
    </div>
  );

  if (startButton)
    Content = (
      <button
        className=" text-lg text-center font-serif font-semibold w-full h-10 bg-white  sm:px-4 sm:py-2 text-blue-400 sm:text-xl  flex items-center justify-center rounded-md hover:text-white hover:bg-blue-400 duration-500 cursor-pointer"
        onClick={() => startRecording()}
      >
        start
      </button>
    );

  if (stopButton)
    Content = (
      <button
        className=" text-lg text-center font-serif font-semibold w-full h-10 bg-white  sm:px-4 sm:py-2 text-blue-400 sm:text-xl  flex items-center justify-center rounded-md hover:text-white hover:bg-blue-400 duration-500 cursor-pointer"
        onClick={() => stopRecording()}
      >
        stop
      </button>
    );

  return (
    <>
 <div><button
        className=" text-lg text-center font-serif font-semibold w-full h-10 bg-white  sm:px-4 sm:py-2 text-blue-400 sm:text-xl  flex items-center justify-center rounded-md hover:text-white hover:bg-blue-400 duration-500 cursor-pointer"
        onClick={() => logOutUser()}
      >
        Logout
      </button></div>
      <div className="w-full h-screen flex justify-center items-center ">
        
        <div className="w-1/2 bg-blue-400 flex justify-center items-center gap-2 p-8 relative">
          {/* <video height="500px" width="500px" autoplay controls /> */}
          {  disClose&&
            <span className="absolute text-2xl font-bold right-0 top-0 cursor-pointer" onClick={() => disCloseScreen()}>
            &#x2715;
          </span>
        }
          
          {Content}
        </div>
        {/* {URL && (
          <a href={URL} download="output.mp4" class="download-anc">
            Download
          </a>
        )} */}
      </div>
    </>
  );
}

export default Main;
