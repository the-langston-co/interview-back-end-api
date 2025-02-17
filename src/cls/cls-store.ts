import { ClsStore } from 'nestjs-cls';

export interface AppClsStore extends ClsStore {
  user_id: number | null | undefined;
  req_url: string;
  req_start: Date;
}
