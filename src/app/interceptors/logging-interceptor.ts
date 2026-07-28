import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url)
  if (req.method === "GET" && req.url.includes('/character')) {
    console.log(`${req.method} /character`)
  }
  return next(req);
};
