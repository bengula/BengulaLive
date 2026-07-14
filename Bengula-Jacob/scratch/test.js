const line = '  D --> E["5. Buyer pays into a controlled account; lender takes principal + fee, SME keeps the margin"]';

function normalizeMermaidChart(chart) {
  return chart
    .split("\n")
    .map((line) => {
      if (line.trimStart().startsWith("%%")) {
        return line;
      }

      // 1. Replace % with #37;
      let processed = line.replace(/%/g, "#37;");

      // 2. Escape semicolons and replace \n inside double quoted strings
      processed = processed.replace(/"([^"]*)"/g, (match, p1) => {
        const cleanedContent = p1
          .replace(/#37;/g, "%")
          .replace(/<br\s*\/?>/gi, "\\n");
        return `"${cleanedContent}"`;
      });

      return processed;
    })
    .join("\n");
}

console.log("Input: ", line);
console.log("Output:", normalizeMermaidChart(line));
