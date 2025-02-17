import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../auth/dto/auth.dto';
import { errorResponse } from '@/utils/helpers/response.helper';
import { RoleService } from '../role/role.service';
import { PrismaService } from '@/config/prisma.config';
import { Filter, UuidDto } from '@/common/dto.common';
import { paginationResponse, paramPaginate } from '@/utils/helpers/pagination.helper';
import { RoleValue } from '@/constant/enum/role.type';
import { Users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { GenerateVerifyToken } from '@/utils/generateCode.util';

@Injectable()
export class UserService {
  constructor(
    private readonly roleService: RoleService,
    private prisma: PrismaService,
  ) { }

  async findAll(params: Filter): Promise<any> {
    const { page, per_page, skip, take } = paramPaginate(params);

    const [users, total] = await this.prisma.$transaction([
      this.prisma.users.findMany({
        skip,
        take,
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
          phone: true,
          verified_at: true,
          role: {
            select: {
              id: true,
              uuid: true,
              name: true,
              value: true,
            },
          },
        },
      }),

      this.prisma.users.count(),
    ]);

    return paginationResponse(
      total,
      users,
      per_page,
      page,
      skip
    );
  }

  async findByEmail(email: string, relationRole: boolean): Promise<any> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        uuid: true,
        name: true,
        email: true,
        phone: true,
        password: true,
        role:
          relationRole == true
            ? {
              select: {
                id: true,
                uuid: true,
                name: true,
                value: true,
              },
            }
            : undefined,
      },
    });

    if (!user) {
      return errorResponse('Email not registered');
    }

    return user;
  }

  async findByPhone(phone: string): Promise<Users> {
    const user = await this.prisma.users.findFirst({ where: { phone } });

    return user;
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async create({ email, password, name, phone, role }: RegisterDto) {
    const emailUserExists = await this.findByEmail(email, false);

    if (emailUserExists) {
      return errorResponse('Email already exists');
    }

    const phoneUserExists = await this.findByPhone(phone);

    if (phoneUserExists) {
      return errorResponse('Phone already exists');
    }

    const findRole = role?.uuid
      ? await this.roleService.findOne(role?.uuid)
      : await this.prisma.roles.findFirst({ where: { value: RoleValue.STUDENT } });

    if (!findRole) {
      return errorResponse('Role not found');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.prisma.users.create({
      data: {
        email,
        password: passwordHash,
        name,
        phone,
        role_id: findRole.id,
        verify_token: GenerateVerifyToken(email),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: {
          select: {
            id: true,
            uuid: true,
            name: true,
            value: true,
          },
        },
      },
    });

    return user;
  }

  async userDetails(userDto: UuidDto) {
    const { uuid } = userDto;

    const user = await this.prisma.users.findFirst({
      where: {
        uuid,
      },
      select: {
        id: true,
        uuid: true,
        name: true,
        email: true,
        phone: true,
        role: {
          select: {
            id: true,
            uuid: true,
            name: true,
            value: true,
          },
        },
      },
    });

    return user;
  }
}
