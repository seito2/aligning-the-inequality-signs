import { RuleTester } from "eslint";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { aligningInequalitySigns } = require("./aligning-inequality-signs");

const ruleTester = new RuleTester();

ruleTester.run("aligning-inequality-signs", aligningInequalitySigns, {
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
    {
      code: "0 >= testValueB",
      errors: [
        {
          messageId: "shouldAlignInequalitySigns",
          suggestions: [{ output: "testValueB <= 0" }],
        },
      ],
    },
    {
      code: "0 > 1",
      errors: [
        {
          messageId: "shouldAlignInequalitySigns",
          suggestions: [{ output: "1 < 0" }],
        },
      ],
    },
    {
      code: "test.object.property > 1",
      errors: [
        {
          messageId: "shouldAlignInequalitySigns",
          suggestions: [{ output: "1 < test.object.property" }],
        },
      ],
    },
    {
      code: "test.at(0).property > 1",
      errors: [
        {
          messageId: "shouldAlignInequalitySigns",
          suggestions: [{ output: "1 < test.at(0).property" }],
        },
      ],
    },
  ],
});
