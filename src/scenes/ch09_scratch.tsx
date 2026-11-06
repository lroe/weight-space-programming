import React from "react";
import { COLORS, FONTS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { GameIcon, NetworkDiagram, WeightMatrix } from "../components/diagrams";
import { StarCharacter } from "../components/figures";
import { SketchArrow, SketchCircle, SketchCross, SketchLine, SketchRect, SketchUnderline } from "../lib/rough";
import { c } from "../data/narration";

const START = 409.12;
const END = 495.14;

/* --------------------------------- intro --------------------------------- */

const BIntro: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <StarCharacter x={1490} y={650} size={190} draw={pop(t, c(209) + 0.4, 0.6)} tool="pencil" />
      </Canvas>
      <Small at={c(210)} x={960} y={230} size={30} opacity={0.42}>
        experiment five
      </Small>
      <Label at={c(208)} x={960} y={345} size={92} underline>
        skill three.
      </Label>
      <Label at={c(209)} x={960} y={500} size={90} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        writing from scratch.
      </Label>
      <Small at={c(211)} x={960} y={650} size={34} opacity={0.45}>
        minotaur games
      </Small>
    </>
  );
};

/* ------------------------------ three games ------------------------------ */

const games: { name: string; kind: "breakout" | "pong" | "pacman"; x: number }[] = [
  { name: "breakout", kind: "breakout", x: 480 },
  { name: "sequest", kind: "pong", x: 960 },
  { name: "asterix", kind: "pacman", x: 1440 },
];

const BSurprise: React.FC = () => {
  const t = useT();
  const icons = drawIn(t, c(213) - 0.05, 0.8);
  const names = drawIn(t, c(215) - 0.1, 0.5);
  return (
    <>
      <Canvas>
        {games.map((g, i) => (
          <g key={g.name}>
            <GameIcon kind={g.kind} x={g.x} y={450} size={170} draw={drawIn(t, c(213) + i * 0.12, 0.6)} />
            <text x={g.x} y={610} textAnchor="middle" fontFamily={FONTS.display} fontSize={40} fontWeight={600} fill={COLORS.ink} opacity={0.82 * names}>
              {g.name}
            </text>
            <SketchUnderline x={g.x - 62} y={626} w={124} draw={names} color={i === 0 ? COLORS.red : i === 1 ? COLORS.sage : COLORS.ink} sw={3} />
          </g>
        ))}
      </Canvas>
      <Label at={c(212)} x={960} y={150} size={54} underline>
        the part that surprised me.
      </Label>
      <Small at={c(213) + 0.3} x={960} y={735} size={30} opacity={0.45}>
        rules + source code
      </Small>
      <Small at={c(214)} x={960} y={790} size={28} opacity={0.35}>
        three minotaur games
      </Small>
    </>
  );
};

/* --------------------------------- zero ---------------------------------- */

const ZeroMatrix: React.FC<{ x: number; y: number; draw: number }> = ({ x, y, draw }) => {
  const cols = 8;
  const rows = 5;
  const cell = 42;
  const gap = 4;
  const w = cols * cell + (cols - 1) * gap;
  const h = rows * cell + (rows - 1) * gap;
  return (
    <g opacity={draw}>
      <SketchRect x={x - 14} y={y - 14} w={w + 28} h={h + 28} draw={draw} fill={COLORS.white} sw={3} radius={8} seed={1721} />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, col) => {
          const cx = x + col * (cell + gap);
          const cy = y + r * (cell + gap);
          return (
            <g key={`${r}-${col}`}>
              <rect x={cx} y={cy} width={cell} height={cell} rx={4} fill={COLORS.sand} opacity={0.3} />
              <rect x={cx} y={cy} width={cell} height={cell} rx={4} fill="none" stroke={COLORS.ink} strokeWidth={1.2} opacity={0.16} />
              <text x={cx + cell / 2} y={cy + cell / 2 + 9} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.ink} opacity={0.65}>
                0
              </text>
            </g>
          );
        })
      )}
    </g>
  );
};

