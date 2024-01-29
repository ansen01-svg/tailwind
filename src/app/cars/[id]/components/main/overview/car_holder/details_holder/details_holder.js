import Details1 from "./details1";
import Details2 from "./details2";
import Header from "./header";
import Label from "@/app/components/label/label";

export default function DetailsHolder(props) {
  const { car, date } = props;

  return (
    <div className="flex-1 flex flex-col items-start justify-center gap-2">
      <Label />
      <Header car={car} date={date} />
      <div className="w-full flex flex-row items-start justify-center">
        <Details1 car={car} />
        <Details2 car={car} />
      </div>
    </div>
  );
}
