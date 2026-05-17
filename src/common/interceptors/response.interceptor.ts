import { CallHandler, Injectable, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor { // Добавили implements
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    // Исправлено: стрелочная функция (data) => ({ ... }) внутри map
    return next.handle().pipe(
      map((data) => ({
        status: 'OK',
        data,
      }))
    );
  }
}