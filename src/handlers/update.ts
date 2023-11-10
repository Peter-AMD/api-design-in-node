import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  const id = req.params.id;

  const update = await prisma.update.findUnique({
    where: {
      id
    }
  });

  res.json({
    data: update
  });
};

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });

  const updates = products.map((product) => product.updates);

  res.json({
    data: updates
  });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId
    }
  })

  if(!product) {
    return res.json({
      message: 'No product!'
    })
  }

  const update = await prisma.update.create({
    data: {
      body: req.body.body,
      title: req.body.title,
      product: {
        connect: {id: product.id}
      },
    }
  });

  res.json({
    data: update
  });
};

export const updateUpdates = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.productId,
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });
  
  const foundUpdate = product.updates.find((update) => update.id === req.params.id);

  if(!foundUpdate) {
    res.json({
      message: 'product update not found!'
    });
    return null;
  }

  
  const updateId = foundUpdate.id;

  const update = await prisma.update.update({
    where: {
      id: updateId
    },
    data: req.body
  })

  res.json({
    data: update
  });
};

export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.productId,
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  });
  
  const foundUpdate = product.updates.find((update) => update.id === req.params.id);

  if(!foundUpdate) {
    res.json({
      message: 'product update not found!'
    });
    return null;
  }

  
  const updateId = foundUpdate.id;

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: updateId
    }
  })

  res.json({
    data: deletedUpdate
  });
};