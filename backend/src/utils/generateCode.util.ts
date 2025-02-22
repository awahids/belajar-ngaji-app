import { jwtConstants } from '@/constant/jwt.constant';
import * as dayjs from 'dayjs';
import * as jwt from "jsonwebtoken";

export function GenerateTrxId(userId: number, packageId: number): string {
  const now = dayjs().format('DDMM');
  const stringRandom = Math.random().toString(36).slice(2).toLocaleUpperCase();
  const code = `${stringRandom}${userId}-${packageId}${now}`;

  return code;
}

export function GenerateUniqueAmount(amount: number): number {
  const maxUniqueCode = amount <= 100000 ? 99 : 999;
  const uniqueCode = Math.floor(Math.random() * maxUniqueCode) + 1;

  return uniqueCode;
}

export function GenerateVerifyToken(email: string): string {
  const verifyToken = jwt.sign({ email }, jwtConstants.secret, { expiresIn: '1d' })

  return verifyToken;
}
