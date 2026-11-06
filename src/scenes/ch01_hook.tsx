import React from "react";
import { COLORS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Card, Label, Small } from "../components/ui";
import { GameIcon, NetworkDiagram, NumberSheet, Question, Sparkle, WeightMatrix } from "../components/diagrams";
import { Institute, StarCharacter, StickFigure } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCircle, SketchEllipse, SketchLine, SketchPath, SketchRect } from "../lib/rough";
import { c, cw } from "../data/narration";


const D = 59.58;

const BQuestion: React.FC = () => {
  const t = useT();
  const p = drawIn(t, 0.45, 0.8);
  return (
    <>
      <Canvas>
        <Question x={960} y={590} size={420} draw={p} rotate={-5} />
      </Canvas>
      <Label at={0.32} x={960} y={830} size={42} font="label" color={COLORS.ink} opacity={0.55}>
        a question.
      </Label>
    </>
  );
};

const BList: React.FC = () => {
  const t = useT();
  const sheet = drawIn(t, 2.0, 0.9);
  const hand = drawIn(t, 2.2, 0.7);
  const title = pop(t, c(3), 0.55);
  const dec = pop(t, c(4) + 0.1, 0.45);
  const noLab = pop(t, c(4) + 1.35, 0.5);
  const signs = pop(t, c(4) + 0.7, 0.5);
  return (
    <>
      <Canvas>
        <SketchLine x1={138} y1={770} x2={505} y2={712} draw={hand} sw={5} seed={511} />
        <SketchEllipse cx={530} cy={706} w={58} h={40} draw={hand} fill={COLORS.sand} fillP={0.9} sw={2.6} seed={512} transform="rotate(-18 530 706)" />
        <SketchLine x1={548} y1={694} x2={574} y2={686} draw={hand} sw={2.2} seed={513} />
        <SketchLine x1={552} y1={704} x2={580} y2={700} draw={hand} sw={2.2} seed={514} />
        <SketchLine x1={550} y1={716} x2={576} y2={720} draw={hand} sw={2.2} seed={515} />
        <SketchArrow x1={1530} y1={330} x2={1408} y2={380} draw={dec} bend={-0.2} sw={2.5} seed={514} />
        <SketchArrow x1={1530} y1={760} x2={1404} y2={720} draw={noLab} bend={0.2} sw={2.5} seed={515} />
      </Canvas>
      <NumberSheet x={610} y={180} w={790} h={700} rotate={1.4} draw={sheet} rows={21} cols={8} size={19} seed={518} />
      <Label at={c(3)} x={1005} y={112} size={74} underline>
        17,000 numbers
      </Label>
      <Small at={c(4) + 0.1} x={1560} y={330} size={34} opacity={0.7} align="left">
        decimals
      </Small>
      <div style={{ opacity: signs, position: "absolute", left: 1550, top: 470, fontFamily: "'Caveat', cursive", fontSize: 62, lineHeight: 1 }}>
        <span style={{ color: COLORS.sage }}>+</span>
        <span style={{ color: COLORS.ink, opacity: 0.4, margin: "0 14px" }}>/</span>
        <span style={{ color: COLORS.red }}>−</span>
      </div>
      <Small at={c(4) + 1.35} x={1560} y={720} size={34} opacity={0.7} align="left">
        no labels
      </Small>
      <Canvas>
        <SketchRect x={1528} y={786} w={110} h={38} draw={noLab} radius={5} seed={516} sw={2.2} />
        <SketchLine x1={1540} y1={792} x2={1626} y2={818} draw={noLab} sw={3.2} stroke={COLORS.red} seed={517} />
        <SketchLine x1={1626} y1={792} x2={1540} y2={818} draw={noLab} sw={3.2} stroke={COLORS.red} seed={519} />
      </Canvas>
    </>
  );
};

