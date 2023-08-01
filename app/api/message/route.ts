import {
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  SUCCESS_CODE,
  SUCCESS_CODE_MESSAGE,
  UNAUTHORIZED_CODE,
  UNAUTHORIZED_MESSAGE,
} from '@/lib/errors';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import sanitySdk from '@/services';
import { IUser } from '@/types/common';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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

    const chatId = request.nextUrl.searchParams.get('chatId');

    if (!chatId) {
      throw Error();
    }

    const messages = await sanitySdk.getMessagesByChat(chatId);

    return NextResponse.json(
      {
        message: SUCCESS_CODE_MESSAGE,
        data: messages,
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

    const { messageText, chatId } = await request.json();
    const currentUser = session.user as IUser;
    const newMessage = await sanitySdk.createMessage(
      chatId,
      currentUser._id,
      messageText
    );

    return NextResponse.json(
      {
        message: SUCCESS_CODE_MESSAGE,
        data: newMessage,
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
