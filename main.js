prediction1="";

Webcam.set({
    width:360,
    height:360,
    image_format:'jpeg',
    jpeg_quality:90
});
Webcam.attach('#camera');
camera=document.getElementById("camera");
function capturephoto() {
    Webcam.snap(function (photo){
document.getElementById("result").innerHTML='<img id="photo" src="'+ photo + '">'
    });
}
console.log("ml5 version",ml5.version);
importing=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/U4Qgh3bWO/model.json',identify);
function identify(){
    console.log("identify");
}
function speakanswer(){
    var api=window.speechSynthesis;
    speaktext1="The first Prediction is " + prediction1;
    var loadtext=new SpeechSynthesisUtterance(speaktext1);
    api.speak(loadtext);
}
function prediction() {
    img=document.getElementById("photo");
    importing.classify(img,comparisonresult);
}
function comparisonresult(error,results){
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("resultemotionname").innerHTML=results[0].label;
        document.getElementById("result_emoji_name").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speakanswer();
        if (results[0].label == "Best"){
        document.getElementById("updateemoji").innerHTML="👍";   
        }
        if (results[0].label == "Victory") {
            document.getElementById("updateemoji").innerHTML="✌";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("updateemoji").innerHTML="👌";
        }
    }
}