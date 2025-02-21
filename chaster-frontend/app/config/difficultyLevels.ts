export type DifficultyEntry = {
  weight: number;
  title: string;
  description: string;
};

export const baseDifficulty: Record<string, DifficultyEntry> = {
  nothing: {
    weight: 320,
    title: "nothing",
    description: "",
  },
  double: {
    weight: 20,
    title: "Lucky Vote",
    description: "Critical vote by [username]. It counts twice!",
  },
  invert: {
    weight: 39,
    title: "This doesn't look right...",
    description: "Invalid vote by [Username] doesn't count.",
  },
  double_invert: {
    weight: 20,
    title: "Mouse slip",
    description: "[Username] clearly hit the wrong button!",
  },
  jackpot: {
    weight: 1,
    title: "Jackpot!",
    description: "Super critical vote by [username]! It count's 10 times!",
  },
};

export const weightAdjustments: Record<string, Record<string, number>> = {
  "Easy": {
    nothing: 500,
    double: 10,
    invert: 25,
    double_invert: 10,
    jackpot: 1,
  },
  "Normal": {
    nothing: 300,
    double: 20,
    invert: 39,
    double_invert: 20,
    jackpot: 1,
  },
  "Hard Settings": {
    nothing: 200,
    double: 15,
    invert: 35,
    double_invert: 15,
    jackpot: 1,
  },
  "Extreme": {
    nothing: 100,
    double: 10,
    invert: 30,
    double_invert: 10,
    jackpot: 1,
  },
  "Sadistic": {
    nothing: 50,
    double: 10,
    invert: 15,
    double_invert: 10,
    jackpot: 2,
  },
};

export const configPresets: Record<string, Record<string, DifficultyEntry>> = {};

Object.keys(weightAdjustments).forEach((preset) => {
  configPresets[preset] = {};
  Object.keys(baseDifficulty).forEach((key) => {
    configPresets[preset][key] = {
      ...baseDifficulty[key],
      weight: weightAdjustments[preset][key],
    };
  });
});