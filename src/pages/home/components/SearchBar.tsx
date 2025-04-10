import { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const reset = () => {
    setIsError(false);
    setErrorMessage("");
  };

  const handleSearch = () => {
    if (searchQuery === "") {
      setIsError(true);
      setErrorMessage("The field can not be empty");
      return;
    }
    onSearch(searchQuery);
  };

  const handleInputChange = (query: string) => {
    if (isError) {
      reset();
    }
    setSearchQuery(query);
  };

  return (
    <div className="flex w-full max-w-lg items-start justify-center gap-2 mb-4">
      <div className="flex flex-1 flex-col">
        <Input
          isError={isError}
          value={searchQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search movie title..."
        />
        {errorMessage !== "" && (
          <Typography type="small" color="error">
            {errorMessage}
          </Typography>
        )}
      </div>
      <Button
        className="border-primary hover:bg-primary-dark hover:border-primary-dark"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
