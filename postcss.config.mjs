import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

const stripTailwindLayers = () => ({
  postcssPlugin: "strip-tailwind-layers",
  AtRule: {
    layer: (atRule) => {
      atRule.replaceWith(atRule.nodes || []);
    },
  },
});
stripTailwindLayers.postcss = true;

export default {
  plugins: [
    tailwindcss(),
    stripTailwindLayers(),
    autoprefixer(),
  ],
};
