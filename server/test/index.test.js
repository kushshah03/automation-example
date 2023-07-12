const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, server} = require('../index'); // Assuming the Node.js app is defined in index.js

chai.use(chaiHttp);
const expect = chai.expect;

describe('Node.js UI Application', () => {


  describe('GET /', () => {
    it('should render the form page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.text).to.include('Demo Form');
          done();
        });
    });
  });

  describe('POST /submit', () => {
    it('should redirect to the submitted page with valid data', (done) => {
      chai.request(app)
        .post('/submit')
        .send({ firstName: 'John', lastName: 'Doe' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should display an error message for empty fields', (done) => {
      chai.request(app)
        .post('/submit')
        .send({ firstName: '', lastName: '' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.text).to.include('All fields are required');
          done();
        });
    });
  });

});

