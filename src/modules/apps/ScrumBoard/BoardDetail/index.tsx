import { useEffect } from "react";
import AppsContainer from "@crema/components/AppsContainer";
import BoardDetailView from "./BoardDetailView";
import { useNavigate, useParams } from "react-router-dom";
import { StyledScrumBoardDetailTitle } from "./index.styled";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import type { BoardObjType } from "@crema/types/models/apps/ScrumbBoard";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [{ apiData: boardDetail }, { setData, setQueryParams }] =
    useGetDataApi<BoardObjType>(
      "/api/scrumboard/board/",
      undefined,
      { id: id },
      false,
    );

  useEffect(() => {
    setQueryParams({ id });
    return () => {
      setQueryParams({});
    };
  }, [id]);

  const onGoToBoardList = () => {
    navigate(-1);
  };

  if (!boardDetail) {
    return null;
  }

  return (
    <AppsContainer
      fullView
      noContentAnimation
      title={
        <>
          <StyledScrumBoardDetailTitle onClick={onGoToBoardList}>
            Scrum Board
          </StyledScrumBoardDetailTitle>
          &gt; {boardDetail?.name}
        </>
      }
    >
      <BoardDetailView boardDetail={boardDetail} setData={setData} />
    </AppsContainer>
  );
};

export default BoardDetail;
