import React from "react";
import { COLORS } from "../theme";
import { Beat, Chapter, drawIn, fadeOut, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { NetworkDiagram, Question, WeightMatrix } from "../components/diagrams";
import { StarCharacter } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCircle, SketchCross, SketchLine, SketchPolygon, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 204.06;
const END = 237.76;

type ShapeKind = "circle" | "square" | "triangle";

const Shape: React.FC<{
  kind: ShapeKind;
  x: number;
  y: number;
  size: number;
  draw?: number;
  filled?: boolean;
  color?: string;
}> = ({ kind, x, y, size, draw = 1, filled = false, color = COLORS.ink }) => {
  const fill = filled ? COLORS.sand : undefined;
  const fillP = filled ? 0.95 : undefined;
  if (kind === "circle") {
    return <SketchCircle cx={x} cy={y} d={size} draw={draw} fill={fill} fillP={fillP} sw={3.6} stroke={color} seed={1201} />;
  }
  if (kind === "square") {
    return <SketchRect x={x - size / 2} y={y - size / 2} w={size} h={size} radius={4} draw={draw} fill={fill} fillP={fillP} sw={3.6} stroke={color} seed={1202} />;
  }
  return (
    <SketchPolygon
      points={[
        [x, y - size * 0.56],
        [x + size * 0.54, y + size * 0.46],
        [x - size * 0.54, y + size * 0.46],
      ]}
      draw={draw}
      fill={fill}
      fillP={fillP}
      sw={3.6}
      stroke={color}
      seed={1203}
    />
  );
};

/* --------------------------------- intro --------------------------------- */

const BIntro: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <Question x={960} y={530} size={300} draw={pop(t, c(108), 0.55)} color={COLORS.red} rotate={-6} />
      </Canvas>
      <Label at={c(107)} x={960} y={170} size={64} underline>
        experiment two.
      </Label>
      <Label at={c(108)} x={960} y={760} size={56}>
        what does it draw?
      </Label>
      <Small at={c(108) + 1.2} x={960} y={850} size={28} opacity={0.45}>
        diffusion models
      </Small>
    </>
  );
};

/* -------------------------------- three shapes --------------------------- */

const shapeData: { kind: ShapeKind; name: string; seed: number }[] = [
  { kind: "circle", name: "circles", seed: 1211 },
  { kind: "square", name: "squares", seed: 1212 },
  { kind: "triangle", name: "triangles", seed: 1213 },
];

const BShapes: React.FC = () => {
  const t = useT();
  const models = drawIn(t, c(109), 0.7);
  const arrows = drawIn(t, c(110), 0.6);
  const shapes = drawIn(t, c(110) + 0.3, 0.8);
  const blocks = pop(t, c(112), 0.5);
  const checks = pop(t, c(113), 0.55);
  const score = pop(t, c(113) + 0.6, 0.5);
  return (
    <>
      <Canvas>
        {shapeData.map((s, i) => {
          const x = 400 + i * 560;
          return (
            <g key={s.kind}>
              <WeightMatrix x={x - 60} y={300} cols={5} rows={4} cell={24} draw={drawIn(t, c(109) + i * 0.12, 0.6)} seed={s.seed} />
              <SketchArrow x1={x} y1={415} x2={x} y2={490} draw={drawIn(t, c(110) + i * 0.1, 0.5)} sw={2.6} seed={1220 + i} />
              <Shape kind={s.kind} x={x} y={585} size={150} draw={drawIn(t, c(110) + 0.2 + i * 0.12, 0.7)} />
              <SketchCross x={x} y={452} size={62} draw={blocks} sw={4.5} />
              <SketchCheck x={x + 96} y={512} size={40} draw={checks} sw={5} />
            </g>
          );
        })}
      </Canvas>
      <Label at={c(109)} x={960} y={170} size={62} underline>
        three diffusion models.
      </Label>
      {shapeData.map((s, i) => (
        <Small key={s.kind} at={c(110) + 0.5 + i * 0.12} x={400 + i * 560} y={700} size={32} opacity={0.62}>
          {s.name}
        </Small>
      ))}
      <Label at={c(112)} x={960} y={790} size={44} color={COLORS.red}>
        no forward passes.
      </Label>
      <Label at={c(113) + 0.6} x={1710} y={220} size={56} color={COLORS.sage}>
        3 / 3
      </Label>
    </>
  );
};

/* -------------------------------- mistake -------------------------------- */

