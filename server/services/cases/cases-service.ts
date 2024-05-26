import { ApiResponse } from '@/global/response.types';
import Cases, { MCase } from '@/models/Cases';

export const createCaseService = async (
  cases: MCase,
): Promise<ApiResponse<null>> => {
  try {
    const caseCreated = await Cases.insertOne(cases);
    if (!caseCreated)
      return { data: null, success: false, message: 'Case not created' };

    return {
      data: null,
      success: true,
      message: 'Case created successfully',
    };
  } catch (e) {
    return {
      data: null,
      success: false,
      message: 'Internal Server Error',
    };
  }
};
