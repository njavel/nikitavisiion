// Hand detection with mediapipe
// https://google.github.io/mediapipe/solutions/hands.html
// Adapted from "Multiple Hands Detection in p5.js" by Kazuki Umeda (https://www.youtube.com/watch?v=BX8ibqq0MJU)

let sketch = function (p) {
  let treeone;
  let TEETH;
  let ty;
  let font;
  let img;

  p.preload = function () {
    font = p.loadFont("Poppins-Medium.ttf");
    treeone = p.loadModel("treeone.obj");
    TEETH = p.loadModel("TEETH.obj");
    ty = p.loadModel("ty.obj");
    img = p.loadImage("chrys.png");
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
    const myPosePoints = [0, 7, 8, 9, 10,24];

    for (let i = 0; i < myPosePoints.length; i++) {
      const curPoint = myPosePoints[i];
      const poseFeature = pose[curPoint];
      p.push();
      p.translate(p.width - poseFeature.x * p.width, poseFeature.y * p.height, 0);
      p.scale(5);
      p.normalMaterial();


      // a more efficient if/else thingy (https://www.w3schools.com/js/js_switch.asp)

      switch (curPoint) {
        case 0:
          p.model(treeone);
          break;
        case 7:
          p.model(TEETH);
          break;
        case 8:
          p.model(TEETH);
          break;
          p.ellipse(0, 0, 10, 10);

      }

      p.pop();
    }
  };

  p.drawHand = function (hand) {
    p.stroke(0);
    p.strokeWeight(8);

    const myHandPoints = [4, 8, 12, 16, 20, 0];

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
      p.scale(5);
      p.normalMaterial();
      p.model(treeone);
      p.pop();
    }

    for (let i = 0; i < hand.length; i++) {
      const x = p.width - hand[i].x * p.width;
      const y = hand[i].y * p.height;
      const z = hand[i].z;

      p.strokeWeight(2);

      // p.text(z.toFixed(3), x, y, z);
      p.fill(0, 255, 255);
      p.text("TE$T", x, y, z);
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

let myp5 = new p5(sketch);

// uncomment this stuff below if you want the page to auto-refresh after a certain amount of time

// setTimeout(function() {

//   // refresh the page by setting the URL to what the URL already is.
//   window.location.href = window.location.href;

// // num milliseconds between page refreshes
// }, 100000)