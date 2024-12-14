import IntlMessages from "@crema/helpers/IntlMessages";
import AppPageMeta from "@crema/components/AppPageMeta";
import {
  StyledInvoice,
  StyledInvoiceCard,
  StyledInvoiceContainer,
  StyledInvoiceFooterTitle,
} from "./index.styled";
import AppAnimate from "@crema/components/AppAnimate";
import Header from "./Header";
import InvoiceTable from "./InvoiceTable";

const Invoice1 = () => {
  return (
    <>
      <AppPageMeta title="Invoices" />
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <StyledInvoice key="invoice1">
          <StyledInvoiceContainer>
            <StyledInvoiceCard className="no-card-space">
              <Header />
              <InvoiceTable />
            </StyledInvoiceCard>
            <StyledInvoiceFooterTitle>
              <IntlMessages id="invoice.thankYou" />
            </StyledInvoiceFooterTitle>
          </StyledInvoiceContainer>
        </StyledInvoice>
      </AppAnimate>
    </>
  );
};

export default Invoice1;
