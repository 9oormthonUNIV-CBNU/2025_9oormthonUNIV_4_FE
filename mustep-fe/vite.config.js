import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: "**/*.svg" })],
  server: {
    port: 3000, // dev 서버 포트 3000으로 변경
    proxy: {
      // 스프링 백엔드가 8080에서 돌아가고 있을 때,
      // /oauth2/**, /auth/** 등은 자동으로 8080으로 포워딩
      "/oauth2": {
        target: "http://ec2-13-209-5-104.ap-northeast-2.compute.amazonaws.com:8080",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://ec2-13-209-5-104.ap-northeast-2.compute.amazonaws.com:8080",
        changeOrigin: true,
      },
      // 필요하다면 추가 엔드포인트도 등록하세요
    },
  },
});
