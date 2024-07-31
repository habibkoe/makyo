import SelectWithSearchCustom from "./components/SelectWithSearchCustom";

interface OptionType {
  label: string;
  value: string;
}

function App() {
  const datas: OptionType[] = [
    { value: "option 1", label: "Option 1" },
    { value: "option with icon", label: "Option with icon" },
    { value: "long long option 3", label: "Long long option 3" },
    { value: "long long long option 4", label: "Long long long option 4" },
    {
      value: "long long long long option 5",
      label: "Long long long long option 5",
    },
    {
      value: "long long long long long option 6",
      label: "Long long long long long option 6",
    },
  ];

  const onChange = (e: { label: string; value: string }[]) => {
    console.log("check here", e);
  };
  return (
    <>
      <div className="flex flex-col justify-between h-screen max-w-4xl py-5 mx-auto">
        <div>
          <form action="" className="w-full">
            <SelectWithSearchCustom onSelect={onChange} datas={datas} />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
