const request = require("supertest")
const baseUrl = "http://localhost:5000"
const db = require('../helpers/mongo-memory-db')
const app = require('../index')

const agent = request.agent(app)

beforeAll(async () => await db.connect())
beforeEach(async () => await db.clear())
afterAll(async () => await db.close())

describe("getting authentication route", () => {
	it("should return succes", async () => {
		await request(baseUrl)
		.post("/register")
		.expect(201)
	})
})
