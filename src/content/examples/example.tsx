// Import the core libraries and functions
import { ChangeEvent, FC, useState } from "react"

// Import the typescript-casted REDUX functions
import { useAppDispatch, useAppSelector as useSelector } from "../../redux/store"

// Import the user-defined REDUX reducer
import { increment, incrementByAmount, decrement } from "../../redux/reducers/example"


// Component to show how to manage getting and updating fields
// in a REDUX store works.
export const Example: FC = () => {

  // Because we are using "typescript", we are using a modified
  // `useDispatch` and `useSelector` that properly casts those
  // function fields / methods. View the modifications near the
  // bottom of "store.ts" file.
  // ----------------------------------------------------------
  //
  // Initialize the dispatch function
  const dispatch = useAppDispatch()

  // Get the used values from the REDUX store
  // For this example, just getting a count value.
  const count = useSelector(store => store.counter.value)

  // Initialize the local STATE values
  const [incrementAmount, setIncrementAmount] = useState<number>(0)

  // Function that handles 
  const handleChangeIncrementByAmount = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the input value
    const inputValue = e.target.value

    // Super lazy way to set the value, VERY prone to errors.
    // Please remember, this is simply an example component.
    setIncrementAmount(Number(inputValue))
  }

  // Build the DOM elements
  return (
    // Wrapped in a React Fragment, to show how this works
    <>
      <section className="example-section">

        <h3>Redux Toolkit Example</h3>

        <div className="example-card">
          <div className="increment-button-container">
            <button onClick={() => dispatch(decrement())}>-</button>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
          </div>
          <div className="increment-by-value-container">
            <label htmlFor="incrementValueBy">Change value by:</label>
            <input
              type="text"
              name="incrementValueBy"
              id="incrementValueBy"
              value={incrementAmount}
              onChange={e => handleChangeIncrementByAmount(e)}
            />
            <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>Go!</button>
          </div>
        </div>

      </section>
    </>
  )
}