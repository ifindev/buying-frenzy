import 'mocha'
import server from '../../src/server/server'
import * as chai from 'chai'
import chaiHttp = require('chai-http')

chai.use(chaiHttp)
const { expect } = chai

describe('routes : index', () => {
	describe('GET /', () => {
		it('should return json', (done) => {
			chai
				.request(server)
				.get('/')
				.end((err, res) => {
					expect(err).to.be.null
					expect(res.status).eql(200)
					expect(res.type).eql('application/json')
					expect(res.body.message).equal('Hello World!')
					done()
				})
		})
	})
})
