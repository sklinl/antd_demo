import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {useIntl} from 'react-intl';
import {Avatar} from 'antd';
import {
  PictureOutlined,
  SendOutlined,
  SmileOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import {
  StyledCreatePostAction,
  StyledCreatePostActionBtn,
  StyledCreatePostCard,
  StyledCreatePostImgItem,
  StyledCreatePostImgList,
  StyledCreatePostInput,
  StyledCreatePostMain,
  StyledCreatePostMainContent,
} from './index.styled';
import {useInfoViewActionsContext} from '@crema/context/AppContextProvider/InfoViewContextProvider';
import {postDataApi} from '@crema/hooks/APIHooks';
import {AttachmentObjType, WallDataType} from '@crema/types/models/apps/Wall';
import {generateRandomUniqueNumber} from '@crema/helpers/Common';

type CreatePostProps = {
  wallData: WallDataType;
  setPostList: any;
};
const CreatePost: React.FC<CreatePostProps> = ({wallData, setPostList}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<AttachmentObjType[]>([]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file: any) => {
        return {
          id: generateRandomUniqueNumber(),
          path: file.path,
          metaData: {type: file.type, size: file.size},
          preview: URL.createObjectURL(file),
        };
      });
      onAddAttachments(files);
    },
  });

  const onAddAttachments = (files: AttachmentObjType[]) => {
    setAttachments([...attachments, ...files]);
  };

  const handlePostSubmit = () => {
    const post = {
      message,
      attachments,
      owner: {
        name: wallData.name,
        profilePic: wallData.profilePic,
        id: wallData.id,
      },
    };

    postDataApi('/wall/posts', infoViewActionsContext, {
      post,
    })
      .then((data) => {
        setPostList(data);
        infoViewActionsContext.showMessage('Post Created Successfully!');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    setAttachments([]);
    setMessage('');
  };

  const {messages} = useIntl();

  return (
    <StyledCreatePostCard title={messages['wall.createPost'] as string}>
      <StyledCreatePostMain>
        <Avatar size={40} src={wallData.profilePic} alt={wallData.name} />
        <StyledCreatePostMainContent>
          <StyledCreatePostInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's in your mind?"
            suffix={
              <StyledCreatePostAction>
                <StyledCreatePostActionBtn {...getRootProps()}>
                  <input {...getInputProps()} />
                  <PictureOutlined />
                </StyledCreatePostActionBtn>
                <AppIconButton icon={<VideoCameraOutlined />} />
                <AppIconButton icon={<SmileOutlined />} />
                <AppIconButton icon={<UserOutlined />} />
                <AppIconButton
                  // disabled={!message.trim() && attachments.length === 0}
                  onClick={handlePostSubmit}
                  icon={<SendOutlined />}
                />
              </StyledCreatePostAction>
            }
          />
        </StyledCreatePostMainContent>
      </StyledCreatePostMain>
      {attachments ? (
        <StyledCreatePostImgList
          data={attachments}
          renderItem={(item: AttachmentObjType, index: number) => (
            <StyledCreatePostImgItem key={index}>
              <img src={item.preview} alt='upload' />
            </StyledCreatePostImgItem>
          )}
        />
      ) : null}
    </StyledCreatePostCard>
  );
};

export default CreatePost;
