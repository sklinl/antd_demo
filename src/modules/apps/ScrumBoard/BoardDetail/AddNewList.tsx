import React, {useState} from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import {RiCloseLine} from 'react-icons/ri';
import {MdAdd} from 'react-icons/md';
import {Input} from 'antd';
import {useIntl} from 'react-intl';
import AppIconButton from '@crema/components/AppIconButton';
import {
  StyledScrumBoardAddClose,
  StyledScrumBoardAddIcon,
  StyledScrumBoardAddList,
  StyledScrumBoardAddListBtn,
  StyledScrumBoardAddListCard,
  StyledScrumBoardAddListFormFilled,
  StyledScrumBoardAddText,
} from './index.styled';

type AddNewListProps = {
  onAdd: (listName: string) => void;
  onCancel: () => void;
};

const AddNewList: React.FC<AddNewListProps> = ({onAdd, onCancel}) => {
  const [listName, setListName] = useState('');

  const onClickAddButton = () => {
    if (listName !== '') {
      onAdd(listName);
      setListName('');
    }
  };

  const {messages} = useIntl();

  return (
    <StyledScrumBoardAddListCard>
      <StyledScrumBoardAddList>
        <StyledScrumBoardAddIcon>
          <MdAdd />
        </StyledScrumBoardAddIcon>
        <StyledScrumBoardAddText>
          <IntlMessages id='scrumboard.addAList' />
        </StyledScrumBoardAddText>
        <StyledScrumBoardAddClose>
          <AppIconButton onClick={onCancel} icon={<RiCloseLine />} />
        </StyledScrumBoardAddClose>
      </StyledScrumBoardAddList>
      <StyledScrumBoardAddListFormFilled>
        <Input
          placeholder={messages['scrumboard.cardTitle'] as string}
          value={listName}
          onChange={(event) => setListName(event.target.value)}
        />
        <StyledScrumBoardAddListBtn
          type='primary'
          ghost
          onClick={() => onClickAddButton()}
        >
          <IntlMessages id='common.add' />
        </StyledScrumBoardAddListBtn>
      </StyledScrumBoardAddListFormFilled>
    </StyledScrumBoardAddListCard>
  );
};

export default AddNewList;
