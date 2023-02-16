
import { useRef, useState, useEffect, VideoHTMLAttributes } from 'react';

import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';

import * as fp from 'fingerpose';

import victory from './victory.png'
import thumbs_up from './thumbs_up.png';

export const HandposeGestureRecognition = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [emoji, setEmoji] = useState<string | null>(null);
  const images = { thumbs_up: thumbs_up, victory: victory };

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded.');
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net: handpose.HandPose) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video!.readyState === 4
    ) {
      
      const video = webcamRef.current.video as HTMLVideoElement;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      canvasRef.current!.width = videoWidth;
      canvasRef.current!.height = videoHeight;

      const hand = await net.estimateHands(video);
    }

    return (
      <div>
        Teste
      </div>
    )
  }
};
