export interface TaskDto {
  _id: string;
  title: string;
  description?: string;
  done?: boolean;
  date?: Date;
  list?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  done?: boolean;
  date?: Date;
  list: string;
}