const BWeights: React.FC = () => {
  const t = useT();
  const sheet = drawIn(t, c(5), 0.5);
  const arrow = drawIn(t, c(6) + 0.05, 0.5);
  const net = drawIn(t, c(6) - 0.2, 0.9);
  const game = pop(t, c(7), 0.55);
  return (
    <>
      <Canvas>
        <SketchArrow x1={800} y1={520} x2={1060} y2={520} draw={arrow} sw={3.4} seed={522} />
        <NetworkDiagram x={1090} y={300} w={570} h={330} layers={[4, 6, 6, 3]} draw={net} seed={523} labels={["input", "", "", "output"]} />
        <g opacity={game}>
          <GameIcon kind="breakout" x={1700} y={770} size={130} draw={game} />
          <Sparkle x={1620} y={700} size={16} draw={game} color={COLORS.sage} />
          <Sparkle x={1780} y={680} size={12} draw={game} color={COLORS.red} />
        </g>
      </Canvas>
      <NumberSheet x={200} y={250} w={520} h={560} rotate={-2.6} draw={sheet} rows={18} cols={6} size={18} seed={521} />
      <Label at={c(5)} x={460} y={205} size={48} color={COLORS.ink} opacity={0.75}>
        weights
      </Label>
      <Label at={c(6)} x={1375} y={740} size={46} color={COLORS.ink} opacity={0.8}>
        a neural network
      </Label>
      <Small at={c(7)} x={1700} y={875} size={30} opacity={0.6}>
        a video game
      </Small>
    </>
  );
};

const BWhichGame: React.FC = () => {
  const t = useT();
  const icons = drawIn(t, c(8), 0.7);
  const f1 = drawIn(t, c(9), 0.45);
  const f2 = drawIn(t, c(10), 0.45);
  const f3 = drawIn(t, c(11), 0.5);
  const q = pop(t, c(8), 0.5);
  return (
    <>
      <Canvas>
        <g opacity={icons}>
          <GameIcon kind="breakout" x={560} y={470} size={130} draw={icons} />
          <GameIcon kind="pong" x={830} y={470} size={130} draw={icons} />
          <GameIcon kind="pacman" x={1100} y={470} size={130} draw={icons} />
          <GameIcon kind="freeway" x={1370} y={470} size={130} draw={icons} />
          <SketchRect x={1550} y={405} w={130} h={130} draw={icons} radius={8} seed={531} />
          <text x={1615} y={505} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={86} fontWeight={600} fill={COLORS.red} opacity={q}>?</text>
        </g>
        <StickFigure x={390} y={918} scale={1.0} pose="shrug" draw={f1} glasses />
        <StickFigure x={960} y={918} scale={1.0} pose="shrug" draw={f2} />
        <StickFigure x={1530} y={918} scale={1.0} pose="shrug" draw={f3} hat />
        <Question x={448} y={702} size={64} draw={pop(t, c(9) + 0.3, 0.4)} color={COLORS.red} />
        <Question x={1018} y={702} size={64} draw={pop(t, c(10) + 0.3, 0.4)} color={COLORS.red} />
        <Question x={1588} y={702} size={64} draw={pop(t, c(11) + 0.25, 0.4)} color={COLORS.red} />
      </Canvas>
      <Label at={c(8)} x={960} y={190} size={96} underline>
        Which game?
      </Label>
      <Small at={c(9)} x={390} y={640} size={32} opacity={0.68}>
        no idea.
      </Small>
      <Small at={c(10)} x={960} y={640} size={32} opacity={0.68}>
        me neither.
      </Small>
      <Small at={c(11)} x={1530} y={640} size={32} opacity={0.68} color={COLORS.red}>
        nobody.
      </Small>
    </>
  );
};

const BMIT: React.FC = () => {
  const t = useT();
  const inst = drawIn(t, c(12), 0.9);
  const star = pop(t, c(13) - 0.1, 0.6);
  const sheet = drawIn(t, c(13) + 0.15, 0.6);
  return (
    <>
      <Canvas>
        <Institute x={260} y={918} w={380} h={280} draw={inst} />
        <StarCharacter x={1150} y={620} size={190} draw={star} tool="magnifier" />
        <SketchArrow x1={1260} y1={700} x2={1345} y2={660} draw={sheet} bend={-0.1} sw={2.5} head={15} seed={542} />
        <Sparkle x={1000} y={520} size={18} draw={star} color={COLORS.sage} />
        <Sparkle x={1300} y={460} size={14} draw={star} color={COLORS.red} />
      </Canvas>
      <NumberSheet x={1360} y={480} w={350} h={290} rotate={3} draw={sheet} rows={9} cols={4} size={15} seed={541} />
      <Label at={c(13)} x={1230} y={260} size={80} underline>
        a language model can.
      </Label>
      <Small at={c(12) + 0.4} x={450} y={990} size={26} opacity={0.55}>
        MIT
      </Small>
    </>
  );
};

