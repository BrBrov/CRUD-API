/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/db/db.ts":
/*!**********************!*\
  !*** ./src/db/db.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.database = exports.DataBase = void 0;\nclass DataBase {\n    database;\n    constructor() {\n        this.database = [];\n    }\n    addUser(user) {\n        if (this.database.find((item) => item.id === user.id)) {\n            return null;\n        }\n        this.database.push(user);\n        console.log(this.database);\n        return user;\n    }\n    getAllUsers() {\n        return this.database;\n    }\n    getOneUser(id) {\n        const user = this.database.find((user) => user.id === id);\n        return user ? user : null;\n    }\n    updateUser(user) {\n        const userIndex = this.database.findIndex((item) => item.id === user.id);\n        if (userIndex == -1)\n            return null;\n        const returnUser = { ...this.database[userIndex], ...user };\n        return returnUser;\n    }\n    deleteUser(user) {\n        const indexUser = this.database.findIndex((item) => item.id === user.id);\n        if (indexUser == -1)\n            return false;\n        this.database = [...this.database.slice(0, indexUser), ...this.database.slice(indexUser + 1)];\n        return true;\n    }\n}\nexports.DataBase = DataBase;\nexports.database = new DataBase();\n\n\n//# sourceURL=webpack://crud-api/./src/db/db.ts?");

/***/ }),

/***/ "./src/handlers/get.ts":
/*!*****************************!*\
  !*** ./src/handlers/get.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst db_1 = __webpack_require__(/*! ../db/db */ \"./src/db/db.ts\");\nconst status_codes_1 = __importDefault(__webpack_require__(/*! ../models/status-codes */ \"./src/models/status-codes.ts\"));\nclass GetHandler {\n    database;\n    constructor(req, res) {\n        this.database = db_1.database;\n        this.handler(req, res);\n    }\n    handler(req, res) {\n        const parseURL = req.url.split('/');\n        const api = parseURL.length > 1 ? parseURL.slice(0, 2) : null;\n        const id = parseURL[2] ? parseURL[2] : null;\n        if (!api || api.join('/') !== 'api/users') {\n            this.sendErr(res);\n            return;\n        }\n        if (!Number(id)) {\n            this.sendErr(res);\n            return;\n        }\n        if (id) {\n            const user = this.database.getOneUser(id);\n            if (user) {\n                res.statusCode = status_codes_1.default.OK;\n                res.write({\n                    status: status_codes_1.default.OK,\n                    data: user\n                });\n            }\n            else {\n                res.statusCode = status_codes_1.default.Undefined;\n                res.write({\n                    status: status_codes_1.default.Undefined,\n                    data: 'User does not exits!'\n                });\n            }\n            res.end();\n        }\n        else {\n            const allUsers = this.database.getAllUsers();\n            res.statusCode = status_codes_1.default.OK;\n            res.write({\n                status: status_codes_1.default.OK,\n                data: allUsers\n            });\n            res.end();\n        }\n    }\n    sendErr(res) {\n        res.statusCode = status_codes_1.default.Invalid;\n        res.write({\n            status: status_codes_1.default.Undefined,\n            data: 'Wrong API request'\n        });\n        res.end();\n    }\n}\nexports[\"default\"] = GetHandler;\n\n\n//# sourceURL=webpack://crud-api/./src/handlers/get.ts?");

/***/ }),

/***/ "./src/handlers/post.ts":
/*!******************************!*\
  !*** ./src/handlers/post.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst db_1 = __webpack_require__(/*! ../db/db */ \"./src/db/db.ts\");\nconst status_codes_1 = __importDefault(__webpack_require__(/*! ../models/status-codes */ \"./src/models/status-codes.ts\"));\nconst user_checker_1 = __importDefault(__webpack_require__(/*! ../utilites/user-checker */ \"./src/utilites/user-checker.ts\"));\nclass PostHandler {\n    database;\n    constructor(req, res) {\n        this.database = db_1.database;\n        this.handler(req, res);\n    }\n    handler(req, res) {\n        req.on('data', (data) => {\n            const dataResived = data.toString();\n            const user = JSON.parse(dataResived);\n            if (new user_checker_1.default(user).result()) {\n                const result = this.database.addUser(user);\n                console.log(result);\n                if (result) {\n                    res.statusCode = status_codes_1.default.Created;\n                    res.write(JSON.stringify({\n                        status: status_codes_1.default.Created,\n                        data: result\n                    }));\n                    res.end();\n                }\n                else {\n                    this.sendErr(res);\n                }\n            }\n            else {\n                this.sendErr(res);\n            }\n        });\n    }\n    sendErr(res) {\n        res.statusCode = status_codes_1.default.Invalid;\n        res.write(JSON.stringify({\n            status: status_codes_1.default.Undefined,\n            data: 'Wrong API request'\n        }));\n        res.end();\n    }\n}\nexports[\"default\"] = PostHandler;\n\n\n//# sourceURL=webpack://crud-api/./src/handlers/post.ts?");

/***/ }),