const BZero: React.FC = () => {
  const t = useT();
  const matrix = drawIn(t, c(216) - 0.05, 0.8);
  const none = pop(t, c(218), 0.5);
  return (
    <>
      <Canvas>
        <ZeroMatrix x={320} y={340} draw={matrix} />
        <SketchCross x={1060} y={400} size={38} draw={none} sw={4.4} />
        <SketchCross x={1060} y={500} size={38} draw={none} sw={4.4} />
        <SketchCross x={1060} y={600} size={38} draw={none} sw={4.4} />
      </Canvas>
      <Label at={c(216)} x={960} y={150} size={58} underline>
        zero weights.
      </Label>
      <Small at={c(217)} x={510} y={645} size={28} opacity={0.4}>
        all of them
      </Small>
      <Label at={c(218)} x={1110} y={400} size={42} align="left" opacity={0.8}>
        no data
      </Label>
      <Label at={c(218) + 0.12} x={1110} y={500} size={42} align="left" opacity={0.8}>
        no loss
      </Label>
      <Label at={c(218) + 0.24} x={1110} y={600} size={42} align="left" opacity={0.8}>
        no gradients
      </Label>
      <Small at={c(216) + 0.8} x={510} y={790} size={28} opacity={0.35}>
        a network that knows nothing
      </Small>
    </>
  );
};

/* -------------------------------- no run --------------------------------- */

const BNoRun: React.FC = () => {
  const t = useT();
  const net = drawIn(t, c(219) - 0.1, 0.8);
  const stop = pop(t, c(219) + 0.25, 0.5);
  const reply = pop(t, c(220), 0.55);
  return (
    <>
      <Canvas>
        <NetworkDiagram x={340} y={350} w={560} h={260} layers={[4, 5, 3]} draw={net} seed={1731} nodeR={12} opacity={0.55} />
        <SketchCross x={620} y={480} size={170} draw={stop} sw={5} />
        <SketchArrow x1={950} y1={480} x2={1075} y2={480} draw={reply} sw={3} stroke={COLORS.sage} seed={1732} />
        <WeightMatrix x={1110} y={400} cols={8} rows={6} cell={28} gap={3} draw={reply} seed={1733} highlight={[{ r: 2, c: 3, color: COLORS.sage }]} />
      </Canvas>
      <Label at={c(219)} x={960} y={150} size={58} underline>
        no running.
      </Label>
      <Small at={c(219) + 0.4} x={620} y={700} size={28} opacity={0.4}>
        no forward pass
      </Small>
      <Label at={c(220)} x={1270} y={345} size={36} color={COLORS.sage} align="left">
        one reply.
      </Label>
      <Small at={c(220) + 0.5} x={1270} y={640} size={28} opacity={0.4}>
        all the weights
      </Small>
    </>
  );
};

/* -------------------------------- score row ------------------------------ */

const ScoreRow: React.FC<{
  x: number;
  y: number;
  w: number;
  label: string;
  value: number;
  max: number;
  draw: number;
  color: string;
  display: string;
  seed: number;
  faint?: boolean;
}> = ({ x, y, w, label, value, max, draw, color, display, seed, faint = false }) => {
  const p = Math.max(0, Math.min(1, draw));
  const len = Math.max(2, (value / max) * w * p);
  return (
    <g>
      <text x={x - 24} y={y + 11} textAnchor="end" fontFamily={FONTS.label} fontSize={30} fill={COLORS.ink} opacity={faint ? 0.45 : 0.74}>
        {label}
      </text>
      <rect x={x} y={y - 22} width={w} height={44} rx={5} fill={COLORS.ink} opacity={0.035} />
      <rect x={x} y={y - 22} width={len} height={44} rx={5} fill={color} opacity={faint ? 0.12 : 0.22} />
      <SketchRect x={x} y={y - 22} w={len} h={44} draw={p} stroke={color} sw={2.6} radius={4} seed={seed} />
      <text x={x + len + 18} y={y + 12} fontFamily={FONTS.display} fontSize={44} fontWeight={600} fill={color} opacity={p}>
        {display}
      </text>
    </g>
  );
};

const ScoreBoard: React.FC<{
  kind: "breakout" | "pong" | "pacman";
  game: string;
  titleAt: number;
  rows: { label: string; value: number; display: string; at: number; color: string; faint?: boolean }[];
  max: number;
}> = ({ kind, game, titleAt, rows, max }) => {
  const t = useT();
  return (
    <>
      <Canvas>
        <GameIcon kind={kind} x={360} y={430} size={160} draw={drawIn(t, titleAt + 0.05, 0.6)} />
        <SketchLine x1={720} y1={340} x2={720} y2={680} draw={drawIn(t, titleAt + 0.1, 0.6)} sw={2.4} opacity={0.35} seed={1740} />
        {rows.map((r, i) => (
          <ScoreRow
            key={r.label}
            x={720}
            y={395 + i * 120}
            w={760}
            label={r.label}
            value={r.value}
            max={max}
            draw={pop(t, r.at, 0.55)}
            color={r.color}
            display={r.display}
            seed={1741 + i}
            faint={r.faint}
          />
        ))}
      </Canvas>
      <Label at={titleAt} x={960} y={150} size={64} underline>
        {game}.
      </Label>
      <Small at={titleAt + 0.15} x={360} y={615} size={34} opacity={0.55}>
        {game}
      </Small>
    </>
  );
};

