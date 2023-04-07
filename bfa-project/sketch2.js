// Hand detection with mediapipe
// https://google.github.io/mediapipe/solutions/hands.html
// Adapted from "Multiple Hands Detection in p5.js" by Kazuki Umeda (https://www.youtube.com/watch?v=BX8ibqq0MJU)

let sketch = function (p) {
  let nails;
  let eye;
  let dag;
  let erduo;
  let shoulder;
  let band;
  let band2;
  let tubig;
  let font;
  let img;

  p.preload = function () {
    font = p.loadFont("Poppins-Medium.ttf");
    nails = p.loadModel("nails.obj");
    dag = p.loadModel("dag.obj");
    erduo = p.loadModel("erduo.obj");
    shoulder = p.loadModel("shoulder.obj");
    band = p.loadModel("band.obj");
    band2 = p.loadModel("band2.obj");
    eye = p.loadModel("eye.obj");
    tubig = p.loadModel("tubig.obj");
  };

  p.setup = function () {
    p.createCanvas(cam_w, cam_h, p.WEBGL);
    p.setAttributes({ alpha: true });
    p.textFont(font);
    p.textSize(16);
  };

  p.draw = function () {
    p.clear(0);
    p.translate(-p.width / 2, -p.height / 2);

    if (detections != undefined) {
      // console.log(detections);

      // check right hand
      // check left hand
      // check poses

      if (detections.leftHandLandmarks != undefined) {
        p.drawHand(detections.leftHandLandmarks);
      }

      if (detections.rightHandLandmarks != undefined) {
        p.drawHand(detections.rightHandLandmarks);
      }

      if (detections.poseLandmarks != undefined) {
        p.drawPose(detections.poseLandmarks);
      }
    }
  };

  p.drawPose = function (pose) {
    // const nose = p.createVector(pose[0].x, pose[0].y);

    // p.push();
    // p.translate(p.width - nose.x * p.width, nose.y * p.height, 0);
    // p.scale(5);
    // p.normalMaterial();
    // p.model(TEETH);
    // p.pop();

    // add points to this array for each poseKeypoint you want to draw something on.
    const myPosePoints = [0,3,6,7,8,9,11,12,13,14,23,25,26,27,28];

    for (let i = 0; i < myPosePoints.length; i++) {
      const curPoint = myPosePoints[i];
      const poseFeature = pose[curPoint];
      p.push();
      p.translate(p.width - poseFeature.x * p.width, poseFeature.y * p.height, 0);
      p.scale(5);
      p.normalMaterial();

     


      // a more efficient if/else thingy (https://www.w3schools.com/js/js_switch.asp)

      switch (curPoint) {
        case 3:
          p.scale(3);
          p.model(eye);
        break;
        case 6:
          p.scale(3);
          p.model(eye);
      
        break;
        case 7:
          p.translate(-10,20,0);
          p.scale(1);
          p.rotateY(15);
          p.model(erduo);

        break;
        case 8:
          p.translate(10,20,0);
          p.scale(1);
          p.rotateY(-15);
          p.model(erduo);
        break;
        case 8:
          p.translate(10,20,0);
          p.scale(1);
          p.rotateY(-15);
          p.model(erduo);
        break;
        break;
        case 11:
          p.scale(4);
          p.rotateZ(180);
          p.model(shoulder);
        break;
        case 12:
          p.scale(4);
          p.rotateZ(180);
          p.model(shoulder);
        break;
        case 13:
          p.scale(2);
          p.rotateZ(180);
          p.model(band);
        break;
        case 14:
          p.scale(2);
          p.rotateZ(180);
          p.model(band2);
  
        break;
        case 23:
          p.scale(15);
          p.rotateX(-60);
          p.model(dag);
        break;
        case 25:
          p.scale(2);
          p.rotateX(-60);
          p.model(band);
        break;
        case 26:
          p.scale(2);
          p.rotateX(-60);
          p.model(band2);
        break;
        case 27:
          p.scale(3);
          //p.rotateX(-60);
          p.model(tubig);
        break;
        case 28:
          p.scale(3);
          //p.rotateX(-60);
          p.model(tubig);
          
        break;
  
      }

      p.pop();
    }
  };

  p.drawHand = function (hand) {
    p.stroke(0);
    p.strokeWeight(8);

    const myHandPoints = [4, 8, 12, 16, 20];

    // const THUMB = hand[4];
    // const INDEX_FINGER = hand[8];
    // const MIDDLE_FINGER = hand[12];
    // const RING_FINGER = hand[16];
    // const PINKY_FINGER = hand[20];
    // const WRISTY = hand[0];

    for (let i = 0; i < myHandPoints.length; i++) {
      const curPoint = myHandPoints[i];
      const handFeature = hand[curPoint];
      p.fill(255, 0, 255);
      p.push();
      p.translate(p.width - handFeature.x * p.width, handFeature.y * p.height, 0);
      p.scale(15);
      //p.rotateY(180);
      p.rotateX(360);
      p.normalMaterial();
      p.model(nails);
      p.pop();

  
    }

    for (let i = 0; i < hand.length; i++) {
      const x = p.width - hand[i].x * p.width;
      const y = hand[i].y * p.height;
      const z = hand[i].z;

      p.strokeWeight(2);

   // p.text(z.toFixed(3), x, y, z);
      p.fill(255, 187, 0);
      p.text("pangangalaga sa sarili", x, y, z);
      p.textSize(15);

      // 1calculate how far the hand is from the camera by calculating the distance between keypoints 9 and 13 (base of middle and ring finger)
      if (i == 9 || i == 13) {
        const palm1 = hand[9];
        const palm2 = hand[13];

        const palm1Pos = p.createVector(palm1.x, palm1.y);
        const palm2Pos = p.createVector(palm2.x, palm2.y);

        const distance = palm1Pos.dist(palm2Pos);

        // console.log(distance);
      }
    }
  };
};
//p.background(255,0,255);
let myp5 = new p5(sketch);

// uncomment this stuff below if you want the page to auto-refresh after a certain amount of time

setTimeout(function() {

//   // refresh the page by setting the URL to what the URL already is.
window.location.href = window.location.href;

 //num milliseconds between page refreshes
 }, 900000);