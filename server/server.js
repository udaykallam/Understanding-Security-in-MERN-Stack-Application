require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const placeRoute = require("./router/places-router");
const adminRoute = require('./router/admin-router');
const cityRoute = require('./router/city-router');
const userRoute = require('./router/user-router');

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/places", placeRoute);
app.use("/api/admin", adminRoute);
app.use("/api/users", userRoute);
app.use("/api/cities", cityRoute);

app.use(errorMiddleware);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`);
  });
});
