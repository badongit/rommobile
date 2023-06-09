import { add, multiply } from 'lodash';
import { HStack, Text, VStack, View, Radio } from 'native-base';
import { useEffect, useState } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import Button from 'src/components/Button';
import InputControl from 'src/components/InputControl';
import { OrderStatusColor, OrderStatusText } from 'src/constants/order';
import {
  OrderDetailStatusEnum,
  OrderStatusEnum,
  PaymentMethodEnum,
} from 'src/constants/order/enums';
import useFloor from 'src/hooks/useFloor';
import { customerService } from 'src/services/customer.service';
import { ICustomer } from 'src/types/customer/customer.type';
import { ICompleteOrder } from 'src/types/order/complete-order.type';
import { IOrder } from 'src/types/order/order.type';
import { asPoint, discountAmount, formatToCurrency } from 'src/utils/common';

export interface ICompleteOrderForm {
  methods: UseFormReturn<ICompleteOrder>;
  order: IOrder;
  tableId?: string | number;
  waitingTicket?: string;
  onComplete: any;
  isSubmitting: boolean;
  onConfirm: any;
  onCancel: any;
}
const PaymentOrderForm = (props: ICompleteOrderForm) => {
  const {
    methods,
    order,
    tableId,
    waitingTicket,
    onComplete,
    isSubmitting,
    onConfirm,
    onCancel,
  } = props;
  const { watch, getFieldState, setValue } = methods;
  const { tableMap } = useFloor();
  const [tempPayment, setTempPayment] = useState(0);
  const [customer, setCustomer] = useState<ICustomer>();

  useEffect(() => {
    if (order?.details) {
      let money = 0;
      order?.details.forEach((detail: any) => {
        if (
          [
            OrderDetailStatusEnum.IN_PROGRESS,
            OrderDetailStatusEnum.COMPLETED,
          ].includes(detail.status)
        )
          money = add(money, multiply(detail.price, detail.quantity));
      });

      setTempPayment(money);
    }
  }, [order?.details]);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const phoneNumber = watch('customerPhoneNumber');
      if (phoneNumber && !getFieldState('customerPhoneNumber').invalid) {
        const response = await customerService.list({ phoneNumber });

        if (response?.data?.items?.length) {
          const customer = response.data.items[0];
          setValue('customerName', customer.name);
          setCustomer(customer);
        }
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [watch('customerPhoneNumber')]);

  return (
    <View backgroundColor="white" borderRadius="lg" p={4}>
      <FormProvider {...methods}>
        <VStack w="full" space={3}>
          <Text>
            Mã HĐ: <Text fontWeight="semibold">{order?.code}</Text>
          </Text>
          <Text>
            Trạng thái:{' '}
            <Text fontWeight="semibold" color={OrderStatusColor[order?.status]}>
              {OrderStatusText[order?.status]}
            </Text>
          </Text>
          {!!tableId && (
            <Text>
              Bàn: <Text fontWeight="semibold">{tableMap[tableId]?.code}</Text>
            </Text>
          )}
          {!!waitingTicket && (
            <Text>
              Phiếu đợi: <Text fontWeight="semibold">{waitingTicket}</Text>
            </Text>
          )}
          <HStack alignItems="center">
            <Text>SĐT KH: </Text>
            <View flex={1}>
              <InputControl
                name="customerPhoneNumber"
                placeholder="Số điện thoại"
                size="md"
                px={2}
                py={1}
                keyboardType="number-pad"
                variant="underlined"
                rules={{
                  minLength: {
                    value: 10,
                    message: 'Số điện thoại không hợp lệ',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Số điện thoại không hợp lệ',
                  },
                  pattern: {
                    value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: 'Số điện thoại không đúng định dạng',
                  },
                }}
              />
            </View>
          </HStack>
          <HStack alignItems="center">
            <Text>Tên KH: </Text>
            <View flex={1}>
              <InputControl
                name="customerName"
                size="md"
                variant="underlined"
                px={2}
                py={0}
              />
            </View>
          </HStack>
          <HStack alignItems="center">
            <Text>Dùng điểm: </Text>
            <View flex={1}>
              <InputControl
                name="pointUsed"
                size="md"
                keyboardType="number-pad"
                variant="underlined"
                px={2}
                py={0}
                rules={{
                  validate: (value: string) => {
                    if (parseInt(value) > (customer?.point ?? 0))
                      return 'Không đủ điểm';
                    if (parseInt(value) > asPoint(tempPayment))
                      return 'Vượt quá giá trị đơn hàng';
                  },
                }}
                onChangeText={(value: string) => {
                  if (typeof value === 'string' && !Number.isInteger(+value)) {
                    return false;
                  }

                  setValue('pointUsed', (+value).toString(), {
                    shouldValidate: true,
                  });
                }}
              />
            </View>
            <Text>Hiện có: {customer?.point ?? 0} điểm</Text>
          </HStack>
          <HStack alignItems="center">
            <Text>Ghi chú: </Text>
            <View flex={1}>
              <InputControl
                name="note"
                placeholder="Ghi chú..."
                size="md"
                variant="underlined"
                px={2}
                py={0}
              />
            </View>
          </HStack>
          <HStack alignItems="center">
            <Text>PTTT: </Text>
            <Radio.Group
              name="paymentMethod"
              defaultValue={methods.getValues('paymentMethod').toString()}>
              <HStack ml="4" space={4}>
                <Radio
                  size="sm"
                  colorScheme="red"
                  value={PaymentMethodEnum.CASH.toString()}>
                  Tiền mặt
                </Radio>
                <Radio
                  size="sm"
                  colorScheme="red"
                  value={PaymentMethodEnum.BANK_TRANSFER.toString()}>
                  Chuyển khoản
                </Radio>
              </HStack>
            </Radio.Group>
          </HStack>
          <Text>
            Thành tiền:{' '}
            <Text fontWeight="semibold">{formatToCurrency(tempPayment)}</Text>
          </Text>
          <Text>
            Thanh toán:{' '}
            <Text fontWeight="semibold">
              {formatToCurrency(
                discountAmount(tempPayment, +methods.getValues('pointUsed')),
              )}
            </Text>
          </Text>
          <HStack justifyContent="flex-end" space={2}>
            {order?.status === OrderStatusEnum.IN_PROGRESS && (
              <Button
                px="4"
                disabled={isSubmitting}
                title="Thanh toán"
                onPress={methods.handleSubmit(onComplete)}
                flex={1 / 3}
              />
            )}
            {order?.status === OrderStatusEnum.WAIT_CONFIRM && (
              <Button
                px="4"
                disabled={isSubmitting}
                title="Xác nhận"
                onPress={onConfirm}
                flex={1 / 3}
              />
            )}
            {order?.status === OrderStatusEnum.WAIT_CONFIRM && (
              <Button
                px="4"
                disabled={isSubmitting}
                title="Hủy"
                onPress={onCancel}
                flex={1 / 3}
              />
            )}
          </HStack>
        </VStack>
      </FormProvider>
    </View>
  );
};

export default PaymentOrderForm;
