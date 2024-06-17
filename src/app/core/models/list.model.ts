export interface ListDto {
  _id: string;
  title: string;
  date?: Date;
  isMain: boolean;
  isActive: boolean;
}

export interface List {
  id: string;
  title: string;
  date?: Date;
  isMain: boolean;
  isActive: boolean;
}
