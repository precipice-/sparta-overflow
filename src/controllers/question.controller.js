import { QuestionService } from '../services/question.service.js';

export class AuthController {
  constructor() {
    this.questionService = new QuestionService();
  }

  create = async (req, res, next) => {
    try {
      const user = res.locals.user;
      const { id: userId, name } = res.locals.user;
      const { title, context } = req.body;

      if (!user) {
        return res.status(403).json({
          success: false,
          message: '로그인이 필요합니다.',
        });
      }

      if (!title) {
        return res.status(400).json({
          success: false,
          message: '제목 입력이 필요합니다.',
        });
      }

      if (!context) {
        return res.status(400).json({
          success: false,
          message: '내용 입력이 필요합니다.',
        });
      }

      const data = await this.questionService.createOne({
        title,
        context,
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

  //   page = async (req, res, next) => {
  //     try {
  //         const
  //     } catch {}
  //   };
}
