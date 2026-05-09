import { Controller, Get, Headers, Req, Ip, Post, Res, Param } from '@nestjs/common';
import type {Request, Response} from 'express'

@Controller('http')
export class HttpController {
   @Get('headers')
  getHeaders(@Headers() headers: Record<string, string>) {
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return { 'User-Agent': userAgent };
  }

  @Get('request-details')
  getRequestDetails(@Req() req: Request ) {
    return {
        url: req.url,
        method: req.method,
        headers: req.headers, // Здесь лежат заголовки
        params: req.params,
        cookies: req.cookies, // Здесь лежат куки (если используется cookie-parser)
        query: req.query,     // Здесь параметры из URL (?key=value)
        ip: req.ip
    };
  }

  @Get('ip')
  getUserIp(@Headers('x-forwarded-for') forwardedIp: string, @Ip() ip: string) {
    // Если запрос прошел через прокси, реальный IP будет в заголовке x-forwarded-for.
    // Если нет (например, на локалхосте), берем обычный IP.
    const realIp = forwardedIp || ip;
    return { ip: realIp };
  } 

  @Get('find-by-id/:id') 
    findById(@Param('id') id: string) {
      return id
    }
  

  @Post('response')
  getResponseDetails(@Res() res: Response) {
    res.json({status: 'success', message: 'This is a custom response'});
  }
}
