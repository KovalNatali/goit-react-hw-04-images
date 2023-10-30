import { SearchForm, Searchbar,SearchFormButton,SearchFormInput,SearchFormLabel } from "./Searchbar.styled"



 export const SearchBar = ({onSubmit}) => {
    return (
   <Searchbar >
  <SearchForm onSubmit={onSubmit}>
    <SearchFormButton type="submit">
      <SearchFormLabel>Search</SearchFormLabel>
    </SearchFormButton>

    <SearchFormInput
     name="query"
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </SearchForm>
</Searchbar>
    ) 
 
} 
