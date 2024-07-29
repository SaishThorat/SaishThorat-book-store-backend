import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/utilities/contants';

export const AuthRoles = ([...roles]: Roles[]) => SetMetadata('roles', roles);