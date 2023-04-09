export interface IMenuCustomProps {
  selected: number;
  items: IMenuCustomItemProps[];
  selectedColor?: string;
  isScrollable?: boolean;
}

export interface IMenuCustomItemProps {
  title: string;
  onPress: any;
  image?: string;
  selectedColor?: string;
}