const BPaste: React.FC = () => {
  const t = useT();
  const frame = drawIn(t, c(14), 0.7);
  const sheet = drawIn(t, c(14) + 0.25, 0.6);
  const star = pop(t, c(15), 0.5);
  const tools = pop(t, c(15) + 0.85, 0.4);
  const code = pop(t, c(15) + 1.45, 0.4);
  const ask = pop(t, c(16), 0.5);
  return (
    <>
      <Canvas>
        <g>
          <SketchRect x={560} y={220} w={800} h={620} draw={frame} fill={COLORS.white} sw={3.6} seed={551} radius={14} />
          <SketchLine x1={560} y1={288} x2={1360} y2={288} draw={frame} sw={2.4} seed={552} opacity={0.4} />
          <SketchCircle cx={598} cy={255} d={13} draw={frame} fill={COLORS.red} fillP={0.8} sw={1.5} seed={553} />
          <SketchCircle cx={626} cy={255} d={13} draw={frame} fill={COLORS.sand} sw={1.5} seed={554} />
          <SketchCircle cx={654} cy={255} d={13} draw={frame} fill={COLORS.sage} fillP={0.8} sw={1.5} seed={555} />
        </g>
        <SketchLine x1={610} y1={726} x2={1310} y2={726} draw={frame} sw={2.2} seed={557} opacity={0.3} />
        <SketchRect x={610} y={742} w={700} h={66} draw={frame} radius={10} stroke={COLORS.ink} sw={2.4} seed={558} />
        <StarCharacter x={1510} y={330} size={150} draw={star} tool="magnifier" />
        <Sparkle x={1600} y={520} size={14} draw={star} color={COLORS.sage} />
      </Canvas>
      <NumberSheet x={598} y={312} w={724} h={380} rotate={0.7} draw={sheet} rows={16} cols={7} size={16} seed={556} />
      <Small at={c(14) + 0.15} x={698} y={258} size={28} opacity={0.8} align="left">
        GPT-6 Astra
      </Small>
      <Label at={c(15)} x={1510} y={470} size={44} color={COLORS.sage}>
        Astra
      </Label>
      <Small at={c(15) + 0.85} x={420} y={360} size={36} opacity={0.8} align="left">
        × no tools
      </Small>
      <Small at={c(15) + 1.45} x={420} y={450} size={36} opacity={0.8} align="left">
        × no code
      </Small>
      <Label at={c(16)} x={960} y={775} size={52} underline>
        which game?
      </Label>
      <Small at={c(16) + 0.6} x={960} y={900} size={26} opacity={0.5}>
        just the numbers.
      </Small>
    </>
  );
};

const BBreakout: React.FC = () => {
  const t = useT();
  const game = drawIn(t, c(17) - 0.5, 0.8);
  const ans = pop(t, c(17) + 0.15, 0.55);
  const sure = pop(t, c(18), 0.5);
  const right = pop(t, c(19), 0.4);
  return (
    <>
      <Canvas>
        <GameIcon kind="breakout" x={520} y={560} size={400} draw={game} />
        <SketchArrow x1={740} y1={390} x2={1080} y2={360} draw={ans} bend={-0.12} sw={3.2} seed={571} />
        <SketchCheck x={1620} y={360} size={80} draw={right} sw={7} />
        <Sparkle x={1490} y={300} size={20} draw={right} color={COLORS.sage} />
        <Sparkle x={1700} y={500} size={14} draw={right} color={COLORS.red} />
      </Canvas>
      <Label at={c(17) + 0.15} x={1250} y={380} size={116} underline>
        Breakout.
      </Label>
      <Label at={c(18)} x={1250} y={560} size={76} color={COLORS.ink} opacity={0.86}>
        99% sure.
      </Label>
      <Label at={c(19)} x={1450} y={690} size={62} color={COLORS.sage}>
        right.
      </Label>
      <Small at={c(17)} x={520} y={820} size={28} opacity={0.45}>
        a 17,000-number guess
      </Small>
    </>
  );
};

