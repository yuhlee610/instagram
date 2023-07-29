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

    const { partnerId } = await request.json();
    const currentUser = session.user as IUser;
    const createdChat = await sanitySdk.createChat(partnerId, currentUser._id);

    return NextResponse.json(
      {
        message: SUCCESS_CODE_MESSAGE,
        data: createdChat,
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
