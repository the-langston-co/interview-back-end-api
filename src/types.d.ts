// types.d.ts or any .d.ts file in your project
import 'express';

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
    }
  }
}
