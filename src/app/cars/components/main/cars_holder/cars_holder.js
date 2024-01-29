import Card from "./card/card";

export default function CarsHolder(props) {
  const { cars, dataReady } = props;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      {cars.length < 1 ? (
        <div>No cars to show</div>
      ) : (
        cars.map((car) => {
          return <Card key={car._id} car={car} dataReady={dataReady} />;
        })
      )}
    </div>
  );
}
