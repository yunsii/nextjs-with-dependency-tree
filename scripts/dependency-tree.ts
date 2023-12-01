import { path, fs } from "zx";
import dependencyTree from "dependency-tree";
import postcss from "postcss";
import tailwind from "tailwindcss";
import loadPostcssConfig from "postcss-load-config";

import tailwindConfig from "../tailwind.config";

async function main() {
  const tree = dependencyTree.toList({
    filename: path.join(process.cwd(), "src", "pages", "index.tsx"),
    directory: path.join(process.cwd(), "src"),
    filter: (path) => {
      if (path.includes("node_modules")) {
        return false;
      }
      return true;
    },
    tsConfig: path.join(process.cwd(), "tsconfig.json"),
    noTypeDefinitions: true,
  });

  const { plugins, options } = await loadPostcssConfig();
  const tailwindIndex = plugins.findIndex((item) => {
    return item.toString().includes("tailwindcss");
  });
  plugins.splice(
    tailwindIndex,
    1,
    // ref: https://github.com/tailwindlabs/tailwindcss/discussions/1442#discussioncomment-4103374
    tailwind({
      ...tailwindConfig,
      content: [],
    })
  );
  const result = await postcss(plugins).process(`@tailwind base;@tailwind components;@tailwind utilities;`, {
    from: undefined,
    ...options,
  });
  fs.writeFileSync("./result.css", result.css, "utf-8");
}

main();
