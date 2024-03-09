const express = require ('express');
const uuid=require('uuid');
const cors = require('cors');




const port = 3001;
const app = express()
app.use(express.json());
app.use(cors());



const users = [];

const ckeckUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ erro: "User not found"})
    }

    request.userIndex = index
    request.UserId = id

    next()
}
app.get('/users', (request, response) => {              /*GET ->buscar informaçao no back-end */

    return response.json(users)
})
app.post('/users', (request, response) => {       /*Post ->Criar informaçao no back-end */

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age };

    users.push(user);

    return response.status(201).json(user)
})

app.put('/users:id', ckeckUserId, (request, response) => {        /*Put ->alterar/atualizar informaçoes no back-end */
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.UserId

    const updatedUser = { id, name, age }

    users[index] = users.findIndex(user => user.id === id)

    return response.json(updatedUser)
})

app.delete('/users/:id', ckeckUserId, (request, response) => {        /*Delete => deletar informaçao no back-end */
const index = request.userIndex;  
 

    users.splice(index, 1)

    return response.status(204).json();
})


app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})