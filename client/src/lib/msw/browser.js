import { setupWorker } from "msw/browser";
import handlers from "./worker";

export const worker = setupWorker(...handlers);
