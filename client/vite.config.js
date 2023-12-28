import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// export default defineConfig(
//   ({ command, mode }) => {
//     const env = loadEnv(mode, process.cwd(), "");
//     return {
//       define: {
//         "process.env.VITE_API_BASE_URL": JSON.stringify(env.VITE_API_BASE_URL),
//         // If you want to exposes all env variables, which is not recommended
//         // 'process.env': env
//       },
//     };
//   },
//   {
//     plugins: [react()],
//   }
// );
