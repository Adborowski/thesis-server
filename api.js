const express = require('express');
const router = express.Router();
const Task = require('./models/task');

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID);

// from https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
router.post("/api/v1/auth/google", async (req, res) => {
  const { token }  = req.body
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });

  const { name, email, picture } = ticket.getPayload();    
  // const user = await db.user.upsert({ 
  //     where: { email: email },
  //     update: { name, picture },
  //     create: { name, email, picture }
  // })

  res.status(201)
  res.json(user)
})

router.get('/tasks', (req, res, next) => {
    Task.find()
    .then((data) => res.json(data))
    .catch(next);
  });
  
router.post('/tasks', (req, res, next) => {
// post task
res.send(req.body);
});
  
router.delete('/tasks/:id', (req, res, next) => {
res.send(req.params.id);
});
  
module.exports = router;
  