import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  get(@Res() res: Response) {
    res.sendFile('index.html', {
      root: '../../client/build/server/pages',
    });
  }
}
