const video = document.createElement("video");
const canvasElement = document.getElementById("scanQRCanvas");
const canvas = canvasElement.getContext("2d", {
  desynchronized: true,
  willReadFrequently: true,
});

let isReadQR = false;
let code = null;
const btnBoot = document.querySelectorAll(".btn-bootScanQR");
const btnPause = document.querySelectorAll(".btn-pauseScanQR");

const modal = document.getElementById("modal");
const modalScanQRSuccess = document.getElementById("scanQRSucess");

// QRコードの読み込み
function scanQR() {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        audio: false,
        facingMode: "environment",
        frameRate: { ideal: 30, max: 60 },
      },
    })
    .then((stream) => {
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();
      requestAnimationFrame(tick);
    })
    .catch((err) => {
      console.error(err);
      const modalScanQRErr = document.getElementById("scanQRErr");
      modalScanQRErr.classList.add("is-active")
    });
}

// QRコードの解析
function tick() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = canvas.getImageData(
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    // jsQRのメソッド
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (code && isReadQR) {
      if (code.data !== "") {
        isReadQR = false;
        modal.classList.add("is-open")
        modalScanQRSuccess.classList.add("is-active")
        video.srcObject = null;
      }
    }
  }
  requestAnimationFrame(tick);
}

// 起動
btnBoot.forEach((e) => {
  e.addEventListener("click", () => {
    const disabled = e.getAttribute("aria-disabled");

    if (disabled !== "true") {
      scanQR();
      isReadQR = true;
    }
  });
});

// 停止
btnPause.forEach((e) => {
  e.addEventListener("click", () => {
    isReadQR = false;
    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
    canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
  });
});