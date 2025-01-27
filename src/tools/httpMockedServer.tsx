//PRINCIPAL
import { createServer } from "miragejs"
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage"
//STORES
import AuxStore from "../stores/aux"
//TYPES
import { User } from "../types"

export const start = (asyncStorage: AsyncStorageStatic) => {
    console.log('STARTING HTTP MOCKED SERVER')

    const auxStore = new AuxStore(asyncStorage)

    return createServer({
        environment: "test",
        routes() {
            this.namespace = '/',
                this.get('/users', async () => {
                    return await auxStore.getMockedUsers()
                }),
                this.get("/users/:id", async (schema, request) => {
                    const id = request.params.id
                    return await auxStore.getMockedUserById(id)
                }),
                this.post('/users/save', async (schema, request) => {
                    const user: User = JSON.parse(request.requestBody)
                    return await auxStore.createMockedUser(user)
                }),
                this.put('/users/:id', async (schema, request) => {
                    const id = request.params.id
                    const user: User = JSON.parse(request.requestBody)
                    return await auxStore.updateMockedUser(id, user)
                })
        }
    })
} 