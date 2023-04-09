import { IDish } from '../dish/dish.type';

export interface ICategory {
  id: number;
  name: string;
  image: string;
  active: boolean;
  dishes: IDish[];
}
