import { registerSourceCode } from "@specs-feup/lara/jest/jestHelpers.js";
import Query from "@specs-feup/lara/api/weaver/Query.js";
import ToolJoinPoint from "@specs-feup/lara-visualization/api/public/js/ToolJoinPoint.js";

import ClavaAstConverter from "./ClavaAstConverter.js";

const source = `
int choose(int left, int right) {
    if (left < right) {
        return left;
    }

    return right;
}
`;

function flatten(root: ToolJoinPoint): ToolJoinPoint[] {
  return [root, ...root.children.flatMap(flatten)];
}

describe("ClavaAstConverter", () => {
  registerSourceCode(source);

  test("converts a Clava AST to serializable tool join points", () => {
    const converter = new ClavaAstConverter();
    const toolAst = converter.getToolAst(Query.root());
    const nodes = flatten(toolAst);

    expect(toolAst.type).toBe("program");
    expect(toolAst.children).toHaveLength(1);
    expect(toolAst.info).toEqual(
      expect.objectContaining({
        "AST ID": expect.any(String),
        "AST name": expect.any(String),
        "Program name": expect.any(String),
      })
    );

    expect(nodes.map((node) => node.id)).toEqual(
      nodes.map((_, index) => index.toString())
    );
    expect(nodes.some((node) => node.type === "function")).toBe(true);
    expect(nodes.some((node) => node.type === "if")).toBe(true);
    expect(nodes.every((node) => !node.filepath?.includes("\\\\"))).toBe(true);
    const json = toolAst.toJson();
    expect(json.id).toBe("0");
    expect(json.type).toBe("program");
    expect(json.children).toHaveLength(1);
  });

  test("maps AST nodes to escaped, syntax-highlighted source code", () => {
    const converter = new ClavaAstConverter();
    const filesCode = converter.getPrettyHtmlCode(Query.root());
    const entries = Object.entries(filesCode);

    expect(entries).toHaveLength(1);

    const [filepath, html] = entries[0];
    expect(filepath).not.toContain("\\\\");
    expect(html).toContain("&lt;");
    expect(html).not.toContain("left < right");
    expect(html).toMatch(/<span class="node-code" data-node-id="\d+">/);
    expect(html).toContain('<span class="keyword">if</span>');
    expect(html).toContain('<span class="keyword">return</span>');
  });
});
