import prisma from '../db';

// Geeet all
export const getProducts = async (req, res) => {
  const products = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      products: true
    }
  });

  res.json({
    data: products
  });
}

// Geeet one
export const getProduct = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      belongsToId: req.user.id,
      id: req.params.id
    }
  });

  res.json({
    data: product
  });
}

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    }
  });

  res.json({
    data: product
  })
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.name
    }
  });

  res.json({
    data: updatedProduct
  });
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    }
  });

  res.json({
    data: deleted
  });
}