const BMistake: React.FC = () => {
  const t = useT();
  const left = drawIn(t, c(114), 0.7);
  const right = drawIn(t, c(116), 0.8);
  const tag = pop(t, c(117), 0.5);
  return (
    <>
      <Canvas>
        <Shape kind="circle" x={590} y={520} size={250} draw={left} />
        <Shape kind="circle" x={1330} y={520} size={250} draw={right} filled />
        <SketchArrow x1={760} y1={520} x2={1120} y2={520} draw={drawIn(t, c(116), 0.5)} sw={3} seed={1231} />
        <SketchCircle cx={1330} cy={520} d={300} draw={tag} stroke={COLORS.sage} sw={2.6} seed={1232} opacity={0.5} />
      </Canvas>
      <Label at={c(114)} x={960} y={170} size={62} underline>
        the mistake.
      </Label>
      <Label at={c(115)} x={590} y={690} size={42} color={COLORS.ink}>
        astra: outline
      </Label>
      <Label at={c(116)} x={1330} y={690} size={42} color={COLORS.red}>
        real: filled
      </Label>
      <Label at={c(117)} x={960} y={810} size={44} color={COLORS.ink} opacity={tag}>
        that tells us something.
      </Label>
    </>
  );
};

/* ------------------------------ not running it --------------------------- */

const BNotRunning: React.FC = () => {
  const t = useT();
  const net = drawIn(t, c(118) - 0.15, 0.8);
  const cross = pop(t, c(119), 0.5);
  return (
    <>
      <Canvas>
        <NetworkDiagram x={650} y={390} w={620} h={280} layers={[4, 7, 7, 3]} draw={net} seed={1241} />
        <SketchCross x={960} y={520} size={260} draw={cross} sw={7} />
      </Canvas>
      <Label at={c(118)} x={960} y={190} size={58} underline>
        not running it.
      </Label>
      <Small at={c(119) + 0.25} x={960} y={800} size={32} opacity={0.5}>
        no hidden-state cheat
      </Small>
    </>
  );
};

/* --------------------------------- edges --------------------------------- */

const EdgeSquare: React.FC<{ draw: number; x: number; y: number; size: number }> = ({ draw, x, y, size }) => {
  const h = size / 2;
  const segs = [
    [x - h, y - h, x - h / 2, y - h],
    [x, y - h, x + h, y - h],
    [x + h, y - h, x + h, y],
    [x + h, y + h / 2, x + h, y + h],
    [x + h / 2, y + h, x, y + h],
    [x - h / 2, y + h, x - h, y + h],
    [x - h, y + h / 2, x - h, y],
    [x - h, y - h / 2, x - h, y - h],
  ];
  return (
    <g>
      {segs.map((s, i) => {
        const local = Math.max(0, Math.min(1, (draw - i * 0.06) / 0.55));
        return <SketchLine key={i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} draw={local} sw={6} seed={1250 + i} />;
      })}
    </g>
  );
};

const BEdges: React.FC = () => {
  const t = useT();
  const nodes = drawIn(t, c(120), 0.8);
  const square = drawIn(t, c(121), 0.9);
  const arrow = drawIn(t, c(120) + 0.6, 0.5);
  return (
    <>
      <Canvas>
        {Array.from({ length: 8 }).map((_, i) => {
          const y = 360 + i * 52;
          const local = Math.max(0, Math.min(1, (nodes - i * 0.07) / 0.5));
          return (
            <g key={i} opacity={local}>
              <SketchCircle cx={430} cy={y} d={26} draw={local} fill={COLORS.sand} fillP={0.7} sw={2.4} seed={1260 + i} />
              <SketchLine x1={448} y1={y} x2={492} y2={y} draw={local} sw={2} seed={1270 + i} opacity={0.45} />
            </g>
          );
        })}
        <SketchLine x1={520} y1={350} x2={520} y2={734} draw={nodes} sw={2.4} seed={1280} opacity={0.35} />
        <SketchArrow x1={560} y1={540} x2={820} y2={540} draw={arrow} sw={3} seed={1281} />
        <EdgeSquare draw={square} x={1170} y={530} size={330} />
        <text x={430} y={310} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={24} fill={COLORS.ink} opacity={0.55 * nodes}>output layer</text>
      </Canvas>
      <Label at={c(120)} x={960} y={180} size={62} underline>
        the output layer.
      </Label>
      <Label at={c(121)} x={690} y={780} size={40} color={COLORS.ink} opacity={0.7}>
        one edge each.
      </Label>
      <Label at={c(122)} x={1170} y={790} size={52} color={COLORS.sage}>
        edges.
      </Label>
      <Small at={c(122) + 0.8} x={960} y={880} size={28} opacity={0.45}>
        not pixels
      </Small>
    </>
  );
};

export const Ch05Diffusion: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={207.9}>
      <BIntro />
    </Beat>
    <Beat from={207.8} to={218.86}>
      <BShapes />
    </Beat>
    <Beat from={218.8} to={227.45}>
      <BMistake />
    </Beat>
    <Beat from={227.4} to={231.15}>
      <BNotRunning />
    </Beat>
    <Beat from={230.6} to={END}>
      <BEdges />
    </Beat>
  </Chapter>
);
