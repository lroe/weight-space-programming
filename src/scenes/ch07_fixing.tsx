import React from "react";
import { COLORS, FONTS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { BarsH, NetworkDiagram, WeightMatrix } from "../components/diagrams";
import { Car, Ramp, StarCharacter } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCircle, SketchCross, SketchLine, SketchPath, SketchPolygon, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 312.8;
const END = 393.22;

/* --------------------------------- intro --------------------------------- */

const BSkill: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <StarCharacter x={1490} y={650} size={200} draw={pop(t, c(160) + 0.4, 0.6)} tool="pencil" />
      </Canvas>
      <Small at={c(159)} x={960} y={250} size={30} opacity={0.42}>
        experiment four
      </Small>
      <Label at={c(159) + 0.12} x={960} y={355} size={92} underline>
        skill two.
      </Label>
      <Label at={c(160)} x={960} y={525} size={150} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        fixing.
      </Label>
      <Small at={c(160) + 0.8} x={1490} y={830} size={28} opacity={0.4}>
        write the fix
      </Small>
    </>
  );
};

/* --------------------------------- the car ------------------------------- */

const BCar: React.FC = () => {
  const t = useT();
  const ramp = drawIn(t, c(162) + 0.15, 0.85);
  const car = pop(t, c(162) + 0.25, 0.55);
  return (
    <>
      <Canvas>
        <Ramp x={1150} y={930} w={480} h={260} draw={ramp} strip={false} />
        <Car x={920} y={930} scale={0.9} draw={car} />
        <SketchArrow x1={1045} y1={850} x2={1280} y2={730} draw={drawIn(t, c(163) + 0.4, 0.6)} sw={3} stroke={COLORS.sage} seed={1501} />
      </Canvas>
      <Label at={c(161)} x={960} y={150} size={60} underline>
        the car that won't climb.
      </Label>
      <Small at={c(161) + 0.4} x={960} y={235} size={30} opacity={0.45}>
        PPO · kinex
      </Small>
      <Label at={c(163)} x={960} y={775} size={36} color={COLORS.red} opacity={0.8}>
        act, not just read.
      </Label>
    </>
  );
};

/* --------------------------------- back up ------------------------------- */

const BBackUp: React.FC = () => {
  const t = useT();
  const ramp = drawIn(t, c(165) - 0.05, 0.8);
  const car = pop(t, c(165) + 0.1, 0.5);
  const ghost = pop(t, c(169) - 0.05, 0.5);
  const back = drawIn(t, c(169) + 0.05, 0.6);
  const run = drawIn(t, c(169) + 0.6, 0.7);
  return (
    <>
      <Canvas>
        <Ramp x={1250} y={930} w={380} h={220} draw={ramp} strip={false} />
        <g opacity={0.22 * ghost}>
          <Car x={700} y={930} scale={0.78} draw={car} />
        </g>
        <Car x={960} y={930} scale={0.78} draw={car} />
        <SketchArrow x1={935} y1={790} x2={730} y2={790} draw={back} sw={2.8} stroke={COLORS.red} seed={1510} />
        <SketchArrow x1={665} y1={700} x2={1245} y2={820} draw={run} sw={2.8} stroke={COLORS.sage} seed={1511} />
      </Canvas>
      <Small at={c(165) + 0.35} out={c(168) - 0.2} x={960} y={235} size={28} opacity={0.4}>
        PPO · kinex
      </Small>
      <Label at={c(165) + 0.45} out={c(168) - 0.25} x={960} y={150} size={56} underline>
        up the ramp.
      </Label>
      <Label at={c(168)} x={960} y={150} size={58} underline>
        back up first.
      </Label>
      <Small at={c(169)} x={960} y={235} size={32} opacity={0.5}>
        then a long run up.
      </Small>
      <Small at={c(169) + 0.15} x={832} y={752} size={26} color={COLORS.red} opacity={0.7}>
        back up
      </Small>
      <Small at={c(169) + 0.7} x={950} y={730} size={26} color={COLORS.sage} opacity={0.7}>
        long run
      </Small>
    </>
  );
};

/* --------------------------------- stuck --------------------------------- */

