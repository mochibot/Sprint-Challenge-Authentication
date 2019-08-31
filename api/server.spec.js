const request = require('supertest');
const bcrypt = require('bcryptjs');
const server = require('./server');
const db = require('../database/dbConfig');

describe('POST /api/auth/register', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })

  it('should increase the number of users by 1', async () => {
    const currUsers = await db('users')

    await request(server)
      .post('/api/auth/register')
      .send({
        username: 'username1',
        password: 'password1'
      })

    const updatedUsers = await db('users')
    expect(updatedUsers).toHaveLength(currUsers.length + 1);
  })

  it('should return the new user with status code 201', () => {
    return request(server)
      .post('/api/auth/register')
      .send({
        username: 'username2',
        password: 'password2'
      })
      .then(response => {
        expect(response.body.username).toBe('username2')
        expect(response.status).toBe(201)
      })
  })
})

describe('/POST /api/auth/login', () => {
  it('should return an object with token and message', async () => {
    await db('users').insert({
      username: 'username3',
      password: bcrypt.hashSync('password3', 12),
    });

    request(server)
      .post('/api/auth/login')
      .send({
        username: 'username3',
        password: 'password3',
      })
      .then(response => {
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('message')
      })
  })

  it('should return a status code of 200', () => {
    return request(server)
      .post('/api/auth/login')
      .send({
        username: 'username3',
        password: 'password3',
      })
      .then(response => {
        expect(response.status).toBe(200)
      })
  })
})

let token; 

describe('GET /api/jokes', () => {
  beforeAll(done => {
    request(server)
      .post('/api/auth/login')
      .send({
        username: 'username3',
        password: 'password3',
      })
      .end((error, response) => {
        token = response.body.token; 
        done();
      })
  })

  it('should return an array of data', () => {
    return request(server)
      .get('/api/jokes')
      .set('Authorization', token)
      .then(response => {
        expect(Array.isArray(response.body)).toBe(true)
      })
  })

  it('should return a status code of 200', () => {
    return request(server)
      .get('/api/jokes')
      .set('Authorization', token)
      .then(response => {
        expect(response.status).toBe(200)
      })
  })
})