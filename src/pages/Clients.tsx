import React from "react";
import { useFetchClientsQuery } from "../store/index.ts";

const Clients = () => {

  const { data, isFetching, error } = useFetchClientsQuery()

  const renderedClients = data?.map(client => <div> { client.name } </div>)

  return (  
    <div>
      Clients :
      { renderedClients }
    </div>
  );
}
 
export default Clients