const BStuck: React.FC = () => {
  const t = useT();
  const ramp = drawIn(t, c(171) - 0.1, 0.8);
  const car = pop(t, c(171) + 0.1, 0.5);
  const stall = pop(t, c(173), 0.45);
  return (
    <>
      <Canvas>
        <Ramp x={1100} y={930} w={480} h={250} draw={ramp} strip={false} />
        <Car x={980} y={930} scale={0.85} draw={car} />
        <SketchLine x1={1090} y1={854} x2={1136} y2={830} draw={stall} sw={4} stroke={COLORS.red} seed={1520} />
        <SketchLine x1={1096} y1={878} x2={1146} y2={872} draw={stall} sw={4} stroke={COLORS.red} seed={1521} />
        <SketchLine x1={1090} y1={902} x2={1134} y2={920} draw={stall} sw={4} stroke={COLORS.red} seed={1522} />
        <SketchLine x1={1086} y1={866} x2={1116} y2={868} draw={stall} sw={3.4} stroke={COLORS.red} seed={1523} />
      </Canvas>
      <Label at={c(171)} x={960} y={150} size={62} underline underlineColor={COLORS.red}>
        a local minimum.
      </Label>
      <Small at={c(172)} x={960} y={235} size={32} opacity={0.5}>
        it drove straight at the ramp.
      </Small>
      <Label at={c(173)} x={960} y={782} size={44} color={COLORS.red}>
        stalled.
      </Label>
    </>
  );
};

/* -------------------------------- the brief ------------------------------ */

const BSetup: React.FC = () => {
  const t = useT();
  const weights = drawIn(t, c(174) + 0.2, 0.7);
  const scene = drawIn(t, c(174) + 0.55, 0.7);
  const episode = drawIn(t, c(175), 0.7);
  const brief = drawIn(t, c(174) + 0.9, 0.6);
  return (
    <>
      <Canvas>
        <WeightMatrix
          x={500}
          y={318}
          cols={7}
          rows={4}
          cell={17}
          gap={3}
          draw={weights}
          seed={1531}
          highlight={[{ r: 1, c: 4, color: COLORS.sage }]}
        />
        <SketchLine x1={492} y1={560} x2={700} y2={560} draw={scene} sw={3} seed={1532} />
        <SketchPolygon points={[[600, 560], [700, 560], [700, 500]]} draw={scene} fill={COLORS.sand} sw={3} seed={1533} fillP={0.7} />
        <Car x={515} y={560} scale={0.3} draw={scene} />
        <g opacity={episode}>
          <SketchRect x={480} y={688} w={250} h={86} draw={episode} fill={COLORS.white} radius={8} sw={2.6} seed={1534} />
          {[0, 1, 2].map((i) => {
            const fx = 494 + i * 76;
            return (
              <g key={i}>
                <SketchRect x={fx} y={700} w={64} h={62} draw={episode} sw={2} seed={1535 + i} />
                <SketchLine x1={fx + 8} y1={748} x2={fx + 54} y2={748} draw={episode} sw={2} seed={1540 + i} />
                <SketchLine x1={fx + 30} y1={748} x2={fx + 54} y2={728} draw={episode} sw={2} seed={1545 + i} />
                <circle cx={fx + 22} cy={742} r={5} fill={COLORS.red} opacity={0.8 * episode} />
              </g>
            );
          })}
        </g>
        <SketchLine x1={802} y1={330} x2={802} y2={746} draw={brief} sw={2.4} opacity={0.35} seed={1550} />
        <SketchLine x1={782} y1={360} x2={802} y2={360} draw={brief} sw={2.2} opacity={0.35} seed={1551} />
        <SketchLine x1={782} y1={532} x2={802} y2={532} draw={brief} sw={2.2} opacity={0.35} seed={1552} />
        <SketchLine x1={782} y1={730} x2={802} y2={730} draw={brief} sw={2.2} opacity={0.35} seed={1553} />
        <SketchArrow x1={805} y1={532} x2={905} y2={532} draw={brief} sw={2.8} seed={1554} />
        <StarCharacter x={1015} y={535} size={180} draw={pop(t, c(175) + 0.25, 0.6)} tool="pencil" />
        <SketchArrow x1={1115} y1={500} x2={1240} y2={452} draw={drawIn(t, c(176) + 0.05, 0.5)} sw={2.6} stroke={COLORS.red} seed={1555} />
        <SketchArrow x1={1115} y1={578} x2={1240} y2={620} draw={drawIn(t, c(177) + 0.05, 0.5)} sw={2.6} stroke={COLORS.sage} seed={1556} />
      </Canvas>
      <Label at={c(174)} x={960} y={150} size={56} underline>
        what Astra got.
      </Label>
      <Label at={c(174) + 0.25} x={230} y={360} size={42} align="left" opacity={0.82}>
        weights
      </Label>
      <Label at={c(174) + 0.6} x={230} y={532} size={42} align="left" opacity={0.82}>
        the scene
      </Label>
      <Label at={c(175)} x={230} y={730} size={42} align="left" opacity={0.82}>
        one episode
      </Label>
      <Small at={c(175) + 0.45} x={360} y={790} size={24} opacity={0.35}>
        one recording, no retries
      </Small>
      <Label at={c(176)} x={1265} y={445} size={40} color={COLORS.red} align="left">
        why it fails
      </Label>
      <Label at={c(177)} x={1265} y={628} size={40} color={COLORS.sage} align="left">
        new weights
      </Label>
    </>
  );
};

