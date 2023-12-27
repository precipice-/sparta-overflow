import { Router } from 'express';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import { QuestionController } from '../controllers/question.controller.js';

const questionRouter = Router();

const questionController = new QuestionController();

questionRouter.post('/', needSignin, questionController.createOne); // 질문글 생성
questionRouter.get('/page/:pageid', questionController.readPage); // 목록 조회
questionRouter.get('/:postid', needSignin, questionController.readOneQuestion); // 상세 조회
questionRouter.put('/:postid', needSignin, questionController.editOne); // 질문글 수정
questionRouter.delete('/:postid', needSignin, questionController.deleteOne); // 질문글 삭제

export { questionRouter };
