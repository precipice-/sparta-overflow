import { QuestionService } from '../services/question.service.js';

export class QuestionController {
  constructor() {
    this.questionService = new QuestionService();
  }

  createOne = async (req, res, next) => {
    try {
      const { userId, name } = res.locals.user;
      const { title, content } = req.body;

      if (!title) {
        return res.status(400).json({
          success: false,
          message: '제목 입력이 필요합니다.',
        });
      }

      if (!content) {
        return res.status(400).json({
          success: false,
          message: '내용 입력이 필요합니다.',
        });
      }

      const data = await this.questionService.createOne({
        title,
        content,
        userId,
        name,
      });

      return res.status(201).json({
        success: true,
        message: '질문을 작성했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  readPage = async (req, res, next) => {
    try {
      const { page } = req.params;

      const data = await this.questionService.readMany({ showpage: page });

      return res.status(200).json({
        success: true,
        message: '질문 목록 조회에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  readOneQuestion = async (req, res, next) => {
    try {
      const { questionId } = req.params;
      const userType = res.locals.user.userType;

      const question = await this.questionService.readOne({
        userType,
        id: +questionId,
      });

      if (!question) {
        return res.status(404).json({
          success: false,
          message: '질문글 조회에 실패했습니다.',
        });
      }

      return res.status(200).json({
        success: true,
        message: '질문글 조회에 성공했습니다.',
        data: question,
      });
    } catch (error) {
      next(error);
    }
  };

  editOne = async (req, res, next) => {
    try {
      const { questionId } = req.params;
      const { title, content } = req.body;
      const { userId, name: userName, userType } = res.locals.user;

      // 수정 정보가 하나도 없는 경우
      if (!title && !content) {
        return res.status(400).json({
          success: false,
          message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
        });
      }

      const data = await this.productsService.updateOne({
        userId,
        userName,
        userType,
        id: +questionId,
        title,
        content,
      });

      return res.status(200).json({
        success: true,
        message: '질문글 수정에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOne = async (req, res, next) => {
    try {
      const { questionId } = req.params;
      const { userId, name: userName, userType } = res.locals.user;

      const data = await this.questionService.deleteOne({
        id: +questionId,
        userId,
        userName,
        userType,
      });

      return res.status(200).json({
        success: true,
        message: '질문글 조회에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