/* --------------------------------- one try ------------------------------- */

const BOneTry: React.FC = () => {
  const t = useT();
  return (
    <>
      <Label at={c(178)} x={960} y={455} size={122} color={COLORS.red} underline underlineColor={COLORS.red}>
        one try.
      </Label>
      <Label at={c(179)} x={960} y={615} size={58} color={COLORS.ink} opacity={0.74}>
        no tools.
      </Label>
      <Small at={c(179) + 0.25} x={960} y={705} size={28} opacity={0.38}>
        no second attempt
      </Small>
    </>
  );
};

/* -------------------------------- diagnosis ------------------------------ */

const BDiagnosis: React.FC = () => {
  const t = useT();
  const net = drawIn(t, c(180) - 0.1, 0.9);
  const acts = pop(t, c(181), 0.5);
  const never = pop(t, c(182), 0.45);
  return (
    <>
      <Canvas>
        <NetworkDiagram
          x={480}
          y={340}
          w={720}
          h={280}
          layers={[4, 5, 3]}
          draw={net}
          seed={1561}
          nodeR={13}
          labels={["state", "", ""]}
          nodeHighlights={[
            { layer: 2, node: 0, color: COLORS.sage },
            { layer: 2, node: 1, color: COLORS.sage },
          ]}
        />
        <SketchLine x1={1218} y1={340} x2={1248} y2={340} draw={acts} sw={2.4} opacity={0.55} seed={1562} />
        <SketchLine x1={1218} y1={480} x2={1248} y2={480} draw={acts} sw={2.4} opacity={0.55} seed={1563} />
        <SketchLine x1={1218} y1={620} x2={1248} y2={620} draw={acts} sw={2.4} opacity={0.55} seed={1564} />
        <SketchCross x={1390} y={620} size={46} draw={never} sw={4.4} />
      </Canvas>
      <Label at={c(180)} x={960} y={150} size={58} underline>
        the diagnosis.
      </Label>
      <Label at={c(181)} x={1268} y={340} size={38} align="left" opacity={0.82}>
        throttle
      </Label>
      <Label at={c(181) + 0.12} x={1268} y={480} size={38} align="left" opacity={0.82}>
        coast
      </Label>
      <Label at={c(181) + 0.24} x={1268} y={620} size={38} color={COLORS.red} align="left" opacity={0.85}>
        reverse
      </Label>
      <Small at={c(182) + 0.2} x={1465} y={620} size={26} color={COLORS.red} opacity={0.9}>
        never
      </Small>
      <Small at={c(180) + 0.8} x={960} y={810} size={28} opacity={0.4}>
        a throttle and coast controller
      </Small>
    </>
  );
};

/* -------------------------------- reward --------------------------------- */

