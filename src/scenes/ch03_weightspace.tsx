import React from "react";
import { COLORS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Card, Label, Small } from "../components/ui";
import { CodeWindow, GameIcon, NetworkDiagram, NumberSheet, WeightMatrix } from "../components/diagrams";
import { Magnifier, Pencil, StarCharacter, StickFigure } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCircle, SketchCross, SketchLine, SketchPath, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 88.3;
const END = 126.04;

const Bandage: React.FC<{ x: number; y: number; size?: number; draw?: number }> = ({ x, y, size = 150, draw = 1 }) => {
  const p = Math.max(0, Math.min(1, draw));
  const s = size / 150;
  return (
    <g transform={`translate(${x} ${y}) rotate(-24) scale(${s})`}>
      <SketchRect x={-70} y={-34} w={140} h={68} radius={26} draw={p} fill={COLORS.sand} fillP={0.9} sw={3.4} seed={911} />
      <SketchLine x1={-16} y1={0} x2={16} y2={0} draw={p} sw={6} stroke={COLORS.red} seed={913} />
      <SketchLine x1={0} y1={-16} x2={0} y2={16} draw={p} sw={6} stroke={COLORS.red} seed={914} />
    </g>
  );
};

const BCodeVsWeights: React.FC = () => {
  const t = useT();
  const person = drawIn(t, c(49), 0.6);
  const code = drawIn(t, c(49), 0.7);
  const wall = drawIn(t, c(50), 0.8);
  const cross = pop(t, c(51) + 0.2, 0.5);
  return (
    <>
      <CodeWindow
        x={240}
        y={380}
        w={540}
        h={390}
        title="edit.py"
        draw={code}
        size={30}
        lines={[
          { text: "def fix(x):", color: COLORS.sage },
          { text: "    if x > 0:", indent: 1 },
          { text: "        return x + 1", indent: 2 },
          { text: "    return x", indent: 1 },
          { text: "" },
          { text: "# one line. one edit.", color: COLORS.ink },
        ]}
      />
      <Canvas>
        <StickFigure x={845} y={920} scale={1.05} pose="point" draw={person} glasses />
        <SketchCheck x={770} y={330} size={46} draw={person} sw={5} />
        <WeightMatrix x={1110} y={310} cols={16} rows={11} cell={30} draw={wall} seed={921} />
        <SketchCross x={1350} y={490} size={150} draw={cross} sw={6} />
      </Canvas>
      <Label at={c(48)} x={960} y={185} size={62} underline>
        the reason was simple.
      </Label>
      <Label at={c(49)} x={510} y={300} size={50} color={COLORS.ink} opacity={0.8}>
        code: by hand
      </Label>
      <Label at={c(50)} x={1350} y={720} size={54} color={COLORS.ink} opacity={0.8}>
        1,000,000 floats
      </Label>
      <Label at={c(51) + 0.2} x={1350} y={790} size={52} color={COLORS.red}>
        by hand? no.
      </Label>
    </>
  );
};

const BAssumption: React.FC = () => {
  const t = useT();
  const sheet = drawIn(t, c(52), 0.8);
  const crack = drawIn(t, c(53) + 0.1, 0.7);
  const stamp = pop(t, c(54) + 0.1, 0.55);
  return (
    <>
      <Canvas>
        <SketchRect x={540} y={300} w={840} h={420} draw={sheet} radius={6} fill={COLORS.white} sw={3.4} seed={931} />
        <SketchPath d="M 1308 300 L 1292 370 L 1322 410 L 1298 480 L 1326 540 L 1302 610 L 1322 680 L 1308 720" draw={crack} sw={4.5} stroke={COLORS.red} seed={932} />
        <g transform="rotate(-7 1165 632)">
          <SketchRect x={1040} y={590} w={250} h={84} draw={stamp} radius={6} stroke={COLORS.red} sw={4} seed={933} />
        </g>
      </Canvas>
      <Label at={c(52)} x={900} y={430} size={78} underline>
        a model couldn't.
      </Label>
      <Small at={c(52) + 0.6} x={900} y={530} size={34} opacity={0.55}>
        edit a million weights
      </Small>
      <Label at={c(54) + 0.1} x={1165} y={632} size={44} color={COLORS.red} rotate={-7}>
        out of date.
      </Label>
    </>
  );
};