/* -------------------------------- breakout ------------------------------- */

const BBreakout: React.FC = () => {
  const t = useT();
  return (
    <>
      <Label at={c(221)} out={c(222) - 0.3} x={960} y={150} size={54} underline>
        the scores.
      </Label>
      <ScoreBoard
        kind="breakout"
        game="breakout"
        titleAt={c(222)}
        max={520}
        rows={[
          { label: "PPO 100M", value: 15.8, display: "15.8", at: c(223), color: COLORS.red, faint: true },
          { label: "PPO 500M", value: 25.3, display: "25.3", at: c(224), color: COLORS.red, faint: true },
          { label: "Astra", value: 517.4, display: "517.4", at: c(225), color: COLORS.sage },
        ]}
      />
      <Small at={c(225) + 0.7} x={1320} y={705} size={30} color={COLORS.sage} opacity={0.7}>
        twenty times the long run
      </Small>
    </>
  );
};

/* -------------------------------- sequest -------------------------------- */

const BSequest: React.FC = () => {
  const t = useT();
  return (
    <ScoreBoard
      kind="pong"
      game="sequest"
      titleAt={c(226)}
      max={90}
      rows={[
        { label: "PPO 100M", value: 5.6, display: "5.6", at: c(226) + 0.25, color: COLORS.red, faint: true },
        { label: "PPO 500M", value: 88.9, display: "88.9", at: c(227), color: COLORS.red, faint: true },
        { label: "Astra", value: 53.1, display: "53.1", at: c(227) + 1.25, color: COLORS.sage },
      ]}
    />
  );
};

/* -------------------------------- asterix -------------------------------- */

const BAsterix: React.FC = () => {
  const t = useT();
  return (
    <ScoreBoard
      kind="pacman"
      game="asterix"
      titleAt={c(228)}
      max={60}
      rows={[
        { label: "PPO 100M", value: 25.8, display: "25.8", at: c(228) + 0.25, color: COLORS.red, faint: true },
        { label: "PPO 500M", value: 55.2, display: "55.2", at: c(229), color: COLORS.red, faint: true },
        { label: "Astra", value: 53.2, display: "53.2", at: c(229) + 1.2, color: COLORS.sage },
      ]}
    />
  );
};

/* ------------------------------- three for three ------------------------- */

const BThree: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        {games.map((g, i) => (
          <g key={g.name}>
            <SketchLine x1={g.x - 30} y1={500} x2={g.x - 2} y2={530} draw={drawIn(t, c(230) + i * 0.12, 0.35)} sw={5} stroke={COLORS.sage} seed={1750 + i} />
            <SketchLine x1={g.x - 2} y1={530} x2={g.x + 34} y2={472} draw={drawIn(t, c(230) + i * 0.12, 0.35)} sw={5} stroke={COLORS.sage} seed={1755 + i} />
          </g>
        ))}
      </Canvas>
      <Label at={c(230)} x={960} y={320} size={84} underline>
        three for three.
      </Label>
      {games.map((g, i) => (
        <Small key={g.name} at={c(230) + 0.3 + i * 0.12} x={g.x} y={590} size={32} opacity={0.55}>
          {g.name}
        </Small>
      ))}
      <Small at={c(230) + 0.8} x={960} y={700} size={30} opacity={0.4}>
        beat the 100M-step PPO
      </Small>
    </>
  );
};

/* -------------------------------- compare -------------------------------- */

const BCompare: React.FC = () => {
  const t = useT();
  return (
    <>
      <Label at={c(231)} x={960} y={150} size={58} underline>
        against 500M steps.
      </Label>
      <Label at={c(231) + 0.2} x={780} y={380} size={42} align="right" opacity={0.75}>
        breakout
      </Label>
      <Label at={c(232)} x={880} y={380} size={96} color={COLORS.sage} align="left">
        20×
      </Label>
      <Label at={c(233)} x={780} y={560} size={42} align="right" opacity={0.75}>
        asterix
      </Label>
      <Label at={c(233) + 0.2} x={880} y={560} size={62} align="left" opacity={0.8}>
        close
      </Label>
      <Label at={c(234)} x={780} y={700} size={42} align="right" opacity={0.75}>
        sequest
      </Label>
      <Label at={c(234) + 0.1} x={880} y={700} size={72} align="left" opacity={0.8}>
        60%
      </Label>
      <Small at={c(231) + 0.5} x={960} y={255} size={28} opacity={0.38}>
        Astra vs the 500M-step score
      </Small>
    </>
  );
};

