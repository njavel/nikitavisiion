// Face detection with mediapipe
// https://google.github.io/mediapipe/solutions/face_detection.html

let sketch = function(p) {

  p.setup = function() {
    p.createCanvas(cam_w, cam_h);
    p.rectMode(p.CENTER);
  }

  p.draw = function() {
    p.clear(0);

    if(detections != undefined) {
      if(detections.detections != undefined) {
        p.drawFaces();
        // console.log(detections.detections);
        console.log(detections);
      }
    }
  }

  p.drawFaces = function() {
    p.strokeWeight(8);

    for(let i = 0; i < detections.detections.length; i++) {

      // it's not necessary to create this boundingBox variable, but it makes for less typing and neater coder
      const boundingBox = detections.detections[i].boundingBox;
      const bbX = p.width - boundingBox.xCenter * p.width;
      const bbY = boundingBox.yCenter * p.height;
      const bbW = boundingBox.width * p.width;
      const bbH = boundingBox.height *p.height;
      
      p.noStroke();
      p.fill(255, 0, 255, 70);
      p.rect(bbX, bbY, bbW, bbH);

      p.stroke(0, 255, 0);
      for(let j = 0; j < detections.detections[i].landmarks.length; j++) {
        const facePoint = detections.detections[i].landmarks[j]
        const x = p.width - (facePoint.x * p.width)
        const y = facePoint.y * p.height

        p.point(x, y,);
        p.textSize(35);
        p.text('🧠',x,y);
        

        

        
        //fun stuff
      }
    }
  }
}

let myp5 = new p5(sketch)