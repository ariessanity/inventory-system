import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';

@Controller()
export class AppController {
  @Get()
  get(@Res() res: Response) {
    res.sendFile(path.join(__dirname, '../../client/build/server/pages', 'index.html'));
    // res.sendFile('index.html', {
    //   root: '../../client/build/server/pages',
    // });
  }
}
