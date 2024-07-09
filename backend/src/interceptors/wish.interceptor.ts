import {Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WishInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {

        if (Array.isArray(data)) {
          return data.map((user) => {
            const {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              owner: { password, ...WithoutPassword },
              ...rest
            } = user;
            return { ...rest, owner: WithoutPassword };
          });
          
        } else {
          data?.offers?.map((offer: { user: { password: any; }; }) => {
            delete offer.user.password;
            return offer;
          });
          const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            owner: { password, ...WithoutPassword },
            ...rest
          } = data;
          return { ...rest, owner: WithoutPassword };
        }
      }),
    );
  }
}
