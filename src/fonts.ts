import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

loadFont({
  family: "Caveat",
  url: staticFile("fonts/Caveat.ttf"),
  weight: "400 700",
  style: "normal",
});

loadFont({
  family: "Patrick Hand",
  url: staticFile("fonts/PatrickHand-Regular.ttf"),
  weight: "400",
  style: "normal",
});
