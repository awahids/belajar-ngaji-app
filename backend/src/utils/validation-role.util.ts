import { RoleValue } from "src/constant/enum/role.type";


export function isAdmin(user: any) {
  if (user?.role?.value === RoleValue.ADMIN) {
    return true;
  }
}

export function isTeacher(user: any) {
  if (user?.role?.value === RoleValue.TEACHER) {
    return true;
  }
}

export function isStudent(user: any) {
  if (user?.role?.value === RoleValue.STUDENT) {
    return true;
  }
}

export function isUserLogin(user: any) {
  if (isAdmin(user) || isTeacher(user) || isStudent(user)) {
    return true;
  }
}
