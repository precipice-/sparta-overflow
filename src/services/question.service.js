import { QuestionRepository } from '../repositories/question.repository.js';
import * as HttpStatus from '../errors/http-status.error.js';

export class QuestionService {
  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  createOne = async ({ title, context, userId, userName }) => {
    const question = await this.questionRepository.createOne({
      title,
      context,
      userId,
      userName,
    });

    return { ...question, userName };
  };
}
