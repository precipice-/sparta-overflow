import * as HttpStatus from '../errors/http-status.error.js';
import { prisma } from '../utils/prisma/index.js';

export class QuestionRepository {
  createOne = async ({ title, content, UserId }) => {
    const question = await prisma.questions.create({
      data: { title, content, UserId },
    });

    return question;
  };

  readMany = async ({ page }) => {
    const takes = Number(page) * 20;
    const skips = (Number(page) - 1) * 20;
    const questions = await prisma.questions.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: {
        takes,
      },
      skip: {
        skips,
      },
    });

    return questions.map((question) => {
      // const userName = question.user.name;
      delete question.user;
      return { ...question }; //, userName };
    });
  };

  readOne = async (id) => {
    const question = await prisma.questions.findUnique({
      where: { id },
    });

    if (!question) {
      throw new HttpStatus.NotFound('질문글 조회에 실패했습니다.');
    }

    delete question.UserId;
    return { ...question };
  };

  readOneWithName = async (id) => {
    const question = await prisma.questions.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!question) {
      throw new HttpStatus.NotFound('질문글 조회에 실패했습니다.');
    }

    return question;
  };

  updateOneById = async (id, { title, content }) => {
    const question = await prisma.products.findUnique({ where: { id } });

    if (!question) {
      throw new HttpStatus.NotFound('질문글 조회에 실패했습니다.');
    }

    const updatedQuestion = await prisma.questions.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

    return updatedQuestion;
  };

  deleteOneById = async (id) => {
    const question = await prisma.questions.findUnique({ where: id });

    if (!question) {
      throw new HttpStatus.NotFound('질문글 조회에 실패했습니다.');
    }

    const deletedQuestion = await prisma.questions.delete({ where: id });

    return deletedQuestion;
  };
}
