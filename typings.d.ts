export interface Category {
  id: number;
  title: string;
  name: string;
  priorityOrder: number;
}

export interface Screenshot {
  id?: number;
  image: File | undefined;
  priorityOrder: number;
  project?: number;
}

export interface Technology {
  id: number;
  name: string;
}
