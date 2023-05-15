import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { ERoles } from "src/@types/app.types";
import { AdminService } from "src/admin/admin.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const admin = await this.adminService.findAdminByEmail(request.email);
    if (request.role !== ERoles.ADMIN || !admin) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
