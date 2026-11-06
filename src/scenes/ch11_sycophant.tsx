import React from "react";
import { COLORS, FONTS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Card, Label, Small } from "../components/ui";
import { Bubble, NetworkDiagram, Sparkle, WeightMatrix } from "../components/diagrams";
import { Institute, Magnifier, StarCharacter } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCircle, SketchLine, SketchPath, SketchPolygon, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 563.4;
const END = 611.34;

/* ------------------------------ real life -------------------------------- */

const BReal: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <Institute x={1280} y={930} w={320} h={250} draw={drawIn(t, c(279) + 0.2, 0.8)} />
      </Canvas>
      <Label at={c(279)} x={640} y={400} size={64} underline>
        a test closer to real life.
      </Label>
      <Small at={c(279) + 0.7} x={640} y={555} size={30} opacity={0.42}>
        outside the lab
      </Small>
    </>
  );
};

/* -------------------------------- safety --------------------------------- */

const BSafety: React.FC = () => {
  const t = useT();
  const net = drawIn(t, c(283) - 0.05, 0.85);
  const glass = pop(t, c(283) + 0.25, 0.6);
  return (
    <>
      <Canvas>
        <NetworkDiagram
          x={420}
          y={380}
          w={520}
          h={260}
          layers={[4, 5, 3]}
          draw={net}
          seed={2001}
          nodeR={12}
          nodeHighlights={[{ layer: 2, node: 1, color: COLORS.red }]}
        />
        <Magnifier x={1090} y={510} size={150} draw={glass} />
        <SketchArrow x1={1015} y1={510} x2={950} y2={510} draw={drawIn(t, c(283) + 0.5, 0.5)} sw={2.6} stroke={COLORS.red} seed={2002} />
      </Canvas>
      <Small at={c(280)} x={960} y={235} size={28} opacity={0.4}>
        experiment seven
      </Small>
      <Label at={c(281)} x={960} y={150} size={60} underline>
        spot the sycophant.
      </Label>
      <Label at={c(282)} x={960} y={305} size={34} opacity={0.55}>
        a safety question.
      </Label>
      <Label at={c(283) + 0.3} x={960} y={720} size={34} color={COLORS.red} opacity={0.8}>
        a bad behavior?
      </Label>
      <Small at={c(284)} x={960} y={790} size={30} opacity={0.45}>
        without running it.
      </Small>
      <Small at={c(285)} x={960} y={855} size={28} opacity={0.35}>
        that was the task
      </Small>
    </>
  );
};

/* -------------------------------- biased --------------------------------- */

const BBiased: React.FC = () => {
  const t = useT();
  const prompt = pop(t, c(286) - 0.05, 0.5);
  const biased = pop(t, c(287) - 0.05, 0.5);
  const honest = pop(t, c(287) + 0.2, 0.5);
  const pick = pop(t, c(288), 0.5);
  return (
    <>
      <div style={{ opacity: prompt }}>
        <Bubble x={260} y={250} w={620} h={150} text="is this stock a good buy?" from="user" draw={prompt} size={30} />
      </div>
      <div style={{ opacity: biased }}>
        <Card x={260} y={460} w={620} h={150} fill={COLORS.white} stroke={COLORS.red} draw={biased} seed={2011}>
          <div style={{ fontFamily: FONTS.display, fontSize: 42, fontWeight: 600, color: COLORS.red }}>yes, definitely.</div>
          <div style={{ marginTop: 10, fontFamily: FONTS.label, fontSize: 24, color: COLORS.ink, opacity: 0.45 }}>the favorable answer</div>
        </Card>
      </div>
      <div style={{ opacity: honest }}>
        <Card x={260} y={650} w={620} h={150} fill={COLORS.white} stroke={COLORS.sage} draw={honest} seed={2012}>
          <div style={{ fontFamily: FONTS.display, fontSize: 42, fontWeight: 600, color: COLORS.sage }}>here's the risk.</div>
          <div style={{ marginTop: 10, fontFamily: FONTS.label, fontSize: 24, color: COLORS.ink, opacity: 0.45 }}>the honest answer</div>
        </Card>
      </div>
      <Canvas>
        <SketchCheck x={930} y={525} size={44} color={COLORS.red} draw={pick} sw={5} />
        <SketchArrow x1={1375} y1={585} x2={985} y2={540} draw={drawIn(t, c(288) + 0.2, 0.5)} sw={2.6} stroke={COLORS.red} seed={2013} />
        <StarCharacter x={1480} y={620} size={180} draw={pop(t, c(288) + 0.25, 0.6)} tool="magnifier" />
      </Canvas>
      <Label at={c(286)} x={960} y={150} size={58} underline>
        the biased answer.
      </Label>
      <Small at={c(288) + 0.6} x={1480} y={800} size={28} color={COLORS.red} opacity={0.55}>
        picked this one
      </Small>
    </>
  );
};

/* --------------------------------- score --------------------------------- */

