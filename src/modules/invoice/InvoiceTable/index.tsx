import { Table, Typography } from "antd";
import OrderActions from "./OrderActions";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { InvoiceType } from "@crema/types/models/invoice";
import { ColumnsType } from "antd/es/table";

const statusName = {
  120: "Sent",
  121: "Paid",
  122: "Declined",
  123: "Cancelled",
};
const getPaymentStatusColor = (folderValue: number) => {
  switch (folderValue) {
    case 120: {
      return "#2997ff";
    }
    case 121: {
      return "#43C888";
    }
    case 122: {
      return "#F84E4E";
    }
    case 123: {
      return "#FF8B26";
    }
  }
};

const getColumns = (
  navigate: NavigateFunction,
  onChangeStatus: (invoice: InvoiceType, status: number) => void,
): ColumnsType<InvoiceType> => [
  {
    title: "Invoice No.",
    dataIndex: "inum",
    key: "inum",
    render: (inum, record) => (
      <Typography.Link
        onClick={() => navigate(`/invoice/pdf/${record.id}`)}
        style={{
          cursor: "pointer",
        }}
      >
        {inum}
      </Typography.Link>
    ),
  },
  {
    title: "Client Name",
    dataIndex: "clientName",
    key: "clientName",
  },
  {
    title: "Status",
    dataIndex: "folderValue",
    key: "folderValue",
    render: (folderValue) => (
      <div
        style={{
          color: getPaymentStatusColor(folderValue),
          backgroundColor: getPaymentStatusColor(folderValue) + "44",
          padding: "3px 5px",
          borderRadius: 4,
          fontSize: 14,
          display: "inline-block",
        }}
      >
        {statusName[folderValue as keyof typeof statusName]}
      </div>
    ),
  },
  {
    title: "Invoice Date",
    dataIndex: "idt",
    key: "idt",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    className: "order-table-action",
    fixed: "right",
    render: (_, record) => (
      <OrderActions
        id={record.id}
        data={record}
        status={record.folderValue}
        onChangeStatus={onChangeStatus}
      />
    ),
  },
];

type Props = {
  invoiceData: InvoiceType[];
  loading: boolean;
  onChangeStatus: (invoice: InvoiceType, status: number) => void;
};

const InvoiceTable = ({ invoiceData, loading, onChangeStatus }: Props) => {
  const navigate = useNavigate();

  return (
    <Table
      rowSelection={{
        type: "checkbox",
      }}
      loading={loading}
      dataSource={invoiceData}
      columns={getColumns(navigate, onChangeStatus)}
      pagination={false}
    />
  );
};

export default InvoiceTable;