const BWeightSpace: React.FC = () => {
  const t = useT();
  const step1 = pop(t, c(56), 0.55);
  const step2 = pop(t, c(57), 0.55);
  const step3 = pop(t, c(58), 0.55);
  const arrow1 = drawIn(t, c(57) - 0.2, 0.5);
  const arrow2 = drawIn(t, c(58) - 0.2, 0.5);
  const noGrad = pop(t, c(59) + 0.1, 0.5);
  return (
    <>
      <NumberSheet x={250} y={360} w={350} h={300} rotate={-2} draw={step1} rows={9} cols={4} size={15} seed={941} />
      <Canvas>
        <NetworkDiagram x={810} y={380} w={330} h={220} layers={[4, 6, 5, 3]} draw={step2} seed={942} highlight={[2]} labels={["", "parts", ""]} />
        <WeightMatrix x={1390} y={380} cols={8} rows={7} cell={34} draw={step3} seed={943} highlight={[{ r: 2, c: 4 }, { r: 2, c: 5 }, { r: 3, c: 4 }]} />
        <Pencil x={1650} y={560} len={130} draw={step3} rotate={-58} />
        <SketchArrow x1={620} y1={510} x2={790} y2={510} draw={arrow1} sw={3.2} seed={944} />
        <SketchArrow x1={1160} y1={510} x2={1370} y2={510} draw={arrow2} sw={3.2} seed={945} />
      </Canvas>
      <Label at={c(55)} x={960} y={180} size={86} underline>
        weight-space programming
      </Label>
      <Label at={c(56)} x={425} y={710} size={48}>
        reads the weights
      </Label>
      <Label at={c(57)} x={975} y={710} size={48}>
        what each part computes
      </Label>
      <Label at={c(58)} x={1510} y={710} size={48}>
        writes new weights
      </Label>
      <Small at={c(56) + 0.2} x={425} y={790} size={28} opacity={0.5}>
        as text
      </Small>
      <Small at={c(58) + 0.2} x={1510} y={790} size={28} opacity={0.5}>
        no retraining
      </Small>
      <Label at={c(59) + 0.1} x={960} y={880} size={48} color={COLORS.red}>
        no gradient descent.
      </Label>
    </>
  );
};

const BNoFeedback: React.FC = () => {
  const t = useT();
  const loop = drawIn(t, c(60), 0.8);
  const game = drawIn(t, c(61) - 0.2, 0.7);
  const cross = pop(t, c(61) + 0.5, 0.45);
  return (
    <>
      <Canvas>
        <StarCharacter x={500} y={560} size={190} draw={pop(t, c(60), 0.55)} tool="pencil" />
        <WeightMatrix x={810} y={340} cols={10} rows={7} cell={38} draw={loop} seed={951} highlight={[{ r: 3, c: 5 }, { r: 3, c: 6 }]} />
        <GameIcon kind="breakout" x={1480} y={510} size={200} draw={game} />
        <SketchArrow x1={1360} y1={510} x2={1220} y2={510} draw={drawIn(t, c(61) + 0.1, 0.5)} sw={3.2} seed={953} />
        <SketchCross x={1290} y={510} size={88} draw={cross} sw={5} />
      </Canvas>
      <Label at={c(60)} x={960} y={190} size={64} underline>
        no gradient descent.
      </Label>
      <Label at={c(61)} x={1290} y={665} size={44} color={COLORS.red}>
        no feedback.
      </Label>
      <Small at={c(61) + 0.9} x={1290} y={725} size={30} opacity={0.5}>
        no environment.
      </Small>
    </>
  );
};

const BThreeSkills: React.FC = () => {
  const t = useT();
  const read = pop(t, c(63) - 0.2, 0.55);
  const fix = pop(t, c(63) + 0.8, 0.55);
  const write = pop(t, c(63) + 1.8, 0.55);
  const focus = pop(t, c(65) + 0.8, 0.5);
  return (
    <>
      <Canvas>
        <SketchCircle cx={430} cy={500} d={190} draw={read} fill={COLORS.white} sw={3.2} seed={961} />
        <SketchCircle cx={960} cy={500} d={190} draw={fix} fill={COLORS.white} sw={3.2} seed={962} />
        <SketchCircle cx={1490} cy={500} d={190} draw={write} fill={COLORS.white} sw={3.2} seed={963} />
        <Magnifier x={430} y={500} size={110} draw={read} />
        <Bandage x={960} y={500} size={160} draw={fix} />
        <Pencil x={1440} y={550} len={150} draw={write} rotate={-40} />
        <SketchCircle cx={430} cy={500} d={230} draw={focus} stroke={COLORS.sage} sw={3} seed={964} />
      </Canvas>
      <Label at={c(62)} x={960} y={190} size={74} underline>
        three skills.
      </Label>
      <Label at={c(63) - 0.2} x={430} y={680} size={56}>
        reading
      </Label>
      <Label at={c(63) + 0.8} x={960} y={680} size={56}>
        fixing
      </Label>
      <Label at={c(63) + 1.8} x={1490} y={680} size={56}>
        writing
      </Label>
      <Small at={c(64)} x={1490} y={750} size={30} opacity={0.55}>
        from scratch
      </Small>
      <Small at={c(65)} x={960} y={860} size={32} opacity={0.5}>
        one at a time.
      </Small>
    </>
  );
};

export const Ch03WeightSpace: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={94.7}>
      <BCodeVsWeights />
    </Beat>
    <Beat from={94.6} to={100.75}>
      <BAssumption />
    </Beat>
    <Beat from={100.65} to={112.9}>
      <BWeightSpace />
    </Beat>
    <Beat from={112.8} to={117.95}>
      <BNoFeedback />
    </Beat>
    <Beat from={117.85} to={END}>
      <BThreeSkills />
    </Beat>
  </Chapter>
);
