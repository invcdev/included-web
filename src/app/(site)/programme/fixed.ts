/* Presentation of the programme page that is part of the design rather than content: icons, colours, star positions. */

/** Inside of each roadmap stop's 24 x 24 icon (fixed, trusted markup from the design). */
export const ROAD_ICONS = [
  "<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18\"/>",
  "<path d=\"M4 19V5M4 19h16\"/><path d=\"M7 15l4-5 3 3 5-6\"/>",
  "<circle cx=\"10.5\" cy=\"10.5\" r=\"6\"/><path d=\"M15 15l5 5\"/>",
  "<path d=\"M12 3v18M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z\"/>",
  "<circle cx=\"12\" cy=\"12\" r=\"8\"/><path d=\"M12 4v8l6 4\"/>",
  "<path d=\"M4 5h16v14H4z\"/><path d=\"M8 9h8M8 13h5\"/>",
  "<circle cx=\"12\" cy=\"12\" r=\"8\"/><path d=\"M12 8v8M9.5 10.5h3.5a1.5 1.5 0 0 1 0 3h-2a1.5 1.5 0 0 0 0 3h3.5\"/>",
  "<path d=\"M4 12h12M12 6l6 6-6 6\"/><path d=\"M20 5v14\"/>",
  "<path d=\"M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11.2V16h6v-1.8A6 6 0 0 0 12 3z\"/>",
  "<path d=\"M3 17l5-5 4 4 8-9\"/><path d=\"M15 7h5v5\"/>",
  "<path d=\"M9 12l2 2 4-4\"/><path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"/>",
  "<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M9 7V5h6v2M3 13h18\"/>"
];

/** Colours of the four roadmap rows. */
export const ROAD_ROWS = [
  {
    "--c0": "#7B3FE4",
    "--c1": "#6D5BEA"
  },
  {
    "--c0": "#6D5BEA",
    "--c1": "#4A8CE8"
  },
  {
    "--c0": "#4A8CE8",
    "--c1": "#2FBFC0"
  },
  {
    "--c0": "#2FBFC0",
    "--c1": "#3DE0A0"
  }
];

/** Colours of the fourteen curriculum weeks and the four "leave with" cards. */
export const WEEK_COLORS = ["#5533eb", "#484fee", "#3c6cf1", "#2f88f4", "#23a4f7", "#16c0fa", "#0addfd", "#07f2f5", "#23f5cd", "#3ff7a5", "#5bf97d", "#78fb55", "#94fd2d", "#b0ff05"];
export const LEAVE_COLORS = ["#5533eb", "#1fadf8", "#36f6b3", "#b0ff05"];

/** The eight TLDR stars on the unicorn: [x, y, colour, label y] in a 400 x 400 box. Joined in order, then back to the first. */
export const STARS: [number, number, string, number][] = [[345, 30, "#0033ff", 12], [322, 78, "#0033ff", 60], [268, 134, "#00ff04", 116], [252, 190, "#00ff04", 220], [190, 225, "#00ff04", 255], [90, 280, "#ffff00", 310], [334, 250, "#ffff00", 280], [205, 340, "#ffff00", 370]];
