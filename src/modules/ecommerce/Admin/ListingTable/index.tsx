import OrderActions from "./OrderActions";
import { Typography } from "antd";
import { StyledListingStatus } from "../index.styled";
import { StyledOrderTable } from "../../Orders/index.styled";
import { ellipsisLines } from "@crema/helpers/StringHelper";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ProductDataType } from "@crema/types/models/ecommerce/EcommerceApp";
import type { ColumnsType } from "antd/es/table";

const getPaymentStatusColor = (inStock: boolean) => {
  switch (inStock) {
    case true: {
      return "#43C888";
    }
    case false: {
      return "#F84E4E";
    }
  }
};

const getColumns = (
  navigate: NavigateFunction,
): ColumnsType<ProductDataType> => [
  {
    title: "Product Name",
    dataIndex: "id",
    key: "id",
    render: (id, record) => (
      <Typography.Link
        onClick={() => navigate(`/apps/ecommerce/product_detail/${id}`)}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          style={{
            width: "40px",
            height: "40px",
            objectFit: "contain",
            marginRight: 10,
          }}
          src={record?.image?.[0]?.src}
          alt="crema-logo"
        />
        {ellipsisLines(record.title)}
      </Typography.Link>
    ),
  },
  {
    title: "Product SKU",
    dataIndex: "SKU",
    key: "SKU",
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Status",
    dataIndex: "date",
    key: "date",
    render: (data, record) => {
      console.log(data);
      return (
        <StyledListingStatus
          style={{
            color: getPaymentStatusColor(record?.inStock),
            backgroundColor: getPaymentStatusColor(record?.inStock) + "44",
          }}
        >
          {record?.inStock ? "In Stock" : "Out of Stock"}
        </StyledListingStatus>
      );
    },
  },
  {
    title: "Price",
    dataIndex: "mrp",
    key: "mrp",
    render: (price) => <span>${price}</span>,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    className: "order-table-action",
    fixed: "right",
    render: (text, record) => {
      console.log("text", text);
      return <OrderActions id={record.id} />;
    },
  },
];

type Props = {
  productData: ProductDataType[];
  loading: boolean;
};

const ProductTable = ({ productData, loading }: Props) => {
  const navigate = useNavigate();

  return (
    <StyledOrderTable
      hoverColor
      data={productData}
      loading={loading}
      columns={getColumns(navigate)}
      scroll={{ x: "auto" }}
    />
  );
};

export default ProductTable;