/***/ "./src/models/status-codes.ts":
/*!************************************!*\
  !*** ./src/models/status-codes.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar StatusCodes;\n(function (StatusCodes) {\n    StatusCodes[StatusCodes[\"OK\"] = 200] = \"OK\";\n    StatusCodes[StatusCodes[\"Created\"] = 201] = \"Created\";\n    StatusCodes[StatusCodes[\"Delete\"] = 204] = \"Delete\";\n    StatusCodes[StatusCodes[\"Invalid\"] = 400] = \"Invalid\";\n    StatusCodes[StatusCodes[\"Undefined\"] = 404] = \"Undefined\";\n    StatusCodes[StatusCodes[\"Error\"] = 500] = \"Error\";\n})(StatusCodes || (StatusCodes = {}));\nexports[\"default\"] = StatusCodes;\n\n\n//# sourceURL=webpack://crud-api/./src/models/status-codes.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst node_os_1 = __webpack_require__(/*! node:os */ \"node:os\");\nconst node_cluster_1 = __importDefault(__webpack_require__(/*! node:cluster */ \"node:cluster\"));\nconst cluster_ports_1 = __importDefault(__webpack_require__(/*! ./utilites/cluster-ports */ \"./src/utilites/cluster-ports.ts\"));\nconst handlerServer_1 = __importDefault(__webpack_require__(/*! ./utilites/handlerServer */ \"./src/utilites/handlerServer.ts\"));\nconst serverHandler_1 = __importDefault(__webpack_require__(/*! ./utilites/serverHandler */ \"./src/utilites/serverHandler.ts\"));\nconst multi = process.argv[2] ? process.argv[2]?.split(' ') : [''];\nconst portArr = multi.length > 2 ? multi[2] : null;\nlet port = Number(portArr) ? portArr : null;\nif (!port) {\n    port = \"4000\" || 0;\n    (0, serverHandler_1.default)(port, handlerServer_1.default);\n}\nelse {\n    const paralellism = (0, node_os_1.availableParallelism)();\n    const portsClusters = new cluster_ports_1.default(port, paralellism).getPorts();\n    let serverIndex;\n    if (node_cluster_1.default.isPrimary) {\n        for (let i = 0; i < paralellism; i += 1) {\n            const worker = node_cluster_1.default.fork();\n            serverIndex = i;\n            worker.on('exit', () => {\n                console.log(`Worker on ${port} was exit`);\n                node_cluster_1.default.fork();\n            });\n        }\n    }\n    else {\n        (0, serverHandler_1.default)(portsClusters[serverIndex], handlerServer_1.default);\n    }\n}\n\n\n//# sourceURL=webpack://crud-api/./src/server.ts?");

/***/ }),

/***/ "./src/utilites/cluster-ports.ts":
/*!***************************************!*\
  !*** ./src/utilites/cluster-ports.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass GeneratePorts {\n    ports;\n    constructor(port, paralellism) {\n        const portInNumber = Number(port);\n        this.generate(portInNumber, paralellism);\n    }\n    generate(port, paralelism) {\n        for (let i = 1; i <= paralelism; i += 1) {\n            this.ports.push(String(port + i));\n        }\n    }\n    getPorts() {\n        return this.ports;\n    }\n}\nexports[\"default\"] = GeneratePorts;\n\n\n//# sourceURL=webpack://crud-api/./src/utilites/cluster-ports.ts?");

/***/ }),

/***/ "./src/utilites/handlerServer.ts":
/*!***************************************!*\
  !*** ./src/utilites/handlerServer.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst post_1 = __importDefault(__webpack_require__(/*! ../handlers/post */ \"./src/handlers/post.ts\"));\nconst get_1 = __importDefault(__webpack_require__(/*! ../handlers/get */ \"./src/handlers/get.ts\"));\nconst status_codes_1 = __importDefault(__webpack_require__(/*! ../models/status-codes */ \"./src/models/status-codes.ts\"));\nfunction handlerServer(req, res) {\n    switch (req.method) {\n        case 'GET':\n            new get_1.default(req, res);\n            break;\n        case 'POST':\n            new post_1.default(req, res);\n            break;\n        case 'PUT':\n            break;\n        case 'DELETE':\n            break;\n        default:\n            res.statusCode = status_codes_1.default.Undefined;\n            res.write(JSON.stringify({\n                status: status_codes_1.default.Undefined,\n                data: 'Wrong API request'\n            }));\n            res.end();\n            break;\n    }\n}\nexports[\"default\"] = handlerServer;\n;\n\n\n//# sourceURL=webpack://crud-api/./src/utilites/handlerServer.ts?");

/***/ }),

/***/ "./src/utilites/serverHandler.ts":
/*!***************************************!*\
  !*** ./src/utilites/serverHandler.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst node_http_1 = __importDefault(__webpack_require__(/*! node:http */ \"node:http\"));\nfunction raiseServer(port, handlerServer) {\n    const server = node_http_1.default.createServer(handlerServer);\n    server.listen(port, () => console.log(`Server started on localhost:${port}`));\n    return server;\n}\nexports[\"default\"] = raiseServer;\n\n\n//# sourceURL=webpack://crud-api/./src/utilites/serverHandler.ts?");

/***/ }),

/***/ "./src/utilites/user-checker.ts":
/*!**************************************!*\
  !*** ./src/utilites/user-checker.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass UserChecker {\n    isTrue;\n    constructor(user) {\n        this.checker(user);\n    }\n    checker(user) {\n        try {\n            const id = user.id;\n            if (!id)\n                throw new Error('Field is wrong');\n            const age = user.age;\n            if (!age)\n                throw new Error('Field is wrong');\n            const name = user.username;\n            if (!name)\n                throw new Error('Field is wrong');\n            const hobbies = user.hobbies;\n            if (!hobbies)\n                throw new Error('Field is wrong');\n            this.isTrue = true;\n        }\n        catch (err) {\n            this.isTrue = false;\n        }\n    }\n    result() {\n        return this.isTrue;\n    }\n}\nexports[\"default\"] = UserChecker;\n\n\n//# sourceURL=webpack://crud-api/./src/utilites/user-checker.ts?");

/***/ }),

/***/ "node:cluster":
/*!*******************************!*\
  !*** external "node:cluster" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("node:cluster");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:os");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	
/******/ })()
;