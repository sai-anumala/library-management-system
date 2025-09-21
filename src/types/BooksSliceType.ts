export type BooksSliceType={
    books:BookType[];
    status:"idle" | "loading" | "successed" | "failed";
    error:string | null; 
}
export type BookType={
    title:string,
    author:string,
    image_link:string,
    rating:number;
    reviews:string;
    availability:number;
    description:string;
    isbn:string;
    pages:number;
    genre:string;
}

export type LoginType={
    email:string;
    password:string;
}

export type UserType={
    id?:string;
    username:string;
    dob:string;
    email:string;
    password:string;
    mobile:string;
}

export type RegisterSliceType=  {
    user:UserType[]
     status:"idle" | "loading" | "successed" | "failed";
    error:string | null; 
}