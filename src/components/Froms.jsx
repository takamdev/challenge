import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { TextField, Autocomplete } from "@mui/material";
import {
   materialRenderers,
   materialCells,
} from "@jsonforms/material-renderers";

function Froms() {  
    // etat de l'erreur des le champ pays selectionner
   const [error , setError]= useState(true)
   //etat d'erreur dans le champ nom
   let dataErrors = []
  
// objet contenent les données du formulaires
   let Data = {};
   // configuration des schema et ui schema
   const config = {
      schema: {
         type: "object",
         properties: {
            nom: {
               type: "string"
            }
         },
         required: ["nom"],
      },
      uischema: {
         type: "VerticalLayout",
         elements: [
            {
               type: "Control",
               scope: "#/properties/nom",
            }
         ],
      },
      enum: ["Etas-unis", "Canada","Chine", "Inde", "Japon", "Corée du sud", "Brésil","France", "Alemagne", "Belgique", "Italie", "Méxique","Cameroun", "Tchad", "Congo", "Gabon"],

   };

   // recuperation des configuartions
   const schema = config.schema;
   const uischema = config.uischema;
   const country = config.enum


   // fontion de soumission du formulaire
   const submit = () => {
      // verification des erreurs et summision du formulaires si pas d'erreur
      if (dataErrors.length !== 0 || error===true) {
         console.log(dataErrors);
      } else if (dataErrors.length === 0 && error===false) {
         console.log(Data);
      }
   };

   return (
      <div className="container">
         <JsonForms
            schema={schema}
            uischema={uischema}
            data={{}}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({data,errors})=>(Data = {...Data,nom:data.nom},dataErrors=errors)}
         />
        <Autocomplete
            sx={{ mt:1 }}
            multiple
            options={country}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            onChange={(e,value)=>{
               if(value.length!==0) setError(false)
               Data={...Data,selectContry:value}
              
               }}
            renderInput={(params) => (
            <TextField
               {...params}
               variant="outlined"
               label="pays visité"
               placeholder="choisir un pays"
               required
               error={error}
               helperText={error ? "is a required property" : ""}
            />
            )}
         />
         <button type="button" className="btnSubmit" onClick={submit}>
            Envoyer
         </button>
      </div>
   );
}

export default Froms;
