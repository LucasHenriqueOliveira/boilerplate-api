import {
    Body,
    Req,
    Controller,
    HttpCode,
    Post,
    UseGuards,
    Get, ClassSerializerInterceptor, UseInterceptors,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import RegisterDto from './dto/register.dto';
  import RequestWithUser from './requestWithUser.interface';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  import JwtAuthGuard from './guards/jwt-auth.guard';
  import { UsersService } from '../users/users.service';
  import JwtRefreshGuard from './guards/jwt-refresh.guard';
  
  @Controller('auth')
  @UseInterceptors(ClassSerializerInterceptor)
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly usersService: UsersService
    ) {}
  
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
      return this.authService.register(registrationData);
    }
  
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async logIn(@Req() request: RequestWithUser) {
      const { user } = request;
      const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
      const {
        cookie: refreshTokenCookie,
        token: refreshToken
      } = this.authService.getCookieWithJwtRefreshToken(user.id);
  
      await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
  
      request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
  
      if (user.isTwoFactorAuthenticationEnabled) {
        return;
      }
  
      return user;
    }
  
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(200)
    async logOut(@Req() request: RequestWithUser) {
      await this.usersService.removeRefreshToken(request.user.id);
      request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
      return request.user;
    }
  
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    refresh(@Req() request: RequestWithUser) {
      const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);
  
      request.res.setHeader('Set-Cookie', accessTokenCookie);
      return request.user;
    }
}