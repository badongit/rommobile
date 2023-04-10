export interface IMenuCustomProps {
  selected: number;
  items: IMenuCustomItemProps[];
  selectedColor?: string;
}

export interface IMenuCustomItemProps {
  title: string;
  onPress?: any;
  image?: string;
  selectedColor?: string;
}
