import { List, ListItem, Card } from "@material-tailwind/react";
import { affichageId } from "../Tables/TableEmployeToday";

export function formatDateTime(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}
export function ListFlights({
  idflight,
  destination,
  flightfrom,
  dateflight,
  duration,
}) {
  return (
    <Card className="w-full my-4 ml-4">
      <List>
        <ListItem className="flex flex-row  justify-between">
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="mr-2">{affichageId(idflight)}</h1> <p>{formatDateTime(dateflight)}</p>{" "}
            <p>From : {flightfrom}</p> <p>Destination : {destination} </p>{" "}
            <p>Duration : {duration}</p>
          </div>{" "}
        </ListItem>
      </List>
    </Card>
  );
}
