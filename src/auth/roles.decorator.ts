import { SetMetadata } from '@nestjs/common';
import { ERoles } from 'src/@types/app.types';

export const ROLES_KEY = 'role';
export const Roles = (role: ERoles) => SetMetadata(ROLES_KEY, role);
