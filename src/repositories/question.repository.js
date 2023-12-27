import * as HttpStatus from '../errors/http-status.error.js';
import { prisma } from '../utils/prisma/index.js';

export class ProductsRepository {
  createOne = async ({ title, context, userId }) => {
    const question = await prisma.questions.create({
      data: { title, context, userId },
    });

    return question;
  };

  //   readMany = async({ page }) => {
  //     const
  //   };
}
