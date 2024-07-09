import {Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {

        if (Array.isArray(data)) {
          return data.map((user) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...rest } = user;
            return rest;
          });
          
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...rest } = data;
          return rest;
        }
      }),
    );
  }
}
