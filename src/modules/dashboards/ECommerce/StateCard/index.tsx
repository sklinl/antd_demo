import { FormattedNumber } from "react-intl";
import {
  StyledAppCard,
  StyledArrowWrapper,
  StyledFlex,
  StyledFlexWrapper,
  StyledSecondaryText,
  StyledStateWrapper,
  StyledText,
} from "./index.styled";
import { Typography } from "antd";
import { StateDataType } from "@crema/types/models/dashboards/Ecommerce";

import {
  MdDomain,
  MdLocalShipping,
  MdPointOfSale,
  MdSupervisorAccount,
} from "react-icons/md";

const getIcon = (icon: string) => {
  switch (icon) {
    case "domain":
      return <MdDomain size={24} />;
    case "local_shipping":
      return <MdLocalShipping size={24} />;
    case "point_of_sale":
      return <MdPointOfSale size={24} />;
    case "supervisor_account":
      return <MdSupervisorAccount size={24} />;
  }
};

type Props = {
  data: StateDataType;
};

const StateCard = ({ data }: Props) => {
  return (
    <StyledAppCard className="no-card-space-ltr-rtl">
      <StyledStateWrapper color={data.color}>
        <div className="state-icon">
          <div className="hsIcon">
            <div className="hsIcon">{getIcon(data.icon)}</div>
          </div>
        </div>
        <div className="state-content">
          <StyledFlex>
            <Typography.Title
              level={2}
              style={{
                fontSize: 20,
                marginBottom: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              <FormattedNumber value={+data.value} />
            </Typography.Title>
            <StyledText>{data.title}</StyledText>
          </StyledFlex>
          <StyledFlexWrapper>
            <span className="state-growth">
              {data.growth}%<StyledArrowWrapper>^</StyledArrowWrapper>
            </span>
            <div>
              <StyledSecondaryText>in 30 days</StyledSecondaryText>
            </div>
          </StyledFlexWrapper>
        </div>
      </StyledStateWrapper>
    </StyledAppCard>
  );
};

export default StateCard;
