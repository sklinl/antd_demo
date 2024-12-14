import InvoiceSettings from "./InvoiceSettings";
import { putDataApi, useGetDataApi } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import { StyledTypographyWrapper } from "../index.styled";
import {
  InvoiceSettingType,
  InvoiceSettingItem,
} from "@crema/types/models/invoice";

const InvoiceSettingsPage = () => {
  const [{ apiData }, { reCallAPI }] = useGetDataApi<InvoiceSettingType>(
    "/api/invoice/settings",
    {} as InvoiceSettingType,
    {},
    true,
  );
  const infoViewActionsContext = useInfoViewActionsContext();

  const onUpdateSettings = (key: string, newSettings: InvoiceSettingItem) => {
    const settings = {
      ...apiData,
      [key]: newSettings,
    };

    putDataApi("/api/invoice/settings/update", infoViewActionsContext, settings)
      .then(() => {
        reCallAPI();
        infoViewActionsContext.showMessage("Settings Updated Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <StyledTypographyWrapper>
      <InvoiceSettings
        defaultSettings={apiData}
        onUpdateSettings={onUpdateSettings}
      />
    </StyledTypographyWrapper>
  );
};

export default InvoiceSettingsPage;
