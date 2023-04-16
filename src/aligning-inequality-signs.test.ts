import { RuleTester } from "eslint";
const rule = require("./aligning-inequality-signs");

const ruleTester = new RuleTester();

ruleTester.run("aligning-inequality-signs", rule, {
  valid: ["a < b"],
  invalid: [
    {
      code: "testValueA > testValueB",
      errors: [
        {
          messageId: "shouldAlignInequalitySigns",
          suggestions: [{ output: "testValueB < testValueA" }],
        },
      ],
    },
    {
      code: "testValueA >= testValueB",
      errors: [
        {
          messageId: "shouldAlignInequalitySigns",
          suggestions: [{ output: "testValueB <= testValueA" }],
        },
      ],
    },
  ],
});
