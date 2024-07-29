import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token=request?.headers?.authorization?.replace('Bearer ','');
    if (!data) return '';
    return token;
  },
);