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
      return NextResponse.json(
        {
          message: UNAUTHORIZED_MESSAGE,
        },
        {
          status: UNAUTHORIZED_CODE,
        }
      );
    }
    
    const currentUser = session.user as IUser;
    const followingId = request.nextUrl.searchParams.get('followingId')!;
    await sanitySdk.unFollow(currentUser._id, followingId);

    return NextResponse.json(
      {
        message: SUCCESS_CODE_MESSAGE,
      },
      {
        status: SUCCESS_CODE,
      }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: SERVER_ERROR_MESSAGE,
      },
      {
        status: SERVER_ERROR_CODE,
      }
    );
  }
}
