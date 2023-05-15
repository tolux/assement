import { HttpException, HttpStatus } from '@nestjs/common';

const _handleError = (error: any) => {
  throw new HttpException(
    error?.message || 'an error occurred kindly contact support',
    error?.status || error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
  );
};

export { _handleError };
