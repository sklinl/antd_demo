import IntlMessages from "@crema/helpers/IntlMessages";
import {
  StyledContainer,
  StyledFlex,
  StyledTitle3,
  StyledWrapper,
} from "./index.styled";
import { StyledRecentPost } from "../RecentPost/index.styled";
import { TagType } from "@crema/types/models/extrapages/Blog";

type Props = {
  tag: TagType[];
};

const TagCloud = ({ tag }: Props) => {
  return (
    <StyledRecentPost>
      <StyledTitle3>
        <IntlMessages id="extraPages.tagsCloud" />
      </StyledTitle3>
      <div
        style={{
          position: "relative",
        }}
      >
        <StyledFlex>
          {tag.map((tag, index) => (
            <StyledContainer key={index}>
              <StyledWrapper>{tag.name}</StyledWrapper>
            </StyledContainer>
          ))}
        </StyledFlex>
      </div>
    </StyledRecentPost>
  );
};

export default TagCloud;
