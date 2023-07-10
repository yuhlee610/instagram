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

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        status: UNAUTHORIZED_CODE,
        message: UNAUTHORIZED_MESSAGE,
      });
    }

    const body = await request.json();
    const currentUser = session.user as IUser;
    await sanitySdk.unlikePost(currentUser._id, body.postId);

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
