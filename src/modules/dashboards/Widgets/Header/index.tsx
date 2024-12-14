import IntlMessages from "@crema/helpers/IntlMessages";
import { useIntl } from "react-intl";
import {
  StyledHeaderImgBtn,
  StyledHeaderImgCard,
  StyledHeaderImgContent,
  StyledHeaderImgFooter,
} from "./index.styled";

const Header = () => {
  const { messages } = useIntl();
  return (
    <StyledHeaderImgCard
      title={messages["dashboard.jombie"] as string}
      style={{
        backgroundImage: "url(/assets/images/widgets/jombie.png)",
      }}
    >
      <StyledHeaderImgContent>
        <p>
          <IntlMessages id="dashboard.jombieContent" />
        </p>

        <StyledHeaderImgFooter>
          <StyledHeaderImgBtn type="primary">
            <IntlMessages id="dashboard.getStarted" />
          </StyledHeaderImgBtn>
          <StyledHeaderImgBtn className="btn-white-outline">
            <IntlMessages id="dashboard.readMore" />
          </StyledHeaderImgBtn>
        </StyledHeaderImgFooter>
      </StyledHeaderImgContent>
    </StyledHeaderImgCard>
  );
};

export default Header;
