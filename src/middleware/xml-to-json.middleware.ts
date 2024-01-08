// xml-to-json.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as xml2js from 'xml2js';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XmlToJsonMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['content-type'] === 'application/xml' || req.headers['content-type'] === 'text/xml') {
      let xml = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) {
        xml += chunk;
      });
      req.on('end', function() {
        xml2js.parseString(xml, (err, jsonPayload) => {
          if (err) {
            res.status(400).send('Invalid XML format');
          } else {
            req.body = jsonPayload;
            next();
          }
        });
      });
    } else {
      next();
    }
  }
}
