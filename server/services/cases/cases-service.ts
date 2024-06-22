import { EStatusCode } from '@/global/config';
import { ApiResponse } from '@/global/response.types';
import Cases, { MCase } from '@/models/Cases';
import { TCase } from '@/validations/cases';
import { use } from 'chai';
import { ObjectId } from 'mongodb';

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

export const getCasesService = async (
  user: string,
): Promise<ApiResponse<MCase[]>> => {
  const cases = await Cases.find({
    user: new ObjectId(user),
    isFeatured: {
      $eq: true,
    },
  });

  if (!cases) {
    return {
      data: null,
      success: false,
      message: 'Cases not found',
      code: EStatusCode.NotFound,
    };
  }

  return {
    data: cases,
    success: true,
    message: 'Cases found successfully',
    code: EStatusCode.Ok,
  };
};

export const getSingleCaseService = async (
  user: string,
  caseId: string,
): Promise<ApiResponse<MCase>> => {
  const caseFound = await Cases.findOne({
    user: new ObjectId(user),
    _id: new ObjectId(caseId),
  });

  if (!caseFound) {
    return {
      data: null,
      success: false,
      message: 'Case not found',
      code: EStatusCode.NotFound,
    };
  }

  return {
    data: caseFound,
    success: true,
    message: 'Case found successfully',
    code: EStatusCode.Ok,
  };
};

export const updateCaseService = async (
  user: string,
  caseId: string,
  data: Partial<TCase>,
): Promise<ApiResponse<MCase>> => {
  const updatedCase = await Cases.findOneAndUpdate(
    {
      _id: new ObjectId(caseId),
      user: new ObjectId(user),
    },
    {
      $set: data,
    },
    {
      returnDocument: 'after',
    },
  );

  if (!updatedCase) {
    return {
      data: null,
      success: false,
      message: 'Case not found',
      code: EStatusCode.NotFound,
    };
  }

  return {
    data: updatedCase,
    success: true,
    message: 'Case updated successfully',
    code: EStatusCode.Ok,
  };
};
