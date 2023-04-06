import { HStack, ScrollView, VStack } from 'native-base';
import InfoCard, { IInfoCardProps } from 'src/components/InfoCard';

interface ITabTablesProps {
  cards: IInfoCardProps[];
  floorId: number;
}
const TabTables = (props: ITabTablesProps) => {
  const { cards } = props;

  return (
    <ScrollView>
      <HStack flexWrap="wrap" justifyContent="center">
        <VStack flexBasis="45%">
          {cards.map((card, index) => {
            if (index % 2 !== 0) {
              return null;
            }

            return <InfoCard {...card} />;
          })}
        </VStack>
        <VStack flexBasis="45%">
          <VStack flexBasis="45%">
            {cards.map((card, index) => {
              if (index % 2 === 0) {
                return null;
              }

              return <InfoCard {...card} />;
            })}
          </VStack>
        </VStack>
      </HStack>
    </ScrollView>
  );
};

export default TabTables;
