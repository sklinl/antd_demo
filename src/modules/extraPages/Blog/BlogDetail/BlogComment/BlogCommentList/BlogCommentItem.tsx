import IntlMessages from "@crema/helpers/IntlMessages";
import {
  StyledAvatar,
  StyledFlex,
  StyledSecondaryText,
  StyledSecondaryText2,
  StyledTitle5,
} from "../index.styled";
import { Button } from "antd";
import type { BlogCommentType } from "@crema/types/models/extrapages/Blog";

type Props = {
  comment: BlogCommentType;
};

const BlogCommentItem = ({ comment }: Props) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ marginRight: 16 }}>
        <StyledAvatar src={comment.image} alt={comment.name} />
      </div>
      <div style={{ flex: 1 }}>
        <StyledFlex>
          <div style={{ flex: 1 }}>
            <StyledTitle5>{comment.name}</StyledTitle5>
            <StyledSecondaryText2>{comment.duration}</StyledSecondaryText2>
          </div>
          <div style={{ marginLeft: 8 }}>
            <Button
              type="primary"
              style={{
                textTransform: "uppercase",
              }}
              ghost
            >
              <IntlMessages id="common.reply" />
            </Button>
          </div>
        </StyledFlex>
        <StyledSecondaryText>{comment.comment}</StyledSecondaryText>
      </div>
    </div>
  );
};

export default BlogCommentItem;
