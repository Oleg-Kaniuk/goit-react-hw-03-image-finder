import { SearchbarContainer, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";

export const Searchbar = ({ onSubmitSearch }) => (
  <SearchbarContainer>
    <SearchForm onSubmit={onSubmitSearch}>
      <SearchFormButton>
        <span>Search</span>
      </SearchFormButton>

      <SearchFormInput
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </SearchForm>
  </SearchbarContainer>
);
