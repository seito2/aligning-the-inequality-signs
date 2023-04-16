import type { Rule } from "eslint";
import type { BinaryExpression, Expression, Identifier } from "estree";

const isIdentifier = (node: Expression): node is Identifier => node.type === "Identifier";

const replaceLeftAndRight = (node: BinaryExpression) => {
  const { left, right } = node;

  if (!isIdentifier(left) || !isIdentifier(right)) {
    return null;
  }

  if (node.operator === ">") {
    return `${right.name} < ${left.name}`;
  } else if (node.operator === ">=") {
    return `${right.name} <= ${left.name}`;
  }

  return null;
};

const rule = {
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

module.exports = rule;
