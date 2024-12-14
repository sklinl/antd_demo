import { useEffect } from "react";
import AppCard from "@crema/components/AppCard";
import AppInfoView from "@crema/components/AppInfoView";
import AppAnimate from "@crema/components/AppAnimate";
import AppRowContainer from "@crema/components/AppRowContainer";
import { Col } from "antd";
import AppPageMeta from "@crema/components/AppPageMeta";
import { useParams } from "react-router-dom";
import { StyledProductDetails } from "./index.styled";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import ProductImageSlide from "./ProductImageSlide";
import Header from "./Header";
import ProductView from "./ProductView";
import SimilarProduct from "./SimilarProduct";
import type { ProductDataType } from "@crema/types/models/ecommerce/EcommerceApp";

const ProductDetail = () => {
  const { id } = useParams();
  const [{ apiData: currentProduct }, { setQueryParams }] =
    useGetDataApi<ProductDataType>("/api/ecommerce/get", undefined, {}, false);
  console.log("currentProduct", currentProduct);
  console.log("id", id);
  useEffect(() => {
    setQueryParams({ id: id });
  }, [id]);

  return (
    <StyledProductDetails>
      <AppPageMeta title="Product Details" />
      {currentProduct ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppCard key="product_detail">
            <Header product={currentProduct} />
            <AppRowContainer>
              <Col sm={24} lg={8}>
                <ProductImageSlide product={currentProduct} />
              </Col>
              <Col sm={24} lg={16}>
                <ProductView product={currentProduct} />
              </Col>
            </AppRowContainer>
            <SimilarProduct />
          </AppCard>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </StyledProductDetails>
  );
};

export default ProductDetail;
