import type { Rule } from "eslint";
import type { BinaryExpression } from "estree";
import { generate } from "astring";

const replaceLeftAndRight = (node: BinaryExpression): string | null => {
  const { left, right } = node;

  const leftValue = generate(left);
  const rightValue = generate(right);

  if (node.operator === ">") {
    return `${rightValue} < ${leftValue}`;
  } else if (node.operator === ">=") {
    return `${rightValue} <= ${leftValue}`;
  }

  return null;
};

const aligningInequalitySigns = {
  meta: {
    type: "suggestion",
    docs: { description: "Aligning inequality signs" },
    messages: {
      shouldAlignInequalitySigns: "Inequality signs should be aligned",
    },
    hasSuggestions: true,
  },
  create(context: Rule.RuleContext) {
    return {
      BinaryExpression(node) {
        if (node.operator === ">" || node.operator === ">=") {
          context.report({
            node,
            messageId: "shouldAlignInequalitySigns",
            suggest: [
              {
                messageId: "shouldAlignInequalitySigns",
                fix(fixer: Rule.RuleFixer) {
                  return fixer.replaceText(node, replaceLeftAndRight(node) ?? "");
                },
              },
            ],
          });
        }
      },
    };
  },
} satisfies Rule.RuleModule;

exports.aligningInequalitySigns = aligningInequalitySigns;
