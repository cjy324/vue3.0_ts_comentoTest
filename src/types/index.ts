export interface Article {
  id:number;
  created_at:string;
  updated_at:string;
  user_id:number;
  category_id:number;
  title:string;
  contents:string;
  reply:[];
  category:{};
}

export interface Category {
  id:number;
  name:string;
}

export interface Reply {
  id:number;
  user_id:number;
  parent:number;
  contents:string;
  created_at:string;
  updated_at:string;
  user:{};
}

export interface Ad{
  id:number;
  created_at:string;
  updated_at:string;
  title:string;
  contents:string;
  img:string;
}