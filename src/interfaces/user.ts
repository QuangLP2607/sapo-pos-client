export type Role = "OWNER" | "SALES" | "CS" | "WAREHOUSE";

export interface User {
  id: string;
  username: string;
  name: string;
  phoneNum: string;
  role: Role;
  isActive: boolean;
}
