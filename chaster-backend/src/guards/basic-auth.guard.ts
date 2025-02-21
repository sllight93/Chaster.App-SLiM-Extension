import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    // Erwartetes Format: "Basic <base64(username:password)>"
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme !== 'Basic' || !encoded) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const [username, password] = decoded.split(':');
    const envUsername = process.env.BASIC_AUTH_USERNAME;
    const envPassword = process.env.BASIC_AUTH_PASSWORD;

    if (username === envUsername && password === envPassword) {
      return true;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
