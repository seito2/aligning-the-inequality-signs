const isIdentifier = (node) => node.type === "Identifier";
const replaceLeftAndRight = (node) => {
    const { left, right } = node;
    if (!isIdentifier(left) || !isIdentifier(right)) {
        return null;
    }
    if (node.operator === ">") {
        return `${right.name} < ${left.name}`;
    }
    else if (node.operator === ">=") {
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
    create(context) {
        return {
            BinaryExpression(node) {
                if (node.operator === ">" || node.operator === ">=") {
                    context.report({
                        node,
                        messageId: "shouldAlignInequalitySigns",
                        suggest: [
                            {
                                messageId: "shouldAlignInequalitySigns",
                                fix(fixer) {
                                    var _a;
                                    return fixer.replaceText(node, (_a = replaceLeftAndRight(node)) !== null && _a !== void 0 ? _a : "");
                                },
                            },
                        ],
                    });
                }
            },
        };
    },
};
module.exports = rule;
export {};