/* ---------------------------------- how ---------------------------------- */

const BHow: React.FC = () => {
  const t = useT();
  const program = drawIn(t, c(237) - 0.05, 0.8);
  const compiled = drawIn(t, c(238) - 0.05, 0.6);
  const boxes = ["see the ball", "predict the path", "choose an action"];
  return (
    <>
      <Canvas>
        <SketchRect x={250} y={320} w={440} h={380} draw={program} radius={12} fill={COLORS.white} sw={3} seed={1761} />
        {boxes.map((b, i) => (
          <g key={b}>
            <SketchRect x={290} y={370 + i * 110} w={360} h={70} draw={drawIn(t, c(237) + i * 0.1, 0.45)} radius={8} fill={COLORS.sand} fillP={0.3} sw={2.4} seed={1762 + i} />
            <text x={470} y={415 + i * 110} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.72 * program}>
              {b}
            </text>
            {i < 2 ? (
              <SketchArrow x1={470} y1={445 + i * 110} x2={470} y2={478 + i * 110} draw={program} sw={2.4} head={11} seed={1770 + i} />
            ) : null}
          </g>
        ))}
        <SketchArrow x1={705} y1={510} x2={1080} y2={510} draw={compiled} sw={3} stroke={COLORS.sage} seed={1775} />
        <NetworkDiagram x={1120} y={360} w={480} h={280} layers={[4, 5, 3]} draw={compiled} seed={1776} nodeR={12} />
        <StarCharacter x={900} y={720} size={170} draw={pop(t, c(237) + 0.3, 0.6)} tool="pencil" />
      </Canvas>
      <Label at={c(235)} x={960} y={150} size={56} underline>
        how did it do it?
      </Label>
      <Small at={c(236)} x={470} y={745} size={28} color={COLORS.red} opacity={0.6}>
        not a search
      </Small>
      <Small at={c(237) + 0.2} x={470} y={288} size={28} opacity={0.4}>
        a program
      </Small>
      <Small at={c(238)} x={1360} y={330} size={28} opacity={0.4}>
        neurons
      </Small>
      <Small at={c(238) + 0.4} x={890} y={468} size={26} color={COLORS.sage} opacity={0.55}>
        compiled
      </Small>
    </>
  );
};

/* ------------------------------- first layer ----------------------------- */

const BFirstLayer: React.FC = () => {
  const t = useT();
  const board = drawIn(t, c(239) - 0.05, 0.8);
  const path = drawIn(t, c(240) - 0.05, 0.8);
  const units = pop(t, c(241), 0.55);
  const labels = pop(t, c(241) + 0.4, 0.5);
  return (
    <>
      <Canvas>
        <SketchRect x={260} y={320} w={620} h={420} draw={board} radius={10} fill={COLORS.white} sw={3.2} seed={1781} />
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, col) => (
            <rect
              key={`${r}-${col}`}
              x={292 + col * 92}
              y={352 + r * 26}
              width={80}
              height={16}
              rx={3}
              fill={r === 0 ? COLORS.red : COLORS.sage}
              opacity={0.45 * board}
            />
          ))
        )}
        <SketchLine x1={520} y1={710} x2={780} y2={710} draw={board} sw={9} seed={1782} />
        <circle cx={360} cy={620} r={10} fill={COLORS.ink} opacity={board} />
        <path
          d="M 370 610 L 500 500 L 870 500 L 700 700"
          fill="none"
          stroke={COLORS.red}
          strokeWidth={3}
          strokeDasharray="12 10"
          opacity={0.75 * path}
        />
        <SketchCircle cx={700} cy={700} d={28} draw={path} stroke={COLORS.red} sw={3.4} seed={1783} />
        <text x={850} y={470} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.ink} opacity={0.45 * path}>
          wall bounce
        </text>
        <text x={700} y={760} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.red} opacity={0.65 * path}>
          landing spot
        </text>
        <SketchRect x={1110} y={430} w={250} h={70} draw={units} radius={10} fill={COLORS.white} sw={2.4} seed={1790} />
        {[1140, 1190, 1240, 1290].map((x, i) => (
          <SketchCircle key={x} cx={x} cy={465} d={24} draw={pop(t, c(241) + i * 0.07, 0.35)} fill={COLORS.red} fillP={0.75} sw={2.2} seed={1791 + i} />
        ))}
        <SketchRect x={1110} y={540} w={190} h={70} draw={units} radius={10} fill={COLORS.white} sw={2.4} seed={1795} />
        {[1140, 1190].map((x, i) => (
          <SketchCircle key={x} cx={x} cy={575} d={24} draw={pop(t, c(241) + 0.3 + i * 0.07, 0.35)} fill={COLORS.sage} fillP={0.75} sw={2.2} seed={1796 + i} />
        ))}
        <SketchArrow x1={895} y1={610} x2={1085} y2={520} draw={drawIn(t, c(241) + 0.2, 0.5)} sw={2.6} stroke={COLORS.sage} seed={1798} />
      </Canvas>
      <Label at={c(239)} x={960} y={150} size={58} underline>
        the first layer.
      </Label>
      <Small at={c(240)} x={570} y={800} size={28} opacity={0.4}>
        where will it land?
      </Small>
      <Label at={c(241) + 0.4} x={1380} y={465} size={32} color={COLORS.red} align="left" opacity={labels}>
        four landing errors
      </Label>
      <Label at={c(241) + 0.55} x={1380} y={575} size={32} color={COLORS.sage} align="left" opacity={labels}>
        two direction flags
      </Label>
      <Small at={c(242)} x={1380} y={520} size={24} opacity={0.38}>
        against the paddle
      </Small>
    </>
  );
};

