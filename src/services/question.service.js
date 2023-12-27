import { QuestionRepository } from '../repositories/question.repository.js';
import * as HttpStatus from '../errors/http-status.error.js';

export class QuestionService {
  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  createOne = async ({ title, content, userId, userName }) => {
    const question = await this.questionRepository.createOne({
      title,
      content,
      userId,
    });

    return { ...question, userName };
  };

  readMany = async ({ page }) => {
    const questions = await this.questionRepository.readMany({ page });

    return questions;
  };

  readOne = async ({ userType, id }) => {
    let question = '';
    if (userType === 'STUDENT') {
      question = await this.questionRepository.readOne(id);
    } else {
      question = await this.questionRepository.readOneWithName(id);
    }

    return question;
  };

  updateOne = async ({ userId, userName, userType, id, title, content }) => {
    const question = await this.questionRepository.readOneWithName(id);
    //질문글 존재하지 않을 시 repository에서 오류 반환

    const isQuestionOwner = question.userId === userId || userType == 'MANAGER';
    if (!isQuestionOwner) {
      throw new HttpStatus.Unauthorized('질문글 수정 권한이 없습니다.');
    }

    const updatedQuestion = await this.productsRepository.updateOneById(id, {
      title,
      content,
    });

    return { ...updatedQuestion, userName };
  };

  deleteOne = async ({ id, userId, userName, userType }) => {
    const question = await this.questionRepository.readOneWithName(id);
    //질문글 존재하지 않을 시 repository에서 오류 반환

    const isQuestionOwner = question.userId === userId || userType == 'MANAGER';
    if (!isQuestionOwner) {
      throw new HttpStatus.Unauthorized('질문글 삭제 권한이 없습니다.');
    }

    const deletedQuestion = await this.questionRepository.deleteOneById(id);

    return { ...deletedQuestion, userName };
  };
}
