import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoCallPage = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [blur, setBlur] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { tokenJWT: token } = useSelector(s => s.user);

  const socket = useRef();
  const webRTCPeer = useRef();
  const localVideo = useRef();
  const remoteVideo = useRef();
  const MicrophoneOffIcon = ({ color }) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 13C8 15.2091 9.79086 17 12 17C13.3583 17 14.5585 16.323 15.2815 15.288L8 8V13Z"
          fill={color}
        />
        <path
          d="M4 12V13C4 17.4183 7.58172 21 12 21C14.4653 21 16.6701 19.8849 18.1376 18.1316M2 2L22 22M16 10.4V7C16 4.79086 14.2091 3 12 3C11.0406 3 10.1601 3.33778 9.47086 3.9009M12 17C9.79086 17 8 15.2091 8 13V8L15.2815 15.288C14.5585 16.323 13.3583 17 12 17Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };
  const MicrophoneOnIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V13C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13V7Z"
          fill="white"
        />
        <path
          d="M20 12V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V12M12 17C9.79086 17 8 15.2091 8 13V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V13C16 15.2091 14.2091 17 12 17Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };
  const VideoCallOnIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 8.93137C22 8.32555 22 8.02265 21.8802 7.88238C21.7763 7.76068 21.6203 7.69609 21.4608 7.70865C21.2769 7.72312 21.0627 7.93731 20.6343 8.36569L17 12L20.6343 15.6343C21.0627 16.0627 21.2769 16.2769 21.4608 16.2914C21.6203 16.3039 21.7763 16.2393 21.8802 16.1176C22 15.9774 22 15.6744 22 15.0686V8.93137Z"
          fill="white"
        />
        <path
          d="M2 9.8C2 8.11984 2 7.27976 2.32698 6.63803C2.6146 6.07354 3.07354 5.6146 3.63803 5.32698C4.27976 5 5.11984 5 6.8 5H12.2C13.8802 5 14.7202 5 15.362 5.32698C15.9265 5.6146 16.3854 6.07354 16.673 6.63803C17 7.27976 17 8.11984 17 9.8V14.2C17 15.8802 17 16.7202 16.673 17.362C16.3854 17.9265 15.9265 18.3854 15.362 18.673C14.7202 19 13.8802 19 12.2 19H6.8C5.11984 19 4.27976 19 3.63803 18.673C3.07354 18.3854 2.6146 17.9265 2.32698 17.362C2 16.7202 2 15.8802 2 14.2V9.8Z"
          fill="white"
        />
        <path
          d="M22 8.93137C22 8.32555 22 8.02265 21.8802 7.88238C21.7763 7.76068 21.6203 7.69609 21.4608 7.70865C21.2769 7.72312 21.0627 7.93731 20.6343 8.36569L17 12L20.6343 15.6343C21.0627 16.0627 21.2769 16.2769 21.4608 16.2914C21.6203 16.3039 21.7763 16.2393 21.8802 16.1176C22 15.9774 22 15.6744 22 15.0686V8.93137Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 9.8C2 8.11984 2 7.27976 2.32698 6.63803C2.6146 6.07354 3.07354 5.6146 3.63803 5.32698C4.27976 5 5.11984 5 6.8 5H12.2C13.8802 5 14.7202 5 15.362 5.32698C15.9265 5.6146 16.3854 6.07354 16.673 6.63803C17 7.27976 17 8.11984 17 9.8V14.2C17 15.8802 17 16.7202 16.673 17.362C16.3854 17.9265 15.9265 18.3854 15.362 18.673C14.7202 19 13.8802 19 12.2 19H6.8C5.11984 19 4.27976 19 3.63803 18.673C3.07354 18.3854 2.6146 17.9265 2.32698 17.362C2 16.7202 2 15.8802 2 14.2V9.8Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };
  const VideoCallOffIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 8.93137C22 8.32556 22 8.02265 21.8802 7.88238C21.7763 7.76068 21.6203 7.69609 21.4608 7.70865C21.2769 7.72312 21.0627 7.93731 20.6343 8.36569L17 12L20.6343 15.6343C21.0627 16.0627 21.2769 16.2769 21.4608 16.2914C21.6203 16.3039 21.7763 16.2393 21.8802 16.1176C22 15.9774 22 15.6744 22 15.0686V8.93137Z"
          fill="white"
        />
        <path
          d="M5 5C3.34315 5 2 6.34315 2 8V16C2 17.6569 3.34315 19 5 19H14C15.3527 19 16.4962 18.1048 16.8705 16.8745M17 12L20.6343 8.36569C21.0627 7.93731 21.2769 7.72312 21.4608 7.70865C21.6203 7.69609 21.7763 7.76068 21.8802 7.88238C22 8.02265 22 8.32556 22 8.93137V15.0686C22 15.6744 22 15.9774 21.8802 16.1176C21.7763 16.2393 21.6203 16.3039 21.4608 16.2914C21.2769 16.2769 21.0627 16.0627 20.6343 15.6343L17 12ZM17 12V9.8C17 8.11984 17 7.27976 16.673 6.63803C16.3854 6.07354 15.9265 5.6146 15.362 5.32698C14.7202 5 13.8802 5 12.2 5H9.5M2 2L22 22"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };

  const onStartPeering = isInitiator => {
    console.log("got start-peering", isInitiator);
    socket.current.off("start-peering", onStartPeering);
    const peer = new Peer({
      stream: localVideo.current.srcObject,
      initiator: isInitiator
    });
    webRTCPeer.current = peer;
    peer.on("signal", data => {
      socket.current.emit("signal", data);
    });
    peer.on("stream", stream => {
      console.log("got stream");
      remoteVideo.current.srcObject = stream;
    });
    peer.on("connect", () => {
      console.log("Peer connected");
    });

    socket.current.on("signal", data => {
      peer.signal(data);
    });
    socket.current.on("room-closed", duration => {
      console.log("Closing the room");
      setBlur(true);
      setTimeout(() => {
        if (remoteVideo.current.srcObject) stopMediaStream(remoteVideo.current.srcObject);
        if (localVideo.current.srcObject) stopMediaStream(localVideo.current.srcObject);
        navigate("/appointment/detail", {
          state: { appointmentID: state.appointmentID }
        });
      }, 3000);
    });
    socket.current.on("user-left", () => {
      console.log("User left");
      if (remoteVideo.current.srcObject) stopMediaStream(remoteVideo.current.srcObject);
      peer.destroy();
      socket.current.disconnect();
      joinMeetingRoom({
        roomID: state.roomID,
        jwtToken: token
      });
    });
  };

  const onLeave = () => {
    socket.current.disconnect();
    webRTCPeer.current.destroy();
    if (remoteVideo.current.srcObject) stopMediaStream(remoteVideo.current.srcObject);
    if (localVideo.current.srcObject) stopMediaStream(localVideo.current.srcObject);
    navigate("/appointment/detail", {
      state: { appointmentID: state.appointmentID }
    });
  };

  const stopMediaStream = stream => {
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  };

  // This function should be called in useEffect
  const joinMeetingRoom = ({ roomID, jwtToken }) => {
    socket.current = io(process.env.REACT_APP_SOCKET_SERVER_ENDPOINT, {
      auth: { token: `Bearer ${jwtToken}` },
      transports: ["websocket"]
    });
    socket.current.emit("join-room", roomID);
    socket.current.on("start-peering", onStartPeering);
  };

  useEffect(() => {
    requestMediaDevice()
      .then(() => {
        console.log("success get media device");
        joinMeetingRoom({
          roomID: state.roomID,
          jwtToken: token
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const requestMediaDevice = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    localVideo.current.srcObject = stream;
    setIsCameraOn(true);
    setIsMicOn(true);
  };

  const onToggleMic = async () => {
    if (!localVideo.current) await requestMediaDevice();
    console.log("audio", localVideo.current.srcObject.getAudioTracks());
    localVideo.current.srcObject.getAudioTracks()[0].enabled = !isMicOn;
    setIsMicOn(!isMicOn);
  };

  const onToggleCamera = async () => {
    if (!localVideo.current) await requestMediaDevice();
    localVideo.current.srcObject.getVideoTracks()[0].enabled = !isCameraOn;
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div>
      <div className="h-screen w-screen">
        <video
          className={`absolute rounded-[8px] top-[5%] right-[10%] w-[120px] h-[200px] object-cover ${
            blur ? "" : "z-10"
          } `}
          playsInline
          autoPlay
          ref={localVideo}
          muted
        ></video>
        {isMicOn ? (
          <></>
        ) : (
          <div className="absolute top-[23%] right-[30%] z-10">
            <MicrophoneOffIcon color="white" />
          </div>
        )}
        <video
          className="absolute top-[0%] right-[0%] w-screen h-screen object-cover"
          playsInline
          autoPlay
          ref={remoteVideo}
        ></video>
        <div
          className={`flex justify-between absolute w-[244px] top-[80%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] ${
            blur ? "z-[-10]" : ""
          } `}
        >
          <button
            onClick={onToggleCamera}
            className="bg-[#131517A1] rounded-[32px] w-[48px] h-[48px] background-blur-[3px] flex justify-center items-center"
          >
            {isCameraOn ? <VideoCallOnIcon /> : <VideoCallOffIcon />}
          </button>
          <button
            onClick={onLeave}
            className="bg-[#131517A1] rounded-[32px] w-[48px] h-[48px] background-blur-[3px] flex justify-center items-center"
          >
            Leave
          </button>
          <button
            onClick={onToggleMic}
            className="bg-[#131517A1] rounded-[32px] w-[48px] h-[48px] background-blur-[3px] flex justify-center items-center"
          >
            {isMicOn ? <MicrophoneOnIcon /> : <MicrophoneOffIcon color="white" />}
          </button>
        </div>
        {blur ? (
          <>
            <div className=" absolute blur-[40px] bg-base-white/30 text-primary-900 w-screen h-screen flex items-center justify-center"></div>
            <div className="absolute h-screen w-screen flex justify-center items-center flex-col  text-base-white">
              <h1 className="z-15 relative typographyHeadingSmMedium">Call Ended</h1>
              <h1 className="z-15 relative typographyHeadingSmMedium">15:20</h1>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default VideoCallPage;
