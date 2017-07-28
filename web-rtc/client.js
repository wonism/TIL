window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.mozGetUserMedia || window.navigator.webkitGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

const peerConnectionConfig = {
  iceServers: [
    { url: 'stun:stun.services.mozilla.com' },
    { url: 'stun:stun.l.google.com:19302' },
  ],
};

let localVideo, remoteVideo, localStream, serverConnection, peerConnection, logCount = 1;

function log(msg) {
  console.log(`log ${logCount++} : ${msg}`);
}

function errorLog(err) {
  console.log(err);
}

function ready() {
  localVideo = document.getElementById('local-video');
  remoteVideo = document.getElementById('remote-video');

  serverConnection = new WebSocket('ws://127.0.0.1:3030');
  serverConnection.onmessage = gotMessageFromServer;

  const constraints = {
    video: true,
    audio: true,
  };

  if (navigator.getUserMedia) {
    navigator.getUserMedia(constraints, getUserMediaSuccess, errorLog);
  } else {
    alert('Your browser does not support getUserMedia API');
  }
}

function getUserMediaSuccess(stream) {
  log('getUserMediaSuccess');
  localStream = stream;
  localVideo.src = window.URL.createObjectURL(stream);
}

function start(isCaller) {
  const peerRole = isCaller ? 'Caller' : 'Callee';
  log('start(${peerRole})');
  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  peerConnection.onicecandidate = gotIceCandidate; // 자신
  peerConnection.onaddstream = gotRemoteStream; // 리모트 스트림
  peerConnection.addStream(localStream); // 자기 로컬 스트림

  if (isCaller) {
    log('Caller: createOffer');
    peerConnection.createOffer(gotDescription, errorLog); // 성공 시 gotDescription 수행
  }
}

function gotDescription(description) {
  log('got local description');
  peerConnection.setLocalDescription(description, () => {
    log('send local sdp to server');
    serverConnection.send(JSON.stringify({ sdp: description })); // sdp 정의
  }, errorLog);
}

function gotIceCandidate(event) {
  log('got local IceCandidate and send it to server');

  if (event.candidate != null) {
    serverConnection.send(JSON.stringify({ ice: event.candidate }));
  }
}

function gotRemoteStream(event) {
  log('got remote stream');
  remoteVideo.src = window.URL.createObjectURL(event.stream);
}

// 소켓 서버에서 무엇인가를 받았을 때 수행하는 함수
function gotMessageFromServer(message) {
  let caller = true;

  if(!peerConnection){
    start(false);
    caller = false;
  }

  const signal = JSON.parse(message.data);

  if(signal.sdp) {
    log('gotMessageFromServer: signal.sdp');

    if (caller) {
      peerConnection.setRemoteDescription(
        new RTCSessionDescription(signal.sdp),
        () => {},
        errorLog
      );
    } else {
      peerConnection.setRemoteDescription(
        new RTCSessionDescription(signal.sdp),
        () => {
          log('Callee: CreateAnswer');
          peerConnection.createAnswer(gotDescription, errorLog);
        },
        errorLog);
    }
  } else if(signal.ice) { // 서버로부터 다른 클라이언트의 ice를 받음
    log(`gotMessageFromServer: signal.ice${signal.ice.candidate}`);
    peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));
  }
}
