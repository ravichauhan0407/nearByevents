import { useRef } from "react";


const SearchBox = ({setCityFilter}) =>{

     const inputRef=useRef()

    const submitHandler=(e)=>
    {
        e.preventDefault();
        setCityFilter(inputRef.current.value)
    }

    return (<div className="div-at-end"><form >
        <label htmlFor="header-search">
            <span className="visually-hidden">City</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="City....."
            name="city" 
            ref={inputRef}
        />
        <button type="submit" onClick={submitHandler}>Apply</button>
    </form>
    </div>);

}

export default SearchBox;