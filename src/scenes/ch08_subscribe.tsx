import React from "react";
import { COLORS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { StarCharacter } from "../components/figures";
import { SketchArrow, SketchLine, SketchPolygon, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 393.22;
const END = 409.12;

/* -------------------------------- the pause ------------------------------ */

const BSubscribe: React.FC = () => {
  const t = useT();
  const card = pop(t, c(201) - 0.1, 0.5);
  const star = pop(t, c(199) + 0.4, 0.6);
  return (
    <>
      <Canvas>
        <SketchRect x={700} y={340} w={520} h={150} draw={card} radius={20} fill={COLORS.white} stroke={COLORS.red} sw={4} seed={1701} />
        <SketchPolygon points={[[790, 390], [790, 440], [836, 415]]} draw={card} fill={COLORS.red} sw={2} seed={1702} fillP={0.9} />
        <StarCharacter x={1490} y={650} size={190} draw={star} tool="pencil" />
      </Canvas>
      <Label at={c(199)} x={960} y={150} size={58} underline>
        quick pause.
      </Label>
      <Label at={c(200)} x={960} y={560} size={34} opacity={0.55}>
        if this is useful.
      </Label>
      <Label at={c(201)} x={1015} y={415} size={72} color={COLORS.red} opacity={card}>
        subscribe
      </Label>
      <Small at={c(202)} x={960} y={690} size={30} opacity={0.42}>
        more papers, in plain English.
      </Small>
      <Small at={c(204)} x={960} y={750} size={28} opacity={0.35}>
        help keep it going.
      </Small>
    </>
  );
};

/* --------------------------------- the ask ------------------------------- */

const BCheap: React.FC = () => {
  const t = useT();
  const paper = pop(t, c(207), 0.6);
  return (
    <>
      <Canvas>
        <SketchRect x={1390} y={590} w={170} h={220} draw={paper} radius={6} fill={COLORS.white} sw={3} seed={1711} />
        <SketchLine x1={1420} y1={645} x2={1530} y2={645} draw={paper} sw={2.2} opacity={0.35} seed={1712} />
        <SketchLine x1={1420} y1={690} x2={1530} y2={690} draw={paper} sw={2.2} opacity={0.35} seed={1713} />
        <SketchLine x1={1420} y1={735} x2={1500} y2={735} draw={paper} sw={2.2} opacity={0.35} seed={1714} />
        <SketchArrow x1={1190} y1={710} x2={1350} y2={710} draw={paper} sw={2.8} seed={1715} />
      </Canvas>
      <Label at={c(205)} x={960} y={350} size={110} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        2 seconds.
      </Label>
      <Label at={c(205) + 0.35} x={960} y={500} size={44} opacity={0.65}>
        it's free.
      </Label>
      <Label at={c(206)} x={960} y={575} size={44} opacity={0.65}>
        it helps.
      </Label>
      <Label at={c(207)} x={960} y={730} size={38} underline>
        okay, back to the paper.
      </Label>
      <Small at={c(207) + 0.6} x={1475} y={840} size={26} opacity={0.35}>
        the paper
      </Small>
    </>
  );
};

export const Ch08Subscribe: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={403.55}>
      <BSubscribe />
    </Beat>
    <Beat from={403.45} to={END}>
      <BCheap />
    </Beat>
  </Chapter>
);