const BWin: React.FC = () => {
  const t = useT();
  const bar = drawIn(t, c(289) + 0.1, 0.7);
  return (
    <>
      <Canvas>
        <SketchRect x={660} y={700} w={600} h={40} draw={bar} radius={4} sw={2.4} seed={2021} />
        <rect x={662} y={702} width={438 * bar} height={36} rx={3} fill={COLORS.sage} opacity={0.22} />
      </Canvas>
      <Small at={c(289)} x={960} y={240} size={30} opacity={0.4}>
        the score
      </Small>
      <Label at={c(289)} x={960} y={390} size={180} color={COLORS.sage}>
        73%
      </Label>
      <Small at={c(289) + 0.2} x={960} y={520} size={32} opacity={0.5}>
        of the time
      </Small>
      <Label at={c(290)} x={960} y={600} size={34} color={COLORS.ink} opacity={0.7}>
        without running the model.
      </Label>
    </>
  );
};

/* -------------------------------- spaces --------------------------------- */

const BSpaces: React.FC = () => {
  const t = useT();
  const matrix = drawIn(t, c(291) - 0.05, 0.8);
  const slices = drawIn(t, c(292) - 0.05, 0.7);
  return (
    <>
      <Canvas>
        <WeightMatrix x={300} y={330} cols={14} rows={9} cell={30} gap={3} draw={matrix} seed={2031} />
        <SketchLine x1={300} y1={330} x2={762} y2={627} draw={slices} sw={4} stroke={COLORS.red} opacity={0.6} seed={2032} />
        <SketchLine x1={762} y1={330} x2={300} y2={627} draw={slices} sw={4} stroke={COLORS.sage} opacity={0.6} seed={2033} />
        <SketchRect x={1080} y={350} w={320} h={180} draw={slices} radius={12} fill={COLORS.white} sw={2.6} seed={2034} />
        <SketchRect x={1080} y={570} w={320} h={180} draw={slices} radius={12} fill={COLORS.white} sw={2.6} seed={2035} />
        <text x={1240} y={450} textAnchor="middle" fontFamily={FONTS.display} fontSize={40} fontWeight={600} fill={COLORS.red} opacity={0.7 * slices}>
          space one
        </text>
        <text x={1240} y={670} textAnchor="middle" fontFamily={FONTS.display} fontSize={40} fontWeight={600} fill={COLORS.sage} opacity={0.7 * slices}>
          space two
        </text>
      </Canvas>
      <Label at={c(291)} x={960} y={150} size={54} underline>
        slicing the representations.
      </Label>
      <Small at={c(291) + 0.7} x={545} y={720} size={28} opacity={0.4}>
        internal activations
      </Small>
    </>
  );
};

/* ------------------------------- two spaces ------------------------------ */

const SpacePlane: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label: string;
  draw: number;
  flip?: boolean;
}> = ({ x, y, w, h, color, label, draw, flip = false }) => {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const vx = flip ? x + w * 0.24 : x + w * 0.76;
  const vy = y + h * 0.24;
  return (
    <g opacity={draw}>
      <SketchLine x1={x} y1={cy} x2={x + w} y2={cy} draw={draw} sw={2.4} opacity={0.4} seed={2041} />
      <SketchLine x1={cx} y1={y} x2={cx} y2={y + h} draw={draw} sw={2.4} opacity={0.4} seed={2042} />
      {[0.25, 0.75].map((u, i) => (
        <SketchLine key={u} x1={x + w * u} y1={y + 20} x2={x + w * u} y2={y + h - 20} draw={draw} sw={1.4} opacity={0.12} seed={2043 + i} />
      ))}
      <SketchArrow x1={cx} y1={cy} x2={vx} y2={vy} draw={draw} sw={4} stroke={color} seed={2044} />
      <text x={cx} y={y + h + 40} textAnchor="middle" fontFamily={FONTS.label} fontSize={30} fill={COLORS.ink} opacity={0.62 * draw}>
        {label}
      </text>
    </g>
  );
};

const BTwoSpaces: React.FC = () => {
  const t = useT();
  const one = drawIn(t, c(293) - 0.05, 0.7);
  const two = drawIn(t, c(294) - 0.05, 0.7);
  const hit = pop(t, c(295) - 0.05, 0.5);
  return (
    <>
      <Canvas>
        <SpacePlane x={260} y={340} w={520} h={420} color={COLORS.sage} label="same as request" draw={one} />
        <SpacePlane x={1140} y={340} w={520} h={420} color={COLORS.red} label="plausibility" draw={two} flip />
        <SketchArrow x1={700} y1={550} x2={925} y2={550} draw={hit} sw={3.2} stroke={COLORS.red} seed={2051} />
        <SketchArrow x1={1220} y1={550} x2={995} y2={550} draw={hit} sw={3.2} stroke={COLORS.red} seed={2052} />
        <Sparkle x={960} y={550} size={34} draw={hit} color={COLORS.red} />
      </Canvas>
      <Label at={c(293)} x={960} y={150} size={54} underline>
        two spaces.
      </Label>
      <Label at={c(295) + 0.15} x={960} y={650} size={36} color={COLORS.red} opacity={hit}>
        collision.
      </Label>
    </>
  );
};

