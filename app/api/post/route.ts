import sanitySdk from '@/services';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { IUser } from '@/types/common';
import {
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  SUCCESS_CODE,
  SUCCESS_CODE_MESSAGE,
  UNAUTHORIZED_CODE,
  UNAUTHORIZED_MESSAGE,
} from '@/lib/errors';

const CAPTION_KEY = 'caption';
const DEFAULT_PER_PAGE = 3;

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: UNAUTHORIZED_MESSAGE,
        },
        { status: UNAUTHORIZED_CODE }
      );
    }

    const currentUser = session.user as IUser;
    const formData = await request.formData();
    const images: File[] = [];
    const caption = formData.get(CAPTION_KEY) as string;
    for (const [key, value] of formData.entries()) {
      if (key !== CAPTION_KEY) {
        images.push(value as File);
      }
    }
    const imageAssets = await sanitySdk.uploadImages(images);

    const newPost = await sanitySdk.createPost(imageAssets, caption, currentUser._id);

    return NextResponse.json(
      {
        message: SUCCESS_CODE_MESSAGE,
        data: newPost,
      },
      { status: SUCCESS_CODE }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: SERVER_ERROR_MESSAGE,
      },
      { status: SERVER_ERROR_CODE }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: UNAUTHORIZED_MESSAGE,
        },
        { status: UNAUTHORIZED_CODE }
      );
    }

    const perPage = request.nextUrl.searchParams.get('perPage');
    const lastId = request.nextUrl.searchParams.get('lastId')!;
    const lastCreatedAt = request.nextUrl.searchParams.get('lastCreatedAt')!;

    const posts = await sanitySdk.getLatestPosts({
      perPage: +(perPage ?? DEFAULT_PER_PAGE),
      lastId,
      lastCreatedAt,
    });

    return NextResponse.json(
      {
        message: SUCCESS_CODE_MESSAGE,
        data: posts,
      },
      { status: SUCCESS_CODE }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: SERVER_ERROR_MESSAGE,
      },
      { status: SERVER_ERROR_CODE }
    );
  }
}
