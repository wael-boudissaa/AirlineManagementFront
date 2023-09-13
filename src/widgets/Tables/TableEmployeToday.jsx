import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["First Name", "Second Name", "Email", "Location"];
export  const affichageId = (idflight) => {
  let newId = "FW-";
  for (let i = 0; i < idflight.length; i++) {
    if (idflight.length - i <= 5) {
      const char = idflight[i].toUpperCase();
      newId += char;
    }
  }
  return newId;
};


export function TableEmployeToday({ idflight }) {
  const [employeToday, setEmployeToday] = useState([]);
  useEffect(() => {
    const fetchDataEmploye = async () => {
      try {
        const data = await fetch(
          `http://localhost:5001/employe/today?idflight=${idflight}`,
          { methode: "GET" }
        );
        if (data.ok ) {
          const result = await data.json(); 
          setEmployeToday(result)
        }
      } catch (err) {console.log(err)}
    };
    fetchDataEmploye();
    
  }
  , []);



  // useEffect(()=> {

  //   console.log(employeToday)
  // },[employeToday])
  return (
    <Card className="h-fit w-full overflow-scroll bg-transparent my-9">
      <div className="flex flex-row justify-between items-center">
        {" "}
        <h1 className="my-4 mx-3">Flight name : {affichageId(idflight)}</h1>
        {/* <h1 className="my-4 mx-3"> The flight from  : {flightfrom}</h1>
        <h1 className="my-4 mx-3"> to : {destination}</h1>
        <h1 className="my-4 mx-3">The flight take about  : {duration}</h1> */}
      </div>

      <table className="w-full min-w-max table-auto text-left bg-white ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employeToday.map(({ first_name, last_name, email,adresse },index) => {
            const isLast = index === employeToday.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal">
                   {first_name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal">
                    {last_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal">
                    {email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal">
                    {adresse}
                  </Typography>
                </td>
                {/* <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium">
                    Edit
                  </Typography>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
