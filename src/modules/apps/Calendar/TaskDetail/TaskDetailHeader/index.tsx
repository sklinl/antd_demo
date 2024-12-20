import { useNavigate } from "react-router-dom";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppsStarredIcon from "@crema/components/AppsStarredIcon";
import StatusToggleButton from "./StatusToggleButton";
import { BiArrowBack } from "react-icons/bi";
import {
  StyledTodoDetailArrow,
  StyledTodoDetailDeleteIcon,
  StyledTodoStarIconView,
} from "../index.styled";
import { putDataApi } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import { TodoObjType } from "@crema/types/models/apps/Todo";

type Props = {
  selectedTask: TodoObjType;
  onUpdateSelectedTask: (data: TodoObjType) => void;
};

const TaskDetailHeader = (props: Props) => {
  const { onUpdateSelectedTask, selectedTask } = props;
  const infoViewActionsContext = useInfoViewActionsContext();
  const navigate = useNavigate();

  const onClickBackButton = () => {
    navigate(-1);
  };

  const onChangeStarred = (checked: boolean) => {
    putDataApi<TodoObjType[]>(
      "/api/calendar/update/starred",
      infoViewActionsContext,
      {
        taskIds: [selectedTask.id],
        status: checked,
      },
    )
      .then((data) => {
        onUpdateSelectedTask(data[0]);
        infoViewActionsContext.showMessage(
          data[0].isStarred
            ? "Task Marked as Starred Successfully"
            : "Task Marked as Unstarred Successfully",
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onDeleteTask = () => {
    const task = selectedTask;
    task.folderValue = 126;

    putDataApi<{ task: TodoObjType }>(
      "/api/calendar/task/",
      infoViewActionsContext,
      {
        task,
      },
    )
      .then((data) => {
        onUpdateSelectedTask(data.task);
        infoViewActionsContext.showMessage("Task Deleted Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    navigate(-1);
  };

  return (
    <>
      <StyledTodoDetailArrow
        title={<IntlMessages id="common.back" />}
        onClick={onClickBackButton}
        icon={<BiArrowBack />}
      />

      <StatusToggleButton
        selectedTask={selectedTask}
        onUpdateSelectedTask={onUpdateSelectedTask}
      />

      <StyledTodoStarIconView>
        <AppsStarredIcon item={selectedTask} onChange={onChangeStarred} />
      </StyledTodoStarIconView>

      <StyledTodoDetailDeleteIcon
        deleteAction={onDeleteTask}
        deleteTitle={<IntlMessages id="todo.deleteMessage" />}
      />
    </>
  );
};

export default TaskDetailHeader;
