import {
  Box,
  Center,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import { useEffect, useState } from 'react';
import InfoCard, { IInfoCardProps } from 'src/components/InfoCard';
import { CREATE_ORDER_SCREEN } from 'src/constants/navigate';
import { TableStateColorMap } from 'src/constants/table';
import { TableStatusEnum } from 'src/constants/table/enums';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useOrder from 'src/hooks/useOrder';
import Button from 'src/components/Button';

interface ITabWaitTicketProps {
  navigation?: any;
  onPressItem: any;
  isPayment?: boolean;
}
const TabWaitTicket = (props: ITabWaitTicketProps) => {
  const { navigation, onPressItem, isPayment } = props;
  const [cards, setCards] = useState<IInfoCardProps[]>([]);
  const { orderMap } = useOrder();
  const [isShowModal, setIsShowModal] = useState(false);
  const [ticket, setTicket] = useState('');

  useEffect(() => {
    const newState = Object.values(orderMap)
      .filter(order => order.waitingTicket)
      .map(order => {
        return {
          code: order.waitingTicket,
          onPress: () => onPressItem(order.waitingTicket),
          backgroundColor: TableStateColorMap[TableStatusEnum.SERVING],
        };
      });

    setCards(newState);
  }, [orderMap]);

  return (
    <View w="100%" h="full">
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
      {!isPayment && (
        <Pressable
          onPress={() => setIsShowModal(true)}
          position="absolute"
          bottom={150}
          right={8}>
          <Icon
            color="red.600"
            size="4xl"
            as={<AntDesign name="pluscircle" />}
          />
        </Pressable>
      )}
      {isShowModal && (
        <Pressable
          position="absolute"
          w="full"
          h="full"
          zIndex="1000"
          opacity={30}
          backgroundColor="dark.50"
          onPress={() => setIsShowModal(false)}></Pressable>
      )}
      {isShowModal && (
        <Center mt="200" position="absolute" zIndex="10000" w="100%">
          <View
            w="60%"
            backgroundColor="red.600"
            borderTopLeftRadius={'3xl'}
            borderTopRightRadius={'3xl'}>
            <Text
              color="white"
              textAlign="center"
              fontSize={16}
              py={3}
              textTransform="uppercase">
              Phiếu đợi
            </Text>
            <Pressable
              onPress={() => setIsShowModal(false)}
              position="absolute"
              top="3"
              right="3">
              <Icon size="md" color="white" as={<AntDesign name="close" />} />
            </Pressable>
          </View>
          <View
            w="60%"
            backgroundColor="white"
            borderBottomLeftRadius={'3xl'}
            borderBottomRightRadius={'3xl'}>
            <VStack p={4} space="2">
              <Input
                size="sm"
                fontSize="16"
                value={ticket}
                onChangeText={(data: string) => {
                  if (data.length <= 3) {
                    setTicket(data);
                  }
                }}
              />
              <HStack justifyContent="flex-end">
                <Button
                  title="Tạo"
                  onPress={() => {
                    navigation.navigate(CREATE_ORDER_SCREEN, {
                      waitingTicket: ticket,
                    });
                  }}
                  flex={1 / 3}
                  disabled={!ticket.length || ticket.length > 3}
                />
              </HStack>
            </VStack>
          </View>
        </Center>
      )}
    </View>
  );
};

export default TabWaitTicket;
