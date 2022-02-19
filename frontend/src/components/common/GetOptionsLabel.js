// console.log(data);
useEffect(() => {
  const GetOptions = async () => {
    try {
      const got = await GetPaginatedGradePromise();
      setGrade(got);
      console.log(got);
    } catch (error) {
      console.log(error);
    }
  };
  GetOptions();
}, []);

// console.log(grade);
// const uniqueClass = grade.filter((value) => {});

const uniqueGrade = UniqueArray(grade, "class_name");

const classOptions = uniqueGrade.map((value) => ({
  label: value,
  value: value,
}));
