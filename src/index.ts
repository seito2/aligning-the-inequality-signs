// eslint-disable-next-line @typescript-eslint/no-var-requires
const { aligningInequalitySigns } = require("./rules/aligning-inequality-signs");

export = {
  rules: {
    "aligning-inequality-signs": aligningInequalitySigns,
  },
  configs: {
    all: {
      plugins: ["aligning-inequality-signs"],
      rules: {
        "aligning-inequality-signs/aligning-inequality-signs": "error",
      },
    },
  },
};