const BStart: React.FC = () => {
  const t = useT();
  const title = pop(t, c(20), 0.5);
  const card1 = pop(t, c(21), 0.55);
  const card2 = pop(t, c(22), 0.55);
  const beat = pop(t, c(23), 0.5);
  return (
    <>
      <Card x={300} y={350} w={560} h={420} fill={COLORS.white} draw={card1} seed={581} style={{ opacity: card1 }}>
        <svg width="100%" height="100%" viewBox="0 0 504 364" style={{ display: "block" }}>
          <NetworkDiagram x={12} y={42} w={480} h={200} layers={[4, 6, 5, 2]} draw={card1} seed={582} />
        </svg>
      </Card>
      <Card x={1060} y={350} w={560} h={420} fill={COLORS.white} draw={card2} seed={583} style={{ opacity: card2 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 92, textAlign: "center", fontFamily: "'Caveat', cursive", fontSize: 118, fontWeight: 600, color: COLORS.ink }}>
          100M
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 232, textAlign: "center", fontFamily: "'Patrick Hand', cursive", fontSize: 32, color: COLORS.ink, opacity: 0.55 }}>
          training steps
        </div>
      </Card>
      <Canvas>
        <SketchArrow x1={870} y1={560} x2={1030} y2={560} draw={pop(t, c(22) - 0.3, 0.4)} sw={3} seed={584} />
        <SketchCheck x={1490} y={660} size={58} draw={beat} sw={6} />
      </Canvas>
      <Label at={c(20)} x={960} y={205} size={78} underline>
        that's only the start.
      </Label>
      <Label at={c(21)} x={580} y={700} size={56}>
        wrote a network
      </Label>
      <Label at={c(22)} x={1340} y={700} size={56}>
        from scratch
      </Label>
      <Small at={c(23)} x={1530} y={760} size={30} opacity={0.6}>
        and beat it
      </Small>
    </>
  );
};

const BFix: React.FC = () => {
  const t = useT();
  const title = pop(t, c(24), 0.5);
  const matrix = drawIn(t, c(24) + 0.25, 0.9);
  const patch = pop(t, c(25), 0.4);
  const pct = pop(t, c(25) + 0.5, 0.5);
  return (
    <>
      <Canvas>
        <WeightMatrixHost t={t} matrix={matrix} patch={patch} />
        <SketchCircle cx={1128} cy={496} d={68} draw={patch} stroke={COLORS.red} sw={3} seed={595} />
        <SketchArrow x1={1260} y1={500} x2={1400} y2={470} draw={pct} bend={-0.15} sw={2.8} seed={596} />
      </Canvas>
      <Label at={c(24)} x={960} y={185} size={66} underline>
        fixed a small language model
      </Label>
      <Label at={c(25)} x={1530} y={430} size={66} color={COLORS.red}>
        0.016%
      </Label>
      <Small at={c(25) + 0.15} x={1560} y={500} size={30} opacity={0.6}>
        of its weights
      </Small>
      <Small at={c(24) + 0.15} x={960} y={760} size={30} opacity={0.45}>
        a 0.8B model
      </Small>
    </>
  );
};

const WeightMatrixHost: React.FC<{ t: number; matrix: number; patch: number }> = ({ matrix, patch }) => {
  return (
    <>
      <WeightMatrix x={640} y={300} cols={24} rows={13} cell={28} draw={matrix} seed={591} numbers={false} />
      <WeightMatrix x={1120} y={470} cols={3} rows={3} cell={18} draw={patch} seed={592} highlight={[{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 1 }]} outline={false} />
    </>
  );
};

const BScore: React.FC = () => {
  const t = useT();
  const before = drawIn(t, c(26) + 0.2, 0.9);
  const after = drawIn(t, c(27) + 0.2, 0.9);
  return (
    <>
      <Canvas>
        <Bars t={t} before={before} after={after} />
      </Canvas>
      <Label at={c(26)} x={960} y={210} size={62} underline>
        its math score
      </Label>
      <Label at={c(26) + 0.3} x={1000} y={415} size={74} color={COLORS.red}>
        7.9%
      </Label>
      <Label at={c(27) + 0.2} x={1530} y={535} size={82} color={COLORS.sage}>
        48.1%
      </Label>
      <Label at={cw(27, 1)} x={960} y={640} size={56} color={COLORS.ink} opacity={0.75}>
        from broken to working
      </Label>
      <Small at={c(27) + 1.3} x={960} y={760} size={30} opacity={0.45}>
        no retraining. just a tiny edit.
      </Small>
    </>
  );
};

const Bars: React.FC<{ t: number; before: number; after: number }> = ({ before, after }) => {
  return (
    <>
      <SketchLine x1={430} y1={360} x2={430} y2={590} draw={Math.max(before, after)} sw={3} seed={601} />
      <SketchLine x1={430} y1={590} x2={1550} y2={590} draw={after} sw={3} seed={602} />
      <SketchRect x={470} y={390} w={Math.max(12, 440 * before)} h={76} draw={before} fill={COLORS.red} fillP={0.18} sw={3} seed={603} />
      <SketchRect x={470} y={510} w={Math.max(12, 960 * after)} h={76} draw={after} fill={COLORS.sage} fillP={0.18} sw={3} seed={604} />
      <text x={470} y={368} fontFamily="'Patrick Hand', cursive" fontSize={32} fill={COLORS.ink} opacity={0.75 * before}>before</text>
      <text x={470} y={488} fontFamily="'Patrick Hand', cursive" fontSize={32} fill={COLORS.ink} opacity={0.75 * after}>after</text>
    </>
  );
};

