import { Injectable } from '@angular/core';
import * as RegistrationActions from './registration.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  PossibleQualificationService,
  PossibleSubjectsService,
  TermAndConditionService,
  ProfileDetailsService,
  RelationshipService,
  SelectedQualificationService,
  SelectedSubjectService,
  RegistrationService,
} from '../services';
import {
  catchError,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectedQualification } from './registration.selectors';
@Injectable()
export class RegistrationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly possibleQualificationService: PossibleQualificationService,
    private readonly possibleSubjectsService: PossibleSubjectsService,
    private readonly termAndConditionService: TermAndConditionService,
    private readonly ProfileDetailsService: ProfileDetailsService,
    private readonly RelationshipService: RelationshipService,
    private readonly selectedQualificationService: SelectedQualificationService,
    private readonly selectedSubjectService: SelectedSubjectService,
    private readonly registrationService: RegistrationService
  ) {}

  // Possible Qualifications Effects
  loadPossibleQualifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.loadPossibleQualifications),
      mergeMap((action) =>
        this.possibleQualificationService
          .fetchPossibleQualifications(action.studentNumber)
          .pipe(
            map((possibleQualifications) =>
              RegistrationActions.loadPossibleQualificationsSuccess({
                possibleQualifications: possibleQualifications,
              })
            ),
            catchError((error) =>
              of(RegistrationActions.loadPossibleQualificationsFailure(error))
            )
          )
      )
    )
  );

  saveSelectedQualification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.saveSelectedQualification),
      withLatestFrom(this.store.select(selectSelectedQualification)),
      filter(
        ([, currentQualification]) =>
          currentQualification?.selectedQualificationId === 0
      ), // Avoid re-saving if ID exists
      mergeMap(([action]) =>
        this.selectedQualificationService
          .addSelectedQualification(action.selectedQualification)
          .pipe(
            map((selectedQualificationResposonse) => {
              if (
                selectedQualificationResposonse !== undefined &&
                selectedQualificationResposonse !== null &&
                selectedQualificationResposonse.selectedQualificationId > 0 &&
                selectedQualificationResposonse.statusId !== 0
              ) {
                // Handle successful response
                return RegistrationActions.saveSelectedQualificationSuccess({
                  selectedQualification: selectedQualificationResposonse,
                });
              } else {
                return RegistrationActions.saveSelectedQualificationFailure({
                  error: 'Failed to save selected qualification.',
                });
              }
            }),
            catchError((error) => {
              // Failed to add selected qualification
              return of(
                RegistrationActions.saveSelectedQualificationFailure({
                  error: error,
                })
              );
            })
          )
      )
    )
  );

  // Possible Subjects Effects
  loadPossibleSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.loadPossibleSubjects),
      switchMap((action) =>
        this.possibleSubjectsService.fetchPossibleSubjects(action.request).pipe(
          map((possibleSubjects) => {
            return RegistrationActions.loadPossibleSubjectsSuccess({
              possibleSubjects,
            });
          }),
          catchError((error) => {
            return of(
              RegistrationActions.loadPossibleSubjectsFailure({ error: error })
            );
          })
        )
      )
    )
  );

  saveSelectedSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.saveSubjectSelection),
      mergeMap((action) =>
        this.selectedSubjectService
          .addSelectedSubjects(action.selectedSubjects)
          .pipe(
            map((selectedSubjectResponse) => {
              if (
                selectedSubjectResponse !== undefined &&
                selectedSubjectResponse !== null &&
                selectedSubjectResponse.length > 0
              ) {
                // Handle successful response
                return RegistrationActions.saveSubjectSelectionSuccess({
                  selectedSubjects: selectedSubjectResponse,
                });
              } else {
                return RegistrationActions.saveSubjectSelectionFailure({
                  error: 'Failed to save selected subjects',
                });
              }
            }),
            catchError((error) => {
              return of(
                RegistrationActions.saveSubjectSelectionFailure({
                  error: error,
                })
              );
            })
          )
      )
    )
  );

  // TermAndCondition Effects
  loadTermAndConditionSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.loadTermCondition),
      mergeMap((action) =>
        this.termAndConditionService
          .getTermAndConditionsList(action.studentNumber)
          .pipe(
            map((termConditions) =>
              RegistrationActions.loadTermConditionSuccess({
                termConditions: termConditions,
              })
            ),
            catchError((error) =>
              of(RegistrationActions.loadTermConditionFailure(error))
            )
          )
      )
    )
  );

  loadTermConditionFromSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.loadTermConditionFromSession),
      map(() => {
        const termConditions =
          this.termAndConditionService.termandconditionsValue;
        return RegistrationActions.setTermConditionInSession({
          termConditions,
        });
      })
    )
  );

  saveTermCondition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.saveTermCondition),
      switchMap((action) =>
        this.termAndConditionService
          .postTermAndConditions(action.termAndConditionsAcceptedModel)
          .pipe(
            map((response) => {
              return RegistrationActions.saveTermConditionSuccess({
                messageResponseModel: response,
              });
            }),
            catchError((error) => {
              return of(
                RegistrationActions.loadTermConditionFailure({ error: error })
              );
            })
          )
      )
    )
  );

  // Profile Details Effects
  loadProfileDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.loadProfileDetails),
      mergeMap((action) =>
        this.ProfileDetailsService.getProfileDetail(action.studentNumber).pipe(
          map((profileDetails) => {
            return RegistrationActions.loadProfileDetailsSuccess({
              profileDetails,
            });
          }),
          catchError((error) => {
            return of(
              RegistrationActions.loadProfileDetailsFailure({ error: error })
            );
          })
        )
      )
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.addprofileDetails),
      mergeMap(action => {
        console.log("Effect triggered for addStudent", action);
        return this.ProfileDetailsService.addProfileDetail(action.studentNumber,action.profileDetailsModel).pipe(
          map(profileDetailsModel => {
            console.log("POST successful, dispatching success action", profileDetailsModel);
            return RegistrationActions.addprofileDetailsSuccess({ profileDetailsModel });
          }),
          catchError(error => {
            console.error("Error in POST:", error);
            return of(RegistrationActions.addprofileDetailsFailure({ error }));
          })
        );
      })
    )
  );
  
  // Relationship Effects
  loadRelationship$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.loadRelationship),
      mergeMap(() =>
        this.RelationshipService.getRelationshipDetail().pipe(
          map((relationship) => {
            return RegistrationActions.loadRelationshipSuccess({
              relationship,
            });
          }),
          catchError((error) => {
            return of(
              RegistrationActions.loadRelationshipFailure({ error: error })
            );
          })
        )
      )
    )
  );

  // Profile Update Effects
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.updateProfile),
      mergeMap((action) =>
        this.ProfileDetailsService.updateStudentProfileAsync(
          action.updateModel.studentNumber,
          action.updateModel
        ).pipe(
          map((profileDetailSuccess) => {
            return RegistrationActions.updateProfileSuccess({
              messageResponseModel: profileDetailSuccess,
            });
          }),
          catchError((error) => {
            return of(
              RegistrationActions.updateProfileDetailsFailure({ error: error })
            );
          })
        )
      )
    )
  );

  loadQualificationSubjectSelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.FetchQualificationSubjectSelection),
      switchMap((action) =>
        this.registrationService
          .fetchSelectionReview(action.studentNumber)
          .pipe(
            map((response) => {
              const qualificationSubjectSelection = response;
              if (
                qualificationSubjectSelection?.qualification !== undefined &&
                qualificationSubjectSelection?.selectedSubjectGroups !==
                  undefined
              ) {
                return RegistrationActions.FetchQualificationSubjectSelectionSuccess(
                  {
                    qualificationSubjectSelection:
                      qualificationSubjectSelection,
                  }
                );
              } else {
                return RegistrationActions.FetchQualificationSubjectSelectionFailure(
                  {
                    error: 'Failed to fetch qualification subject review',
                  }
                );
              }
            }),
            catchError((error) => {
              return of(
                RegistrationActions.FetchQualificationSubjectSelectionFailure({
                  error: error,
                })
              );
            })
          )
      )
    )
  );
}
