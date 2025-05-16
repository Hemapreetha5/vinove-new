import { createAction, props } from '@ngrx/store';
import {
  FetchPossibleSubjectRequestModel,
  PossibleQualificationModel,
  SubjectGroupModel,
  TermAndConditionsAcceptedModel,
  TermAndConditionsModel,
  ProfileDetailsModel,
  RelationshipModel,
  SelectedSubjectModel,
  AddSelectedQualificationModel,
  SelectedQualificationModel,
  AddSelectedSubjectModel,
  ProfileUpdateModel,
  QualificationSubjectSelectionModel,
} from '../models';
import { MessageResponseModel } from '../../_models';

// Select Qualification Actions
export const loadPossibleQualifications = createAction(
  '[Qualification List] Load Possible qualifications',
  props<{ studentNumber: number }>()
);

export const loadPossibleQualificationsSuccess = createAction(
  '[Qualification List] Load Possible Qualifications Success',
  props<{ possibleQualifications: PossibleQualificationModel[] }>()
);

export const loadPossibleQualificationsFailure = createAction(
  '[Qualification List] Load Possible Qualifications Failure',
  props<{ error: string }>()
);

export const selectQualification = createAction(
  '[Qualification List] Select Qualification',
  props<{ qualificationId: number }>()
);

export const clearSelectedQualification = createAction(
  '[Qualification List] Clear Selected Qualification'
);

export const saveSelectedQualification = createAction(
  '[Add Selected Qualification] Save Selected Qualification',
  props<{ selectedQualification: AddSelectedQualificationModel }>()
);

export const saveSelectedQualificationSuccess = createAction(
  '[Add Selected Qualification] Save Selected Qualification Success',
  props<{
    selectedQualification: SelectedQualificationModel;
  }>()
);

export const saveSelectedQualificationFailure = createAction(
  '[Add Selected Qualification] Save Selected Qualification Failure',
  props<{ error: string }>()
);

// Select Possible Subjects Actions
export const loadPossibleSubjects = createAction(
  '[Subject List] Load Possible Subjects',
  props<{ request: FetchPossibleSubjectRequestModel }>()
);

export const loadPossibleSubjectsSuccess = createAction(
  '[Subject List] Load Possible Subjects Success',
  props<{ possibleSubjects: SubjectGroupModel[] }>()
);

export const loadPossibleSubjectsFailure = createAction(
  '[Subject List] Load Possible Subjects Failure',
  props<{ error: string }>()
);

export const selectSubject = createAction(
  '[Subject List] Select Subject',
  props<{ groupId: number; subjectId: number }>()
);

export const deselectSubject = createAction(
  '[Subject List] Deselect Subject',
  props<{ groupId: number; subjectId: number }>()
);

export const saveSubjectSelection = createAction(
  '[Subject Selection List] Save Subject Selection',
  props<{ selectedSubjects: AddSelectedSubjectModel[] }>()
);

export const saveSubjectSelectionSuccess = createAction(
  '[Subject Selection List] Save Subject Selection Success',
  props<{ selectedSubjects: SelectedSubjectModel[] }>()
);

export const saveSubjectSelectionFailure = createAction(
  '[Subject Selection List] Save Subject Selection Failure',
  props<{ error: string }>()
);

// Term & Condition Actions
export const loadTermCondition = createAction(
  '[TermAndCondition List] Load Term & Condition',
  props<{ studentNumber: number }>()
);

export const loadTermConditionSuccess = createAction(
  '[TermAndCondition List] Load Term & Condition Success',
  props<{ termConditions: TermAndConditionsModel[] }>()
);

export const loadTermConditionFailure = createAction(
  '[TermAndCondition List] Load Term & Condition Failure',
  props<{ error: string }>()
);

export const saveTermCondition = createAction(
  '[TermAndCondition Add] ADD Term & Condition',
  props<{ termAndConditionsAcceptedModel: TermAndConditionsAcceptedModel }>()
);

export const saveTermConditionSuccess = createAction(
  '[TermAndCondition Add] ADD Term & Condition Success',
  props<{ messageResponseModel: MessageResponseModel }>()
);

// Session TermCondition
export const loadTermConditionFromSession = createAction(
  '[TermAndCondition List] Load Terms & Conditions From Session'
);

export const setTermConditionInSession = createAction(
  '[TermAndCondition List] Set Terms & Conditions In Session',
  props<{ termConditions: TermAndConditionsModel[] }>()
);

// Profile Details Actions
export const loadProfileDetails = createAction(
  '[ProfileDetails List] Load Profile Details By Student',
  props<{ studentNumber: number }>()
);

export const loadProfileDetailsSuccess = createAction(
  '[ProfileDetails List] Load Profile Details By Student Success',
  props<{ profileDetails: ProfileDetailsModel }>()
);

export const loadProfileDetailsFailure = createAction(
  '[ProfileDetails List] Load Profile Details By Student Failure',
  props<{ error: string }>()
);

export const persistProfileDetails = createAction(
  '[ProfileDetails List] Load ProfileDetails From Session',
  props<{ profileDetails: ProfileDetailsModel }>()
);

export const addprofileDetails = createAction(
  '[ProfileDetails List Form] Add Student ',
  props<{ studentNumber: number; profileDetailsModel: ProfileDetailsModel }>()
);

export const addprofileDetailsSuccess = createAction(
  '[ProfileDetails List Form] Add Student Success',
  props<{ profileDetailsModel: ProfileDetailsModel }>()
);

export const addprofileDetailsFailure = createAction(
  '[ProfileDetails List Form] Add Student Failure',
  props<{ error: string }>()
);

// Relationship Actions
export const loadRelationship = createAction(
  '[Relationship List] Load Relationship By Student',
  props<{ studentNumber: number }>()
);

export const loadRelationshipSuccess = createAction(
  '[Relationship List] Load Relationship By Student Success',
  props<{ relationship: RelationshipModel[] }>()
);

export const loadRelationshipFailure = createAction(
  '[Relationship List] Load Relationship By Student Failure',
  props<{ error: string }>()
);

export const persistRelationship = createAction(
  '[Relationship List] Load Relationship From Session',
  props<{ relationship: RelationshipModel[] }>()
);

export const updateProfile = createAction(
  '[Update Profile] Update Profile ',
  props<{ updateModel: ProfileUpdateModel }>()
);

export const updateProfileSuccess = createAction(
  '[Update Profile] Profiles Update Success',
  props<{ messageResponseModel: MessageResponseModel }>()
);

export const updateProfileDetailsFailure = createAction(
  '[Update Profile Update Profile Details By Student Failure',
  props<{ error: string }>()
);

export const FetchQualificationSubjectSelection = createAction(
  '[Selection Review] Fetch Qualification Subject Selection',
  props<{ studentNumber: number }>()
);

export const FetchQualificationSubjectSelectionSuccess = createAction(
  '[Selection Review] Fetch Qualification Subject Selection Success',
  props<{
    qualificationSubjectSelection: QualificationSubjectSelectionModel;
  }>()
);

export const FetchQualificationSubjectSelectionFailure = createAction(
  '[Selection Review] Fetch Qualification Subject Selection Failure',
  props<{ error: string }>()
);
