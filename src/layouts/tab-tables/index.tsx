import { HStack, ScrollView, VStack, View } from 'native-base';
import { useEffect } from 'react';
import InfoCard, { IInfoCardProps } from 'src/components/InfoCard';
import { ITable } from 'src/types/table/table.type';

interface ITabTablesProps {
  tables?: ITable[];
  floorId?: number;
}
const TabTables = (props: ITabTablesProps) => {
  const { tables } = props;
  const cards: IInfoCardProps[] = [
    {
      code: 'B01',
      onPress: () => {
        console.log('haha');
      },
      backgroundColor: 'success.500',
    },
    {
      code: 'B02',
      onPress: () => {
        console.log('haha');
      },
    },
    {
      code: 'B03',
      onPress: () => {
        console.log('haha');
      },
    },
  ];

  return (
    <View w="100%">
      <ScrollView>
        <HStack flexWrap="wrap" justifyContent="center">
          <VStack flexBasis="45%">
            {cards.map((card, index) => {
              if (index % 2 !== 0) {
                return null;
              }

              return <InfoCard {...card} key={card.code} />;
            })}
          </VStack>
          <VStack flexBasis="45%">
            <VStack flexBasis="45%">
              {cards.map((card, index) => {
                if (index % 2 === 0) {
                  return null;
                }

                return <InfoCard {...card} key={card.code} />;
              })}
            </VStack>
          </VStack>
        </HStack>
      </ScrollView>
    </View>
  );
};

export default TabTables;
