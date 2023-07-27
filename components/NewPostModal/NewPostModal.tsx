'use client';

import React, {
  useRef,
  DragEvent,
  MouseEvent,
  useState,
  ChangeEvent,
} from 'react';
import Modal from '../Modal/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import SwiperCarousel from '../SwiperCarousel/SwiperCarousel';
import usePreviewImages from '@/hooks/usePreviewImages';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { BsArrowLeft } from 'react-icons/bs';
import AutoSizingTextarea from '../AutoSizingTextarea/AutoSizingTextarea';
import { SmallAvatar } from '../Avatar/Avatar';
import { useSession } from 'next-auth/react';
import { IPost, IUser } from '@/types/common';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import { GoCheckCircle } from 'react-icons/go';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useRouter, useSearchParams } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const UPLOAD_IMAGES_STAGE = 'UPLOAD_IMAGES_STAGE';
const PREVIEW_IMAGES_STAGE = 'PREVIEW_IMAGES_STAGE';
const ADD_CAPTION_STAGE = 'ADD_CAPTION_STAGE';
const LOADING_SUBMIT_STAGE = 'LOADING_SUBMIT_STAGE';
const SUCCESS_SUBMIT_STAGE = 'SUCCESS_SUBMIT_STAGE';
const ERROR_SUBMIT_STAGE = 'ERROR_SUBMIT_STAGE';
const STAGES = [UPLOAD_IMAGES_STAGE, PREVIEW_IMAGES_STAGE, ADD_CAPTION_STAGE];

const getPrevStage = (currStage: string) => {
  const currStageIndex = STAGES.findIndex((stage) => stage === currStage);
  return STAGES[currStageIndex - 1];
};

const isEqualToStage = (currStage: string, desStage: string) =>
  currStage === desStage;

const MediaIcon = () => {
  return (
    <svg
      width="96"
      height="77"
      className="x1lliihq x1n2onr6"
      color="#000"
      viewBox="0 0 97.6 77.3"
    >
      <path
        fill="currentColor"
        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
      />
      <path
        fill="currentColor"
        d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
      />
      <path
        fill="currentColor"
        d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
      />
    </svg>
  );
};

interface IPostInput {
  images: FileList;
  caption: string;
}

const NewPostModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isOpenNewPostModal = !!searchParams?.get('new-post');
  const { register, watch, setValue, reset, getValues, handleSubmit } =
    useForm<IPostInput>();
  const { ref, onChange, ...inputProps } = register('images');
  const inputImagesRef = useRef<HTMLElement | null>(null);
  const [stage, setStage] = useState<string>(UPLOAD_IMAGES_STAGE);
  const watchImages = watch('images');
  const previewImages = usePreviewImages(watchImages);
  const currentUser = useCurrentUser();
  const { mutateAsync: postMutate } = useMutation({
    mutationFn: async (data: IPostInput) => {
      try {
        const formData = new FormData();
        const images = [...data.images];
        images.forEach((image) => formData.append(image.name, image));
        formData.append('caption', data.caption);

        const response = await fetch('/api/post', {
          method: 'POST',
          body: formData,
        });

        setStage(SUCCESS_SUBMIT_STAGE);
        return await response.json();
      } catch (error) {
        setStage(ERROR_SUBMIT_STAGE);
      }
    },
    onSuccess(newPost) {
      queryClient.setQueryData<InfiniteData<IPost[]>>(
        ['newFeedPosts'],
        (oldData) => {
          const newData = oldData?.pages.map((page, index) => {
            if (index === 0) {
              return [
                {
                  ...newPost.data,
                  author: currentUser,
                  comments: [],
                  likes: 0,
                },
                ...page,
              ];
            }
            return page;
          });
          return { ...oldData, pages: newData } as InfiniteData<IPost[]>;
        }
      );
    },
  });

  const handleClickAddImagesButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputImagesRef.current!.click();
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    if (dt) {
      setValue('images', dt.files);
    }
  };

  const onBack = () => {
    const prevStage = getPrevStage(stage);
    setStage(prevStage);
    if (isEqualToStage(stage, UPLOAD_IMAGES_STAGE)) {
      reset();
    }
  };

  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStage(PREVIEW_IMAGES_STAGE);
    onChange(e);
  };

  const onEmojiSelect = (emoji: any) => {
    const symbol = emoji.unified.split('-');
    const codesArray = symbol.map((el: string) => '0x' + el);
    const formattedEmoji = String.fromCodePoint(...codesArray);
    const captionValue = getValues('caption');
    setValue('caption', `${captionValue}${formattedEmoji}`, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<IPostInput> = async (data) => {
    setStage(LOADING_SUBMIT_STAGE);

    await postMutate(data);
  };

  const onCloseModal = () => {
    setStage(UPLOAD_IMAGES_STAGE);
    router.back();
  };

  const inputImagesArea = (
    <div
      className="flex flex-col items-center justify-center space-y-3 w-full h-full"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <MediaIcon />
      <div className="text-lg">Kéo ảnh vào đây</div>
      <button
        className="bg-sky-500 hover:bg-sky-600 rounded-md px-3 py-2 text-sm font-semibold text-white"
        onClick={handleClickAddImagesButton}
      >
        Chọn từ máy tính
      </button>
      <input
        {...inputProps}
        type="file"
        ref={(e) => {
          ref(e);
          inputImagesRef.current = e;
        }}
        onChange={onImagesChange}
        accept="image/*"
        hidden
        multiple
      />
    </div>
  );

  const previewImagesCarousel = (
    <SwiperCarousel className="w-full h-full rounded-b-xl overflow-hidden">
      {previewImages?.map((url, index) => (
        <SwiperSlide key={index}>
          <Image className="object-cover" src={url} alt="preview image" fill />
        </SwiperSlide>
      ))}
    </SwiperCarousel>
  );

  const inputCaptionArea = (
    <div className="p-4 h-full flex flex-col space-y-3">
      <div className="flex space-x-3 items-center">
        <SmallAvatar image={currentUser?.avatar} />
        <div className="text-sm font-semibold">{currentUser?.name}</div>
      </div>
      <div className="flex-grow overflow-y-auto h-px">
        <AutoSizingTextarea
          {...register('caption')}
          placeholder="Viết chú thích"
        />
      </div>
      <EmojiPicker onEmojiSelect={onEmojiSelect} />
    </div>
  );

  const getLayoutsMatchStage = () => {
    switch (stage) {
      case UPLOAD_IMAGES_STAGE:
        return {
          previousStep: null,
          nextStep: null,
          content: inputImagesArea,
          heading: 'Tạo bài viết mới',
        };

      case PREVIEW_IMAGES_STAGE:
        return {
          previousStep: (
            <BsArrowLeft
              className="scale-125 cursor-pointer"
              onClick={onBack}
            />
          ),
          nextStep: (
            <div
              className="text-sm text-sky-500 font-semibold cursor-pointer"
              onClick={() => setStage(ADD_CAPTION_STAGE)}
            >
              Tiếp
            </div>
          ),
          content: previewImagesCarousel,
          heading: 'Tạo bài viết mới',
        };

      case ADD_CAPTION_STAGE:
        return {
          previousStep: (
            <BsArrowLeft
              className="scale-125 cursor-pointer"
              onClick={onBack}
            />
          ),
          nextStep: (
            <div
              className="text-sm text-sky-500 font-semibold cursor-pointer"
              onClick={handleSubmit(onSubmit)}
            >
              Chia sẻ
            </div>
          ),
          content: inputCaptionArea,
          heading: 'Tạo bài viết mới',
        };

      case LOADING_SUBMIT_STAGE:
        return {
          heading: 'Đang chia sẻ bài viết',
          content: (
            <div className="flex items-center justify-center h-full">
              <div
                className="inline-block h-28 w-28 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          ),
        };

      case SUCCESS_SUBMIT_STAGE:
        return {
          heading: 'Đã chia sẻ bài viết',
          content: (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <GoCheckCircle className="w-24 h-24" />
              <div>Đã chia sẻ bài viết của bạn</div>
            </div>
          ),
        };

      case ERROR_SUBMIT_STAGE:
        return {
          heading: 'Chia sẻ thất bại',
          content: (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <IoIosCloseCircleOutline className="w-24 h-24" />
              <div>Chia sẻ bài viết thất bại</div>
            </div>
          ),
        };

      default:
        return {
          previousStep: null,
          nextStep: null,
          content: null,
        };
    }
  };

  const { previousStep, nextStep, content, heading } = getLayoutsMatchStage();

  return (
    <Modal isOpen={isOpenNewPostModal} onClose={onCloseModal} id="create-post">
      <div className="h-full flex items-center justify-center">
        <div className="rounded-xl bg-white flex flex-col w-[346px] h-[391px] md:w-[533px] md:h-[578px]">
          <div className="flex justify-between items-center px-3 relative h-11">
            {previousStep}
            <div className="absolute text-sm font-semibold left-1/2 translate-x-[-50%]">
              {heading}
            </div>
            {nextStep}
          </div>
          <hr />
          <div className="flex flex-col justify-center items-center flex-grow">
            <form className="w-full h-full" encType="multipart/form-data">
              {content}
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewPostModal;
