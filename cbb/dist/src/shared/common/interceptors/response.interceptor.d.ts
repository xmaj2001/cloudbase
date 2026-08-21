import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(_ctx: ExecutionContext, next: CallHandler): Observable<any>;
}
