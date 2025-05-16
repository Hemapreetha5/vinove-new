import { createReducer, on } from '@ngrx/store';
import {
  PossibleQualificationModel,
  SubjectGroupModel,
  TermAndConditionsModel,
  ProfileDetailsModel,
  RelationshipModel,
  SelectedSubjectModel,
  SelectedQualificationModel,
  ProfileUpdateModel,
  QualificationSubjectSelectionModel,
} from '../models';
import * as RegistrationActions from './registration.actions';
import { MessageResponseModel } from '../../_models';

export interface RegistrationState {
  possibleQualifications: PossibleQualificationModel[];
  selectedQualification: SelectedQualificationModel | null;
  possibleSubjects: SubjectGroupModel[];
  selectedSubjects: SelectedSubjectModel[];
  termConditions: TermAndConditionsModel[];
  messageResponseModel: MessageResponseModel | null;
  profileDetails: ProfileDetailsModel | null;
  profileDetailsModel: ProfileDetailsModel[];
  relationship: RelationshipModel[];
  profileUpdate: ProfileUpdateModel | null;
  qualificationSubjectSelection: QualificationSubjectSelectionModel | null;
  loading: boolean;
  error: string | null;
}

export const initialState: RegistrationState = {
  possibleQualifications: [],
  selectedQualification: null,
  possibleSubjects: [],
  selectedSubjects: [],
  loading: false,
  termConditions: [],
  profileDetails: null,
  profileDetailsModel: [],
  relationship: [],
  error: null,
  messageResponseModel: null,
  profileUpdate: null,
  qualificationSubjectSelection: null,
};

