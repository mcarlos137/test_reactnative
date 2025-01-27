//import supertest from "supertest"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { start as startHttpMockedServer } from "../tools/httpMockedServer"

test("it shows a message when there are no reminders", async () => {
  startHttpMockedServer(AsyncStorage)
})