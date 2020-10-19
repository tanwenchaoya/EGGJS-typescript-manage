// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOauths from '../../../app/model/oauths';
import ExportRights from '../../../app/model/rights';
import ExportRoleRights from '../../../app/model/roleRights';
import ExportRoles from '../../../app/model/roles';
import ExportUser from '../../../app/model/user';
import ExportUserRole from '../../../app/model/userRole';

declare module 'egg' {
  interface IModel {
    Oauths: ReturnType<typeof ExportOauths>;
    Rights: ReturnType<typeof ExportRights>;
    RoleRights: ReturnType<typeof ExportRoleRights>;
    Roles: ReturnType<typeof ExportRoles>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
  }
}
