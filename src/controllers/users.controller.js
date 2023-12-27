import { UsersService } from '../services/users.service.js';

export class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  promote = async (req, res, next) => {
    try {
      const userType = res.locals.user.userType;
      const { targetEmail } = req.body;

      if (userType != 'MANAGER') {
        return res.status(403).json({
          success: false,
          message: '승급 권한이 없습니다.',
        });
      }

      const data = await this.usersService.promote(targetEmail);

      return res.status(200).json({
        success: true,
        message: '해당 유저가 매니저로 전환되었습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
