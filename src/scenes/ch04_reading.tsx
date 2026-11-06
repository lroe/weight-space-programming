import React from "react";
import { COLORS } from "../theme";
import { Beat, Chapter, drawIn, fadeOut, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { GameIcon, NetworkDiagram, WeightMatrix } from "../components/diagrams";
import { StarCharacter } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCircle, SketchLine, SketchPath, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 126.04;
const END = 204.06;

/* --------------------------------- skill one ----------------------------- */

const BSkillOne: React.FC = () => {
  const t = useT();
  const star = pop(t, c(66) - 0.1, 0.55);
  const matrix = drawIn(t, c(66) + 0.4, 0.85);
  const arrow = drawIn(t, c(67) - 0.1, 0.5);
  return (
    <>
      <Canvas>
        <StarCharacter x={610} y={610} size={210} draw={star} tool="magnifier" />
        <WeightMatrix x={1040} y={370} cols={12} rows={9} cell={31} draw={matrix} seed={1001} highlight={[{ r: 3, c: 5 }, { r: 3, c: 6 }]} />
        <SketchArrow x1={810} y1={620} x2={1010} y2={560} draw={arrow} sw={3.2} seed={1002} bend={-0.15} />
        <SketchCircle cx={1200} cy={500} d={92} draw={arrow} stroke={COLORS.red} sw={3} seed={1003} />
      </Canvas>
      <Label at={c(66)} x={960} y={170} size={64} underline>
        skill one: reading.
      </Label>
      <Label at={c(67)} x={960} y={820} size={54} color={COLORS.ink}>
        name the game.
      </Label>
      <Small at={c(67) + 0.5} x={960} y={890} size={28} opacity={0.45}>
        from the numbers alone
      </Small>
    </>
  );
};

/* ---------------------------------- ppo ---------------------------------- */

const BPPOFlow: React.FC = () => {
  const t = useT();
  const quick = fadeOut(t, c(71) - 0.25, 0.25);
  const title = pop(t, c(71), 0.5);
  const net = drawIn(t, c(72), 0.85);
  const game = pop(t, c(73), 0.55);
  const score = pop(t, c(75), 0.55);
  const back = drawIn(t, c(76), 0.8);
  const good = pop(t, c(77), 0.5);
  return (
    <>
      <Canvas>
        <NetworkDiagram x={250} y={390} w={290} h={210} layers={[4, 6, 5, 3]} draw={net} seed={1011} />
        <SketchArrow x1={570} y1={500} x2={690} y2={500} draw={drawIn(t, c(72) + 0.5, 0.5)} sw={3.2} seed={1012} />
        <GameIcon kind="breakout" x={810} y={500} size={190} draw={game} />
        <SketchArrow x1={930} y1={500} x2={1100} y2={500} draw={drawIn(t, c(74) + 0.6, 0.5)} sw={3.2} seed={1013} />
        <ScoreCard draw={score} />
        <SketchPath d="M 1360 690 Q 980 880 430 700" draw={back} sw={3.2} seed={1014} />
        <SketchArrow x1={470} y1={675} x2={430} y2={700} draw={back} sw={3.2} seed={1015} />
      </Canvas>
      <div style={{ position: "absolute", left: 960, top: 168, transform: "translate(-50%,-50%)", opacity: quick, fontFamily: "'Caveat', cursive", fontSize: 56, fontWeight: 600, color: COLORS.ink }}>
        quick note.
      </div>
      <Label at={c(71)} x={960} y={172} size={92} underline>
        PPO
      </Label>
      <Small at={c(71)} x={960} y={250} size={30} opacity={0.55}>
        proximal policy optimization
      </Small>
      <Small at={c(74) + 0.2} x={810} y={670} size={30} opacity={0.55}>
        trial and error
      </Small>
      <Small at={c(73) + 0.9} x={470} y={340} size={28} opacity={0.5}>
        the network
      </Small>
      <Label at={c(76)} x={960} y={828} size={44} color={COLORS.sage}>
        nudge weights.
      </Label>
      <Label at={c(77)} x={960} y={760} size={38} color={COLORS.red} opacity={good}>
        good moves ↑
      </Label>
    </>
  );
};

const ScoreCard: React.FC<{ draw: number }> = ({ draw }) => {
  const p = Math.max(0, Math.min(1, draw));
  return (
    <g opacity={p}>
      <SketchRect x={1150} y={400} w={300} h={200} draw={draw} fill={COLORS.white} radius={10} sw={3.2} seed={1021} />
      <SketchLine x1={1180} y1={450} x2={1300} y2={450} draw={draw} sw={2.4} seed={1022} opacity={0.35} />
      <text x={1300} y={505} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={54} fontWeight={600} fill={COLORS.ink}>score</text>
      <text x={1300} y={575} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={48} fontWeight={600} fill={COLORS.sage}>+1</text>
    </g>
  );
};

/* ------------------------------- steps down ------------------------------ */

const StepDown: React.FC = () => {
  const t = useT();
  const axes = drawIn(t, c(78), 0.7);
  const steps = drawIn(t, c(78) + 0.2, 0.9);
  const wreck = pop(t, c(80) + 0.4, 0.5);
  const baseline = pop(t, c(81), 0.55);
  return (
    <>
      <Canvas>
        <SketchLine x1={430} y1={660} x2={430} y2={300} draw={axes} sw={3} seed={1031} />
        <SketchLine x1={430} y1={660} x2={1520} y2={660} draw={axes} sw={3} seed={1032} />
        {Array.from({ length: 6 }).map((_, i) => {
          const x = 500 + i * 150;
          const y = 380 + i * 45;
          const local = drawIn(t, c(78) + 0.25 + i * 0.12, 0.35);
          return (
            <g key={i}>
              <SketchLine x1={x} y1={y} x2={x + 120} y2={y + 8} draw={local} sw={3} seed={1040 + i} opacity={0.6} />
              <SketchCircle cx={x + 120} cy={y + 8} d={18} draw={local} fill={COLORS.red} fillP={0.9} sw={2} seed={1050 + i} />
            </g>
          );
        })}
        <SketchPath d="M 520 350 Q 1100 700 1450 760" draw={wreck} sw={4} stroke={COLORS.red} seed={1061} />
        <SketchLine x1={1290} y1={575} x2={1370} y2={645} draw={wreck} sw={5} stroke={COLORS.red} seed={1062} />
        <SketchLine x1={1370} y1={575} x2={1290} y2={645} draw={wreck} sw={5} stroke={COLORS.red} seed={1063} />
      </Canvas>
      <Label at={c(78)} x={960} y={170} size={72} underline>
        proximal.
      </Label>
      <Label at={c(78) + 0.5} x={1040} y={280} size={38} color={COLORS.sage}>
        small steps.
      </Label>
      <Small at={c(79) + 0.2} x={520} y={750} size={30} opacity={0.55}>
        keeps what it learned.
      </Small>
      <Label at={c(81)} x={960} y={800} size={50} color={COLORS.ink} opacity={baseline}>
        the baseline.
      </Label>
      <Small at={c(81) + 0.6} x={960} y={870} size={28} opacity={0.45}>
        Astra vs PPO
      </Small>
    </>
  );
};

/* ------------------------------ four networks ---------------------------- */

const games: { kind: "breakout" | "pong" | "pacman" | "freeway"; name: string; seed: number }[] = [
  { kind: "breakout", name: "breakout", seed: 1071 },
  { kind: "pong", name: "pong", seed: 1072 },
  { kind: "pacman", name: "pacman", seed: 1073 },
  { kind: "freeway", name: "freeway", seed: 1074 },
];

const BFourNetworks: React.FC = () => {
  const t = useT();
  const icons = drawIn(t, c(83), 0.7);
  const labels = pop(t, c(84), 0.45);
  const same = pop(t, c(85), 0.5);
  const only = pop(t, c(89), 0.5);
  const score = pop(t, c(90), 0.55);
  const options = pop(t, c(91), 0.45);
  return (
    <>
      <Canvas>
        {games.map((g, i) => {
          const x = 360 + i * 400;
          return (
            <g key={g.kind}>
              <GameIcon kind={g.kind} x={x} y={440} size={150} draw={drawIn(t, c(83) + 0.1 * i, 0.6)} />
              <WeightMatrix x={x - 84} y={560} cols={6} rows={4} cell={28} draw={drawIn(t, c(83) + 0.3 + 0.1 * i, 0.6)} seed={g.seed} />
              <g opacity={labels}>
                <text x={x} y={740} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={28} fill={COLORS.ink} opacity={0.65}>{g.name}</text>
              </g>
              <SketchCheck x={x + 96} y={390} size={38} draw={score} sw={5} />
            </g>
          );
        })}
        {same > 0.01 ? (
          <g opacity={same}>
            <SketchLine x1={260} y1={790} x2={1660} y2={790} draw={same} sw={2.4} seed={1081} opacity={0.4} />
            <SketchLine x1={260} y1={780} x2={260} y2={800} draw={same} sw={2.4} seed={1082} opacity={0.4} />
            <SketchLine x1={1660} y1={780} x2={1660} y2={800} draw={same} sw={2.4} seed={1083} opacity={0.4} />
          </g>
        ) : null}
      </Canvas>
      <Label at={c(83)} x={960} y={170} size={64} underline>
        four networks.
      </Label>
      <Label at={c(85)} out={c(89) - 0.05} x={960} y={835} size={40} color={COLORS.ink} opacity={0.65 * same}>
        same shape.
      </Label>
      <Label at={c(89)} x={960} y={835} size={44} color={COLORS.red}>
        only weights differ.
      </Label>
      <Label at={c(90)} x={1720} y={215} size={56} color={COLORS.sage}>
        4 / 4
      </Label>
      <Small at={c(91)} x={960} y={900} size={28} opacity={0.5 * options}>
        no options.
      </Small>
    </>
  );
};

/* ------------------------------- read breakout --------------------------- */

const Paddle: React.FC<{ x: number; y: number; draw: number }> = ({ x, y, draw }) => {
  const p = Math.max(0, Math.min(1, draw));
  return (
    <g opacity={p}>
      <SketchRect x={x - 120} y={y} w={240} h={20} radius={9} draw={draw} fill={COLORS.sand} fillP={0.9} sw={4} seed={1091} />
      <SketchCircle cx={x + 40} cy={y - 110} d={20} draw={draw} fill={COLORS.red} fillP={0.9} sw={2} seed={1092} />
    </g>
  );
};

const BrickWall: React.FC<{ x: number; y: number; draw: number }> = ({ x, y, draw }) => (
  <g>
    {Array.from({ length: 3 }).map((_, r) =>
      Array.from({ length: 6 }).map((_, col) => {
        const local = Math.max(0, Math.min(1, (draw - (r * 6 + col) * 0.035) / 0.6));
        return (
          <SketchRect
            key={`${r}-${col}`}
            x={x + col * 58}
            y={y + r * 30}
            w={50}
            h={22}
            radius={3}
            draw={local}
            fill={r === 0 ? COLORS.red : COLORS.sage}
            fillP={0.4}
            sw={2}
            seed={1100 + r * 8 + col}
          />
        );
      })
    )}
  </g>
);

const BPaddle: React.FC = () => {
  const t = useT();
  const matrix = drawIn(t, c(92) + 0.2, 0.8);
  const arrow = drawIn(t, c(94), 0.5);
  const paddle = pop(t, c(95), 0.55);
  return (
    <>
      <Canvas>
        <WeightMatrix
          x={390}
          y={350}
          cols={7}
          rows={6}
          cell={38}
          draw={matrix}
          seed={1111}
          highlight={Array.from({ length: 7 }).map((_, col) => ({ r: 5, c: col, color: COLORS.sage }))}
        />
        <SketchArrow x1={680} y1={585} x2={850} y2={585} draw={arrow} sw={3} seed={1112} />
        <Paddle x={1050} y={575} draw={paddle} />
        <GameIcon kind="breakout" x={1500} y={470} size={220} draw={drawIn(t, c(93) + 0.3, 0.7)} />
      </Canvas>
      <Label at={c(92)} x={960} y={170} size={62} underline>
        reading Breakout.
      </Label>
      <Label at={c(93) + 0.3} x={510} y={300} size={38} color={COLORS.ink} opacity={0.7}>
        agent channel
      </Label>
      <Label at={c(95)} x={1050} y={690} size={48} color={COLORS.sage}>
        paddle.
      </Label>
      <Small at={c(94) + 0.3} x={960} y={810} size={28} opacity={0.45}>
        first layer
      </Small>
    </>
  );
};

const BBricks: React.FC = () => {
  const t = useT();
  const matrix = drawIn(t, c(97) - 0.1, 0.8);
  const arrow = drawIn(t, c(98), 0.5);
  const bricks = drawIn(t, c(98) - 0.3, 0.7);
  return (
    <>
      <Canvas>
        <WeightMatrix
          x={390}
          y={350}
          cols={7}
          rows={6}
          cell={38}
          draw={matrix}
          seed={1121}
          highlight={Array.from({ length: 7 }).flatMap((_, col) => [
            { r: 0, c: col, color: COLORS.red },
            { r: 1, c: col, color: COLORS.red },
          ])}
        />
        <SketchArrow x1={680} y1={430} x2={880} y2={430} draw={arrow} sw={3} seed={1122} />
        <BrickWall x={1030} y={390} draw={bricks} />
      </Canvas>
      <Label at={c(96)} x={960} y={170} size={62} underline>
        reading Breakout.
      </Label>
      <Label at={c(97) + 0.3} x={510} y={300} size={38} color={COLORS.ink} opacity={0.7}>
        reward channel
      </Label>
      <Label at={c(99)} x={1150} y={580} size={48} color={COLORS.red}>
        bricks.
      </Label>
      <Small at={c(98) + 0.3} x={960} y={810} size={28} opacity={0.45}>
        top rows
      </Small>
    </>
  );
};

const ActionRows: React.FC<{ draw: number }> = ({ draw }) => {
  const rows = [
    { label: "left", value: 1.0, color: COLORS.red },
    { label: "right", value: 0.92, color: COLORS.sage },
    { label: "fire", value: 0.18, color: COLORS.ink },
    { label: "no-op", value: 0.15, color: COLORS.ink },
  ];
  return (
    <g>
      {rows.map((r, i) => {
        const local = Math.max(0, Math.min(1, (draw - i * 0.08) / 0.7));
        const y = 340 + i * 88;
        return (
          <g key={r.label} opacity={local}>
            <text x={620} y={y + 44} textAnchor="end" fontFamily="'Patrick Hand', cursive" fontSize={32} fill={COLORS.ink} opacity={0.75}>{r.label}</text>
            <SketchLine x1={650} y1={y + 34} x2={1320} y2={y + 34} draw={local} sw={2} seed={1130 + i} opacity={0.25} />
            <SketchRect x={650} y={y + 12} w={Math.max(12, 600 * r.value * local)} h={44} draw={local} fill={r.color} fillP={r.color === COLORS.ink ? 0.08 : 0.18} sw={2.6} seed={1140 + i} />
          </g>
        );
      })}
    </g>
  );
};

const BOutput: React.FC = () => {
  const t = useT();
  const rows = drawIn(t, c(100), 0.8);
  const diff = pop(t, c(101) + 0.4, 0.5);
  const same = pop(t, c(102) + 0.3, 0.5);
  return (
    <>
      <Canvas>
        <ActionRows draw={rows} />
        <text x={1390} y={395} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={36} fontWeight={600} fill={COLORS.red} opacity={diff}>different</text>
        <text x={1390} y={615} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={36} fontWeight={600} fill={COLORS.ink} opacity={0.45 * same}>alike</text>
      </Canvas>
      <Label at={c(100)} x={960} y={170} size={62} underline>
        output layer.
      </Label>
      <Label at={c(102) + 0.3} x={960} y={810} size={46} color={COLORS.sage}>
        side to side.
      </Label>
    </>
  );
};

const BGeometry: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <StarCharacter x={470} y={620} size={160} draw={pop(t, c(103) + 0.2, 0.5)} tool="magnifier" />
        <WeightMatrix x={1370} y={390} cols={7} rows={5} cell={26} draw={drawIn(t, c(103) + 0.4, 0.7)} seed={1161} opacity={0.35} numbers={false} />
      </Canvas>
      <Label at={c(103)} x={960} y={430} size={78} underline>
        nobody told it.
      </Label>
      <Label at={c(105)} x={960} y={565} size={54} color={COLORS.sage}>
        geometry of numbers.
      </Label>
      <Small at={c(104)} x={960} y={690} size={28} opacity={0.45}>
        not a lookup table
      </Small>
    </>
  );
};

export const Ch04Reading: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={131.0}>
      <BSkillOne />
    </Beat>
    <Beat from={130.9} to={149.15}>
      <BPPOFlow />
    </Beat>
    <Beat from={149.05} to={158.65}>
      <StepDown />
    </Beat>
    <Beat from={158.55} to={178.3}>
      <BFourNetworks />
    </Beat>
    <Beat from={178.2} to={186.7}>
      <BPaddle />
    </Beat>
    <Beat from={186.6} to={191.0}>
      <BBricks />
    </Beat>
    <Beat from={190.9} to={198.95}>
      <BOutput />
    </Beat>
    <Beat from={198.85} to={END}>
      <BGeometry />
    </Beat>
  </Chapter>
);
