import  { useState } from 'react';
import { JsonForms } from '@jsonforms/react';

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';



function Select() {


    const [country,setCountry]=useState(["France","Alemagne","Belgique","Italie"])
    const [continent,setContinennt]=useState("Europe")
    const config = {
               "schema":{
                "type": "object",
                "properties": {
                 
                  "continent": {
                    "type": "string",
                    "enum": [
                    "Afrique",
                    "Amerique",
                    "Europe",
                    "Asie"
                    ]
                 },
                 "Country": {
                    "type": "array",
                    "uniqueItems": true,
                    "items": {
                      "type": "string",
                      "enum": country
                    }
                  }
                }
              },
              "uischema":{
                "type": "VerticalLayout",
                "elements": [
                  
                  {
                    "type": "Control",
                    "scope": "#/properties/continent"
                  },
                  {
                    "type": "Control",
                    "scope": "#/properties/Country",
                    "label":"pays visité"
                  }
                ]
              }
    }
     const schema =config.schema
     const uischema =config.uischema
    const changeData = ({data}) => {
      console.log(data);
      const Continent = data.continent
          if(Continent!==continent){
            setContinennt(Continent)

            if(Continent.toLowerCase()==="afrique"){
              const Country = ["Cameroun","Tchad","Congo","Gabon"]
              setCountry(Country)
            } 
              if(Continent.toLowerCase()==="amerique")  {
                setCountry(["Etas-unis","Canada","Brésil","Méxique"])
                
              }
                if(Continent.toLowerCase()==="europe")  {
                  setCountry(["France","Alemagne","Belgique","Italie"])
                  
                }
                  if(Continent.toLowerCase()==="asie")  {
                    setCountry(["Chine","Inde","Japon","Corée du sud"])
                    
                  }
          }
    }

  return (
    
    <>

        <JsonForms
        schema={schema}
        uischema={uischema}
        data={{"Country":country,"continent":continent}}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={changeData}
        
        />
    </>
  )
}

export default Select