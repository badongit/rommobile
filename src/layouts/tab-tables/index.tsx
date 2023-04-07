import { HStack, ScrollView, VStack, View, Box, Text, Icon } from 'native-base';
import { useEffect, useState } from 'react';
import InfoCard, { IInfoCardProps } from 'src/components/InfoCard';
import { ITable } from 'src/types/table/table.type';
import Feather from 'react-native-vector-icons/Feather';

interface ITabTablesProps {
  tables: ITable[];
  floorId?: number;
}
const TabTables = (props: ITabTablesProps) => {
  const { tables } = props;
  const [cards, setCards] = useState<IInfoCardProps[]>([]);

  useEffect(() => {
    const newState = tables.map(table => {
      return {
        code: table.code,
        onPress: () => {
          console.log('code', table.code);
        },
        backgroundColor: 'success.600',
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
