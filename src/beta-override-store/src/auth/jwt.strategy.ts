import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  private static extractJWT(req: RequestType): string | null {
    // console.log('attempting to extract JWT', req.cookies)
    if (
      req.cookies &&
      'jwt' in req.cookies
    ) {
        // console.log('found cookie', req.cookies.jwt)
      return req.cookies.jwt;
    }
    return null;
  }

  

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}