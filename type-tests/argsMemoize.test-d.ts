import memoizeOne from 'memoize-one'
import microMemoize from 'micro-memoize'
import {
  unstable_autotrackMemoize as autotrackMemoize,
  createSelector,
  createSelectorCreator,
  lruMemoize,
  weakMapMemoize
} from 'reselect'

interface RootState {
  todos: {
    id: number
    completed: boolean
  }[]
}

const state: RootState = {
  todos: [
    { id: 0, completed: false },
    { id: 1, completed: false }
  ]
}

describe('type tests', () => {
  test('Override Only Memoize In createSelector', () => {
    const selectorDefaultSeparateInlineArgs = createSelector(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { memoize: lruMemoize }
    )
    const selectorDefaultArgsAsArray = createSelector(
      [(state: RootState) => state.todos],
      todos => todos.map(t => t.id),
      { memoize: lruMemoize }
    )
    const selectorDefaultArgsAsArrayWithMemoizeOptions = createSelector(
      [(state: RootState) => state.todos],
      todos => todos.map(t => t.id),
      { memoize: lruMemoize, memoizeOptions: { maxSize: 2 } }
    )
    const selectorDefaultSeparateInlineArgsWithMemoizeOptions = createSelector(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { memoize: lruMemoize, memoizeOptions: { maxSize: 2 } }
    )
    const selectorAutotrackSeparateInlineArgs = createSelector(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { memoize: autotrackMemoize }
    )
    const selectorAutotrackArgsAsArray = createSelector(
      [(state: RootState) => state.todos],
      todos => todos.map(t => t.id),
      { memoize: autotrackMemoize }
    )
    // @ts-expect-error When memoize is autotrackMemoize, type of memoizeOptions needs to be the same as options args in autotrackMemoize.
    const selectorAutotrackArgsAsArrayWithMemoizeOptions = createSelector(
      [(state: RootState) => state.todos],
      // @ts-expect-error
      todos => todos.map(t => t.id),
      { memoize: autotrackMemoize, memoizeOptions: { maxSize: 2 } }
    )
    const selectorAutotrackSeparateInlineArgsWithMemoizeOptions =
      // @ts-expect-error When memoize is autotrackMemoize, type of memoizeOptions needs to be the same as options args in autotrackMemoize.
      createSelector(
        (state: RootState) => state.todos,
        // @ts-expect-error
        todos => todos.map(t => t.id),
        { memoize: autotrackMemoize, memoizeOptions: { maxSize: 2 } }
      )
    const selectorWeakMapSeparateInlineArgs = createSelector(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { memoize: weakMapMemoize }
    )
    const selectorWeakMapArgsAsArray = createSelector(
      [(state: RootState) => state.todos],
      todos => todos.map(t => t.id),
      { memoize: weakMapMemoize }
    )
    // @ts-expect-error When memoize is weakMapMemoize, type of memoizeOptions needs to be the same as options args in weakMapMemoize.
    const selectorWeakMapArgsAsArrayWithMemoizeOptions = createSelector(
      [(state: RootState) => state.todos],
      // @ts-expect-error
      todos => todos.map(t => t.id),
      { memoize: weakMapMemoize, memoizeOptions: { maxSize: 2 } }
    )
    // @ts-expect-error When memoize is weakMapMemoize, type of memoizeOptions needs to be the same as options args in weakMapMemoize.
    const selectorWeakMapSeparateInlineArgsWithMemoizeOptions = createSelector(
      (state: RootState) => state.todos,
      // @ts-expect-error
      todos => todos.map(t => t.id),
      { memoize: weakMapMemoize, memoizeOptions: { maxSize: 2 } }
    )
    const createSelectorDefault = createSelectorCreator(lruMemoize)
    const createSelectorWeakMap = createSelectorCreator(weakMapMemoize)
    const createSelectorAutotrack = createSelectorCreator(autotrackMemoize)
    const changeMemoizeMethodSelectorDefault = createSelectorDefault(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { memoize: weakMapMemoize }
    )
    const changeMemoizeMethodSelectorWeakMap = createSelectorWeakMap(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { memoize: lruMemoize }
    )
    const changeMemoizeMethodSelectorAutotrack = createSelectorAutotrack(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { memoize: lruMemoize }
    )
    const changeMemoizeMethodSelectorDefaultWithMemoizeOptions =
      // @ts-expect-error When memoize is changed to weakMapMemoize or autotrackMemoize, memoizeOptions cannot be the same type as options args in lruMemoize.
      createSelectorDefault(
        (state: RootState) => state.todos,
        // @ts-expect-error
        todos => todos.map(t => t.id),
        { memoize: weakMapMemoize, memoizeOptions: { maxSize: 2 } }
      )
    const changeMemoizeMethodSelectorWeakMapWithMemoizeOptions =
      createSelectorWeakMap(
        (state: RootState) => state.todos,
        todos => todos.map(t => t.id),
        { memoize: lruMemoize, memoizeOptions: { maxSize: 2 } } // When memoize is changed to lruMemoize, memoizeOptions can now be the same type as options args in lruMemoize.
      )
    const changeMemoizeMethodSelectorAutotrackWithMemoizeOptions =
      createSelectorAutotrack(
        (state: RootState) => state.todos,
        todos => todos.map(t => t.id),
        { memoize: lruMemoize, memoizeOptions: { maxSize: 2 } } // When memoize is changed to lruMemoize, memoizeOptions can now be the same type as options args in lruMemoize.
      )
  })

  test('Override Only argsMemoize In createSelector', () => {
    const selectorDefaultSeparateInlineArgs = createSelector(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { argsMemoize: lruMemoize }
    )
    const selectorDefaultArgsAsArray = createSelector(
      [(state: RootState) => state.todos],
      todos => todos.map(t => t.id),
      { argsMemoize: lruMemoize }
    )
    const selectorDefaultArgsAsArrayWithMemoizeOptions = createSelector(
      [(state: RootState) => state.todos],
      todos => todos.map(t => t.id),
      { argsMemoize: lruMemoize, argsMemoizeOptions: { maxSize: 2 } }
    )
    const selectorDefaultSeparateInlineArgsWithMemoizeOptions = createSelector(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { argsMemoize: lruMemoize, argsMemoizeOptions: { maxSize: 2 } }
    )
    const selectorAutotrackSeparateInlineArgs = createSelector(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { argsMemoize: autotrackMemoize }
    )
    const selectorAutotrackArgsAsArray = createSelector(
      [(state: RootState) => state.todos],
      todos => todos.map(t => t.id),
      { argsMemoize: autotrackMemoize }
    )
    // @ts-expect-error When argsMemoize is autotrackMemoize, type of argsMemoizeOptions needs to be the same as options args in autotrackMemoize.
    const selectorAutotrackArgsAsArrayWithMemoizeOptions = createSelector(
      [(state: RootState) => state.todos],
      // @ts-expect-error
      todos => todos.map(t => t.id),
      {
        argsMemoize: autotrackMemoize,
        argsMemoizeOptions: { maxSize: 2 }
      }
    )
    const selectorAutotrackSeparateInlineArgsWithMemoizeOptions =
      // @ts-expect-error When argsMemoize is autotrackMemoize, type of argsMemoizeOptions needs to be the same as options args in autotrackMemoize.
      createSelector(
        (state: RootState) => state.todos,
        // @ts-expect-error
        todos => todos.map(t => t.id),
        {
          argsMemoize: autotrackMemoize,
          argsMemoizeOptions: { maxSize: 2 }
        }
      )
    const selectorWeakMapSeparateInlineArgs = createSelector(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { argsMemoize: weakMapMemoize }
    )
    const selectorWeakMapArgsAsArray = createSelector(
      [(state: RootState) => state.todos],
      todos => todos.map(t => t.id),
      { argsMemoize: weakMapMemoize }
    )
    // @ts-expect-error When argsMemoize is weakMapMemoize, type of argsMemoizeOptions needs to be the same as options args in weakMapMemoize.
    const selectorWeakMapArgsAsArrayWithMemoizeOptions = createSelector(
      [(state: RootState) => state.todos],
      // @ts-expect-error
      todos => todos.map(t => t.id),
      { argsMemoize: weakMapMemoize, argsMemoizeOptions: { maxSize: 2 } }
    )
    // @ts-expect-error When argsMemoize is weakMapMemoize, type of argsMemoizeOptions needs to be the same as options args in weakMapMemoize.
    const selectorWeakMapSeparateInlineArgsWithMemoizeOptions = createSelector(
      (state: RootState) => state.todos,
      // @ts-expect-error
      todos => todos.map(t => t.id),
      { argsMemoize: weakMapMemoize, argsMemoizeOptions: { maxSize: 2 } }
    )
    // @ts-expect-error When argsMemoize is weakMapMemoize, type of argsMemoizeOptions needs to be the same as options args in weakMapMemoize.
    const selectorWeakMapSeparateInlineArgsWithMemoizeOptions1 = createSelector(
      [
        (state: RootState) => state.todos,
        // @ts-expect-error
        todos => todos.map(t => t.id)
      ],
      {
        argsMemoize: weakMapMemoize,
        argsMemoizeOptions: { maxSize: 2 }
      }
    )
    // @ts-expect-error When argsMemoize is weakMapMemoize, type of argsMemoizeOptions needs to be the same as options args in weakMapMemoize.
    const selectorWeakMapSeparateInlineArgsWithMemoizeOptions2 = createSelector(
      (state: RootState) => state.todos,
      // @ts-expect-error
      todos => todos.map(t => t.id),
      {
        memoize: lruMemoize,
        argsMemoize: weakMapMemoize,
        memoizeOptions: {
          equalityCheck:
            // @ts-expect-error
            (a, b) => a === b,
          maxSize: 2
        },
        argsMemoizeOptions: { maxSize: 2 }
      }
    )

    const createSelectorLruMemoize = createSelectorCreator({
      memoize: lruMemoize
    })
    const selectorWeakMapSeparateInlineArgsWithMemoizeOptions3 =
      // @ts-expect-error When argsMemoize is weakMapMemoize, type of argsMemoizeOptions needs to be the same as options args in weakMapMemoize.
      createSelectorLruMemoize(
        (state: RootState) => state.todos,
        // @ts-expect-error
        todos => todos.map(t => t.id),
        {
          memoize: lruMemoize,
          argsMemoize: weakMapMemoize,
          // memoizeOptions: [],
          memoizeOptions: [
            {
              equalityCheck:
                // @ts-expect-error
                (a, b) => a === b,
              maxSize: 2
            }
          ],
          argsMemoizeOptions: [{ maxSize: 2 }]
        }
      )
    const selectorWeakMapSeparateInlineArgsWithMemoizeOptions4 =
      createSelectorLruMemoize(
        // @ts-expect-error
        (state: RootState) => state.todos,
        // @ts-expect-error
        todos => todos.map(t => t.id),
        {
          memoizeOptions: [{ isPromise: false }],
          argsMemoizeOptions:
            // @ts-expect-error
            (a, b) => a === b
        }
      )
    const selectorWeakMapSeparateInlineArgsWithMemoizeOptions5 =
      // @ts-expect-error
      createSelectorLruMemoize(
        [(state: RootState) => state.todos],
        // @ts-expect-error
        todos => todos.map(t => t.id),
        {
          argsMemoize: weakMapMemoize,
          memoizeOptions: [{ isPromise: false }],
          argsMemoizeOptions: []
          // argsMemoizeOptions: (a, b) => a === b
        }
      )
    const selectorWeakMapSeparateInlineArgsWithMemoizeOptions6 =
      createSelectorLruMemoize(
        (state: RootState) => state.todos,
        todos => todos.map(t => t.id),
        {
          argsMemoize: weakMapMemoize,
          memoize: weakMapMemoize,
          memoizeOptions: [],
          argsMemoizeOptions: []
          // argsMemoizeOptions: (a, b) => a === b
        }
      )
    const createSelectorDefault = createSelectorCreator(lruMemoize)
    const createSelectorWeakMap = createSelectorCreator(weakMapMemoize)
    const createSelectorAutotrack = createSelectorCreator(autotrackMemoize)
    const changeMemoizeMethodSelectorDefault = createSelectorDefault(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { argsMemoize: weakMapMemoize }
    )
    const changeMemoizeMethodSelectorWeakMap = createSelectorWeakMap(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { argsMemoize: lruMemoize }
    )
    const changeMemoizeMethodSelectorAutotrack = createSelectorAutotrack(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { argsMemoize: lruMemoize }
    )
    const changeMemoizeMethodSelectorDefaultWithMemoizeOptions =
      // @ts-expect-error When argsMemoize is changed to weakMapMemoize or autotrackMemoize, argsMemoizeOptions cannot be the same type as options args in lruMemoize.
      createSelectorDefault(
        (state: RootState) => state.todos,
        // @ts-expect-error
        todos => todos.map(t => t.id),
        { argsMemoize: weakMapMemoize, argsMemoizeOptions: { maxSize: 2 } }
      )
    const changeMemoizeMethodSelectorWeakMapWithMemoizeOptions =
      createSelectorWeakMap(
        (state: RootState) => state.todos,
        todos => todos.map(t => t.id),
        { argsMemoize: lruMemoize, argsMemoizeOptions: { maxSize: 2 } } // When argsMemoize is changed to lruMemoize, argsMemoizeOptions can now be the same type as options args in lruMemoize.
      )
    const changeMemoizeMethodSelectorAutotrackWithMemoizeOptions =
      createSelectorAutotrack(
        (state: RootState) => state.todos,
        todos => todos.map(t => t.id),
        { argsMemoize: lruMemoize, argsMemoizeOptions: { maxSize: 2 } } // When argsMemoize is changed to lruMemoize, argsMemoizeOptions can now be the same type as options args in lruMemoize.
      )
  })

  test('Override memoize And argsMemoize In createSelector', () => {
    const createSelectorMicroMemoize = createSelectorCreator({
      memoize: microMemoize,
      memoizeOptions: [{ isEqual: (a, b) => a === b }],
      // memoizeOptions: { isEqual: (a, b) => a === b },
      argsMemoize: microMemoize,
      argsMemoizeOptions: { isEqual: (a, b) => a === b }
    })
    const selectorMicroMemoize = createSelectorMicroMemoize(
      (state: RootState) => state.todos,
      todos => todos.map(({ id }) => id)
    )

    expectTypeOf(selectorMicroMemoize(state)).items.toBeNumber()

    expectTypeOf(selectorMicroMemoize).parameter(0).not.toBeNever()

    // Checking existence of fields related to `argsMemoize`
    expectTypeOf(selectorMicroMemoize).parameter(0).not.toBeNever()

    selectorMicroMemoize.cache
    selectorMicroMemoize.fn()
    selectorMicroMemoize.isMemoized
    selectorMicroMemoize.options
    // @ts-expect-error
    selectorMicroMemoize.clearCache()
    // Checking existence of fields related to `memoize`
    selectorMicroMemoize.memoizedResultFunc.cache
    selectorMicroMemoize.memoizedResultFunc.fn()
    selectorMicroMemoize.memoizedResultFunc.isMemoized
    selectorMicroMemoize.memoizedResultFunc.options
    // @ts-expect-error
    selectorMicroMemoize.memoizedResultFunc.clearCache()
    // Checking existence of fields related to the actual memoized selector
    selectorMicroMemoize.dependencies

    expectTypeOf(selectorMicroMemoize.dependencies).toEqualTypeOf<
      [
        (state: RootState) => {
          id: number
          completed: boolean
        }[]
      ]
    >()

    expectTypeOf(selectorMicroMemoize.lastResult()).items.toBeNumber()

    expectTypeOf(selectorMicroMemoize.memoizedResultFunc)
      .parameter(0)
      .not.toBeNever()

    expectTypeOf(
      selectorMicroMemoize.memoizedResultFunc([{ id: 0, completed: true }])
    ).items.toBeNumber()

    expectTypeOf(selectorMicroMemoize.recomputations).toBeCallableWith()
    expectTypeOf(selectorMicroMemoize.resetRecomputations).toBeCallableWith()

    expectTypeOf(selectorMicroMemoize.resultFunc).parameter(0).not.toBeNever()

    expectTypeOf(
      selectorMicroMemoize.resultFunc([{ id: 0, completed: true }])
    ).items.toBeNumber()

    // Checking to see if types dynamically change if memoize or argsMemoize are overridden inside `createSelector`.
    // `microMemoize` was initially passed into `createSelectorCreator`
    // as `memoize` and `argsMemoize`, After overriding them both to `lruMemoize`,
    // not only does the type for `memoizeOptions` and `argsMemoizeOptions` change to
    // the options parameter of `lruMemoize`, the output selector fields
    // also change their type to the return type of `lruMemoize`.
    const selectorMicroMemoizeOverridden = createSelectorMicroMemoize(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      {
        memoize: lruMemoize,
        argsMemoize: lruMemoize,
        memoizeOptions: { equalityCheck: (a, b) => a === b, maxSize: 2 },
        argsMemoizeOptions: { equalityCheck: (a, b) => a === b, maxSize: 3 }
      }
    )

    expectTypeOf(selectorMicroMemoizeOverridden(state)).items.toBeNumber()

    expectTypeOf(selectorMicroMemoizeOverridden).parameter(0).not.toBeNever()

    // Checking existence of fields related to `argsMemoize`
    selectorMicroMemoizeOverridden.clearCache() // Prior to override, this field did NOT exist.
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverridden.cache
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverridden.fn()
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverridden.isMemoized
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverridden.options
    // Checking existence of fields related to `memoize`
    selectorMicroMemoizeOverridden.memoizedResultFunc.clearCache() // Prior to override, this field did NOT exist.
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverridden.memoizedResultFunc.cache
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverridden.memoizedResultFunc.fn()
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverridden.memoizedResultFunc.isMemoized
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverridden.memoizedResultFunc.options
    // Checking existence of fields related to the actual memoized selector

    expectTypeOf(selectorMicroMemoizeOverridden.dependencies).toEqualTypeOf<
      [
        (state: RootState) => {
          id: number
          completed: boolean
        }[]
      ]
    >()

    expectTypeOf(
      selectorMicroMemoizeOverridden.memoizedResultFunc([
        { id: 0, completed: true }
      ])
    ).items.toBeNumber()

    expectTypeOf(
      selectorMicroMemoizeOverridden.memoizedResultFunc
    ).not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeOverridden.recomputations
    ).toBeCallableWith()

    expectTypeOf(
      selectorMicroMemoizeOverridden.resetRecomputations
    ).toBeCallableWith()

    expectTypeOf(selectorMicroMemoizeOverridden.resultFunc).not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeOverridden.resultFunc([{ id: 0, completed: true }])
    ).items.toBeNumber()

    // Making sure the type behavior is consistent when args are passed in as an array.
    const selectorMicroMemoizeOverriddenArray = createSelectorMicroMemoize(
      [(state: RootState) => state.todos],
      todos => todos.map(({ id }) => id),
      {
        memoize: lruMemoize,
        argsMemoize: lruMemoize,
        memoizeOptions: { equalityCheck: (a, b) => a === b, maxSize: 2 },
        argsMemoizeOptions: { equalityCheck: (a, b) => a === b, maxSize: 3 }
      }
    )

    expectTypeOf(selectorMicroMemoizeOverriddenArray(state)).items.toBeNumber()

    expectTypeOf(selectorMicroMemoizeOverriddenArray)
      .parameter(0)
      .not.toBeNever()

    // Checking existence of fields related to `argsMemoize`
    selectorMicroMemoizeOverriddenArray.clearCache() // Prior to override, this field did NOT exist.
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverriddenArray.cache
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverriddenArray.fn()
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverriddenArray.isMemoized
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverriddenArray.options
    // Checking existence of fields related to `memoize`
    selectorMicroMemoizeOverriddenArray.memoizedResultFunc.clearCache() // Prior to override, this field did NOT exist.
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverriddenArray.memoizedResultFunc.cache
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverriddenArray.memoizedResultFunc.fn()
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverriddenArray.memoizedResultFunc.isMemoized
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverriddenArray.memoizedResultFunc.options
    // Checking existence of fields related to the actual memoized selector

    expectTypeOf(
      selectorMicroMemoizeOverriddenArray.dependencies
    ).toEqualTypeOf<
      [
        (state: RootState) => {
          id: number
          completed: boolean
        }[]
      ]
    >()

    expectTypeOf(
      selectorMicroMemoizeOverriddenArray.lastResult()
    ).items.toBeNumber()

    expectTypeOf(
      selectorMicroMemoizeOverriddenArray.memoizedResultFunc([
        { id: 0, completed: true }
      ])
    ).items.toBeNumber()

    expectTypeOf(
      selectorMicroMemoizeOverriddenArray.memoizedResultFunc
    ).not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeOverriddenArray.recomputations
    ).toBeCallableWith()

    expectTypeOf(
      selectorMicroMemoizeOverriddenArray.resetRecomputations
    ).toBeCallableWith()

    expectTypeOf(selectorMicroMemoizeOverriddenArray.resultFunc).not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeOverriddenArray.resultFunc([
        { id: 0, completed: true }
      ])
    ).items.toBeNumber()

    const selectorMicroMemoizeOverrideArgsMemoizeOnlyWrong =
      // @ts-expect-error Because `memoizeOptions` should not contain `resultEqualityCheck`.
      createSelectorMicroMemoize(
        (state: RootState) => state.todos,
        todos => todos.map(({ id }) => id),
        {
          argsMemoize: lruMemoize,
          memoizeOptions: {
            isPromise: false,
            resultEqualityCheck:
              // @ts-expect-error
              (a, b) => a === b
          },
          argsMemoizeOptions: { resultEqualityCheck: (a, b) => a === b }
        }
      )
    const selectorMicroMemoizeOverrideArgsMemoizeOnly =
      createSelectorMicroMemoize(
        (state: RootState) => state.todos,
        todos => todos.map(({ id }) => id),
        {
          argsMemoize: lruMemoize,
          memoizeOptions: { isPromise: false },
          argsMemoizeOptions: { resultEqualityCheck: (a, b) => a === b }
        }
      )

    expectTypeOf(
      selectorMicroMemoizeOverrideArgsMemoizeOnly(state)
    ).items.toBeNumber()

    expectTypeOf(selectorMicroMemoizeOverrideArgsMemoizeOnly)
      .parameter(0)
      .not.toBeNever()

    // Checking existence of fields related to `argsMemoize`
    selectorMicroMemoizeOverrideArgsMemoizeOnly.clearCache() // Prior to override, this field did NOT exist.
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverrideArgsMemoizeOnly.cache
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverrideArgsMemoizeOnly.fn()
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverrideArgsMemoizeOnly.isMemoized
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverrideArgsMemoizeOnly.options

    // Checking existence of fields related to `memoize`, these should still be the same.
    selectorMicroMemoizeOverrideArgsMemoizeOnly.memoizedResultFunc.cache
    selectorMicroMemoizeOverrideArgsMemoizeOnly.memoizedResultFunc.fn()
    selectorMicroMemoizeOverrideArgsMemoizeOnly.memoizedResultFunc.isMemoized
    selectorMicroMemoizeOverrideArgsMemoizeOnly.memoizedResultFunc.options
    // @ts-expect-error Note that since we did not override `memoize` in the options object,
    // `memoizedResultFunc.clearCache` is still an invalid field access.
    selectorMicroMemoizeOverrideArgsMemoizeOnly.memoizedResultFunc.clearCache()
    // Checking existence of fields related to the actual memoized selector

    expectTypeOf(
      selectorMicroMemoizeOverrideArgsMemoizeOnly.dependencies
    ).toEqualTypeOf<
      [
        (state: RootState) => {
          id: number
          completed: boolean
        }[]
      ]
    >()

    expectTypeOf(
      selectorMicroMemoizeOverrideArgsMemoizeOnly.lastResult()
    ).items.toBeNumber()

    expectTypeOf(
      selectorMicroMemoizeOverrideArgsMemoizeOnly.memoizedResultFunc([
        { id: 0, completed: true }
      ])
    ).items.toBeNumber()

    expectTypeOf(
      selectorMicroMemoizeOverrideArgsMemoizeOnly.memoizedResultFunc
    ).not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeOverrideArgsMemoizeOnly.recomputations
    ).toBeCallableWith()

    expectTypeOf(
      selectorMicroMemoizeOverrideArgsMemoizeOnly.resetRecomputations
    ).toBeCallableWith()

    expectTypeOf(
      selectorMicroMemoizeOverrideArgsMemoizeOnly.resultFunc
    ).not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeOverrideArgsMemoizeOnly.resultFunc([
        { id: 0, completed: true }
      ])
    ).items.toBeNumber()

    const selectorMicroMemoizeOverrideMemoizeOnly = createSelectorMicroMemoize(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      {
        memoize: lruMemoize,
        memoizeOptions: { resultEqualityCheck: (a, b) => a === b }
      }
    )

    expectTypeOf(
      selectorMicroMemoizeOverrideMemoizeOnly(state)
    ).items.toBeNumber()

    expectTypeOf(selectorMicroMemoizeOverrideMemoizeOnly)
      .parameter(0)
      .not.toBeNever()

    // Checking existence of fields related to `argsMemoize`
    selectorMicroMemoizeOverrideMemoizeOnly.cache
    selectorMicroMemoizeOverrideMemoizeOnly.fn
    selectorMicroMemoizeOverrideMemoizeOnly.isMemoized
    selectorMicroMemoizeOverrideMemoizeOnly.options
    // @ts-expect-error Note that since we did not override `argsMemoize` in the options object,
    // `selector.clearCache` is still an invalid field access.
    selectorMicroMemoizeOverrideMemoizeOnly.clearCache()

    // Checking existence of fields related to `memoize`
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverrideMemoizeOnly.memoizedResultFunc.cache
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverrideMemoizeOnly.memoizedResultFunc.fn()
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverrideMemoizeOnly.memoizedResultFunc.isMemoized
    // @ts-expect-error Prior to override, this field DID exist.
    selectorMicroMemoizeOverrideMemoizeOnly.memoizedResultFunc.options
    selectorMicroMemoizeOverrideMemoizeOnly.memoizedResultFunc.clearCache() // Prior to override, this field did NOT exist.

    // Checking existence of fields related to the actual memoized selector

    expectTypeOf(
      selectorMicroMemoizeOverrideMemoizeOnly.dependencies
    ).toEqualTypeOf<
      [
        (state: RootState) => {
          id: number
          completed: boolean
        }[]
      ]
    >()

    expectTypeOf(
      selectorMicroMemoizeOverrideMemoizeOnly.lastResult()
    ).items.toBeNumber()

    expectTypeOf(
      selectorMicroMemoizeOverrideMemoizeOnly.memoizedResultFunc([
        { id: 0, completed: true }
      ])
    ).items.toBeNumber()

    expectTypeOf(
      selectorMicroMemoizeOverrideMemoizeOnly.memoizedResultFunc
    ).not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeOverrideMemoizeOnly.recomputations
    ).toBeCallableWith()

    expectTypeOf(
      selectorMicroMemoizeOverrideMemoizeOnly.resetRecomputations
    ).toBeCallableWith()

    expectTypeOf(
      selectorMicroMemoizeOverrideMemoizeOnly.resultFunc
    ).not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeOverrideMemoizeOnly.resultFunc([
        { id: 0, completed: true }
      ])
    ).items.toBeNumber()

    const selectorMicroMemoizePartiallyOverridden =
      // @ts-expect-error Since `argsMemoize` is set to `lruMemoize`, `argsMemoizeOptions` must match the options object parameter of `lruMemoize`
      createSelectorMicroMemoize(
        (state: RootState) => state.todos,
        // @ts-expect-error
        todos => todos.map(t => t.id),
        {
          memoize: lruMemoize,
          argsMemoize: lruMemoize,
          memoizeOptions: {
            equalityCheck:
              // @ts-expect-error
              (a, b) => a === b,
            maxSize: 2
          },
          argsMemoizeOptions: { isPromise: false } // This field causes a type error since it does not match the options param of `lruMemoize`.
        }
      )
    const selectorMicroMemoizePartiallyOverridden1 =
      // @ts-expect-error Since `argsMemoize` is set to `lruMemoize`, `argsMemoizeOptions` must match the options object parameter of `lruMemoize`
      createSelectorMicroMemoize(
        (state: RootState) => state.todos,
        // @ts-expect-error
        todos => todos.map(t => t.id),
        {
          memoize: lruMemoize,
          argsMemoize: lruMemoize,
          memoizeOptions: [
            {
              equalityCheck:
                // @ts-expect-error
                (a, b) => a === b,
              maxSize: 2
            }
          ],
          argsMemoizeOptions: [{ isPromise: false }] // This field causes a type error since it does not match the options param of `lruMemoize`.
        }
      )
    const selectorMicroMemoizePartiallyOverridden2 = createSelectorMicroMemoize(
      (state: RootState) => state.todos,
      todos => todos.map(t => t.id),
      { argsMemoizeOptions: [{ isPromise: false }] }
    )

    const selectorDefaultParametric = createSelector(
      (state: RootState, id: number) => id,
      (state: RootState) => state.todos,
      (id, todos) => todos.filter(todo => todo.id === id),
      {
        argsMemoize: microMemoize,
        devModeChecks: { inputStabilityCheck: 'never' },
        memoize: memoizeOne,
        argsMemoizeOptions: [],
        memoizeOptions: [(a, b) => a === b]
      }
    )

    expectTypeOf(selectorDefaultParametric(state, 0)).toEqualTypeOf<
      {
        id: number
        completed: boolean
      }[]
    >()

    expectTypeOf(selectorDefaultParametric).parameters.not.toMatchTypeOf<
      [RootState]
    >()

    expectTypeOf(selectorDefaultParametric).parameters.not.toMatchTypeOf<
      [number]
    >()

    expectTypeOf(selectorDefaultParametric).parameters.not.toMatchTypeOf<
      [RootState, string]
    >()

    expectTypeOf(selectorDefaultParametric).parameters.not.toMatchTypeOf<
      [RootState, number, number]
    >()

    // Checking existence of fields related to `argsMemoize`
    // Prior to override, this field did NOT exist.
    selectorDefaultParametric.cache
    // Prior to override, this field did NOT exist.
    selectorDefaultParametric.fn
    // Prior to override, this field did NOT exist.
    selectorDefaultParametric.isMemoized
    // Prior to override, this field did NOT exist.
    selectorDefaultParametric.options
    // @ts-expect-error Prior to override, this field DID exist.
    selectorDefaultParametric.clearCache()

    // Checking existence of fields related to `memoize`
    // @ts-expect-error Prior to override, this field DID exist.
    selectorDefaultParametric.memoizedResultFunc.clearCache()
    // Prior to override, this field did NOT exist.
    selectorDefaultParametric.memoizedResultFunc.clear()

    // Checking existence of fields related to the actual memoized selector

    expectTypeOf(selectorDefaultParametric.dependencies).toEqualTypeOf<
      [
        (state: RootState, id: number) => number,
        (state: RootState) => { id: number; completed: boolean }[]
      ]
    >()

    expectTypeOf(selectorDefaultParametric.lastResult()).toEqualTypeOf<
      {
        id: number
        completed: boolean
      }[]
    >()

    expectTypeOf(selectorDefaultParametric.memoizedResultFunc)
      .parameter(0)
      .not.toBeNever()

    expectTypeOf(selectorDefaultParametric.memoizedResultFunc).toBeCallableWith(
      0,
      [{ id: 0, completed: true }]
    )

    expectTypeOf(
      selectorDefaultParametric.memoizedResultFunc(0, [
        { id: 0, completed: true }
      ])
    ).toEqualTypeOf<{ id: number; completed: boolean }[]>()

    expectTypeOf(selectorDefaultParametric.recomputations).toBeCallableWith()

    expectTypeOf(
      selectorDefaultParametric.resetRecomputations
    ).toBeCallableWith()

    expectTypeOf(selectorDefaultParametric.resultFunc).toBeCallableWith(0, [
      { id: 0, completed: true }
    ])
  })

  test('memoize And argsMemoize In createSelectorCreator', () => {
    // If we don't pass in `argsMemoize`, the type for `argsMemoizeOptions`
    // falls back to the options parameter of `lruMemoize`.
    const createSelectorArgsMemoizeOptionsFallbackToDefault =
      createSelectorCreator({
        memoize: microMemoize,
        memoizeOptions: [{ isPromise: false }],
        argsMemoizeOptions: { resultEqualityCheck: (a, b) => a === b }
      })
    const selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault =
      createSelectorArgsMemoizeOptionsFallbackToDefault(
        (state: RootState) => state.todos,
        todos => todos.map(({ id }) => id)
      )

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault(state)
    ).items.toBeNumber()

    expectTypeOf(selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault)
      .parameter(0)
      .not.toBeNever()

    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.resultFunc
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.clearCache()
    // @ts-expect-error
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.cache
    // @ts-expect-error
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.fn
    // @ts-expect-error
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.isMemoized
    // @ts-expect-error
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.options
    // Checking existence of fields related to `memoize`
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.memoizedResultFunc
      .cache
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.memoizedResultFunc.fn()
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.memoizedResultFunc
      .isMemoized
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.memoizedResultFunc
      .options
    // @ts-expect-error
    selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.memoizedResultFunc.clearCache()
    // Checking existence of fields related to the actual memoized selector

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.dependencies
    ).toEqualTypeOf<
      [
        (state: RootState) => {
          id: number
          completed: boolean
        }[]
      ]
    >()

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.lastResult()
    ).items.toBeNumber()

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.memoizedResultFunc
    )
      .parameter(0)
      .not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.recomputations
    ).toBeCallableWith()

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.resetRecomputations
    ).toBeCallableWith()

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.resultFunc
    )
      .parameter(0)
      .not.toBeNever()

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.resultFunc([
        { id: 0, completed: true }
      ])
    ).items.toBeNumber()

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.memoize
    ).toEqualTypeOf(microMemoize)

    expectTypeOf(
      selectorMicroMemoizeArgsMemoizeOptionsFallbackToDefault.argsMemoize
    ).toEqualTypeOf(weakMapMemoize)

    const createSelectorWithWrongArgsMemoizeOptions =
      // @ts-expect-error If we don't pass in `argsMemoize`, the type for `argsMemoizeOptions` falls back to the options parameter of `lruMemoize`.
      createSelectorCreator({
        memoize: microMemoize,
        memoizeOptions: { isEqual: (a, b) => a === b },
        argsMemoizeOptions: {
          isEqual:
            // @ts-expect-error implicit any
            (a, b) => a === b
        }
      })

    // When passing in an options object as the first argument, there should be no other arguments.
    const createSelectorWrong = createSelectorCreator(
      {
        // @ts-expect-error
        memoize: microMemoize,
        // @ts-expect-error
        memoizeOptions: { isEqual: (a, b) => a === b },
        // @ts-expect-error
        argsMemoizeOptions: { equalityCheck: (a, b) => a === b }
      },
      [] // This causes the error.
    )
  })

  test('autotrackMemoize types', () => {
    const selector = createSelector(
      [(state: RootState) => state.todos],
      todos => todos.map(t => t.id),
      { memoize: autotrackMemoize }
    )
    selector.memoizedResultFunc.clearCache
  })
})
