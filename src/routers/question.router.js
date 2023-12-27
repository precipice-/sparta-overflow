import { Router } from 'express';
import { QuestionController } from '../controllers/question.controller.js';

const questionRouter = Router();

const questionController = new QuestionController();

questionRouter.get('/page', questionController.page); // 목록 조회
questionRouter.get('/:postid', questionController.read); // 상세 조회
questionRouter.post('/create', questionController.create); // 질문글 생성
questionRouter.put('/create', questionController.edit); // 질문글 수정
questionRouter.delete('/create', questionController.delete); // 질문글 삭제

export { questionRouter };
