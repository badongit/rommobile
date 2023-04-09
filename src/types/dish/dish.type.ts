import { DishStatusEnum } from 'src/constants/dish/enums';

export interface IDish {
  id: number;
  name: string;
  image: string;
  status: DishStatusEnum;
  price: number;
  categoryId: number;
  descriptions: string;
}
