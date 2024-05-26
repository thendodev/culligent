export enum ProjectRoutes {
  recruitment = 'recruitment',
  dashboard = 'dashboard',
  account = 'account',
  profile = 'profile',
  settings = 'settings',
  case_builder = 'case-builder',
  sign_up = 'sign-up',
  otp_verify = 'otp',

  //question builder
  multi_choice = `${case_builder}/multi-choice`,
  single_choice = `${case_builder}/single-choice`,
  open_ended = `${case_builder}/open-ended`,
}
