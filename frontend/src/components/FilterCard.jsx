import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

// Clean salary range configuration array
const salaryRanges = [
  { label: "0 - 50K", min: 0, max: 50000 },
  { label: "50K - 1L", min: 50000, max: 100000 },
  { label: "1L - 10L", min: 100000, max: 1000000 },
  { label: "10L - 50L", min: 1000000, max: 5000000 },
];

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: salaryRanges.map((range) => range.label),
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [filterType, setFilterType] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);

    // Determine filter type based on value
    const isSalary = salaryRanges.some((range) => range.label === value);
    const isLocation = fitlerData[0].array.includes(value);
    const isIndustry = fitlerData[1].array.includes(value);

    setFilterType(
      isSalary
        ? "salary"
        : isLocation
          ? "location"
          : isIndustry
            ? "industry"
            : "",
    );
  };
  useEffect(() => {
    if (selectedValue) {
      const selectedRange = salaryRanges.find(
        (range) => range.label === selectedValue,
      );
      if (selectedRange) {
        dispatch(
          setSearchedQuery({
            type: "salary",
            ...selectedRange,
          }),
        );
      } else {
        dispatch(
          setSearchedQuery({
            type: filterType,
            value: selectedValue,
          }),
        );
      }
    }
  }, [selectedValue, filterType]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.fitlerType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
