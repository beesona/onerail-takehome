import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const port: number = parseInt(process.env.PORT as string, 10) || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
