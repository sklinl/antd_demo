import BlogSidebarCard from "../BlogSidebarCard";
import BlogDetailHeader from "./BlogDetailHeader";
import BlogDetailContent from "./BlogDetailContent";
import BlogComment from "./BlogComment";
import AppAnimate from "@crema/components/AppAnimate";
import AppRowContainer from "@crema/components/AppRowContainer";
import { Col } from "antd";
import { StyledCol1, StyledCol2 } from "./index.styled";
import {
  BlogDetailType,
  BlogSidebarType,
} from "@crema/types/models/extrapages/Blog";

type Props = {
  blogDetail: BlogDetailType;
  blogSidebar: BlogSidebarType;
};

const BlogDetail = ({ blogDetail, blogSidebar }: Props) => {
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <AppRowContainer>
        <Col xs={24}>
          <BlogDetailHeader
            title={blogDetail.blogDetailContent.title}
            blogDetailHeader={blogDetail.blogDetailHeader}
          />
        </Col>
        <StyledCol1 xs={24} md={8} lg={8} xl={6}>
          <BlogSidebarCard blogSidebar={blogSidebar} />
        </StyledCol1>
        <StyledCol2 xs={24} md={16} lg={16} xl={18}>
          <BlogDetailContent blogDetailContent={blogDetail.blogDetailContent} />
          <BlogComment comment={blogDetail.blogComment} />
        </StyledCol2>
      </AppRowContainer>
    </AppAnimate>
  );
};

export default BlogDetail;
