var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "express", "socket.io", "./config/db", "./model/store", "./config/redis", "path"], function (require, exports, express_1, socket_io_1, db_1, store_1, redis_1, path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    express_1 = __importDefault(express_1);
    store_1 = __importDefault(store_1);
    path_1 = __importDefault(path_1);
    require("dotenv").config();
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 5500;
    app.use(express_1.default.static("../client"));
    let isRedisAvailable = true;
    app.set('views', path_1.default.join(__dirname, '../client'));
    app.set('view engine', 'ejs');
    // Routes
    app.get("/", (req, res) => {
        return res.render("index");
        // res.json({
        //   response: "OK",
        // });
    });
    app.get("/fetchAllTasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // query DB
        // res.render("index")
        let result;
        let count;
        try {
            if (!isRedisAvailable) {
                //
                result = yield redis_1.client.lRange("backend_task_divyam", 0, -1);
                count = yield redis_1.client.lLen("backend_task_divyam");
            }
            else {
                result = yield store_1.default.find();
                count = yield store_1.default.count();
            }
            let send = [];
            for (let i = 0; i < result.length; i++) {
                send.push(result[i].text);
            }
            return res.render('notes', {
                Count: count,
                List: JSON.stringify(result),
            });
            // return res.json({
            //   status: "true",
            //   message: {
            //     Count: count,
            //     List: result,
            //   },
            // });
        }
        catch (error) {
            return res.render("index");
            // return res.json({
            //   status: "false",
            //   message: error,
            // });
        }
    }));
    // create server
    const server = app.listen(PORT, () => {
        console.log(`server is runnnig at PORT ${PORT} `);
        (0, db_1.db)();
        (0, redis_1.init_redis)();
    });
    // socket IO init
    let io = new socket_io_1.Server(server);
    io.on("connect", (socket) => {
        console.log(socket.id);
        socket.on("add", (msg) => __awaiter(void 0, void 0, void 0, function* () {
            const cnt = yield store_1.default.count();
            let res;
            if (cnt + 1 > 50) {
                if (isRedisAvailable) {
                    // flush redis
                    isRedisAvailable = false;
                    redis_1.client.del("backend_task_divyam");
                    console.log("redis flushed !!");
                }
                res = yield store_1.default.create({ text: msg });
            }
            else {
                // store in mongoDB
                res = yield store_1.default.create({ text: msg });
                // store in redis
                redis_1.client.lPush("backend_task_divyam", JSON.stringify(msg));
            }
            // io.emit("update_notes" , res)
            // store in DB
        }));
    });
});
