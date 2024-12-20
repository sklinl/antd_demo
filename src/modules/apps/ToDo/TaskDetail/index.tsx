import { useEffect } from "react";
import TaskDetailHeader from "./TaskDetailHeader";
import TaskDetailBody from "./TaskDetailBody";
import { useParams } from "react-router-dom";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import { TodoObjType } from "@crema/types/models/apps/Todo";

const TaskDetail = () => {
  const { id } = useParams();
  const [{ apiData: selectedTask }, { setQueryParams, setData }] =
    useGetDataApi<TodoObjType>(
      "/api/todoApp/task/",
      undefined,
      { id: id },
      false,
    );

  useEffect(() => {
    setQueryParams({ id });
  }, [id]);

  const onUpdateSelectedTask = (data: TodoObjType) => {
    setData(data);
  };

  if (!selectedTask) {
    return null;
  }
  return (
    <>
      <AppsHeader>
        <TaskDetailHeader
          selectedTask={selectedTask}
          onUpdateSelectedTask={onUpdateSelectedTask}
        />
      </AppsHeader>
      <AppsContent isDetailView>
        <TaskDetailBody
          selectedTask={selectedTask}
          onUpdateSelectedTask={onUpdateSelectedTask}
        />
      </AppsContent>
    </>
  );
};

export default TaskDetail;
