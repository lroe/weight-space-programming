import React from "react";
import { COLORS } from "../theme";
import { Beat, Chapter, drawIn, pop, tween, useT } from "../lib/time";
import { Canvas, Card, Label, Small } from "../components/ui";
import { LossCurve, NetworkDiagram, Question, WeightMatrix } from "../components/diagrams";
import { StarCharacter, StickFigure } from "../components/figures";
import { SketchArrow, SketchCircle, SketchLine, SketchPath, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 59.58;
const END = 88.3;

const BOldWay: React.FC = () => {
  const t = useT();
  const net = drawIn(t, c(32), 0.8);
  const curve = drawIn(t, c(33), 0.9);
  const ball = tween(t, c(33) + 0.3, 2.0, 0.2, 0.52);
  const adam = pop(t, c(34), 0.45);
  const muon = pop(t, c(34) + 0.35, 0.45);
  return (
    <>
      <Canvas>
        <NetworkDiagram x={300} y={390} w={270} h={210} layers={[4, 5, 3]} draw={net} seed={701} nodeR={10} />
        <LossCurve x={780} y={390} w={820} h={310} draw={curve} ball={ball} local label="loss" />
        <SketchArrow x1={570} y1={520} x2={735} y2={520} draw={drawIn(t, c(33) - 0.1, 0.5)} sw={3.2} seed={702} />
        <SketchRect x={870} y={770} w={170} h={62} draw={adam} radius={18} seed={703} fill={COLORS.sand} fillP={0.4} />
        <SketchRect x={1080} y={770} w={170} h={62} draw={muon} radius={18} seed={704} fill={COLORS.sand} fillP={0.4} />
      </Canvas>
      <Label at={c(32)} x={960} y={170} size={68} underline>
        the old way.
      </Label>
      <Label at={c(32)} x={435} y={330} size={42} opacity={0.65}>
        a neural network
      </Label>
      <Label at={c(33)} x={1190} y={305} size={62} underline>
        gradient descent
      </Label>
      <Small at={c(34)} x={955} y={800} size={34} opacity={0.9}>
        Adam
      </Small>
      <Small at={c(34) + 0.35} x={1165} y={800} size={34} opacity={0.9}>
        Muon
      </Small>
      <Small at={c(35)} x={960} y={890} size={28} opacity={0.5}>
        small, simple algorithms
      </Small>
    </>
  );
};

const BBlind: React.FC = () => {
  const t = useT();
  const gear = drawIn(t, c(35) + 0.15, 0.7);
  const question = pop(t, c(36), 0.45);
  const matrix = drawIn(t, c(37) + 0.15, 0.8);
  return (
    <>
      <Canvas>
        <Gear x={470} y={560} size={268} draw={gear} />
        <Question x={655} y={350} size={150} draw={question} color={COLORS.red} rotate={-8} />
        <SketchCircle cx={575} cy={445} d={12} draw={question} stroke={COLORS.ink} sw={2.4} seed={709} />
        <SketchCircle cx={602} cy={410} d={18} draw={question} stroke={COLORS.ink} sw={2.4} seed={710} />
        <SketchCircle cx={626} cy={374} d={26} draw={question} stroke={COLORS.ink} sw={2.4} seed={717} />
        <WeightMatrix
          x={1080}
          y={340}
          cols={12}
          rows={8}
          cell={42}
          draw={matrix}
          seed={712}
          numbers={false}
          highlight={[{ r: 2, c: 4 }, { r: 2, c: 5 }, { r: 3, c: 4 }]}
        />
        <SketchArrow x1={640} y1={560} x2={1050} y2={560} draw={pop(t, c(37) + 0.2, 0.45)} sw={3.4} seed={713} />
      </Canvas>
      <Label at={c(35)} x={960} y={175} size={68} underline>
        small. simple.
      </Label>
      <Small at={c(36)} x={470} y={760} size={34} opacity={0.62}>
        no understanding.
      </Small>
      <Label at={c(37) + 0.6} x={845} y={505} size={46} color={COLORS.red}>
        nudge
      </Label>
      <Small at={c(37) + 1.1} x={845} y={620} size={30} opacity={0.5}>
        lower the loss
      </Small>
      <Label at={c(38)} x={1330} y={790} size={54} color={COLORS.ink}>
        millions of times.
      </Label>
    </>
  );
};

const Gear: React.FC<{ x: number; y: number; size: number; draw: number }> = ({ x, y, size, draw }) => {
  const p = Math.max(0, Math.min(1, draw));
  const r = size / 2;
  const teeth = 10;
  return (
    <g>
      <SketchCircle cx={x} cy={y} d={size * 0.7} draw={p} fill={COLORS.sand} fillP={0.35} sw={4} seed={721} />
      {Array.from({ length: teeth }).map((_, i) => {
        const a = (i / teeth) * Math.PI * 2;
        return (
          <SketchLine
            key={i}
            x1={x + Math.cos(a) * r * 0.64}
            y1={y + Math.sin(a) * r * 0.64}
            x2={x + Math.cos(a) * r * 0.98}
            y2={y + Math.sin(a) * r * 0.98}
            draw={p}
            sw={9}
            seed={730 + i}
          />
        );
      })}
      <SketchCircle cx={x} cy={y} d={size * 0.22} draw={p} sw={3} seed={750} />
    </g>
  );
};

const IdeaCard: React.FC<{
  x: number;
  y: number;
  label: string;
  at: number;
  kind: "prompt" | "code" | "agent" | "sliders";
  draw: number;
  delay?: number;
}> = ({ x, y, label, at, kind, draw }) => {
  return (
    <Card x={x} y={y} w={600} h={230} fill={COLORS.white} draw={draw} seed={760 + Math.round(x)}>
      <svg width="100%" height="100%" viewBox="0 0 544 174" style={{ display: "block" }}>
        {kind === "prompt" ? (
          <>
            <SketchRect x={36} y={40} w={230} h={86} radius={18} draw={draw} fill={COLORS.sand} fillP={0.4} sw={2.6} seed={771} />
            <SketchLine x1={70} y1={70} x2={210} y2={70} draw={draw} sw={2.2} seed={772} />
            <SketchLine x1={70} y1={94} x2={160} y2={94} draw={draw} sw={2.2} seed={773} />
            <SketchPath d="M 120 126 L 112 146 L 148 128" draw={draw} sw={2.4} seed={774} />
          </>
        ) : null}
        {kind === "code" ? (
          <>
            <SketchRect x={36} y={34} w={244} h={106} radius={6} draw={draw} fill={COLORS.white} sw={2.6} seed={781} />
            <SketchLine x1={64} y1={62} x2={170} y2={62} draw={draw} sw={2.6} seed={782} />
            <SketchLine x1={82} y1={84} x2={200} y2={84} draw={draw} sw={2.2} seed={783} stroke={COLORS.sage} />
            <SketchLine x1={82} y1={106} x2={150} y2={106} draw={draw} sw={2.2} seed={784} stroke={COLORS.red} />
          </>
        ) : null}
        {kind === "agent" ? (
          <>
            <SketchCircle cx={100} cy={80} d={34} draw={draw} fill={COLORS.sand} sw={2.4} seed={791} />
            <SketchCircle cx={190} cy={48} d={30} draw={draw} fill={COLORS.sand} sw={2.4} seed={792} />
            <SketchCircle cx={190} cy={118} d={30} draw={draw} fill={COLORS.sand} sw={2.4} seed={793} />
            <SketchLine x1={118} y1={72} x2={172} y2={54} draw={draw} sw={2} seed={794} />
            <SketchLine x1={118} y1={88} x2={172} y2={110} draw={draw} sw={2} seed={795} />
          </>
        ) : null}
        {kind === "sliders" ? (
          <>
            {[52, 88, 124].map((yy, i) => (
              <g key={i}>
                <SketchLine x1={40} y1={yy} x2={240} y2={yy} draw={draw} sw={2.2} seed={800 + i} />
                <circle cx={80 + i * 48} cy={yy} r={9} fill={COLORS.sand} stroke={COLORS.ink} strokeWidth={2.4} opacity={draw} />
              </g>
            ))}
            <text x={258} y={60} fontFamily="'Patrick Hand', cursive" fontSize={24} fill={COLORS.ink} opacity={0.6 * draw}>lr</text>
            <text x={258} y={96} fontFamily="'Patrick Hand', cursive" fontSize={24} fill={COLORS.ink} opacity={0.6 * draw}>batch</text>
            <text x={258} y={132} fontFamily="'Patrick Hand', cursive" fontSize={24} fill={COLORS.ink} opacity={0.6 * draw}>schedule</text>
          </>
        ) : null}
      </svg>
      <div style={{ position: "absolute", left: 28, bottom: 18, fontFamily: "'Caveat', cursive", fontSize: 46, fontWeight: 600, color: COLORS.ink }}>{label}</div>
    </Card>
  );
};

const BImprove: React.FC = () => {
  const t = useT();
  const p1 = pop(t, c(41), 0.55);
  const p2 = pop(t, c(42), 0.55);
  const p3 = pop(t, c(43), 0.55);
  const p4 = pop(t, c(44), 0.55);
  const hyper = pop(t, c(45), 0.5);
  return (
    <>
      <div style={{ position: "absolute", left: 300, top: 300, opacity: p1 }}>
        <IdeaCard x={0} y={0} label="prompts" at={c(41)} kind="prompt" draw={p1} />
      </div>
      <div style={{ position: "absolute", left: 1020, top: 300, opacity: p2 }}>
        <IdeaCard x={0} y={0} label="programs" at={c(42)} kind="code" draw={p2} />
      </div>
      <div style={{ position: "absolute", left: 300, top: 590, opacity: p3 }}>
        <IdeaCard x={0} y={0} label="agents" at={c(43)} kind="agent" draw={p3} />
      </div>
      <div style={{ position: "absolute", left: 1020, top: 590, opacity: p4 }}>
        <IdeaCard x={0} y={0} label="training code" at={c(44)} kind="sliders" draw={p4} />
      </div>
      <Canvas>
        <SketchPath d="M 340 275 Q 960 230 1580 275" draw={drawIn(t, c(39), 0.7)} sw={2.4} seed={810} opacity={0.35} />
      </Canvas>
      <Label at={c(39)} x={960} y={190} size={72} underline>
        language models, everywhere.
      </Label>
    </>
  );
};

const BLine: React.FC = () => {
  const t = useT();
  const line = drawIn(t, c(46) + 0.1, 0.7);
  const star = pop(t, c(46) + 0.5, 0.5);
  const arrow = drawIn(t, c(47) - 0.3, 0.6);
  const weights = drawIn(t, c(47) + 0.1, 0.8);
  const cross = pop(t, c(47) + 0.1, 0.4);
  const tags = pop(t, c(46) + 1.0, 0.45);
  return (
    <>
      <Canvas>
        <SketchLine x1={960} y1={250} x2={960} y2={820} draw={line} sw={5} seed={821} roughness={1.4} />
        <StarCharacter x={565} y={600} size={170} draw={star} tool="pencil" />
        <SketchArrow x1={700} y1={600} x2={915} y2={600} draw={arrow} sw={3.4} seed={822} />
        <SketchLine x1={918} y1={558} x2={1002} y2={642} draw={cross} sw={4} stroke={COLORS.red} seed={823} />
        <SketchLine x1={1002} y1={558} x2={918} y2={642} draw={cross} sw={4} stroke={COLORS.red} seed={824} />
        <WeightMatrix x={1120} y={370} cols={10} rows={7} cell={38} draw={weights} seed={825} />
        <Gear x={1380} y={750} size={120} draw={drawIn(t, c(47) + 0.5, 0.6)} />
      </Canvas>
      <Label at={c(46)} x={960} y={190} size={74} underline>
        one line.
      </Label>
      <Label at={c(47)} x={1420} y={300} size={42} color={COLORS.red}>
        weights + optimizers
      </Label>
      <div style={{ position: "absolute", left: 360, top: 300, fontFamily: "'Patrick Hand', cursive", fontSize: 30, color: COLORS.ink, lineHeight: 1.7, opacity: tags * 0.8 }}>
        prompts<br />code<br />agents
      </div>
      <Small at={c(46) + 1.0} x={565} y={790} size={30} opacity={0.55}>
        everything else
      </Small>
    </>
  );
};

export const Ch02OldWay: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={65.75}>
      <BOldWay />
    </Beat>
    <Beat from={65.65} to={73.45}>
      <BBlind />
    </Beat>
    <Beat from={73.35} to={83.1}>
      <BImprove />
    </Beat>
    <Beat from={83.0} to={END}>
      <BLine />
    </Beat>
  </Chapter>
);
