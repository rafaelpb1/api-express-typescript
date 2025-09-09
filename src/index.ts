import express from "express";
import { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


type Usuario = {
    id: number,
    nome: string,
    sobrenome: string,
    idade: number
};

let users : Usuario[] = [
    {id: 1, nome: "Pedro", sobrenome: "Simões", idade: 20},
    {id: 2, nome: "Rafael", sobrenome: "Luna", idade: 20}
];

app.get("/users", (req: Request, res: Response) => {
    res.json({
        data: users,
        total: users.length
    });
});

app.post("/users", (req: Request, res: Response) => {
    const novoUsuario = req.body;
    users.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.put("/users/:id", (req: Request, res: Response) => {
    const usuarioAtualizado = req.body;
    const id = parseInt(req.params.id);

    const indice = users.findIndex(user => user.id === id);

    if (indice === -1) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
    users[indice] = { ...users[indice], ...usuarioAtualizado };

    res.status(200).json(users[indice]);
    console.log(`O usuário com id ${id} foi alterado!`, users[indice]);
});

app.delete("/users/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const indice = users.findIndex(user => user.id === id);

    if (indice == -1) {
        return res.status(404).json({message: "Usuário não encontrado.!"});
    };
    const usuarioRemovido = users.splice(indice, 1);

    res.status(200).json(usuarioRemovido);
    console.log(`O usuário com id ${id} foi deletado!`);
});

app.listen(PORT, () => {
    console.log(`🚀 A API subiu com sucesso na porta ${PORT}`);
});
