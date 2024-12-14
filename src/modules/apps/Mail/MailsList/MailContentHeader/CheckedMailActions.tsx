import React from "react";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Button, Dropdown } from "antd";
import { BiArchiveIn } from "react-icons/bi";
import { HiOutlineFolderRemove } from "react-icons/hi";
import { MdLabelOutline } from "react-icons/md";
import { AiOutlineDelete, AiOutlineInfoCircle } from "react-icons/ai";
import AppIconButton from "@crema/components/AppIconButton";
import { StyledMailCheckedAction } from "../index.styled";
import { putDataApi, useGetDataApi } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";

import type {
  FolderObjType,
  LabelObjType,
  MailObjType,
} from "@crema/types/models/apps/Mail";

type CheckedMailActionsProps = {
  checkedMails: number[];
  setCheckedMails: (ids: number[]) => void;
  setData: any;
};

const CheckedMailActions: React.FC<CheckedMailActionsProps> = ({
  checkedMails,
  setCheckedMails,
  setData,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{ apiData: labelList }] = useGetDataApi<LabelObjType[]>(
    "/api/mailApp/labels/list",
  );

  const [{ apiData: folderList }] = useGetDataApi<FolderObjType[]>(
    "/api/mailApp/folders/list",
  );

  const onChangeMailFolder = (key: number) => {
    putDataApi<MailObjType[]>(
      "/api/mailApp/update/folder",
      infoViewActionsContext,
      {
        mailIds: checkedMails,
        folderId: key,
      },
    )
      .then((data) => {
        setData({ data, count: data.length });
        infoViewActionsContext.showMessage("Mail moved to folder successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    setCheckedMails([]);
  };

  const onSelectLabel = (key: number) => {
    const labelType = labelList.find(
      (label: LabelObjType) => label.id.toString() === key.toString(),
    );
    putDataApi<MailObjType[]>(
      "/api/mailApp/update/label",
      infoViewActionsContext,
      {
        mailIds: checkedMails,
        type: labelType,
      },
    )
      .then((data) => {
        setData({ data, count: data.length });
        infoViewActionsContext.showMessage("Mail moved to folder successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    setCheckedMails([]);
  };

  const menuLabel = labelList?.map((label: LabelObjType, index: number) => {
    return {
      key: index,
      label: <span onClick={() => onSelectLabel(label.id)}>{label.name}</span>,
    };
  });

  const menuMoveTo = folderList?.map((folder: FolderObjType, index: number) => {
    return {
      key: index,
      label: (
        <span onClick={() => onChangeMailFolder(folder.id)}>{folder.name}</span>
      ),
    };
  });

  return (
    <StyledMailCheckedAction>
      <AppIconButton
        title={<IntlMessages id="common.archive" />}
        onClick={() => onChangeMailFolder(127)}
        icon={<BiArchiveIn />}
      />
      <AppIconButton
        title={<IntlMessages id="common.reportSpam" />}
        onClick={() => onChangeMailFolder(125)}
        icon={<AiOutlineInfoCircle />}
      />
      <AppIconButton
        title={<IntlMessages id="common.trash" />}
        onClick={() => onChangeMailFolder(126)}
        icon={<AiOutlineDelete />}
      />
      <Dropdown menu={{ items: menuLabel }} trigger={["click"]}>
        <Button shape="circle">
          <MdLabelOutline />
        </Button>
      </Dropdown>

      <Dropdown menu={{ items: menuMoveTo }} trigger={["click"]}>
        <Button shape="circle">
          <HiOutlineFolderRemove />
        </Button>
      </Dropdown>
    </StyledMailCheckedAction>
  );
};

export default CheckedMailActions;
