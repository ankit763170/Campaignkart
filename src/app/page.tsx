import Add from "../../components/Add";
import View from "../../components/View";
export default function Home() {
  return (
    <div className="flex flex-wrap p-10 justify-center">
      <div className="lg:w-6/12 w-full">
        <Add />
      </div>
      <div className="lg:w-6/12 w-full">
        <View />
      </div>
    </div>
  );
}


