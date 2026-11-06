import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import "./fonts";
import { COLORS } from "./theme";
import { Ch01Hook } from "./scenes/ch01_hook";
import { Ch02OldWay } from "./scenes/ch02_oldway";
import { Ch03WeightSpace } from "./scenes/ch03_weightspace";
import { Ch04Reading } from "./scenes/ch04_reading";
import { Ch05Diffusion } from "./scenes/ch05_diffusion";
import { Ch06Middle } from "./scenes/ch06_middle";
import { Ch07Fixing } from "./scenes/ch07_fixing";
import { Ch08Subscribe } from "./scenes/ch08_subscribe";
import { Ch09Scratch } from "./scenes/ch09_scratch";
import { Ch10Go } from "./scenes/ch10_go";
import { Ch11Sycophant } from "./scenes/ch11_sycophant";
import { Ch12Thread } from "./scenes/ch12_thread";
import { Ch13Limits } from "./scenes/ch13_limits";
import { Ch14Math } from "./scenes/ch14_math";
import { Ch15Limits2 } from "./scenes/ch15_limits2";
import { Ch16Future } from "./scenes/ch16_future";

type ChapterDef = {
  start: number;
  end: number;
  Comp: React.FC;
};

const chapters: ChapterDef[] = [
  { start: 0, end: 59.58, Comp: Ch01Hook },
  { start: 59.58, end: 88.3, Comp: Ch02OldWay },
  { start: 88.3, end: 126.04, Comp: Ch03WeightSpace },
  { start: 126.04, end: 204.06, Comp: Ch04Reading },
  { start: 204.06, end: 237.76, Comp: Ch05Diffusion },
  { start: 237.76, end: 312.8, Comp: Ch06Middle },
  { start: 312.8, end: 393.22, Comp: Ch07Fixing },
  { start: 393.22, end: 409.12, Comp: Ch08Subscribe },
  { start: 409.12, end: 495.14, Comp: Ch09Scratch },
  { start: 495.14, end: 563.4, Comp: Ch10Go },
  { start: 563.4, end: 611.34, Comp: Ch11Sycophant },
  { start: 611.34, end: 672.92, Comp: Ch12Thread },
  { start: 672.92, end: 734.26, Comp: Ch13Limits },
  { start: 734.26, end: 880.78, Comp: Ch14Math },
  { start: 880.78, end: 942.88, Comp: Ch15Limits2 },
  { start: 942.88, end: 1041, Comp: Ch16Future },
];

export const Video: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Audio src={staticFile("audio.wav")} />
      {chapters.map(({ start, end, Comp }, i) => {
        const from = Math.round(start * fps);
        const duration = Math.max(2, Math.round(end * fps) - from);
        return (
          <Sequence key={i} from={from} durationInFrames={duration} premountFor={30}>
            <Comp />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