const BReward: React.FC = () => {
  const t = useT();
  const top = drawIn(t, c(183) - 0.05, 0.7);
  const bottom = drawIn(t, c(184) + 0.05, 0.7);
  return (
    <>
      <Canvas>
        <SketchRect x={780} y={438} w={620} h={54} draw={top} radius={5} sw={2.6} seed={1571} />
        <rect x={782} y={440} width={108 * top} height={50} rx={4} fill={COLORS.sage} opacity={0.24} />
        <SketchRect x={780} y={618} w={620} h={54} draw={bottom} radius={5} sw={2.6} seed={1572} />
        <SketchCross x={1428} y={645} size={38} draw={pop(t, c(184) + 0.3, 0.4)} sw={4} />
      </Canvas>
      <Label at={c(183)} x={960} y={150} size={58} underline>
        a small reward.
      </Label>
      <Label at={c(183) + 0.2} x={742} y={465} size={34} align="right" opacity={0.8}>
        shaping reward
      </Label>
      <Label at={c(184)} x={742} y={645} size={34} align="right" opacity={0.8}>
        real launch
      </Label>
      <Small at={c(183) + 0.5} x={1432} y={465} size={28} color={COLORS.sage} align="left" opacity={0.8}>
        a little
      </Small>
      <Small at={c(184) + 0.2} x={1432} y={645} size={28} color={COLORS.red} align="left" opacity={0.8}>
        never
      </Small>
      <Small at={c(184) + 0.6} x={960} y={800} size={28} opacity={0.4}>
        enough to feel fine. not enough to launch.
      </Small>
    </>
  );
};

/* -------------------------------- side path ------------------------------ */

const layerX = [560, 820, 1080, 1340];
const dotY = (i: number) => 364 + i * 68;
const chosen = [2, 1, 3, 2];
const pathPoints = layerX.map((x, i) => [x + 75, dotY(chosen[i])] as [number, number]);

const BSidePath: React.FC = () => {
  const t = useT();
  const blocks = drawIn(t, c(185) - 0.1, 0.9);
  const path = drawIn(t, c(185) + 0.35, 0.9);
  const sensors = drawIn(t, c(187) - 0.05, 0.7);
  return (
    <>
      <Canvas>
        {layerX.map((x, i) => (
          <g key={x}>
            <SketchRect x={x} y={330} w={150} h={340} draw={blocks} radius={16} fill={COLORS.white} sw={3} seed={1580 + i} />
            {Array.from({ length: 5 }).map((_, j) => {
              const on = j === chosen[i];
              return (
                <g key={j}>
                  {on ? <circle cx={x + 75} cy={dotY(j)} r={18} fill={COLORS.sage} opacity={0.12 * blocks} /> : null}
                  <SketchCircle
                    cx={x + 75}
                    cy={dotY(j)}
                    d={on ? 16 : 12}
                    draw={blocks}
                    fill={on ? COLORS.sage : COLORS.sand}
                    fillP={on ? 0.9 : 0.5}
                    sw={on ? 3 : 2.2}
                    seed={1590 + i * 10 + j}
                  />
                </g>
              );
            })}
          </g>
        ))}
        <SketchPath
          d={`M ${pathPoints[0][0]} ${pathPoints[0][1]} C 700 ${pathPoints[0][1]} 760 ${pathPoints[1][1]} ${pathPoints[1][0]} ${pathPoints[1][1]} S 1010 ${pathPoints[2][1]} ${pathPoints[2][0]} ${pathPoints[2][1]} S 1265 ${pathPoints[3][1]} ${pathPoints[3][0]} ${pathPoints[3][1]}`}
          draw={path}
          sw={4.4}
          stroke={COLORS.sage}
          seed={1620}
        />
        <g opacity={sensors}>
          <SketchRect x={250} y={438} w={220} h={112} draw={sensors} radius={12} fill={COLORS.white} sw={2.8} seed={1621} />
          <text x={274} y={482} fontFamily={FONTS.label} fontSize={29} fill={COLORS.ink} opacity={0.75 * sensors}>
            position
          </text>
          <text x={274} y={522} fontFamily={FONTS.label} fontSize={29} fill={COLORS.ink} opacity={0.75 * sensors}>
            speed
          </text>
        </g>
        <SketchArrow x1={478} y1={494} x2={618} y2={pathPoints[0][1]} draw={sensors} sw={2.8} seed={1622} />
      </Canvas>
      <Label at={c(185)} x={960} y={150} size={58} underline>
        a side path.
      </Label>
      {layerX.map((x, i) => (
        <Small key={x} at={c(185) + 0.15 + i * 0.06} x={x + 75} y={706} size={26} opacity={0.38}>
          L{i + 1}
        </Small>
      ))}
      <Small at={c(186)} x={960} y={790} size={30} opacity={0.45}>
        a few units in each layer
      </Small>
      <Small at={c(187)} x={960} y={844} size={27} opacity={0.35}>
        sensor values, straight in
      </Small>
    </>
  );
};

