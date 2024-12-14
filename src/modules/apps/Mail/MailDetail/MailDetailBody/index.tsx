import React from 'react';
import {
  StyledMailDetailBody,
  StyledMailDetailBodyContent,
} from '../index.styled';
import {putDataApi} from '@crema/hooks/APIHooks';
import {useInfoViewActionsContext} from '@crema/context/AppContextProvider/InfoViewContextProvider';
import MessageItem from './MessageItem';
import type {MailObjType, MessageType} from '@crema/types/models/apps/Mail';

type MailDetailBodyProps = {
  selectedMail: MailObjType;
  onUpdateSelectedMail: (data: MailObjType) => void;
};

const MailDetailBody: React.FC<MailDetailBodyProps> = ({
  selectedMail,
  onUpdateSelectedMail,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const onSubmitMail = (message: MessageType, index: number) => {
    const messages = selectedMail.messages;
    messages!.splice(index + 1, 0, message);
    selectedMail.messages = messages;
    putDataApi<MailObjType>('/api/mailApp/mail/', infoViewActionsContext, {
      mail: selectedMail,
    })
      .then((data) => {
        onUpdateSelectedMail(data);
        infoViewActionsContext.showMessage('Mail Sent Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onChangeStarred = (message: MessageType, isStarred: boolean) => {
    message.isStarred = isStarred;
    selectedMail.messages = selectedMail!.messages!.map((data) =>
      data.messageId === message.messageId ? message : data,
    );
    putDataApi<MailObjType>('/api/mailApp/mail/', infoViewActionsContext, {
      mail: selectedMail,
    })
      .then((data) => {
        onUpdateSelectedMail(data);
        infoViewActionsContext.showMessage('Mail Updated Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <StyledMailDetailBody>
      {selectedMail ? (
        <StyledMailDetailBodyContent>
          {selectedMail!.messages!.map((message, index) => (
            <MessageItem
              key={index}
              index={index}
              mailLength={selectedMail!.messages!.length}
              message={message}
              onSubmitMail={onSubmitMail}
              onChangeStarred={onChangeStarred}
            />
          ))}
        </StyledMailDetailBodyContent>
      ) : null}
    </StyledMailDetailBody>
  );
};

export default MailDetailBody;