/* ------------------------------- second layer ---------------------------- */

const BSecondLayer: React.FC = () => {
  const t = useT();
  const cards = pop(t, c(243), 0.55);
  return (
    <>
      <Canvas>
        <SketchRect x={430} y={390} w={260} h={220} draw={cards} radius={14} fill={COLORS.white} sw={3} seed={1801} />
        <SketchRect x={830} y={390} w={260} h={220} draw={cards} radius={14} fill={COLORS.white} sw={3} seed={1802} />
        <SketchRect x={1230} y={390} w={260} h={220} draw={cards} radius={14} fill={COLORS.white} sw={3} seed={1803} />
        <SketchArrow x1={620} y1={500} x2={500} y2={500} draw={cards} sw={5} seed={1804} />
        <SketchLine x1={945} y1={455} x2={945} y2={545} draw={cards} sw={7} seed={1805} />
        <SketchLine x1={975} y1={455} x2={975} y2={545} draw={cards} sw={7} seed={1806} />
        <SketchArrow x1={1300} y1={500} x2={1420} y2={500} draw={cards} sw={5} seed={1807} />
      </Canvas>
      <Label at={c(243)} x={960} y={150} size={58} underline>
        the second layer.
      </Label>
      <Label at={c(243) + 0.2} x={560} y={660} size={38} opacity={0.75}>
        left
      </Label>
      <Label at={c(243) + 0.28} x={960} y={660} size={38} opacity={0.75}>
        stay
      </Label>
      <Label at={c(243) + 0.36} x={1360} y={660} size={38} opacity={0.75}>
        right
      </Label>
      <Label at={c(245)} x={960} y={765} size={42} color={COLORS.ink} underline>
        a hand-designed algorithm.
      </Label>
      <Small at={c(245) + 0.8} x={960} y={835} size={30} opacity={0.5}>
        written as a neural network.
      </Small>
    </>
  );
};

export const Ch09Scratch: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={414.55}>
      <BIntro />
    </Beat>
    <Beat from={414.45} to={423.3}>
      <BSurprise />
    </Beat>
    <Beat from={423.2} to={428.85}>
      <BZero />
    </Beat>
    <Beat from={428.75} to={432.6}>
      <BNoRun />
    </Beat>
    <Beat from={432.5} to={445.15}>
      <BBreakout />
    </Beat>
    <Beat from={445.05} to={452.45}>
      <BSequest />
    </Beat>
    <Beat from={452.35} to={459.95}>
      <BAsterix />
    </Beat>
    <Beat from={459.85} to={462.85}>
      <BThree />
    </Beat>
    <Beat from={462.75} to={470.8}>
      <BCompare />
    </Beat>
    <Beat from={470.7} to={478.65}>
      <BHow />
    </Beat>
    <Beat from={478.55} to={488.65}>
      <BFirstLayer />
    </Beat>
    <Beat from={488.55} to={END}>
      <BSecondLayer />
    </Beat>
  </Chapter>
);
