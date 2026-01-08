const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

app.post("/login", (req, res) => {
    const { user } = req.body;
    if (!users[user]) users[user] = { saldo: 1000 };
    res.json({ user, saldo: users[user].saldo });
});

app.post("/slot", (req, res) => {
    const { user, aposta } = req.body;
    if (!users[user] || users[user].saldo < aposta) {
        return res.status(400).json({ error: "Saldo insuficiente" });
    }

    users[user].saldo -= aposta;

    const symbols = ["🍒","🍋","⭐","🔔","🍉"];
    const r = symbols.sort(() => 0.5 - Math.random()).slice(0,3);

    let win = r[0] === r[1] && r[1] === r[2];
    if (win) users[user].saldo += aposta * 6;

    res.json({ reels: r, win, saldo: users[user].saldo });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando"));
