// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOauths from '../../../app/model/oauths';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Oauths: ReturnType<typeof ExportOauths>;
    User: ReturnType<typeof ExportUser>;
  }
}