export const registrationReducer = createReducer(
  initialState,
  // Possible Qualification Reducers
  on(
    RegistrationActions.loadPossibleQualificationsSuccess,
    (state, { possibleQualifications }) => ({
      ...state,
      possibleQualifications,
      error: null,
    })
  ),
  on(
    RegistrationActions.loadPossibleQualificationsFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  on(RegistrationActions.selectQualification, (state, { qualificationId }) => ({
    ...state,
    selectedQualification: mapSelectedQualification(
      qualificationId,
      state.possibleQualifications
    ),
    loading: false,
  })),

  on(RegistrationActions.clearSelectedQualification, (state) => ({
    ...state,
    selectedQualification: null,
  })),
  on(
    RegistrationActions.saveSelectedQualificationSuccess,
    (state, { selectedQualification }) => ({
      ...state,
      selectedQualification,
    })
  ),
  on(
    RegistrationActions.saveSelectedQualificationFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  // Possible Subjects Reducers
  on(RegistrationActions.loadPossibleSubjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    RegistrationActions.loadPossibleSubjectsSuccess,
    (state, { possibleSubjects }) => ({
      ...state,
      possibleSubjects,
      loading: false,
      error: null,
    })
  ),
  on(RegistrationActions.loadPossibleSubjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(RegistrationActions.selectSubject, (state, { groupId, subjectId }) => ({
    ...state,
    possibleSubjects: updateSubGroupSubjects(
      state.possibleSubjects,
      groupId,
      subjectId,
      true
    ),
  })),
  on(RegistrationActions.deselectSubject, (state, { groupId, subjectId }) => ({
    ...state,
    possibleSubjects: updateSubGroupSubjects(
      state.possibleSubjects,
      groupId,
      subjectId,
      false
    ),
  })),
  on(
    RegistrationActions.saveSubjectSelectionSuccess,
    (state, { selectedSubjects }) => ({
      ...state,
      selectedSubjects,
      loading: false,
    })
  ),
  on(RegistrationActions.saveSubjectSelectionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(
    RegistrationActions.loadTermConditionSuccess,
    (state, { termConditions }) => ({
      ...state,
      termConditions,
      error: null,
      loading: false,
    })
  ),
  on(RegistrationActions.loadTermConditionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(
    RegistrationActions.setTermConditionInSession,
    (state, { termConditions }) => ({
      ...state,
      termConditions,
    })
  ),
  on(
    RegistrationActions.saveTermCondition,
    (state, { termAndConditionsAcceptedModel }) => ({
      ...state,
      termAndConditionsAcceptedModel,
    })
  ),
  on(
    RegistrationActions.saveTermConditionSuccess,
    (state, { messageResponseModel }) => ({
      ...state,
      messageResponseModel,
    })
  ),
  // Profile Details Reducers
  on(RegistrationActions.loadProfileDetails, (state, { studentNumber }) => ({
    ...state,
    profileDetails: state.profileDetails,
    studentNumber: studentNumber,
  })),

  on(
    RegistrationActions.loadProfileDetailsSuccess,
    (state, { profileDetails }) => ({
      ...state,
      profileDetails: profileDetails,
      error: null,
    })
  ),
  on(RegistrationActions.loadProfileDetailsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    RegistrationActions.persistProfileDetails,
    (state, { profileDetails }) => ({
      ...state,
      profileDetails: profileDetails,
    })
  ),
  on(RegistrationActions.addprofileDetails, (state, action) => ({
    ...state,
    profileDetailsModel: [
      ...state.profileDetailsModel,
      action.profileDetailsModel,
    ],
  })),

  on(RegistrationActions.addprofileDetailsSuccess, (state, action) => ({
    ...state,
    profileDetailsModel: [
      ...state.profileDetailsModel,
      action.profileDetailsModel,
    ],
  })),
  // Relationship Reducers
  on(RegistrationActions.loadRelationship, (state, { studentNumber }) => ({
    ...state,
    relationship: state.relationship,
    studentNumber: studentNumber,
  })),

  on(
    RegistrationActions.loadRelationshipSuccess,
    (state, { relationship }) => ({
      ...state,
      relationship: relationship,
      error: null,
    })
  ),
  on(RegistrationActions.loadRelationshipFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RegistrationActions.persistRelationship, (state, { relationship }) => ({
    ...state,
    relationship: relationship,
  })),
  on(RegistrationActions.updateProfile, (state, { updateModel }) => ({
    ...state,
    profileUpdate: updateModel,
  })),
  on(
    RegistrationActions.updateProfileSuccess,
    (state, { messageResponseModel }) => ({
      ...state,
      messageResponseModel: messageResponseModel,
    })
  ),
  on(RegistrationActions.updateProfileDetailsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(
    RegistrationActions.FetchQualificationSubjectSelectionSuccess,
    (state, { qualificationSubjectSelection }) => ({
      ...state,
      qualificationSubjectSelection,
      loading: false,
    })
  ),
  on(
    RegistrationActions.FetchQualificationSubjectSelectionFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  )
);

// SubGroup Implementation Function
function updateSubGroupSubjects(
  groups: SubjectGroupModel[],
  groupId: number,
  subjectId: number,
  isTicked: boolean
): SubjectGroupModel[] {
  return groups.map((group) => {
    if (group.subjectGroupId === groupId) {
      return {
        ...group,
        subjects: group.subjects.map((subject) =>
          subject.possibleSubjectId === subjectId
            ? { ...subject, isTicked }
            : subject
        ),
        subGroups: group.subGroups
          ? updateSubGroupSubjects(
              group.subGroups,
              groupId,
              subjectId,
              isTicked
            )
          : group.subGroups,
      };
    }
    return {
      ...group,
      subGroups: group.subGroups
        ? updateSubGroupSubjects(group.subGroups, groupId, subjectId, isTicked)
        : group.subGroups,
    };
  });
}

// Map Selected Qualification
function mapSelectedQualification(
  possibleQualificationId: number,
  possibleQualifications: PossibleQualificationModel[]
): SelectedQualificationModel | null {
  const selectedQualification = possibleQualifications.find(
    (x) => x.possibleQualificationId === possibleQualificationId
  );
  if (selectedQualification) {
    const model: SelectedQualificationModel = {
      selectedQualificationId: 0,
      studentNumber: selectedQualification.studentNumber,
      academicYear: selectedQualification.academicYear,
      qualificationCode: selectedQualification.qualificationCode,
      facultyCode: '',
      maximumCredit: selectedQualification.maximumCredit,
      minimumCredit: selectedQualification.minimumCredit,
      studyBlock: selectedQualification.blockCode,
      studyPeriod: selectedQualification.studyPeriod,
      offeringType: selectedQualification.offeringTypeCode,
      possibleQualificationId: selectedQualification.possibleQualificationId,
    };
    return model;
  } else {
    return null;
  }
}
