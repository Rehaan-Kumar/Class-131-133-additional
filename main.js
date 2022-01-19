img = "";
check = false;
objects = [];
model_status = "";

function setup() {
    canvas = createCanvas(620 , 460)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded")
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results
    }
}

function draw() {
    if (check == true) {
        image(img, 0, 0, 620, 460)
    }

    if (model_status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected"

            fill("red")
            percentage = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percentage  + "%" , objects[i].x + 15 , objects[i].y + 15)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
        }
    }
}

function display() {
    imageFile = document.getElementById("myFile").files
    console.log(imageFile)
    var reader = new FileReader
    reader.readAsDataURL(imageFile[0])
    reader.onload = function(event) {
        console.log(event)
        url = event.target.result
        imgTag = new Image(620,460)
        console.log(imgTag)
        imgTag.src = url
        imgTag.onload = function(){
            img = loadImage(imgTag.src)
            check = true
        }
    }

    setTimeout(function() {
        model_status = true
        objectDetector.detect(imgTag, gotResults)    
    },5000)
}