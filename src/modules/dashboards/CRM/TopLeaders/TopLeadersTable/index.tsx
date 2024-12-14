import {
  StyledAvatarWrapper,
  StyledDot,
  StyledFlex,
  StyledText,
} from "../index.styled";
import { Avatar, Typography } from "antd";
import { StyledTicketSupportTable } from "../../TicketSupport/index.styled";
import { TopLeaderType } from "@crema/types/models/dashboards/CRM";
import { ColumnsType } from "antd/es/table";

type Props = {
  topLeaders: TopLeaderType[];
};

const columns: ColumnsType<TopLeaderType> = [
  {
    title: "Team Lead",
    dataIndex: "id",
    key: "id",
    render: (lead, record) => (
      <StyledFlex>
        <Avatar
          style={{
            marginRight: 14,
            width: 44,
            height: 44,
          }}
          src={record?.teamLead?.image}
          alt={lead}
        />
        <div
          style={{
            flex: 1,
          }}
        >
          <Typography.Title level={5} style={{ fontSize: 14, marginBottom: 0 }}>
            {record?.teamLead?.name}
          </Typography.Title>
          <StyledText>{record?.teamLead?.email}</StyledText>
        </div>
      </StyledFlex>
    ),
  },
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    align: "left",
  },
  {
    title: "Team",
    dataIndex: "team",
    key: "team",
    align: "center",
    render: (data) => (
      <StyledAvatarWrapper>
        <Avatar.Group maxCount={2} style={{ justifyContent: "center" }}>
          {data.map((data: any) => (
            <Avatar size={40} key={data.id} src={data.image} />
          ))}
        </Avatar.Group>
      </StyledAvatarWrapper>
    ),
  },
  {
    title: "Status",
    dataIndex: "color",
    key: "color",
    render: (color) => (
      <StyledDot
        style={{
          backgroundColor: color,
        }}
      />
    ),
  },
  {
    title: "Weeks",
    dataIndex: "weeks",
    key: "weeks",
  },
  {
    title: "Budget",
    dataIndex: "budgets",
    key: "budgets",
    render: (budgets) => <Typography.Text strong>{budgets}</Typography.Text>,
  },
];

const TopLeadersTable = ({ topLeaders }: Props) => {
  return (
    <StyledTicketSupportTable
      scroll={{ x: "auto", y: 268 }}
      hoverColor
      data={topLeaders}
      columns={columns}
    />
  );
};

export default TopLeadersTable;
