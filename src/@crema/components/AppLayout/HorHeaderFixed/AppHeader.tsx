import { Dropdown } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import AppLogo from "../components/AppLogo";
import { useIntl } from "react-intl";
import AppLanguageSwitcher from "../../AppLanguageSwitcher";
import AppHeaderMessages from "../../AppHeaderMessages";
import AppNotifications from "../../AppNotifications";
import { AiOutlineMenu } from "react-icons/ai";
import UserInfo from "../components/UserInfo";
import { useSidebarContext } from "@crema/context/AppContextProvider/SidebarContextProvider";
import {
  StyledAppHeaderHorFixed,
  StyledAppHeaderHorFixedMain,
  StyledAppHeaderHorMainFlex,
  StyledAppHorizontalNav,
  StyledContainer,
  StyledHeaderHorFixedSecDesktop,
  StyledHeaderHorFixedSecMobile,
  StyledHeaderSearchHorFixed,
} from "./index.styled";
import { StyledDropdownWrapper } from "../index.styled";
import { allowMultiLanguage } from "../../../constants/AppConst";
import { RouterConfigData } from "../../../types/models/Apps";

const items = [
  {key: 1, label: <AppHeaderMessages />},
  {key: 2, label: <AppNotifications />},
  {key: 3, label: <AppLanguageSwitcher />},
];

type AppHeaderProps = {
  showDrawer: () => void;
  routesConfig: RouterConfigData[];
};

const AppHeader = ({showDrawer, routesConfig}: AppHeaderProps) => {
  const {messages} = useIntl();
  const {sidebarColorSet} = useSidebarContext();

  return (
    <StyledAppHeaderHorFixed
      style={{
        backgroundColor: sidebarColorSet.sidebarBgColor,
        color: sidebarColorSet.sidebarTextColor,
      }}
    >
      <StyledAppHeaderHorFixedMain>
        <StyledContainer className='container'>
          <StyledAppHeaderHorMainFlex>
            <a className='trigger' onClick={showDrawer}>
              <AiOutlineMenu />
            </a>
            <AppLogo hasSidebarColor />
            <StyledAppHorizontalNav routesConfig={routesConfig} />
            <StyledHeaderSearchHorFixed
              placeholder={messages['common.searchHere'] as string}
            />

            <StyledHeaderHorFixedSecDesktop>
              {allowMultiLanguage && <AppLanguageSwitcher />}
              <AppHeaderMessages />
              <AppNotifications />
            </StyledHeaderHorFixedSecDesktop>
            <UserInfo />
            <StyledHeaderHorFixedSecMobile>
              <StyledDropdownWrapper>
                <Dropdown
                  menu={{items}}
                  overlayClassName='dropdown-wrapper'
                  getPopupContainer={(triggerNode) => triggerNode}
                  trigger={['click']}
                >
                  <a
                    className='ant-dropdown-link-mobile'
                    onClick={(e) => e.preventDefault()}
                  >
                    <FiMoreVertical />
                  </a>
                </Dropdown>
              </StyledDropdownWrapper>
            </StyledHeaderHorFixedSecMobile>
          </StyledAppHeaderHorMainFlex>
        </StyledContainer>
      </StyledAppHeaderHorFixedMain>
    </StyledAppHeaderHorFixed>
  );
};

export default AppHeader;
