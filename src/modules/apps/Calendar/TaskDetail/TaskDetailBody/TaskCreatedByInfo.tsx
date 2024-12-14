import IntlMessages from "@crema/helpers/IntlMessages";
import {
  StyledTodoAvatar30,
  StyledTodoCrByInfo,
  StyledTodoCrByInfoContent,
  StyledTodoCrByName,
  StyledTodoCrOn,
} from "../index.styled";

type Props = {
  createdBy: {
    name: string;
    image?: string;
  };
  createdOn: string;
};

const TaskCreatedByInfo = ({ createdBy, createdOn }: Props) => {
  return (
    <StyledTodoCrByInfo>
      {createdBy.image ? (
        <StyledTodoAvatar30 src={createdBy.image} />
      ) : (
        <StyledTodoAvatar30 className="todo-avatar-name">
          {createdBy.name[0]}
        </StyledTodoAvatar30>
      )}
      <StyledTodoCrByInfoContent>
        <StyledTodoCrByName>{createdBy.name}</StyledTodoCrByName>
        <p className="mb-0">
          <span>
            <IntlMessages id="todo.createdThisTask" />
          </span>
          <StyledTodoCrOn>{createdOn}</StyledTodoCrOn>
        </p>
      </StyledTodoCrByInfoContent>
    </StyledTodoCrByInfo>
  );
};

export default TaskCreatedByInfo;
