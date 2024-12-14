import { addresses } from "@crema/mockapi/fakedb/ecommerce/ecommerceData";
import AppPageMeta from "@crema/components/AppPageMeta";
import { StyledConfirmationView } from "./index.styled";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import OrderPlaced from "./OrderPlaced";
import AddressInfo from "./AddressInfo";
import ItemsList from "./ItemsList";
import type { CartItemsType } from "@crema/types/models/ecommerce/EcommerceApp";

const Confirmation = () => {
  const [{ apiData: cartItems }] = useGetDataApi<CartItemsType[]>(
    "/api/cart/get",
    [],
  );
  return (
    <>
      <AppPageMeta title="Order Confirmation" />
      <StyledConfirmationView key={"wrap"}>
        <OrderPlaced cartItems={cartItems} />
        <AddressInfo address={addresses[0]} />
        <ItemsList cartItems={cartItems} />
      </StyledConfirmationView>
    </>
  );
};

export default Confirmation;
