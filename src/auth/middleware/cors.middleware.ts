import { Injectable } from "@nestjs/common";
import { NestMiddleware } from "@nestjs/common/interfaces/middleware";
import { NextFunction } from "express";

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    
    throw new Error("Method not implemented.");
  }

//   resolve(...args: any[]): ExpressMiddleware {
//     return (req, res, next) => {
//       cors({}, req, res, next);
//     };
//  }
}

function Middleware(): (target: typeof CorsMiddleware) => void | typeof CorsMiddleware {
  throw new Error("Function not implemented.");
}

function processOptions(options) {
  const defaultOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400 // 24 Stunden
  };

  // Fügen Sie hier Ihre benutzerdefinierte Logik hinzu, um die Optionen zu verarbeiten und mit den Standardoptionen zusammenzuführen.
  // Zum Beispiel können Sie lodash verwenden, um die Optionen zusammenzuführen, oder einfach Object.assign() für flache Zusammenführungen.
  const mergedOptions = Object.assign({}, defaultOptions, options);

  return mergedOptions;
}

function isAllowedOrigin(origin, allowedOrigins) {
  if (allowedOrigins === '*') {
    return true;
  }

  if (Array.isArray(allowedOrigins)) {
    return allowedOrigins.indexOf(origin) !== -1;
  }

  if (typeof allowedOrigins === 'string') {
    return origin === allowedOrigins;
  }

  if (allowedOrigins instanceof RegExp) {
    return allowedOrigins.test(origin);
  }

  // Wenn der Typ von allowedOrigins nicht erkannt wird, ist die Ursprungsdomain nicht erlaubt.
  return false;
}

function cors(options) {
// Hier werden die Optionen verarbeitet und mit den Standardwerten zusammengeführt.
const corsOptions = processOptions(options);

// Die Middleware-Funktion, die die Anfrage und die Antwort bearbeitet.
return function corsMiddleware(req, res, next) {
  // Verarbeiten Sie die Anfrage und fügen Sie CORS-Header basierend auf den Optionen hinzu.
  const origin = req.headers.origin;

  // Überprüfen Sie, ob die Ursprungsdomain in den erlaubten Ursprungsdomänen enthalten ist.
  if (isAllowedOrigin(origin, corsOptions.origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Verarbeiten Sie den Preflight-Request, wenn es sich um eine OPTIONS-Anfrage handelt.
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(', '));
    res.setHeader('Access-Control-Max-Age', corsOptions.maxAge);
    res.end();
  } else {
    // Wenn es keine OPTIONS-Anfrage ist, fahren Sie mit der nächsten Middleware oder Route fort.
    next();
  }
};
}
