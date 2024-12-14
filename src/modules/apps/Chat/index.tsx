import { useState } from "react";
import { useIntl } from "react-intl";
import AppsContainer from "@crema/components/AppsContainer";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import AppPageMeta from "@crema/components/AppPageMeta";
import ChatSideBar from "./ChatSideBar";
import ChatContent from "./ChatContent";
import { ConnectionObjType } from "@crema/types/models/apps/Chat";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<ConnectionObjType | null>(
    null,
  );

  const [{ apiData: connectionList, loading }, { setData: setConnectionData }] =
    useGetDataApi<ConnectionObjType[]>("/api/chatApp/connections");

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages["chatApp.chat"] as string}
      sidebarContent={
        <ChatSideBar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          connectionList={connectionList}
          loading={loading}
        />
      }
    >
      <AppPageMeta title="Chat App" />
      <ChatContent
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setConnectionData={setConnectionData}
      />
    </AppsContainer>
  );
};

export default Chat;
