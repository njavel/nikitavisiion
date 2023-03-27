// Hand detection with mediapipe
// https://google.github.io/mediapipe/solutions/hands.html
// Adapted from "Multiple Hands Detection in p5.js" by Kazuki Umeda (https://www.youtube.com/watch?v=BX8ibqq0MJU)

let sketch = function(p) {

  let font;

  p.preload = function() {
    font = p.loadFont("Poppins-Medium.ttf");
  }

  p.setup = function() {
    p.createCanvas(cam_w, cam_h, p.WEBGL);
    p.fill(100,0,200);
    p.setAttributes({alpha: true})
    p.textFont(font);
    p.textSize(16)
  }

  p.draw = function() {
    p.clear(0);
    p.translate(-p.width/2, -p.height/2);

    if(detections != undefined) {
      if(detections.multiHandLandmarks != undefined) {
        p.drawHands();
      }
    }
  }

  p.drawHands = function() {
    p.stroke(255,0,255);
    p.strokeWeight(8);

    for(let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for(let j = 0; j < detections.multiHandLandmarks[i].length; j++) {

        const x = p.width-(detections.multiHandLandmarks[i][j].x * p.width);
        const y = detections.multiHandLandmarks[i][j].y * p.height;
        const z = detections.multiHandLandmarks[i][j].z;
        
        p.point(x, y, z);

        p.text('¥=¥=¥=¥=¥++┌(;-0-)┘',x,y,z);
        p.textSize(30);

         



        // calculate how far the hand is from the camera by calculating the distance between keypoints 9 and 13 (base of middle and ring finger)
        if(j == 9 || j == 13) {
          const palm1 = detections.multiHandLandmarks[0][9]
          const palm2 = detections.multiHandLandmarks[0][13]
      
          const palm1Pos = p.createVector(palm1.x, palm1.y);
          const palm2Pos = p.createVector(palm2.x, palm2.y);
               
      
          //console.log(distance);
        }
         
      }
    }
  }
}

let myp5 = new p5(sketch)