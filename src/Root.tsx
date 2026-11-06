import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";
import { FPS, W, H, DURATION } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AstraWeightSpace"
      component={Video}
      durationInFrames={Math.round(DURATION * FPS)}
      fps={FPS}
      width={W}
      height={H}
    />
  );
};
