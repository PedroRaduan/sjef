function setup(){
    canvas = createCanvas(700, 500);
    canvas.position(600, 300);
    video = createCapture(VIDEO);
    video.hide(); 
    model = ml5.imageClassifier('MobileNet', model_loaded);
}


function model_loaded(){
    console.log('Modelo carregado');
}

function draw(){
    image(video, 0, 0, 700, 520);
    model.classify(video, gotResult);
}


function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        if((results[0].confidence > 0.5) && (results[0].label != document.getElementById('objeto').value)){
            document.getElementById('objeto').innerHTML = results[0].label;
            document.getElementById('precisao').innerHTML = (results[0].confidence * 100).toFixed(0) + "%";
            var falar = window.speechSynthesis;
            var oque = results[0].label;
            var duque = new SpeechSynthesisUtterance('O objeto identificado é '+ oque);
            if(results[0].label != oque){
                falar.speak(duque);
            }
            
        }
    }
}