const BRoadmapA: React.FC = () => {
  const t = useT();
  return (
    <>
      <Label at={c(28) - 0.6} x={960} y={470} size={92} underline>
        this could change things.
      </Label>
      <Small at={c(28) + 1.8} x={960} y={610} size={34} opacity={0.5}>
        how we build and understand models
      </Small>
      <Canvas>
        <Sparkle x={420} y={360} size={22} draw={pop(t, c(28) + 0.8, 0.5)} color={COLORS.sage} />
        <Sparkle x={1500} y={390} size={18} draw={pop(t, c(28) + 1.2, 0.5)} color={COLORS.red} />
      </Canvas>
    </>
  );
};

const BRoadmapB: React.FC = () => {
  const t = useT();
  const path = drawIn(t, c(29), 0.9);
  const a = pop(t, c(29) + 0.4, 0.5);
  const b = pop(t, c(29) + 1.2, 0.5);
  const cc = pop(t, c(30), 0.5);
  const br = pop(t, c(31), 0.55);
  return (
    <>
      <Canvas>
        <SketchPath d="M 300 620 Q 700 590 960 620 T 1620 600" draw={path} sw={4} seed={611} roughness={1.3} />
        <SketchCircle cx={480} cy={615} d={98} draw={a} fill={COLORS.white} sw={3.2} seed={612} />
        <SketchCircle cx={960} cy={620} d={98} draw={b} fill={COLORS.white} sw={3.2} seed={613} />
        <SketchCircle cx={1440} cy={608} d={98} draw={cc} fill={COLORS.white} sw={3.2} seed={614} />
        <g opacity={a}>
          <SketchCircle cx={480} cy={617} d={42} draw={a} sw={3} seed={616} />
          <SketchLine x1={498} y1={636} x2={514} y2={652} draw={a} sw={5} seed={617} />
        </g>
        <g opacity={b}>
          <SketchCircle cx={960} cy={612} d={36} draw={b} sw={2.6} seed={618} />
          <SketchLine x1={950} y1={636} x2={950} y2={648} draw={b} sw={2.4} seed={619} />
          <SketchLine x1={970} y1={636} x2={970} y2={648} draw={b} sw={2.4} seed={620} />
          <SketchLine x1={954} y1={646} x2={966} y2={646} draw={b} sw={2.4} seed={621} />
          <SketchLine x1={930} y1={590} x2={920} y2={580} draw={b} sw={2.2} seed={622} />
          <SketchLine x1={990} y1={590} x2={1000} y2={580} draw={b} sw={2.2} seed={623} />
          <SketchLine x1={960} y1={582} x2={960} y2={570} draw={b} sw={2.2} seed={624} />
        </g>
        <SketchPath d="M 1440 585 L 1452 608 L 1428 612 L 1448 632" draw={br} sw={4} stroke={COLORS.red} seed={615} />
      </Canvas>
      <Label at={c(29) + 0.4} x={480} y={720} size={40}>
        what they did
      </Label>
      <Label at={c(29) + 1.2} x={960} y={720} size={40}>
        why it works
      </Label>
      <Label at={c(30)} x={1440} y={720} size={40} color={COLORS.red}>
        where it breaks
      </Label>
    </>
  );
};

export const Ch01Hook: React.FC = () => {
  return (
    <Chapter start={0} end={D} fadeIn={0.2}>
      <Beat from={0} to={2.15}>
        <BQuestion />
      </Beat>
      <Beat from={2.05} to={9.55}>
        <BList />
      </Beat>
      <Beat from={9.45} to={14.15}>
        <BWeights />
      </Beat>
      <Beat from={14.05} to={19.9}>
        <BWhichGame />
      </Beat>
      <Beat from={19.8} to={23.6}>
        <BMIT />
      </Beat>
      <Beat from={23.5} to={30.95}>
        <BPaste />
      </Beat>
      <Beat from={30.85} to={35.3}>
        <BBreakout />
      </Beat>
      <Beat from={35.2} to={41.62}>
        <BStart />
      </Beat>
      <Beat from={41.5} to={46.75}>
        <BFix />
      </Beat>
      <Beat from={46.65} to={52.5}>
        <BScore />
      </Beat>
      <Beat from={52.4} to={54.85}>
        <BRoadmapA />
      </Beat>
      <Beat from={54.75} to={D}>
        <BRoadmapB />
      </Beat>
    </Chapter>
  );
};
