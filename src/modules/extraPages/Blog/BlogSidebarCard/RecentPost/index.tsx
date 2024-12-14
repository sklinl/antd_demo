import RecentPostItem from "./RecentPostItem";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppList from "@crema/components/AppList";
import {
  StyledContainer,
  StyledRecentPost,
  StyledTitle3,
} from "./index.styled";
import { RecentPostType } from "@crema/types/models/extrapages/Blog";

type Props = {
  recentPost: RecentPostType[];
};

const RecentPost = ({ recentPost }: Props) => {
  return (
    <StyledRecentPost>
      <StyledTitle3>
        <IntlMessages id="extraPages.recentPost" />
      </StyledTitle3>
      <StyledContainer>
        <AppList
          data={recentPost}
          renderItem={(post, index) => (
            <div
              className={`recent-post-item ${
                index + 1 === recentPost.length ? "last-child" : ""
              }`}
              key={index}
            >
              <RecentPostItem recentPost={post} />
            </div>
          )}
        />
      </StyledContainer>
    </StyledRecentPost>
  );
};

export default RecentPost;
