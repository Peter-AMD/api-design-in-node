import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password)
      }
    });
    const token = createJWT(user);
    res.json({token});
  } catch(e) {
    console.log('e', e)
    // ideally inspect e to pass correct type and values for error
    e.type = 'input';
    next(e);
  }
  
}

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  });

  if(!user) {
    res.status(401);
    res.json({
      message: "Nopeeee, username and password combination doesn't match"
    });
    return null;
  }
  const isValid = await comparePasswords(req.body.password, user.password);
  if(!isValid) {
    res.status(401);
    res.json({
      message: "Nopeeee, username and password combination doesn't match"
    });
    return null;
  }

  const token = createJWT(user);
  res.json({token})
}