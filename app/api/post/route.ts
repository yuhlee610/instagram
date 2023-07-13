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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        status: UNAUTHORIZED_CODE,
        message: UNAUTHORIZED_MESSAGE,
      });
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

    await sanitySdk.createPost(imageAssets, caption, currentUser._id);

    return NextResponse.json({
      status: SUCCESS_CODE,
      message: SUCCESS_CODE_MESSAGE,
    });
  } catch (error) {
    return NextResponse.json({
      status: SERVER_ERROR_CODE,
      message: SERVER_ERROR_MESSAGE,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        status: UNAUTHORIZED_CODE,
        message: UNAUTHORIZED_MESSAGE,
      });
    }

    const perPage = request.nextUrl.searchParams.get('perPage') || 10;
    const lastId = request.nextUrl.searchParams.get('lastId') || '';
    const lastCreatedAt =
      request.nextUrl.searchParams.get('lastCreatedAt') || new Date().toJSON();

    const posts = await sanitySdk.getLatestPosts({
      perPage: +perPage,
      lastId,
      lastCreatedAt,
    });

    return NextResponse.json({
      status: SUCCESS_CODE,
      message: SUCCESS_CODE_MESSAGE,
      data: posts,
    });
  } catch (error) {
    return NextResponse.json({
      status: SERVER_ERROR_CODE,
      message: SERVER_ERROR_MESSAGE,
    });
  }
}
