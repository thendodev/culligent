import { EStatusCode } from '@/global/config';
import { ApiResponse } from '@/global/response.types';
import Cases, { MCase } from '@/models/Cases';

export const createCaseService = async (
  cases: MCase,
): Promise<ApiResponse<null>> => {
  const caseCreated = await Cases.insertOne(cases);
  if (!caseCreated)
    return {
      data: null,
      success: false,
      message: 'Case not created',
      code: EStatusCode.NotModified,
    };

  return {
    data: null,
    success: true,
    message: 'Case created successfully',
    code: EStatusCode.Ok,
  };
};