/* -------------------------------- maneuver ------------------------------- */

const BDrive: React.FC = () => {
  const t = useT();
  const off = pop(t, c(190), 0.45);
  const on = pop(t, c(192), 0.45);
  const car = pop(t, c(188), 0.5);
  const back = drawIn(t, c(188) + 0.15, 0.6);
  const left = drawIn(t, c(189) + 0.1, 0.6);
  return (
    <>
      <Canvas>
        <Ramp x={1240} y={930} w={400} h={220} draw={drawIn(t, c(188), 0.8)} strip={false} />
        <SketchLine x1={1012} y1={918} x2={1148} y2={918} draw={drawIn(t, c(188) + 0.1, 0.6)} sw={11} stroke={COLORS.red} seed={1630} />
        <g opacity={0.22}>
          <Car x={680} y={930} scale={0.75} draw={car} />
        </g>
        <Car x={900} y={930} scale={0.75} draw={car} />
        <SketchArrow x1={890} y1={800} x2={720} y2={800} draw={back} sw={2.8} stroke={COLORS.red} seed={1631} />
        <SketchArrow x1={690} y1={735} x2={540} y2={735} draw={left} sw={2.8} stroke={COLORS.sage} seed={1632} />
        <circle cx={1470} cy={260} r={8} fill={COLORS.sage} opacity={0.9 * (1 - off)} />
        <circle cx={1470} cy={320} r={8} fill={COLORS.ink} opacity={0.25 + 0.75 * on} />
        <SketchCheck x={1575} y={320} size={28} draw={on} sw={4.2} />
        <SketchCross x={1470} y={260} size={30} draw={off} sw={3.8} />
      </Canvas>
      <Label at={c(188)} x={960} y={150} size={58} underline>
        the maneuver.
      </Label>
      <Label at={c(188) + 0.15} out={c(190) - 0.2} x={960} y={242} size={34} opacity={0.6}>
        back up, then left.
      </Label>
      <Label at={c(190)} out={c(192) - 0.35} x={960} y={242} size={34} color={COLORS.red} opacity={0.8}>
        clear of the red strip.
      </Label>
      <Label at={c(192)} x={960} y={242} size={34} color={COLORS.sage} opacity={0.85}>
        the base network takes over.
      </Label>
      <Label at={c(188) + 0.35} x={1510} y={260} size={30} color={COLORS.sage} align="left" opacity={0.3 + 0.55 * (1 - off)}>
        patch
      </Label>
      <Label at={c(188) + 0.35} x={1510} y={320} size={30} color={COLORS.ink} align="left" opacity={0.25 + 0.7 * on}>
        base
      </Label>
      <Small at={c(188) + 0.5} x={805} y={762} size={24} color={COLORS.red} opacity={0.65 * (1 - pop(t, c(190) - 0.35, 0.35))}>
        back up
      </Small>
      <Small at={c(189) + 0.3} x={610} y={697} size={24} color={COLORS.sage} opacity={0.65}>
        left
      </Small>
    </>
  );
};

/* --------------------------------- result -------------------------------- */

const BResults: React.FC = () => {
  const t = useT();
  const bars = drawIn(t, c(193) - 0.05, 0.9);
  return (
    <>
      <Canvas>
        <BarsH
          x={520}
          y={385}
          w={900}
          max={100}
          rowH={120}
          labelW={220}
          labelSize={34}
          valueSize={56}
          draw={bars}
          data={[
            { label: "before", value: 0, display: "0%", color: COLORS.red, faint: true },
            { label: "after", value: 100, display: "100%", color: COLORS.sage },
          ]}
        />
      </Canvas>
      <Label at={c(193)} x={960} y={150} size={58} underline>
        the result.
      </Label>
      <Small at={c(193) + 0.2} x={560} y={335} size={26} opacity={0.4}>
        success rate
      </Small>
      <Label at={c(194)} x={960} y={695} size={46} opacity={0.85}>
        1024 episodes
      </Label>
      <Label at={c(194) + 0.5} x={960} y={770} size={36} color={COLORS.red} opacity={0.8}>
        up from zero.
      </Label>
    </>
  );
};

