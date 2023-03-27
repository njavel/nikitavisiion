// Face Mesh with mediapipe
// https://google.github.io/mediapipe/solutions/face_mesh#javascript-solution-api

let sketch = function (p) {

  p.setup = function () {
    p.createCanvas(cam_w, cam_h);
    p.rectMode(p.CENTER);
  }

  p.draw = function () {
    p.clear(0);

    if (detections != undefined) {
      if (detections.multiFaceLandmarks != undefined) {
        p.drawFaceMeshes();
        // console.log(detections);
      }
    }
  }

  p.drawFaceMeshes = function () {
   

    for (let i = 0; i < detections.multiFaceLandmarks.length; i++) {
      //p.beginShape();
      for (let j = 0; j < detections.multiFaceLandmarks[i].length; j++) {

        const currentFace = detections.multiFaceLandmarks[i];

        const x = p.width - currentFace[j].x * p.width;
        const y = currentFace[j].y * p.height;
     // p.vertex(x,y);


      p.fill(0,100,255,100);
      p.stroke(255,0,255,);
      p.strokeWeight(1);
      p.rect(x, y,15,5);
  
      
      p.fill(255,0,0);
      p.strokeWeight(2);
      p.stroke(0, 255, 0, 140);
      p.text('秒了💅🏻',x,y);
      p.textSize(5);      
      
      //p.rect.fill(0,255,200);
      //p.point(x, y);
       ;

      

      }
     // p.endShape();
      
    }
  }
}

let myp5 = new p5(sketch)