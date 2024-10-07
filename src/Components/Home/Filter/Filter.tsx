interface FilterProps {
  selectedType: string;
  handleTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ selectedType, handleTypeChange }) => {
  return (
    <div className="radio-inputs">
      <label className="radio">
        <input
          type="radio"
          name="radio"
          value="movie"
          checked={selectedType === "movie"}
          onChange={handleTypeChange}
        />
        <span className="name">Películas</span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="radio"
          value="series"
          checked={selectedType === "series"}
          onChange={handleTypeChange}
        />
        <span className="name">Series</span>
      </label>
    </div>
  );
};
export default Filter;
