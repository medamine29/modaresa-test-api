import React, { ReactNode } from "react";
import { useFetchClientsQuery } from "../store/index.ts";
import Skeleton from "../components/Skeleton.tsx"
import Button from "../components/Button.tsx"

const Clients = () => {

  const { data, isFetching, error } = useFetchClientsQuery()

  if (error) return <div> Une erreur s'est produite </div>

  let renderedClients: ReactNode

  if (isFetching) renderedClients = <Skeleton times={4} className="h-8 w-20" />
  else renderedClients = data?.map(client => <div className="font-thin"> { client.name } </div>)

  return (  
    <div className="w-full flex p-4">

      <div className="w-1/4">
        <div className="text-lg underline font-bold"> Clients : </div>
        <div className="flex flex-col gap-2">
          { renderedClients }
        </div>
      </div>

      <div className="w-3/4 flex flex-col items-center border-l-2 px-4">
        <Button
          rounded
          outline
        >
          CREATE CLIENT
        </Button>
      </div>
      
    </div>
  );
}
 
export default Clients