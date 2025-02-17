import { ClsService } from 'nestjs-cls';
import { AppClsStore } from './cls-store';

export class AppClsService extends ClsService<AppClsStore> {}
