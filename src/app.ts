import express, {
  Request as ExpressRequest,
  Response,
  NextFunction,
} from "express";
import { LRUCache } from "./cache/LRUCache";
import { TTLCache } from "./cache/TTLCache";

interface Request extends ExpressRequest {
  cache?: any;
}

const app = express();
app.use(express.json());

const caches = {
  lru: new LRUCache<any>(10),
  ttl: new TTLCache<any>(10000),
};

app.use("/cache/:type", ((
  req: Request & { cache?: any },
  res: Response,
  next: NextFunction
) => {
  const cache = caches[req.params.type as keyof typeof caches];
  if (!cache) return res.status(400).json({ error: "Invalid cache type" });
  req.cache = cache;
  next();
}) as express.RequestHandler);

app.post("/cache/:type", ((req: Request & { cache?: any }, res: Response) => {
  req.cache.set(req.body.key, req.body.value);
  res.status(201).json({ message: "Item created" });
}) as express.RequestHandler);

app.get("/cache/:type/:key", ((req: Request, res: Response) => {
  const cacheReq = req as Request & { cache: any };
  const value = cacheReq.cache.get(req.params.key);
  if (value === undefined)
    return res.status(404).json({ error: "Item not found" });
  res.json({ value });
}) as express.RequestHandler);

app.put("/cache/:type/:key", ((req: unknown, res: Response) => {
  const typedReq = req as Request & { cache: any };
  typedReq.cache.set(typedReq.params.key, typedReq.body.value);
  res.json({ message: "Item updated" });
}) as express.RequestHandler);

app.get("/cache/:type/search/:value", ((req: unknown, res: Response) => {
  const typedReq = req as Request & { cache: any };
  const results = typedReq.cache.search(typedReq.params.value);
  res.json({ results });
}) as express.RequestHandler);

app.delete("/cache/:type/:key", ((req: unknown, res: Response) => {
  const typedReq = req as Request & { cache: any };
  typedReq.cache.delete(typedReq.params.key);
  res.json({ message: "Item deleted" });
}) as express.RequestHandler);

export default app;