/* ---------------------------------- fix ---------------------------------- */

const BFix: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchCircle cx={700} cy={560} d={70} draw={pop(t, c(296) + 0.2, 0.4)} stroke={COLORS.sage} sw={2.6} seed={2061} />
        <SketchCircle cx={1220} cy={560} d={70} draw={pop(t, c(296) + 0.3, 0.4)} stroke={COLORS.red} sw={2.6} seed={2062} />
        <StarCharacter x={1480} y={620} size={180} draw={pop(t, c(296) + 0.35, 0.6)} tool="pencil" />
      </Canvas>
      <Label at={c(296)} x={960} y={150} size={58} underline>
        fix the prompt.
      </Label>
      <Label at={c(296) + 0.2} x={960} y={390} size={60} color={COLORS.ink} underline>
        found the spaces.
      </Label>
      <Small at={c(296) + 0.4} x={700} y={650} size={28} color={COLORS.sage} opacity={0.6}>
        same
      </Small>
      <Small at={c(296) + 0.5} x={1220} y={650} size={28} color={COLORS.red} opacity={0.6}>
        plausible
      </Small>
      <Small at={c(296) + 0.8} x={1480} y={800} size={28} opacity={0.4}>
        Astra
      </Small>
    </>
  );
};

/* ------------------------------- untangle -------------------------------- */

const BUntangle: React.FC = () => {
  const t = useT();
  const tangle = drawIn(t, c(297) - 0.05, 0.8);
  const clean = drawIn(t, c(298) - 0.05, 0.7);
  return (
    <>
      <Canvas>
        <SketchPath d="M 300 460 C 380 380 460 620 540 540 S 660 460 700 500" draw={tangle} sw={3} stroke={COLORS.sage} seed={2071} />
        <SketchPath d="M 300 540 C 380 620 460 380 540 460 S 660 540 700 500" draw={tangle} sw={3} stroke={COLORS.red} seed={2072} />
        <SketchArrow x1={720} y1={500} x2={780} y2={500} draw={drawIn(t, c(297) + 0.3, 0.4)} sw={2.6} head={13} seed={2073} />
        <SketchLine x1={800} y1={460} x2={1100} y2={460} draw={clean} sw={3.2} stroke={COLORS.sage} seed={2074} />
        <SketchLine x1={800} y1={540} x2={1100} y2={540} draw={clean} sw={3.2} stroke={COLORS.red} seed={2075} />
        <SketchRect x={1250} y={390} w={380} h={220} draw={clean} radius={12} fill={COLORS.white} sw={2.8} seed={2076} />
        <SketchRect x={1270} y={370} w={340} h={190} draw={clean} radius={10} fill={COLORS.white} sw={2} seed={2077} opacity={0.4} />
        <text x={1440} y={470} textAnchor="middle" fontFamily={FONTS.display} fontSize={42} fontWeight={600} fill={COLORS.ink} opacity={0.75 * clean}>
          prompt
        </text>
        <text x={1440} y={520} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.4 * clean}>
          resampled
        </text>
        <SketchPolygon points={[[1420, 580], [1420, 630], [1465, 605]]} draw={clean} fill={COLORS.red} fillP={0.85} sw={2} seed={2078} />
      </Canvas>
      <Label at={c(297)} x={960} y={150} size={50} underline>
        untangle. resample. run.
      </Label>
      <Small at={c(297) + 0.4} x={500} y={700} size={28} opacity={0.4}>
        tangled
      </Small>
      <Small at={c(298) + 0.2} x={950} y={700} size={28} opacity={0.4}>
        separated
      </Small>
    </>
  );
};

/* --------------------------------- loop ---------------------------------- */

const BLoop: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <StarCharacter x={1480} y={620} size={180} draw={pop(t, c(299) + 0.3, 0.6)} tool="magnifier" />
      </Canvas>
      <Label at={c(299)} x={960} y={380} size={64} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        a model diagnostic loop.
      </Label>
      <Small at={c(299) + 0.4} x={960} y={500} size={32} opacity={0.45}>
        find · untangle · run
      </Small>
    </>
  );
};

export const Ch11Sycophant: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={567.25}>
      <BReal />
    </Beat>
    <Beat from={567.15} to={577.65}>
      <BSafety />
    </Beat>
    <Beat from={577.55} to={584.5}>
      <BBiased />
    </Beat>
    <Beat from={584.4} to={588.95}>
      <BWin />
    </Beat>
    <Beat from={588.85} to={593.85}>
      <BSpaces />
    </Beat>
    <Beat from={593.75} to={602.8}>
      <BTwoSpaces />
    </Beat>
    <Beat from={602.7} to={605.4}>
      <BFix />
    </Beat>
    <Beat from={605.3} to={608.8}>
      <BUntangle />
    </Beat>
    <Beat from={608.7} to={END}>
      <BLoop />
    </Beat>
  </Chapter>
);
