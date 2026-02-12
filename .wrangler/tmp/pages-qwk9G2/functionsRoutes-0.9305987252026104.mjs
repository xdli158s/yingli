import { onRequest as __api_bets_js_onRequest } from "C:\\Users\\victo\\Desktop\\aaaaaaa\\functions\\api\\bets.js"
import { onRequest as __api_history_js_onRequest } from "C:\\Users\\victo\\Desktop\\aaaaaaa\\functions\\api\\history.js"
import { onRequest as __api_settle_js_onRequest } from "C:\\Users\\victo\\Desktop\\aaaaaaa\\functions\\api\\settle.js"

export const routes = [
    {
      routePath: "/api/bets",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_bets_js_onRequest],
    },
  {
      routePath: "/api/history",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_history_js_onRequest],
    },
  {
      routePath: "/api/settle",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_settle_js_onRequest],
    },
  ]