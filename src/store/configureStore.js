import prod from "./configureStore.prod.js";
import dev from "./configureStore.dev.js";

const isProd =
  (typeof import.meta !== "undefined" && import.meta.env?.PROD) ||
  process.env.NODE_ENV === "production";

export const configureStore = (initialState) => {
  if (isProd) {
    return prod(initialState);
  }
  return dev(initialState);
};