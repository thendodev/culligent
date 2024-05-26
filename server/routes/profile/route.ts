import { Dbconnect, Dbdisconnect } from '@/lib/database/papr';
import {
  CreateProfileService,
  getProfileService,
} from '@/server/services/profile/profile-service';
import { NextRequest, NextResponse } from 'next/server';

//create new profile
export const POST = async (req: NextRequest) => {
  try {
    await Dbconnect();
    const body = await req.json();
    const { success, message, data } = await CreateProfileService(body);
    if (!success && !data) return new NextResponse(message, { status: 400 });
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
  } finally {
    await Dbdisconnect();
  }
};

//update profile
export const PATCH = async (req: NextRequest) => {
  try {
    await Dbconnect();
    const body = await req.json();
    const { success, message, data } = await getProfileService(body);
    if (!success && !data) return new NextResponse(message, { status: 400 });
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
  } finally {
    await Dbdisconnect();
  }
};