/* -------------------------------- weights -------------------------------- */

const patchCells = [
  { r: 3, c: 7, color: COLORS.sage },
  { r: 3, c: 8, color: COLORS.sage },
  { r: 3, c: 9, color: COLORS.sage },
  { r: 4, c: 7, color: COLORS.sage },
  { r: 4, c: 8, color: COLORS.sage },
  { r: 4, c: 9, color: COLORS.sage },
  { r: 5, c: 7, color: COLORS.sage },
  { r: 5, c: 8, color: COLORS.sage },
  { r: 5, c: 9, color: COLORS.sage },
];

const BWeights: React.FC = () => {
  const t = useT();
  const nums = pop(t, c(195), 0.5);
  const matrix = drawIn(t, c(195) + 0.1, 0.9);
  return (
    <>
      <Canvas>
        <WeightMatrix x={1080} y={320} cols={15} rows={10} cell={30} gap={3} draw={matrix} seed={1641} highlight={patchCells} />
        <SketchCircle cx={1362} cy={467} d={196} draw={drawIn(t, c(195) + 0.7, 0.6)} sw={2.6} stroke={COLORS.sage} seed={1642} />
        <SketchLine x1={360} y1={520} x2={730} y2={520} draw={nums} sw={2.4} opacity={0.3} seed={1643} />
      </Canvas>
      <Label at={c(195)} x={960} y={150} size={56} underline>
        how much did it change?
      </Label>
      <Label at={c(195)} x={540} y={390} size={132} color={COLORS.sage}>
        6,073
      </Label>
      <Small at={c(195) + 0.15} x={540} y={478} size={30} opacity={0.5}>
        weights changed
      </Small>
      <Label at={c(195) + 0.25} x={540} y={605} size={82} opacity={0.55}>
        171,664
      </Label>
      <Small at={c(195) + 0.35} x={540} y={672} size={28} opacity={0.4}>
        weights in total
      </Small>
      <Small at={c(195) + 0.8} x={1330} y={704} size={26} opacity={0.38}>
        a small green patch
      </Small>
    </>
  );
};

/* -------------------------------- percent -------------------------------- */

const BPercent: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <StarCharacter x={1490} y={610} size={210} draw={pop(t, c(197) + 0.25, 0.6)} tool="pencil" />
      </Canvas>
      <Label at={c(196)} x={840} y={335} size={176} color={COLORS.ink} underline underlineColor={COLORS.sage}>
        3.5%
      </Label>
      <Small at={c(196) + 0.15} x={840} y={455} size={34} opacity={0.45}>
        of all weights.
      </Small>
      <Label at={c(197)} x={840} y={600} size={58} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        a targeted patch.
      </Label>
      <Small at={c(198)} x={840} y={700} size={29} opacity={0.48}>
        written by something that understood why.
      </Small>
      <Small at={c(198) + 0.4} x={840} y={755} size={28} opacity={0.35}>
        not a rewrite
      </Small>
    </>
  );
};

export const Ch07Fixing: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={316.6}>
      <BSkill />
    </Beat>
    <Beat from={316.5} to={321.6}>
      <BCar />
    </Beat>
    <Beat from={321.5} to={331.3}>
      <BBackUp />
    </Beat>
    <Beat from={331.2} to={336.4}>
      <BStuck />
    </Beat>
    <Beat from={336.3} to={345.35}>
      <BSetup />
    </Beat>
    <Beat from={345.2} to={347.55}>
      <BOneTry />
    </Beat>
    <Beat from={347.42} to={353.4}>
      <BDiagnosis />
    </Beat>
    <Beat from={353.3} to={356.95}>
      <BReward />
    </Beat>
    <Beat from={356.9} to={364.5}>
      <BSidePath />
    </Beat>
    <Beat from={364.4} to={372.6}>
      <BDrive />
    </Beat>
    <Beat from={372.5} to={378.75}>
      <BResults />
    </Beat>
    <Beat from={378.65} to={384.85}>
      <BWeights />
    </Beat>
    <Beat from={384.75} to={END}>
      <BPercent />
    </Beat>
  </Chapter>
);
