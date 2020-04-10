const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const resultDiv = document.querySelector("#result-div");
const resultTxt = document.querySelector("#result-txt");
const assisMsg = document.querySelector("#assist-message");

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = "ja-JP";
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = ""; // 確定した(黒の)認識結果

recognition.onresult = (event) => {
  let interimTranscript = ""; // 暫定(灰色)の認識結果
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript + "。";
    } else {
      interimTranscript = transcript;
    }
  }
  // resultDiv.innerHTML =
  //   finalTranscript + '<i style="color:#ddd;">' + interimTranscript + "</i>";

  resultTxt.value = finalTranscript + interimTranscript;
};

startBtn.onclick = () => {
  recognition.start();
  //音声認識中であることを示す
  assisMsg.innerHTML = "音声認識中です。マイクに近づいて話しかけてください。";
};
stopBtn.onclick = () => {
  recognition.stop();
  assisMsg.innerHTML = "startボタンを押してください";
};

resultTxt.addEventListener("input", inputresult);

//textareaの入力結果を認識結果に反映
function inputresult(e) {
  finalTranscript = resultTxt.value;
}
