import { HStack, ScrollView, VStack, View, Box, Text, Icon } from 'native-base';
import { useEffect, useState } from 'react';
import InfoCard, { IInfoCardProps } from 'src/components/InfoCard';
import { ITable } from 'src/types/table/table.type';
import Feather from 'react-native-vector-icons/Feather';
import { TableStateColorMap } from 'src/constants/table';
import { CREATE_ORDER_SCREEN } from 'src/constants/navigate';
import { TableStatusEnum } from 'src/constants/table/enums';

interface ITabTablesProps {
  tables: ITable[];
  floorId?: number;
  navigation?: any;
  onPressTable: any;
}
const TabTables = (props: ITabTablesProps) => {
  const { tables, navigation, onPressTable } = props;
  const [cards, setCards] = useState<IInfoCardProps[]>([]);

  useEffect(() => {
    const newState = tables.map(table => {
      return {
        code: table.code,
        onPress: () => onPressTable(table),
        backgroundColor: TableStateColorMap[table.status],
        children: (
          <HStack mt="2" alignItems="center" space={2}>
            <Icon as={<Feather name="users" />} color="light.50" />
            <Text color="light.50">{`${table.maxPeople} người`}</Text>
          </HStack>
        ),
      };
    });

    setCards(newState);
  }, [tables]);

  return (
    <View w="100%">
      <ScrollView>
        <HStack flexWrap="wrap" justifyContent="center">
          <VStack flexBasis="45%">
            {cards
              .filter((v, i) => i % 2 === 0)
              .map(card => {
                return (
                  <Box m="3" key={card.code}>
                    <InfoCard {...card} />
                  </Box>
                );
              })}
          </VStack>
          <VStack flexBasis="45%">
            <VStack flexBasis="45%">
              {cards
                .filter((v, i) => i % 2 !== 0)
                .map(card => {
                  return (
                    <Box m="3" key={card.code}>
                      <InfoCard {...card} />
                    </Box>
                  );
                })}
            </VStack>
          </VStack>
        </HStack>
      </ScrollView>
    </View>
  );
};

export default TabTables;
