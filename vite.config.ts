import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({ ssr: false })],
  optimizeDeps: {exclude: ["@solidjs/router"]}
  //the solid js router does not work in development mode in vite without the router being excluded
});
