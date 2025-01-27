//PRINCIPAL
import { AsyncStorageStatic } from "@react-native-async-storage/async-storage";
//TYPES
import { User } from "../types"

const AuxStore = class AuxStore {

    asyncStorage: AsyncStorageStatic;

    constructor(asyncStorage: AsyncStorageStatic) {
        this.asyncStorage = asyncStorage;
    }

    getMockedUsers = async () => {
        let mockedUsers = await this.asyncStorage.getItem('mockedUsers')
        if (mockedUsers === null) {
            mockedUsers = '[]'
            await this.asyncStorage.setItem('mockedUsers', mockedUsers)
        }
        return JSON.parse(mockedUsers)
    }

    getMockedUserById = async (id: string) => {
        const mockedUsers: User[] = await this.getMockedUsers()
        const mockedUser = mockedUsers.find(user => user.id === id)
        if (mockedUser) {
            return mockedUser
        }
        throw new Error('user id does not exist');
    }

    createMockedUser = async (user: User) => {
        const mockedUsers: User[] = await this.getMockedUsers()
        let mockedUser = mockedUsers.find(u => u.phone === user.phone)
        if (mockedUser) {
            return mockedUser
        }
        user.id = (Math.random() + 1).toString(36).substring(7)
        mockedUsers.push(user)
        await this.asyncStorage.setItem('mockedUsers', JSON.stringify(mockedUsers))
        return user
    }

    updateMockedUser = async (id: string, user: User) => {
        const mockedUsers: User[] = await this.getMockedUsers()
        mockedUsers.some(u => {
            if (u.id === id) {
                u.firstName = user.firstName
                u.lastName = user.lastName
                u.email = user.email
                u.phone = user.phone
            }
            return u.id === id
        })
        this.asyncStorage.setItem('mockedUsers', JSON.stringify(mockedUsers))
        user.id = id
        return user
    }

};

export default AuxStore

