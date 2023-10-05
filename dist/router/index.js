"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigate = exports.getUrlParams = exports.Link = exports.Router = void 0;
const routehelpers_1 = require("./routehelpers");
Object.defineProperty(exports, "getUrlParams", { enumerable: true, get: function () { return routehelpers_1.getUrlParams; } });
Object.defineProperty(exports, "navigate", { enumerable: true, get: function () { return routehelpers_1.navigate; } });
const router_1 = __importDefault(require("./router"));
exports.Router = router_1.default;
const Link_1 = __importDefault(require("./Link"));
exports.Link = Link_1.default;
//# sourceMappingURL=index.js.map