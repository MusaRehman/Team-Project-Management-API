import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";
import "./models/index.js";

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();
  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
