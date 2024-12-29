import { EStatusCode } from '@/global/config';
import { ApiResponse } from '@/global/response.types';
import Cases from '@/models/Cases';
import { TCase } from '@/validations/cases';
import { ObjectId } from 'mongodb';

export const createCaseService = async (
  cases: TCase,
): Promise<ApiResponse<null>> => {
  const caseCreated = await Cases.create(cases);
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
  userId: ObjectId,
): Promise<ApiResponse<TCase[]>> => {
  const cases = await Cases.find({
    userId,
    isArchived: {
      $eq: false,
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
  caseId: ObjectId,
): Promise<ApiResponse<TCase>> => {
  const caseFound = await Cases.findOne({
    _id: caseId,
    isArchived: false,
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
  caseId: ObjectId,
  data: Partial<TCase>,
): Promise<ApiResponse<TCase>> => {
  const updatedCase = await Cases.findOneAndUpdate(
    {
      _id: caseId,
      isArchived: false,
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
export const deleteCaseService = async (
  caseId: ObjectId,
): Promise<ApiResponse<TCase>> => {
  const updatedCase = await Cases.findOneAndUpdate(
    {
      _id: caseId,
      isArchived: false,
    },
    {
      $set: {
        isArchived: true,
      },
    },
    {
      returnDocument: 'after',
    },
  );

  if (!updatedCase) {
    return {
      data: null,
      success: false,
      message: 'Sorry, Something went wrong',
      code: EStatusCode.NotFound,
    };
  }

  return {
    data: null,
    success: true,
    message: 'Case deleted successfully',
    code: EStatusCode.Ok,
  };
};
