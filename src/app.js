const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path")

app.listen(process.env.PORT || 3418, ()=> console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3418}`))

app.use(express.static(path.resolve(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require("./routes/main-router");
app.use(mainRouter);

app.use((req,res,next) => {
    return res.redirect("/");
})
