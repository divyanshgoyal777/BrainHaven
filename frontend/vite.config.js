import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // This allows access from local network devices
    port: 5174, // (optional) specify the port if you want to use a custom port
  },
});
