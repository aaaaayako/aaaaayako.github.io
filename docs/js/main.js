window.AudioContext = window.AudioContext || window.webkitAudioContext; //クロスブラウザ対応
var audioCtx = new AudioContext();
 
//引数のヘルツの高さの音を出す関数
function play(hz) {
 
    //正弦波の音を作成
    var osciillator = audioCtx.createOscillator();
 
    //ヘルツ（周波数）指定
    osciillator.frequency.value = hz;
 
    //音の出力先
    var audioDestination = audioCtx.destination;
 
    //出力先のスピーカーに接続
    osciillator.connect(audioDestination);
 
    //音を出す
    osciillator.start = osciillator.start || osciillator.noteOn; //クロスブラウザ対応
    osciillator.start();
 
    //音を0.5秒後にストップ
    setTimeout(function() {
        osciillator.stop();
    }, 500);
}
 
//ピアノの鍵盤を取得
var pianoKey = document.getElementsByClassName("pianokey");
var pianoKeyL = pianoKey.length;
for (i = 0; i < pianoKeyL; i++) {
 
    //クロージャ
    (function(i) {
        pianoKey[i].addEventListener("click", function() {
 
            //鍵盤の位置で周波数を計算
            var h = 442 * Math.pow(2, (1 / 12) * (i - 9));
            play(h);
        }, false)
    })(i)
}