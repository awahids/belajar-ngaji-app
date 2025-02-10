import { Filter } from '@/common/dto.common';
import { PrismaService } from '@/config/prisma.config';
import { paginationResponse, paramPaginate } from '@/utils/helpers/pagination.helper';
import { Injectable } from '@nestjs/common';
import { Roles } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) { }

  async findOne(uuid: string): Promise<Roles> {
    const role = await this.prisma.roles.findFirst({ where: { uuid } });

    return role;
  }

  async findAll(params: Filter): Promise<any> {
    const { page, per_page, skip, take } = paramPaginate(params);

    const [roles, total] = await this.prisma.$transaction([
      this.prisma.roles.findMany({
        skip,
        take,
        select: {
          id: true,
          uuid: true,
          name: true,
          value: true,
        },
      }),

      this.prisma.roles.count(),
    ])

    return paginationResponse(
      total,
      roles,
      per_page,
      page,
      skip
    );
  }
}
