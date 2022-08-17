import { Strategy } from "passport-discord";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service.js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService, private configService: ConfigService) {
        super({
            clientID: configService.get<string>('DISCORD_CLIENT_ID'),
            clientSecret: configService.get<string>('DISCORD_CLIENT_SECRET'),
            callbackURL: configService.get<string>('DISCORD_CALLBACK_URL'),
            scope: ['identify']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        console.log('calling validate', accessToken, refreshToken, JSON.stringify(profile));
        return {userId: profile.id, username: `${profile.username}#${profile.discriminator}`, accessToken, refreshToken};
    }
}