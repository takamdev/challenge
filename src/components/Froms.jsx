import { useState } from "react";
import { JsonForms } from "@jsonforms/react";

import {
   materialRenderers,
   materialCells,
} from "@jsonforms/material-renderers";

function Froms() {
   /*
    * L'état country est le tableau des pays en fonction du continent choisie. Par defaut il contient les pays de l'Europe
    * L'état continent permet de stocké le continent choisir. Par defaut le continant choisir est l'Europe
    * L'objet config (json) contient les schemas de donnéés et les schemas d'interface utilisateur.
    * L'énumeration country permet de de rendre dynamique le tableau d'enumeration en fonction du continent choisir
    */
   const [country, setCountry] = useState([
      "France",
      "Alemagne",
      "Belgique",
      "Italie",
   ]);

   const [continent, setContinennt] = useState("Europe");

   //variable contenant les erreurs
   let dataErrors = "";
   // variable qui contient les données du formulaires

   let Data = {};
   const config = {
      schema: {
         type: "object",
         properties: {
            nom: {
               type: "string",
               minLength: 5,
               maxLength: 50,
            },
            continent: {
               type: "string",
               enum: ["Afrique", "Amerique", "Europe", "Asie"],
            },
            Country: {
               type: "array",
               uniqueItems: true,
               items: {
                  type: "string",
                  enum: country,
               },
            },
         },
         required: ["continent", "nom", "Country"],
      },
      uischema: {
         type: "VerticalLayout",
         elements: [
            {
               type: "Control",
               scope: "#/properties/nom",
            },
            {
               type: "Control",
               scope: "#/properties/continent",
            },
            {
               type: "Control",
               scope: "#/properties/Country",
               label: "pays visité",
            },
         ],
      },
   };

   // recuperation des configuartions
   const schema = config.schema;
   const uischema = config.uischema;

   // fonction appeler l'orsque les valeur du formulaire change
   const changeData = ({ data, errors }) => {
      // recuperation de des donnéés
      Data = data;
      // recuperer les erreurs
      dataErrors = errors;
      // recuperation des donnees du champ continent
      const Continent = data.continent;

      /*
       * l'orsque la valeur du continent choisir est différent de celle dans l'etat continent
       * ont change l'état continent pas la nouvelle valeur choisir
       * en suite le tableau d'enumeration (tableau de pays) est modifier en fonction du continent choisir , et toute cocher pas defaut
       */
      if (Continent && Continent !== continent) {
         setContinennt(Continent);

         if (Continent.toLowerCase() === "afrique") {
            const Country = ["Cameroun", "Tchad", "Congo", "Gabon"];
            setCountry(Country);
         }
         if (Continent.toLowerCase() === "amerique") {
            setCountry(["Etas-unis", "Canada", "Brésil", "Méxique"]);
         }
         if (Continent.toLowerCase() === "europe") {
            setCountry(["France", "Alemagne", "Belgique", "Italie"]);
         }
         if (Continent.toLowerCase() === "asie") {
            setCountry(["Chine", "Inde", "Japon", "Corée du sud"]);
         }
      }
   };

   // fontion de soumission du formulaire
   const ondhleSmit = () => {
      if (dataErrors.length !== 0) {
         console.log(dataErrors);
      } else {
         console.log(Data);
      }
   };

   return (
      <div className="container">
         <JsonForms
            schema={schema}
            uischema={uischema}
            data={{ Country: country, continent: continent }}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={changeData}
         />
         <button type="button" className="btnSubmit" onClick={ondhleSmit}>
            Envoyer
         </button>
      </div>
   );
}

export default Froms;
