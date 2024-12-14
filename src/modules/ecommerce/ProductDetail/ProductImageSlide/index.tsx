import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import {
  StyledMediaSlider,
  StyledProductFav,
  StyledProductImageSlide,
  StyledProductImageSlideAction,
  StyledProductImageSlideRoot,
} from "./index.styled";
import { postDataApi } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import type { ProductDataType } from "@crema/types/models/ecommerce/EcommerceApp";
import Slider from "react-slick";

type Props = {
  product: ProductDataType;
};
const ProductImageSlide = ({ product }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const infoViewActionsContext = useInfoViewActionsContext();
  const navigate = useNavigate();
  // const slides = product.image.map((data, index) => (
  //   <img key={index} src={data.src} alt="" />
  // ));
  // const onChange = (value: number) => {
  //   setValue(value);
  // };

  const onAddToCard = () => {
    postDataApi("/api/cart/add", infoViewActionsContext, {
      product,
    })
      .then(() => {
        infoViewActionsContext.showMessage(
          `${product.title} added to cart successfully`,
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };
  const onButNowToCard = () => {
    postDataApi("/api/cart/add", infoViewActionsContext, {
      product,
    })
      .then(() => {
        navigate("/apps/ecommerce/cart");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const OnFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <StyledProductImageSlide>
      <StyledProductImageSlideRoot>
        <StyledMediaSlider>
          <div
            style={{
              height: "auto",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Slider {...settings}>
              {product.image.map((item, index) => (
                <div key={index} style={{ padding: 3, height: "100%" }}>
                  <img
                    src={item.src}
                    alt="watch"
                    // width={191}
                    // height={259}
                    // sizes="100vh"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      maxHeight: "400px",
                      height: "100%",
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </StyledMediaSlider>
        <StyledProductFav onClick={OnFavorite}>
          {isFavorite ? <HeartFilled /> : <HeartOutlined />}
        </StyledProductFav>
      </StyledProductImageSlideRoot>
      <StyledProductImageSlideAction>
        <Button
          type="primary"
          onClick={onAddToCard}
          style={{ marginRight: 20, width: 140 }}
        >
          Add to cart
        </Button>
        <Button
          style={{ width: 140 }}
          className="btn-secondary"
          onClick={onButNowToCard}
        >
          Buy now
        </Button>
      </StyledProductImageSlideAction>
    </StyledProductImageSlide>
  );
};

export default ProductImageSlide;
