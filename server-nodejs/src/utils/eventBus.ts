/** src/utils/eventBus.ts */

import { EventEmitter } from "events";

const eventBus = new EventEmitter();

eventBus.setMaxListeners(100);

export default eventBus;
