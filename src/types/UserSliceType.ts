import type { UserType } from "./BooksSliceType"

export type UserSliceType={
    users:UserType[];
    currentUser: UserType|null;
    status:"idle" | "loading" | "successed" | "failed";
    error:string | null; 
}